import { createServer } from 'node:http'

const port = process.env.PORT || 4242

const server = createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/create-checkout-session') {
    const secretKey = process.env.STRIPE_SECRET_KEY
    const priceId = process.env.PRICE_ID

    res.setHeader('Access-Control-Allow-Origin', '*')
    if (!secretKey || !priceId) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY or PRICE_ID' }))
      return
    }

    const params = new URLSearchParams()
    params.append('mode', 'subscription')
    params.append('line_items[0][price]', priceId)
    params.append('line_items[0][quantity]', '1')
    params.append('success_url', 'http://localhost:5173?success=true')
    params.append('cancel_url', 'http://localhost:5173?canceled=true')

    try {
      const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      const data = await stripeRes.json()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ id: data.id }))
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Stripe request failed' }))
    }
  } else if (req.method === 'OPTIONS' && req.url === '/create-checkout-session') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
    })
    res.end()
  } else {
    res.writeHead(404)
    res.end()
  }
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
