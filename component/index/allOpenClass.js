import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import utils from "../common/utils";
import Global from "../common/Global";
import ViewLoading from '../ViewLoading'
import {Divider} from 'react-native-elements'

const myCourseUrl=utils.url+'CollegeManager/api/course/courseList';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: '全部课程',
    });

    constructor(props) {
        super(props);
        this.state={
            openClass: null,
            loading:false
        }
    }

    _openClass(data){
        const arr=[];
        for (let i in data.data){
            arr.push(
                <View key={i} >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('openClass',{
                                type: '公开课',
                                courseId:data.data[i].id,
                                userId:Global.userId,
                                bgUrl:data.data[i].image.url
                            }
                        )}
                    >
                        <View style={styles.class_item}>
                            <View style={{width:80,height:70,}}>
                                <Image
                                    resizeMode="cover"
                                    blurRadius={1}
                                    style={{width:80,height:70}}
                                    source={{uri:data.data[i].image.thumbnailUrl}}
                                />
                            </View>

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
                            source={require('../../static/img/1.jpg')}
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

    componentDidMount(){
        const data={
            userId:Global.userId,
            type:1,
            isSign:0
        };
        utils.post(
            myCourseUrl,
            utils.toQueryString(data),
            this._openClass.bind(this)
        )
    }
    render() {

        return (
            <ScrollView style={styles.container}>
                {this.state.loading?<View>
                    <View style={styles.public_class}>
                        {this.state.openClass}
                    </View>
                </View>:<ViewLoading/>}
            </ScrollView>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
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
        marginTop:2
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
        fontSize:15,
        borderRadius:5,
        height:30,
        marginRight:5
    },
    title_r:{
        flex:2,
        textAlign:'center',
        backgroundColor:'#cbcdcc',
        fontSize:13,
        borderRadius:5,
        height:30,
        lineHeight:30,
    },
    schedule_item_content:{
        fontSize:12,
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