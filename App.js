/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {
    View,
} from 'react-native';
import React, { Component } from 'react';
import {StackNavigator,TabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

//零散页面

import myclass from './component/index/myclass'
import feedback from './component/index/feedback'
import update from './component/index/update'
import openClass from './component/index/openclass'
import classDetail from './component/index/classDetail'
import classRate from './component/index/classRate'
import adDetail from './component/index/adDetail'
import scheduleDetail from './component/index/scheduleDetail'
import allOpenClass from './component/index/allOpenClass'
//主页面
import index from './screens/i'
import Schedule from './screens/Schedule'
import setting from './screens/setting'

//登陆注册
import login from './login/login'
import forget from './login/forget'
import reg from './login/reg'
import regpass from './login/regpass'

const TabMain = TabNavigator({
    首页: { screen: index,
        navigationOptions: ({navigation}) => ({
            title: '首页',
            tabBarIcon: ({focused, tintColor})=>(
                <Icon
                    size={25}
                    name={'home'}
                    style={focused?{color:'#e71c22'}:{color:'#fff'}}
                />
            ),
        }),
    },
    课程表: { screen: Schedule,
        navigationOptions: ({navigation}) => ({
            title: '课程表',
            tabBarIcon: ({focused, tintColor})=>(
                <Icon
                    size={25}
                    name={'calendar'}
                    style={focused?{color:'#e71c22'}:{color:'#fff'}}
                />
            ),
        }),
    },
    用户: { screen: setting,
        navigationOptions: ({navigation}) => ({
            title: '用户中心',
            tabBarIcon: ({focused, tintColor})=>(
                <Icon
                    size={20}
                    name={'mortar-board'}
                    style={focused?{color:'#e71c22'}:{color:'#fff'}}
                />
            ),
        }),
    }

},{
    tabBarPosition:'bottom',
    backBehavior: 'none',  //安卓禁止返回
    //swipeEnabled: false,  //ios 允许滑动
    tabBarOptions:{
        activeTintColor: 'red',  //文字激活颜色
        showIcon:true,
        style:{
            backgroundColor:'#80c02c' //taber样式
        },
        labelStyle: {
            fontSize: 10, // 文字大小
            marginTop:2,
            marginBottom:2
        },
    }
});

const navigationOptions = ({ navigation, screenProps }) => ({
    headerTintColor:'#fff',  //角标颜色
    headerTitleStyle :{
        textAlign:'center',
        width: '70%',  //文字居中

    },
    headerStyle:{backgroundColor:'#2467ff'}, //header颜色
    headerLeft: <Icon
        name={'mail-reply'}
        size={20}
        style={{marginLeft:20,color:"#fff"}}
        onPress={ () => { navigation.goBack() }} />,
});

const HomeStack= StackNavigator({
    login: {
        screen:login,
        navigationOptions: {
            header: null, //隐藏tab组件header
        },
    },
    Forget: {
        screen:forget,
        navigationOptions: {
        },
    },
    Regpass:{
        screen:regpass,
        navigationOptions: {
        },
    },
    Reg: {
        screen:reg,
        navigationOptions: {
        },
    },
    Home: {
        screen : TabMain ,
        navigationOptions: {
            header: null,
        },
    },
    allOpenClass: { screen :allOpenClass},
    公告详情: { screen :adDetail},
    MyClass: { screen : myclass },
    Feedback: { screen : feedback },
    Update: { screen : update },
    ClassType:{
        screen:scheduleDetail
    },
    openClass:{
        screen:openClass
    },
    classDetail:{
        screen:classDetail
    },
    classRate:{
        screen:classRate
    }

},{
    navigationOptions:navigationOptions
});


export default class App extends Component{
  render() {
    return (
        <HomeStack/>
    );
  }
}

