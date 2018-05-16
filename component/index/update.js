import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,

} from 'react-native';
import utils from "../common/utils";
import {toastShort} from "../toast";
import {Button} from 'react-native-elements'

const width=utils.size.width
export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: '版本更新',
    });

    render() {
        return (
            <View style={styles.container}>
                { /* other code from before here */ }
                <Image
                    resizeMode={'contain'}
                    source={require('../img/logo.png')}
                    style={{width:100,height:80}}
                />

                <Image
                    resizeMode={'contain'}
                    source={require('../img/in.png')}
                    style={{width:80,height:60}}
                />
                <Button
                    small
                    containerViewStyle={{marginTop:10,height:45}}
                    // icon={{name: 'envira', type: 'font-awesome'}}
                    buttonStyle={{width:width*0.9,borderRadius:8,backgroundColor:'#008ccf',marginTop:100}}
                    title='检查更新'
                    onPress={() =>toastShort('已是最新版本')}
                />
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container:{
        width:width,
        paddingTop:80,
        alignItems:'center',
        marginBottom:10
    },
});