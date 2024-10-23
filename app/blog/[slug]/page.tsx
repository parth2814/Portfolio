import { Metadata } from "next";
import BlogPostDisplay from "@/components/BlogPostDisplay";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

async function fetchBlogPost(slug: string) {
  // Use absolute URL with proper environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/blog-post/${slug}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog post: ${res.status}`);
    }

    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug);

  // Default metadata if post fetch fails
  if (!post) {
    return {
      title: "Blog Post | Parth Panchal",
      description:
        "Explore cybersecurity insights and ethical hacking expertise on Parth Panchal's blog.",
    };
  }

  return {
    title: `${post.title} | Parth Panchal's Blog`,
    description:
      post.subtitle ||
      `Read about ${post.title} in Parth Panchal's cybersecurity blog. Explore insights on ethical hacking, digital security, and cutting-edge tech.`,
    openGraph: {
      title: `${post.title} | Parth Panchal's Cybersecurity Blog`,
      description:
        post.subtitle ||
        `Dive into ${post.title} and discover expert insights on cybersecurity, ethical hacking, and digital asset protection.`,
      type: "article",
      authors: ["Parth Panchal"],
      publishedTime: post.date,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`, // Default OG image
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Parth Panchal's Blog`,
      description:
        post.subtitle ||
        `Explore ${post.title} and gain expert insights on cybersecurity and ethical hacking.`,
      creator: "@052Parth",
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/twitter-card.png`], // Default Twitter card image
    },
    authors: [{ name: "Parth Panchal" }],
    keywords: [
      "cybersecurity",
      "ethical hacking",
      "security research",
      "CTF writeups",
      "Parth Panchal",
      ...post.title.toLowerCase().split(" "),
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function BlogPostPage({ params }: BlogPostParams) {
  return <BlogPostDisplay slug={params.slug} />;
}
