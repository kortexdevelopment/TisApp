import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import {Appbar, withTheme } from 'react-native-paper';
import {AuthContextProvider} from "./lib/AuthContext"; 

import LogIn from './components/LogIn';
import MainMenu from './components/MainMenu';
import Profile from './components/Profile';
import Library from './components/Library';

import CertificatesMain from './components/certificates/Main';
import CertificatesNew from './components/certificates/New';
import CertificatesRegistered from './components/certificates/Registered';
import CertificatesHistory from './components/certificates/History';

const Stack = createStackNavigator();

const App = (props) => {

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={props.theme?.colors?.primary} />
        <Stack.Navigator
          screenOptions={{
            header: (props) => 
              <Appbar.Header>
                {props.previous && props.scene.descriptor.options.canReturn ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
                <Appbar.Content title={'TIS - ' + props.scene.descriptor.options.title}/>
                {props.scene.descriptor.options.canLogout ? <Appbar.Action color='#CC0000' icon="logout" onPress={() => props.navigation.navigate('login')} /> : null}
              </Appbar.Header>,
          }}
        >
          <Stack.Screen name="login" options={{title: "Log In", canReturn: false, canLogout: false }} component={LogIn}  />
          <Stack.Screen name="mainMenu" options={{title: "Main Menu", canReturn: false, canLogout: true }} component={MainMenu}  />
          <Stack.Screen name="profile" options={{title: "My Profile", canReturn: true, canLogout: true }} component={Profile}  />
          <Stack.Screen name="library" options={{title: "Cloud Library", canReturn: true, canLogout: true }} component={Library}  />

          <Stack.Screen name="crtMain" options={{title: "Certificates", canReturn: true, canLogout: true }} component={CertificatesMain}  />
          <Stack.Screen name="crtNew" options={{title: "Generate Certificate", canReturn: true, canLogout: true }} component={CertificatesNew}  />
          <Stack.Screen name="crtReg" options={{title: "Generate Certificate", canReturn: true, canLogout: true }} component={CertificatesRegistered}  />
          <Stack.Screen name="crtHst" options={{title: "Certificate History", canReturn: true, canLogout: true }} component={CertificatesHistory}  />


        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default withTheme(App);