export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://yashasviprasad.com";

    const pages = [
        "",
        "/#home",
        "/#blogs",
        "/#philosophy",
        // "/#The_Book",
        "/#key-ideas",
        "/#buy-the-book",
        "/about-me",
        "/contact-us"
    ];

    const urls = pages
        .map(
            (page) => `
<url>
<loc>${baseUrl}${page}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
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