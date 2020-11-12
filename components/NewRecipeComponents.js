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
  const [refreshing, setRefreshing] = React.useState(false);
  const user = Redux.useSelector((state) => state.user.user);
  const [isLoading, setLoading] = React.useState(false);
  let form = new FormData();
  let imgUri = '';
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

  const HandleImgs = () => {
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
          type: response.type,
          uri: response.uri,
        });
        setImg(source);
      }
    });
  };
  const uploadImage = async () => {
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
        return json.data[0];
      });

    //HandleImgs((form) => console.log(form));
  };

  const handleSubmit = async () => {
    // const err = nameError() || descriptionError();
    // const errorFullnull = nameError() && descriptionError();
    // if (errorFullnull !== null) {
    //   Alert.alert('Error', 'You must fill out something!');
    //   return;
    // } else if (err) {
    //   Alert.alert('Validation error', err);
    //   return;
    // } else {
    //   setLoading(true);

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
        console.log(json.data);
        return json.data[0];
      });

    //   await fetch(baseUrl + 'Dish/createDish', {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + user.token,
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //       name: name,
    //       label: 'Hot',
    //       featured: false,
    //       category: 'mains',
    //       price: 4.3,
    //       description: description,
    //       imgs: [imgData],
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((json) => {
    //       setLoading(false);
    //       if (json.status === 1) {
    //         console.log('OK');
    //       } else {
    //         const error = 'Error ' + json.description;
    //         throw error;
    //       }
    //     })
    //     .catch((error) => console.log(error));
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
          onPress={HandleImgs}
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
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
            />
            <Text style={styles.h2}>Description</Text>
            <TextInput
              placeholder="Description"
              style={styles.roundedInput}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.loginBtnLabel}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => handleSubmit()}>
                <Text style={styles.loginBtnLabel}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight,
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
    flex: 1 / 2,
  },
  images: {
    flex: 1,
    height: height * 1.1,
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
