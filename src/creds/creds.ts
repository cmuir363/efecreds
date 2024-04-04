
interface ICredsRequest {
    username: string;
    validUntil: EpochTimeStamp;
}


class Creds {

    credsRequestArray = []

    constructor(){
        console.log('Creds constructor initialised')
    }

    addCredsRequest(credsRequest: ICredsRequest){
        this.credsRequestArray.push(credsRequest)
    }

    removeCredsRequest(credsRequest: ICredsRequest){
        this.credsRequestArray = this.credsRequestArray.filter(
                request => request !== credsRequest
            )
    }

    isCredsRequestStillValid(credsRequest: ICredsRequest){
        if (credsRequest.validUntil < Date.now()){
            return credsRequest.validUntil > Date.now()
        }
    }   

}