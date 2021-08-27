const express = require('express')
const Flatted = require('flatted')
const { passengerDatabase } = require('./database')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// farklı yazım
async function onPassanger(req,res) {
    const passangers = await passengerDatabase.load()
    res.send(Flatted.stringify(passangers))
}
//2. parametreye gönderiyorum.
app.get('/passangers',  onPassanger )

app.listen(port, () => {
  console.log(`Bağlantı Başarılı... Port: ${port}`)
})