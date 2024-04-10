import express from "express"
import { jwtCheck } from "./auth/auth"
import 'dotenv/config'
import { EfecredsClient, IEfecredsClient } from "./postgres/efecreds-client"
import Creds from "./creds/creds"

const app = express()
const port = process.env.PORT

import setCredentialsRouter from "./routes/set-credentials"

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(jwtCheck);

app.locals.efecredsClient = new EfecredsClient() as IEfecredsClient
app.locals.creds = new Creds(1000*60*0.5, 30000, app.locals.efecredsClient)

app.use('/set-credentials', setCredentialsRouter)

app.listen(port, () => {
  console.log(`Efecreds is listening at http://localhost:${port}`)
})