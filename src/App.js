import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import BlogExcerpt from "./components/BlogExcerpt";
import BlogFull from "./components/BlogFull";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

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

  return (
    <div className='blog-app'>
      <Header />
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
