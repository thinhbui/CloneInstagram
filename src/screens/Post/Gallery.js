import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, CameraRoll, Image, ScrollView, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';

const widthWindow = Dimensions.get('window').width;
export default class Gallery extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            photoSelected: {},
            index: null,
            pickPhotos: false,
            photosSelected: [],
            number: 1,
        };
        this.image = [];
    }
    componentWillMount() {
        this.getPhotos();
    }

    onPress = (index, photo) => {
        this.setState({
            index,
            photoSelected: photo,
        });

        if (this.state.pickPhotos) {
            const { photosSelected, photos } = this.state;
            if (photos[index].number === undefined || photos[index].number === 0) {
                // console.log('if', photos[index].number);
                photosSelected.push(photo);
                photos[index].number = this.state.number;
                this.setState({
                    photos: [...photos],
                    photosSelected: [...photosSelected],
                    number: this.state.number + 1,
                });
            } else {
                console.log('else', photo);
                photosSelected.splice(photo);
                photos.forEach((item) => {
                    if (item.number !== undefined && item.number !== 0 && item.number > photos[index].number) {
                        item.number--;
                    }
                });
                photos[index].number = 0;
                this.setState({
                    photos: [...photos],
                    photosSelected: [...photosSelected],
                    number: this.state.number - 1,
                });
            }
        }
    }
    getPhotos = () => {

        CameraRoll.getPhotos({
            first: 20,
            assetType: 'All'
        })
            .then(r => {
                r.edges.forEach(() => {
                    this.image.push(0);
                });
                this.setState({
                    photos: r.edges,
                    photoSelected: r.edges[0].node.image,
                    image: [...this.image]
                });
            });
    }
    renderCurrentImage() {
        return (
            <View style={{ width: widthWindow, height: widthWindow, justifyContent: 'flex-end' }}>
                <Image
                    source={{ uri: this.state.photoSelected.uri }}
                    style={{ width: widthWindow, height: widthWindow, zIndex: -1 }}
                />

                <View style={{ width: widthWindow, position: 'absolute', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={[styles.icon, { backgroundColor: this.state.pickPhotos ? 'steelblue' : 'black', opacity: this.state.pickPhotos ? 1 : 0.5, }]}
                        onPress={() => this.setState({ pickPhotos: !this.state.pickPhotos, number: 1 })}
                    >
                        <Icon name='square-o' color='#fff' size={20} />
                    </TouchableOpacity>
                </View>

            </View >
        );
    }
    renderListImage = () => (
        <ScrollView >
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {
                    this.state.photos.map((p, i) => (
                        <View key={i}>
                            {
                                this.state.pickPhotos &&
                                <View style={{ position: 'absolute', alignItems: 'flex-end', width: '100%' }} >
                                    {
                                        <Text style={styles.numberImage}>
                                            {
                                                (this.state.photos[i].number === 0 || this.state.photos[i].number === undefined) ?
                                                    '' : this.state.photos[i].number
                                            }
                                        </Text>
                                    }
                                </View>
                            }
                            <TouchableOpacity
                                style={{ opacity: ((this.state.pickPhotos === false && i === this.state.index) || (this.state.photos[i].number !== 0 && this.state.photos[i].number !== undefined)) ? 0.8 : 1, zIndex: -1 }}
                                key={i}
                                underlayColor='transparent'
                                onPress={() => this.onPress(i, p.node.image)}
                            >
                                <Image
                                    style={{
                                        width: widthWindow / 3,
                                        height: widthWindow / 3
                                    }}
                                    source={{ uri: p.node.image.uri }}
                                />
                            </TouchableOpacity>
                        </View>

                    ))
                }
            </View>
        </ScrollView>
    )
    render() {
        return (
            <View style={styles.containter}>
                <Header
                    text='Gallery'
                    leftButton={
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home'); }}>
                            <Text style={{ color: 'black', marginLeft: 10, fontSize: 14 }}>Cancel</Text>
                        </TouchableOpacity>
                    }
                    rightButton={
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('NodePost', { photos: this.state.pickPhotos ? this.state.photosSelected : this.state.photoSelected }); }}>
                            <Text style={{ color: 'steelblue', fontWeight: 'bold', marginRight: 10, fontSize: 16 }}>Next</Text>
                        </TouchableOpacity>
                    }
                />
                {this.renderCurrentImage()}
                {this.renderListImage()}

            </View>
        );
    }
}
const styles = StyleSheet.create({
    containter: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        margin: 10
    },
    numberImage: {
        color: 'black',
        opacity: 0.5,
        backgroundColor: 'white',
        margin: 10,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center'
    }
});
