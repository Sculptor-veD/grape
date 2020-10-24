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
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FloatBtn from './TabBarFloatBtn';
const TabScreens = createBottomTabNavigator(
  {
    Recipes: {
      screen: Recipes,
      navigationOptions: () => ({
        title: 'Home',
        tabBarIcon: () => <Icon name="heart" type="font-awesome" size={24} />,
      }),
    },
    AddBtn: {
      screen: Favorites,
      navigationOptions: () => ({
        title: '',
        tabBarIcon: () => <FloatBtn bgColor={'#fff'} />,
      }),
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: () => ({
        title: 'Favorties',
        tabBarIcon: ({tintColor, focused}) => (
          <Icon name="heart" type="font-awesome" size={24} color={tintColor} />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        height: 60,
      },
      tabStyle: {
        backgroundColor: 'transparent',
      },
    },
  },
);
function LogOutScreen({route, navigation}) {
  useEffect(() => {
    const {user} = route.params;
    console.log(user);
    // navigation.navigate('Authen');
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
      screen: TabScreens,
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
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30,
  },
});
export default Main;
