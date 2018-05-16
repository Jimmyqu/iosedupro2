import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import CountDown from 'react-native-smscode-count-down'

export default class CountDownButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
        }
    }


    render(){
        console.log(2)
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <CountDownButton
                    style={{width: 80,marginRight: 10,backgroundColor:'#336699'}}
                    textStyle={{color: 'red'}}
                    enable={true}  //是否可用  判断电话
                    timerCount={10}
                    timerTitle={'获取验证码'}
                    disableColor={'gray'}
                    onClick={(shouldStartCounting)=>{
                        //随机模拟发送验证码成功或失败
                        shouldStartCounting(true)
                    }}
                    />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    cameraBtn: {
        padding:5
    },
    count:{
        color:'#fff',
        fontSize:12
    },
    fullBtn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    countBox:{
        position:'absolute',
        right:-5,
        top:-5,
        alignItems:'center',
        backgroundColor:'#34A853',
        width:16,
        height:16,
        borderRadius:8,
        justifyContent:'center'
    }
});


