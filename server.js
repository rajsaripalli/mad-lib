const express = require('express')
const logger = require('morgan')
const path = require('path')

const server = express()

// Middleware
server.use(express.urlencoded({ extended: true }))
server.use(logger('dev'))

// Serve static files from public/
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// Random number route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Lib POST handler at root "/"
server.post('/', (req, res) => {
  const { noun, verb, adjective, adverb, pluralNoun } = req.body

  if (!noun || !verb || !adjective || !adverb || !pluralNoun) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/">Go Back to Form</a>
    `)
    return
  }

  // Only story result — no addendum here
  const madLib = `
    <h1>Your Mad Lib Story</h1>
    <p>Once upon a time, a ${adjective} ${noun} decided to ${verb} ${adverb} while surrounded by ${pluralNoun}.</p>
    <a href="/">Go Back to Form</a>
  `
  res.send(madLib)
})

// Port config — default to 8080
const port = 8080

server.listen(port, () => {
  console.log(`✅ Server is running at: http://localhost:${port}/`)
  console.log(`➡️  Test random route at: http://localhost:${port}/do_a_random`)
})
