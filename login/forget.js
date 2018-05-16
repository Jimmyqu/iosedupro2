import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import utils from '../component/common/utils'
import Global from '../component/common/Global'
import {  FormInput,Button } from 'react-native-elements'
import CountDown from 'react-native-smscode-count-down'
import md5 from "react-native-md5";
import {toastShort} from '../component/toast'

const modifyPwdUrl=utils.url+'CollegeManager/api/index/modifyPwd';

export default class login extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '修改密码',
    });

    constructor(porps) {
        super(porps);
        this.state = {
            oldPassword:'',
            newPassword:'',
            renewPassword:''
        }
    }

    _submitBtn(){
        console.log(this.state.oldPassword+"   "+this.state.newPassword)
        if(this.state.oldPassword&&this.state.newPassword&&this.state.renewPassword){
            if(this.state.renewPassword===this.state.newPassword&&this.state.newPassword.length>=6){
                const data={
                    userId:Global.userId,
                    oldPassword:md5.hex_md5(this.state.oldPassword).toUpperCase(),
                    newPassword:md5.hex_md5(this.state.newPassword).toUpperCase()
                };
                utils.post(
                    modifyPwdUrl,
                    utils.toQueryString(data),
                    ()=>{
                        toastShort('密码修改成功')
                        this.setState({
                            oldPassword:'',
                            newPassword:'',
                            renewPassword:''
                        });
                    }
                )
            }else {
                toastShort('两次密码不一致')
            }
        }else {
            toastShort('请输入正确密码')
        }


    }

    render() {
        return (
            <ScrollView >
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
                        secureTextEntry={true}
                        value = {this.state.oldPassword}  //提交清空
                        onChangeText={(oldPassword)=>this.setState({oldPassword})}
                        underlineColorAndroid='transparent'
                        containerStyle={{marginLeft:0,width:utils.size.width,borderWidth:utils.pixel,borderColor:'#dcdddd',height:40}}
                        inputStyle={{width:utils.size.width,backgroundColor:"#fff",fontSize:utils.style.FONT_SIZE_SMALL,paddingLeft:5}}
                        placeholder='请输入旧密码'
                    />
                    <FormInput
                        secureTextEntry={true}
                        value = {this.state.newPassword}  //提交清空
                        onChangeText={(newPassword)=>this.setState({newPassword})}
                        underlineColorAndroid='transparent'
                        containerStyle={{marginLeft:0,width:utils.size.width,borderWidth:utils.pixel,borderColor:'#dcdddd',height:40}}
                        inputStyle={{width:utils.size.width,backgroundColor:"#fff",fontSize:utils.style.FONT_SIZE_SMALL,paddingLeft:5}}
                        placeholder='请输入新密码'

                    />
                    <FormInput
                        secureTextEntry={true}
                        value = {this.state.renewPassword}  //提交清空
                        onChangeText={(renewPassword)=>this.setState({renewPassword})}
                        underlineColorAndroid='transparent'
                        containerStyle={{marginLeft:0,width:utils.size.width,borderWidth:utils.pixel,borderColor:'#dcdddd',height:40}}
                        inputStyle={{width:utils.size.width,backgroundColor:"#fff",fontSize:utils.style.FONT_SIZE_SMALL,paddingLeft:5}}
                        placeholder='请确认新密码'
                    />

                    <Button
                        small
                        containerViewStyle={{marginTop:10,height:45}}
                        // icon={{name: 'envira', type: 'font-awesome'}}
                        buttonStyle={{borderRadius:8,backgroundColor:'#008ccf'}}
                        title='确认修改'
                        onPress={()=>this._submitBtn()}
                    />
                </View>
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        marginBottom:10,
        paddingTop:20,
    },
    fromContainer:{
        width:utils.size.width,
        justifyContent:'center'
    },
    textContainer:{
        marginTop:15,
        flexDirection:'row',
        justifyContent :'space-between',
        marginLeft:15,
        marginRight:15
    },
    text:{
        fontSize:12,
        color:'#00ccff'
    }
});