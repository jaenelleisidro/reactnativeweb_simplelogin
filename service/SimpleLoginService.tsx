import { HttpClient, RequestInterface } from "../dao/httpclient";

export default class SimpleLoginService{
    private readonly apiHost:string;
    private readonly httpClient:HttpClient;
    constructor(){
        this.apiHost='http://winddoctor.tplinkdns.com:3000/api';
        this.httpClient=new HttpClient();
    }

    private async get(req:RequestInterface){
        let {httpClient,apiHost: host}=this;
        req.url=host+req.url;
        return await httpClient.getJson(req)
    }
    private async post(req:RequestInterface){
        let {httpClient,apiHost: host}=this;
        req.url=host+req.url;
        return await httpClient.postJson(req)
    }
    private async postPlain(req:RequestInterface){
        let {httpClient,apiHost: host}=this;
        req.url=host+req.url;
        return await httpClient.post(req)
    }
   private async patch(req:RequestInterface){
        let {httpClient,apiHost: host}=this;
        req.url=host+req.url;
        return await httpClient.patchJson(req)
    }
    private async put(req:RequestInterface){
        let {httpClient,apiHost: host}=this;
        req.url=host+req.url;
        return await httpClient.putJson(req)
    }
    private async delete(req:RequestInterface){
        let {httpClient,apiHost: host}=this;
        req.url=host+req.url;
        return await httpClient.deleteJson(req)
    }

    async getWelcome(){return await this.httpClient.get({url:this.apiHost});}
    async login(username:string,password:string){return await this.post({url:"/auth/login",body:{username,password}});}
    async register(username:string,password:string){
        
        let response=await this.post({url:"/auth/register",body:{username,password}});
        if(response.statusCode==500){
            throw Error("Registration Failed");
        }

    }

    async listUser(token:string){return await this.get({url:"/user",headers:{'Authorization':'Bearer '+token}});}
    async retrieve(id:string){return await this.get({url:"/user/"+id});}
    async createUser(user:any){return await this.post({url:"/user",body:user});}
    async updateUser(id:string,user:any){return await this.patch({url:"/user/"+id,body:user});}
    async deleteUser(id:string,user:any){return await this.delete({url:"/user/"+id,body:user});}





}

