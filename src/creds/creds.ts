import { IEfecredsClient } from "../postgres/efecreds-client";

interface ICredsRequest {
    username: string;
    validUntil: EpochTimeStamp;
}


class Creds {

    credsRequestArray = []
    duration: number
    efecredsClient: IEfecredsClient;

    constructor(duration: number, loopInterval: number = 1000, efecredsClient: IEfecredsClient){
        console.log(`Creds constructor initialised. Creds will be valid for ${duration/(1000*60)} minutes.`)
        this.duration = duration
        this.efecredsClient = efecredsClient
        this.startCredsRequestValidatorLoop(loopInterval)
    }

    addCredsRequest(username: string){
        console.log("Adding creds request")
        const credsRequestWithValidityDuration = this.createCredsRequestWithValidityDuration(username, this.duration)
        this.credsRequestArray.push(credsRequestWithValidityDuration)
    }


    /**
     * Returns a new credsRequest object with required validity
     * @param username - The user to create a cress request for
     * @param duration - The duration in milliseconds for the creds request to be valid.
     */
    createCredsRequestWithValidityDuration(username: string, duration: number){
        console.log("Creating creds request")
        return {
            username: username,
            validUntil: Date.now() + duration
        }
    }

    removeCredsRequestAndRandomizePassword(credsRequest: ICredsRequest){
        this.credsRequestArray = this.credsRequestArray.filter(
                request => request !== credsRequest
            )
        this.efecredsClient.updateCredentials(credsRequest.username)
        console.log("removed credentials")
    }

    isCredsRequestStillValid(credsRequest: ICredsRequest){
        if (credsRequest.validUntil > Date.now()){
            return true
        } else {
            return false
        }
    }
    
    startCredsRequestValidatorLoop(loopInterval: number){
        setInterval(() => {
            console.log("Checking creds requests")
            this.credsRequestArray.forEach(credsRequest => {
                if (!this.isCredsRequestStillValid(credsRequest)){
                    this.removeCredsRequestAndRandomizePassword(credsRequest)
                }
            })
        }, loopInterval)
    }

}

export default Creds;