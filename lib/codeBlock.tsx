import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Check, Copy, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const customCodeTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: "#e3e9f0",
    background: "none",
    fontFamily:
      'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
    fontSize: "14px",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.6",
    tabSize: 2,
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#e3e9f0",
    background: "#1a1b26",
    padding: "1em",
    margin: "0",
    overflow: "auto",
    borderRadius: "0 0 6px 6px",
  },
  'pre[class*="language-"]::-webkit-scrollbar': {
    width: "12px",
    height: "12px",
    background: "#1a1b26",
  },
  'pre[class*="language-"]::-webkit-scrollbar-thumb': {
    background: "#2d2f3a",
    borderRadius: "6px",
    border: "3px solid #1a1b26",
  },
  ':not(pre) > code[class*="language-"]': {
    padding: ".1em",
    borderRadius: ".3em",
    whiteSpace: "normal",
  },
  comment: { color: "#565f89" },
  prolog: { color: "#565f89" },
  doctype: { color: "#565f89" },
  cdata: { color: "#565f89" },
  punctuation: { color: "#7982a9" },
  property: { color: "#9d7cd8" },
  tag: { color: "#7dcfff" },
  boolean: { color: "#ff9e64" },
  number: { color: "#ff9e64" },
  constant: { color: "#ff9e64" },
  symbol: { color: "#73daca" },
  selector: { color: "#9ece6a" },
  "attr-name": { color: "#9d7cd8" },
  string: { color: "#9ece6a" },
  char: { color: "#9ece6a" },
  builtin: { color: "#7dcfff" },
  inserted: { color: "#9ece6a" },
  operator: { color: "#89ddff" },
  entity: { color: "#7dcfff" },
  url: { color: "#7dcfff" },
  variable: { color: "#bb9af7" },
  atrule: { color: "#bb9af7" },
  "attr-value": { color: "#9ece6a" },
  function: { color: "#7dcfff" },
  keyword: { color: "#bb9af7" },
  regex: { color: "#89ddff" },
  important: { color: "#ff9e64", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  deleted: { color: "#f7768e" },
  "class-name": { color: "#7dcfff" },
};

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard", {
        style: { background: "#1a1b26", color: "#9ece6a" },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={copyToClipboard}
      className="p-2 hover:bg-gray-800/50 rounded transition-colors"
    >
      {copied ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <Copy size={16} className="text-gray-400" />
      )}
    </motion.button>
  );
};

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  className,
  children,
}) => {
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");

  if (!match) {
    return (
      <code className="bg-gray-800/50 px-2 py-1 rounded text-gray-300 font-mono text-sm">
        {children}
      </code>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden my-6 bg-[#1a1b26] shadow-xl"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-[#1f2937]">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#f7768e]" />
            <div className="w-3 h-3 rounded-full bg-[#ff9e64]" />
            <div className="w-3 h-3 rounded-full bg-[#9ece6a]" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-gray-400" />
            <span className="text-sm text-gray-400 font-mono">{match[1]}</span>
          </div>
        </div>
        <CopyButton text={codeString} />
      </div>

      <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
        <SyntaxHighlighter
          language={match[1]}
          style={customCodeTheme}
          showLineNumbers
          wrapLines
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1em",
            color: "#565f89",
            background: "#1a1b26",
            marginRight: "1em",
            borderRight: "1px solid #2d2f3a",
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </motion.div>
    </motion.div>
  );
};
