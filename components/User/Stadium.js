import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import * as firebase from 'firebase';
import {TextInput, Button} from 'native-base'


class Stadium extends Component {

    constructor(props) {
      super(props);
      this.state = {
        stadiums: [],
      }
      const db = firebase.firestore()
      this.ref = db.collection('Stadiums')
    }

    componentDidMount() {
      this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
        const stadiums = [];
        querySnapshot.forEach((doc) => {
          var id = doc.id
          var stadium = doc.data()
          stadiums.push( {
            TeamName: stadium.TeamName,
            StadiumName: stadium.StadiumName,
            id: id
          })
        })
        this.setState({stadiums: stadiums}, function() {
          this.populateStadiums()
        })
      })

    }

    concession(e, stadium) {
      var navigation = this.props.navigation;
      navigation.navigate('Concession Options', {stadium: stadium})
    }

    populateStadiums() {
      const stadiums = this.state.stadiums.map(stadium => (
        <Button 
              key={stadium.id} 
              style={styles.button} 
              onPress={(e) => this.concession(e, stadium)}>
                <Text style={styles.text}>{stadium.TeamName} - {stadium.StadiumName}</Text>
            </Button>
      ));

      return(
        <View>
          {stadiums}
        </View>
      )
    }


    render() {
        return (
          <View style={styles.container}>
            <View style={styles.form}>
                {this.populateStadiums()}
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

export default Stadium