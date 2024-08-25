import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Colors } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

function Body({furniture}) {

    const router = useRouter();

    const handleCart = async function(){
        const cart = await AsyncStorage.getItem('cart');
        let cartItems = cart ? JSON.parse(cart) : [];
        const existingItem = cartItems.findIndex(item => item.id === furniture.id);
        if (existingItem !== -1) {
            cartItems[existingItem].quantity += 1;
        } else {
            cartItems.push({
                id: furniture.id,
                name: furniture.name,
                price: furniture.price,
                quantity: 1
            });
        }
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        await AsyncStorage.setItem('cartTotal', JSON.stringify(cartTotal));
        alert(`${furniture.name} added to your cart.`);
        router.push('/');
    }

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={handleCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.PRIMARY, 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:10,
        marginHorizontal: 100,
    },
    buttonText: {
        color: '#FFFFFF', // Text color
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Body;