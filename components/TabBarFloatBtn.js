import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {TabBg} from '../shared/svg/TabBg';
export default function FloatBtn(props) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TabBg color={props.bgColor} style={styles.background} />
      <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
        <Icon name="add-outline" type="ionicon" color="white" size={40} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    left: -2,
    height: 50,
    borderRadius: 27,
    backgroundColor: '#E94F37',
  },
  buttonIcon: {
    fontSize: 16,
    color: '#F6F7EB',
  },
});
