export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://yashasviprasad.com";

    const pages = [
        "",
        "/#home",
        "/#blogs",
        "/#Philosophy",
        "/#The_Book",
        "/#Key_Ideas",
        "/#Buy_the_Book",
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