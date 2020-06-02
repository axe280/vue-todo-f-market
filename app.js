const express = require('express')
const path = require('path')
const app = express()







app.use(express.static(path.resolve(__dirname, 'front/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'front/dist', 'index.html'))
})

app.listen(3000, () => console.log('server has been started..'))