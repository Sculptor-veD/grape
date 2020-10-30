/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ListItem, Divider, Rating} from 'react-native-elements';
import {postNewFavorite, removeFavorite} from './redux/ActionCreators';
import {baseUrl} from './../shared/baseUrl';

const {width, height} = Dimensions.get('window');

function RenderRecipe(props) {
  const data = props.data;

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image style={styles.img} source={{uri: data.imgs[0]}} />
      </View>
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
                color="red"
                onPress={() =>
                  props.favorite ? props.onRemove() : props.onPress()
                }
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.viewCommentBtn}
                onPress={() => props.scrollRef()}>
                <Text style={{fontWeight: 'bold'}}>View Comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function RecipesDetails({navigation, route}) {
  const {dishId} = route.params;
  const data = useSelector((state) => state.dishes.dishes);
  const comments = data.filter((dish) => dish.id === dishId)[0];
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const dispatchNewFavorite = () => dispatch(postNewFavorite(dishId));
  const dispatchRemoveFavorite = () => dispatch(removeFavorite(dishId));
  const scrollRef = React.useRef();
  const [refreshing, setRefreshing] = useState(false);
  const [commentsData, setcommentsData] = useState(comments.comments);
  const [commentInput, setInput] = useState();
  const markFavorite = () => {
    dispatchNewFavorite(dishId);
    console.log(dishId, favorites);
  };

  const deleteFavorite = () => {
    dispatchRemoveFavorite(dishId);
    console.log(dishId, favorites);
  };

  const handleSubmit = () => {};

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(baseUrl + 'Dish/getAllDish')
      .then((res) => res.json())
      .then((json) => {
        const cmtData = json.dishes.filter((dish) => dish.id === dishId)[0]
          .comments;
        setcommentsData(cmtData);
      })
      .then(() => setRefreshing(false));
  }, [dishId]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden />
      <Animated.ScrollView
        scrollEventThrottle={16}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <RenderRecipe
          data={data.filter((dish) => dish.id === dishId)[0]}
          favorite={favorites.some((el) => el === dishId)}
          onPress={markFavorite}
          onRemove={deleteFavorite}
          scrollRef={() => scrollRef.current.scrollToEnd()}
        />
        <Divider />
        <View style={{height: height, marginTop: 10}}>
          <View style={styles.addingComment}>
            <View style={styles.commentIcon}>
              <Icon
                name="person-circle-outline"
                size={50}
                type="ionicon"
                color="#aaa"
                containerStyle={{flex: 1, justifyContent: 'center'}}
              />
            </View>
            <View style={styles.commentSection}>
              <TextInput
                placeholder="Comment"
                style={styles.commentInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={(text) => setInput(text)}
                value={commentInput}
              />
            </View>
          </View>
          <View style={styles.submitBtn}>
            <Button
              title="Post your comment"
              buttonStyle={{width: width * 0.5}}
              containerStyle={{alignItems: 'flex-end'}}
              onPress={handleSubmit}
            />
          </View>
          <Divider />
          {commentsData.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <Icon
                name="person-circle-outline"
                size={35}
                type="ionicon"
                color="#aaa"
              />
              <ListItem.Content>
                <Text>{item.author}</Text>
                <Rating
                  readonly
                  //  ratingBackgroundColor="#c8c7c8"
                  type="custom"
                  imageSize={10}
                  //tintColor="#4d2610"
                  ratingCount={5}
                  startingValue={item.rating}
                />
                <ListItem.Title>{item.comment}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 1.1,
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
    height: '100%',
    //resizeMode: "center",
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
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  addingComment: {
    flex: 1 / 4,
    height: height * 0.2,
    width: width,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  commentIcon: {
    //alignItems: 'center',
    flex: 1 / 4,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  commentSection: {
    flex: 3 / 4,
    flexDirection: 'column',
  },
  submitBtn: {
    backgroundColor: '#fff',
    padding: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#aaa',
    marginRight: 10,
  },
});
export default RecipesDetails;
