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

import {List, ListItem,Avatar} from 'react-native-elements'
import utils from "../component/common/utils";
import Global from '../component/common/Global'
import {toastShort} from '../component/toast'
import CameraButton from '../component/CameraButton'
import ViewLoading from '../component/ViewLoading'
import { ConfirmDialog } from 'react-native-simple-dialogs';

// const my=[
//     {
//         name: 'Jimmy',
//         avatar_url: 'http://imgs.aixifan.com/cms/2018_02_22/1519293027325.png?imageView2/1/w/520/h/256',
//         subtitle: '15123456789'
//     },
// ];

const settingList = [
    {
        name:'绑定手机',
        to:'Reg'
    },
    {
        name: '更改密码',
        to:'Forget'
    },
    {
        name: '公开课程',
        to:'MyClass'
    },
    {
        name: '用户反馈',
        to:'Feedback'
    },
    {
        name: '版本更新',
        to:'Update'
    },
];
const settingUrl =utils.url+'CollegeManager/api/index/getInfo';
const avatarUrl =utils.url+'CollegeManager/api/index/modifyAvatar';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null,
            loading:false,
            avatarSource: null,
            iconLoading:false,
            iconVisible: false,
            dialogVisible:false,
            imageSure:false,
            fileurl:''
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.state)
        const option={
            userId:Global.userId
        };
        utils.post(
            settingUrl,
            utils.toQueryString(option),
            this._settingCallback.bind(this)
        );

    }

    _settingCallback(data){
        this.setState({
            data:data,
            loading:true
        });

        // console.log(this.state.data.data.profilePhoto)
    }


    onFileUpload(file, fileName,) {  //监听选择完成后的回调
        this.setState({
            dialogVisible:true,
            fileurl:file,
            modal:false
        });
    }

    render() {
        const InfoList=this.state.loading?[
            {
                name: '姓名',
                subtitle:this.state.data.data.name
            },
            {
                name: '性别',
                subtitle:this.state.data.data.sex===0?'男':'女'
            },
            {
                name: '学号',
                subtitle:this.state.data.data.number||'2'
            },
            {
                name: '学院',
                subtitle:this.state.data.data.institute.name
            },
            {
                name: '专业',
                subtitle:this.state.data.data.specialty.name
            },
            {
                name: '班级',
                subtitle:this.state.data.data.grade.name
            },

        ]:[
            {
                name: '姓名',
                subtitle:''
            },
            {
                name: '性别',
                subtitle:''
            },
            {
                name: '学号',
                subtitle:''
            },
            {
                name: '学院',
                subtitle:''
            },
            {
                name: '专业',
                subtitle:''
            },
            {
                name: '班级',
                subtitle:''
            },

        ];

        return (

            <View style={{flex:1}}>
                {this.state.loading?
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{flex:1,marginTop:20}}
                    >
                    <View >
                        <View style={{
                            flexDirection:'row',
                            height:100,
                            backgroundColor:'#fff',
                            borderColor:'#bbbbbb',
                            borderTopWidth:1.5,
                            borderBottomWidth:1.5,
                            borderRightWidth:0,
                            borderLeftWidth:0,
                            marginTop:10
                        }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Avatar

                                    rounded
                                    medium
                                    source={{uri:this.state.iconLoading?
                                            this.state.avatarSource
                                            :this.state.data.data.profilePhoto
                                            }}
                                    onPress={() =>{
                                        this.setState({
                                            modal:true
                                        })
                                    }

                                    }
                                    activeOpacity={0.7}
                                />
                            </View>
                            <View style={{
                                flex:2,
                                justifyContent:'center'}}>
                                <Text style={{fontSize:utils.style.FONT_SIZE_TITLE}}>
                                    {this.state.data.data.name}
                                </Text>
                                <Text>
                                    {this.state.data.data.mobile}
                                </Text>
                            </View>
                            <View style={{
                                flex:1,
                                flexDirection:'row',
                                justifyContent:'center',
                                paddingRight:10,
                                alignItems:'center'}}>
                                <CameraButton
                                    onFileUpload={this.onFileUpload.bind(this)}
                                />
                            </View>

                        </View>

                        <List containerStyle={{marginBottom: 0}}>
                            {
                                InfoList.map((l, i) => (
                                    <ListItem
                                        rightTitle={l.subtitle}
                                        rightTitleStyle={{fontSize:utils.style.FONT_SIZE_SMALL}}
                                        containerStyle={{height:35}}
                                        key={i}
                                        title={l.name}
                                        hideChevron={true}

                                    />
                                ))
                            }
                        </List>

                        <List containerStyle={{marginBottom: 20}}>
                            {
                                settingList.map((l, i) => (
                                    <ListItem
                                        containerStyle={{height:35}}
                                        key={i}
                                        title={l.name}
                                        subtitle={l.subtitle}
                                        onPress={() => this.props.navigation.navigate(l.to)}
                                    />
                                ))
                            }
                        </List>
                    </View>
                    {!this.state.modal?null:
                     <TouchableOpacity
                         style={{
                             position:'absolute',
                             top:0,
                             width:utils.size.width,height:utils.size.height}}
                         onPress={()=>{

                             this.setState({modal:false})

                         }
                         }>
                                <View
                                    style={{
                                        zIndex: 1,
                                        position:'absolute',
                                        top:0,
                                        backgroundColor:'#000',
                                        opacity:0.5,
                                        width:utils.size.width,height:utils.size.height+100}}>
                                </View>
                                <Image
                                    resizemode={'cover'}
                                    source={{uri:this.state.fileurl===''?
                                            this.state.data.data.profilePhoto
                                            :this.state.fileurl}}
                                    style={{
                                        position:'absolute',
                                        top:150,
                                        borderRadius:5,width:utils.size.width,height:300
                                    }}
                                >

                                </Image>




                    </TouchableOpacity>}
                </ScrollView>:<ViewLoading/>}
                <ConfirmDialog
                    contentStyle={{borderRadius:10}}
                    title="确认上传头像？"
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    positiveButton={{
                        title: "上传",
                        onPress: () => {
                            let data =new FormData();
                            let file11 = {uri: this.state.fileurl, type: 'multipart/form-data', name: 'avatar.jpg'};
                            data.append('userId',Global.userId)
                            data.append('avatar',file11);
                            const option ={
                                method:'post',
                                headers:{
                                    'Content-Type':'multipart/form-data',
                                },
                                body:data
                            };
                            fetch(
                                avatarUrl,
                                option
                            ).then(function(response){
                                if(response.ok){
                                    console.log('suc')
                                    return response.text();
                                }else{
                                    toastShort('网络错误，请稍后再试')
                                    return ;
                                }
                            }).then(function(data){
                                console.log('imgUrl',data);
                            });
                            this.setState({
                                avatarSource:this.state.fileurl,
                                iconLoading:true,
                                iconVisible: true,
                                dialogVisible:false
                            });

                        }
                    }}
                    negativeButton={{
                        title: "取消",
                        onPress: () => this.setState({
                            dialogVisible:false
                        })
                    }}
                >
                </ConfirmDialog>
            </View>

        );
    }
}