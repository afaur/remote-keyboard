const ENV = process.env.NODE_ENV || 'development'

const robot = require('robotjs')

const http = require('http')
const express = require('express')
const app = express()
const uuid = require('uuid')

const server = http.createServer(app)

const session = require('express-session')

const sessionParser = session({
  saveUninitialized: false,
  secret: '$eCuRiTy',
  resave: false
})

app.use(express.static('public'))

app.set('view engine', 'pug')

app.use(sessionParser)

app.post('/login', (req, res) => {
  const id = uuid.v4()
  console.log(`Updating session for user ${id}`)
  req.session.userId = id
  res.send({ result: 'OK', message: 'Session updated' })
})

app.delete('/logout', (request, response) => {
  console.log('Destroying session')
  request.session.destroy()
  response.send({ result: 'OK', message: 'Session destroyed' })
})

app.get('/', (req, res) => {
  return res.render('index')
})

const WebSocket = require('ws')

const wss = new WebSocket.Server({
  verifyClient: (info, done) => {
    console.log('Parsing session from request...')
    sessionParser(info.req, {}, () => {
      console.log('Session is parsed!')
      done(info.req.session.userId)
    })
  },
  server
})

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    const session = ws.upgradeReq.session
    console.log(`WS message ${msg} from user ${session.userId}`)
    console.log(msg)
    robot.keyTap(msg)
  })
})

server.listen(3000, () => {
  console.log('Example app listening on port 3000!', ENV)
})
