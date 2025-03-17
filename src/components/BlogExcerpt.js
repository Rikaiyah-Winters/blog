import React from "react";

const BlogExcerpt = ({ blog }) => {
    return (
        <article className="blog-card">
            <p className="blog-category">{blog.category}</p>
            <figure>
                <img src={blog.thumbnail} alt={blog.title} />
            </figure>
            <h2>{blog.title}</h2>
            <p className="flex-spacing">Description: {blog.description}</p>
            <button>View</button>
        </article>
    )
}

export default BlogExcerpt