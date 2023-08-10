import React from 'react';
import {
    SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {IPopularMovieResult} from '../models/popularmovie.result.model';
import {Get, IError} from '../../http/axios';
import {IUpcomingMoviesResult} from '../models/upcomingmovies.result';
import Carousel from 'react-native-snap-carousel';
import List from '../components/List';
import {IPopularTvResult} from '../models/populartv.result.model';
import Error from '../components/Error';

const dimension = Dimensions.get('screen');

const styles = StyleSheet.create({
container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
    gap: 0,
    padding: 0,
    margin: 0,
    width: dimension.width,
    height: dimension.height / 1.5,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: dimension.width,
    height: dimension.height / 1.5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    objectFit: 'cover',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const _renderItem = ({item, index}: {item: string; index: any}) => {
  return (
    <Image
      key={`${item}_${index}`}
      source={{uri: item}}
      style={styles.slideImage}
    />
  );
};

const _keyExtractor = (item: string) => item + Math.random() * 1000;

let _carousel: any = null;

export default function HomeScreen({navigation}: {navigation: any}) {
  const [popularMovies, setPopularMovies] = React.useState<IPopularMovieResult>(
    {} as IPopularMovieResult,
  );

  const [upcomingMovies, setUpcomingMovies] =
    React.useState<IUpcomingMoviesResult>({} as IUpcomingMoviesResult);

  const [popularTv, setPopularTv] = React.useState<IPopularTvResult>(
    {} as IPopularTvResult,
  );

  const [moviesImages, setMoviesImages] = React.useState<string[]>([]);

  const [error, setError] = React.useState<unknown>(
    undefined as unknown as IError,
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    Get<IPopularMovieResult>(
      'movie/popular',
      setPopularMovies,
      setError,
      setLoading,
    );

    Get<IUpcomingMoviesResult>(
      'movie/upcoming',
      setUpcomingMovies,
      setError,
      setLoading,
    );

    Get<IPopularTvResult>('tv/popular', setPopularTv, setError, setLoading);
  }, []);

  React.useEffect(() => {
    if (popularMovies.results) {
      const images = popularMovies.results.map(
        movie => `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      );
      setMoviesImages(images);
    }
  }, [popularMovies]);

  return (
    <SafeAreaView style={styles.container}>
      {!loading && !error ? (
        <ScrollView>
          <View style={styles.sliderContainer}>
            <Carousel
              ref={c => {
                _carousel = c;
              }}
              activeSlideAlignment="center"
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              inactiveSlideShift={0}
              contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
              containerCustomStyle={styles.sliderContainer}
              style={styles.slide}
              data={moviesImages}
              renderItem={_renderItem}
              keyExtractor={_keyExtractor}
              sliderWidth={dimension.width}
              itemWidth={dimension.width}
              sliderHeight={dimension.height / 1.5}
              autoplay={true}
              loop={true}
            />
          </View>
          {popularMovies.total_results > 0 ? (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Popular Movies" content={popularMovies.results} />
            </View>
          ) : null}
          {popularTv.total_results > 0 ? (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Popular TV's" content={popularTv.results} />
            </View>
          ) : null}
        </ScrollView>
      ) : (
            !error ? <ActivityIndicator size="large" color="#0000ff" /> : <Error error={error as IError} />
      )}
    </ SafeAreaView>
  );
}
