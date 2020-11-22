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
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ListItem, Divider, Rating} from 'react-native-elements';
import {postNewFavorite, removeFavorite} from './redux/ActionCreators';
import {baseUrl} from './../shared/baseUrl';
import {pushNotifications} from '../services/index';
const {width, height} = Dimensions.get('window');

function RenderComments({commentsData}) {
  console.log('RenderComments Re-render');

  return (
    <SafeAreaView style={{flex: 1, flexGrow: 1}}>
      <Divider />
      <View style={{flex: 1}}>
        {commentsData.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Icon
              name="person-circle-outline"
              size={35}
              type="ionicon"
              color="#aaa"
            />
            <ListItem.Content>
              <Text style={{fontFamily: 'Feather'}}>{item.author}</Text>
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
    </SafeAreaView>
  );
}
const MemoizedRenderComments = React.memo(RenderComments);
function RenderDetails({
  dishesData,
  checkFav,
  deleteFavorite,
  markFavorite,
  scrollRef,
  setInput,
  commentInput,
  handleSubmit,
  isLoading,
  postCommentRef,
}) {
  console.log('RenderDetails Re-render');
  return (
    <View>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Image
            style={styles.img}
            source={{
              uri: baseUrl + 'Image/open_image/' + dishesData.imgs[0],
            }}
          />
        </View>
        <View style={styles.detailsView}>
          <View style={styles.contentDetails}>
            <View style={styles.recipeDetails}>
              <Text style={styles.descriptionText}>{dishesData.name}</Text>
              <Text style={{marginTop: 10, fontFamily: 'Goldman-Regular'}}>
                {dishesData.description}
              </Text>
            </View>
            <View style={styles.bottomView}>
              <View style={styles.btnBox}>
                <Icon
                  name={checkFav ? 'heart' : 'heart-o'}
                  type="font-awesome"
                  size={50}
                  color="red"
                  onPress={() => (checkFav ? deleteFavorite() : markFavorite())}
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
      <View style={{marginTop: 10}}>
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
                disabled={isLoading ? true : false}
                ref={postCommentRef}
              />
            </View>
          </View>
        </View>
      </View>
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
  const postCommentRef = React.createRef();

  console.log('DetailRe-render');

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

  const handleSubmit = async () => {
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
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((json) => {
          setLoading(false);
          if (json.status === 1) {
            setData(commentsData.concat([obj]));
            setInput('');
            pushNotifications.localNotification(
              `${user.username} has just commented your recipe`,
              `${commentInput}`,
            );
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', flexGrow: 1}}>
      <StatusBar hidden />
      <ScrollView
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <RenderDetails
          dishesData={dishesData}
          checkFav={checkFav}
          deleteFavorite={deleteFavorite}
          markFavorite={markFavorite}
          scrollRef={scrollRef}
          setInput={setInput}
          commentInput={commentInput}
          handleSubmit={() => handleSubmit()}
          isLoading={isLoading}
          postCommentRef={postCommentRef}
        />
        <MemoizedRenderComments commentsData={commentsData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 1.05,
    flexGrow: 1,
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
    flexGrow: 1,
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
    flex: 1,
    flexGrow: 1,
  },
  headerText: {
    fontSize: 34,
    fontFamily: 'quicksand',
  },
  descriptionText: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'Goldman-Regular',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    flex: 1 / 4,
    flexGrow: 1,
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
  recipeDetails: {
    flex: 1,
    flexGrow: 1,
  },
});
export const MemoizedRecipesDetails = React.memo(RecipesDetails);
