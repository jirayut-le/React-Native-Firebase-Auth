import React, { Component } from 'react';
import { Text, View, FlatList} from 'react-native';
import { List, ListItem} from "react-native-elements"
import * as firebase from 'firebase';

class BalanceScreen extends Component {

    static navigationOptions = {
        title: "My Database",
        header: null
    }
    
    constructor(props){
        super(props);
    
        this.state = {
          data: [],
        };

        this.itemsRef = this.getRef().child('myimgs');
    }

    getRef(){
        return firebase.database().ref();
    }
    
    componentDidMount(){
        this.getItems(this.itemsRef);
    }

    getItems(itemsRef){
    itemsRef.on('value', (data) => {
            let items = [];
            data.forEach((child) => {
                items.push({
                    title : child.val().title,
                    img : child.val().img,
                    _key: child.key
                });
            });

            console.log(items);
            this.setState({
                data: items
            });
        })
    }
      
    
     

    render() {
        return (
            <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
            <FlatList
              data = {this.state.data}
              renderItem={
                ({item}) => (
                  <ListItem
                    roundAvatar
                    title={`${item.title}`}
                    avatar={{uri: item.img}}
                    containerStyle={{borderBottomWidth:0}}
                  />
                )}
                keyExtractor={item => item._key}
            
            />
            </List>
        );
    }
}
export default BalanceScreen;