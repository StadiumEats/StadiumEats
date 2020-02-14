import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import * as firebase from 'firebase';
import {TextInput, Button} from 'native-base'
import {Input} from '../Input'
import 'firebase/firestore'



class CustomerRegister extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  

  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDtQfc-wnDmDY1tTzxk87C0KrHC_ln9Was",
      authDomain: "sample-react-native-75b82.firebaseapp.com",
      databaseURL: "https://sample-react-native-75b82.firebaseio.com",
      projectId: "sample-react-native-75b82",
      storageBucket: "sample-react-native-75b82.appspot.com",
      messagingSenderId: "286915697875",
      appId: "1:286915697875:web:2b3055d348bf17e17e0826",
      measurementId: "G-36J3GX8HLX"
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.ref = firebase.firestore().collection('User')

  }
  onPressRegister() {
    if (this.state.password != this.state.confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }
    if(!this.state.firstName || !this.state.lastName) {
      Alert.alert("First and last name must be filled out!");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log('1')
        this.ref.add({
          FirstName: this.state.firstName,
          LastName: this.state.lastName,
          UserType: 'Customer',
          email: this.state.email
        }).then((data) => {
          console.log("added customer")

          Alert.alert("Registered Successfully");
          var navigation = this.props.navigation;
          navigation.navigate('Login')
        }).catch((error) => {
          console.log(error)
        })

      }, (error) => {
        Alert.alert(error.message)
      })
  }



    componentDidMount() {

    }
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.form}>
                <Input 
                  placeholder='Enter your First Name'
                  label='First Name'
                  onChangeText={ firstName => this.setState({firstName}) }
                  value={this.state.firstName}
                />
                <Input 
                  placeholder='Enter your Last Name'
                  label='Last Name'
                  onChangeText={ lastName => this.setState({lastName}) }
                  value={this.state.lastName}
                />
                <Input 
                  placeholder='Enter your email'
                  label='Email'
                  onChangeText={ email => this.setState({email}) }
                  value={this.state.email}
                />
                <Input 
                  placeholder='Enter your password'
                  label='Password'
                  secureTextEntry
                  onChangeText={ password => this.setState({password}) }
                  value={this.state.password}
                />
                <Input 
                  placeholder='Confirm password'
                  label='Confirm Password'
                  secureTextEntry
                  onChangeText={ confirmPassword => this.setState({confirmPassword}) }
                  value={this.state.confirmPassword}
                />
                <Button  style={styles.button} onPress={() => this.onPressRegister()}><Text style={styles.text}>Register</Text></Button>
            </View>
            <View style={styles.bottom}><Text style={styles.text}>Check</Text></View>
          </View>
        )
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '90%',
  },
  form: {
    flex: 1,
    marginTop: '10%',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontWeight: '800',
    fontSize: 30,
  },
  button: {
    marginTop: 10,
    padding: 20,
    width: '100%',
    backgroundColor: '#00aeef',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
});

export default CustomerRegister