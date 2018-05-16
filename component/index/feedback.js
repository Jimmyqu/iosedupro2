import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import {Button} from 'react-native-elements'
import utils from '../common/utils'
import Global from "../common/Global";
import {toastShort} from "../toast";


const width = utils.size.width;
const feedbackUrl=utils.url+'CollegeManager/api/index/submitFeedback';

export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: '用户反馈',
    });

    constructor(props){
        super(props);
        this.state={
            suggest:'',
        }
    }

    _submitCallBack(data){
        if(data.code==1){
            toastShort('提交失败');
        }
        if(data.code==0){
            toastShort('提交成功');
            this.setState({
                suggest:''
            })
            console.log(this.state.suggest)
        }
    }

    _submitBtn(){

        const data={
            userId:Global.userId,
            content:this.state.suggest,
        };
        console.log(this.state.suggest)
        utils.post(
            feedbackUrl,
            utils.toQueryString(data),
            this._submitCallBack.bind(this)
        )
    }

    render() {
        return (
            <View >
                <Text style={{paddingLeft:15,fontSize:14,marginTop:20}}>问题描述或者建议:</Text>
                <View style={styles.math_detail}>
                    <TextInput
                        onChangeText={(suggest)=>this.setState({suggest})}
                        placeholder='请在此描述您遇到的问题或者建议'
                        underlineColorAndroid='transparent'
                        multiline = {true}
                        value = {this.state.suggest}  //提交清空
                        numberOfLines = {5}
                        style={{lineHeight:30, paddingLeft:15,fontSize:14,height:150}}>
                    </TextInput>
                </View>
                <Button
                    small
                    containerViewStyle={{marginTop:10,height:45}}
                    // icon={{name: 'envira', type: 'font-awesome'}}
                    buttonStyle={{borderRadius:8,backgroundColor:'#008ccf'}}
                    title='提交建议'
                    onPress={() => this._submitBtn()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    math_detail:{
        width:width,
        backgroundColor:'#fff',
        marginTop:10,
        paddingRight:15,
        height:150
    },

});
