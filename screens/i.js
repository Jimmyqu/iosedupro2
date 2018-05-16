import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    BackHandler,
    ToastAndroid,
    DeviceEventEmitter,
    NativeAppEventEmitter,
    Platform,
    Navigator,
    Linking,
    Alert
} from 'react-native';

import AdSwiper from '../component/AdSwpier'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Divider} from 'react-native-elements'
import openClass from "../component/index/openclass";
import utils from '../component/common/utils'
import Global from '../component/common/Global'
import ViewLoading from '../component/ViewLoading'
import BackgroundTimer from 'react-native-background-timer';
import Alipay from 'react-native-yunpeng-alipay'
import { Initializer, Location } from 'react-native-baidumap-sdk'
import {toastShort} from "../component/toast";


const openClassUrl =utils.url+'CollegeManager/api/index/newCourseList';
const todayClassUrl =utils.url+'CollegeManager/api/index/todayCourseList';
const uploadPositionUrl=utils.url+'CollegeManager/api/user/uploadPosition';
const versionUrl=utils.url+'CollegeManager/api/index/getVersion';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            openClass: null,
            todayClass:null,
            loading:false
        }
    }

    _openClass(data){
        const arr=[];
        for (let i in data.data){
            arr.push(
                <View key={i} >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('openClass',
                            {
                                type: '公开课',
                                courseId:data.data[i].id,
                                userId:Global.userId,
                                bgUrl:data.data[i].image.url
                            })}
                    >
                        <View style={styles.class_item}>
                            <Image
                                resizeMode="cover"
                                blurRadius={1}
                                style={{width:80,height:70,}}
                                source={{uri:data.data[i].image.thumbnailUrl}}
                                // defaultSource={require('../static/img/1.jpg')} //IOS 安卓无
                            />
                            <View style={styles.item_r}>
                                <Text style={styles.item_r_title}>{data.data[i].title}</Text>
                                <Text
                                    numberOfLines={2}
                                    style={styles.item_r_content}
                                >
                                    {data.data[i].description}
                                </Text>

                                <View style={[styles.class_item_span,{marginTop:5}]}>
                                    <Icon
                                        style={{color:"#5eae00",paddingLeft:2}}
                                        name="map-marker"
                                        size={15}
                                    />
                                    <Text
                                        style={styles.class_item_span_content}
                                    >
                                        {data.data[i].address}
                                    </Text>
                                </View>
                                <View style={styles.class_item_span}>
                                    <Icon style={{color:"#5eae00"}} name="clock-o" size={15}/>
                                    <Text
                                        style={styles.class_item_span_content}
                                    >
                                        {data.data[i].timeSlot}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider style={{height:3}}/>
                </View>
            )
        }
        if(arr.length===0){
            arr.push(<View key={1} >
                <TouchableOpacity>
                    <View style={styles.class_item}>
                        <Image
                            resizeMode="cover"
                            blurRadius={1}
                            style={{width:80,height:70,}}
                            source={require('../static/img/1.jpg')}
                            // defaultSource={require('../static/img/1.jpg')} //IOS 安卓无
                        />
                        <View style={styles.item_r}>
                            <Text style={styles.item_r_title}>暂无课程</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={{height:3}}/>
            </View>)
            this.setState({
                openClass:arr,
                loading:true
            });
        }else {
            this.setState({
                openClass:arr,
                loading:true
            });
        }

    }

    _todayClass(data){
        const arr=[];
        for (let i in data.data){
            arr.push(
                <View key={i} >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ClassType',
                            {
                                type: '今日课程',
                                courseId:data.data[i].id,
                                userId:Global.userId,
                                bgUrl:data.data[i].image.url})
                        }
                    >
                        <View style={styles.schedule_item}>
                            <View style={styles.schedule_item_title}>
                                <View style={{
                                    flex:1,

                                    backgroundColor:'#0d8ccf',

                                    borderRadius:5,
                                    height:30,
                                    marginRight:5,
                                    marginLeft:5
                                }}>
                                    <Text style={styles.title_l}>
                                        {data.data[i].title}
                                    </Text>
                                </View>
                                <View style={{
                                    flex:2,
                                    backgroundColor:'#cbcdcc',

                                    borderRadius:5,
                                    height:30,
                                    marginRight:5,
                                    marginLeft:5
                                }}>
                                    <Text style={styles.title_r}>
                                        课程内容
                                    </Text>
                                </View>

                            </View>
                            <View style={styles.schedule_item_container}>
                                <Text
                                    style={styles.schedule_item_content}
                                    numberOfLines={3}
                                >
                                    {'        '}{data.data[i].description}
                                </Text>
                                <View style={styles.icon_container}>
                                    <View style={styles.class_item_span}>
                                        <Icon name="map-marker" size={15} style={{color:"#5eae00",paddingLeft:2}}/>
                                        <Text
                                            style={styles.class_item_span_content}
                                        >
                                            {data.data[i].address}
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider style={{height:3}}/>
                </View>
            )

        }
        if(arr.length===0){
            arr.push(<View key={1} >
                <TouchableOpacity>
                    <View style={styles.class_item}>
                        <Image
                            resizeMode="cover"
                            blurRadius={1}
                            style={{width:80,height:70,}}
                            source={require('../static/img/1.jpg')}
                            // defaultSource={require('../static/img/1.jpg')} //IOS 安卓无
                        />
                        <View style={styles.item_r}>
                            <Text style={styles.item_r_title}>暂无课程</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={{height:3}}/>
            </View>)
            this.setState({
                todayClass:arr,
                loading:true
            });
        }else {
            this.setState({
                todayClass:arr,
                loading:true
            });
        }


    }

    //version link
    confirm(){
        Linking.openURL(this.state.updateLink) .catch((err)=>{
            alert('下载出错', err);
        });
    }
    componentDidMount(){
        //请求版本号
        fetch(versionUrl,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                this.setState({
                    updateLink:responseData.data.url
                });
                if(responseData.data.num!==utils.version){
                    Alert.alert('版本更新','有新版本请点击确认更新',[
                        {
                            text:"确认",
                            onPress:this.confirm.bind(this)}
                    ]);
                }
            })



        BackgroundTimer.setInterval(()=>{
            navigator.geolocation.getCurrentPosition(  //自带定位真机可用
                (position) => {
                    let crd = position.coords;

                    Global.pos={
                        lon:position.coords.longitude,
                        lat:position.coords.latitude,
                    }
                    const option={
                        lon:crd.longitude,
                        lat:crd.latitude,
                        userId:Global.userId,
                    };
                    utils.post(
                        uploadPositionUrl,
                        utils.toQueryString(option),
                        ()=> {}
                    );
                    },
                (error) => console.log(error.message),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                );
            },2000)

        Initializer.init(utils.key);

        // Location.init().then((d)=> {
        //         console.log(d)
        //         Location.addLocationListener(location =>
        //             BackgroundTimer.setInterval(()=>{
        //                 console.log(11)
        //                 Global.pos={
        //                     lon:location.longitude,
        //                     lat:location.latitude,
        //                 }
        //                 const option={
        //                     lon:location.longitude,
        //                     lat:location.latitude,
        //                     userId:Global.userId,
        //                 };
        //                 console.log(option)
        //                 utils.post(
        //                     uploadPositionUrl,
        //                     utils.toQueryString(option),
        //                     ()=>{
        //                         Location.stop()
        //                     }
        //                 );
        //             },2000)
        //         )
        //         Location.start()
        //     }
        // ).catch((err)=>{
        //     toastShort('定位失败'+err)
        // })

        const data={
                userId:Global.userId
            };
            utils.post(
                openClassUrl,
                utils.toQueryString(data),
                this._openClass.bind(this)
            );
            utils.post(
                todayClassUrl,
                utils.toQueryString(data),
                this._todayClass.bind(this)
            )

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                <AdSwiper
                    navigate={navigate}
                />
                {this.state.loading?<View>
                    <View style={styles.public_class}>
                        <View style={{flexDirection:'row',height:40,justifyContent:'space-between'}}>
                            <Text style={{fontSize:utils.style.FONT_SIZE_TITLE,
                                fontWeight:'bold',lineHeight:40,paddingLeft:15,}}>[ 公开课 ]</Text>
                            <TouchableOpacity
                                style={{flexDirection:'row'}}
                                onPress={()=>console.log(this.props.navigation.navigate('allOpenClass'))}
                            ><Text style={{
                                lineHeight:40,
                                height:40,
                                fontSize:utils.style.FONT_SIZE_SMALL
                            }}>全部课程</Text>
                                <Icon
                                    style={{color:"#E8E8E8",paddingLeft:2, height:40,lineHeight:40,
                                        paddingRight:15,marginTop:2}}
                                    name="chevron-right"
                                    size={utils.style.FONT_SIZE_SMALL}
                                />
                            </TouchableOpacity>
                        </View>
                        <Divider style={{height:3}}/>

                        {this.state.openClass}
                    </View>
                    <Text style={styles.title}>[ 今日课表 ]</Text>
                    <Divider style={{height:3}}/>
                    {this.state.todayClass}
                </View>:<ViewLoading/>}

            </ScrollView>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop:20
    },
    public_class:{
        paddingTop:10,
    },
    title:{
        paddingLeft:15,
        fontSize:utils.style.FONT_SIZE_TITLE,
        fontWeight:'bold',
        paddingTop:5,
        paddingBottom:5
    },
    class_item:{
        flexDirection:'row',
        paddingTop:15,
        paddingLeft:18,
        paddingBottom:15
    },

    item_r:{
        paddingRight:80,
        paddingLeft:15,
    },
    item_r_title:{
        fontSize:utils.style.FONT_SIZE,
        fontWeight:'bold'
    },
    item_r_content:{
        fontSize:utils.style.FONT_SIZE_SMALL,
    },
    class_item_span:{
        flexDirection:'row',
        marginRight:10,
        marginTop:3
    },
    class_item_span_content:{
        fontSize:utils.style.FONT_SIZE_SMALLER,
        marginLeft:5,

    },
    schedule_item:{
        paddingLeft:30,
        paddingRight:30,
        paddingTop:10,
        paddingBottom:10
    },
    schedule_item_container:{
        marginTop:5,
        backgroundColor:'#f4fdec',
        borderRadius:5,
    },
    schedule_item_title:{
        flexDirection:"row"
    },
    title_l:{
        flex:1,
        textAlign:'center',
        lineHeight:30,
        backgroundColor:'#0d8ccf',
        fontSize:utils.style.FONT_SIZE_TITLE,
        borderRadius:5,
        height:30,
        marginRight:5,
        marginLeft:5
    },
    title_r:{
        flex:2,
        textAlign:'center',
        backgroundColor:'#cbcdcc',
        fontSize:utils.style.FONT_SIZE_SMALL,
        borderRadius:5,
        height:30,
        marginRight:5,
        marginLeft:5,
        lineHeight:30,
    },
    schedule_item_content:{
        fontSize:utils.style.FONT_SIZE_SMALL,
        paddingRight:5,
        paddingLeft:5,
        paddingTop:10
    },
    icon_container:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:5,
        marginBottom:5
    }


});