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

const ImagePicker = require('react-native-image-picker');
import Icon from 'react-native-vector-icons/FontAwesome';

const options = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class CameraButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
    }


    render() {
        return (
            <TouchableOpacity
                onPress={this.showImagePicker.bind(this)}
                style={[this.props.style,styles.cameraBtn]}>
                <View style={{flexDirection:'row'}}>
                    <Icon
                        name="user-circle-o"
                        color="#008ccf"
                        size={15}/>
                    <Text style={{fontSize:12,paddingLeft:5}}>
                        修改头像
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true}
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true}
                }


                let file;
                if(Platform.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }

                this.setState({
                    loading:true
                });

                this.props.onFileUpload(file,response.fileName||'未命名文件.jpg')
                // .then(result=>{
                //     this.setState({
                //         loading:false
                //     })
                // })
            }
        });
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

export default CameraButton;