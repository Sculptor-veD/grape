import React, {useState} from 'react';
import * as Redux from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {baseUrl} from '../shared/baseUrl';
import {ScrollView} from 'react-native-gesture-handler';
import {Image, Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {postCreateDish} from './redux/ActionCreators';
import {Loading} from './LoadingComponent';
const {width, height} = Dimensions.get('window');
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export function NewRecipeComponents({navigation}) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [contentInsetBottom, setInset] = React.useState();
  const user = Redux.useSelector((state) => state.user.user);
  const dishes = Redux.useSelector((state) => state.dishes.dishes);
  const inputRef = React.createRef();
  const inputRef2 = React.createRef();
  const btnRef = React.createRef();
  const dispatch = Redux.useDispatch();
  let form = new FormData();
  function nameError() {
    if (!name) {
      return 'Invalid name';
    }
    return null;
  }
  function descriptionError() {
    if (!description) {
      return 'Invalid description';
    }
    return null;
  }

  const HandleImgs = async (callback) => {
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        form.append('image', {
          name: response.fileName,
          type: 'image/jpeg',
          uri: response.uri,
          data: response.data,
        });
        setImg(source);
        callback(form);
      }
    });
  };
  const uploadImage = async () => {
    HandleImgs(async () => {
      await fetch(baseUrl + 'Image/UploadImageNew', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + user.token,
        },
        method: 'POST',
        body: form,
      })
        .then((req) => req.json())
        .then((json) => {
          console.log(json);
          if (json) setImgUrl(json.data[0]);
        });
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    dispatch(postCreateDish(user, name, description, imgUrl));
  };
  const checkImg = () => {
    if (!img) {
      return (
        <Icon
          name="image"
          type="font-awesome"
          size={100}
          color="#fff"
          containerStyle={styles.iconContainer}
          onPress={uploadImage}
        />
      );
    } else {
      return <Image source={img} style={styles.uploadImg} />;
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setImg(null);
    setRefreshing(false);
  }, []);

  if (dishes.isLoading === false && isLoading === true)
    Alert.alert(
      'Success',
      'Ban da tao moi 1 dish',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('Home')},
      ],
      {cancelable: false},
    );
  else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentInset={{top: 0, bottom: contentInsetBottom}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <ImageBackground
            blurRadius={1.2}
            style={styles.images}
            source={require('../asset/charles-deluvio-D-vDQMTfAAU-unsplash.jpg')}>
            <Text style={styles.header}>Publish recipe</Text>
            <View style={styles.details}>
              <Text style={styles.h2}>Photos</Text>
              <View style={styles.photoImage}>{checkImg()}</View>
              <Text style={styles.h2}>Name</Text>
              <TextInput
                placeholder="Name"
                style={styles.roundedInput}
                onChangeText={(text) => setName(text)}
                value={name}
                ref={inputRef}
                onSubmitEditing={() => inputRef2.current.focus()}
              />
              <Text style={styles.h2}>Description</Text>
              <TextInput
                placeholder="Description"
                style={styles.roundedInput}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setDescription(text)}
                value={description}
                ref={inputRef2}
                onContentSizeChange={(event) =>
                  setInset(event.nativeEvent.contentSize.height)
                }
                onSubmitEditing={() => handleSubmit}
              />
              <View style={styles.btnView}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.loginBtnLabel}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={handleSubmit}
                  ref={btnRef}>
                  <Text style={styles.loginBtnLabel}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  roundedInput: {
    color: 'white',
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
    paddingLeft: 15,
    borderColor: '#fff',
  },
  header: {
    fontSize: 48,
    marginTop: StatusBar.currentHeight,
    padding: 20,
    color: '#aaa',
  },
  h2: {
    fontSize: 18,
    marginTop: 8,
    color: '#000',
    fontWeight: 'bold',
  },
  details: {
    padding: 10,
    flexGrow: 1,
  },
  images: {
    flexGrow: 1,
    flex: 1,
  },
  photoImage: {
    height: 200,
  },
  uploadImg: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  iconContainer: {right: width / 3, top: 20},
  loginBtn: {
    marginTop: 10,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: 'transparent',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  loginBtnLabel: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  btnView: {
    flexDirection: 'row',
    height: height * 0.35,
    justifyContent: 'space-evenly',
  },
});
export const MemoizedNewRecipeComponents = React.memo(NewRecipeComponents);
