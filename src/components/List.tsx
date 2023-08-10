import React, {PropsWithChildren} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Card from './Card';

interface IListProps extends PropsWithChildren<any> {
  title: string;
  content: any;
  navigation: any;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    list: {
        marginTop: 20,
    },

});

class List extends React.PureComponent<IListProps> {
  render() {
    const {title, content, navigation} = this.props;

    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => <Card navigation={navigation} item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

export default List;
