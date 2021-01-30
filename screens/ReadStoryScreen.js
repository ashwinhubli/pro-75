import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput,FlatList} from 'react-native';
import {Header, SearchBar} from 'react-native-elements'
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default class ReadStoryScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
        search: '' ,
        allStories: [],
        lastVisibleStory: null ,
        storyAuthor: '',
        storyTitle: '',
        storyContent: ''
      }
    }
  
    retrieveStories = async (text)=>{
     const story = await db.collection("StoryHub").where('title','==',this.state.search).limit(10).get();
     story.docs.map((doc)=>{
       this.setState({
         allStories: [...this.state.allStories,doc.data()],
         lastVisibleStory: doc
       })
     })
  }

    searchFilterFunction= async(text) =>{
       const story = await db.collection("StoryHub").where("title","==",this.state.search).get();
       story.docs.map((doc)=>{
         this.setState({
           allStories: [...this.state.allStories,doc.data()],
           lastVisibleStory:doc
         })
       }) 
    }

    getStoryDetails=()=>{
      db.collection('StoryHub').get()
      .then(snapshot=>{
        snapshot.forEach(doc=>{
          this.setState({
            storyAuthor: doc.data().Author,
            storyTitle: doc.data().Title,
            storyContent: doc.data().Story
          })
        })
      })

    }
    componentDidMount=()=>{
      this.retrieveStories()
      this.getStoryDetails()
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>(
      <ListItem
        key={i}
        title={item.storyTitle}
        subtitle={"Written By"+item.storyAuthor}
        leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity
             style={[
               styles.button,
               {
                 backgroundColor : item.request_status === "Book Sent" ? "green" : "#ff5722"
               }
             ]}
             onPress = {()=>{
               this.sendBook(item)
             }}
            >
              <Text style={{color:'#ffff'}}>{
                item.request_status === "Book Sent" ? "Book Sent" : "Send Book"
              }</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
 
     render(){
        return(
            <View>
           <ScrollView>
            <Header
              backgroundColor={'#FFB6C1'}
              centerComponent={{
               text: 'Bed Time Stories',
               style: { color: '#fff', fontSize: 20 },
               }}
             />
             <View>
          
          <View style={styles.searchBar}>
        <TextInput
          style ={styles.searchBar}
          placeholder = "Type Here......."
          onChangeText={(text)=>{
           this.setState({
             search: text
           })
         }}
         value={this.state.search}
               />
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchFilterFunction(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
             <ScrollView>
           
          <FlatList
             keyExtractor= {(item, index)=> index.toString()}
             data={this.state.allStories}
             renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Author: " + item.Author}</Text>
              <Text>{"Title: " + item.Title}</Text>
              <Text></Text> 
            </View>
          )}
          onEndReached ={this.retrieveStories()}
          onEndReachedThreshold={0.7}
        /> 

            </ScrollView>
            </View>
            </ScrollView>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  searchBar:{
    flexDirection:'row',
    height:40,
    width:'200',
    borderWidth:0.5,
    alignItems:'center',
    backgroundColor:'white',

  },
  bar:{
    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10,
  },
  searchButton:{
    button:{
      width:"75%",
      height:100,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
  }
})

