import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Blog slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, "Blog category is required"],
      trim: true,
      default: "Desert Safari Guides",
    },
    excerpt: {
      type: String,
      required: [true, "Blog excerpt is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    coverImage: {
      type: String,
      default: "/hero_desert_safari.jpg",
    },
    author: {
      type: String,
      default: "Desert Journey Team",
      trim: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    tags: {
      type: [String],
      default: ["Desert Safari", "Dubai", "Adventure"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        return ret;
      },
    },
  }
);

// Search indexes
blogSchema.index({ title: "text", excerpt: "text", content: "text", tags: "text" });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
