import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
// import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../components/Header';

const rows = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
];

class Search extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name="search" size={20} />
        ),
    };
    renderItem() {
        return (
            <View />
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, width: '100%' }}>
                    {/* <Tag style={{ flex: 1 }} /> */}
                    <FlatList
                        data={rows}
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

export default Search;
