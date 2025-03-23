import React from "react";

const NewBlogForm = ({ newBlog, hideBlogForm, onUpdateForm}) => {
    return (
        <div className="blog-details">
            <div className="blog-form">
                <h2>New Blog Post</h2>
                <button className="cancel-button" onClick={hideBlogForm}>Cancel</button>
                <form>
                    <label>Thumbnail</label>
                    <input type="text" name="thumbnail" value={newBlog.thumbnail} onChange={(e) => onUpdateForm(e)} required />
                    
                    <label>Title</label>
                    <input type="text" name="title" value={newBlog.title} onChange={(e) => onUpdateForm(e)} required />
                    
                    <label>Description</label>
                    <textarea name="description" value={newBlog.description} onChange={(e) => onUpdateForm(e)} required />

                    <label>Category</label> {/*may need to do more research on this section */}
                    <select name="category" onChange={(e) => onUpdateForm(e)}>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="technology">Technology</option>
                        <option value="health">Health and Wellness</option>
                        <option value="food">Food and Drink</option>
                        <option value="travel">Travel</option>
                    </select>

                    <button type="submit">Publish Blog</button>
                </form>
            </div>
        </div>
    )
}

export default NewBlogForm;