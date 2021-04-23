import * as React from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Title, TextInput, Button} from 'react-native-paper';

import * as API from '../lib/api';
import {AuthContext} from "../lib/AuthContext"; 

export default function Profile(props){

    const {session} = React.useContext(AuthContext);
    const [clientData, setClientData] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        try
        {
            GetData();
        }catch(e)
        {
            alert("CLOUD ERROR \n An error occurred while fetching profile data.");
            props.navigation.navigate('mainMenu');   
        }
    }, [session]);

    const GetData = async() =>
    {
         try{
            var result = await API.clientData(session.client_id);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert("CLOUD ERROR \n An error occurred while fetching profile data.");
            props.navigation.navigate('mainMenu');   
            return;
        }
        setClientData(result.data);
        setLoading(false);

    }

    React.useEffect(() =>
    {
        //setLoading(false);
    }, [clientData]);

  return (
    <>
        {loading &&
            (
                <>
                    <Title
                        style=
                        {{
                            color: '#3973E5',
                            textAlign: 'center'
                        }}
                    >
                        Loading data
                    </Title>
                    <ActivityIndicator size="large" color="#3973E5" style={{paddingTop:16}}/>
                </>
            )
        }

        <ScrollView
            style={{
                backgroundColor: '#DBE5FA',
                display: (loading ? 'none' : 'flex'),
            }}
        >

            <View>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 12,
                        }}
                >
                    <Title>
                        Contact Information
                    </Title>
                </View>

                <TextInput
                    style={{backgroundColor: '#FFFFFF'}}
                    editable={false}
                    label="First Name"
                    value={clientData?.[2]}
                />

                <TextInput
                    style={{backgroundColor: '#FFFFFF'}}
                    editable={false}
                    label="Last Name"
                    value={clientData?.[3]}
                />

                <TextInput
                    style={{backgroundColor: '#FFFFFF'}}
                    editable={false}
                    label="B.S.N."
                    value={clientData?.[4]}
                />

                <TextInput
                    style={{backgroundColor: '#FFFFFF'}}
                    editable={false}
                    label="Phone Number"
                    value={clientData?.[5]}
                />

            </View>

            <View>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 12,
                        }}
                >
                    <Title>
                        Address Information
                    </Title>
                </View>

                <TextInput
                    style={{backgroundColor: '#FFFFFF'}}
                    editable={false}
                    label="Address"
                    value={clientData?.[11]}
                />

                <TextInput
                    style={{backgroundColor: '#FFFFFF'}}
                    editable={false}
                    label="City"
                    value={clientData?.[12]}
                />

                <TextInput
                    style={{backgroundColor: '#FFFFFF'}}
                    editable={false}
                    label="State"
                    value={clientData?.[13]}
                />

                <TextInput
                    style={{backgroundColor: '#FFFFFF'}}
                    editable={false}
                    label="Zip"
                    value={clientData?.[14]}
                />

            </View>

            <View
                style={{margin:12}}
            >
                <Button
                    mode='contained'
                    style={{borderRadius:12}}
                >
                    Request Changes
                </Button>
            </View>

        </ScrollView>
    </>
  );
}