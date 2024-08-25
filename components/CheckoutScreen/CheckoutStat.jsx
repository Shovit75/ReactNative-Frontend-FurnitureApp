import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CheckoutStat({cart, user, total, quantity}) {

    const router = useRouter();

    const makecheckout = async () => {
        try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await fetch('http://10.0.2.2:8000/api/checkout',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                "webuser_id": user,
                "items": cart,
                "total": total,
            }),
        });
        if (response.ok) {
            alert('Checkout Successfully Completed.');
            await AsyncStorage.removeItem('cart'),
            await AsyncStorage.removeItem('cartTotal'),
            await AsyncStorage.removeItem('cartQuantity'),
            router.push('/')
        } else {
            const error = await response.text();
            console.log('Error:', error);
        }
        }
        catch(error){
            console.error('Network Error:', "Token not passed");
        }
    }

    return (
        <View>

            <Text style={{textAlign:'center', paddingHorizontal:20, paddingVertical:40, fontSize:50, fontFamily:'outfit-bold'}}>Checkout Page</Text>

            <View style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                gap:25
            }}>

                <Text style={{
                    fontSize:20,
                    fontFamily:'outfit-bold',
                }}>Total Price: ₹ {total}
                </Text>
                <Text style={{
                    padding:5,
                    fontSize:20,
                    fontFamily:'outfit-bold',
                }}>Total Items: {quantity}
                </Text>

                <TouchableOpacity onPress={()=>{router.back()}}>
                    <Text style={{
                        backgroundColor:Colors.PRIMARY,
                        color:'#fff',
                        borderRadius:15,
                        fontSize:15,
                        padding:20,
                        fontFamily:'outfit-bold',
                    }}>
                        Edit Cart
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={makecheckout}>
                    <Text style={{
                        backgroundColor:Colors.PRIMARY,
                        color:'#fff',
                        borderRadius:15,
                        padding:20,
                        fontSize:15,
                        fontFamily:'outfit-bold',
                    }}>
                        Make Checkout
                    </Text>
                </TouchableOpacity>
                    
            </View>
        </View>
    );
}

export default CheckoutStat;