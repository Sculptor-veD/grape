import React from 'react';
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Loading} from './LoadingComponent';
import {pushNotifications} from '../services/index';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
function Favorites({navigation}) {
  const data = useSelector((state) => state.dishes.dishes);
  const isLoading = useSelector((state) => state.dishes.isLoading);
  const errMess = useSelector((state) => state.dishes.errMess);
  const favorites = useSelector((state) => state.favorites);
  const handleOnPress = () => {
    pushNotifications.localNotification();
  };

  const renderMenuItem = ({item, index}) => {
    return (
      <View>
        <ListItem
          bottomDivider
          onPress={() =>
            navigation.navigate('RecipesDetails', {dishId: item.id})
          }>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{flex: 1}}>
            {item.description}
          </ListItem.Subtitle>
          <ListItem.Chevron />
        </ListItem>
      </View>
    );
  };

  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <Button title="x" onPress={handleOnPress} />
        <FlatList
          data={data.filter((dish) => favorites.some((el) => el === dish.id))}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
});
export default Favorites;
