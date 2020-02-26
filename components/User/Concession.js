import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import * as firebase from 'firebase';
import {TextInput, Button} from 'native-base'


class Concession extends Component {

    constructor(props) {
      super(props);
      this.state = {
        stadium: null,
        concessions: [],
        cart:[]
      }
      const db = firebase.firestore()
      this.ref = db.collection('Stadiums')
    }

    componentDidMount() {
      var stadium = this.props.route.params.stadium
      this.setState({stadium}, function() {this.getConcessions()})

    }
    generateCart() {
      
    }
    getConcessions() {
        var id = this.state.stadium.id
        this.ref.doc(id).collection('Concessions').get()
            .then(response => {
                const concessions = []
                response.forEach(doc => {
                    var id = doc.id
                    var concession = doc.data()
                    concessions.push( {
                        ConcessionName: concession.ConcessionName,
                        price: concession.price,
                        id: id
                    })
                })
                this.setState({concessions})
            })
            .catch(error => {
                console.log(error);
            });

    }

    populateConcessions() {
        const concessions = this.state.concessions.map(concession => (
            <Button 
                key={concession.id} 
                style={styles.button} 
                onPress={(e) => this.concession(e, concession)}>
                <Text style={styles.text}>{concession.ConcessionName}</Text>
                <Text style={styles.text}>{concession.price}</Text>
            </Button>
          ));

      return(
        <View>
          {concessions}
        </View>
      )
    }

    concession(e, concession) {
        console.log(concession)
        Alert.alert(concession.ConcessionName + " Added.");
    }



    render() {
        return (
          <View style={styles.container}>
            <View style={styles.form}>
                {this.populateConcessions()}
          <View style = {styles.form}>
                <Button
                title="Cart"
                style={styles.button}
          color="red"
          onPress={() => Alert.alert('1 Hotdog \n 1 Terrapin Beer \n 1 Popcorn')}
              > 
                            <Text style={styles.text}>Cart</Text>
              </Button>
        </View>
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

export default Concession