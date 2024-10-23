/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Components } from "react-markdown";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { motion, HTMLMotionProps, MotionProps } from "framer-motion";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Types
type MarkdownComponentProps<T extends keyof JSX.IntrinsicElements> = Partial<
  JSX.IntrinsicElements[T]
> & {
  children?: React.ReactNode;
};

type HeadingProps = {
  children: React.ReactNode;
} & Omit<MotionProps, keyof HTMLMotionProps<"h1">>;

interface CustomLinkProps
  extends DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href?: string;
  children?: React.ReactNode;
}

interface CustomCodeProps extends HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  node?: any;
}

// CopyButton Component
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
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

// Markdown Components
export const markdownComponents: Partial<Components> = {
  h1: ({ children }: MarkdownComponentProps<"h1">) => {
    const motionProps = {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5 },
    } as const;

    return (
      <motion.h1
        {...motionProps}
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className="text-3xl font-bold text-[#00ff00] mt-8 mb-4 tracking-tight"
      >
        {children}
      </motion.h1>
    );
  },

  h2: ({ children }: MarkdownComponentProps<"h2">) => {
    const motionProps = {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, delay: 0.1 },
    } as const;

    return (
      <motion.h2
        {...motionProps}
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className="text-2xl font-semibold text-[#00ff00]/90 mt-6 mb-3 tracking-tight"
      >
        {children}
      </motion.h2>
    );
  },

  code: ({ inline, className, children }: CustomCodeProps) => {
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

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-grid-green-02 bg-[length:24px_24px]" />

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
                showLineNumbers
                wrapLines
                wrapLongLines
              >
                {codeString}
              </SyntaxHighlighter>
            </div>

            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300
                      group-hover:border-[#00ff00]/20 pointer-events-none"
              initial={false}
              animate={{
                boxShadow: "0 0 20px rgba(0, 255, 0, 0.05)",
              }}
            />
          </div>

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

  img: ({ src, alt }: MarkdownComponentProps<"img">) => {
    const motionProps: HTMLMotionProps<"div"> = {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 },
      whileHover: { scale: 1.02 },
    };

    return (
      <motion.div
        {...motionProps}
        className="my-8 rounded-lg overflow-hidden relative"
      >
        <Image
          src={src ? "/" + src : ""}
          alt={alt || ""}
          width={800}
          height={500}
          className="rounded-lg object-cover"
        />
      </motion.div>
    );
  },

  a: ({ href, children }: CustomLinkProps) => {
    const motionProps: HTMLMotionProps<"a"> = {
      whileHover: { scale: 1.05 },
    };

    return (
      <motion.a
        {...motionProps}
        href={href}
        className="text-[#00ff00] hover:text-white relative inline-block"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00ff00]"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    );
  },

  blockquote: ({ children }: MarkdownComponentProps<"blockquote">) => {
    const motionProps: HTMLMotionProps<"blockquote"> = {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5 },
    };

    return (
      <motion.blockquote
        {...motionProps}
        className="border-l-4 border-[#00ff00] pl-6 my-6 italic bg-black/20 py-4 pr-4 rounded-r-lg backdrop-blur-sm"
      >
        <p className="text-gray-300">{children}</p>
      </motion.blockquote>
    );
  },

  // Rest of the components remain the same but with proper motion props separation if needed
  ul: ({ children, ...props }: MarkdownComponentProps<"ul">) => (
    <ul className="list-none space-y-2 my-4 ml-6" {...props}>
      {React.Children.map(children, (child) => (
        <motion.li
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start space-x-2 text-gray-300"
        >
          <span className="text-[#00ff00] mt-1.5">•</span>
          <span>{child}</span>
        </motion.li>
      ))}
    </ul>
  ),

  ol: ({ children, ...props }: MarkdownComponentProps<"ol">) => (
    <ol
      className="list-decimal list-inside space-y-2 my-4 ml-6 text-gray-300"
      {...props}
    >
      {children}
    </ol>
  ),
};

export default markdownComponents;
