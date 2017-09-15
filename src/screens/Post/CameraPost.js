import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, Modal } from 'react-native';
import Camera from 'react-native-camera';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class CameraPost extends Component {
    state = {
        visibleModal: false,

    }
    takePicture = () => {
        const options = {};
        //options.location = ...
        this.camera.capture({ metadata: options })
            .then((data) => {
                data.uri = data.path;
                this.props.navigation.navigate('NodePost', { photos: data });
                console.log(data);
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                >
                    <Icon name='camera' color='#fff' style={styles.capture} onPress={this.takePicture} />
                </Camera>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

