import React from "react";

const NewBlogForm = ({ newBlog, hideBlogForm, onUpdateForm, handleNewBlog }) => {
    return (
        <div className="blog-details">
            <div className="blog-form">
                <h2>New Blog Post</h2>
                <button className="cancel-button" onClick={hideBlogForm}>Cancel</button>
                <form onSubmit={(e) => handleNewBlog(e, newBlog)}>
                    <label>Thumbnail</label>
                    <input type="text" name="thumbnail" value={newBlog.thumbnail} onChange={(e) => onUpdateForm(e)} required />
                    
                    <label>Title</label>
                    <input type="text" name="title" value={newBlog.title} onChange={(e) => onUpdateForm(e)} required />
                    
                    <label>Description</label>
                    <textarea name="description" value={newBlog.description} onChange={(e) => onUpdateForm(e)} required />

                    <label>Category</label>
                    <select name="category" onChange={(e) => onUpdateForm(e)}>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Technology">Technology</option>
                        <option value="Health and Wellness">Health and Wellness</option>
                        <option value="Food and Drink">Food and Drink</option>
                        <option value="Travel">Travel</option>
                    </select>

                    <button type="submit">Publish Blog</button>
                </form>
            </div>
        </div>
    )
}

export default NewBlogForm;