import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {postLoginUser, addNewuser} from './redux/ActionCreators';
import {Loading} from './LoadingComponent';

function Login({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state) => state.user.isSignIn);
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    let isMounted = false;
    const bootAsync = () => {
      isMounted = true;
      if (isSignIn) {
        navigation.navigate('Tab');
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'Tab'}],
        });
        navigation.dispatch(resetAction);
      } else {
        return false;
      }
    };
    if (!isMounted) {
      bootAsync();
    }
  }, [navigation, isSignIn]);
  function handleEmail(text) {
    setEmail(text);
  }
  function handlePassword(text) {
    setPassword(text);
  }

  function passwordError() {
    if (!password) {
      return 'Invalid password';
    }
    return null;
  }
  function usernameError() {
    if (!email) {
      return 'Invalid username';
    }
    return null;
  }
  function handleLoginBtnLongPress() {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({routeName: 'App'})],
    // });
    // navigation.dispatch(resetAction);
    navigation.navigate('App');
  }
  function handleLoginBtn() {
    //validation
    const err = passwordError() || usernameError();
    const errorFullnull = passwordError() && usernameError();
    if (errorFullnull !== null) {
      Alert.alert('You must fill out something!');
      return;
    } else if (err) {
      Alert.alert('Validation error', err);
      return;
    }
    dispatch(
      postLoginUser(
        email,
        password,
        (json) => {
          if (json.status === 1) {
            dispatch(addNewuser(json.data));
            navigation.navigate('Tab');
          } else {
            const error = 'Error ' + json.description;

            return Alert.alert(
              'Error',
              `${error}`,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        },
      ),
    );
  }
  if (isSignIn) {
    return <Loading />;
  } else if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerColor}>
        <Text style={styles.headerText}>Welcome</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          underlineColorAndroid="grey"
          onChangeText={(text) => handleEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          underlineColorAndroid="grey"
          onChangeText={(text) => handlePassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Text
          style={styles.register}
          onPress={() => navigation.navigate('registerScreen')}>
          REGISTER
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLoginBtn}
          onLongPress={handleLoginBtnLongPress}>
          <Text style={styles.loginBtnLabel}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginAsGuest}
          onPress={() => navigation.navigate('Tab')}>
          <Text style={styles.loginBtnLabel}>LOGIN AS GUEST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerColor: {
    backgroundColor: '#6FA0E5',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    paddingLeft: 3,
    fontSize: 12,
    color: 'black',
    marginTop: 25,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -28,
    flex: 1,
  },

  register: {
    color: '#6FA0E5',
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  loginBtn: {
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#6FA0E5',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  loginBtnLabel: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  loginAsGuest: {
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#aaa',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
