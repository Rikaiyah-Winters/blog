import React from "react";
import { truncateText } from "../helpers/utils";

const BlogExcerpt = ({ blog, handleSelectBlog }) => {
    return (
        <article className="blog-card">
            <p className="blog-category">{blog.category}</p>
            <figure>
                <img src={blog.thumbnail} alt={blog.title} />
            </figure>
            <h2>{blog.title}</h2>
            <p className="flex-spacing">Description: {truncateText(blog.description, 20)}</p>
            <button onClick={() => handleSelectBlog(blog)}>View</button>
        </article>
    )
}

export default BlogExcerpt;