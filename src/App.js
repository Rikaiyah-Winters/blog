import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import BlogExcerpt from "./components/BlogExcerpt";
import BlogFull from "./components/BlogFull";
import NewBlogForm from "./components/NewBlogForm";
import displayToast from "./helpers/toasterHelper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          displayToast("Oops -  could not fetch blogs!", "error");
        }
      } catch (e) {
        console.error("An error occurred during the request:", e);
        displayToast("An unexpected error occurred. Please try again later.", "error");
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
        displayToast("Blog post added succesfully!", "success")
        setShowNewBlogForm(false);
        setNewBlog({
          thumbnail: "",
          title: "",
          description: "",
          category: ""
        });
      } else {
        displayToast("Oops - could not add blog post!", "error");
      }
    } catch (e) {
      displayToast("An error occurred during the request:", "error");
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
        displayToast("Blog updated!", "success")
      } else {
        displayToast("Oops - could not update blog post!", "error");
      }
    } catch (e) {
      displayToast("An error occurred during the request:", "error");
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
        displayToast("Blog post was deleted successfully!")
      } else {
        displayToast("Oops - could not delete blog post!", "error");
      }
    } catch (e) {
      displayToast("Something went wrong during the request:", "error");
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

  const updateSearchTerm = (text) => {
    setSearchTerm(text);
  };

  const handleSearch = () => {
    const searchResults = blogs.filter((blog) => {
      const valuesToSearch = [blog.title, blog.description];
      return valuesToSearch.some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));
    })
    return searchResults;
  }

  const displayedBlogs = searchTerm ? handleSearch() : blogs;

  const displayAllBlogs = () => {
    setSearchTerm("");
    setSelectedBlog(null);
    setShowNewBlogForm(false);
  }
  
  return (
    <div className='blog-app'>
      <Header showBlogForm={showBlogForm} updateSearchTerm={updateSearchTerm} searchTerm={searchTerm} displayAllBlogs={displayAllBlogs} />
      {showNewBlogForm && <NewBlogForm newBlog={newBlog} hideBlogForm={hideBlogForm} onUpdateForm={onUpdateForm} handleNewBlog={handleNewBlog} />}
      {selectedBlog && <BlogFull selectedBlog={selectedBlog} handleUnselectBlog={handleUnselectBlog} onUpdateForm={onUpdateForm} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} />}
      {!selectedBlog && !showNewBlogForm && (
        < div className="blog-list">
          {displayedBlogs.map((blog) => (
            <BlogExcerpt key={blog.id} blog={blog} handleSelectBlog={handleSelectBlog} />
          ))}
        </div>
      )
      }
      <ToastContainer />
    </div >
  );
}

export default App;
