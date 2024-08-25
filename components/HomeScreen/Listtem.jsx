import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { STORAGE_URL } from '../../config';

function GridItem({subcat}) {

    const router = useRouter();

    return (
        <TouchableOpacity onPress={()=>{router.push('/gridlist/'+subcat.id)}}>
        <View style={{
            padding:10,
            marginRight:8
        }}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    borderRadius:100
                }}
                source={{ uri: `${STORAGE_URL}/${subcat.image}` }}
                resizeMode="stretch"
                alt={subcat.name}
            />
            <Text style={{
                textAlign:'center',
                paddingTop:12,
                fontSize:12,
                fontFamily:'outfit-medium'
            }}>{subcat.name}</Text>
        </View>
        </TouchableOpacity>
    );
}

export default GridItem;