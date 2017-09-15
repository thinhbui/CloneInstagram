import React, { Component } from 'react';
import {
    StyleSheet, View, FlatList, Text, TextInput, Dimensions, Animated, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentItems from '../components/CommentItem';

const rows = [
    { key: 0 },
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
    { key: 6 },
    { key: 7 },
    { key: 8 },
    { key: 9 },
];

class Comments extends Component {
    static navigationOptions = {
        title: 'Comments',
    };
    constructor(props) {
        super(props);
        this.state = {
            isLike: false,
            fadeAnim: new Animated.Value(0),
            numberCmt: 5,
            text: '',
            isRefresh: false
        };
    }
    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 1000
            }
        );
    }
    onSubmitTextInput = () => {
        rows.push({ key: rows.length, like: false, text: this.state.text });
        this.setState({ text: '', isRefresh: true, });
        this.setState({
            isRefresh: false,
        });
    }
    loadMoreComment = () => {
        this.setState({
            numberCmt: this.state.numberCmt + 5,
            isRefresh: true,
        });
        this.setState({
            isRefresh: false,
        });
    }
    reloadFlatList() {
        this.setState({
            isRefresh: true,
        });
        this.setState({
            isRefresh: false,
        });
    }
    renderItem = (data) => {
        if (data.index === 0) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginBottom: 0 }}>
                    <Icon name="user-circle" size={30} />
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', }}>
                        <Text style={styles.boldText}>  9gag
                            <Text style={{ fontWeight: 'normal' }}>
                                {status}
                            </Text>
                        </Text>
                    </View>
                </View >
            );
        }
        if (rows.length - data.index === this.state.numberCmt) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="heart-o" size={30} color='white' style={{ margin: 5 }} />
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center', borderBottomColor: 'gray', borderBottomWidth: 0.3, justifyContent: 'center' }}
                        onPress={this.loadMoreComment}
                    >
                        <Text>
                            Tải thêm bình luận
                    </Text>
                    </TouchableOpacity>
                </View>

            );
        }
        if (rows.length - data.index < this.state.numberCmt) {
            return (
                <CommentItems text={data.item.text} />
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, width: '100%' }}>
                    <FlatList
                        data={rows}
                        renderItem={this.renderItem}
                        keyExtractor={({ key }) => key}
                        refreshing={this.state.isRefresh}
                        onRefresh={() => { }}

                    />
                </View>
                <Animated.View style={{ flexDirection: 'row' }}>
                    <TextInput
                        autoFocus
                        style={{ flex: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        onSubmitEditing={this.onSubmitTextInput}
                    />
                    <TouchableOpacity style={{ backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }} onPress={this.onSubmitTextInput}>
                        <Text style={{ color: 'white' }}>Send</Text>
                    </TouchableOpacity>
                </Animated.View>

            </View>
        );
    }
}

const status = '  GOT Theme played on a 12-string guitar. 🎸@acoustictrench with @maple.the.pup';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    boldText: {
        fontWeight: 'bold',
        color: 'black',
    }
});

export default Comments;
