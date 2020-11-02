/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Alert,
  RefreshControl,
} from 'react-native';
import {Loading} from '../components/LoadingComponent';
import {Rating, Icon} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {userLogout, fetchDishes} from './redux/ActionCreators';
const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.73;

const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({data, scrollX}) => {
  return (
    <View style={styles.backdrop}>
      <Image
        style={{width: 600, height: '80%', resizeMode: 'cover'}}
        source={{
          uri:
            'https://img.freepik.com/free-photo/slice-delicious-pizza-with-ingredients-textured-wooden-background_23-2147926094.jpg?size=626&ext=jpg',
        }}
      />
    </View>
  );
};
export function Recipes({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const data = useSelector((state) => state.dishes.dishes);
  const isLoading = useSelector((state) => state.dishes.isLoading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchDishes());
    setRefreshing(false);
  }, [dispatch]);

  const renderItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [150, 90, 150],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.renderItem}>
        <Animated.View
          style={{
            marginLeft: 30,
            marginHorizontal: 10,
            padding: 10,
            alignItems: 'center',
            backgroundColor: '#4d2610',
            borderRadius: 24,
            height: '80%',
            transform: [{translateY}],
          }}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('RecipesDetails', {dishId: item.id})
            }>
            <Image style={styles.imgs} source={{uri: item.imgs[0]}} />

            <Rating
              readonly
              //  ratingBackgroundColor="#c8c7c8"
              type="custom"
              imageSize={20}
              tintColor="#4d2610"
            />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  };
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.container}>
        <Backdrop data={data} scrollX={scrollX} />
        <View style={styles.header}>
          <View style={styles.headerUsername}>
            <Icon
              name="person-circle-outline"
              size={35}
              type="ionicon"
              color="white"
            />
            <Text style={styles.headerText}>{user.name}</Text>
          </View>
          <View stlyes={styles.headerPoweroff}>
            <Icon
              name="power-off"
              size={30}
              type="font-awesome"
              color="#fcf7f9"
              onPress={() => {
                Alert.alert(
                  'Sign out',
                  'Do you want to sign out ? ',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        dispatch(userLogout());
                        navigation.navigate('Authen');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}
            />
          </View>
        </View>

        <StatusBar hidden />
        <Animated.FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data.reverse()}
          keyExtractor={(item, index) => item.id.toString()}
          horizontal
          bounces={false}
          contentContainerStyle={{alignItems: 'center'}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          renderItem={renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  renderItem: {
    width: width * 0.74,
  },
  imgs: {
    width: '100%',
    height: width * 0.54,
    resizeMode: 'cover',
    borderRadius: 2,
    margin: 0,
    marginBottom: 10,
  },
  itemName: {
    color: 'white',
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
  },
  header: {
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
  },

  img: {
    width: '100%',
    height: '38%',
    resizeMode: 'cover',
    backgroundColor: 'blue',
    marginBottom: 20,
  },
  headerPoweroff: {
    width: width * 0.12,
    height: 50,
    alignItems: 'flex-end',
  },
  headerUsername: {
    flexDirection: 'row',
    width: width * 0.88,
    alignItems: 'center',
    paddingLeft: 20,
    top: -5,
  },
  backdrop: {
    height: BACKDROP_HEIGHT,
    width: width,
    position: 'absolute',
  },
  headerText: {
    paddingLeft: 15,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export const MemoizedRecipes = React.memo(Recipes);
