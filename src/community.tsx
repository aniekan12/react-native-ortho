import React, { useState, useEffect } from 'react' 
import { Text, View, Modal,  ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { CommunityProps } from './types'
 
export default function Community(props: CommunityProps) {
    const [isLoading, setisLoading] = useState(true);
    const [toggleModal, setToggleModal] = useState(true);
    const [htmlRaw, setHtmlRaw] = useState(null);

    const { slug, config, color, callback, enterprise } = props;

    const orthoCommunityBaseUrl = `https://api.tryortho.co/v1/sdk/boot-json/ortho-flow/${slug}/${JSON.stringify(config)}`;
     
    useEffect(() => {
        fetch(orthoCommunityBaseUrl)
            .then((response) => response.json())
            .then((json) => {
                const { body, ok } = json;
                if (ok) {
                    setHtmlRaw(body)
                    setToggleModal(true)
                } else {
                     Alert.alert('seems like something went wrong')
                }

            })
            .catch((error) => {
                callback(error)
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