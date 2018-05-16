import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class stars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    componentDidMount() {
        console.log(1)
    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StarRating
                    emptyStarColor={'green'}
                    iconSet={'FontAwesome'}
                    emptyStar={'star-o'}
                    fullStarColor={'red'}
                    disabled={true}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
            </View>
        );
    }
}