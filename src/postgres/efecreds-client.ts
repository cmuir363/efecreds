import { Client } from 'pg'
import { clientConfig } from './config'
import { createRandomPassword } from '../creds/creds-crypto';


export interface IEfecredsClient {
    client: Client;
    connectToDatabase(): Promise<void>
    updateCredentials(pgUsername: string): Promise<string>
    disconnectFromDatabase(): Promise<void>
}

export class EfecredsClient implements IEfecredsClient {

    client: Client;

    constructor() {
        this.client = new Client(clientConfig)
        this.connectToDatabase()
    }

    async connectToDatabase() {
        try {
            await this.client.connect()
            console.log('Connected to database')
        } catch (err) {
            console.error(err)
        } 
    }

    async updateCredentials(pgUsername): Promise<string> {

        // Ensure pgUsername is safe to interpolate
        if (!/^[a-zA-Z0-9_]+$/.test(pgUsername)) {
            throw new Error("Invalid username");
        }
        const ephemeralPassword = createRandomPassword()
        const query = {
            text: `ALTER ROLE ${pgUsername} WITH PASSWORD '${ephemeralPassword}'`
        }

        try {
            await this.client.query(query.text)
            console.log('Updated credentials')
            return ephemeralPassword
        } catch (err) {
            throw new Error(err)
        }
    }

    async disconnectFromDatabase() {
        try {
            await this.client.end()
            console.log('Disconnected from database')
        } catch (err) {
            console.error(err)
        }
    }

}