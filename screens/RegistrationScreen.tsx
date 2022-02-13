import React, { Component } from 'react'
import { StyleSheet, TextInput,Text, View, Button } from 'react-native';

import {localStorage, simpleLoginService} from '../others/singleton'
import { RootStackScreenProps } from '../types';
class RegistrationScreen extends Component {
   state = {
    username:'',
    password:'',
    registrationStatus:''
 }

   constructor(props:RootStackScreenProps<'NotFound'>){
     super(props);
     
   }
    componentDidMount = async () => {}

   async onSubmit(){
    try{
        let {username,password}=this.state;
        await simpleLoginService.register(username,password)
        this.setState({username:'',password:'',registrationStatus:'Registration Successfull!!'});
        
    }catch(e:any){
        this.setState({registrationStatus:'Registration Failed'+e.message});
        console.log(e)
    }
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={{width:'80%',maxWidth:300}}>
            <Text style={styles.label}>
            {this.state.registrationStatus}
            </Text>

            <Text style={styles.label}>
            Username
            </Text>
            <TextInput
          blurOnSubmit={true}
          placeholder="Username"
          style={styles.textinput}
          onChangeText={(username) => this.setState({username})} value={this.state.username}
        />
            <Text style={styles.label}>
               Password
            </Text>
         <TextInput
          blurOnSubmit={true}
          placeholder="Password"
          secureTextEntry
          style={styles.textinput}
          onChangeText={(password) => this.setState({password})} value={this.state.password}

        />
        <Button color="#E0245E" onPress={()=>this.onSubmit()} title="Register" />
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
    label: {
      width:'100%',
      padding: 4,
      margin:4
    },
   
 });


export default RegistrationScreen