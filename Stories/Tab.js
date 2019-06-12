import React from 'react';
import { View, StyleSheet, Animated, Platform} from 'react-native';

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.percentComplete = 0;
        this.animation = new Animated.Value(0);
        this.state={
            color:"#ccc"
        }
    }

    animationStart() {
       
        const remainingTime = 4000 - (4000 * this.percentComplete);
        Animated.timing(this.animation, {
            toValue: 1,
            duration: remainingTime,
        }).start(({finished}) => {
            if(!this.props.isAnimationStopped && finished) {
                this.props.next();
            }
        });
    }

    animationStop() {
        this.animation.stopAnimation((value) => this.percentComplete = value);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isActive, isAnimationStopped } = this.props;
        if(isActive && !isAnimationStopped) {
            this.animationStart();
        } else {
            this.animationStop();
        }
        const {index,activeIndex}=this.props;
        if(index<activeIndex && this.state.color!="#fff")
        {
            this.setState({color:'#fff'})
        }
        if(index==activeIndex && this.state.color=="#fff" )
        {
            this.setState({color:'#ccc'})
            this.percentComplete = 0;
            this.animation = new Animated.Value(0);
        
        }
        if(index>activeIndex)
        {
            this.animation = new Animated.Value(0);
            this.percentComplete = 0;
            
        }
    }

    componentDidMount() {
        if(this.props.isActive && !this.props.isAnimationStopped) {
            this.animationStart();
        }
    }

    render() {
       
        const widthInterpolated = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
            extrapolate: "clamp"
        });
        
        

        return (
            <View style={[styles.tab,{backgroundColor:this.state.color}]}>
                <Animated.View style={[styles.bar,{width: widthInterpolated},{} ]}></Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        borderRadius: 5,
        height: 3,
        marginHorizontal: 2,
        overflow:'hidden'
    },
    bar: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#fff"

    }
});

export default Tab;