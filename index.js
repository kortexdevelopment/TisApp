/**
 * @format
 */
 import * as React from 'react';
 import {AppRegistry} from 'react-native';
 import App from './src/app';
 import {name as appName} from './app.json';
 import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
 
 const theme = {
   ...DefaultTheme,
   roundness: 2,
   colors: {
     ...DefaultTheme.colors,
     primary: '#3973E5',
     contrast: '#A5C0F3',
   },
 };
 
 export default function Main() {
   return (
     <PaperProvider theme={theme}>
       <App />
     </PaperProvider>
   );
 }
 
 AppRegistry.registerComponent(appName, () => Main);
 