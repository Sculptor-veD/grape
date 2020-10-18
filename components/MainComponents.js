import * as React from 'react';
import {Text, StyleSheet, StatusBar} from 'react-native';
import {useState, useEffect} from 'react';
//import RecipesComponents from './RecipesComponents';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import Recipes from './RecipesComponents';
import RecipesDetails from './RecipesDetailsComponents';
import Favorites from './FavoritesComponents';
import {fetchDishes} from './redux/ActionCreators';
import {useDispatch} from 'react-redux';
import Login from './LoginComponents';
import Register from './RegisterComponents';
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
const AuthenticationStack = createStackNavigator({
  loginScreen: {
    screen: Login,
  },
  registerScreen: {
    screen: Register,
  },
});
const FavoritesStack = createStackNavigator({
  favScreen: {
    screen: Favorites,
  },
});
const Drawer = createDrawerNavigator({
  screen1: {
    screen: RecipesStack,
  },
  favScreen: {
    screen: FavoritesStack,
  },
});
const MainStack = createStackNavigator(
  {
    Authen: {
      screen: AuthenticationStack,
      navigationOptions: () => ({
        headerTransparent: true,
        headerTitle: '',
      }),
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: () => ({
        headerTransparent: true,
        headerTitle: '',
      }),
    },
  },
  {initialRouteName: 'Authen'},
);
const AppContainter = createAppContainer(MainStack);
function Main() {
  const [didMount, setDidMount] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setDidMount(true);
    async function loadRecipes() {
      await dispatch(fetchDishes());
    }
    loadRecipes();
  }, [dispatch]);
  if (!didMount) {
    return null;
  } else {
    return <AppContainter />;
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    paddingTop: StatusBar.currentHeight,
    color: 'white',
  },
  icon: {
    paddingLeft: 30,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Main;
