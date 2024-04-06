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

    addCredsRequest(credsRequest: ICredsRequest){
        const credsRequestWithValidityDuration = this.getCredsRequestWithValidityDuration(credsRequest, this.duration)
        this.credsRequestArray.push(credsRequestWithValidityDuration)
    }


    /**
     * Returns a new credsRequest object with required validity
     * @param credsRequest - The creds request to clone and set validity duration.
     * @param duration - The duration in milliseconds for the creds request to be valid.
     */
    getCredsRequestWithValidityDuration(credsRequest: ICredsRequest, duration: number){
        return {
            ...credsRequest,
            validUntil: Date.now() + duration
        }
    }

    removeCredsRequestAndUpdatePassword(credsRequest: ICredsRequest){
        this.credsRequestArray = this.credsRequestArray.filter(
                request => request !== credsRequest
            )
        this.efecredsClient.updateCredentials(credsRequest.username)
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
            this.credsRequestArray.forEach(credsRequest => {
                if (!this.isCredsRequestStillValid(credsRequest)){
                    this.removeCredsRequest(credsRequest)
                }
            })
        }, loopInterval)
    }

}