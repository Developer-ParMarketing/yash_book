export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://yashasviprasad.com";

    const res = await fetch(
        "https://backend.yashasviprasad.com/api/blogs",
        { cache: "no-store" }
    );

    const data = await res.json();
    const blogs = data.blogs || data;

    const urls = blogs
        .map(
            (blog) => `
<url>
<loc>${baseUrl}/blog/${blog.slug}</loc>
<lastmod>${new Date(blog.updatedAt || blog.createdAt).toISOString()}</lastmod>
</url>`
        )
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}