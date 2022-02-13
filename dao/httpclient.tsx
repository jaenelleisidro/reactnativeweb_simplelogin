export interface RequestInterface{method?:string,url:string,query?:any,body?:any,headers?:{}}

export class HttpClient{

    async get(request:RequestInterface){return await this.request({...request,method:"GET"});}
    async getJson(request:RequestInterface){return await this.requestJson({...request,method:"GET"});}
    
    async post(request:RequestInterface){return await this.request({...request,method:"POST"});}
    async postJson(request:RequestInterface){return await this.requestJson({...request,method:"POST"});}

    async put(request:RequestInterface){return await this.request({...request,method:"PUT"});}
    async putJson(request:RequestInterface){return await this.requestJson({...request,method:"PUT"});}

    async patch(request:RequestInterface){return await this.request({...request,method:"PATCH"});}
    async patchJson(request:RequestInterface){return await this.requestJson({...request,method:"PATCH"});}

    async delete(request:RequestInterface){return await this.request({...request,method:"DELETE"});}
    async deleteJson(request:RequestInterface){return await this.requestJson({...request,method:"DELETE"});}

    async request({method="GET",url,query={},body={},headers={}}:RequestInterface){
        let requestOptions:any = {method,headers: {...headers,'Content-Type': 'application/json' }};
        if(["GET"].includes(requestOptions.method)==false){//get can't have body
            requestOptions.body=JSON.stringify(body)
        }
        console.log("requestOptions",requestOptions,url);
        let response=await fetch(url,requestOptions).then((response) => response.text());
        console.log("response",response);
        return response;
    }
    async requestJson({method="GET",url,query={},body={},headers={}}:RequestInterface){
        let requestOptions:any = {method,headers: {...headers,'Content-Type': 'application/json' }};
        if(["GET"].includes(requestOptions.method)==false){//get can't have body
            requestOptions.body=JSON.stringify(body)
        }
        console.log("requestOptions",requestOptions,url);
        let response=await fetch(url, requestOptions).then((response) =>response.json());
        console.log("response3",JSON.stringify(response));
        return response;        
    }
}