
# React-Native-Okra-Webview
Official Ortho SDK for React Native/Expo applications. Don't forget to star ✨

### About Ortho
Ortho help you integrate SDK with ease, connect to services like Paystack, Okra, Mono, thePeer, and load more with one integration.

 ## Before getting started
- Checkout our [Ortho-community-checkout](https://github.com/OrthoHQ/ortho-community-checkout) to see service we support and needed configs.
- Can't find a service you need? try contributing to Ortho and make it much awesome [sandbox customer](https://github.com/OrthoHQ/ortho-community-checkout/blob/main/contributing.md)
## Installing

Using npm:

```bash
$ npm install react-native-ortho
```

Using yarn:

```bash
$ yarn add react-native-ortho
```
### you'll also need to install `react-native-webview`, to install run ;

```bash
$ yarn add react-native-webview
```

## Usuage
For React Native based application import it and use
```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  SafeAreaView,
  useColorScheme,
  View,
} from 'react-native';

import { Ortho } from 'react-native-ortho';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
const  config = {
'short-url':'<your-short-url>',
'amount':100000
}
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View  style={{flex:1}}>

        <Ortho.Community
			slug={'ortho-okra-short-url'}
			config={config}
			color={'blue'}
			callback={
			(e: any) =>  onCallback(e)
			}
			/>

      </View>
    </SafeAreaView>
  );
};

export default App;
```


## Okra.community Options

|Name                   | Type           | Required            | Default Value       | Description         |
|-----------------------|----------------|---------------------|---------------------|---------------------|
|  `slug `            | `String`       | true                |     `nill`                | slug for service you want to integrate
|  `config `               | `object`       | true                |    `nill`                 | config of app you intend to integrate
|  `color `             | `String`       | false                |          `yellow`           | color of app
|  `callback `               | `Function`       | true               |`nill`         | callback on event fired


## Thanks & Credits
- [Bob RN package template](https://github.com/callstack/react-native-builder-bob)

## Licensing

This project is licensed under MIT license.
