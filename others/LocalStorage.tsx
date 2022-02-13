import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalStorage{
    async setItem(key:string,value:string){
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.log(e);
            throw Error('LocalStorage : Error savin item with key:'+key+" and value:"+value)
        }        
    }
    async getItem(key:string){
        try {
            const value = await AsyncStorage.getItem(key)
            if(value) {return value}
        } catch (e) {
            console.log(e);
            throw Error('LocalStorage : Error getting item with key:'+key)
        }
        return "";
    }
}