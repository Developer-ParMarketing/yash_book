export default async function sitemap() {
    const baseUrl = "https://yashasviprasad.com";

    const res = await fetch("https://backend.yashasviprasad.com/api/blogs", {
        cache: "no-store",
    });

    const data = await res.json();

    const blogs = data.blogs || data;

    const blogUrls = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...blogUrls,
    ];
}