import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const postsDirectory = path.join(process.cwd(), "public", "blog");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Get all post slugs and sort them by date
  const postSlugs = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  const sortedSlugs = postSlugs.sort((a, b) => {
    const aData = matter(
      fs.readFileSync(path.join(postsDirectory, `${a}.md`), "utf8")
    ).data;
    const bData = matter(
      fs.readFileSync(path.join(postsDirectory, `${b}.md`), "utf8")
    ).data;
    return new Date(bData.date).getTime() - new Date(aData.date).getTime();
  });

  const currentIndex = sortedSlugs.indexOf(slug);
  const nextPost = currentIndex > 0 ? sortedSlugs[currentIndex - 1] : null;
  const prevPost =
    currentIndex < sortedSlugs.length - 1
      ? sortedSlugs[currentIndex + 1]
      : null;

  const post = {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    date: data.date,
    views: data.views || 0,
    content,
  };

  return NextResponse.json({ post, nextPost, prevPost });
}
