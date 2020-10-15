import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

function RecipesDetails({navigation}) {
  const dishId = navigation.getParam('dishId', '');
  const data = useSelector((state) => state.dishes.dishes);
  const temp = data;
  const dataDishId = temp[dishId - 2];

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image style={styles.img} source={require('../asset/mango.png')} />
      <View style={styles.detailsView}>
        <View style={styles.contentDetails}>
         
          <Text style={styles.descriptionText}>Recipe Description</Text>
          <Text style={{marginTop: 10}}>
            A mango is a stone fruit produced from numerous species of tropical
            trees belonging to the flowering plant genus Mangifera, cultivated
            mostly for their edible fruit. Most of these species are found in
            nature as wild mangoes.
          </Text>
          <View style={styles.bottomView}>
            <View style={styles.btnBox}>
              <Icon name="heart" type="ionicon" size={50} color="#FFE9B8" />
            </View>
            <View>
              <TouchableOpacity style={styles.viewCommentBtn}>
                <Text style={{fontWeight: 'bold'}}>View Comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
RecipesDetails.navigationOptions = () => ({
  headerTransparent: true,
  headerTitle: '',
  headerLeft: () => (
    <Icon name="heart" type="ionicon" size={50} color="#FFE9B8" />
  ),
  headerRight: () => (
    <Icon name="heart" type="ionicon" size={50} color="#FFE9B8" />
  ),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    flex: 1,
    flexDirection: 'row',
    marginTop: -48,
    paddingLeft: 20,
    paddingRight: 20,
  },
  img: {
    backgroundColor: '#FFE9B8',
    width: '100%',
    height: '50%',
    resizeMode: 'center',
    borderRadius: 24,
  },
  btnBox: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F4F4F4',
    borderRadius: 14,
    borderColor: '#FFE9B8',
    borderWidth: 2,
  },
  contentDetails: {
    marginTop: 48,
  },
  headerText: {
    fontSize: 34,
    fontFamily: 'quicksand',
  },
  descriptionText: {
    fontSize: 20,
    marginTop: 20,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 3 / 4,
  },
  viewCommentBtn: {
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#FFE9B8',
    height: 80,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
});
export default RecipesDetails;
