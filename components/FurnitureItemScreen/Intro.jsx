import React from 'react';
import { View, Image, Text} from 'react-native';
import { STORAGE_URL } from '../../config';

function Intro({furniture}) {
    return (
        <View>
            <Image style={{
                width: "100%",
                height: 350,
                }}
                resizeMode="stretch"
                source={{ uri: `${STORAGE_URL}/${furniture.image}` }} />
            <Text style={{
                textAlign:'center',
                fontSize:20,
                fontFamily:'outfit-bold',
                paddingTop:20,
                paddingBottom:10
            }}>
                Name : {furniture.name}
            </Text>
            <Text style={{
                textAlign:'center',
                fontSize:20,
                fontFamily:'outfit',
                padding:10
            }}>
                Description : {furniture.description}
            </Text>
            <Text style={{
                textAlign:'center',
                fontSize:20,
                fontFamily:'outfit-medium',
                padding:10
            }}>
                Price : ₹ {furniture.price}
            </Text>
        </View>
    );
}

export default Intro;