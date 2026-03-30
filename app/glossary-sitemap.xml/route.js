export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://yashasviprasad.com";

    try {
        const res = await fetch(
            "https://backend.yashasviprasad.com/api/glossary",
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("API not working");
        }

        const data = await res.json();

        console.log("GLOSSARY API RESPONSE:", data); // 👈 IMPORTANT

        const glossary = data.data || data.glossary || [];

        const urls = glossary
            .filter(item => item && item.slug)
            .map((item) => {
                const safeDate = item.updatedAt || item.createdAt || new Date();

                return `
<url>
<loc>${baseUrl}/glossary/${item.slug}</loc>
<lastmod>${new Date(safeDate).toISOString()}</lastmod>
</url>`;
            })
            .join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
            headers: { "Content-Type": "application/xml" },
        });

    } catch (error) {
        console.error("❌ GLOSSARY SITEMAP ERROR:", error);

        return new Response(
            `Error generating sitemap: ${error.message}`,
            { status: 500 }
        );
    }
}