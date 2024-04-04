import express from "express"

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  req.app.locals.efecredsClient.connectToDatabase()
  req.app.locals.efecredsClient.disconnectFromDatabase()
});

export default router