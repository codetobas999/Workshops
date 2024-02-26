// สร้าง server ด้วย express
const express = require('express')

// สร้าง express app
const app = express()

// ใช้ express middleware สำหรับ parse ข้อมูลที่ส่งมาในรูปแบบ JSON
app.use(express.json())

// Import userRoutes
const userRoutes = require('./routes/userRoutes')
// Import postRoutes
const postRoutes = require('./routes/postRoutes')

// ใช้ userRoutes ในการจัดการเส้นทางของ user
app.use('/api/users', userRoutes)
// ใช้ postRoutes ในการจัดการเส้นทางของ post
app.use('/api/posts', postRoutes)

// Start server ที่ port 3000
app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
