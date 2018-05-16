import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import utils from "../component/common/utils";
import Global from "../component/common/Global";
import ViewLoading from '../component/ViewLoading'
import {toastShort} from '../component/toast';

const scheduleUrl=utils.url+'CollegeManager/api/course/courseTable';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null,
            loading:false,
        }
    }

    _itemRender=(val)=>{
        console.log(val)
       this.props.navigation.navigate('ClassType',{ type: val.title,courseId:val.courseId })
    };


    _scheduleUrlCallback(data){
        if(data.code===0){
            const wapper=[[],[],[],[],[],[],[],[]]
            for (let i in data.data) {
                for (let j in data.data[i].courseList) {
                    for (let k =0,len=9;k<len;k++){
                        if (data.data[i].courseList[j].turnNumber === k+1) {
                            wapper[k].push({
                                title: data.data[i].courseList[j].title,
                                courseId: data.data[i].courseList[j].id
                            })
                        }
                    }

                }
            }
            this.setState({
                data:wapper,
                loading:true
            });
        }else {
            toastShort('请求失败')
        }
    }

    componentDidMount() {

        const  userId  = Global.userId;
        const option={
            userId:userId
        };
        utils.post(
            scheduleUrl,
            utils.toQueryString(option),
            this._scheduleUrlCallback.bind(this)
        );
    }


    render() {
        const ele = (val) => (

            <TouchableOpacity
                onPress={val.title===''?null:() => this._itemRender(val)}
            >
                <View >
                    <Text style={{textAlign:'center',justifyContent:'center',fontSize:utils.style.FONT_SIZE_SMALL}}>{val.title}</Text>
                </View>
            </TouchableOpacity>
        );

        const month=new Date().getMonth()+1;
        const tableHead = [month+'月', '星期一', '星期二', '星期三','星期四', '星期五'];
        const tableTitle = ['第一节', '第二节','第三节', '第四节'];
        const AMtableData = this.state.loading?this.state.data.slice(0,4).map(x=>x.map(y=>ele(y))):[];
        const tableTitle1 = ['第五节', '第六节','第七节','第八节'];
        const PMtableData = this.state.loading?this.state.data.slice(4,9).map(x=>x.map(y=>ele(y))):[];

        return (
            this.state.loading?
            <View style={styles.container}>
                <View style={styles.card}>
                    <Table
                        style={{backgroundColor:'#fff'}}
                        borderStyle={{borderColor:'#C7C7C7'}}
                    >
                        <Row data={tableHead} flexArr={[1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                        <TableWrapper style={{flexDirection: 'row'}}>
                            <Col data={tableTitle} style={styles.title} heightArr={[55,55]} textStyle={styles.text}/>
                            <Rows
                                data={AMtableData}
                                flexArr={[1, 1, 1, 1, 1,]}
                                style={styles.row}
                            />
                        </TableWrapper>


                    </Table>
                </View>

                <View style={styles.card}>
                    <Table
                        style={{backgroundColor:'#fff'}}
                        borderStyle={{borderColor:'#C7C7C7'}}>
                        <TableWrapper style={{flexDirection: 'row',}}>
                            <Col data={tableTitle1} style={styles.title} heightArr={[55,55]} textStyle={styles.text}/>
                            <Rows data={PMtableData} flexArr={[1, 1, 1, 1, 1,]} style={styles.row}/>
                        </TableWrapper>
                    </Table>
                </View>

            </View>:<ViewLoading/>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingBottom:15,
        paddingRight:15,
        paddingLeft:15,
        marginTop:20
    },
    card:{
        marginTop:5,
        backgroundColor: 'black',
        elevation: 1,
        shadowOffset: {width: 1, height: 1},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 1
    },
    head: {
        height: 50,
        backgroundColor: '#F0F0F0',

    },
    title: {
        flex: 1,
        backgroundColor: '#F0F0F0',

    },
    row: {
        height: 55 ,

    },
    text: { textAlign: 'center' }
})