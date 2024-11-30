import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import axios from 'axios';

function Comment({ postId }) {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({
        userId: user._id,
        rating: 0,
        comment: "",
    });
    //input 
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            comment: e.target.value,
        });
    };
    //lấy danh sách comment
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/v1/blog/review/all/${postId}`);
               
                if (Array.isArray(response.data)) {
                    setComments(response.data);
                } else {
                    console.error("Mảng không có!");
                    setComments([]); 
                }
            } catch (error) {
                console.error("Lỗi", error.message);
                setComments([]); 
                alert("Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.");
            }
        };
        fetchComments();
    }, [postId]);

    //comment
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!postId) {
            console.error("Bài viết không tồn tại!");
            return;
        }

        if (!user || !user._id) {
            console.error("Người dùng chưa đăng nhập!");
            return;
        }

        const payload = {
            ...formData,
            userId: user._id,
        };

        console.log("Submitted data:", payload);

        try {
            const response = await fetch(`http://localhost:8800/v1/blog/reviews/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Response:", data);

            setFormData({ userId: user._id, rating: 0, comment: "" });
            alert("Đã gửi bình luận!");
        } catch (error) {
            console.error("Error:", error);
            alert("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại!");
        }
    };

    return (
        <div className="Horizontalborder w-full mt-8 pb-6 border-b border-black/20">
            <div className="Heading4ReletedTags w-[90%] h-[30px] text-[#151515] text-[20px] font-medium leading-[30px] flex justify-between">
                <div className="Tag">Bình luận</div>
            </div>

            {/* Comments List */}
            <div className="flex flex-col space-y-4">
                {comments && comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow"
                        >
                            <div className="flex flex-col space-y-2 w-full">
                                <div className="text-[22px] font-medium text-[#151515] leading-[30px]">
                                    {comment.username || "Người dùng"}
                                </div>
                                <div className="text-sm font-medium font-['Rajdhani'] text-[#646464] leading-snug">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </div>
                                <div className="text-base font-medium text-[#646464] leading-normal">
                                    {comment.comment}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Chưa có bình luận nào.</p>
                )}
            </div>
            {/* Comment Form */}
            <div className="Form w-full h-auto relative">
                <textarea
                    className="w-full h-[120px] p-4 bg-white rounded-[15px] border border-black/20 text-[#757575] text-base font-normal font-['Rajdhani']"
                    placeholder="Viết bình luận.."
                    value={formData.comment}
                    onChange={handleInputChange}
                ></textarea>
                <button
                    className="w-[167.77px] h-[50px] bg-[#007BFF] rounded-[30px] text-white text-lg font-normal font-['Rajdhani'] mt-4"
                    onClick={handleSubmit}
                >
                    Gửi
                </button>
            </div>
        </div>
    )
}

export default Comment;