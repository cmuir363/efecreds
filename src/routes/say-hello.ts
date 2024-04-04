import express from "express"

const router = express.Router()


const helloHtml: string = `
  <div>
    <h1>Hello World!!</h1>
  </div>
`

/* GET home page. */
router.get('/', (req, res) => {
  res.send(helloHtml)
});

export default router