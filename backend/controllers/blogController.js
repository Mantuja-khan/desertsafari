import Blog from "../models/Blog.js";

// Helper to convert title to slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// GET /api/blogs - Get all blogs with search & filter
export async function getAllBlogs(req, res) {
  try {
    const { category, search, tag, page = 1, limit = 50 } = req.query;
    const query = { isPublished: true };

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(category, "i") };
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Blog.countDocuments(query);

    return res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)) || 1,
      },
    });
  } catch (error) {
    console.error("Error fetching blogs from MongoDB:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
}

// GET /api/blogs/admin/all - Get all blogs including drafts for Admin panel
export async function getAdminAllBlogs(req, res) {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching admin blogs:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
}

// GET /api/blogs/:identifier - Get single blog by ID or slug
export async function getBlogByIdentifier(req, res) {
  try {
    const { identifier } = req.params;
    let blog = null;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(identifier);
    }

    if (!blog) {
      blog = await Blog.findOne({ slug: identifier.toLowerCase() });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    return res.json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
}

// POST /api/blogs - Create a new blog post
export async function createBlog(req, res) {
  try {
    const {
      title,
      category = "Desert Safari Guides",
      excerpt,
      content,
      coverImage = "/hero_desert_safari.jpg",
      author = "Desert Journey Team",
      readTime = "5 min read",
      tags = [],
      isPublished = true,
      slug: customSlug,
    } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({
        success: false,
        message: "Title, excerpt, and content are required fields",
      });
    }

    let slug = customSlug ? generateSlug(customSlug) : generateSlug(title);
    
    // Ensure slug uniqueness
    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newBlog = await Blog.create({
      title,
      slug,
      category,
      excerpt,
      content,
      coverImage,
      author,
      readTime,
      tags: Array.isArray(tags) ? tags : tags.split(",").map((t) => t.trim()),
      isPublished: Boolean(isPublished),
      views: 0,
      likes: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully in MongoDB",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog in MongoDB:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to create blog" });
  }
}

// PUT /api/blogs/:id - Update an existing blog
export async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.tags && typeof updates.tags === "string") {
      updates.tags = updates.tags.split(",").map((t) => t.trim());
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to update blog" });
  }
}

// DELETE /api/blogs/:id - Delete a blog
export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.json({
      success: true,
      message: "Blog post deleted successfully from MongoDB",
      data: deletedBlog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
}

// POST /api/blogs/:id/like - Like a blog post
export async function likeBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.json({
      success: true,
      message: "Post liked",
      likes: blog.likes,
    });
  } catch (error) {
    console.error("Error liking blog:", error);
    return res.status(500).json({ success: false, message: "Failed to like blog" });
  }
}
