import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from "react-native";
import  LinearGradient  from 'react-native-linear-gradient';


const InfoSection = (props) => {
  
  const containerStyle=[styles.container];
  if(props.isAnimationStopped)
  {
    containerStyle.push({opacity:0})
  }

  return (
      <LinearGradient 
      
      colors={['transparent','rgba(0,0,0,0.6)','rgba(0,0,0,1)']}
      style={containerStyle}>
            <Text style={styles.text}>
                Step back in time with the 550 year old neemrana fort palace
            </Text>    
            <TouchableOpacity style={styles.btnWrapper} activeOpacity={0.9}>
                <LinearGradient
                    start={{x: 1.0, y: 0.0}}
                    end={{x: 0.0, y: 1.0}}
                    colors={["#53b2fe","#065af3"]}
                     style={styles.btn}            
                    >     
                    <Text style={styles.btnText}>VIEW DETAILS</Text>
              </LinearGradient>
         </TouchableOpacity>
      </LinearGradient>
    );
}


const styles = StyleSheet.create({
  container:{
  flexDirection:'column',
  position:'absolute',
  bottom:0,
  paddingHorizontal:25,
  width:'100%',
  zIndex:2,

  paddingVertical:20,
  paddingTop:50,
  

  },
  btn:{
    width:150,
    height:32,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#a3a3a3',
    borderRadius:32,
   
    },
    btnWrapper:{
   
    },
    btnText:{
      fontFamily:'Lato-Black',
      fontSize:12,
      color:'#fff'
  },
  text:{
    fontSize:16,
    color:'#fff',
    fontFamily:'Lato-Regular',
    
    marginBottom:13
  },
 

});

export default InfoSection;
