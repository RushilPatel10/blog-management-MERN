import React, { useState, useRef } from "react";
import axios from "axios";

const AddBlog = () => {
    const initialFormState = {
        title: "",
        name: "",
        blogtype: "",
        message: "",
        blogimage: null,
    };

    const [formData, setFormData] = useState(initialFormState);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, blogimage: e.target.files[0], });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("name", formData.name);
        data.append("blogtype", formData.blogtype);
        data.append("message", formData.message);
        data.append("blogimage", formData.blogimage);

        try {
            const response = await axios.post("http://localhost:5000/api/add", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Blog added successfully!", response.data);

            setFormData(initialFormState);

        } catch (err) {
            console.error("Error adding blog:", err.response?.data || err.message);
        }
    };


    return (
        <div className="blog-post-10 pt-20 mb-120">
            <div className="container">
                <div className="inner-page-breadcrumb-wrapper mb-20">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li>Add Blog</li>
                    </ul>
                </div>
                <div className="row g-lg-4 gy-5">
                    <div className="col-12">
                        <div className="inquiry-form contact-inquiry">
                            <div className="title">
                                <h1>Add Blog!</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-inner mb-20">
                                            <label>Blog Title* :</label>
                                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Travelling to New York" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-20">
                                            <label>Blogger Name* :</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jackson Mile" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-20">
                                            <label>Blog Type* :</label>
                                            <select className='p-2  own' name="blogtype" onChange={handleChange} value={formData.blogtype} required>
                                                <option className="my-select" value="">Please select the Type</option>
                                                <option className="my-select" value="travel">Travel</option>
                                                <option className="my-select" value="food">Food</option>
                                                <option className="my-select" value="fashion">Fashion</option>
                                                <option className="my-select" value="tech">Tech</option>
                                                <option className="my-select" value="beauty">Beauty</option>
                                                <option className="my-select" value="gaming">Gaming</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-inner mb-20">
                                            <label>Blog Image* :</label>
                                            <input type="file" name="blogimage" ref={fileInputRef} onChange={handleFileChange} required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-inner mb-15">
                                            <label>Message <span> (Optional)</span></label>
                                            <textarea name="message" onChange={handleChange} value={formData.message} placeholder="Write Something..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-inner">
                                    <button className="primary-btn1 contact-btn" data-text="Post Comment" type="submit">
                                        <span> <svg className="arrow" width="10" height="10" viewBox="0 0 10 10"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1 9L9 1M9 1C7.22222 1.33333 3.33333 2 1 1M9 1C8.66667 2.66667 8 6.33333 9 9"
                                                stroke="#191919" stroke-width="1.5" stroke-linecap="round"></path>
                                        </svg>
                                            SUBMIT</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddBlog;
