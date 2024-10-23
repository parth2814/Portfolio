/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Eye,
  Clock,
  Copy,
  Check,
  X,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import React from "react";
import { cn } from "@/lib/utils";

interface BlogPost {
  title: string;
  subtitle: string;
  date: string;
  views: number;
  content: string;
  slug: string;
  readingTime?: string;
}

interface MarkdownBaseProps {
  children: React.ReactNode;
  className?: string;
}

interface CopyButtonProps {
  text: string;
}

interface CodeBlockProps extends MarkdownBaseProps {
  inline?: boolean;
  className?: string;
  node?: any;
}

interface ImageProps {
  src?: string;
  alt?: string;
}

interface LinkProps extends MarkdownBaseProps {
  href?: string;
}

interface MarkdownComponents {
  h1: React.ComponentType<MarkdownBaseProps>;
  h2: React.ComponentType<MarkdownBaseProps>;
  h3: React.ComponentType<MarkdownBaseProps>;
  p: React.ComponentType<MarkdownBaseProps>;
  code: React.ComponentType<CodeBlockProps>;
  img: React.ComponentType<ImageProps>;
  a: React.ComponentType<LinkProps>;
  blockquote: React.ComponentType<MarkdownBaseProps>;
  ul: React.ComponentType<MarkdownBaseProps>;
  ol: React.ComponentType<MarkdownBaseProps>;
}

export default function BlogPostDisplay({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [nextPost, setNextPost] = useState<string | null>(null);
  const [prevPost, setPrevPost] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [headings, setHeadings] = useState<
    { id: string; title: string; level: number }[]
  >([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: contentRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blog-post/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = await response.json();
        setPost(data.post);
        setNextPost(data.nextPost);
        setPrevPost(data.prevPost);

        // Extract headings from the content
        const headingRegex = /^(#{1,3})\s+(.+)$/gm;
        const extractedHeadings = [];
        let match;
        while ((match = headingRegex.exec(data.post.content)) !== null) {
          extractedHeadings.push({
            id: match[2].toLowerCase().replace(/\s+/g, "-"),
            title: match[2],
            level: match[1].length,
          });
        }
        setHeadings(extractedHeadings);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const CopyButton = ({ text }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast("Copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    };

    return (
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          copyToClipboard();
        }}
        className="absolute top-3 right-3 p-2 rounded-md bg-black/40 backdrop-blur-sm border border-gray-800 
                 hover:border-[#00ff00]/50 hover:bg-[#00ff00]/10 transition-all duration-300 
                 z-10 group flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-[#00ff00]" />
            <span className="text-xs text-[#00ff00]">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-gray-400 group-hover:text-[#00ff00]" />
            <span className="text-xs text-gray-400 group-hover:text-[#00ff00]">
              Copy
            </span>
          </>
        )}
      </motion.button>
    );
  };

  const markdownComponents: MarkdownComponents = {
    h1: ({ children }: MarkdownBaseProps) => (
      <motion.h1
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className="text-3xl font-bold text-[#00ff00] mt-8 mb-4 tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }: MarkdownBaseProps) => (
      <motion.h2
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className="text-2xl font-semibold text-[#00ff00]/90 mt-6 mb-3 tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.h2>
    ),
    h3: ({ children }: MarkdownBaseProps) => (
      <h3
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className="text-xl font-medium text-[#00ff00]/80 mt-4 mb-2"
      >
        {children}
      </h3>
    ),
    p: ({ children }: MarkdownBaseProps) => (
      <p className="text-gray-300 leading-7 mb-4 text-lg tracking-wide">
        {children}
      </p>
    ),
    code: ({ node, inline, className, children, ...props }: CodeBlockProps) => {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");

      if (!inline && match) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative my-8 group rounded-xl overflow-hidden"
          >
            {/* Header bar */}
            <div
              className="absolute top-0 left-0 right-0 h-12 bg-gray-900/80 backdrop-blur-sm 
                      border-b border-gray-800 z-[1] px-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {/* Fake traffic lights */}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="ml-3 px-2 py-1 rounded-md bg-black/30 border border-gray-800">
                  <span className="text-xs font-mono text-gray-400">
                    {match[1].toUpperCase()}
                  </span>
                </div>
              </div>
              <CopyButton text={codeString} />
            </div>

            {/* Code content */}
            <div className="relative">
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-grid-green-02 bg-[length:24px_24px]" />

              {/* Main code block */}
              <div className="relative">
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    background: "transparent",
                    padding: "4rem 1.5rem 1.5rem 1.5rem",
                    margin: 0,
                    borderRadius: 0,
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                    },
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>

              {/* Hover effects */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300
                     group-hover:border-[#00ff00]/20 pointer-events-none"
                initial={false}
                animate={{
                  boxShadow: "0 0 20px rgba(0, 255, 0, 0.05)",
                }}
              />
            </div>

            {/* Line numbers background */}
            <div className="absolute left-0 top-12 bottom-0 w-12 bg-black/20" />
          </motion.div>
        );
      }

      return (
        <code className="px-1.5 py-0.5 rounded-md font-mono text-sm bg-[#00ff00]/10 text-[#00ff00] border border-[#00ff00]/20">
          {children}
        </code>
      );
    },
    img: ({ src, alt }: ImageProps) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="my-8 rounded-lg overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
      >
        <Image
          src={"/" + src || ""}
          alt={alt || ""}
          width={800}
          height={500}
          className="rounded-lg object-cover"
        />
      </motion.div>
    ),
    a: ({ children, href }: LinkProps) => (
      <motion.a
        href={href}
        className="text-[#00ff00] hover:text-white relative inline-block"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00ff00]"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    ),
    blockquote: ({ children }: MarkdownBaseProps) => (
      <motion.blockquote
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="border-l-4 border-[#00ff00] pl-6 my-6 italic bg-black/20 py-4 pr-4 rounded-r-lg backdrop-blur-sm"
      >
        <p className="text-gray-300">{children}</p>
      </motion.blockquote>
    ),
    ul: ({ children }: MarkdownBaseProps) => (
      <ul className="space-y-2 my-4">{children}</ul>
    ),
    ol: ({ children }: MarkdownBaseProps) => (
      <ol className="list-decimal list-inside space-y-2 my-4 ml-6 text-gray-300">
        {children}
      </ol>
    ),
  };

  const SideNavigation = () => (
    <motion.div
      className={cn(
        "fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-md z-50 p-6 overflow-y-auto",
        "transform transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}
      initial={false}
    >
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-[#00ff00]"
      >
        <X size={24} />
      </button>
      <h3 className="text-[#00ff00] font-semibold mb-4 mt-8">
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <motion.a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-gray-400 hover:text-[#00ff00] transition-colors duration-200",
              heading.level === 1
                ? "font-semibold"
                : heading.level === 2
                ? "pl-4"
                : "pl-8",
              activeSection === heading.id && "text-[#00ff00]"
            )}
            onClick={() => setIsSidebarOpen(false)}
          >
            {heading.title}
          </motion.a>
        ))}
      </nav>
    </motion.div>
  );

  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-[#00ff00] text-lg">Loading...</div>
      </motion.div>
    );
  }

  if (!post) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-4xl relative"
      >
        {/* Matrix-like background effect */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: `radial-gradient(#00ff00 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#00ff00] origin-left z-50"
          style={{ scaleX }}
        />

        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 right-4 z-50 lg:hidden bg-black/50 backdrop-blur-sm rounded-full p-2 text-[#00ff00]"
        >
          <Menu size={24} />
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-3/4">
            <Link href="/" passHref>
              <Button
                variant="outline"
                className="mb-8 border-gray-700 bg-black/20 text-gray-300 hover:bg-[#00ff00]/10 hover:border-[#00ff00] hover:text-[#00ff00] transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  className="flex items-center"
                >
                  <ChevronLeft className="mr-2 h-4 w-4 transition-colors duration-300" />
                  <span>Back to Blog</span>
                </motion.div>
              </Button>
            </Link>

            <Card className="mb-8 border-gray-800 bg-black/30 backdrop-blur-sm">
              <CardHeader className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardTitle className="text-4xl font-bold text-[#00ff00] mb-2 tracking-tight">
                    {post.title}
                  </CardTitle>
                  <p className="text-xl text-gray-400 mb-4">{post.subtitle}</p>
                  <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" /> {post.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="mr-1 h-4 w-4" /> {post.views} views
                    </span>
                    {post.readingTime && (
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" /> {post.readingTime}{" "}
                        min read
                      </span>
                    )}
                  </div>
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="prose prose-invert max-w-none"
                >
                  <ReactMarkdown components={markdownComponents}>
                    {post.content}
                  </ReactMarkdown>
                </motion.div>
              </CardContent>
            </Card>

            <motion.div
              className="flex justify-between mt-8 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {prevPost && (
                <Link href={`/blog/${prevPost}`} passHref>
                  <Button
                    variant="outline"
                    className="border-gray-700 bg-black/20 text-gray-300 hover:bg-[#00ff00]/10 hover:border-[#00ff00] hover:text-[#00ff00] transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ x: -5 }}
                      className="flex items-center"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4 transition-colors duration-300" />
                      <span>Previous Post</span>
                    </motion.div>
                  </Button>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost}`} passHref>
                  <Button
                    variant="outline"
                    className="ml-auto border-gray-700 bg-black/20 text-gray-300 hover:bg-[#00ff00]/10 hover:border-[#00ff00] hover:text-[#00ff00] transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center"
                    >
                      <span>Next Post</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-colors duration-300" />
                    </motion.div>
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Side navigation for desktop */}
          <motion.div
            className="lg:w-1/4 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <h3 className="text-[#00ff00] font-semibold mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {headings.map((heading, index) => (
                  <motion.a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={cn(
                      "block text-gray-400 hover:text-[#00ff00] transition-colors duration-200",
                      heading.level === 1
                        ? "font-semibold"
                        : heading.level === 2
                        ? "pl-4"
                        : "pl-8",
                      activeSection === heading.id && "text-[#00ff00]"
                    )}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    {heading.title}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>

        {/* Mobile side navigation */}
        <AnimatePresence>{isSidebarOpen && <SideNavigation />}</AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}