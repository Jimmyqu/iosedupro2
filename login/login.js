import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image, BackHandler, ToastAndroid,AsyncStorage
} from 'react-native';

import utils from '../component/common/utils'
import {FormInput,Button} from 'react-native-elements'
import {toastShort} from '../component/toast';
import md5 from "react-native-md5";
import {NavigationActions} from 'react-navigation';
import Global from '../component/common/Global'
import { ProgressDialog } from 'react-native-simple-dialogs';

const loginUrl =utils.url+'CollegeManager/api/index/login';
const resetActions = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Home',params:{ userId: 'bar' }})]
});
export default class login extends Component {
    constructor(porps) {
        super(porps);
        this.state = {
            user:'',
            pass:'',
            loginLoading:false
        }
    }

    componentDidMount(){

        const that=this
        const keys = ["user","pass"];
        //根据键数组查询保存的键值对
        AsyncStorage.multiGet(keys, function(errs, result){
            //如果发生错误，这里直接返回（return）防止进入下面的逻辑
            if(errs){
                return;
            }
            //得到的结果是二维数组（result[i][0]表示我们存储的键，result[i][1]表示我们存储的值）
            that.setState({
                user: (result[0][1]!=null)?result[0][1]:'',
                pass: (result[1][1]!=null)?result[1][1]:''
            });
        });
    }

    // 请求处理
    handleRe(data){

        this.setState({
            progressVisible:false
        });

        if(data.code==1){
            if(data.msg==="error_000"){
                toastShort('服务器连接不上');
            }else {
                toastShort('账号或密码错误');
            }
        }
        if(data.code==0){
            if(data.data.mobile){
                const userData=[['user',this.state.user],['pass',this.state.pass]]
                AsyncStorage.multiSet(userData, function(errs){
                    if(errs){
                        return;
                    }
                })
                toastShort('登录成功');
                Global.userId=data.data.id;
                this.props.navigation.dispatch(resetActions)
            }else {
                toastShort('请先绑定手机号');
                Global.userId=data.data.id;
                return false
            }

        }
    }


    _checkIn(){
        if(this.state.user&&this.state.pass){
            this.setState({
                loginLoading:true
            })
            const data={
                account:this.state.user,
                password:md5.hex_md5(this.state.pass).toUpperCase()
            };
            utils.post(
                loginUrl,
                utils.toQueryString(data),
                this.handleRe.bind(this)  //传递this 给内部函数
            )
        }else {
            toastShort('请输入正确的手机号和密码');
        }

    }
    // componentWillMount(){
    //     BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    //
    // }
    //
    // componentWillUnmount(){
    //     BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    // }
    //
    // onBackAndroid = () => {
    //     const s = this.props.navigation;
    //     console.log(s)
    //     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
    //         //最近2秒内按过back键，可以退出应用。
    //         return false;
    //     }
    //     this.lastBackPressed = Date.now();
    //     ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    //     return true;
    //
    // };

    render() {
        return (
            <ScrollView style={{marginTop:20}}>
                <View style={styles.container}>
                    <Image
                        resizeMode={'contain'}
                        source={require('../component/img/logo.png')}
                        style={{width:100,height:80}}
                    />
                    <Image
                        resizeMode={'contain'}
                        source={require('../component/img/in.png')}
                        style={{width:80,height:60}}
                    />
                </View>

                <View style={styles.fromContainer}>
                    <FormInput

                        keyboardType={'numeric'}
                        value={this.state.user}
                        underlineColorAndroid='transparent'
                        containerStyle={{width:utils.size.width,borderWidth:1,borderColor:'#dcdddd',height:40}}
                        inputStyle={{width:utils.size.width,backgroundColor:"#fff",fontSize:utils.style.FONT_SIZE_SMALL}}
                        placeholder='学号或手机号登陆'
                        onChangeText={(user)=>this.setState({user})}
                    />
                    <FormInput
                        value={this.state.pass}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        containerStyle={{width:utils.size.width,borderWidth:1,borderColor:'#dcdddd',height:40}}
                        inputStyle={{width:utils.size.width,backgroundColor:"#fff",fontSize:utils.style.FONT_SIZE_SMALL}}
                        placeholder='密码'
                        onChangeText={(pass)=>this.setState({pass})}
                    />
                </View>

                <Button
                    small
                    containerViewStyle={{marginTop:50,height:40}}
                    disabled={this.state.loginLoading}
                    // icon={{name: 'envira', type: 'font-awesome'}}
                    loading={this.state.loginLoading}
                    buttonStyle={{borderRadius:8,backgroundColor:'#fabe00'}}
                    loadingProps={{ size: "10", color: "rgba(111, 202, 186, 1)" }}
                    title={this.state.loginLoading?'正在登录':'登录'}
                    onPress={()=>this._checkIn()}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}
                          onPress={() => {
                              this.props.navigation.navigate('Regpass')
                          }
                        }
                    >
                        忘记密码？
                    </Text>
                </View>

            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container:{
        paddingTop:20,
        alignItems:'center',
        marginBottom:10
    },
    fromContainer:{
        width:utils.size.width,
        alignItems:'center'
    },
    textContainer:{
        marginTop:10,
        justifyContent :'space-between',
        marginLeft:15,
        marginRight:15,
        alignItems:'center'
    },
    text:{
        fontSize:utils.style.FONT_SIZE_SMALL,
        color:'#231815'
    }
});