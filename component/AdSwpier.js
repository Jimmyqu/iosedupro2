import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import utils from './common/utils'
import Swiper from 'react-native-swiper'
import ViewLoading from './ViewLoading'

const width = utils.width;
// const url='http://rap2api.taobao.org/app/mock/5504/GET//example/1517900324538'  //mock
const url=utils.url+'CollegeManager/api/index/noticeList'
export default class stars extends Component {

    constructor(porps) {
        super(porps);
        this.state = {
            Img: null,
            loading:false
        }
    }
    _renderIMG(data){
        const arr=[];
        for (let i in data.data){
            arr.push(
                <View key={i} style={styles.slide}>
                    <TouchableOpacity
                        style={{flex :1}}
                        onPress={()=>this.props.navigate('公告详情',{
                            url:data.data[i].image.url,
                            title:data.data[i].title,
                            content: data.data[i].content,
                            createTime:data.data[i].createTime
                        })}
                    >
                        <Image
                            resizeMode='stretch'
                            style={styles.image}
                            source={data.data[i].image.url?{uri:data.data[i].image.url}:require('../static/img/1.jpg')}
                        />
                    </TouchableOpacity>
            </View>)
        }

        this.setState({
            Img:arr,
            loading:true
        });
    }

    componentDidMount() {
        // utils.get(url,this._renderIMG.bind(this))  //绑定this 传递到_renderIMG中
        fetch(url,{
            method: 'POST',
            })
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                this._renderIMG(responseData);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                    {this.state.loading?<Swiper
                        style={styles.wrapper}
                        height={240}
                        autoplay={true}
                        autoplayTimeout={4}
                        dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                        activeDot={<View style={{backgroundColor: 'yellow', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{
                            bottom: 23, left: null, right: 10
                        }}
                        loop>
                        {this.state.Img.map((val)=>val)}
                    </Swiper>:<ViewLoading/>}
                </View>



        );
    }


}

const styles = StyleSheet.create({
    container: {
        height:200
    },
    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width:width,
        flex: 1
    }
});

