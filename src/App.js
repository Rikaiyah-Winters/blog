import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import BlogExcerpt from "./components/BlogExcerpt";
import BlogFull from "./components/BlogFull";
import NewBlogForm from "./components/NewBlogForm";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    thumbnail: "",
    title: "",
    descriptions: "",
    category:""
  });
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.log("Oops -  could not fetch blogss!");
        }
      } catch (e) {
        console.error("An error occurred during the request:", e);
        console.log("An unexpected error occurred. Please try again later.");
      }
    };
    fetchAllBlogs();
  }, [])

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
  }

  const handleUnselectBlog = () => {
    setSelectedBlog(null);
  }

  const hideBlogForm = () => {
    setShowNewBlogForm(false);
  }

  const showBlogForm = () => {
    setShowNewBlogForm(true);
    setSelectedBlog(null);
  }

  const onUpdateForm = (e) => {
    const { name, value } = e.target;
    setNewBlog({...newBlog, [name]: value})
  }

  return (
    <div className='blog-app'>
      <Header showBlogForm={showBlogForm} />
      {showNewBlogForm && <NewBlogForm newBlog={newBlog} hideBlogForm={hideBlogForm} onUpdateForm={onUpdateForm}/>}
      {selectedBlog && <BlogFull selectedBlog={selectedBlog} handleUnselectBlog={handleUnselectBlog} />}
      {!selectedBlog && (
        < div className="blog-list">
          {blogs.map((blog) => (
            <BlogExcerpt key={blog.id} blog={blog} handleSelectBlog={handleSelectBlog} />
          ))}
        </div>
      )
      }
    </div >
  );
}

export default App;
