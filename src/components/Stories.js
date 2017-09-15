import React from 'react';
import {
    View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, FlatList
} from 'react-native';

const rows = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
];
const StoriesItem = () => (
    <View style={{ margin: 10, width: 0.2 * Dimensions.get('window').width, height: '100%' }}>
        <Image
            source={{ uri: 'https://s-media-cache-ak0.pinimg.com/originals/36/2f/a4/362fa45b94a05fe1bdb02f98008b27eb.jpg' }}
            style={{ width: '100%', height: 0.2 * Dimensions.get('window').width, borderRadius: 0.1 * Dimensions.get('window').width }}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text> abc</Text>
        </View>
    </View>
);

const Stories = () => (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ flex: 5, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Stories</Text>
            <TouchableOpacity style={{ flex: 1 }}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>See all</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
            <FlatList
                data={rows}
                renderItem={() => (
                    <StoriesItem />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={({ id }) => id}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.2,
        borderColor: 'gray',
        borderWidth: 0.3,
        backgroundColor: '#fff'
    }
});
export default Stories;
