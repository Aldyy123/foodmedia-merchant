/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {BackHandler, Alert, Platform} from 'react-native';

import {WebView} from 'react-native-webview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = React.createRef();
    this.state = {
      goBack: false,
    };
  }
  backAction = () => {
    if (this.webView && this.state.goBack) {
      this.webView.goBack();
      return true;
    }
    Alert.alert('Tunggu!', 'Kamu yakin ingin keluar dari aplikasi?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.backAction);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }
  }

  render() {
    return (
      <WebView
        source={{
          uri: 'https://foodmedia.id/merchant-login',
        }}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        ref={e => (this.webView = e)}
        onNavigationStateChange={e => this.setState({goBack: e.canGoBack})}
      />
    );
  }
}

export default App;
