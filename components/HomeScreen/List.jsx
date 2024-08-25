import React, {useState, useEffect} from 'react';
import { View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from '../../components/HomeScreen/Listtem';
import { BACKEND_URL } from '../../config';

function Grid() {

    const [subcategories, setsubCategories] = useState([]);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const response = await fetch(`${BACKEND_URL}/subcategories`, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setsubCategories(result.data);
                } else {
                    console.error('Failed to fetch subcategories:', result.message);
                }
            } catch (error) {
                console.log('Network Error:', "No Token Passed.");
            }
        };
        fetchSubcategories();
    }, []);

    return (
        <View>
            <Text style={{padding:7, marginLeft:22, fontSize: 20, fontFamily:'outfit-bold' }}>Subcategories List</Text>
            <FlatList
                data={subcategories}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingLeft:20,
                    paddingBottom:5,
                }}
                renderItem={({ item }) => (
                  <ListItem subcat={item}/>
                )}
            />
        </View>
    );
}

export default Grid;