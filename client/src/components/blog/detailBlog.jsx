import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../../layouts/navBar";
import Comment from './comment';
import axios from 'axios';
import { Search } from '../../layouts/search';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthContext } from "../../context/authContext";

function DetailBlog() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);

    //Get chi tiết
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/v1/blog/${id}`);
                console.log(response.data);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching the post:", error);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; //đang load
    }

    if (!post) {
        return <div>Bài viết không tồn tại!</div>; //Báo lỗi
    }
    //thêm vào yêu thích
    const toggleFavorite = async () => {
        if (!user) return;

        try {
            if (isFavorited) {
                // Remove 
                await axios.delete(
                    `http://localhost:8800/v1/favorite`,
                    {
                        data: {
                            userId: user._id,
                            type: "post",
                            itemId: post._id
                        },
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        }
                    }
                );
                setIsFavorited(false);
            } else {
                // Add 
                await axios.post(
                    "http://localhost:8800/v1/favorite",
                    {
                        userId: user._id,
                        type: "post",
                        itemId: post._id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        }
                    }
                );
                setIsFavorited(true);
            }
        } catch (error) {
            console.error("Lỗi trạng thái icon yêu thích!", error);
            alert(error.response?.data?.message || "Lỗi không xác định");
        }
    };
    //

    return (
        <div className="Blog max-w-full overflow-x-hidden relative bg-white px-[15px]">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <div className="ContentContainer w-full h-auto overflow-y-auto pt-20">
                {/* Blog Details */}
                <div className="Detail w-[90vw] h-auto px-5 mt-10 mx-auto flex flex-col lg:flex-row gap-10">
                    {/* Main Blog Content */}
                    <div className="Detail-blog w-full lg:w-[70%]">
                        <img
                            className="Image w-full h-[509px] object-cover rounded-lg mb-6"
                            src={`http://localhost:8800/v1/img/${post.post.image}`}
                            alt={post.post.title}
                        />
                        <div className="HeadingAndIcon flex flex-col justify-start items-start gap-4">
                            <h1 className="Heading text-[#1a1a1a] text-3xl font-semibold font-['Inter'] leading-loose mb-4">
                                {post.post.title}
                            </h1>
                            <button onClick={toggleFavorite} className="text-red-500 text-2xl focus:outline-none">
                                <i className={`fas fa-heart ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}></i>
                            </button>
                        </div>
                        <div className="List flex items-start gap-5 mb-6">
                            <div className="Item flex items-center gap-2">
                                <div className="text-[#646464] text-xl font-medium font-['Rajdhani'] leading-tight">
                                    {post.post.postedBy?.username || "Null"}
                                </div>
                            </div>
                            <div className="Item flex items-center gap-2">
                                <div className="text-[#646464] text-xl font-medium font-['Rajdhani'] leading-tight">
                                    {new Date(post.post.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="w-full text-[#646464] text-xl font-medium leading-normal mb-6">
                            <div className="Content w-full">
                                {post.post.content}
                            </div>
                        </div>
                        {/* Comments */}
                        <Comment postId={id} />
                    </div>

                    <div className="Container w-full lg:w-[30%] h-auto overflow-hidden">
                        <div className="BackgroundShadow w-full max-w-[600px] mx-auto h-auto p-6 bg-white shadow-md flex flex-col justify-center items-center gap-6 sm:p-8 md:p-10 lg:p-12 mb-8">
                            <Search />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBlog;
