import React, { Component } from 'react'
import { StyleSheet, TextInput,Text, View, Button } from 'react-native';

import {localStorage, simpleLoginService} from '../others/singleton'
class RegistrationScreen extends Component {
   state = {
    username:'',
    password:'',
    registrationStatus:''
 }

 constructor(props:any){
    super(props);
    
  }
    componentDidMount = async () => {}

   async onSubmit(){
    try{
        let {username,password}=this.state;
        await simpleLoginService.register(username,password)
        this.setState({username:'',password:'',registrationStatus:'Registration Successfull!!'});
        
    }catch(e:any){
        this.setState({registrationStatus:'Registration Failed'});
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

            <TextInput
          blurOnSubmit={true}
          placeholder="Username"
          style={styles.textinput}
          onChangeText={(username) => this.setState({username})} value={this.state.username}
        />
<Text style={{marginTop:5}}>Username needs to be</Text>
<Text>* 8-20 characters long</Text>
<Text style={{marginBottom:20}}>* No special characters</Text>


         <TextInput
          blurOnSubmit={true}
          placeholder="Password"
          secureTextEntry
          style={styles.textinput}
          onChangeText={(password) => this.setState({password})} value={this.state.password}

        />

<Text style={{marginTop:5}}>Password needs to be</Text>
<Text>* At least one upper case English letter</Text>
<Text>* At least one lower case English letter</Text>
<Text>* At least one digit</Text>
<Text>* At least one special character</Text>
<Text  style={{marginBottom:30}}>* Minimum eight in length Maximum 15 .</Text>
     
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