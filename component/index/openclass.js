import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,ScrollView
} from 'react-native';

import {Button,List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import utils from '../common/utils'
import {toastShort} from '../toast'
import ViewLoading from '../ViewLoading'

const width = utils.size.width;
const courseInfoUrl=utils.url+'CollegeManager/api/course/courseInfo';
const courseSign=utils.url+'CollegeManager/api/course/courseJoin';
// const my=[
//     {
//         name: 'Jimmy',
//         avatar_url: 'http://imgs.aixifan.com/cms/2018_02_22/1519293027325.png?imageView2/1/w/520/h/256',
//         subtitle: '15123456789'
//     },
// ];
export default class math extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.type}`,
    });

    constructor(props) {
        super(props);
        this.state={
            data:null,
            loading:false,
            isJoin:false
        }
    }

    _courseInfo(data){
        this.setState({
            data:data,
            loading:true,
            isJoin:data.data.isJoin
        });

    }

    _getClassCallback(data){
        console.log(data)
        //鏀粯to do
        if(data.data.orderId!==null){
            this.setState({
                isJoin:1
            })
            toastShort('报名成功')
        }
        console.log(this.state.isJoin)
    }

    _getClass(){
        const { courseId,userId } = this.props.navigation.state.params;
        const option={
            userId:userId,
            courseId:courseId,
            payType:0
        };
        utils.post(
            courseSign,
            utils.toQueryString(option),
            this._getClassCallback.bind(this)
        );
    }

    componentDidMount() {
        const { courseId,userId } = this.props.navigation.state.params;
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
        // console.log(this.state.data.data.teacher)
        const type=this.props.navigation.state.params.type==='公开课'; //鍒ゆ柇椤甸潰
        const bgurl=this.props.navigation.state.params.bgUrl
        const my = [this.state.loading?this.state.data.data.teacher:[]];

        return (
            <ScrollView style={{paddingBottom:20}}>
                { /* other code from before here */ }
                <Image
                    style={styles.img}
                    source={{url:bgurl}}
                />
                {this.state.loading?
                    <View style={{marginBottom:50}}>
                        <List containerStyle={{width:width*0.9,height:60,marginTop: 10, borderTopWidth: 0, borderBottomWidth: 0, borderBottomColor: '#cbd2d9',justifyContent:'center',marginLeft:width*0.05}}>
                            {
                                my.map((l, i) => (
                                    <ListItem
                                        roundAvatar
                                        avatar={{uri:l.profilePhoto}}
                                        subtitle={l.place }
                                        rightTitleStyle={{fontSize:utils.style.FONT_SIZE}}
                                        containerStyle={{justifyContent:'center'}}
                                        key={i}
                                        title={l.name}
                                        onPress={()=>this.props.navigation.navigate('classDetail',{
                                            teacherId:this.state.data.data.teacher.id
                                        })}
                                    />
                                ))
                            }
                        </List>
                        <View style={styles.math_detail}>
                            <Text>{'       '}{this.state.data.data.description}</Text>
                            <View style={styles.icon_container}>
                                <View style={styles.class_item_span}>
                                    <Icon name="map-marker" size={15} style={{color:"#5eae00"}}/>
                                    <Text
                                        style={styles.class_item_span_content}
                                    >
                                        {this.state.data.data.address}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    :null}

                {type&&this.state.loading?<Button
                    disabled={this.state.isJoin!==0}
                    small
                    containerViewStyle={{marginTop:10,height:30,marginBottom:50}}
                    // icon={{name: 'envira', type: 'font-awesome'}}
                    buttonStyle={{borderRadius:8,backgroundColor:'#008ccf',height:30}}
                    title={this.state.isJoin===0?'点击报名':'已报名'}
                    onPress={()=>this._getClass()}
                />:null}

            </ScrollView>
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
        paddingTop:30,
        paddingLeft:15,
        paddingRight:15,

    },
    icon_container:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:5,
        marginBottom:5
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
    class_item_money:{
        position:'absolute',
        flexDirection:'row',
        left:10,
        marginTop:5
    }
});