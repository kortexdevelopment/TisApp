import * as React from 'react';
import { ScrollView, View } from 'react-native';
import {Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function CertificatesMain(props){

    const menuSelect = (index) =>
    {
        switch(index)
        {
            case 1:
                props.navigation.navigate("crtNew");
                break;
            case 2:
                props.navigation.navigate("crtReg");
                break;
            case 3:
                props.navigation.navigate("crtHst");
                break;
        }
    }

  return (
    <>
        <ScrollView
            style={{backgroundColor: '#DBE5FA'}}
        >

        <View
            style=
            {{
            }}
        >
            <View
                style=
                {{
                    margin:24,
                    marginVertical:12,
                }}
            >
                <Icon.Button
                    name='account-plus'
                    size={50}
                    borderRadius={12}
                    onPress={() => menuSelect(1)}
                    backgroundColor='#FFFFFF'
                    color='#3973E5'
                    style=
                    {{
                        borderWidth:4,
                        borderColor: '#CCD2D6',
                    }}
                >
                    <Text
                        style=
                        {{
                            fontSize:20,
                            textAlign: 'center',
                            color:'#3973E5',
                            width:'75%'
                        }}
                    >
                        For New Company
                    </Text>

                </Icon.Button>

            </View>

            <View
                style=
                {{
                    margin:24,
                    marginVertical:12,
                }}
            >
                <Icon.Button
                    name='account-group'
                    size={50}
                    borderRadius={12}
                    onPress={() => menuSelect(2)}
                    backgroundColor='#FFFFFF'
                    color='#3973E5'
                    style=
                    {{
                        borderWidth:4,
                        borderColor: '#CCD2D6',
                    }}
                >
                    <Text
                        style=
                        {{
                            fontSize:20,
                            textAlign: 'center',
                            color:'#3973E5',
                            width:'75%',
                        }}
                    >
                        For Registered Company
                    </Text>
                    
                </Icon.Button>

            </View>

            <View
                style=
                {{
                    margin:24,
                    marginVertical:12,
                }}
            >
                <Icon.Button
                    name='file-multiple'
                    size={50}
                    borderRadius={12}
                    onPress={() => menuSelect(3)}
                    backgroundColor='#FFFFFF'
                    color='#3973E5'
                    style=
                    {{
                        borderWidth:4,
                        borderColor: '#CCD2D6',
                    }}
                >
                    <Text
                        style=
                        {{
                            fontSize:20,
                            textAlign: 'center',
                            color:'#3973E5',
                            width:'75%'
                        }}
                    >
                        Certificate History
                    </Text>
                    
                </Icon.Button>

            </View>

        </View>

        </ScrollView>
    </>
  );
}