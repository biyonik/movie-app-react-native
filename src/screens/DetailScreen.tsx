import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Get, IError} from '../../http/axios';
import {MovieDetail} from '../models/movie.detail.model';
import Error from '../components/Error';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import VideoPlayer from 'react-native-video-controls';

const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  image: {
    height: height / 1.8,
    width: '100%',
    resizeMode: 'stretch',
  },
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  genre: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#f44336',
    color: 'white',
  },
  overview: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  releaseDate: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  playButton: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    position: 'absolute',
    top: -25,
    right: 25,
    backgroundColor: '#f44336',
    elevation: 15,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

interface IDetailScreenProps {
  navigation: any;
  route: any;
}

const placeholderImage = require('../../assets/images/placeholder.png');

export default function DetailScreen({navigation, route}: IDetailScreenProps) {
  const {id} = route.params;
  const [movie, setMovie] = useState<MovieDetail>({} as MovieDetail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined as unknown as IError);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Get<MovieDetail>(`/movie/${id}`, setMovie, setError, setLoading);
  }, [id]);

  return (
    <>
      {!loading && !error ? (
        <View>
          <ScrollView>
            <Image
              source={
                movie.poster_path
                  ? {uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  : placeholderImage
              }
              style={styles.image}
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton setModalVisible={setModalVisible} />
              </View>
              <Text style={styles.title}>{movie.original_title}</Text>
              {movie.genres && movie.genres.length > 0 ? (
                <View style={styles.genresContainer}>
                  {movie.genres.map(genre => (
                    <Text key={genre.id} style={styles.genre}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              ) : null}
              <StarRating
                maxStars={5}
                fullStarColor="gold"
                halfStarColor="gold"
                disabled={true}
                starStyle={{margin: 5, padding: 5}}
                animation="pulse"
                starSize={20}
                rating={movie.vote_average / 2}
              />
              <Text style={styles.overview}>{movie.overview}</Text>
              <Text style={styles.releaseDate}>{`Release date: ${dateFormat(
                movie.release_date,
                'dd/mm/yyyy',
              )}`}</Text>
            </View>
          </ScrollView>
          <Modal visible={modalVisible} animationType='slide'>
            <View style={styles.videoModal}>
                <VideoPlayer
                    onBack={() => setModalVisible(false)}
                    onEnd={() => setModalVisible(false)}
                    source={{uri: `https://vjs.zencdn.net/v/oceans.mp4`}}
                    disableVolume={true}
                    navigator={navigation}
                    toggleResizeModeOnFullscreen={true}
                    fullScreenOrientation={'all'}
                />
            </View>
          </Modal>
        </View>
      ) : error ? (
        <Error error={error as IError} />
      ) : (
        <ActivityIndicator size={'large'} color={'red'} />
      )}
    </>
  );
}
