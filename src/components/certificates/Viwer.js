import PDFView from 'react-native-view-pdf';
import * as React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

export default function Viwer(props)
{
    return(
        <>
            <View
                style=
                {{
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#DBE5FA'
                }}
            >
               
                <View
                    style=
                    {{
                        width:'100%',
                    }}
                >
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
                        Close PDF Preview
                    </Button>
                </View>

                <PDFView
                    fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    enableAnnotations={true}
                    resource={`https://truckinsurancesolutions.org/system/ready_files/certs/cert${props.pid}.pdf`}
                    resourceType='url'
                    onLoad={() => console.log(`PDF rendered from url`)}
                    onError={(error) => console.log('Cannot render PDF', error)}
                />
                
            </View>
        </>
    );
}