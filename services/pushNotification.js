import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {navigate} from './navigateWithoutProps';
const configure = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
      if (notification.action === 'OK') {
        navigate('Home');
      }
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    senderID: 'YOUR GCM SENDER ID',

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    // requestPermissions: Platform.OS === 'ios',
    requestPermissions: true,
  });
};

const receiveRemoteNotificationForeground = () => {
  messaging().onMessage(async (remoteMessage) => {
    PushNotification.localNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
  });
};

const receiveRemoteNotificationBackground = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    PushNotification.localNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
  });
};

const localNotification = (title, message, onPress) => {
  //  PushNotification.requestPermissions();
  PushNotification.localNotification({
    title: title,
    message: message,
    actions: ['OK', 'Cancel'],
    invokeApp: false,
  });
};

export {
  configure,
  localNotification,
  receiveRemoteNotificationForeground,
  receiveRemoteNotificationBackground,
};
