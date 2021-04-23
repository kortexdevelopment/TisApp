import * as React from 'react';
import { View, Dimensions } from 'react-native';
import {TextInput, Title, Button } from 'react-native-paper';
import * as API from '../lib/api';

const screenHeight =  Dimensions.get('window').height;
const screenWidth =  Dimensions.get('window').width;

export default function Mail(props){

    const [destination, setDestination] = React.useState('');
    const [process, isProcess] = React.useState(false);

    const sendMail = async() =>
    {
        isProcess(true);

        if(![destination].every(Boolean))
        {
            alert('Must input a valid E-mail address');
            isProcess(false);
            return;
        }

        try
        {
            var mail = await API.sendFileMail(destination, props.file);
        }
        catch(e)
        {
            mail = undefined;
        }

        if(mail == undefined || !mail.success)
        {
            alert('Something went wrong while sending email. \nPlease verify your destiation email');
            isProcess(false);
            return;
        }

        alert('Email sended successfully!');
        setDestination('');
        isProcess(false);
    }

    return(
        <>
            <View
                style=
                {{
                    position: 'absolute',
                        width: (screenWidth * 0.75),
                        height: (screenHeight * 0.3),
                        left:(screenWidth * 0.125),
                        top: (screenHeight * 0.1),
                        zIndex: 1,
                        elevation: 12,
                        borderRadius: 24,
                        backgroundColor: '#3973E5'
                }}
            >
               
                <View
                    style=
                    {{
                        width:'100%',
                    }}
                >
                    <Title
                        style=
                        {{
                            color:'#FFFFFF',
                            textAlign:'center',
                        }}
                    >
                        MAIL SENDER
                    </Title>

                    <Button
                        style=
                        {{
                            marginHorizontal: 4,
                            marginVertical: 2
                        }}
                        labelStyle=
                        {{
                            color: 'red'
                        }}
                        onPress={props.onClose}
                    >
                        Close Mail Sender
                    </Button>

                    <TextInput
                        style=
                        {{
                            marginHorizontal: 12,
                            marginVertical: 4,
                            backgroundColor:"#FFFFFF"
                        }}
                        label='Mail to:'
                        placeholder='Mail to:'
                        value={destination}
                        onChangeText={text => setDestination(text)}
                        disabled={process}
                    />

                    <Button
                        style=
                        {{
                            borderColor:'#FFFFFF',
                            borderWidth: 1,
                            borderRadius: 24,
                            marginHorizontal: 4,
                            marginVertical: 2
                        }}
                        labelStyle=
                        {{
                            color: '#FFFFFF'
                        }}
                        onPress={sendMail}
                        disabled={process}
                    >
                        Send E-mail
                    </Button>

                </View>

                
                
            </View>
        </>
    );
}