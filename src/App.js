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
      if (response.ok) {
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

  const handleUpdateBlog = async (e, selectedBlog) => {
    e.preventDefault();

    const { id } = selectedBlog;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(selectedBlog)
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(
          blogs.map((blog) => {
            if (blog.id === id) {
              return data.blog;
            }
            return blog;
          })
        );
        console.log("Blog updated!")
      } else {
        console.error("Oops - could not update blog post!");
      }
    } catch (e) {
      console.error("An error occurred during the request:", e);
    }
    setSelectedBlog(null);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE"
      })
      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
        setSelectedBlog(null);
        console.log("Blog post was deleted successfully!")
      } else {
        console.error("Oops - could not delete blog post!");
      }
    } catch (e) {
      console.error("Something went wrong during the request:", e);
    }
  }

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

  const onUpdateForm = (e, action = "new") => {
    const { name, value } = e.target;
    if (action === "update") {
      setSelectedBlog({ ...selectedBlog, [name]: value })
    } else {
      setNewBlog({ ...newBlog, [name]: value })
    }
  }
  
  return (
    <div className='blog-app'>
      <Header showBlogForm={showBlogForm} />
      {showNewBlogForm && <NewBlogForm newBlog={newBlog} hideBlogForm={hideBlogForm} onUpdateForm={onUpdateForm} handleNewBlog={handleNewBlog} />}
      {selectedBlog && <BlogFull selectedBlog={selectedBlog} handleUnselectBlog={handleUnselectBlog} onUpdateForm={onUpdateForm} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} />}
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
