//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet, Dimensions,TextInput,StatusBar,TouchableOpacity, Alert,SafeAreaView,FlatList} from 'react-native';
const { width, height } = Dimensions.get('window')
import { COLOURS,SIZES } from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
const Update= ({navigation,route}) => {
 
  const {data}=route.params;
  const { colors } = useTheme();
  const theme = useTheme();
  const [notes, setNotes] = useState([]);
  const [book, setBook] = useState('');
  const [price, setPrice] = useState('');
  const ref=firestore().collection('todos')
  
  const addBook = async() => {
    if (book.length==0 && price==0 ) {
     Alert.alert('please enter the author name');
     return
    }
    await ref.add({
      title:data,
      book:book,
      price:price,
      complete:false
    })
    let dataItem =
      {
      'author':data,
       'book':book,
       'price':price
       }
      
    let tempArray=notes;
    tempArray.push(dataItem);
    setNotes(tempArray);
    setBook('');
    setPrice('')
  };

  const RenderItem=({item,index})=>{
    return(
      <View style={styles.boxView}>
      <Text style={styles.heading}>Author:{item.author}</Text>
      <Text style={{
          color:theme.dark ? 'white':'white',
          fontSize:20,
          fontWeight:'bold',
          marginBottom:10
      }}>Book Name:{item.book}</Text>
      <Text style={{
          color:theme.dark ? 'white':'white',
          fontSize:20,
          fontWeight:'bold',
          marginBottom:10
      }}>Price:{item.price}</Text>
  </View>
    )
  }
    
      return (
        <View style={{
          backgroundColor:theme.dark ?COLOURS.lightLime:COLOURS.white,
          flex: 1,
        }}>
        <View style={styles.navBar}>
         <TouchableOpacity style={styles.leftContainer} 
            onPress={()=>navigation.goBack('')}
          >
          <Entypo name="arrow-long-left" size={34} color="white"  />
         </TouchableOpacity>
        </View>
          <View style={{left:20,top:40}}>
           <TextInput 
               placeholder="Enter Book Name" 
               style={styles.textInput}
               placeholderTextColor={'black'}
               value={book}
               onChangeText={setBook}
                />
                <TextInput 
               placeholder="Enter Book Price" 
               style={styles.textInput}
               placeholderTextColor={'black'}
               value={price}
               onChangeText={setPrice}
                /> 
              
             </View>
             <TouchableOpacity style={{
                    backgroundColor:COLOURS.darkBlue,
                    borderColor:COLOURS.darkBlue,
                    borderWidth:1,
                    borderRadius:10,
                    alignItems:'center',
                    left:30,
                    top:height*0.1,
                    width:width*0.8,
                    height:60
                    }}
                    onPress={addBook}
                    >
                      <Text style={{
                          textAlign:'center',
                          fontSize:24,
                          fontWeight:'bold',
                          padding:10,
                          color:'white'
                      }}>Add</Text>
                    </TouchableOpacity>
       {notes.length === 0 ? (
        <Text style={{fontSize: 28,top:height*0.14, textAlign: 'center'}}>
          No Task added..
        </Text>
           ) : (
           <View style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            top:height*0.14,
            flex:1
           }}>
           <SafeAreaView>
                <FlatList
                    data={notes}
                    renderItem={RenderItem}
                    style={{flex: 1}}
                    ItemSeparatorComponent={() => <View style={{ marginBottom:1 }} />}
                />
           </SafeAreaView>
           </View>
            )}
        
        </View>
        
             
    );
};

// define your styles
const styles = StyleSheet.create({
   
   textInput: {
        padding: 10,
        paddingStart: 30,
        width: '95%',
        height: 60,
        right:10,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#D6DBDF',
        elevation:5
      },
      heading: {
        fontSize:20,
        fontWeight: 'bold',
        marginBottom:10,
        textTransform:'capitalize',
        color:'white'
    },
  
      boxView: {
        borderRadius:10,
        fontSize: 22,
        elevation: 4,
        padding:10,
        height:height*0.16,
        width:width*0.98, 
        backgroundColor: 'blue',
        margin:10,
        right:6
        },
      navBar: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
         borderBottomWidth: 1,
        backgroundColor:COLOURS.darkBlue,
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.9,
         shadowRadius: 0.8,
         elevation: 4,
         top:20
      },
      leftContainer: {
        justifyContent: 'flex-start',   
         flexDirection: 'row',
         left:40
     },
});

//make this component available to the app
export default Update;
