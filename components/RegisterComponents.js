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

export default class Register extends React.Component {
  state = {
    userName: '',
    email: '',
    password: '',
  };
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
    const err =
      this.userNameError() || this.passwordError() || this.emailError();
    const errorFullnull =
      this.userNameError() && this.passwordError() && this.emailError();
    if (errorFullnull !== null) {
      Alert.alert('You must fill out something!');
      return;
    } else if (err) {
      Alert.alert('Validation error', err);
      return;
    }
  };
  render() {
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
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              underlineColorAndroid="grey"
              onChangeText={(text) => this.handleEmail(text)}
              value={this.state.email}
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
            />
            <Text
              style={styles.register}
              onPress={() => this.props.navigation.navigate('loginScreen')}>
              Already have an account? Login
            </Text>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={this.handleRegister}>
              <Text style={styles.loginBtnLabel}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
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
