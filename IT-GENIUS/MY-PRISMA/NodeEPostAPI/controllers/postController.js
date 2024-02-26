const { PrismaClient } = require('@prisma/client')

// สร้าง PrismaClient instance
const prisma = new PrismaClient()

// สร้าง function สำหรับอ่านข้อมูล post ทั้งหมด
const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
}

// สร้าง function สำหรับสร้าง post
const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      authorId: parseInt(authorId),
    },
  });
  res.json(post);
}

// สร้าง function สำหรับอ่านข้อมูล post ตาม id
const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.json(post);
}

// สร้าง function สำหรับอัพเดทข้อมูล post ตาม id
const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  const post = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
      published,
    },
  })
  res.json(post);
}

// สร้าง function สำหรับลบข้อมูล post ตาม id
const deletePostById = async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.json(post);
}

// สร้าง function สำหรับค้นหา post ตาม keyword
const searchPosts = async (req, res) => {
  const { keyword } = req.query
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: keyword, // %keyword%
          },
        },
        {
          content: {
            contains: keyword, // %keyword%
          },
        },
      ],
    },
  })
  res.json(posts);
}

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
  searchPosts,
}