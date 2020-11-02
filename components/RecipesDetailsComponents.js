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
  ScrollView,
  Alert,
} from 'react-native';
import {Loading} from './LoadingComponent';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ListItem, Divider, Rating} from 'react-native-elements';
import {
  postNewFavorite,
  removeFavorite,
  fetchDishes,
  postComment,
} from './redux/ActionCreators';
import {baseUrl} from './../shared/baseUrl';

const {width, height} = Dimensions.get('window');

function RenderComments({commentsData}) {
  return (
    <View style={{flex: 1}}>
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
  );
}
export function RecipesDetails({route}) {
  const {dishId} = route.params;
  const dishes = useSelector((state) => state.dishes.dishes);
  const user = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.favorites);
  const checkFav = favorites.some((el) => el === dishId);
  const dispatch = useDispatch();
  const scrollRef = React.useRef();
  const [commentsData, setData] = React.useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [commentInput, setInput] = useState();
  const dishesData = dishes.filter((dish) => dish.id === dishId)[0];
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    fetch(baseUrl + `Comment/getCommentByDishId/${dishId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.comments);
      });
  }, [dishId]);
  const markFavorite = () => {
    dispatch(postNewFavorite(dishId));
  };

  const deleteFavorite = () => {
    dispatch(removeFavorite(dishId));
  };

  const handleSubmit = () => {
    const obj = {
      rating: 3,
      comment: commentInput,
      author: user.username,
      isMember: 1,
      dishId: dishId,
    };
    if (!commentInput) {
      Alert.alert('Error', 'Please check your input');
      setLoading(false);
    } else {
      setLoading(true);
      fetch(baseUrl + 'Comment/createComment', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          rating: 3,
          comment: commentInput,
          author: user.username,
          isMember: 1,
          dishId: dishId,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setLoading(false);
          if (json.status === 1) {
            setData(commentsData.concat([obj]));
            setInput('');
          } else {
            const err = 'Error ' + json.description;
            throw err;
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetch(baseUrl + `Comment/getCommentByDishId/${dishId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.comments);
      })
      .then(() => setRefreshing(false));
  };
  if (isLoading) return <Loading />;
  else {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar hidden />
        <Animated.ScrollView
          scrollEventThrottle={16}
          ref={scrollRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <Image style={styles.img} source={{uri: dishesData.imgs[0]}} />
            </View>
            <View style={styles.detailsView}>
              <View style={styles.contentDetails}>
                <Text style={styles.descriptionText}>{dishesData.name}</Text>
                <Text style={{marginTop: 10}}>{dishesData.description}</Text>
                <View style={styles.bottomView}>
                  <View style={styles.btnBox}>
                    <Icon
                      name={checkFav ? 'heart' : 'heart-o'}
                      type="font-awesome"
                      size={50}
                      color="red"
                      onPress={() =>
                        checkFav ? deleteFavorite() : markFavorite()
                      }
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.viewCommentBtn}
                      onPress={() => scrollRef.current.scrollToEnd()}>
                      <Text style={{fontWeight: 'bold'}}>View Comments</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
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
                <View style={styles.submitBtn}>
                  <Button
                    title="Post your comment"
                    buttonStyle={{width: width * 0.5}}
                    containerStyle={{alignItems: 'flex-end'}}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </View>
            <RenderComments commentsData={commentsData} />
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
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
export const MemoizedRecipesDetails = React.memo(RecipesDetails);
