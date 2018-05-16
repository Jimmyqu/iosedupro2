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
import {  FormInput,Button } from 'react-native-elements'
import CountDown from 'react-native-smscode-count-down'
import md5 from "react-native-md5";
import {toastShort} from '../component/toast'
import Global from '../component/common/Global'


const smsUrl=utils.url+'CollegeManager/api/index/sendCode';
const bindUrl=utils.url+'CollegeManager/api/index/bindMobile';
export default class reg extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '绑定手机',
    });
    constructor(porps) {
        super(porps);
        this.state = {
            mobile:'',
            sms:'',
        }
    }

    componentDidMount(){
       
    }

    _submitBtn(){

        if(this.state.mobile&&this.state.sms){
            const data={
                userId:Global.userId,
                mobile:this.state.mobile,
                code:this.state.sms
            };
            console.log(data)
            utils.post(
                bindUrl,
                utils.toQueryString(data),
                (data)=>{
                    if(data.code==1){
                        if(data.msg==='error_011'){
                            toastShort('验证码错误')
                        }
                    }
                    if(data.code==0){
                        toastShort('绑定成功');
                    }
                }
            );
        }else {
            toastShort('请输入正确格式');
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
                        keyboardType={'numeric'}
                        onChangeText={(mobile)=>this.setState({mobile})}
                        underlineColorAndroid='transparent'
                        containerStyle={{marginLeft:0,width:utils.size.width,borderWidth:1,borderColor:'#dcdddd',height:40}}
                        inputStyle={{width:utils.size.width,backgroundColor:"#fff",fontSize:utils.style.FONT_SIZE_SMALL}}
                        placeholder='手机号码'
                    />
                    <FormInput
                        onChangeText={(sms)=>this.setState({sms})}
                        underlineColorAndroid='transparent'
                        containerStyle={{marginLeft:0,width:utils.size.width,borderWidth:1,borderColor:'#dcdddd',height:40}}
                        inputStyle={{width:utils.size.width,backgroundColor:"#fff",fontSize:utils.style.FONT_SIZE_SMALL}}
                        placeholder='验证码'

                    />

                    <View style={{position:'absolute',top:45,right:10,}}>
                        <CountDown
                            style={{
                                backgroundColor:'#008ccf',
                                width:70,height:30,
                                borderRadius:5
                            }}
                            textStyle={{color: 'black',fontSize:10}}
                            enable={true}  //是否可用  判断电话
                            timerCount={60}
                            timerTitle={'获取验证码'}
                            disableColor={'red'}
                            onClick={(shouldStartCounting)=>{
                                if(this.state.mobile.length===11){

                                    shouldStartCounting(true);
                                    const data={
                                        mobile:this.state.mobile
                                    };
                                    utils.post(
                                        smsUrl,
                                        utils.toQueryString(data),
                                        ()=>{
                                            console.log(this.state.mobile)
                                        }
                                    );
                                    toastShort('已发送验证码')
                                }else {
                                    toastShort('请输入正确的手机号')
                                    shouldStartCounting(false)
                                }

                            }}
                        />
                    </View>



                </View>
                <Button
                    small
                    containerViewStyle={{marginTop:10,height:45}}
                    // icon={{name: 'envira', type: 'font-awesome'}}
                    buttonStyle={{borderRadius:8,backgroundColor:'#008ccf'}}
                    title='确认绑定'
                    onPress={()=>this._submitBtn()}
                />

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