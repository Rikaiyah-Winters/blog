import React from "react";

const BlogFull = () => {
    return (
        <div className='blog-details'>
            <article>
                <header>
                    <figure>
                        <img />
                    </figure>
                    <h2>{ }</h2> 
                    <div className='button-container'> {/*consider moving these buttons to the bottom of the page, and replacing them with the category */}
                        <button className='edit-button'>Edit</button>
                        <button className='cancel-button'>
                            Close
                        </button>
                        <button className='delete-button'>Delete</button>
                    </div>
                </header>

                <h3>Description:</h3>
                <p>{ }</p>

                {/*Consider adding a "Contributer" section */}
            </article>
        </div>
    )
}

export default BlogFull;