import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from '../../components/FurnitureItemScreen/Intro';
import Body from '../../components/FurnitureItemScreen/Body';
import { BACKEND_URL } from '../../config';

export default function SliderlistByCategory(){
    const navigation = useNavigation();
    const { furnitureId } = useLocalSearchParams();
    const [ furnitures, setFurnitures] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:""
        })
        const fetchFurnitures = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const response = await fetch(`${BACKEND_URL}/furniture/${furnitureId}`, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
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

    return(
        <View>
            <Intro furniture={furnitures} />
            <Body furniture={furnitures} />
        </View>
    )
}