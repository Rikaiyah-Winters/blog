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
    category: ""
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
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleNewBlog = async (e, newBlog) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/blogs', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBlog)
      });
      if (response.ok){
        const data = await response.json();
        setBlogs([...blogs, data.blog]);
        setShowNewBlogForm(false);
        setNewBlog({
          thumbnail: "",
          title: "",
          description: "",
          category: ""
        });
      } else {
        console.error("Oops - could not add blog post!");
      }
    } catch (e) {
      console.error("An error occurred during the request:", e);
    }
  };

  return (
    <div className='blog-app'>
      <Header showBlogForm={showBlogForm} />
      {showNewBlogForm && <NewBlogForm newBlog={newBlog} hideBlogForm={hideBlogForm} onUpdateForm={onUpdateForm} handleNewBlog={handleNewBlog} />}
      {selectedBlog && <BlogFull selectedBlog={selectedBlog} handleUnselectBlog={handleUnselectBlog} />}
      {!selectedBlog && !showNewBlogForm && (
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
