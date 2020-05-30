import { Content, Container, View } from 'native-base';
import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Theme, Width } from '../../app/Theme';

const { colors, size, fonts } = Theme

const Charts = (props) => {


    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#780048']} style={{ flex: 1 }}>
            <Content >


            </Content >
        </LinearGradient>
    )
};
export default Charts;
