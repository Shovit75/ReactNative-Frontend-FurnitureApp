import React, {useState, useEffect} from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { BACKEND_URL, STORAGE_URL } from '../../config';

function Slider() {

    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const response = await fetch(`${BACKEND_URL}/categories`, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setCategories(result.data);
                } else {
                    console.error('Failed to fetch categories:', result.message);
                }
            } catch (error) {
                console.log('Network Error:', "No Token Passed.");
            }
        };
        fetchCategories();
    }, []);

    return (
        <View>
            <Text style={{padding:10, marginLeft:20, fontSize: 20, fontFamily:'outfit-bold' }}>Categories Slider</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingLeft:20,
                    paddingBottom:5,
                }}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={()=>router.push('/sliderlist/'+item.name)}>
                        <View style={{
                            paddingRight:20
                        }}>
                            <Image
                                style={{
                                    width: 325,
                                    height: 180,
                                    borderRadius:20,
                                }}
                                source={{ uri: `${STORAGE_URL}/${item.image}` }}
                                resizeMode="stretch"
                                alt={item.name}
                            />
                            <Text style={{
                                textAlign:'center',
                                paddingTop:10,
                                fontSize:15,
                                fontFamily:'outfit-medium'
                            }}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    );
}

export default Slider;