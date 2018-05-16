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

import  CameraBtn from './CameraButton'
import Spinner from 'react-native-loading-spinner-overlay';
import utils from '../component/common/utils'

class imagePick extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            avatarSource: null,
            loading:false,
            visible: false
        }
    }

    onFileUpload(file, fileName,) {
        this.setState({
            avatarSource:file,
            loading:true,
            visible: true
        });
        console.log(file)
        let data =new FormData();
        let file11 = {uri: file, type: 'multipart/form-data', name: 'avatar.jpg'};
        data.append('userId','1')
        data.append('avatar',file11);
        const option ={
            method:'post',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:data
        };

        fetch(
            'http://192.168.0.89:8089/CollegeManager/api/index/modifyAvatar',
            option
        ).then(function(response){
            if(response.ok){
                console.log('suc')
                return response.text();
            }else{
                console.log('网络错误，请稍后再试')
                return ;
            }
        }).then(function(data){
            console.log('imgUrl',data);
        })

    }

    render(){

        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Spinner
                        style={{width:100,height:100,backgroundColor:'red'}}
                        //visible={this.state.visible}
                        visible={false}
                        textContent={"Loading..."}
                        textStyle={{color: '#FFF'}} />

                <View
                    style={{padding:5,width:110,height:110,backgroundColor:'#336699',borderRadius:110}}
                >
                    <Image
                        source={{uri:this.state.loading?this.state.avatarSource:null}}
                        style={{width:100,height:100,borderRadius:100}}
                    />

                    <CameraBtn
                        // style={{position:'absolute',right:0,top:70}}
                        onFileUpload={this.onFileUpload.bind(this)}
                    />
                </View>

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

export default imagePick;
