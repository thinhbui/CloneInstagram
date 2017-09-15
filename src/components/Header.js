import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import camera from '../images/photo-camera.png';

//, Platform, Dimensions
const Header = (props) => 
    // console.log(props);
     (
        <View style={styles.container}>
            {
                props.leftButton ?
                    props.leftButton :
                    <View />
            }
            <View
                style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center'
                }}
            >
                <Text style={{ fontWeight: 'bold', }}>{props.text}</Text>
            </View>
            {
                props.rightButton ?
                    props.rightButton :
                    <View/>
            }

        </View >
    );

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        backgroundColor: '#fff',
        height: 50,
    },
});

export default Header;
