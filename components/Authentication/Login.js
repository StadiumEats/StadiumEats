import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import * as firebase from 'firebase';
import {Input} from '../Input'
import { Button } from 'native-base'



class Login extends Component {

  state = {
    email: '',
    password: '',
    authenticating: false,
    isAuthenticated: false,

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

  }



  onPressSignIn() {
    this.setState({authenticating: true})

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({authenticating: false})
        var navigation = this.props.navigation;
        navigation.navigate('Stadium Options')
      }, (error) => {
        Alert.alert(error.message)
      })
  }
  onPressRegister() {
    var navigation = this.props.navigation;
    navigation.navigate('Register Option')
  }
  onPressGuest() {
    var navigation = this.props.navigation;
    navigation.navigate('Stadium Options', {state: this.state})
  }

  renderCurrentState() {
    if(this.state.authenticating) {
      return(
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return(
      <View style={styles.form}>
        <Text style={styles.title}>StadiumEats</Text>
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
        <Button  style={styles.button} onPress={() => this.onPressSignIn()}><Text style={styles.text}>Log In</Text></Button>
        <Button  style={styles.button} onPress={() => this.onPressRegister()}><Text style={styles.text}>Register</Text></Button>
        <Button  style={styles.button} onPress={() => this.onPressGuest()}><Text style={styles.text}>Continue as Guest</Text></Button>
        {/* <Button  style={styles.button} onPress={() => this.onPressRegister()}><Text style={styles.text}>Forgot Password</Text></Button> */}
      </View>
    )


  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
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
    marginTop: '30%',
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

export default Login