import React, {useState, useEffect} from 'react';
import { View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useRouter} from 'expo-router';

function Header() {

    const [name, setName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchName = async () => {
            const name = await AsyncStorage.getItem('name');
            if(name){
            setName(name);
            } else {
            setName("Guest");
            }
        };
        fetchName();
    }, []);
   
    return (

    <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        padding:20,
        paddingTop: 35,
        paddingBottom:5,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15
    }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:15
        }}>
            <Image 
            style={{ width: 70, height: 70 }} 
            source={{ uri: 'https://xsgames.co/randomusers/assets/images/favicon.png' }} 
            />
            <View>
                <Text style={{
                    color:'#fff',
                    fontSize:15,
                    fontFamily:'outfit'
                }}>Welcome,</Text>
                <Text style={{
                    fontSize:20,
                    color:'#fff',
                    fontFamily:'outfit-medium'
                }}>{name}</Text>
            </View>
        </View>
        <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                paddingRight:4,
                paddingTop:2,
                gap:7,
        }}>
            <Ionicons name="cart-outline" size={35} color="white" />
            <Text style={{
                color:'#fff',
                fontSize:15,
                fontFamily:'outfit-bold',
                paddingTop:3,
            }}
            onPress={()=>{router.push('/cart')}}
            >Check Cart</Text>
        </View>
    </View>

    );
}

export default Header;