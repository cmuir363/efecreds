import { Client } from 'pg'
import { clientConfig } from './config'
import { IEfecredsClient } from './efecreds-client'


const client = new Client(clientConfig)


export const connectToDatabase = async (client: IEfecredsClient) => {
    try {
        await client.connectToDatabase()
    } catch (err) {
        console.error(err)
    }
}
