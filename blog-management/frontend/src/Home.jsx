import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("travel");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const fileInputRef = useRef(null);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`); // Use navigate to redirect
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(response.data);
            } catch (err) {
                setError("Error fetching blogs");
                console.error(err);
            }
        };
        fetchBlogs();
    }, []);

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${id}`);
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
            setToastMessage("Blog deleted successfully!");
            setShowToast(true);
            if (window.location.pathname === `/blog/${id}`) {
                navigate("/"); // Redirect to home page after deletion
            }
        } catch (err) {
            console.error("Error deleting blog", err);
            setToastMessage("Error deleting blog");
            setShowToast(true);
        }
    };

    const filteredBlogs = blogs.filter((blog) => blog.blogtype === category);
    return (
        <div>
            <ToastContainer position="bottom-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} className="bg-dark" autohide>
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>

            <div className="blog-post2 mt-4">
                <div className="container">
                    <div className="row g-4 mb-4 mt-4">
                        <div className="col-12">
                            <div className="blog-border two m-0">
                                <div className="spot-light-btn">
                                    <a href="/">
                                        Spot Light
                                    </a>
                                </div>
                                <div className="row mb-40">
                                    <div className="col-lg-12">
                                        <ul className="nav nav-tabs" id="myTab5" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className={`nav-link ${category === "travel" ? "active" : ""}`} onClick={() => setCategory("travel")} id="travel-tab" >Travel</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${category === "food" ? "active" : ""}`} onClick={() => setCategory("food")} id="food-tab">Food</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${category === "fashion" ? "active" : ""}`} onClick={() => setCategory("fashion")} id="fashion-tab">Fashion</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${category === "tech" ? "active" : ""}`} onClick={() => setCategory("tech")} id="tech-tab">Tech</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${category === "beauty" ? "active" : ""}`} onClick={() => setCategory("beauty")} id="beauty-tab">Beauty</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${category === "gaming" ? "active" : ""}`} onClick={() => setCategory("gaming")} id="gaming-tab">Gaming</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* </div> */}
                                <div className="row ">
                                    <div className="col-lg-12">
                                        <div className="tab-content" id="myTabContent5">
                                            <div className="tab-pane fade show active" id="travel" role="tabpanel">
                                                <div className="row g-4 gy-5">
                                                    {filteredBlogs.length === 0 ? (
                                                        <div className="h-250 d-flex justify-content-center align-items-center">
                                                            <h3 className="text-center">No blogs available in this category.</h3>
                                                        </div>
                                                    ) : (
                                                        filteredBlogs.map((blog) => (
                                                            <div key={blog._id} className="col-md-6">
                                                                <div className="blog-card">
                                                                    <div className="blog-card-img-wrap">
                                                                        <a href={`blog/${blog._id}`}>
                                                                            <img src={`http://localhost:5000/${blog.blogimage}`} alt={blog.title} ref={fileInputRef} />
                                                                        </a>
                                                                        <a href={`category/${blog.blogtype}`}>
                                                                            <span>{blog.blogtype}</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="blog-content">
                                                                        <div className="author-area justify-content-between">
                                                                            <ul>
                                                                                <li>
                                                                                    <a href="#">{blog.name}   onClick={() => handleBlogClick(blog._id)}</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="publish-date" href={`blog/${blog._id}`}>
                                                                                        <svg width={6} height={6} viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <circle cx={3} cy={3} r={3} fill="#C4C4C4"></circle>
                                                                                        </svg>
                                                                                        {new Date(blog.createdAt).toLocaleDateString()}
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                            <div className="actions">
                                                                                <Link to={`/edit/${blog._id}`}>
                                                                                    <i className="fa-regular fa-pen-to-square me-4 text-success" style={{ cursor: "pointer" }}></i>
                                                                                </Link>
                                                                                <i className="fa-regular fa-trash-can text-danger" onClick={() => deleteBlog(blog._id)} style={{ cursor: "pointer" }}></i>
                                                                            </div>
                                                                        </div>
                                                                        <h5>
                                                                            <a href={`blog/${blog._id}`}>{blog.title}</a>
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contect-section">
                                <h3>Subscribe To Get Update Latest Blog Post</h3>
                                <div className="input-area">
                                    <input type="email" placeholder="Enter Email" className />
                                    <button type="submit">
                                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.9647 0.685806C16.0011 0.594942 16.01 0.495402 15.9904 0.399526C15.9707 0.303649 15.9233 0.215653 15.8541 0.146447C15.7849 0.0772403 15.6969 0.0298668 15.601 0.0101994C15.5052 -0.0094681 15.4056 -0.000564594 15.3147 0.0358061L0.76775 5.85481H0.76675L0.31475 6.03481C0.22914 6.06895 0.154635 6.1261 0.0994654 6.19994C0.0442956 6.27377 0.0106078 6.36142 0.00212322 6.4532C-0.00636132 6.54497 0.0106876 6.63731 0.0513867 6.72001C0.0920859 6.8027 0.154851 6.87254 0.23275 6.92181L0.64275 7.18181L0.64375 7.18381L5.63875 10.3618L8.81675 15.3568L8.81875 15.3588L9.07875 15.7688C9.12817 15.8464 9.19805 15.9089 9.28068 15.9493C9.36332 15.9897 9.45551 16.0066 9.54711 15.998C9.63871 15.9894 9.72617 15.9558 9.79985 15.9007C9.87354 15.8456 9.9306 15.7712 9.96475 15.6858L15.9647 0.685806ZM14.1317 2.57581L6.63775 10.0698L6.42275 9.73181C6.38336 9.66978 6.33078 9.6172 6.26875 9.57781L5.93075 9.36281L13.4247 1.86881L14.6027 1.39781L14.1327 2.57581H14.1317Z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                                <p>
                                    <svg width={12} height={12} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_786_352)">
                                            <path d="M12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6ZM9.0225 3.7275C8.96893 3.67411 8.90514 3.63208 8.83495 3.60391C8.76476 3.57574 8.68961 3.56202 8.61399 3.56356C8.53838 3.5651 8.46385 3.58187 8.39486 3.61288C8.32588 3.64388 8.26385 3.68848 8.2125 3.744L5.60775 7.06275L4.038 5.49225C3.93137 5.39289 3.79033 5.3388 3.64461 5.34137C3.49888 5.34394 3.35984 5.40297 3.25678 5.50603C3.15372 5.60909 3.09469 5.74813 3.09212 5.89386C3.08955 6.03958 3.14364 6.18062 3.243 6.28725L5.2275 8.2725C5.28096 8.32586 5.34462 8.36791 5.41469 8.39614C5.48475 8.42437 5.55979 8.43819 5.63531 8.43679C5.71083 8.43539 5.7853 8.4188 5.85427 8.38799C5.92324 8.35719 5.9853 8.31281 6.03675 8.2575L9.03075 4.515C9.13282 4.40887 9.18921 4.26696 9.18781 4.11972C9.1864 3.97248 9.12732 3.83166 9.02325 3.7275H9.0225Z">
                                            </path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_786_352">
                                                <rect width={12} height={12} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    No Credit Card Required
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Home