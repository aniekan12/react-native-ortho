import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { Ortho } from 'react-native-ortho';


export default function App() {

  const config = {
    'short-url':'<your-short-url>',
    'amount':100000
  }

  const onCallback = (e: { serviceResponse: any; orthoMeta: any }) => {
      console.log(">>>>>>>>on package",e)
  }

  return (
    <View style={styles.container}>
      <Ortho.Community
        slug={'ortho-okra-short-url'}
        config={config}
        color={'blue'}
        callback={
          (e: any) => onCallback(e)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
