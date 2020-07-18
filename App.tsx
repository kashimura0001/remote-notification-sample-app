import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      const enabledStatuses = [
        messaging.AuthorizationStatus.AUTHORIZED,
        messaging.AuthorizationStatus.PROVISIONAL,
      ];
      const authStatus = await messaging().requestPermission();
      const isEnabled = enabledStatuses.includes(authStatus);

      console.log('authorization status:', authStatus);
      if (isEnabled) {
        const remoteNotificationToken = await messaging().getToken();
        console.log('remove notification token:', remoteNotificationToken);
      }
    };
    requestUserPermission();
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp((message) => {
      console.log('onNotificationOpenedApp() :', message);
    });

    messaging()
      .getInitialNotification()
      .then((message) => {
        console.log('getInitialNotification() :', message);
      });
  }, []);

  return (
    <SafeAreaView>
      <Text>通知テスト</Text>
    </SafeAreaView>
  );
};

export default App;
