import express from "express"
import 'dotenv/config'
import { EfecredsClient, IEfecredsClient } from "./postgres/efecreds-client"

const app = express()
const port = process.env.PORT

import setCredentialsRouter from "./routes/set-credentials"

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.locals.efecredsClient = new EfecredsClient() as IEfecredsClient

app.use('/set-credentials', setCredentialsRouter)

app.listen(port, () => {
  console.log(`Efecreds is listening at http://localhost:${port}`)
})