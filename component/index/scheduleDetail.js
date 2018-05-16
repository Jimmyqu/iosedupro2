import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,ScrollView,Linking
} from 'react-native';

import {Button,List, ListItem} from 'react-native-elements'
import classRate from "./classRate";
import utils from '../common/utils'
import Global from "../common/Global";
import {toastShort} from "../toast";
import ViewLoading from '../ViewLoading'
import { Initializer, Location } from 'react-native-baidumap-sdk'
//import { Geolocation }  from 'react-native-baidu-map'

const width = utils.size.width;
const courseInfoUrl=utils.url+'CollegeManager/api/course/courseInfo';
const SignUrl=utils.url+'CollegeManager/api/course/courseSign';
Initializer.init(utils.key);

export default class math extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.type}`,
        // title: `${navigation.state.params.courseId}`,
    });

    constructor(props) {
        super(props);
        this.state={
            data:null,
            loading:false,
            isSign:false,
            file:'',
            bgurl:'',
            btnLoading:false
        }
    }

    _courseInfo(data){
        this.setState({
            data:data.data,
            loading:true,
            isSign:data.data.isSign,
            file:data.data.fileUrl,
            bgurl:data.data.image.url
        });
        console.log(data)
    }

    _getSignCallback(data){
        console.log(data)
        if(data.code===0){
            this.setState({
                isSign:1,
                btnLoading:false
            });
            toastShort('签到成功')
        }else {
            if(data.msg==='error_000'){
                toastShort('服务器错误')
            }
            if(data.msg==='error_015'){
                toastShort('找不到该课程')
            }
            if(data.msg==='error_005'){
                toastShort('未到打卡时间')
            }
            if(data.msg==='error_006'){
                toastShort('签到时间已过')
            }
            if(data.msg==='error_007'){
                toastShort('打卡地点不正确')
            }
            if(data.msg==='error_014'){
                toastShort('课程已经签到过')
            }
            this.setState({
                btnLoading:false
            })
        }
    }

    _getSign(){
        this.setState({
            btnLoading:true
        });
        const {courseId} = this.props.navigation.state.params;
        const option={
            lon:Global.pos.lon,
            lat:Global.pos.lat,
            userId:Global.userId,
            courseId:courseId,
        };
        utils.post(
            SignUrl,
            utils.toQueryString(option),
            this._getSignCallback.bind(this)
        );
    }

    _downFile(){
        this.state.file?Linking.openURL(this.state.file):toastShort('暂无课件')
    }

    componentDidMount() {
        const { courseId} = this.props.navigation.state.params;
        const userId=Global.userId;
        const option={
            courseId:courseId,
            userId:userId
        };
        utils.post(
            courseInfoUrl,
            utils.toQueryString(option),
            this._courseInfo.bind(this)
        );

    }

    render() {



        const my = [this.state.loading?this.state.data.teacher:[]];

        return (

            this.state.loading?<ScrollView style={{paddingBottom:20}}>
                <Image
                    style={styles.img}
                    source={{uri:this.state.data.image.url}}
                />
                <List containerStyle={{width:width*0.9,height:60,marginTop: 10, borderTopWidth: 0, borderBottomWidth: 0, borderBottomColor: '#cbd2d9',justifyContent:'center',marginLeft:width*0.05}}>

                    {

                        my.map((l, i) => (

                            <ListItem
                                roundAvatar
                                avatar={{uri:l.profilePhoto}}
                                subtitle={l.place }
                                rightTitleStyle={{fontSize:12}}
                                containerStyle={{justifyContent:'center'}}
                                key={i}
                                title={l.name}
                                onPress={()=>this.props.navigation.navigate('classDetail',{

                                    teacherId:this.state.data.teacher.id

                                })}

                            />

                        ))

                    }

                </List>
                <View style={styles.math_detail}>
                    <Text>{'       '}{this.state.loading?this.state.data.description:null}</Text>
                    <Button
                        onPress={()=>this._getSign()}
                        loading={this.state.btnLoading}
                        disabled={this.state.btnLoading||this.state.isSign!==0}
                        title={this.state.isSign===0?'打卡签到':'已签到'}
                        icon={!this.state.btnLoading?{name:'arrow-right',type: 'font-awesome'}:null}
                        loadingProps={{ size: "10", color: "rgba(111, 202, 186, 1)" }}
                        buttonStyle={{
                            backgroundColor: "#008ccf",
                            width: 120,
                            height: 30,
                            borderRadius: 8
                        }}
                        containerViewStyle={{ position:'absolute',bottom:20,left:10,width:120,height:30}}
                    />
                    <Button
                        containerViewStyle={{position:'absolute',bottom:20,right:10,width:120,height:30}}
                        buttonStyle={{borderRadius:8,backgroundColor:'#008ccf',width:120,height:30}}
                        icon={{name:'download',type: 'font-awesome'}}
                        title={'附件下载' }
                        onPress={this._downFile.bind(this)}
                    />

                </View>
                <Button
                    small
                    containerViewStyle={{marginTop:10,height:30}}
                    // icon={{name: 'envira', type: 'font-awesome'}}
                    buttonStyle={{borderRadius:8,backgroundColor:'#7fbf26',height:30}}
                    title='课程评价'
                    onPress={()=>this.props.navigation.navigate('classRate',{type:'课程评价'})}
                />
            </ScrollView>:<ViewLoading/>

        );

    }

}

const styles = StyleSheet.create({
    img:{
        width:width,
        height:200
    },
    math_detail:{
        width:width*0.9,
        marginLeft:width*0.05,
        backgroundColor:'#fff',
        marginTop:10,
        paddingTop:15,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:70
    }
});
