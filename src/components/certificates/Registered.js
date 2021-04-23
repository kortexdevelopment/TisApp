import * as React from 'react';
import { ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import {Title, Button, Text, List, TextInput, Card} from 'react-native-paper';
import {AuthContext} from '../../lib/AuthContext'; 
import * as API from '../../lib/api';

import Viwer from './Viwer';
import Mail from './Mail';

const screenHeight =  Dimensions.get('window').height;
const screenWidth =  Dimensions.get('window').width;

export default function CertificatesRegistered(props){

    const {session} = React.useContext(AuthContext);
    const [loading, isLoading] = React.useState(true);
    const [companies, setCompanies] = React.useState([]);
    const [searchCo, setSearchCo] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [step, setStep] = React.useState('Registering Company');
    const [complete, isComplete] = React.useState(false);
    const [pdfId, setPdfId] = React.useState(0);

    const [wait, isWaiting] = React.useState(false);
    const [viwer, showViwer] = React.useState(false);
    const [mailer, showMailer] = React.useState(false);

    const loadCompanies = async() => 
    {
        setCompanies([]);
        isLoading(true);
        
        try
        {
            var _cmp = await API.clientCompanies(session.client_id);
        }
        catch(e)
        {
            _cmp = undefined;
        }

        if(_cmp == undefined)
        {
            console.log('ERROR Load Companies');
            return;
        }

        setCompanies(_cmp.companies);
        setSearchCo(_cmp.companies);
        isLoading(false);
    }

    const filterCompanies = async() =>
    {
        try
        {
            var result = companies.filter(data => data[2].toLowerCase().includes(search.toLowerCase()));
            setSearchCo(result);
        }
        catch(e)
        {
            console.log(`ERROR Filtering companies\n${e}`);
        }
        console.log(companies);
    }  

    React.useEffect(() => {
        if(search)
        {
            return;
        }

        loadCompanies();
    }, []);

    React.useEffect(() => {
        if(!search)
        {
            setSearchCo(companies);
            return;
        }

        filterCompanies();

    }, [search]);

    const handleDelete = async(cid) =>
    {
        try
        {
            var deleted = await API.deleteCompany(cid);
        }
        catch(e)
        {
            deleted = undefined;
        }

        if(deleted == undefined || !deleted.success)
        {
            alert("Something went wrong deleting this company. \nPlease try again");
            return;
        }
        
        alert("Company deleted successfully");
        loadCompanies();
    }

    const handleCreate = async(cid) =>
    {
        isWaiting(true);
        setStep('Registering Certificate Log');
        isComplete(false);

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
            isComplete(true);
            return;
        }

        var pid = loggin.lid;
        setStep('Creating Certificate PDF');

        try
        {
            var pdf = await API.createCertPdf(pid);
        }catch(e)
        {
            pdf = undefined;
        }

        if(pdf == undefined)
        {
            alert('Error \nSomething went wrong while creating PDF file. \nPlease try again in "For Registered Company" screen');
            isComplete(true);
            return;
        }
        
        setPdfId(pid);
        isComplete(true);
    }

    const handleFinish = async() =>
    {
        isWaiting(!wait);
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

    function CompanyButton (props)
    {
        const [show, setShow] = React.useState(false);

        const shown = () =>
        {
            setShow(!show);
        }

        return(
            <>
            <View
                style=
                {{
                    flex:2,
                    flexDirection:'row',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    zIndex:0,
                }}
            >

                
                <Text
                    style=
                    {{
                        width:'70%',
                        fontSize:17,
                    }}
                >
                    {props.name}
                </Text>

                <Button
                    onPress={shown}
                    style=
                    {{
                        margin:2,
                        marginHorizontal: 6,
                        borderRadius:24,
                        backgroundColor: '#3973E5',
                    }}
                    
                    labelStyle=
                    {{
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize:10,
                    }}

                    icon={show ? 'eye-off' : 'eye'}
                >
                    {show ? 'HIDE INFO' : 'SHOW INFO'}
                </Button>
            </View>

            {show &&
            <>
                <List.Accordion
                    title="Address Information"
                    style=
                    {{
                        backgroundColor:'#A5C0F3',
                        marginHorizontal: 8,
                    }}
                >
                    <List.Item 
                        style=
                        {{
                            backgroundColor:'#FFFFFF',
                            marginHorizontal: 8,
                        }}
                        title={props.street}
                        description="Street"
                    />

                    <List.Item 
                        style=
                        {{
                            backgroundColor:'#FFFFFF',
                            marginHorizontal: 8,
                        }}
                        title={props.city}
                        description="City"
                    />

                    <List.Item 
                        style=
                        {{
                            backgroundColor:'#FFFFFF',
                            marginHorizontal: 8,
                        }}
                        title={props.state}
                        description="State"
                    />

                    <List.Item 
                        style=
                        {{
                            backgroundColor:'#FFFFFF',
                            marginHorizontal: 8,
                            borderBottomEndRadius: 24,
                            borderBottomStartRadius: 24,
                        }}
                        title={props.zip}
                        description="ZIP"
                    />

                </List.Accordion>
            
                <View
                    style=
                    {{
                        flex:1,
                        flexDirection:'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                    }}
                >
                    <Button
                        style=
                        {{
                            borderRadius:24,
                            borderColor: '#3973E5',
                            borderWidth: 1,
                        }}
                        icon='file-document'
                        onPress={props.onGenerate}
                    >
                        GENERATE
                    </Button>

                    <Button
                        style=
                        {{
                            borderRadius:24,
                            borderColor: '#FF0000',
                            borderWidth: 1,
                        }}
                        labelStyle=
                        {{
                            color:'#FF0000'
                        }}
                        icon='trash-can'
                        onPress={props.onDelete}
                    >
                        DELETE
                    </Button>

                </View>
            </>
            }

            <View
                style=
                {{
                    borderBottomWidth: 2,
                    borderColor:'#3973E5',
                }}
            />
            </>
        );
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

        {wait && 
        (
            <Card
                style=
                {{
                    position: 'absolute',
                    width: (screenWidth * 0.95),
                    height: (screenHeight * 0.25),
                    left:(screenWidth * 0.025),
                    top: (screenHeight * 0.3),
                    zIndex: 1,
                    elevation: 12,
                    borderRadius: 24,
                    backgroundColor: '#FFFFFF'
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
                        color: '#3973E5'
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
                            color: '#3973E5'
                        }}
                    >
                        {step}
                    </Text>

                    <ActivityIndicator size="large" color="#3973E5" style={{paddingTop:16}}/>
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
                        color: '#3973E5'
                    }}
                    >
                        YOUR CERTIFICATE IS READY
                    </Text>

                    <View>
                        <Button
                            style=
                            {{
                                borderColor:'#3973E5',
                                borderWidth: 1,
                                borderRadius: 24,
                                marginHorizontal: 4,
                                marginVertical: 2
                            }}
                            labelStyle=
                            {{
                                color: '#3973E5'
                            }}
                            onPress={handleView}
                        >
                            View PDF
                        </Button>
                        <Button
                            style=
                            {{
                                borderColor:'#3973E5',
                                borderWidth: 1,
                                borderRadius: 24,
                                marginHorizontal: 4,
                                marginVertical: 2
                            }}
                            labelStyle=
                            {{
                                color: '#3973E5'
                            }}
                            onPress={handleEmail}
                        >
                            Send via E-mail
                        </Button>
                        <Button
                            style=
                            {{
                                borderColor:'#3973E5',
                                borderWidth: 1,
                                borderRadius: 24,
                                marginHorizontal: 4,
                                marginVertical: 2
                            }}
                            labelStyle=
                            {{
                                color: '#3973E5'
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

        <View
            style=
            {{
                backgroundColor: '#DBE5FA',
            }}
        >
            
            <Title
                style=
                {{
                    textAlign:'center',
                }}
            >
                Certificate For Registered Company
            </Title>

            <TextInput
                style=
                {{
                    margin: 8
                }}
                mode='outlined'
                label='Search Company'
                value={search}
                onChangeText={text => setSearch(text)}
            />

            {/* TODO
            <Text 
                style=
                {{
                    paddingLeft: 8
                }}
            >
                Results Shown: 
            </Text>

            <View
                style=
                {{
                    flexDirection:'row',
                    justifyContent: 'space-evenly',
                    marginHorizontal:8
                }}
            >
                <Button 
                    mode='outlined'
                    style=
                    {{
                        backgroundColor:'#3973E5',
                        borderRadius: 24,
                        flexGrow:1,
                        marginHorizontal:2,
                    }}
                    labelStyle=
                    {{
                        color:'#FFFFFF'
                    }}
                >
                    10
                </Button>

                <Button 
                    mode='outlined'
                    style=
                    {{
                        backgroundColor:'#FFFFFF',
                        borderRadius: 24,
                        flexGrow:1,
                        marginHorizontal:2,
                    }}
                    labelStyle=
                    {{
                        color:'black'
                    }}
                >
                    25
                </Button>

                <Button 
                    mode='outlined'
                    style=
                    {{
                        backgroundColor:'#FFFFFF',
                        borderRadius: 24,
                        flexGrow:1,
                        marginHorizontal:2,
                    }}
                    labelStyle=
                    {{
                        color:'black'
                    }}
                >
                    50
                </Button>

                <Button 
                    mode='outlined'
                    style=
                    {{
                        backgroundColor:'#FFFFFF',
                        borderRadius: 24,
                        flexGrow:1,
                        marginHorizontal:2,
                    }}
                    labelStyle=
                    {{
                        color:'black'
                    }}
                >
                    100
                </Button>

            </View> 
            */}

            <Title
                style=
                {{
                    textAlign:'center',
                    fontSize:15,
                }}
            >
                Registered Companies
            </Title>

            <View
                style=
                {{
                    flexDirection:'row',
                    backgroundColor:'#3973E5',
                    zIndex:0
                }}
            >
                <Text
                    style=
                    {{
                        borderRightColor:'white',
                        borderRightWidth:1,
                        padding:4,
                        width: '70%',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 15,
                    }}
                >
                    Company Name
                </Text>

                <Text
                    style=
                    {{
                        padding:4,
                        width: '30%',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 15,
                    }}
                >
                    Actions
                </Text>

            </View>

        </View>

        <ScrollView
            style=
            {{
                backgroundColor: '#DBE5FA',
            }}
        >

        <View
            style=
            {{
                marginBottom: 12,
                zIndex:0,
            }}
        >
            {loading &&
            (
                <ActivityIndicator size="large" color="#3973E5" style={{paddingTop:16}}/>
            )}

            {searchCo != undefined && searchCo.map(data => (
                <CompanyButton 
                    key={data[0]}
                    onGenerate={() => handleCreate(data[0])}
                    onDelete={() => handleDelete(data[0])}
                    name={data[2]} 
                    address={data[3]} 
                    street={data[3].split('::')[0]} 
                    city={data[3].split('::')[1]} 
                    state={data[3].split('::')[2]} 
                    zip={data[3].split('::')[3]}/>
            ))}

        </View>

        </ScrollView>
    </>
  );
}