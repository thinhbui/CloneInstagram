import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Gallery from './Gallery';
import NodePost from './NodePost';
import CameraPost from './CameraPost';

const Video = () => (
    <View style={{ backgroundColor: 'red' }}>
        <Text>Video</Text>
    </View>
);
const StackGallery = StackNavigator({
    Gallery: {
        screen: Gallery,
        // path: '/',
    },
    NodePost: {
        screen: NodePost,
        path: 'node/:photos'
    }
}, {
        initialRouteName: 'Gallery'
    });
const CameraStack = StackNavigator({
    Camera: {
        screen: CameraPost,
        // path: '/',
    },
    NodePost: {
        screen: NodePost,
        path: 'node/:photos'
    }
}, {});
const TabPost = TabNavigator({
    Gallery: {
        screen: StackGallery,
        navigationOptions: {
            header: null
        },
    },
    Camera: {
        screen: CameraStack,
        navigationOptions: {
            header: null
        },
    },
    Video: {
        screen: Video
    }
},
    {
        initialRouteName: 'Gallery',
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
            indicatorStyle: { backgroundColor: '#fff' },
            style: {
                backgroundColor: '#fff',
            }
        },
        tabBarPosition: 'bottom',
        animationEnabled: true,
    }

);

TabPost.navigationOptions = {
    tabBarIcon: () => (
        <Icon name="plus-square-o" size={20} />
    ),
    tabBarVisible: false,
    headerTitleStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    // headerBackTitle: 'Hủy'
};
export default TabPost;
