import * as React from 'react';
import { ScrollView, View, ActivityIndicator} from 'react-native';
import {Title, Button, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {AuthContext} from '../../lib/AuthContext'; 
import * as API from '../../lib/api';
import { WebView } from 'react-native-webview';

import Viwer from './Viwer';
import Mail from './Mail';

export default function CertificatesHistory(props){

    const {session} = React.useContext(AuthContext);

    const [loading, isLoading] = React.useState(true);
    const [certificates, setCertificates] = React.useState([]);
    const [searchCrt, setSearchCrt] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [selected, setSelected] = React.useState(-1);
    const [PdfID, setID] = React.useState(0);
    const [viwer, showViwer] = React.useState(false);
    const [mailer, showMailer] = React.useState(false);

    function HistoryButton (props)
    {
        const [show, setShow] = React.useState(props.onShow);

        const shown = async() =>
        {
            setShow(!show);

            if(!show)
            {
                props.onSelected();
            }
        }

        return(
            <>

            <View
                style=
                {{
                    flexDirection:'row',
                    alignItems:'center'
                }}
            >
                <Text
                    style=
                    {{
                        borderRightColor:'#3973E5',
                        borderRightWidth:1,
                        padding:4,
                        width: '60%',
                        fontSize: 15,
                    }}
                    numberOfLines={1}
                >
                    {props.name}
                </Text>

                <Text
                    style=
                    {{
                        borderRightColor:'#3973E5',
                        borderRightWidth:1,
                        padding:4,
                        width: '30%',
                        textAlign: 'center',
                        fontSize: 15,
                    }}
                >
                    {props.date}
                </Text>

                <Button
                    icon='menu'
                    onPress={shown}
                >
                </Button>

            </View>

            {show &&
            <>
                <Title
                    style=
                    {{
                        textAlign: 'center',
                        fontSize: 15,
                        backgroundColor: '#A5C0F3'
                    }}
                >
                    ACTIONS
                </Title>

                <View
                    style=
                    {{
                        flex:1,
                        flexDirection:'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        paddingHorizontal: 6,
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
                        icon='eye'
                        onPress={props.onPreview}
                    >
                        Preview
                    </Button>

                    <Button
                        style=
                        {{
                            borderRadius:24,
                            borderColor: '#3973E5',
                            borderWidth: 1,
                        }}
                        icon='email-send'
                        onPress={props.onEmail}
                    >
                        E-mail It
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

    React.useEffect(()=>{
        if(search)
        {
            return;
        }

        loadCertificates();
    },[])

    React.useEffect(() => {
        if(!search)
        {
            setSearchCrt(certificates);
            return;
        }

        filterCertificates();
    }, [search]);

    const filterCertificates = async() => 
    {
        var bComp = certificates.filter(data => data[2].split('\n')[0].toLowerCase().includes(search.toLowerCase()));
        var bDate = certificates.filter(data => data[3].toLowerCase().includes(search.toLowerCase()));

        var raw = bComp.concat(bDate);

        setSearchCrt([...new Set(raw)]);
    }

    const loadCertificates = async() =>
    {
        try
        {
            var crts = await API.clientCertificates(session.client_id);
        }
        catch(e)
        {   
            crts = undefined;
        }

        if(crts == undefined)
        {
            console.log("ERROR loading certificates");
            return;
        }

        var tmpArray = [];
        for(var x = 0; x < Object.keys(crts.certificates).length; x++)
        {
            if(crts.certificates[x][5] == session.user_id)
            {
                tmpArray.push(crts.certificates[x]); 
            }
        }
        crts.certificates = tmpArray;

        setCertificates(crts.certificates);
        setSearchCrt(crts.certificates);
        isLoading(false);
    }

    const handleEmail = async(cid) =>
    {
        showMailer(true);
        setID(cid);
    }

    const handlePreview = async(cid) =>
    {
        showViwer(true);
        setID(cid);
    }

    const closeEmail = () =>
    {
        showMailer(false);
        setID(0);
    }

    const closeView = () =>
    {
        showViwer(false);
        setID(0);
    }

    const handleSelected = (id) =>
    {
        setSelected(id);
    }
     
  return (
    <>
        {viwer &&
        (
            <Viwer
                pid={PdfID}
                onClose={closeView}
            />
        )}
        
        {mailer &&
        (
            <Mail
                pid={PdfID}
                onClose={closeEmail}
            />
        )}
        
        <View
            style=
            {{
                backgroundColor: '#DBE5FA',
            }}
        >

           <TextInput
                style=
                {{
                    margin: 8
                }}
                value={search}
                onChangeText={text => setSearch(text)}
                mode='outlined'
                label='Search by Company or Date'
            />

            {/* 
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

            </View> */}

            <Title
                style=
                {{
                    textAlign:'center',
                    fontSize:15,
                }}
            >
                Generated Certificates
            </Title>

            <View
                style=
                {{
                    flexDirection:'row',
                    backgroundColor:'#3973E5'
                }}
            >
                <Text
                    style=
                    {{
                        borderRightColor:'white',
                        borderRightWidth:1,
                        padding:4,
                        width: '60%',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 15,
                    }}
                >
                    Company
                </Text>

                <Text
                    style=
                    {{
                        borderRightColor:'white',
                        borderRightWidth:1,
                        padding:4,
                        width: '30%',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 15,
                    }}
                >
                    Creation Date
                </Text>

                <Text
                    style=
                    {{
                        borderRightColor:'white',
                        width: '10%',
                        padding:4,
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    <Icon name='information' size={20}/>
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
            }}
        >
            
            {loading &&
            (
                <ActivityIndicator size="large" color="#3973E5" style={{paddingTop:16}}/>
            )}

            {searchCrt != undefined && searchCrt.map(data => (
                <HistoryButton 
                    key={data[0]}
                    name={data[2].split('\n')[0]}
                    date={data[3]}
                    onShow={data[0] == selected}
                    onEmail={() => handleEmail(data[0])}
                    onPreview={() => handlePreview(data[0])}
                    onSelected={() => handleSelected(data[0])}
                />
            ))}

        </View>

        </ScrollView>
    </>
  );
}