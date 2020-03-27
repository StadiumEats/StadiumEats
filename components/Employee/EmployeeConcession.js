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
        currentOrders: null,
      }
      const db = firebase.firestore()
      this.ref = db.collection('User')
    }

    componentDidMount() {
        this.setState({stadium: this.props.route.params.state.stadium},
            function() {
                this.setState({concession: this.props.route.params.state.concession},
                    //function () { this.findConcession() }, function () { this.findOrders() })
                    function () { this.findConcession() })
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


        this.ref.doc(stadiumID).collection('Concessions').doc(concessionID).collection('Orders').get()
            .then(response => {
                const orders = []
                response.forEach(doc => {
                    var id = doc.id
                    var currOrder = doc.data()
                    //console.log("Order is")
                    //console.log(currOrder)
                    orders.push( {
                        Order: currOrder.Order
                    })
                })
                //console.log(orders)
                this.setState({currentOrders: orders})
            })
            .catch(error => {
                console.log(error);
            });

    }

    findOrders() {
        console.log("Starting find Orders")
        var stadiumID = this.state.stadium
        var concessionID = this.state.concession
        this.ref = firebase.firestore().collection('Stadiums')
        this.ref.doc(stadiumID).collection('Concessions').doc(concessionID).collection('Orders').get()
            .then(response => {
                const orders = []
                response.forEach(doc => {
                    var id = doc.id
                    var currOrder = doc.data()
                    //console.log("Order is")
                    //console.log(currOrder)
                    orders.push( {
                        Order: currOrder.Order
                    })
                })
                //console.log(orders)
                this.setState({currentOrders: orders})
            })
            .catch(error => {
                console.log(error);
            });
        console.log("Finished")
        //console.log(this.state.currentOrders)
    }

    getOrders() {
        console.log("curr orders in getOrders(), ", this.state.currentOrders)

        if (this.state.currentOrders != null) {
            console.log("entering loop")
            const orders = this.state.currentOrders.map(orderDisplay => (
                <Button
                    key={orderDisplay.id}
                    style={styles.button}
                    onPress={(e) => this.orderButton(e, orderDisplay)}>
                    <Text style={styles.text}>{orderDisplay.Order.Location}</Text>
                </Button>
            ));

            console.log(orders)

            return (

                <View>
                    <Text style={styles.text2}>Orders for {this.state.ConcessionName}</Text>
                    {orders}
                </View>

            )

        }
        // const orders = this.state.currentOrders.map(orderDisplay => (
        //     <Button
        //         key={orderDisplay.id}
        //         style={styles.button}
        //         onPress={(e) => this.orderDisplay(e, orderDisplay)}>
        //         <Text style={styles.text}>{orderDisplay}</Text>
        //     </Button>
        // ));

        // if(this.state.ConcessionName) {
        //     return (
        //         //<Text>Orders for {this.state.ConcessionName}</Text>
        //         <View> {orders} </View>
        //     )
        // }
        // return (
        //     <View></View>
        // )
    }

    orderButton(e, orderDisplay) {
        console.log("pressed")
        Alert.alert(
            "Order Details: Order " + orderDisplay.Order.OrderNum,
            "\nOrder Number: " + orderDisplay.Order.OrderNum +
            "\nDelivery: " + orderDisplay.Order.Delivery +
            "\nLocation: " + orderDisplay.Order.Location +
            "\nOrder: " + orderDisplay.Order.ConcessionOrder,
            [
                {text: 'Back'},
                {text: 'Delete'},
            ]
            );
    }


    test() {
        console.log(this.state.currentOrders)
        const orderList = this.state.currentOrders

        return <Text> Test </Text>
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
  text2: {
      color: 'dodgerblue',
      fontWeight: '700',
      fontSize: 20,
      marginRight: 'auto',
      marginLeft: 'auto',
      marginBottom: 20,
  },

});

export default EmployeeConcession