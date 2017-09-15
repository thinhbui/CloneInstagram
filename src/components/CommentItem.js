import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const AnimatedIcon = Animated.createAnimatedComponent(Icon);
export class CommentItem extends Component {
    state = {
        isLike: true,
        isDelete: false
    }
    onLike = () => {
        this.setState({ isLike: !this.state.isLike });
        this.spring();
    }
    handleScroll = (event) => {
        const x = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
        if (x === 1) { this.setState({ isDelete: true }); }
    }
    spring() {
        this.springValue.setValue(0.9);
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 1,
            }
        ).start();
    }
    springValue = new Animated.Value(1);
    render() {
        return (
            <View>
                {!this.state.isDelete ?
                    <ScrollView
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={this.handleScroll}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: Dimensions.get('window').width }}>
                            <Icon name="user-circle" size={30} />
                            <View
                                style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: 'gray' }}
                            >
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>  9gag
                                    <Text style={{ fontWeight: 'normal' }}>
                                                {this.props.text ? this.props.text : 'omgomgomgomgomg @viviannnwong'}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 12 }}>  1 giờ </Text>
                                        {!this.state.isLike && <Text style={{ fontSize: 12 }}>  1 lượt thích </Text>}
                                        <Text style={{ fontSize: 12 }}>  Trả lời </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.onLike}>
                                    {this.state.isLike ?
                                        <AnimatedIcon
                                            name='heart-o'
                                            color='black'
                                            style={{ transform: [{ scale: this.springValue }] }}
                                        />
                                        :
                                        <AnimatedIcon
                                            name='heart'
                                            color='red'
                                            style={{ transform: [{ scale: this.springValue }] }}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: Dimensions.get('window').width, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='trash-o' color='white' size={30} />
                        </View>
                    </ScrollView>
                    :
                    <View />
                }

            </View>
        );
    }
}

export default CommentItem;
