import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL, STORAGE_URL } from '../../config';

export default function GridlistBySubcat(){
    const navigation = useNavigation();
    const { subcat } = useLocalSearchParams();
    const [ furnitures, setFurnitures] = useState([]);
    const [ subcatname, setSubcatname] = useState('');
    const router = useRouter();

    useEffect(()=>{
        const fetchFurnitures = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const response = await fetch(`${BACKEND_URL}/furnitureacctosubcat/${subcat}`, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setSubcatname(result.name);
                    setFurnitures(result.data);
                } else {
                    console.error('Failed to fetch Furnitures:', result.message);
                }
            } catch (error) {
                console.error('Network Error:', error);
            }
        };
        fetchFurnitures();
    },[])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: subcatname
        })
    })
    
    return(
        <View>
            { furnitures?.length>0?
            <FlatList
                data={furnitures}
                keyExtractor={(item) => item.id.toString()}
                renderItem = {({ item }) => (
                    <TouchableOpacity onPress={()=>{ router.push('/furnitureitem/'+item.id) }}>
                    <View style={{
                        padding:10,
                        margin:10,
                        borderRadius:20,
                        backgroundColor:"#fff",
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        gap:15
                    }}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius:20,
                            }}
                            source={{ uri: `${STORAGE_URL}/${item.image}` }}
                            resizeMode="stretch"
                            alt={item.name}
                        />
                        <View style={{
                            flex:1,
                            gap:5
                        }}>
                            <Text style={{
                                fontSize:18,
                                fontFamily:'outfit-bold'
                            }}>{item.name}</Text>
                            <Text style={{
                                fontSize:12,
                                fontFamily:'outfit-medium'
                            }}>{item.description}</Text>
                            <Text style={{
                                fontSize:15,
                                fontFamily:'outfit'
                            }}>₹ {item.price}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )}
            />
            :
            <Text style={{
                textAlign:'center',
                fontSize:18,
                fontFamily:'outfit-bold',
                marginTop:'50%'
            }}>No Furnitures Found.</Text>
            }
        </View>
    )
}