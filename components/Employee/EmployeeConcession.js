import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import * as firebase from 'firebase';
import {TextInput, Button} from 'native-base'


class EmployeeConcession extends Component {

    constructor(props) {
      super(props);
      this.state = {
        stadium: null,
        concession: null,
        ConcessionName: null,
      }
      const db = firebase.firestore()
      this.ref = db.collection('User')
    }

    componentDidMount() {
        this.setState({stadium: this.props.route.params.state.stadium},
            function() {
                this.setState({concession: this.props.route.params.state.concession},
                    function() {this.findConcession()})
            })
        
    }
    findConcession() {
      var stadiumID = this.state.stadium
      var concessionID = this.state.concession
      this.ref = firebase.firestore().collection('Stadiums')
      this.ref.doc(stadiumID).collection('Concessions').doc(concessionID).get()
        .then(response => {
            this.setState({ConcessionName: response.data().ConcessionName})
        })
        .catch(error => {
            console.log(error);
        });
    }

    getOrders() {
        if(this.state.ConcessionName) {
            return (
                <Text>Orders for {this.state.ConcessionName}</Text>
            )
        }
        return (
            <View></View>
        )
    }
    




    render() {
        return (
          <View style={styles.container}>
            <View style={styles.form}>
                {this.getOrders()}
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

export default EmployeeConcession