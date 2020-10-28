import React from 'react';
import {FlatList, View, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect, useSelector} from 'react-redux';
import {Loading} from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

function Favorites({navigation}) {
  const data = useSelector((state) => state.dishes.dishes);
  const isLoading = useSelector((state) => state.dishes.isLoading);
  const errMess = useSelector((state) => state.dishes.errMess);
  const favorites = useSelector((state) => state.favorites);
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
      <FlatList
        data={data.filter((dish) => favorites.some((el) => el === dish.id))}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Favorites);
