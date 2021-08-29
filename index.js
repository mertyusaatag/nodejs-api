const express = require('express')
const Flatted = require('flatted')
const { passengerDatabase } = require('./database')
const Passenger = require('./models/passenger')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// iki nokta üst üste req.params.çekilmek istenilen prop şeklinde
app.get('/passenger/:passengerId' , async (req,res) => {
  const passenger = await passengerDatabase.find(req.params.passengerId)
  // if(!passenger)
  // {
  //   res.send("Böyle biri bulunamadı")
  // }
  if(!passenger) return res.status(404).send("Böyle biri bulunamadı")
  res.send(Flatted.stringify(passenger))

  // let passenger;
  // try {
  //   passenger = await passengerDatabase.find(req.params.passengerId)
  // } catch (e) {
  //   if (!passenger) return res.send('Cannot find passenger').sendStatus(404)
  // }
  // res.send(Flatted.stringify(passenger))
  
})

app.post('/passengers', async(req,res)=> {
  console.log(Flatted.stringify(req.body))
  const person = Passenger.create(req.body)
  
  await passengerDatabase.insert(person)
  res.send(person)
})

app.delete('/passengers/:passengerId' ,async (req,res) => {
  await passengerDatabase.removeBy('id',req.params.passengerId)

  res.send('OK')
})

// farklı yazım
async function onPassenger(req,res) {
    const passengers = await passengerDatabase.load()
    res.send(Flatted.stringify(passengers))
}
//2. parametreye gönderiyorum.
app.get('/passengers',  onPassenger )



app.listen(port, () => {
  console.log(`Bağlantı Başarılı... Port: ${port}`)
})