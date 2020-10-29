import * as React from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Modal,
  Dimensions,
  Button,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Card} from 'react-native-elements';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useScrollToTop} from '@react-navigation/native';

import {
  postComment,
  postNewFavorite,
  removeFavorite,
} from './redux/ActionCreators';
const {width, height} = Dimensions.get('window');

function Comments({data}) {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItems={({item}) => (
          <View>
            {console.log(item)}
            <Text>{item.comments[0].comments}</Text>
          </View>
        )}
      />
    </View>
  );
}
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
                // onPress={() => props.openModal()}
              >
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
  const commentsData = comments.comments;
  const [modalVisible, setModalVisible] = useState(false);
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
    <SafeAreaView style={{flex: 1}}>
      <StatusBar hidden />
      <Animated.ScrollView scrollEventThrottle={16}>
        <RenderRecipe
          data={data.filter((dish) => dish.id === dishId)[0]}
          favorite={favorites.some((el) => el === dishId)}
          onPress={() => markFavorite(dishId)}
          onRemove={() => deleteFavorite(dishId)}
        />

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={{backgroundColor: 'red', flex: 1 / 2}}>
              <View style={styles.modalView}>
                <FlatList
                  data={comments.comments}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                    <View>
                      <Text>{item.comment}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </Modal>
        </View>
        <View style={{height: height}}>
          <Card>
            <Card.Title>Comments</Card.Title>
            <Card.Divider />
            {commentsData.map((item, index) => (
              <View key={index}>
                <Text>{`${item.comment} ${index} `}</Text>
              </View>
            ))}
          </Card>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
RecipesDetails.navigationOptions = () => ({
  headerTransparent: true,
  headerTitle: '',
});
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
});
export default RecipesDetails;
