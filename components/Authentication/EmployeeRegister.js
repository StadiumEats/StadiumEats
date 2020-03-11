import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import * as firebase from 'firebase';
import {TextInput, Button} from 'native-base'
import {Input} from '../Input'
import 'firebase/firestore'
import RNPickerSelect from 'react-native-picker-select';




class EmployeeRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      storeName: '',
      stadium: '',
      concession: '',
      approved: false,
      stadiumList: [],
      concessions: [],
      prevStadium: '',
    }
    
    
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
  onPressRegister() {
    if (this.state.password != this.state.confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }
    if(!this.state.firstName || !this.state.lastName) {
      Alert.alert("First and last name must be filled out!");
      return;
    }
    if(!this.state.stadium || !this.state.concession) {
      Alert.alert("You must choose the specific stadium and concession!");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.firestore().collection('User').doc(this.state.email).set({
          FirstName: this.state.firstName,
          LastName: this.state.lastName,
          UserType: 'Employee',
          email: this.state.email,
          stadium: this.state.stadium,
          concession: this.state.concession,
        }).then((data) => {
          console.log("added employee")

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
      this.getStadiums()
    }

    getStadiums() {
      const db = firebase.firestore()
      this.ref = db.collection('Stadiums')
      this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
        const stadiums = [];
        querySnapshot.forEach((doc) => {
          var id = doc.id
          var stadium = doc.data()
          stadiums.push( {
            label: stadium.TeamName + '-' + stadium.StadiumName,
            value: id,
          })
        })
        this.setState({stadiumList: stadiums})
      })
    }
  
    getConcessions() {
      if(this.state.stadium) {
        if(this.state.stadium !== this.state.prevStadium) {
          this.setState({prevStadium: this.state.stadium})
          var id = this.state.stadium
          this.ref.doc(id).collection('Concessions').get()
              .then(response => {
                  const concessions = []
                  response.forEach(doc => {
                      var id = doc.id
                      var concession = doc.data()
                      concessions.push( {
                          label: concession.ConcessionName,
                          value: id
                      })
                  })
                  this.setState({concessions}, function() {this.con()})
              })
              .catch(error => {
                  console.log(error);
              });
        }
        
        return(
          <View>
            <View>
              <Text style={styles.dropDownText}>Stadium Name</Text>
              <View style={styles.dropDownContainer}>
                <RNPickerSelect
                    onValueChange={(value) => this.setState({concession: value})}
                    items={this.state.concessions}
                />
              </View>
            </View>
          </View>
        )
      }
      return(
        <View></View>
      )

    }
    con() {
      console.log(this.state.concessions)
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
                <View style={styles.dropDownStadium}>
                  <Text style={styles.dropDownText}>Stadium Name</Text>
                  <View style={styles.dropDownContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => this.setState({stadium: value})}
                        items={this.state.stadiumList}
                    />
                  </View>
                </View>
                <View style={styles.dropDown}>
                  {this.getConcessions()}
                </View>
                
                <Button  style={styles.button} onPress={() => this.onPressRegister()}><Text style={styles.text}>Register</Text></Button>
            </View>
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
  dropDownText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontWeight: '500',
    fontSize: 20,
  },
  dropDownStadium: {
    marginTop: 20,
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
  dropDownContainer: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
});

export default EmployeeRegister