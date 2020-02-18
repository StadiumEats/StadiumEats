import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, Text, View, Navigator } from 'react-native';
import * as firebase from 'firebase';
import Login from './components/Authentication/Login'
import CustomerRegister from './components/Authentication/CustomerRegister'
import EmployeeRegister from './components/Authentication/EmployeeRegister'
import RegisterOption from './components/Authentication/RegisterOption'
import Stadium from './components/User/Stadium'
import Concession from './components/User/Concession'


const Stack = createStackNavigator();



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stadium: null,
      concession: null,
      userType: null,
    }
  }

  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen 
            name="Customer Registration" 
            component={CustomerRegister} 
          />
          <Stack.Screen 
            name="Employee Registration" 
            component={EmployeeRegister} 
          />
          <Stack.Screen 
            name="Register Option" 
            component={RegisterOption} 
          />
          <Stack.Screen 
            name="Stadium Options" 
            component={Stadium} 
            options={{title: 'Choose The Stadium'}}
          />
          <Stack.Screen 
            name="Concession Options" 
            component={Concession} 
          />
        </Stack.Navigator>
      </NavigationContainer>
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
    flexDirection: 'row',
    width: '90%',
  },
});
export default App