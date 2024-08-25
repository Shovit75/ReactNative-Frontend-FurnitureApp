import React from 'react'
import {View, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/HomeScreen/Header'
import Slider from '../../components/HomeScreen/Slider'
import List from '../../components/HomeScreen/List';
import TrustedPartners from '../../components/HomeScreen/TrustedPartners';
import { Colors } from '../../constants/Colors';

export default function Home(){
   
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('authToken')
        if(token){
            alert(token)
        } else {
            alert("Login using Sanctum Token to Access App.")
        }
    }

    return(
        <View>
            <Header/>
            <Slider/>
            <List/>
            <TrustedPartners/>
            <Button color={Colors.PRIMARY} title='Check Token' onPress={checkToken}/>
        </View>
    )
}