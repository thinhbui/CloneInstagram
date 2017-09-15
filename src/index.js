import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { reducer } from './reducer/reducer';


import Home from './screens/Home';
import Notification from './screens/Notification';
import Search from './screens/Search';
import TabPost from './screens/Post/Index';
import Profile from './screens/Profile';
import Comments from './screens/Comment';


const Tab = TabNavigator({
    Home: {
        screen: Home,
    },
    Search: {
        screen: Search,
    },
    Post: {
        screen: TabPost,
    },
    Notification: {
        screen: Notification,
    },
    Profile: {
        screen: Profile,
    },
},
    {
        initialRouteName: 'Home',
        swipeEnabled: false,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#black',
            showIcon: true,
            showLabel: false,
            indicatorStyle: { backgroundColor: '#fff' },
            style: {
                backgroundColor: '#fff',
            },
        },
    });

const Index = StackNavigator({
    Root: {
        screen: Tab,
    },
    CommentScreen: {
        screen: Comments,
        path: 'comment'
    }
},
    {
        mode: 'modal',
    }
);
const store = compose(autoRehydrate())(createStore)(reducer);

class App extends Component {
    componentWillMount() {
        persistStore(store, { storage: AsyncStorage }, () => {
            console.log('restored');
        });
    }
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        );
    }
}

export default App;
