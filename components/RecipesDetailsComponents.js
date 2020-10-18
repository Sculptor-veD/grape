import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {
  postComment,
  postNewFavorite,
  removeFavorite,
} from './redux/ActionCreators';

function RenderRecipe(props) {
  const data = props.data;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image style={styles.img} source={{uri: data.imgs[0]}} />
      <View style={styles.detailsView}>
        <View style={styles.contentDetails}>
          <Text style={styles.descriptionText}>{data.name}</Text>
          <Text style={{marginTop: 10}}>{data.description}</Text>
          <View style={styles.bottomView}>
            <View style={styles.btnBox}>
              <Icon
                name={props.favorite ? 'heart' : 'heart-o'}
                type="font-awesome"
                size={50}
                color="#FFE9B8"
                onPress={() =>
                  props.favorite ? props.onRemove() : props.onPress()
                }
              />
            </View>
            <View>
              <TouchableOpacity style={styles.viewCommentBtn}>
                <Text style={{fontWeight: 'bold'}}>View Comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function RecipesDetails({navigation}) {
  const dishId = navigation.getParam('dishId', '');
  const data = useSelector((state) => state.dishes.dishes);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const dispatchNewFavorite = () => dispatch(postNewFavorite(dishId));
  const dispatchRemoveFavorite = () => dispatch(removeFavorite(dishId));
  function markFavorite() {
    dispatchNewFavorite(dishId);
    console.log(dishId, favorites);
  }
  function deleteFavorite() {
    dispatchRemoveFavorite(dishId);
    console.log(dishId, favorites);
  }
  return (
    <RenderRecipe
      data={data.filter((dish) => dish.id === dishId)[0]}
      favorite={favorites.some((el) => el === dishId)}
      onPress={() => markFavorite(dishId)}
      onRemove={() => deleteFavorite(dishId)}
    />
  );
}
RecipesDetails.navigationOptions = () => ({
  headerTransparent: true,
  headerTitle: '',
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    flex: 1,
    flexDirection: 'row',
    marginTop: -48,
    paddingLeft: 20,
    paddingRight: 20,
  },
  img: {
    backgroundColor: '#FFE9B8',
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    borderRadius: 24,
  },
  btnBox: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F4F4F4',
    borderRadius: 14,
    borderColor: '#FFE9B8',
    borderWidth: 2,
  },
  contentDetails: {
    marginTop: 48,
  },
  headerText: {
    fontSize: 34,
    fontFamily: 'quicksand',
  },
  descriptionText: {
    fontSize: 20,
    marginTop: 20,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 3 / 4,
  },
  viewCommentBtn: {
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#FFE9B8',
    height: 80,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  reviewText: {
    fontWeight: 'bold',
  },
  review: {
    flex: 1 / 2,
  },
});
export default RecipesDetails;
