import React from "react";

const EditBlogForm = ({ selectedBlog, handleCancel, onUpdateForm, handleUpdateBlog }) => {
    return (
        <div className="blog-form">
            <h2>Edit "{selectedBlog.title}"</h2>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            <form onSubmit={(e) => handleUpdateBlog(e, selectedBlog)}>
                <label>Thumbnail</label>
                <input type="text" name="thumbnail" value={selectedBlog.thumbnail} onChange={(e) => onUpdateForm(e, "update")} required />

                <label>Title</label>
                <input type="text" name="title" value={selectedBlog.title} onChange={(e) => onUpdateForm(e, "update")} />

                <label>Description</label>
                <textarea name="description" value={selectedBlog.description} onChange={(e) => onUpdateForm(e, "update")} />

                <label>Category</label>
                <select name="category" onChange={(e) => onUpdateForm(e, "update")}>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Technology">Technology</option>
                    <option value="Health and Wellness">Health and Wellness</option>
                    <option value="Food and Drink">Food and Drink</option>
                    <option value="Travel">Travel</option>
                </select>
                <button type="submit">Update Blog</button>
            </form>
        </div>
    )
}

export default EditBlogForm;