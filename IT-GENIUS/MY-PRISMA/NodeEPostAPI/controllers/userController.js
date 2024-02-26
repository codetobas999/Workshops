// Import PrismaClient
const { PrismaClient } = require('@prisma/client')

// สร้าง PrismaClient instance
const prisma = new PrismaClient()

// สร้าง function สำหรับอ่านข้อมูลทั้งหมดจากตาราง user
const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
}

// สร้าง function สำหรับสร้าง user
const createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
}

// สร้าง function สำหรับอ่านข้อมูล user ตาม id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
}

// สร้าง function สำหรับอัพเดทข้อมูล user ตาม id
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      email,
    },
  });
  res.json(user);
}

// สร้าง function สำหรับลบข้อมูล user ตาม id
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
}