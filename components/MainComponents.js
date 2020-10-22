import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useEffect} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import Recipes from './RecipesComponents';
import RecipesDetails from './RecipesDetailsComponents';
import Favorites from './FavoritesComponents';
import Login from './LoginComponents';
import Register from './RegisterComponents';
function LogOutScreen({navigation}) {
  useEffect(() => {
    navigation.navigate('Authen');
  });
  return <View />;
}
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={styles.drawerHeader}>
        <View style={{flex: 1}}>
          <Image
            source={require('../asset/mango.png')}
            style={styles.drawerImage}
          />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
const RecipesStack = createStackNavigator(
  {
    Recipes: {
      screen: Recipes,
    },
    RecipesDetails: {
      screen: RecipesDetails,
    },
  },
  {
    initialRouteName: 'Recipes',
  },
);
const AuthenticationStack = createStackNavigator(
  {
    loginScreen: {
      screen: Login,
    },
    registerScreen: {
      screen: Register,
    },
  },
  {headerMode: true},
);
const FavoritesStack = createStackNavigator({
  favScreen: {
    screen: Favorites,
  },
});
const Drawer = createDrawerNavigator(
  {
    screen1: {
      screen: RecipesStack,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    favScreen: {
      screen: FavoritesStack,
      navigationOptions: {
        drawerLabel: 'Favorites',
        drawerIcon: ({tintColor, focused}) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    logOutBtn: {
      screen: LogOutScreen,
      navigationOptions: {
        drawerLabel: 'Logout',
      },
    },
  },
  {contentComponent: CustomDrawerContentComponent},
);
const MainStack = createSwitchNavigator(
  {
    Authen: AuthenticationStack,
    App: Drawer,
  },
  {initialRouteName: 'Authen', headerMode: true},
);
const AppContainter = createAppContainer(MainStack);
function Main() {
  return <AppContainter />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});
export default Main;
