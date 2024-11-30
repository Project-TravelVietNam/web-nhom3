import Post from "../model/postModel.js";
import User from "../model/userModel.js";

const postController = {
  //create post
  createPost: async (req, res, next) => {
    const { title, content, postedBy, image } = req.body;
    try {
      const user = await User.findById(req.body.postedBy);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Người dùng không tồn tại!" });
      }
      const post = await Post.create({
        title,
        content,
        postedBy: user._id,
        image,
      });
      res.status(200).json({
        success: true,
        post,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //update
  //delete
  deletePost: async (req, res, next) => {
    try {
      // Tìm bài viết theo ID
      const currentPost = await Post.findById(req.params.id);

      if (!currentPost) {
        return res.status(404).json({
          success: false,
          message: "Bài viết không tồn tại!",
        });
      }
      // Xóa bài viết
      await Post.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Xóa bài viết thành công!",
      });
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error.message);
      next(error);
    }
  },
  //show
  showPost: async (req, res, next) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("postedBy", "username");
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  },
  //show theo user id
  showPostById: async (req, res, next) => {
    try {
      // Lấy userId từ query params
      const { userId } = req.query;

      if (!userId) {
        return res
          .status(400)
          .json({ success: false, message: "Id không tồn tại!" });
      }

      // Tìm người dùng trong bảng User
      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Người dùng không tồn tại!" });
      }

      // Lấy bài viết của người dùng theo userId và sắp xếp theo ngày tạo mới nhất
      const posts = await Post.find({ postedBy: userId }) // Lọc theo postedBy (userId)
        .sort({ createdAt: -1 })
        .populate("postedBy", "username"); // Populate thông tin user (username)

      // Kiểm tra nếu không tìm thấy bài viết nào
      if (posts.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Không có bài viết nào từ người dùng này.",
        });
      }

      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      console.error("Lỗi khi hiển thị bài viết:", error.message);
      next(error);
    }
  },
  //show theo id bài viết
  showPostByPostId: async (req, res, next) => {
    try {
      // Lấy postId từ tham số URL (params)
      const { id } = req.params;

      // Tìm bài viết theo id
      const post = await Post.findById(id).populate("postedBy", "username");

      // Nếu không tìm thấy bài viết
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Bài viết không tồn tại!",
        });
      }

      // Trả về bài viết nếu tìm thấy
      res.status(200).json({
        success: true,
        post,
      });
    } catch (error) {
      console.error("Lỗi khi hiển thị bài viết theo id:", error.message);
      next(error);
    }
  },
  //tạo review
  createReview: async (req, res) => {
    try {
      const { userId, rating, comment } = req.body;

      const user = await User.findById(userId);
      console.log("data", userId, rating, comment);
      if (!user) {
        return res.status(400).json({ message: "Người dùng không tồn tại" });
      }

      // Tìm theo ID bài viết
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Bài viết không tồn tại!" });
      }
      // Tạo đánh giá mới
      const review = {
        username: user.username,
        rating: Number(rating),
        comment,
        user: userId,
      };

      post.reviews.push(review);

      // Cập nhật số lượng đánh giá và điểm trung bình
      post.numReviews = post.reviews.length;
      post.rating =
        post.reviews.reduce((acc, item) => item.rating + acc, 0) /
        post.reviews.length;

      await post.save();

      res.status(201).json({ message: "Thêm bình luận thành công!" });
    } catch (error) {
      console.error("Error creating review:", error.message);
      res.status(500).json({ message: "Lỗi server" });
    }
  },
  //get all review
  getReviewsById: async (req, res, next) => {
    try {
      const postId = req.params.id;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Bài viết không tồn tại!" });
      }

      const reviews = post.reviews.map((review) => ({
        ...review._doc,
        title: post.title,
      }));

      res.status(200).json(reviews);
    } catch (err) {
      console.error("Lỗi:", err);
      next(err);
    }
  },
};

export default postController;
