const queryString = require('query-string');
const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.db = router.db

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(auth)
// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {

  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
    req.body.updatedAt = Date.now()
  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now()
  } else if (req.method === 'PUT') {
    req.body.updatedAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

router.render = (req, res) => {
  // Check GET with pagination
  // If yes, custom output
  const headers = res.getHeaders();

  const totalCountheader = headers['x-total-count'];

  if (req.method === 'GET' && totalCountheader) {
    const queryParams = queryString.parse(req._parsedUrl.query);

    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page),
        _limit: Number.parseInt(queryParams._limit),
        _totalRows: Number.parseInt(totalCountheader),
      },
    };
    return res.jsonp(result)
  }
  // Otherwise, keep default behavior
  res.jsonp(res.locals.data)
}

// Use default router
server.use('/api/login', (req, res, next) => {
  console.log("ok");
  return res.json({
    status: "ok"
  })
})
server.use('/api', router)
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running http://localhost:${PORT}`)
})
