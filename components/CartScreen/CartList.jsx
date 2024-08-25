import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import CartStat from './CartStat';

function CartList() {

    const [CartData, setCartData] = useState([]);
    const [TotalPrice, setTotalPrice] = useState([]);
    const [CartCount, setCartCount] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            const data = await AsyncStorage.getItem('cart');
            const totalprice = await AsyncStorage.getItem('cartTotal');
            let totalQuantity = 0;
            let parsedData = [];
            if(data){
                parsedData = JSON.parse(data);
                totalQuantity = parsedData.reduce((sum, item) => sum + item.quantity, 0);
            }
            await AsyncStorage.setItem('cartQuantity', JSON.stringify(totalQuantity));
            setCartCount(totalQuantity);
            setCartData(parsedData);
            setTotalPrice(totalprice);
        };
        fetchCartData()
    }, [])

    const deleteItem = async (deleteItem) => {
        const updatedCart = CartData.map(item => {
            if (item.id === deleteItem.id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return null;
                }
            }
            return item;
        }).filter(item => item !== null);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        const newTotalPrice = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const newCartCount = updatedCart.reduce((count, item) => count + item.quantity, 0);
        await AsyncStorage.setItem('cartTotal', JSON.stringify(newTotalPrice));
        await AsyncStorage.setItem('cartQuantity', JSON.stringify(newCartCount));
        setTotalPrice(newTotalPrice);
        setCartData(updatedCart);
        setCartCount(newCartCount);
    }

    return (
        <View>
            {CartData.length > 0 ? 
            <FlatList
                data={CartData}
                keyExtractor={(item) => item.id.toString()}
                style={{
                    paddingLeft:35,
                    paddingBottom:5,
                }}
                renderItem={({ item }) => (
                    <View style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'center',
                        padding:10,
                        marginRight:15,
                        gap:10,
                    }}>
                        <Text style={{
                            textAlign:'center',
                            paddingTop:10,
                            fontSize:15,
                            fontFamily:'outfit-bold',
                        }}>{item.name}</Text>
                         <Text style={{
                            textAlign:'center',
                            paddingTop:10,
                            fontSize:15,
                            fontFamily:'outfit-bold'
                        }}>-</Text>
                         <Text style={{
                            textAlign:'center',
                            paddingTop:10,
                            fontSize:15,
                            fontFamily:'outfit-bold'
                        }}>₹ {item.price}</Text>
                        <Text style={{
                            textAlign:'center',
                            paddingTop:10,
                            fontSize:15,
                            fontFamily:'outfit-bold'
                        }}>x</Text>
                         <Text style={{
                            textAlign:'center',
                            paddingTop:10,
                            fontSize:15,
                            fontFamily:'outfit-bold'
                        }}>{item.quantity}</Text>
                        <TouchableOpacity>
                            <Text style={{
                                textAlign:'center',
                                fontFamily:'outfit-bold',
                                color:'white',
                                backgroundColor:'crimson',
                                padding:10,
                                borderRadius:10,
                            }}
                            onPress={() => deleteItem(item)}
                            >X</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            : <Text style={{
                textAlign:'center',
                paddingBottom:20,
                fontSize:35,
                fontFamily:'outfit-medium'
            }}>No Items Added</Text>}
            <CartStat totalprice={TotalPrice} cartCount={CartCount}/>
        </View>
    );
}

export default CartList;