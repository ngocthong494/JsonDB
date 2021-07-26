const queryString = require('query-string');
const jsonServer = require('json-server')
const auth = require('json-server-auth');
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { createRequire } = require('module');
const bcrypt = require('bcryptjs');
const db = require('./db.json');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
app.db = router.db
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(jsonServer.bodyParser)
app.use((req, res, next) => {

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

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.post("/api/login", function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const findUser = db.users.find(user => {
      return user.email === email && user.password === password;
    });

    if (findUser) {
      const accessToken = jwt.sign({
        email,
        id: findUser.id,
        role: findUser.role,
        lastName: findUser.lastName,
        firstName: findUser.firstName,
        fullName: `${findUser.firstName}  ${findUser.lastName}`,
        phone: findUser.phone,
        address: findUser.address,
      }, process.env.ACCESS_TOKEN_SECRET);

      res.json({ accessToken, message: "Sign in successfully!", status: true, });
    } else {
      res.status(401).json({ message: "Username or password invalid!", status: false, });
      return;
    }
  } catch (error) {
    return;
  }
})

// app.use(auth)
app.use('/api', middlewares, router);


app.listen(PORT, () => {
  console.log("Server is running on PORT" + PORT);
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
