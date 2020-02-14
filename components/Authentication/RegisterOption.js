import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import {Button} from 'native-base'
import {Input} from '../Input'



class RegisterOption extends Component {

    customer() {
        var navigation = this.props.navigation;
        navigation.navigate('Customer Registration')
    }
    employee() {
        var navigation = this.props.navigation;
        navigation.navigate('Employee Registration')
    }
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.form}>
                <Button  style={styles.button} onPress={() => this.customer()}><Text style={styles.text}>Customer Registration</Text></Button>
                <Button  style={styles.button} onPress={() => this.employee()}><Text style={styles.text}>Employee Registration</Text></Button>
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

export default RegisterOption