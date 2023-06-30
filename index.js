import { config } from 'dotenv'
config()

import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5001

// public routes

/*
Ruta: POST /login
request: body: { email: string, password: string }
response: { ok: boolean, token: string }
*/
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  res.json({
    ok: true,
    token: 'exampleToken',
  })
})

/*
Ruta: POST /register
request: body: { email: string, password: string, name: string, phone: string }
response: { ok: boolean, token: string }
*/
app.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body
  res.json({
    ok: true,
    token: 'exampleToken',
  })
})

/*
Ruta: GET /api/products
request:  queries: { limit?: number }
response: { ok: boolean, products: []}
*/
app.get('/api/products', async (req, res) => {
  let { limit = 5 } = req.query

  res.json({
    ok: true,
    products: [],
  })
})

/*
Ruta: GET /api/products/:id
request:  params: { id: number }
response: { ok: boolean, products: {}}
*/
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params

  res.json({
    ok: true,
    product: {},
  })
})

// middleware bearer toke
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({
      ok: false,
      message: 'No token provided',
    })
  }
  const token = authorization.split(' ')[1]
  if (token !== 'exampleToken') {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
  }
  next()
}

// private routes

/*
Ruta: POST /api/products
request:  
  headers: {
    "Authorization": "Bearer token"
  }
  body: { name: string, description: string, price: number, stock: number }
response: { ok: boolean, products: {}}
*/
app.post('/api/products', authMiddleware, async (req, res) => {
  const { name, description, price, stock } = req.body

  res.json({
    ok: true,
    product: {},
  })
})

/*
Ruta: PUT /api/products
request:  
  headers: {
    "Authorization": "Bearer token"
  }
  params: { id: number }
  body: { name: string, description: string, price: number, stock: number }
response: { ok: boolean, products: {}}
*/
app.put('/api/products/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const { name, description, price, stock } = req.body

  res.json({
    ok: true,
    product: {},
  })
})

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  const { id } = req.params

  res.json({
    ok: true,
    product: {},
  })
})

app.listen(PORT, () => {
  console.log('Server is running on PORT: ', PORT)
})
