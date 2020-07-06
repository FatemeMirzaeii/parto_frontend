import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text, View, Container, Footer } from 'native-base';
import styles from './Styles'

const FooterPage = (props) => {

    return (
        <Footer style={styles.footer}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Profile')}
                style={styles.tab}>
                <Icon name="profile" type="AntDesign" style={styles.tabIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Calendar')}
                style={styles.tab}>
                <Icon name="calendar" type="AntDesign" style={styles.tabIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tab,
                    {
                        backgroundColor: '#FCF3CA',
                        borderRadius: 150,
                    },
                ]}>
                <Icon name="home" type="AntDesign" style={styles.tabIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Charts')}
                style={styles.tab}>
                <Icon name="linechart" type="AntDesign" style={styles.tabIcon} />
            </TouchableOpacity>
        </Footer>
    );
};

export default FooterPage;

