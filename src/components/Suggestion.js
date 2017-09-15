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
const SuggestionItem = () => (
    <View style={{ backgroundColor: '#fff', marginRight: 7, borderWidth: 0.5, borderColor: 'gray', width: (0.4 * Dimensions.get('window').width), height: '100%' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={{ uri: 'https://s-media-cache-ak0.pinimg.com/originals/36/2f/a4/362fa45b94a05fe1bdb02f98008b27eb.jpg' }}
                style={{ width: '50%', height: (0.2 * Dimensions.get('window').width), borderRadius: (0.1 * Dimensions.get('window').width) }}
            />
        </View>
        <View style={{ flex: 1 }}>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}> Vô Diện</Text>
                <Text style={{ color: 'black', textAlign: 'center' }}> You're friend on Facebook</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', height: '80%', width: '90%', backgroundColor: 'rgb(91,173,247)', borderRadius: 5 }}
                >
                    <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}> Follow</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const Suggestion = () => (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ flex: 5, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Suggestions for You</Text>
            <TouchableOpacity style={{ flex: 1 }}>
                <Text style={{ color: 'rgb(91,173,247)', fontWeight: 'bold' }}>See all</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1, margin: 10, }}>
            <FlatList
                data={rows}
                renderItem={() => (
                    <SuggestionItem />
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
        height: Dimensions.get('window').height * 0.4,
        marginTop: 10
    }
});
export default Suggestion;
