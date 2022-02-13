import React, { Component } from 'react'
import { StyleSheet, TextInput,Text, View, Button } from 'react-native';

import {localStorage, simpleLoginService} from '../others/singleton'
class LoginScreen extends Component {
   state = {
      welcome:'loading welcome message',
      users:[],
      username:'',
      password:''
   }

   constructor(props:any){
     super(props);
     
   }
    componentDidMount = async () => {
       try{
         let welcome=await simpleLoginService.getWelcome();
         this.setState({welcome});  
       }catch(e:any){
         this.setState({welcome:e.message});  
       }
   }

   async onSubmit(){
      try{
         let {username,password}=this.state;


         let json=await simpleLoginService.login(username,password);
         this.setState({welcome:'success'+JSON.stringify(json)});
         if(json.statusCode==401){
           this.setState({welcome:'Login Failed'});
         }else{
            localStorage.setItem("access_token",json.access_token)
           this.setState({welcome:'Login Successfull'});
           let users=await simpleLoginService.listUser(json.access_token);
           this.setState({users});  
         }
       }catch(e){
         console.log(e);
         this.setState({welcome:'failed'});
       }
 
   }

   render() {
      let usersE = [];
      let users=this.state.users;
      for (let i = 0; i < users.length; i++) {
         let {username}=users[i];
         usersE.push(<View key={i}><Text> {i+1}) {username}</Text></View>);
      }
      return (
         <View style={styles.container}>
            <View style={{width:'80%',maxWidth:300}}>
            <Text style={styles.labelWelcome}>
               {this.state.welcome}
            </Text>
            {usersE.length == 0 &&
            <View style={{width:'100%'}}>
            <Text style={styles.label}>
            Username
            </Text>
            
            <TextInput
          blurOnSubmit={true}
         //  onSubmitEditing={() => focusNextField()}
          placeholder="Username"
          style={styles.textinput}
          onChangeText={(username) => this.setState({username})} value={this.state.username}
        />
            <Text style={styles.label}>
               Password
            </Text>
         <TextInput
          blurOnSubmit={true}
         //  onSubmitEditing={() => focusNextField()}
          placeholder="Password"
          secureTextEntry
          style={styles.textinput}
          onChangeText={(password) => this.setState({password})} value={this.state.password}
        />
        <Button color="#E0245E" onPress={()=>{this.onSubmit()}} title="Login" />
        </View>
            }
        {usersE.length > 0 &&
        <View>
          <Text>
               List Of Registered Users
            </Text>
            {usersE}
        </View>
      }
         </View>
         </View>
         
      )
   }
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
   textinput: {
      height: 26,
      width:'100%',
      borderWidth: 0.5,
      borderColor: '#0000CC',
      padding: 4,
      margin:4
    },
    labelWelcome: {
      padding: 4,
      margin:4
    },
    label: {
      width:'80%',
      padding: 4,
      margin:4
    },
   
 });


export default LoginScreen