//import liraries
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,StatusBar,Dimensions,TextInput, Alert } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { COLOURS,SIZES } from '../../constants';
const { width, height } = Dimensions.get('window')
import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo'
import Textarea from 'react-native-textarea';
import firestore from '@react-native-firebase/firestore'
const deviceWidth = Dimensions.get('window').width;
const Home = ({props,navigation}) => {
    
    const [data, setData] = useState([])
    const { colors } = useTheme();
    const theme = useTheme();
   
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');
    const ref=firestore().collection('todos')
   
    const addNote = async() => {
      if (note.length==0) {
       Alert.alert('please enter the author name');
       return
      }
      await ref.add({
        title:note,
        complete:false
      })
      var notesCpy = notes;
      notesCpy.push(note);
      setNotes(notesCpy);
      setNote('')
    };
  
   return (
        <View style={{
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor:theme.dark ?COLOURS.lightLime:COLOURS.white 
        }}>
     <StatusBar barStyle="light-content" backgroundColor={COLOURS.darkBlue}/>
       <View style={styles.navBar}>
        <Text style={{textAlign:'center',fontSize:SIZES.h2,color:'white',right:width*0.22,top:10}}>Update</Text>
      </View>
       <View style={{
        right:12
       }}>
        <View 
          style={{
                flexDirection:'row',
                height:60,
                alignItems:'center',
                marginHorizontal:SIZES.padding,
                paddingHorizontal:SIZES.radius,
                backgroundColor:'#F2F3F4',
                borderRadius:10,
                top:50,
                width:'90%',
                left:-15,
              }}>
            <TextInput style={{
               marginLeft:SIZES.radius,
               color:'black'
           }}
           placeholderTextColor="black"
           placeholder="Search movies"
           value={note}
           onChangeText={setNote}
         
           />
        </View>
        <TouchableOpacity style={{
            width:70,
            height:60,
            bottom:10,
            borderRadius:10,
            borderTopLeftRadius:1,
            borderBottomLeftRadius:1,
            left:width*0.78,
            backgroundColor:'blue',
            padding:12
        }} 
        disabled={note.length===0}
        onPress={addNote}
        >
        <Text style={{
            color:'white',
            fontSize:20,
            fontWeight:'bold',
            textAlign:'center'
        }}>Add</Text>
    </TouchableOpacity>
    </View>  
      {notes.length === 0 ? (
        <Text style={{fontSize: 28, marginTop: 40, textAlign: 'center'}}>
          No Task added..
        </Text>
      ) : (
        <View>
          {notes.map((note, index) => (
           <TouchableOpacity key={index} 
            style={{
                margin: 16,
                borderRadius:10,
                 padding: 20, 
                 fontSize: 22, 
                 elevation: 4, 
                 backgroundColor: 'blue'
            }}
            onPress={()=>navigation.navigate('Update',{data:note})}
            >
           <Text  style={{ color:'white'}}>
             Author Name: {note}
            </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
  
    heading: {
        fontSize: 28,
        marginVertical: 40,
        width: deviceWidth,
        textAlign: 'center',
        color: 'blue',
        fontWeight: 'bold',
        textShadowColor: 'blue',
        textShadowRadius: 2,
      },
    navBar: {
        height: 60,
         borderBottomWidth: 1,
         backgroundColor:COLOURS.darkBlue,
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.9,
         shadowRadius: 0.8,
         elevation: 4,
         top:20,
         width:width*1.5,
         right:width*0.1
        
      },
      form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top:30
      },
      btn: {
        fontSize: 28,
        height: 50,
        width: 50,
        textAlign: 'center',
        backgroundColor: 'gray',
        borderRadius: 50,
        paddingTop: 4,
      },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textTransform:'capitalize'
    },
    btnStyle: {
        marginTop: 10,
        alignSelf:'flex-end',
        backgroundColor:'blue',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4
    },
    textInput: {
        padding: 10,
        paddingStart: 30,
        width: '95%',
        height: 60,
        right:10,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: '#F2F3F4',
      },
   textareaContainer: {
        height: 150,
        padding: 5,
        right:5,
        width:'92%',
        backgroundColor: '#F2F3F4',
        borderRadius:10,
        top:20
      },
      textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        left:10,
        color: '#333',
      },
});

//make this component available to the app
export default Home;
