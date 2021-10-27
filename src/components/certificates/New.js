import * as React from 'react';
import { ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import {TextInput, Title, Button, Card, Text} from 'react-native-paper';
import {AuthContext} from '../../lib/AuthContext'; 
import * as API from '../../lib/api';

import Viwer from './Viwer';
import Mail from './Mail';

const screenHeight =  Dimensions.get('window').height;
const screenWidth =  Dimensions.get('window').width;

export default function CertificatesNew(props){

    const {session} = React.useContext(AuthContext);

    const [wait, isWaiting] = React.useState(false);
    const [generate, noGenerate] = React.useState(false);
    const [complete, isComplete] = React.useState(false);
    const [viwer, showViwer] = React.useState(false);
    const [mailer, showMailer] = React.useState(false);

    const [pdfId, setPdfId] = React.useState(0);

    const [step, setStep] = React.useState('Registering Company');
    const [name, setName] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zip, setZip] = React.useState('');

    const handleCreate = async() =>
    {
        isWaiting(true);
        noGenerate(true);

        setStep('Registering Company');

        if(![session.client_id].every(Boolean))
        {
            alert('Something whent wrong retriving your session acces.\n Please try again.');
            isWaiting(false);
            noGenerate(true);
            return;
        }

        if(![name, street, city, state, zip].every(Boolean))
        {
            alert('All fields are requiered.\nPlease verify your inputs.');
            isWaiting(false);
            noGenerate(true);
            return;
        }

        try
        {
            var creating = await API.createCompany(session.client_id, name, street, city, state, zip);
        }catch(e)
        {
            creating = undefined;
        }

        if(creating == undefined || creating.error)
        {
            alert(`An Error ocurred during company registration\n${creating != undefined ? creating.error : ''}`);
            isWaiting(false);
            noGenerate(true);
            return;
        }

        var cid = creating.lid;

        setStep('Registering Certificate Log');

        try
        {
            var loggin = await API.createCertLog(cid);
        }catch(e)
        {
            loggin = undefined;
        }

        if(loggin == undefined || loggin.error)
        {
            alert('Error \nSomething went wrong while creating Certificate log. \nPlease try again in "For Registered Company" screen');
            clearInputs();
            return;
        }

        var pid = loggin.lid;
        setStep('Creating Certificate PDF');

        try
        {
            var pdfCreation = await API.byPassPdfCreation(pid);
            if(pdfCreation)
                var pdf = await API.byPassPdf(pid);
        }catch(e)
        {
            pdf = undefined;
        }

        if(pdf == undefined)
        {
            alert('Error \nSomething went wrong while creating PDF file. \nPlease try again in "For Registered Company" screen');
            clearInputs();
            return;
        }
        
        setPdfId(pid);
        isComplete(true);
    }

    const clearInputs = async() =>
    {
        isWaiting(false);
        isComplete(false);
        noGenerate(false);
        setPdfId(0);
        setName('');
        setStreet('');
        setCity('');
        setState('');
        setZip('');
    }

    const handleFinish = async() =>
    {
        clearInputs();
    }

    const handleEmail = async() =>
    {
        showMailer(!mailer);
        isWaiting(!wait);
    }

    const handleView = async() =>
    {
        showViwer(!viwer);
        isWaiting(!wait);
    }

  return (
    <>
        {viwer &&
        (
            <Viwer
                pid={pdfId}
                onClose={handleView}
            />
        )}
        
        {mailer &&
        (
            <Mail
                pid={pdfId}
                onClose={handleEmail}
            />
        )}

        <ScrollView
            style={{backgroundColor: '#DBE5FA'}}
        >

        <View>
            
            

            {wait && 
            (
                <Card
                    style=
                    {{
                        position: 'absolute',
                        width: (screenWidth * 0.75),
                        height: (screenHeight * 0.25),
                        left:(screenWidth * 0.125),
                        top: (screenHeight * 0.3),
                        zIndex: 1,
                        elevation: 12,
                        borderRadius: 24,
                        backgroundColor: '#3973E5'
                    }}
                >
                    {!complete &&
                    (
                        <>
                        <Text
                        style=
                        {{
                            textAlign:'center',
                            paddingTop: 25,
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#FFFFFF'
                        }}
                        >
                            PROCESSING CERTIFICATE
                        </Text>
                        <Text
                            style=
                            {{
                                textAlign:'center',
                                paddingTop: 25,
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#FFFFFF'
                            }}
                        >
                            {step}
                        </Text>

                        <ActivityIndicator size="large" color="#FFFFFF" style={{paddingTop:16}}/>
                        </>
                    )}
                    
                    {complete &&
                    (
                        <>
                        <Text
                        style=
                        {{
                            textAlign:'center',
                            paddingTop: 10,
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#FFFFFF'
                        }}
                        >
                            YOUR CERTIFICATE IS READY
                        </Text>

                        <View>
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
                                onPress={handleView}
                            >
                                View PDF
                            </Button>
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
                                onPress={handleEmail}
                            >
                                Send via E-mail
                            </Button>
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
                                onPress={handleFinish}
                            >
                                Finish
                            </Button>
                        </View>

                        </>
                    )}

                </Card>
            )}

            <Title
                style=
                {{
                    textAlign:'center',
                    borderColor: '#3973E5',
                    borderBottomWidth: 2
                }}
            >
                Certificate For New Company
            </Title>

            <Title
                style=
                {{
                    textAlign:'center',
                    fontSize: 15,
                }}
            >
                Holder / Company Info
            </Title>

            <TextInput
                style=
                {{
                    margin:12,
                    backgroundColor:'#FFFFFF'
                }}
                disabled={generate}
                label='Name'
                value={name}
                onChangeText={text => setName(text)}
            />

            <Title
                style=
                {{
                    textAlign:'center',
                    fontSize: 15,
                }}
            >
                Holder / Company Address
            </Title>

            <TextInput
                style=
                {{
                    margin:12,
                    backgroundColor:'#FFFFFF'
                }}
                disabled={generate}
                label='Street'
                value={street}
                onChangeText={text => setStreet(text)}
            />

            <TextInput
                style=
                {{
                    margin:12,
                    backgroundColor:'#FFFFFF'
                }}
                disabled={generate}
                label='City'
                value={city}
                onChangeText={text => setCity(text)}
            />

            <TextInput
                style=
                {{
                    margin:12,
                    backgroundColor:'#FFFFFF'
                }}
                disabled={generate}
                label='State'
                value={state}
                onChangeText={text => setState(text)}
            />

            <TextInput
                style=
                {{
                    margin:12,
                    backgroundColor:'#FFFFFF'
                }}
                disabled={generate}
                label='ZIP'
                value={zip}
                onChangeText={text => setZip(text)}
            />

            <View
                style={{
                    margin:12,
                    zIndex: 0,
                }}
            >
                <Button
                    mode='contained'
                    style=
                    {{
                        borderRadius:12,
                    }}
                    onPress={handleCreate}
                    disabled={generate}
                >
                    GENERATE CETIFICATE
                </Button>
                
            </View>

        </View>

        </ScrollView>
    </>
  );
}