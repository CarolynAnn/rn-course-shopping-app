import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ShopNavigator from './navigation/ShopNavigator';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import ordersReducer from './store/reducers/orders';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});
const store = createStore(rootReducer);

export default function App() {
  // do not render anything until fonts are fully loaded
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => {setFontLoaded(true);}} />
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
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
