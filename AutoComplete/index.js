import React from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity,Image,} from "react-native";

const cityList=["luc ","lucknow","kanpur","delhi","mumbai","umsen","delvu","deltu","delchik","new york","vancouver","melbourne","sydney","chandigarh","shimla","agra","amritsar","chicago","toronto","kerala","hyderabad","muradabad","najibabad","central city","star city"]

export default class AutoComplete extends React.Component {
   static navigationOptions={header:null}
constructor(props) {
      super(props);
      this.state={
           value:"",active:false,filteredCities:[]
      }

  }
selectCity=(value)=>{
    this.setState({value:value,active:false})
}
clear=()=>{
      this.setState({value:"",active:false})
}
autoComplete=(textEntered)=>
{
  this.setState({value:textEntered},()=>{
  if(this.state.value.length>=3){
        let temp=cityList.filter((item)=>item.startsWith(this.state.value.toLowerCase()));
        this.setState({active:true,filteredCities:temp})
  	}
    else{
      this.setState({active:false})
    }
})
}
    render() {
      return (
          <View>
                  <View style={styles.inputContainer}>
                      <TouchableOpacity style={styles.backWrapper} >
                          <Image style={styles.iconBack} source={require('./images/iconBack.png')}/>
                      </TouchableOpacity>
                        <TextInput onChangeText={this.autoComplete} style={styles.input}>{this.state.value}</TextInput>
                        <TouchableOpacity onPress={this.clear} style={styles.btnContainer} >
                            <Text style={styles.btnText}>CLEAR</Text>
                        </TouchableOpacity>
                  </View>
                 {
                   this.state.active  &&
                   <View style={styles.dropDown}>
                          {	this.state.filteredCities.map((item,index) => (
                      			<TouchableOpacity key={index} index={index}  style={styles.textWrapper} onPress={()=>this.selectCity(item)}><Text style={styles.dropdownText} >{item}</Text></TouchableOpacity>
                      		))
                        }
                    </View>
                  }
          </View>
      );
    }
}


const styles = StyleSheet.create({
backWrapper:{
  width:16,
  paddingVertical:4,
  paddingLeft:10,
  paddingRight:10
},
iconBack:{
  height:16,
  width:16,
  marginRight:10,

 },
  btnText: {
  fontFamily: 'Lato-Bold',
  fontSize: 12,
  letterSpacing: 0.23,
  color: '#008cff',
  textTransform: 'uppercase',
  textAlign:'right'
  },
  btnContainer:{
    width:50,

    },
input:{
backgroundColor:"#fff",
color:"#000",
fontFamily:'Lato-Bold',
zIndex:-2,
position:'relative',
fontSize:16,
  textTransform:'capitalize',
  paddingHorizontal:15,
  paddingVertical:15,
  flex:1
},

inputContainer:{
  alignItems:'center',
  zIndex:2,
  position:'relative',
  backgroundColor:'#fff',
  flexDirection:'row',
  paddingRight:15
},
dropDown:{
  position:'absolute',
  width:'100%',
  backgroundColor:'#fff',
  elevation:2,
  zIndex:2,
  shadowColor: '#330000',
  shadowOpacity: 0.3,
  shadowRadius: 2,
  shadowOffset: {
      width: 0,
      height: 2
  },
top:50,
},
dropdownText:{
  fontSize:14,
  color:'#000',
  fontFamily:'Lato-Regular',
  zIndex:2,
  textTransform:'capitalize'

},
textWrapper:{
  backgroundColor:'#fff',
  paddingHorizontal:12,
  paddingVertical:8,

}

})
