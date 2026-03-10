export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://yashasviprasad.com";

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<sitemap>
<loc>${baseUrl}/page-sitemap.xml</loc>
<lastmod>${new Date().toISOString()}</lastmod>
</sitemap>

<sitemap>
<loc>${baseUrl}/post-sitemap.xml</loc>
<lastmod>${new Date().toISOString()}</lastmod>
</sitemap>

</sitemapindex>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}