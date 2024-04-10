import express from "express"
import { IEfecredsClient } from "../postgres/efecreds-client";
import Creds from "../creds/creds";

const router = express.Router()


/* GET home page. */
router.post('/', async (req, res) => {
try {
    const newPassword = await (req.app.locals.efecredsClient as IEfecredsClient).updateCredentials("calumtest");
    (req.app.locals.creds as Creds).addCredsRequest("calumtest");
    console.log("Added creds request to creds data structure")
    res.send('New password is: ' + newPassword)
} catch (err) {
    console.error(err)
    res.status(500).send('Error updating credentials')
}});



export default router