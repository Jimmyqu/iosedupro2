import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    ScrollView,
    WebView
} from 'react-native';

import utils from "../common/utils";

const width = utils.size.width;

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: '公告详情',
    });

    constructor(props) {
        super(props);
        this.state={
            height:0,
        }
    }

    render() {
        const { params } = this.props.navigation.state;

        const Y=(new Date(params.createTime).getFullYear())
        const M=(new Date(params.createTime).getMonth()+1)
        const D=(new Date(params.createTime).getDate()+1)
        const timer=Y+"-"+M+"-"+D  // 时间戳转时间
        return (

            <ScrollView >
                <Image
                    style={{width:width,height:200,}}
                    source={params.url?{uri:params.url}:require('../../static/img/1.jpg')}
                />
                <View style={{backgroundColor:"#fff",height:this.state.height}}>
                    <WebView
                        // automaticallyAdjustContentInsets={true}
                        //scalesPageToFit={true} //文字自适应宽度
                        //style={{flex:1,width:width}}
                        source={{html:`
        <!DOCTYPE html>
            <html>
                <body>

                    <script>window.onload=function()
                    {
                        window.location.hash = 1;
                        document.title = document.body.clientHeight;

                        var imgs=document.getElementsByTagName('img');
                        for (var i=0;i<imgs.length;i++){
                            var img = imgs[i];
                            img.style.width='${width-20}px'
                        }
                    }
                    </script>
                    ${params.content}
                </body>
            </html>
`,baseUrl: '' }} //转换html 中文乱码
                        automaticallyAdjustContentInsets={true}
                        contentInset={{top:0,left:0}}
                        onNavigationStateChange={(title)=>{
                            if(title.title != undefined) {
                                this.setState({
                                    height:(parseInt(title.title)+400)
                                })
                            }
                        }}
                    >
                    </WebView>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    news_title:{
        marginTop:20,
        fontSize:utils.style.FONT_SIZE_TITLE,
        fontWeight:'bold',
        textAlign:'center',
        color:'#000'
    },
    news_time:{
        fontSize:utils.style.FONT_SIZE_SMALLER,
        textAlign:'center',
        color:'#c9c9ca'
    },
    detail_container:{
        marginTop:20,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:50
    },
    news_detail:{
        fontSize:utils.style.FONT_SIZE,
        textAlign:'center',
        color:'#000'
    }


});