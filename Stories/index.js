import React from 'react';
import { StyleSheet, Text, View, Image,  TouchableWithoutFeedback,StatusBar,TouchableOpacity,Dimensions,Platform} from 'react-native';
import Tab from './Tab';
import InfoSection from './InfoSection';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    const screenDimension = Dimensions.get('window');
    this.screen = {
      width: screenDimension.width,
      height: screenDimension.height
    };
    this.inTime=0;
    this.outTime=0;
  
    
    this.state = {
      images: [
        "https://images.unsplash.com/photo-1523980230739-b0cb3d10ecd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80",
        "https://images.unsplash.com/photo-1499442428429-d6a1c9354cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1558545215-bbd7a9bff2b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "https://images.unsplash.com/photo-1559142642-915959bfac3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559139011-7ecdc76280aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
      ],
      active: 0,
      isAnimationStopped: false
    };


    this.next = this.next.bind(this);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }


  static navigationOptions = {
    header: null
  };
  componentDidMount(){
    StatusBar.setHidden(true);
    }
  componentWillUnmount() {
    StatusBar.setHidden(false);
  }
  handlePressIn() {
    this.inTime=Date.now();
    this.setState( {
      isAnimationStopped: true
    });
  }

  handlePressOut(direction) {

    this.outTime=Date.now();
    const diff=this.outTime-this.inTime;
    
     if(diff>150)
     {
      this.setState( {
        isAnimationStopped: false
      });
     }
     else 
     {
        if(direction=='back' && this.state.active!=0){
         
          this.setState({active:this.state.active-1,isAnimationStopped: false})
        }
        else {
          this.setState({active:this.state.active+1,isAnimationStopped: false})
        }
     }
    
    
  }
  loadingDone=()=>{
    this.setState({isAnimationStopped: false})
  }

  next() {
    const { active } = this.state;
    this.setState({
      active: active + 1,isAnimationStopped:false
    });
  }

  render() {
    const { images, active, isAnimationStopped } = this.state;
    const tabContainerStyle=[styles.tabContainer];
    if(isAnimationStopped)
    {
      tabContainerStyle.push({opacity:0})
    }
    

    return (
      <View style={styles.container}>
         <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
          <Image
            source={{ uri: images[active]}}
            resizeMode="cover"
            style={styles.image}
            onLoadEnd={this.loadingDone}
          ></Image>
        </TouchableWithoutFeedback>
        
        { Platform.OS!='web' &&  <TouchableOpacity activeOpacity={0.9} style={styles.back} onPressIn={this.handlePressIn} onPressOut={()=>this.handlePressOut('back')}/>}

        
         <View style={tabContainerStyle} isAnimationStopped={isAnimationStopped}>
          { images.map((image, index) => {
            return (
              <Tab key={index}  isActive={index === active } activeIndex={active} index={index} next={this.next} isAnimationStopped={isAnimationStopped}></Tab>
            );
          })}
        </View>
        <InfoSection isAnimationStopped={isAnimationStopped}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      web: {
        height:Dimensions.get('window').height
      },    
    }),
      
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor:'transparent',
    position:'absolute',
    top:0,
    width:'100%',
    zIndex:1,
    paddingTop:10,
    paddingBottom:5,
    backgroundColor:'rgba(0,0,0,0.1)'
  },
  image: {
 
    height:'100%',
    width:'100%'
  },
  text: {
    color: '#fff',
  },
  back:{
    height:'100%',
    width:'30%',
    backgroundColor:'transparent',
    position:'absolute',
    top:0 
  }
});
