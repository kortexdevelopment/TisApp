import * as React from 'react';
import { SafeAreaView, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import * as API from '../lib/api';
import {AuthContext} from "../lib/AuthContext"; 

export default function LogIn(props){
    
    const {session, logIn} = React.useContext(AuthContext);
    const [user,setUser] = React.useState('');
    const [pass, setPass] = React.useState('');

    const [searchComplete, setSearchComplete] = React.useState(true);

    React.useEffect(() => {
        setUser(session.user_email);
    }, [session]);

    React.useEffect(() => {
        if(!session.loggedIn)
        {
            return;
        }

        setPass('');
    }, [session]);

    const handleLogin = async () => {
        
        setSearchComplete(false);

        if(!user || !pass)
        {
            alert("Invalid User/Password combination.\nPlease check your credentials");
            setSearchComplete(true);
            return;
        }

        try
        {
            var loginResult = await verifyLogin();
        }catch(e)
        {
            loginResult = undefined;
        }

        if(loginResult === undefined){
            //show modal errir app
            alert("Ups.. \nThere is problem with our cloud, try again later.");
            setSearchComplete(true);
            return;
        }

        setSearchComplete(true);

        if(loginResult.error)
        {
            alert("Invalid User/Password combination.\nPlease check your credentials");
            return;
        }

        try
        {
            await logIn(loginResult.user, user, loginResult.client, loginResult.email);
        }catch(e)
        {
            alert("Ups.. \nThere is problem with session, try again.");
            return;
        }

        props.navigation.navigate('mainMenu');   

    }

    const verifyLogin = async () => {
        try{
            var result = await API.verifyLogin(user, pass);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            return undefined;
        }

        return result;
    }

  return (
    <>
        <SafeAreaView>
        </SafeAreaView>
        <ScrollView
            style={{backgroundColor: '#DBE5FA'}}
        >
        <View
        style={{
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <View style={{
                width: 290,
                height: 250,
                }}>

                <Image
                    source={require('../media/logo.png')}
                    style={{
                        height: 300,
                        width: "100%",
                    }}
                    resizeMode='contain'
                />

            </View>

            <View style={{
                width: 290,
                marginBottom: 20
                }}>

                <TextInput
                    mode="outlined"
                    label="User"
                    value={user}
                    disabled={!searchComplete}
                    onChangeText={text => setUser(text)}
                />

                <TextInput
                    mode="outlined"
                    label="Password"
                    value={pass}
                    disabled={!searchComplete}
                    secureTextEntry={true}
                    onChangeText={text => setPass(text)}
                />

            </View>
            
            

            <View 
                style={{
                width: 290,
                }}
            >
                {
                    searchComplete && (
                        <Button 
                        mode="contained" 
                        onPress={handleLogin}
                        disabled={!searchComplete}
                        contentStyle={{paddingTop: 8, paddingBottom: 8}}
                        style={{borderRadius: 24,}}
                        >
                        Log In
                        </Button>
                    )
                }   
                
            </View>

            {
                !searchComplete && (
                <ActivityIndicator size="large" color="#3973E5" style={{paddingTop:16}}/>
                )
            }

        </View>
        </ScrollView>
    </>
  );
}