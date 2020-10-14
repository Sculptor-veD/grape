import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import {Loading} from '../components/LoadingComponent';
import {Rating, Icon} from 'react-native-elements';
import MaskedView from '@react-native-community/masked-view';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.73;

const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({data, scrollX}) => {
  return (
    <View
      style={{
        height: BACKDROP_HEIGHT,
        width: width,
        position: 'absolute',
      }}>
      <Image
        style={{width: 600, height: '80%', resizeMode: 'cover'}}
        source={{
          uri:
            'https://img.freepik.com/free-photo/slice-delicious-pizza-with-ingredients-textured-wooden-background_23-2147926094.jpg?size=626&ext=jpg',
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString() + '-backdrop'}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          const translateX = scrollX.interpolate({
            inputRange: [index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate: 'clamp',
          });
          return (
            <MaskedView
              //  style={{flex: 1, position: 'absolute'}}
              maskElement={
                <Image style={styles.imgs} source={{uri: item.imgs[0]}} />
              }></MaskedView>
          );
        }}
      />
    </View>
  );
};
function Recipes({navigation}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const data = useSelector((state) => state.dishes.dishes);
  const isLoading = useSelector((state) => state.dishes.isLoading);
  const [modalVisible, setModalVisible] = useState(false);
  const ToggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const renderItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [160, 100, 160],
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
        <StatusBar hidden />
        <Animated.FlatList
          data={data.reverse()}
          keyExtractor={(item, index) => item.id.toString()}
          horizontal
          //  snapToInterval={width * 0.74}
          bounces={false}
          contentContainerStyle={{alignItems: 'center'}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          renderItem={renderItem}
        />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>

                <Text style={styles.textStyle}>Hide Modal</Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
Recipes.navigationOptions = ({navigation}) => ({
  title: '',
  headerTitleStyle: styles.headerStyle,
  headerTransparent: true,
  headerLeft: () => (
    <Icon
      name="person-circle-outline"
      size={30}
      type="ionicon"
      color="white"
      containerStyle={{paddingLeft: 30, paddingTop: StatusBar.currentHeight}}
      onPress={() => navigation.openDrawer()}
    />
  ),
  headerRight: () => (
    <Icon
      name="add-outline"
      type="ionicon"
      size={30}
      color="white"
      containerStyle={{
        paddingRight: 10,
        paddingTop: StatusBar.currentHeight,
      }}
    />
  ),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: '#F2F2F2',
  },
  renderItem: {
    width: width * 0.74,
  },
  imgs: {
    width: '95%',
    height: width * 0.74,
    resizeMode: 'stretch',
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
});

export default Recipes;
