import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

export default class login extends Component {
    constructor(porps) {
        super(porps);
        this.state = {
            user:'15307104100',
            pass:'123456',
        }
    }

    componentDidMount(){

    }


    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator
                    size={'small'}
                >
                </ActivityIndicator>
            </View>
        )
    }


}

