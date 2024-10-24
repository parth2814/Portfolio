"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Eye,
  Clock,
  X,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import markdownComponents from "@/lib/markdownComp";

interface BlogPost {
  title: string;
  subtitle: string;
  date: string;
  views: number;
  content: string;
  slug: string;
  readingTime?: string;
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsSidebarOpen(false);
    }
  };

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

        // Only extract h1 headings (single #)
        const headingRegex = /^#\s+([^#\n]+)/gm;
        const extractedHeadings = [];
        let match;
        while ((match = headingRegex.exec(data.post.content)) !== null) {
          extractedHeadings.push({
            id: match[1].trim().toLowerCase().replace(/\s+/g, "-"),
            title: match[1].trim(),
            level: 1,
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
      <h3 className="text-[#00ff00] font-semibold mb-4 mt-8">Sections</h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <motion.a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-gray-400 hover:text-[#00ff00] transition-colors duration-200 font-semibold",
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
        {/* Matrix-like background effect
        <motion.div
          className="fixed inset-0 pointer-events-none z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: `radial-gradient(#00ff00 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        /> */}

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
              <h3 className="text-[#00ff00] font-semibold mb-4">Sections</h3>
              <nav className="space-y-3">
                {headings.map((heading) => (
                  <motion.a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={cn(
                      "block text-gray-400 hover:text-[#00ff00] transition-colors duration-200 font-semibold",
                      activeSection === heading.id && "text-[#00ff00]"
                    )}
                    onClick={(e) => handleNavClick(e, heading.id)}
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