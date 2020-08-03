const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

// const cors = (req, res, next) => {

//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE")
//   res.header("Access-Control-Allow-Headers", "Origin, Content-Type")

//   next()
// }

// app.use(cors)
app.use(express.json())

// GET
app.get('/api/products', (req, res) => {
  fs.readFile(
    path.join(__dirname, 'db/list.json'),
    (err, data) => {
      const dataList = JSON.parse(data)
      res.status(200).json(dataList)
    }
  )
})

// POST
app.post('/api/products', (req, res) => {
  fs.writeFile(
    path.join(__dirname, 'db/list.json'),
    JSON.stringify(req.body),
    (err) => {
      res.status(201).send('Success! Sent to your friends!')
    }
  )
})

app.use(express.static(path.resolve(__dirname, 'front/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'front/dist', 'index.html'))
})

app.listen(8080, () => console.log('server has been started..'))