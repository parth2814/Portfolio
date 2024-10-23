import BlogPostDisplay from "@/components/BlogPostDisplay";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostDisplay slug={params.slug} />;
}
