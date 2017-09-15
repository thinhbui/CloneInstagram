import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { actions } from '../actions/actions';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
class PostItem extends Component {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(1);
        this.state = {
            isLike: false,
            commnent: false,
            totalPage: 3,
            currentpage: 1
        };
    }
    componentWillMount() {
        this.setState({
            totalPage: Array.isArray(this.props.post.image) ? this.props.post.image.length : 1,
        });
    }
    componentDidUpdate() {
        this.spring();
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
    handleScroll = (event = Object) => {
        this.setState({
            currentpage: Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width) + 1,
            totalPage: Math.round(event.nativeEvent.contentSize.width / Dimensions.get('window').width),
        });
    }
    render() {
        const { post } = this.props;
        console.log(this.props);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="user-circle" color="black" size={30} />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={styles.boldText}>{this.props.user}9gag</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        style={{ flexDirection: 'row', marginRight: 15 }}
                        onPress={() => { this.props.dispatch(actions.delete(this.props.post)); }}
                    >
                        <Icon style={{}} name="ellipsis-h" color="black" size={20} />

                    </TouchableOpacity>
                </View >
                <View style={styles.image}>
                    {Array.isArray(post.image) &&
                        < View style={{ width: Dimensions.get('window').width, position: 'absolute', alignItems: 'flex-end' }}>
                            <Text style={{ color: 'black', opacity: 0.3, backgroundColor: 'white', margin: 10, borderRadius: 5 }}>
                                {this.state.currentpage}/{this.state.totalPage}
                            </Text>
                        </View>
                    }

                    <ScrollView
                        pagingEnabled
                        horizontal
                        style={{ backgroundColor: 'gray', zIndex: -1 }}
                        onScroll={this.handleScroll}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            Array.isArray(post.image) ?
                                post.image.map((item, i) => (
                                    <View key={i} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }}>
                                        <Image
                                            source={{ uri: item.uri ? item.uri : 'https://images-na.ssl-images-amazon.com/images/I/41j7-7yboXL.jpg' }}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </View>))
                                :
                                <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }}>
                                    <Image
                                        source={{ uri: post.image !== undefined ? post.image.uri : 'https://images-na.ssl-images-amazon.com/images/I/41j7-7yboXL.jpg' }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                        }
                    </ScrollView>
                </View >
                <View style={styles.like}>
                    {
                        this.state.isLike ?
                            <AnimatedIcon
                                style={{ margin: 5, transform: [{ scale: this.springValue }] }}
                                name='heart'
                                color='red'
                                size={20}
                                onPress={() => this.setState({ isLike: !this.state.isLike })}
                            />
                            :
                            <AnimatedIcon
                                style={{ margin: 5, transform: [{ scale: this.springValue }] }}
                                name='heart-o'
                                color='black'
                                size={20}
                                onPress={() => this.setState({ isLike: !this.state.isLike })}
                            />
                    }
                    <Icon
                        style={{ margin: 5 }}
                        name="comment-o"
                        color="black"
                        size={20}
                        backgroundColor="transparent"
                        onPress={() => this.props.navigation.navigate('CommentScreen')}
                    />
                    <View style={{ width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', zIndex: -1, position: 'absolute' }}>
                        {Array.isArray(post.image) ?
                            post.image.map((item, index) => {
                                return (
                                    < Icon name='circle' color={index + 1 === this.state.currentpage ? '#8b8d8e' : '#cfd2d3'} size={6} key={index} style={{ margin: 1 }} />
                                );
                            })
                            : <View />
                        }

                    </View>
                </View>
                <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
                    <Text style={styles.boldText}>1234567 lượt thích</Text>
                </View>
                <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
                    <Text style={styles.boldText} numberOfLines={2}>
                        9gag
                        <Text style={{ fontWeight: 'normal', marginLeft: 10 }}>
                            {post.text === undefined ? status : post.text}
                        </Text>
                    </Text>

                </View >
            </View >
        );
    }
}


const status = '  GOT Theme played on a 12-string guitar. 🎸@acoustictrench with @maple.the.pup';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //width: '100%',
        backgroundColor: '#fff'
    },
    header: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: 50
    },
    image: {
        backgroundColor: 'black',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    },
    like: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40
    },
    boldText: { fontWeight: 'bold', color: 'black' },

});
export default connect()(PostItem);
