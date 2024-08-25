import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile(){
    
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [usercheck, setuserCheck] = useState(false);

    useEffect(()=>{
        const fetchname =  async () => {
            const user = await AsyncStorage.getItem('name');
            setUsername(user)
        }
        const checkuser = async () => {
            const userexists = await AsyncStorage.getItem('webuserId'); 
            if(userexists){
                setuserCheck(true)
            } else {
                setuserCheck(false)
            }
        }
        checkuser();
        fetchname();
    },[])
    
    const logoutclicked = async () => {
        try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await fetch('http://10.0.2.2:8000/api/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        });
        const result = await response.json();
        if (response.ok) {
            await AsyncStorage.removeItem('authToken')
            await AsyncStorage.removeItem('cart')
            await AsyncStorage.removeItem('cartQuantity')
            await AsyncStorage.removeItem('cartTotal')
            await AsyncStorage.removeItem('name')
            await AsyncStorage.removeItem('webuserId')
            router.replace('/Login');
        } else {
            alert(result.message || 'An error occurred');
        }
        } catch (error) {
        alert('Network Error', 'An error occurred while trying to connect to the server');
        }
    };

    const loginpress = () => {
        router.push('/Login');
    }

    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}>
        {usercheck == true ?
            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                gap:20,
                padding:20
            }}>
                <Image 
                style={{ width: 70, height: 70 }} 
                source={{ uri: 'https://xsgames.co/randomusers/assets/images/favicon.png' }} 
                />
                <Text onPress={logoutclicked} style={{fontSize:40, fontFamily:'outfit-bold'}}>Logout {username}</Text>
            </View>
        :
            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                gap:20,
                padding:20
            }}>
                <Image 
                style={{ width: 70, height: 70 }} 
                source={{ uri: 'https://xsgames.co/randomusers/assets/images/favicon.png' }} 
                />
                <Text onPress={loginpress} style={{fontSize:40, fontFamily:'outfit-bold'}}>Login</Text>
            </View>
        }
           </View>
    )
}