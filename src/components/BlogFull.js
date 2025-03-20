import React from "react";
import { X } from "react-feather";

const BlogFull = ({ selectedBlog, handleUnselectBlog }) => {
    return (
        <div className='blog-details'>
            <article>
                <header>
                    <figure>
                        <img src={selectedBlog.thumbnail} alt={selectedBlog.title} />
                    </figure>
                    <h2>{selectedBlog.title}</h2>
                    <div className='button-container'> {/*consider moving these buttons to the bottom of the page, and replacing them with the category */}
                        <button className='edit-button'>Edit</button>
                        <button className='cancel-button' onClick={handleUnselectBlog}>
                            <X /> Close
                        </button>
                        <button className='delete-button'>Delete</button>
                    </div>
                </header>
                <h3>Description:</h3>
                <p>{selectedBlog.description}</p>

                <h3>Category: {selectedBlog.category}</h3>
                {/*Consider adding a "Contributer" section */}
            </article>
        </div>
    )
}

export default BlogFull;