import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {MemoizedRecipes} from './RecipesComponents';
import {MemoizedRecipesDetails} from './RecipesDetailsComponents';
import Favorites from './FavoritesComponents';
import FloatBtn from './TabBarFloatBtn';
import {Icon} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './LoginComponents';
import Register from './RegisterComponents';
import {MemoizedNewRecipeComponents} from './NewRecipeComponents';
import {HeaderBackButton} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {fetchDishes} from './redux/ActionCreators';
import {useDispatch} from 'react-redux';
import {pushNotifications} from '../services/index';
import {navigationRef} from '../services/navigateWithoutProps';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="registerScreen"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function MyTabsApp() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} />
        </View>
      )}
      tabBarOptions={{
        showIcon: true,
        style: styles.navigator,
        tabStyle: {
          backgroundColor: '#FFF',
          borderWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={MemoizedRecipes}
        options={{
          tabBarIcon: () => (
            <Icon name="home" type="ionicon" size={24} color={'#aaa'} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNewRecipe"
        component={MemoizedNewRecipeComponents}
        options={{
          tabBarButton: (props) => <FloatBtn {...props} bgColor={'#FFF'} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: () => (
            <Icon name="heart" type="ionicon" size={24} color={'#aaa'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export function RootStack() {
  const dispatch = useDispatch();
  useEffect(() => {
    function loadRecipes() {
      dispatch(fetchDishes());
    }
    loadRecipes();
    const foregroundMessage = pushNotifications.receiveRemoteNotificationForeground();

    return foregroundMessage;
  }, [dispatch]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Authen"
          component={AuthStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tab"
          component={MyTabsApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecipesDetails"
          component={MemoizedRecipesDetails}
          options={{
            headerTransparent: true,
            title: '',
            headerLeft: (props) => (
              <HeaderBackButton {...props} tintColor={'#68ed26'} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
export const MemoiziedRootStack = React.memo(RootStack);
