/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Components } from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, Copy, Star } from "lucide-react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error("Failed to copy text");
    }
  };

  return (
    <motion.button
      onClick={copyToClipboard}
      className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check size={16} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Copy size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const BlogMarkdownComponents: Partial<Components> = {
  h1: ({ children }) => {
    const id =
      typeof children === "string"
        ? children.toLowerCase().replace(/\s+/g, "-")
        : "";

    return (
      <motion.h1
        id={id}
        className="text-4xl font-extrabold text-white mt-16 mb-6 tracking-tight scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h1>
    );
  },

  h2: ({ children }) => (
    <motion.h2
      className="text-3xl font-bold text-white mt-10 mb-5 tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {children}
    </motion.h2>
  ),

  h3: ({ children }) => (
    <motion.h3
      className="text-2xl font-semibold text-white mt-8 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </motion.h3>
  ),

  p: ({ children }) => (
    <motion.p
      className="text-gray-300 leading-relaxed text-lg font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  ),

  strong: ({ children }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),

  em: ({ children }) => <em className="italic text-gray-400">{children}</em>,

  blockquote: ({ children }) => (
    <motion.blockquote
      className="border-l-4 border-green-500 pl-4 my-6 italic bg-gray-800 py-3 px-4 rounded-r-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.blockquote>
  ),

  code: ({ className, children }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    if (match) {
      return (
        <motion.div
          className="relative my-8 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-gray-200">
            <span className="text-sm font-mono">{match[1]}</span>
            <CopyButton text={codeString} />
          </div>
          <SyntaxHighlighter
            style={atomDark}
            language={match[1]}
            PreTag="div"
            className="!m-0 !rounded-t-none !bg-[#1e1e1e]"
            showLineNumbers
            wrapLines
            customStyle={{
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </motion.div>
      );
    }

    return (
      <code className="px-1.5 py-0.5 rounded-md font-mono text-sm bg-gray-700 text-gray-200">
        {children}
      </code>
    );
  },

  a: ({ href, children }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-400 hover:text-green-300 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.a>
  ),

  ul: ({ children }) => (
    <ul className="space-y-2 my-6 ml-6 text-gray-300">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal space-y-2 my-6 ml-6 text-gray-300">
      {children}
    </ol>
  ),

  li: ({ children }) => {
    // Check if children is a string and starts with a bullet point
    const childContent = React.Children.map(children, (child) => {
      if (typeof child === "string") {
        // Remove any leading asterisk or bullet point and trim
        return child.replace(/^\s*[\*\•]\s*/, "");
      }
      return child;
    });

    return (
      <motion.li
        className="flex items-start gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[#00ff00] flex-shrink-0 mt-1">✦</span>
        <span>{childContent}</span>
      </motion.li>
    );
  },

  img: ({ src, alt }) => (
    <motion.div
      className="my-8 rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={"/" + src || ""}
        alt={alt || ""}
        width={800}
        height={400}
        className="w-full h-auto object-cover"
      />
    </motion.div>
  ),
};

export default BlogMarkdownComponents;