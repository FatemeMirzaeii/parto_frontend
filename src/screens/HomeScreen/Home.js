import { Container, Text } from 'native-base';
import React from 'react';
import { Theme } from '../../app/Theme';
const { colors, size, fonts } = Theme


const Home = (props) => {
    return (
        <Container >
            <Text style={{ fontFamily: fonts.bold, fontSize: 30 }}>پرتو نسخه 2</Text>
        </Container >
    )
};
export default Home;

