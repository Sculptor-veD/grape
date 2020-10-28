import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {baseUrl} from '../shared/baseUrl';
import {postUser, userFailed} from './redux/ActionCreators';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
    };
  }

  handleUsername(text) {
    this.setState({
      userName: text,
    });
  }
  handleEmail(text) {
    this.setState({
      email: text,
    });
  }
  handlePassword(text) {
    this.setState({
      password: text,
    });
  }
  userNameError = () => {
    if (!this.state.userName) {
      return 'Invalid username';
    }
    return null;
  };
  passwordError = () => {
    if (!this.state.password) {
      return 'Invalid password';
    }
    return null;
  };
  emailError = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.state.email) {
      return 'Invalid email';
    }
    if (!re.test(this.state.email.toLowerCase())) {
      return 'Invalid format email';
    }
    return null;
  };
  handleRegister = () => {
    //validation
    // const err =
    //   this.userNameError() || this.passwordError() || this.emailError();
    // const errorFullnull =
    //   this.userNameError() && this.passwordError() && this.emailError();
    // if (erro ,rFullnull !== null) {
    //   Aler
    // } else if (err) {
    //   Alert.alert('Validation error', err);
    //   return;
    // }
    // () =>
    //     Alert.alert(
    //       'Alert Title',
    //       `${this.props.user.errMess}`,
    //       [
    //         {
    //           text: 'Cancel',
    //           onPress: () => console.log('Cancel Pressed'),
    //           style: 'cancel',
    //         },
    //         {text: 'OK', onPress: () => console.log('OK Pressed')},
    //       ],
    //       {cancelable: false},
    //     ),
    console.log(this.props.user.isLoading);
    this.props.postUser(
      this.state.userName,
      this.state.password,
      this.state.email,
      (json) => {
        if (json.status === 1)
          return Alert.alert(
            'Success',
            'Sign up successful',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('loginScreen'),
              },
            ],
            {cancelable: false},
          );
        else {
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
    );
  };

  render() {
    if (this.props.user.isLoading) return <Loading />;
    else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.headerColor}>
              <Text style={styles.headerText}>Register</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Username"
                underlineColorAndroid="grey"
                onChangeText={(text) => this.handleUsername(text)}
                value={this.state.userName}
                autoCapitalize="none"
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                underlineColorAndroid="grey"
                onChangeText={(text) => this.handleEmail(text)}
                value={this.state.email}
                autoCapitalize="none"
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                underlineColorAndroid="grey"
                onChangeText={(text) => this.handlePassword(text)}
                value={this.state.password}
                textContentType="password"
                secureTextEntry={true}
                autoCapitalize="none"
              />
              <Text
                style={styles.register}
                onPress={() => this.props.navigation.navigate('loginScreen')}>
                Already have an account? Login
              </Text>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => this.handleRegister()}>
                <Text style={styles.loginBtnLabel}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  headerColor: {
    backgroundColor: '#A099D2',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 30,
  },
  textInput: {
    height: 40,
  },
  headerText: {
    fontSize: 25,
    color: 'white',
  },
  label: {
    paddingLeft: 3,
    fontSize: 12,
    color: 'black',
    marginTop: 15,
  },
  inputContainer: {
    padding: 30,
  },

  register: {
    color: '#A099D2',
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  loginBtn: {
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#A099D2',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  loginBtnLabel: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
});
const mapDispatchToProps = (dispatch) => ({
  postUser: (username, password, email, callback) =>
    dispatch(postUser(username, password, email, callback)),
  userFailed: (error) => dispatch(userFailed(error)),
});
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
