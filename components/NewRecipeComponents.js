import React, {useState} from 'react';
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
} from 'react-native';
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

function NewRecipeComponents() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const HandleImgs = (callback) => {
    let form = new FormData();
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
        form.append('photo', {
          name: response.fileName,
          type: response.type,
          uri: response.uri,
        });
        setImg(source);
        callback(form);
      }
    });
  };
  const uploadImage = () => {
    HandleImgs((form) => {
      fetch('https://dientoandm.herokuapp.com/api/Image/UploadImage', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6Ik5ndXnDqm4gYsOqIMSRw6oiLCJ0eXBlIjowLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjAzODgwMjU3LCJleHAiOjE2MDM5MTYyNTd9.efMommxWYBe-ZIRfGSV58dgA_IlBxD4Nu6BKIGHJ_DU',
        },
        method: 'POST',
        body: form,
      })
        .then((req) => req.json())
        .then((json) => console.log(json));
    });
    //HandleImgs((form) => console.log(form));
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
              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginBtnLabel}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn}>
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
export default NewRecipeComponents;
