import { blogs } from "../data";

export default async function Page({ params }) {
    const { slug } = await params;

    const blog = blogs.find((item) => item.slug === slug);

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <img src={blog.img} width="300" />
            <p>{blog.date}</p>
            <p>Category: {blog.category}</p>
            <p>{blog.comments}</p>
        </div>
    );
}