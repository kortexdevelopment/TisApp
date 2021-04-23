import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext(null);

const defaultSession = {
  loggedIn: false,
  user_id: null,
  user_email: null,
  client_id: null,
  client_email: null,
}

export function AuthContextProvider (props) {
  const KEYNAME = '@tisappmobile:auth';

  const [session, setSession] = React.useState(defaultSession);

  React.useEffect(() => {
    (async function restoreSessionFromDisk(){
      try {
        const sessionFromDiskString = await AsyncStorage.getItem(KEYNAME);
        const sessionFromDiskObject = JSON.parse(sessionFromDiskString || JSON.stringify(defaultSession));
        setSession(sessionFromDiskObject);
      }catch (e) {
        console.warn(e);
        setSession(defaultSession);
      }
    })();
  }, []);

  const saveSession = async(session) => {
    try {
      setSession(session);
      await AsyncStorage.setItem(KEYNAME, JSON.stringify(session));
    }catch (e) {
      console.warn("setSession error: ", e);
    }
  }

  const logIn = async(user_id, user_email, client_id, client_email) => {
    const loggedInSession = {
      loggedIn: true,
      user_id: user_id,
      user_email: user_email,
      client_id: client_id,
      client_email: client_email,
    }
    saveSession(loggedInSession);
  }

  const logOut = async() => {
    const loggedOutSession = {
      ...defaultSession,
      user_email: user_email,
    }
    saveSession(loggedOutSession);
  }

  const contextAPI = {
    session,
    logIn,
    logOut
  };

  return (
    <AuthContext.Provider value={contextAPI}>
      {props.children}
    </AuthContext.Provider>
  );

}