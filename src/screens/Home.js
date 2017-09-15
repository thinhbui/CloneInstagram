import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';


import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import PostItem from '../components/PostItem';
import Suggestion from '../components/Suggestion';
import Stories from '../components/Stories';

const mapStateToProps = (state) => ({
    rows: state.rows
});

class Home extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name="home" size={20} />
        ),
        header: null,
    };
    state = {
        rows: []
    }
    componentWillMount() {
    }
    componentWillReceiveProps(nexProps) {
        console.log('nextProps', nexProps);
        this.setState({ rows: nexProps.rows });
    }
    componentDidUpdate() {
    }

    // getNewPost = () => {
    //     const { rows } = this.props;
    //     console.log('getNewPost', this.props.navigation.state.params);
    //     if (this.props.navigation.state.params !== undefined) {
    //         const { post } = this.props.navigation.state.params;
    //         console.log(post);
    //         post.id = rows.length;
    //         rows.push(this.props.navigation.state.params.post);
    //     }
    // }
    renderItem = (data) => {
        const { rows } = this.props;
        if (data.index === rows.length - 1) {
            return (
                <View>
                    <Stories />
                    <PostItem navigation={this.props.navigation} number={data.index} post={data.item} />
                    <Suggestion />
                </View>
            );
        }
        return (
            <PostItem navigation={this.props.navigation} number={data.index} post={data.item} />
        );
    }


    render() {
        const { rows } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    text='Instagram'
                    leftButton={
                        <Icon.Button name="camera" color="black" backgroundColor="transparent" />
                    }
                    rightButton={
                        <Icon.Button name="comment-o" color="black" backgroundColor="transparent" />
                    }
                />
                <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, width: '100%' }}>
                    <FlatList
                        data={rows}
                        //  inverted
                        scrollsToTop={false}
                        renderItem={this.renderItem}
                        keyExtractor={({ id }) => id}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default connect(mapStateToProps)(Home);
