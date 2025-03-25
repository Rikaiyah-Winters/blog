import React, { useState } from "react";
import EditBlogForm from "./EditBlogForm";
import { X } from "react-feather";

const BlogFull = ({ selectedBlog, handleUnselectBlog, onUpdateForm, handleUpdateBlog }) => {
    const [editing, setEditing] = useState(false);

    const handleCancel = () => {
        setEditing(false)
    }

    return (
        <div className='blog-details'>
            {editing ? (<EditBlogForm selectedBlog={selectedBlog} handleCancel={handleCancel} onUpdateForm={onUpdateForm} handleUpdateBlog={handleUpdateBlog} />) :
                (<article>
                    <header>
                        <figure>
                            <img src={selectedBlog.thumbnail} alt={selectedBlog.title} />
                        </figure>
                        <h2>{selectedBlog.title}</h2>
                        <div className='button-container'> {/*consider moving these buttons to the bottom of the page, and replacing them with the category */}
                            <button className='edit-button' onClick={() => setEditing(true)}>Edit</button>
                            <button className='cancel-button' onClick={() => handleUnselectBlog(selectedBlog)}>
                                <X /> Close
                            </button>
                            <button className='delete-button'>Delete</button>
                        </div>
                    </header>
                    <h3>Description:</h3>
                    <p>{selectedBlog.description}</p>

                    <h3>Category: {selectedBlog.category}</h3>
                    {/*Consider adding a "Contributer" section */}
                </article>)}
        </div>
    )
}

export default BlogFull;