"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  date: string;
  slug: string;
}

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch("/api/blog-posts");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const posts: BlogPost[] = await response.json();
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, []);

  return (
    <section className="mb-16">
      <h3 className="text-gray-400 mb-6 font-medium">JOURNAL</h3>
      <ul className="space-y-6">
        {blogPosts.map((post, index) => (
          <motion.li
            key={post.slug}
            className="flex flex-row items-center justify-center text-start group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 10 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="text-[#00ff00] group-hover:text-white transition-colors duration-300 inline-block mb-2"
            >
              {post.title}
            </Link>
            <div className="flex items-center w-full justify-end">
              <motion.span
                className="text-gray-400 mx-2 overflow-hidden"
                style={{
                  width: `calc(100% - ${post.date.length * 8}px)`,
                  height: "1px",
                  borderTop: "1px dotted #4a4a4a",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.span
                className="text-gray-400 text-sm border border-gray-400 rounded-full px-2 py-1 whitespace-nowrap flex-shrink-0"
                whileHover={{
                  backgroundColor: "rgba(0, 255, 0, 0.1)",
                  borderColor: "#00ff00",
                }}
              >
                {post.date}
              </motion.span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
