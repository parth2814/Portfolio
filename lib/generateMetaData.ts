import type { Metadata } from "next";

export function generateBlogMetadata(title: string): Metadata {
  return {
    title: `${title} | Parth Panchal's Blog`,
    description: `Read about ${title} in Parth Panchal's cybersecurity blog. Explore insights on ethical hacking, digital security, and cutting-edge tech.`,
    openGraph: {
      title: `${title} | Parth Panchal's Cybersecurity Blog`,
      description: `Dive into ${title} and discover expert insights on cybersecurity, ethical hacking, and digital asset protection.`,
      type: "article",
      authors: ["Parth Panchal"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Parth Panchal's Cybersecurity Blog`,
      description: `Explore ${title} and gain expert insights on cybersecurity and ethical hacking.`,
    },
  };
}
