import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

import {Alert, Platform} from 'react-native';
const configure = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    onNotification: function (notification) {
      // process the notification
      // required on iOS only
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

const localNotification = () => {
  //  PushNotification.requestPermissions();
  PushNotification.localNotification({
    title: 'Notification Title',
    message: 'Notification Message',
  });
};

export {
  configure,
  localNotification,
  receiveRemoteNotificationForeground,
  receiveRemoteNotificationBackground,
};
