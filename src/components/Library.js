import * as React from 'react';
import { ScrollView, View, ActivityIndicator , Linking} from 'react-native';
import {Title, Text, TextInput, IconButton} from 'react-native-paper';
import RNBackgroundDownloader from 'react-native-background-downloader';
import FileViewer from 'react-native-file-viewer';

import {AuthContext} from '../lib/AuthContext'; 
import * as API from '../lib/api';
import Mail from './LibraryMail';

export default function Library(props){

    const {session} = React.useContext(AuthContext);

    const [loading, isLoading] = React.useState(true);
    const [library, setLibrary] = React.useState([]);
    const [searchLib, setSearchLib] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [file, setFile] = React.useState('');
    const [mail, showMailer] = React.useState(false);
    const [downloading, isDownloading] = React.useState(true);

    function DocumentButton (props)
    {
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
                        width: '70%',
                        fontSize: 15,
                    }}
                >
                    {props.name}
                </Text>

                <View
                    style=
                    {{
                        padding:4,
                        width: '30%',
                        flexDirection:'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}
                >

                    <IconButton
                        icon='email-send'
                        color='#3973E5'
                        onPress={props.onMail}
                    />

                    <IconButton
                        icon='cloud-download'
                        color='#3973E5'
                        onPress={props.onDownload}
                    />

                </View>

            </View>

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

    const loadLibrary = async() =>
    {
        try
        {
            var lib = await API.clientLibrary(session.client_id);
        }
        catch(e)
        {
            lib = undefined;
        }

        if(lib == undefined)
        {
            console.log("ERROR Loading client library");
            return;
        }

        setLibrary(lib.library);
        setSearchLib(lib.library);
        isLoading(false);
    }

    const filterLibrary = async() =>
    {
        var results = library.filter(data => data[3].toLowerCase().includes(search.toLowerCase()));

        setSearchLib(results);
    }

    React.useEffect(() =>{
        if(search)
        {
            return
        }

        loadLibrary();
    },[]);

    React.useEffect(() =>
    {
        if(!search)
        {
            setSearchLib(library);
            return;
        }

        filterLibrary();

    },[search]);

    const handleEmail = async(_f) =>
    {
        setFile(_f);
        showMailer(true);
    }

    const downloadFile = async(file) =>
    {
        const fileUrl = `https://truckinsurancesolutions.org/system/ready_files/${file}`;
        const fileDest = `${RNBackgroundDownloader.directories.documents}/${file}`;

        let _ = RNBackgroundDownloader.download({
            id: 'file123',
            url: `${fileUrl}`,
            destination: `${RNBackgroundDownloader.directories.documents}/${file}`
        }).begin((expectedBytes) => {
            console.log(`Going to download ${expectedBytes} bytes!`);
        }).progress((percent) => {
            console.log(`Downloaded: ${percent * 100}%`);
        }).done(() => {
            openFile(fileDest);
        }).error((error) => {
            console.log('Download canceled due to error: ', error);
        });


    }

    const openFile = async(p) =>
    {
        const path = p;
        try
        {
            FileViewer.open(path);
        }
        catch(e)
        {
            console.log("ERROR Opening File");
        }
        
    }

    return (
    <>
        {mail &&
        (
            <Mail 
                file={file}
                onClose={() => showMailer(false)}
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
                mode='outlined'
                label='Search Document'
                value={search}
                onChangeText={text => setSearch(text)}
            />

            {/* <Text
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
                Cloud Documents
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
                        width: '70%',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 15,
                    }}
                >
                    Document Name
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
            }}
        >

            {loading &&
            (
                <ActivityIndicator size="large" color="#3973E5" style={{paddingTop:16}}/>
            )}

            {searchLib != undefined && searchLib.map(data =>(
                <DocumentButton 
                    key={data[0]}
                    name={data[3]}
                    onMail={() => handleEmail(data[2])}
                    onDownload={() => downloadFile(data[2])}
                />    
            ))}

        </View>

        </ScrollView>
    </>
  );
}