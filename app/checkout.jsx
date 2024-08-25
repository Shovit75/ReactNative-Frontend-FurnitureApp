import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';
import Header from '../components/CheckoutScreen/Header';
import CheckoutStat from '../components/CheckoutScreen/CheckoutStat';
import AsyncStorage from '@react-native-async-storage/async-storage';

function checkout() {

    const [totalprice, settotalprice] = useState('');
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState('');
    const [totalquantity, settotalquantity] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const allcart = await AsyncStorage.getItem('cart');
            const convertCart = JSON.parse(allcart);
            setCart(convertCart);
            const getuser = await AsyncStorage.getItem('webuserId');
            setUser(getuser);
            const totalprice = await AsyncStorage.getItem('cartTotal');
            settotalprice(totalprice);
            const gettotalquantity = await AsyncStorage.getItem('cartQuantity');
            settotalquantity(gettotalquantity);
        }
        fetchData()
    })

    return (
        <View>
            <Header/>
            <CheckoutStat cart={cart} user={user} quantity={totalquantity} total={totalprice} />
        </View>
    );
}

export default checkout;