import * as React from 'react';
import { ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function MainMenu(props){

    const hanldeProfile = () =>
    {
        props.navigation.navigate("profile");
    }

    const handleCertificates = () => 
    {
        props.navigation.navigate("crtMain");
    }

    const handleLibrary = () => 
    {
        props.navigation.navigate("library");
    }

  return (
    <>
        <ScrollView
            style={{backgroundColor: '#DBE5FA'}}
        >

            <Card
                style={{margin:18, borderRadius:24}}
            >
                <Card.Title title="My Profile"/>
                <Card.Cover 
                    style={{height: 80}}
                    source={require('../media/desk001.png')}
                />
                <Card.Actions>
                    <Button
                        onPress={hanldeProfile}
                        style={{
                            borderRadius: 12
                        }}
                    >
                        View Information
                    </Button>
                </Card.Actions>
            </Card>

            <Card
                style={{margin:18, borderRadius:24}}
            >
                <Card.Title title="Certificates"/>
                <Card.Cover 
                    style={{height: 80}}
                    source={require('../media/cert001.jpg')}
                />
                <Card.Actions>
                    <Button
                        onPress={handleCertificates}
                        style={{
                            borderRadius: 12
                        }}
                    >
                        Generate
                    </Button>
                </Card.Actions>
            </Card>

            <Card
                style={{margin:18, borderRadius:24}}
            >
                <Card.Title title="Documentation Library" />
                <Card.Cover 
                    style={{height: 80}}
                    source={require('../media/lib001.jpg')}
                />
                <Card.Actions>
                    <Button
                        style={{
                                borderRadius: 12
                            }}
                        onPress={handleLibrary}
                    >
                        Go to Library
                    </Button>
                </Card.Actions>
            </Card>


        </ScrollView>
    </>
  );
}