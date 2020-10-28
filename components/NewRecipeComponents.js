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
  const [img, setImg] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const form = new FormData();
  const Imagepicker = (callback) => {
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
        // form.append('name', 'image');
        form.append('image', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          data: response.data,
        });
        console.log(response.type);
        console.log(response.fileName);
        console.log(response.uri);
        // callback();
        setImg(source);
      }
    });
  };
  const uploadImage = async () => {
    // Imagepicker(() => {
    //   console.log(form._parts);
    //   fetch('https://dientoandm.herokuapp.com/api/Image/UploadImage', {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //       Authorization:
    //         'Bearer ' +
    //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik5ndXnDqm4gxJHDtMyJIGJvzIFuZyBuZ3V5w6puIGNvbiIsInR5cGUiOjAsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MDM3OTQzODIsImV4cCI6MTYwMzgzMDM4Mn0.XNW_uz7jvQ3ZxDFCe1xonzR6S1Wh3Biv635pbXmP3ks',
    //     },
    //     method: 'POST',
    //     body: form,
    //   })
    //     .then((req) => req.json())
    //     .then((json) => console.log(json));
    // });
    Imagepicker();
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
          onPress={() => uploadImage()}
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
          style={styles.images}
          source={require('../asset/charles-deluvio-D-vDQMTfAAU-unsplash.jpg')}>
          <Text style={styles.header}>Publish recipe</Text>
          <View style={styles.details}>
            <Text style={styles.h2}>Photos</Text>
            <View style={styles.photoImage}>{checkImg()}</View>
            <Text style={styles.h2}>Name</Text>
            <TextInput placeholder="Name" style={styles.roundedInput} />
            <Text style={styles.h2}>Description</Text>
            <TextInput placeholder="Description" style={styles.roundedInput} />
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
    color: '#fff',
    fontWeight: 'bold',
  },
  details: {
    padding: 10,
    flex: 1 / 2,
  },
  images: {
    flex: 1,
    height: height,
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
});
export default NewRecipeComponents;
