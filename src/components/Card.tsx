import React from "react";
import { PropsWithChildren } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        height: 150,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    movie_name: {
        position: 'absolute',
        width: 100,
        textAlign: 'center',
        top: 10
    }
});


interface ICardProps extends PropsWithChildren<any> {
    item: any;
    navigation: any;
}

const placeholderImage = require('../../assets/images/placeholder.png');

class Card extends React.PureComponent<ICardProps> {
    render() {
        const {item, navigation} = this.props;

        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={() => navigation.navigate('Details', {id: item.id})}
            >
                <Image source={
                    item.poster_path 
                    ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    : placeholderImage
                } 
                    style={styles.image}
                />
                {!item.poster_path ? (
                    <Text style={styles.movie_name}>{item.title}</Text>
                ) : null}
            </TouchableOpacity>
        )
    }
}


export default Card;