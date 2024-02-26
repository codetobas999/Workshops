// Import PrismaClient
const { PrismaClient } = require('@prisma/client')

// สร้าง server ด้วย express
const express = require('express')

// สร้าง express app
const app = express()

// สร้าง PrismaClient instance
const prisma = new PrismaClient()

// ใช้ express middleware สำหรับ parse ข้อมูลที่ส่งมาในรูปแบบ JSON
app.use(express.json())

// Rest API สำหรับอ่านข้อมูลทั้งหมดจากตาราง user
app.get('/users', async (req, res) => {
  // console.log('hello')
  // res.json({ hello: 'world' })
  const users = await prisma.user.findMany() // select * from user
  res.json(users)
})

// Rest API สำหรับการสร้างข้อมูล user ใหม่
app.post('/users', async (req, res) => {
  // การรับข้อมูลจาก request body
  // const data = req.body
  // console.log(data.name)
  // console.log(data.email)
  const { name, email } = req.body
  // console.log(name)
  // console.log(email)
  // insert into user (name, email) values (name, email)
  const user = await prisma.user.create({
    data: {
      name,
      email,
    }
  })
  res.json(user)
})

// Rest API สำหรับอ่านข้อมูล user จาก id
app.get('/users/:id', async (req, res) => {
  // รับค่า id จาก request parameter
  const { id } = req.params
  // console.log(id)
  // select * from user where id = id
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  res.json(user)
})

// Rest API สำหรับอัพเดทข้อมูล user ตาม id
app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  // update user set name = name, email = email where id = id
  const user = await prisma.user.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name,
      email
    }
  })
  res.json(user)
})

// Rest API สำหรับลบข้อมูล user ตาม id
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.json(user)
})

// Start server ที่ port 3000
app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
