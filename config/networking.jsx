import {Platform} from 'react-native';
const _ANDROID_AVD_API_HOST = 'http://10.0.2.2:8000';
const _IOS_API_HOST = 'http://127.0.0.1:8000';

function getAPIHost() {
  if (Platform.OS === 'ios') {
    return _IOS_API_HOST;
  } else if (Platform.OS === 'android') {
    return _ANDROID_AVD_API_HOST;
  } else {
    throw 'Platform not supported';
  }
}

export default getAPIHost;
