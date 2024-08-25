import React, {useState, useEffect} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL, STORAGE_URL } from '../../config';

function TrustedPartners() {

    const [trusted, settrusted] = useState([]);

    useEffect(() => {
        const fetchtrusted = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const response = await fetch(`${BACKEND_URL}/trusted`, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    settrusted(result.data);
                } else {
                    console.error('Failed to fetch trusted:', result.message);
                }
            } catch (error) {
                console.log('Network Error:', "No Token Passed.");
            }
        };
        fetchtrusted();
    }, []);

    return (
        <View>
            <Text style={{padding:10, marginLeft:20, fontSize: 20, fontFamily:'outfit-bold' }}>Trusted Partners</Text>
            <FlatList
                data={trusted}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingLeft:25,
                    paddingBottom:5,
                }}
                renderItem={({ item }) => (
                    <View style={{
                        padding:10,
                        marginRight:15,
                    }}>
                    <TouchableOpacity onPress={()=>alert("Trusted Partner "+`${item.id}`+" : "+`${item.name}`)}>
                        <Image
                            style={{
                                width: 92.5,
                                height: 80,
                                borderRadius:20,
                            }}
                            source={{ uri: `${STORAGE_URL}/${item.image}` }}
                            resizeMode="stretch"
                            alt={item.name}
                        />
                        <Text style={{
                            textAlign:'center',
                            paddingTop:10,
                            fontFamily:'outfit-bold'
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

export default TrustedPartners;