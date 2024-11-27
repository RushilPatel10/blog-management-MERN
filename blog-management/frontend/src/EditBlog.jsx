import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        name: "",
        blogtype: "",
        message: "",
        blogimage: null,
    });

    const [existingImage, setExistingImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                const { title, name, blogtype, message, blogimage } = response.data;
                setFormData({ title, name, blogtype, message, blogimage: null });
                setExistingImage(blogimage);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blog data", err);
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            blogimage: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("name", formData.name);
        data.append("blogtype", formData.blogtype);
        data.append("message", formData.message);

        if (formData.blogimage) {
            data.append("blogimage", formData.blogimage);
        }
        try {
            const response = await axios.put(`http://localhost:5000/api/blogs/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response.data);
            navigate("/");
        } catch (err) {
            console.error("Error updating blog", err);
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="blog-post-10 pt-20 mb-120">
            <div className="container">
                <div className="inner-page-breadcrumb-wrapper mb-20">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li>Edit Blog</li>
                    </ul>
                </div>
                <div className="row g-lg-4 gy-5">
                    <div className="col-lg-8">
                        <div className="inquiry-form contact-inquiry">
                            <div className="title">
                                <h1>Edit Blog</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-inner mb-20">
                                            <label>Blog Title* :</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-20">
                                            <label>Blogger Name* :</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-20">
                                            <label>Blog Type* :</label>
                                            <select className='p-2 own' name="blogtype" value={formData.blogtype} onChange={handleChange} required >
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
                                            {existingImage && (
                                                <div>
                                                    <img
                                                        src={`http://localhost:5000/${existingImage}`}
                                                        alt="Blog"
                                                        width="100"
                                                        height="100"
                                                    />
                                                </div>
                                            )}
                                            <input type="file" name="blogimage" onChange={handleFileChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-inner mb-15">
                                            <label>Message <span> (Optional)</span></label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Write Something..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-inner">
                                    <button className="primary-btn1 contact-btn" type="submit">
                                        <span> <svg className="arrow" width="10" height="10" viewBox="0 0 10 10"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1 9L9 1M9 1C7.22222 1.33333 3.33333 2 1 1M9 1C8.66667 2.66667 8 6.33333 9 9"
                                                stroke="#191919" stroke-width="1.5" stroke-linecap="round"></path>
                                        </svg>
                                            Update  Blog</span>

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="featured-post-sideber">
                            <div className="sidebar-widget featured-post">
                                <h6>Featured Post</h6>
                                <div className="recent-post">
                                    <div className="recent-post-img">
                                        <a href="/"><img src="../assets/image/standard/sidebar-img1.png" alt="sidebar" /></a>
                                    </div>
                                    <div className="recent-post-content">
                                        <a href="/">05 January, 2024</a>
                                        <h5><a href="/">Epicurean Eats: A Feast for Foodies</a></h5>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="recent-post-img">
                                        <a href="/"><img src="../assets/image/standard/sidebar-img2.png" alt="sidebar" /></a>
                                    </div>
                                    <div className="recent-post-content">
                                        <a href="/">05 January, 2024</a>
                                        <h5><a href="/">Feast Fables Stories Told in Every Bite</a></h5>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="recent-post-img">
                                        <a href="/"><img src="../assets/image/standard/sidebar-img3.png" alt="sidebar" /></a>
                                    </div>
                                    <div className="recent-post-content">
                                        <a href="/">05 January, 2024</a>
                                        <h5><a href="/">Bite Bliss Savoring the Sweet and Savory</a>
                                        </h5>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="recent-post-img">
                                        <a href="/"><img src="../assets/image/standard/sidebar-img4.png" alt="sidebar" /></a>
                                    </div>
                                    <div className="recent-post-content">
                                        <a href="/">05 January, 2024</a>
                                        <h5><a href="/">Flavor Fiesta Exploring Taste Adventures</a>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-widget about-section">
                                <ul className="category">
                                    <li>
                                        <a href="/">About Us</a>
                                    </li>
                                    <li>
                                        <a href="/">Terms &amp; Conditions</a>
                                    </li>
                                    <li>
                                        <a href="/">Support</a>
                                    </li>
                                    <li>
                                        <a href="/">Privacy Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
