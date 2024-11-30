import Navbar from "../../layouts/navBar";
import Header from './header';
import React, { useEffect, useState } from 'react';
import { Search } from "../../layouts/search";


function Blog() {
  const [posts, setPosts] = useState([]);

  //show all 
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8800/v1/blog/all');
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
    }
  }
  // Sắp xếp bài viết theo ngày đăng gần nhất
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3); // Lấy 3 bài viết gần nhất

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-full overflow-x-hidden relative bg-white px-[15px]">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <Header />
      <div className="mt-6">
        <Search />
      </div>
      {/* Blog gần đây */}
      <div className="w-full max-w-[1440px] mx-auto px-[15px] flex flex-col justify-start items-center gap-2 mb-2">
        <div className="w-full text-left text-[#1a1a1a] text-xl md:text-2xl font-semibold font-['Inter'] leading-loose mt-6 px-[15px] mb-3">
          Bài blog gần đây
        </div>
        <div className="w-[98%] max-w-[1800px] mx-auto px-[15px] flex flex-col lg:flex-row justify-between items-center gap-4">
          {recentPosts.map((post) => (
            <div key={post._id} className="BlogPostCard w-full lg:w-[48%] flex flex-col justify-between items-start gap-4 h-[360px]">
              <a href={`blog/${post._id}`} className="block hover:scale-105 transition-transform">
                <img
                  className="Image h-[240px] w-full object-cover rounded-lg"
                  src={`http://localhost:8800/v1/img/${post.image}`}
                  alt={post.title}
                />
              </a>
              <div className="w-full mx-auto flex flex-col justify-between items-start h-[100px]">
                <div className="HeadingAndText flex flex-col justify-start items-start gap-3">
                  <div className="List flex items-start gap-5 mb-2">
                    <div className="Item flex items-center gap-2">
                      <div className="text-[#646464] text-sm font-medium font-['Rajdhani'] leading-tight">
                        {post.postedBy?.username}
                      </div>
                    </div>
                    <div className="Item flex items-center gap-2">
                      <div className="text-[#646464] text-sm font-medium font-['Rajdhani'] leading-tight">
                        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#1a1a1a] text-xl font-semibold font-['Inter'] leading-loose">
                    {post.title}
                  </div>
                  <div className="text-[#667084] text-base font-normal font-['Inter'] leading-relaxed overflow-hidden">
                    {post.excerpt}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.categories?.map((category, index) => (
                    <div key={index} className="Tag px-2.5 py-0.5 bg-[#f9f5ff] rounded-2xl flex items-center gap-2">
                      <span className="text-[#6840c6] text-sm font-medium font-['Inter']">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* tất cả các bài blog */}
      <div className="w-full max-w-[1440px] mx-auto px-[15px] flex flex-col justify-start items-center gap-2 mt-1">
        <div className="w-full text-left text-[#1a1a1a] text-xl md:text-2xl font-semibold font-['Inter'] leading-loose mt-6 px-[15px]">
          Tất cả bài viết
        </div>
        <div className="w-[98%] max-w-[1800px] mx-auto px-[15px] flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {posts.map(post => (
              <div key={post._id} className="BlogPostCard flex-col justify-start items-start gap-4 flex">
                <a href={`blog/${post._id}`} className="block hover:scale-105 transition-transform">
                  <img
                    className="Image h-60 relative w-full object-cover rounded-lg"
                    src={`http://localhost:8800/v1/img/${post.image}`}
                    alt={post.title}
                  />
                </a>
                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                  <div className="flex flex-col justify-start items-start gap-3">
                    <div className="flex items-start gap-5 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="text-[#646464] text-sm font-medium font-['Rajdhani'] leading-tight">{post.postedBy?.username}</div>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <div className="text-[#646464] text-sm font-medium font-['Rajdhani'] leading-tight">
                          {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>
                    <div className="text-[#1a1a1a] text-xl font-semibold font-['Inter'] leading-loose">
                      {post.title}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.categories?.map((category, index) => (
                      <div key={index} className="Tag px-2.5 py-0.5 bg-[#f9f5ff] rounded-2xl flex items-center gap-2">
                        <span className="text-[#6840c6] text-sm font-medium font-['Inter']">{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
