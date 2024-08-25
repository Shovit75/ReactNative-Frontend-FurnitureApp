import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/CartScreen/Header'
import CartList from '../../components/CartScreen/CartList'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart(){

    const [user, setuser] = useState(false);

    useEffect(()=>{
        const checkuser = async () => {
            const checkid = await AsyncStorage.getItem('webuserId');
            if (checkid){
                setuser(true);
            } else {
                setuser(false)
            }
        }
        checkuser();
    }, []);

    return(
        <>
        { user == true ?
        <View>
            <Header/>
            <View>
                <Text style={{textAlign:'center', paddingHorizontal:30, paddingVertical:20, fontSize:50, fontFamily:'outfit-bold'}}>Cart Page</Text>
                <CartList/>
            </View>
        </View>
        :
        <View>
            <Header/>
            <View>
                <Text style={{textAlign:'center', paddingHorizontal:30, paddingVertical:20, fontSize:50, fontFamily:'outfit-bold'}}>Cart Page</Text>
                <Text style={{textAlign:'center', paddingHorizontal:30, paddingVertical:10, fontSize:30, fontFamily:'outfit-medium'}}>Login using Sanctum Token to Access App.</Text>
            </View>
        </View> }
        </>
    )
}