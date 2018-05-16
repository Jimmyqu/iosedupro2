import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TextInput
} from 'react-native';

import {Button,List, ListItem, Icon} from 'react-native-elements'
import utils from '../common/utils'
import StarRating from 'react-native-star-rating';
import {toastShort} from '../toast';
import Global from "../common/Global";

const width = utils.size.width;
const rateUrl=utils.url+'CollegeManager/api/course/courseEvaluate';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.type}`
    });

    constructor(props) {
        super(props);
        this.state = {
            starCount: 3,
            classRate:''
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    _submitCallback(data){
        if(data.code===1){
            if(data.msg==='error_016'){
                toastShort('课程已评价');
            }
            if(data.msg==='error_014'){
                toastShort('未报名该课程');
            }

        }
        if(data.code===0){
            toastShort('评价成功');

        }

        this.setState({
            starCount: 3,
            classRate:''
        });
    }

    _submitBtn(){
        const data={
            userId:1,
            courseId:1,
            content:this.state.classRate,
            score:this.state.starCount
        };
        utils.post(
            rateUrl,
            utils.toQueryString(data),
            this._submitCallback.bind(this)
        )
    }
    render() {
        return (
            <ScrollView style={{paddingBottom:20}}>
                <View style={styles.title}>
                    <Icon
                        size={80}
                        name={'rate-review'}
                        type={'MaterialIcons'}
                        color={"#b5b5b6"}
                    />
                    <View style={{justifyContent:'center',marginLeft:40}}>
                        <Text style={{paddingLeft:10,fontSize:18}}>
                            课程评分
                        </Text>
                        <StarRating
                            starSize={25}
                            emptyStarColor={'#c9c9ca'}
                            iconSet={'FontAwesome'}
                            emptyStar={'star-o'}
                            fullStarColor={'#e60012'}
                            disabled={false}
                            maxStars={5}
                            starStyle={{marginLeft:10}}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                    </View>
                </View>
                <View style={styles.math_detail}>
                    <Text style={{paddingLeft:15,fontSize:18}}>评价内容</Text>
                    <TextInput
                        onChangeText={(classRate)=>this.setState({classRate})}
                        placeholder='请输入评价'
                        underlineColorAndroid='transparent'
                        multiline = {true}
                        numberOfLines = {4}
                        style={{lineHeight:30, paddingLeft:15,}}>
                    </TextInput>
                </View>
                <Button
                    small
                    containerViewStyle={{marginTop:10,height:40}}
                    // icon={{name: 'envira', type: 'font-awesome'}}
                    buttonStyle={{borderRadius:8,backgroundColor:'#008ccf',height:40}}
                    title='提交'
                    onPress={()=>this._submitBtn()}

                />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    title:{
        marginTop:5,
        width:width,
        height:80,
        backgroundColor:"#fff",
        flexDirection:'row',
        paddingLeft:20
    },
    math_detail:{
        width:width,
        backgroundColor:'#fff',
        marginTop:10,
        paddingTop:15,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:20,
        height:200
    },

});
