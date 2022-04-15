import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert, ColorPropType } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

export interface CommunityProps {
    color?: string;
    enterprise?: boolean;
    slug: string;
    config: {};
    callback: (e: callbackProps) => void;
}

export type callbackProps = { callback: string; response: { serviceResponse: any; orthoMeta: any } }

export default function Community(props: CommunityProps) {
    const [isLoading, setisLoading] = useState(true);
    const [toggleModal, setToggleModal] = useState(true);
    const [htmlRaw, setHtmlRaw] = useState(null);

    const { slug, config, color, callback, enterprise } = props;

    const orthoCommunityBaseUrl = `https://ortho-server.herokuapp.com/v1/sdk/boot-json/ortho-flow/${slug}/${JSON.stringify(config)}`;
    const orthoEnterpriseBaseUrl = `https://ortho-server.herokuapp.com/v1/sdk/boot-enterprise-json/ortho-flow/${slug}/${JSON.stringify(config)}`;

    useEffect(() => {
        fetch(enterprise ? orthoEnterpriseBaseUrl : orthoCommunityBaseUrl)
            .then((response) => response.json())
            .then((json) => {
                const { body, ok } = json;
                if (ok) {
                    setHtmlRaw(body)
                    setToggleModal(true)
                } else {
                    alert('seems like something went wrong')
                }

            })
            .catch((error) => {
                alert(`error: ${error}`);
            });


    }, [slug, config, color, enterprise])

    const messageReceived = (response: any) => {
        callback && callback(response)

    }

    const onTransactionClose = () => {
        setToggleModal(false)
    }


    const onTransactionCloseConfirmation = () => {
        Alert.alert(
            "End Transaction",
            "You are about to end this transaction, Are you sure you want to do this?",
            [
                {
                    text: "No",
                    onPress: () => onTransactionClose()
                },
                {
                    text: "Yes",
                    onPress: () => { onTransactionClose(), setToggleModal(false) },
                    style: "cancel",
                },
            ],
            {
                cancelable: true
            }
        );
    }


    return (
        <View>
            <Modal visible={toggleModal} animationType={'slide'}>
                {htmlRaw ? <WebView
                    source={{ html: htmlRaw }}
                    onMessage={(e) => {
                        messageReceived(e.nativeEvent?.data);
                    }}
                    onLoadStart={() => setisLoading(true)}
                    onLoadEnd={() => setisLoading(false)}
                    cacheEnabled={false}
                    cacheMode={'LOAD_NO_CACHE'}
                    originWhitelist={['*']}
                /> : <View style={{ flex: 1, justifyContent: 'center', }}><ActivityIndicator size="large" color={color ? color : '#ffde59'} /></View>
                }
                <View style={{ backgroundColor: color ? color : '#ffde59', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 25, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        {isLoading && (
                            <View>
                                <ActivityIndicator size="large" color={'white'} />
                            </View>
                        )}
                    </View>
                    <View style={{ flex: 3, paddingHorizontal: 15 }}>
                        <TouchableOpacity onPress={() => onTransactionCloseConfirmation()}>
                            <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'flex-end' }}>
                                close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
} 