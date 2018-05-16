import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,ScrollView
} from 'react-native';

import {Button,List, ListItem} from 'react-native-elements'
import utils from '../common/utils'
import StarRating from 'react-native-star-rating';
import ViewLoading from '../ViewLoading'

const teacherUrl = utils.url+'CollegeManager/api/teacher/teacherInfo';
const width = utils.size.width;
// const my=[
//     {
//         name: 'Jimmy',
//         subtitle: '15123456789'
//     },
// ];
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: '教师详情',
    });

    constructor(props) {
        super(props);
        this.state={
            data:null,
            loading:false
        }
    }

    _teacherInfo(data){
        this.setState({
            data:data,
            loading:true
        });
        console.log(this.state.data)
    }

    componentDidMount() {
        const { teacherId } = this.props.navigation.state.params;
        const option={
            teacherId:teacherId
        }
            utils.post(
                teacherUrl,
                utils.toQueryString(option),
                this._teacherInfo.bind(this)
        );

    }
    render() {
        const my = this.state.loading?[
            {
                name:this.state.data.data.name,
                avatar_url:this.state.data.data.profilePhoto,
                subtitle:this.state.data.data.place
            }
        ]:[];

        return (
            <ScrollView style={{paddingBottom:20}}>
                { /* other code from before here */ }
                {
                    this.state.loading?

                        (<View>
                            <Image
                                resizeMode={'contain'}
                                style={styles.img}
                                source={{uri:this.state.data.data.profilePhoto}}
                            />
                            <List containerStyle={{width:width,height:60,marginTop: 10, borderTopWidth: 0, borderBottomWidth: 0, borderBottomColor: '#cbd2d9',justifyContent:'center'}}>
                                {
                                    my.map((l, i) => (
                                        <ListItem
                                            title={l.name}
                                            subtitle={l.subtitle}
                                            containerStyle={{justifyContent:'center', borderBottomWidth: 0,}}
                                            key={i}
                                            hideChevron={true}
                                        />
                                    ))
                                }
                                <View style={{width:100,position:'absolute',right:30,top:35,flexDirection:'row'}}>
                                    <StarRating
                                        starSize={12}
                                        emptyStarColor={'black'}
                                        iconSet={'FontAwesome'}
                                        emptyStar={'star-o'}
                                        fullStarColor={'#e60012'}
                                        disabled={true}
                                        maxStars={5}
                                        rating={this.state.data.data.score>3?this.state.data.data.score:3}
                                        starStyle={{marginLeft:5}}
                                    />
                                    <Text style={{fontSize:utils.style.FONT_SIZE_SMALLER,marginLeft:10}}>{this.state.data.data.score>3?this.state.data.data.score:3}分</Text>
                                </View>

                            </List>
                            <View style={styles.math_detail}>
                                <Text style={styles.title}>[ 教师详情 ]</Text>
                                <Text style={{lineHeight:30, paddingLeft:15,}}>
                                    {this.state.data.data.description}
                                </Text>
                            </View>
                        </View>):<ViewLoading/>
                }


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
        width:width,
        backgroundColor:'#fff',
        marginTop:10,
        paddingTop:15,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:20,
    },
    title:{
        paddingLeft:15,
        fontSize:utils.style.FONT_SIZE_TITLE,
        fontWeight:'bold',
        paddingTop:5,
        paddingBottom:5
    },
});
