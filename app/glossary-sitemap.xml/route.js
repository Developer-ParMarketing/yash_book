export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://yashasviprasad.com";

    try {
        const res = await fetch(
            "https://backend.yashasviprasad.com/api/glossary",
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("API failed");
        }

        const data = await res.json();
        const glossary = data.glossary || data;

        const urls = glossary
            .map(
                (item) => `
<url>
<loc>${baseUrl}/glossary/${item.slug}</loc>
<lastmod>${new Date(item.updatedAt || item.createdAt).toISOString()}</lastmod>
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

    } catch (error) {
        console.error("SITEMAP ERROR:", error);

        return new Response("Error generating sitemap", {
            status: 500,
        });
    }
}