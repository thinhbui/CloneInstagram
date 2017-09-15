import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, Modal, Switch
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from '../../actions/actions';
import { NavigationAction } from 'react-navigation';
// import { connect } from 'react-redux';

import Header from '../../components/Header';

const widthWindow = Dimensions.get('window').width;
const mapStateToProps = (state) => ({
    rows: state.rows
});
const Item = (props) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#fff', borderWidth: 0.3, borderColor: 'gray', height: 40, alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Icon name={props.icon} style={{ margin: 5 }} size={20} /></View>
            <View style={{ flex: 7 }}><Text style={{ color: 'black' }}>{props.text} </Text></View>
            <View style={{ flex: 0.5 }}><Icon name='angle-right' style={{ margin: 5 }} size={20} /></View>
        </TouchableOpacity>
    );
}
export class NodePost extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            isNode: false,
            shareFacebook: false,
            shareTwitter: false,
            text: ''
        };
        this.image = [];
    }
    sharePost(photos) {
        const post = {
            image: photos,
        };
        this.addPost(post);
        this.props.navigation.navigate('Home');
        // this.props.navigation.dispatch(
        //     NavigationAction.reset({
        //         index: 0,
        //         actions: [
        //             NavigationAction.navigate({ routeName: 'Gallery' })
        //         ]
        //     })
        // );
    }
    addPost = (post) => {
        post.text = this.state.text;
        post.id = this.state.text + post.image.uri;
        const { dispatch } = this.props;
        console.log(post);
        dispatch(actions.add(post));
    }
    render() {
        const { photos } = this.props.navigation.state.params;
        return (
            <View style={styles.containter}>
                <Header
                    text='New Post'
                    leftButton={
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { this.props.navigation.navigate('Gallery', { photos: this.state.photosSelected }); }}>
                            <Icon name='chevron-left' size={15} />
                        </TouchableOpacity>
                    }
                    rightButton={
                        <TouchableOpacity onPress={() => this.sharePost(photos)}>
                            <Text style={{ color: 'steelblue', fontWeight: 'bold', marginRight: 10, fontSize: 16 }}>Share</Text>
                        </TouchableOpacity>
                    }
                />
                <View style={styles.node_post}>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={{ uri: Array.isArray(photos) ? photos[0].uri : photos.uri }}
                            style={{ zIndex: -1, margin: 5, height: (Dimensions.get('window').height / 5) - 10, width: (Dimensions.get('window').height / 5) - 10 }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                            }}
                        >
                            <Icon name='square' color='#fff' style={{ margin: 20 }} />
                        </View>
                    </View>
                    <View style={{ flex: 2 }} onPress={() => this.setState({ isNode: true })} >
                        <TextInput
                            //  multiline
                            //   placeholder='write something...'
                            //    onFocus={() => this.setState({ isNode: true })}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                </View>
                <View style={{ height: 20, width: '100%' }} />
                <Item icon='tags' text='Tag other people' />
                <View style={{ height: 20, width: '100%' }} />
                <Item icon='map-marker' text='Add address' />
                <View style={{ height: 20, width: '100%' }} />
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#fff', borderWidth: 0.3, borderColor: 'gray', height: 40, alignItems: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Icon name='facebook-square' style={{ margin: 5 }} size={20} /></View>
                    <View style={{ flex: 7 }}><Text style={{ color: 'black' }}>Facebook </Text></View>
                    <Switch
                        onValueChange={() => this.setState({ shareFacebook: !this.state.shareFacebook })}
                        value={this.state.shareFacebook}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#fff', borderWidth: 0.3, borderColor: 'gray', height: 40, alignItems: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Icon name='twitter-square' style={{ margin: 5 }} size={20} /></View>
                    <View style={{ flex: 7 }}><Text style={{ color: 'black' }}>Twitter </Text></View>
                    <Switch
                        onValueChange={() => this.setState({ shareTwitter: !this.state.shareTwitter })}
                        value={this.state.shareTwitter}
                    />
                </TouchableOpacity>
                <Modal
                    visible={this.state.isNode}
                    transparent
                    style={styles.modal}
                    onRequestClose={() => this.setState({ isNode: false })}
                >
                    <Header
                        text='Node'
                        rightButton={
                            <TouchableOpacity onPress={() => this.setState({ isNode: false })} >
                                <Text style={{ color: 'steelblue', fontWeight: 'bold', marginRight: 10, fontSize: 16 }}>OK</Text>
                            </TouchableOpacity>
                        }
                    />
                    <View style={styles.node_post}>
                        <View style={{ flex: 1 }}>
                            <Image
                                source={{ uri: this.props.navigation.state.params.photos.uri }}
                                style={{ margin: 5, height: (Dimensions.get('window').height / 5) - 10, width: (Dimensions.get('window').height / 5) - 10 }}
                            />

                        </View>
                        <View style={{ flex: 2 }} >
                            <TextInput
                                multiline
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'black', opacity: 0.5 }} onPress={() => { this.setState({ isNode: false }) }} />
                </Modal>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    containter: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    node_post: {
        flexDirection: 'row',
        height: Dimensions.get('window').height / 5,
        width: widthWindow,
        backgroundColor: '#fff'
    },
    modal: {
        flex: 1,
        //   justifyContent: 'flex-start',
        backgroundColor: 'black'
    }
});

export default connect(mapStateToProps)(NodePost);
