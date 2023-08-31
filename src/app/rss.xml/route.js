import { getBlogPostList } from "../../helpers/file-helpers";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Vivek Raman's developer blog",
    site_url: "https://zambool.com",
    feed_url: "https://zambool.com/rss.xml",
  });

  const blogPosts = await getBlogPostList();

  blogPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `https://zambool.com/${post.slug}`,
      date: post.publishedOn,
      description: post.abstract,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/xml" },
  });
}
