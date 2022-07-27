import { TencentImSDKPlugin } from 'react-native-tim-js';
import React, { useState } from 'react';
import CommonButton from '../commonComponents/CommonButton';
import SDKResponseView from '../sdkResponseView';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MultiCheckBoxModalComponent from '../commonComponents/MultiCheckboxModalComponent';

export const GetConversationListByConversationIDs = () => {
    const [res, setRes] = useState<any>({});
    const [visible, setVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('未选择');
    const [userList, setUserList] = useState<any>([]);
    const getUsersHandler = (userList) => {
        setUserName('[' + userList.join(',') + ']');
        setUserList(userList);
    };

    const CodeComponent = () => {
        return res.code !== undefined ? (
            <SDKResponseView codeString={JSON.stringify(res, null, 2)} />
        ) : null;
    };

    const getConversationList = async () => {
        const res = await TencentImSDKPlugin.v2TIMManager
            .getConversationManager()
            .getConversationListByConversaionIds(userList);
        setRes(res);
        TencentImSDKPlugin.v2TIMManager
            .getConversationManager()
            .addConversationListener({
                onConversationChanged: (conversationList) => {
                    console.log('conversationList', conversationList);
                },
                onNewConversation: (conversationList) => {
                    console.log('conversationList', conversationList);
                },
            });
    };
    return (
        <View style={{height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.selectContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                        }}
                    >
                        <View style={styles.buttonView}>
                            <Text style={styles.buttonText}>选择会话</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.selectedText}>{userName}</Text>
                </View>
                <MultiCheckBoxModalComponent
                    visible={visible}
                    getVisible={setVisible}
                    getUsername={getUsersHandler}
                    type={'conversation'}
                />
            </View>
            <CommonButton
                handler={getConversationList}
                content={'获取会话'}
            ></CommonButton>
            <CodeComponent></CodeComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 0,
    },
    buttonView: {
        backgroundColor: '#2F80ED',
        borderRadius: 3,
        width: 100,
        height: 35,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 35,
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },
    selectedText: {
        marginLeft: 10,
        fontSize: 14,
        textAlignVertical: 'center',
        lineHeight: 35,
    },
});
