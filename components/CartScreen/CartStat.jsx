import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

function CartStat({totalprice, cartCount}) {

    const router = useRouter();
    return (
        <View style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>

            <Text style={{
                paddingTop:30,
                fontSize:20,
                fontFamily:'outfit-bold',
            }}>Total Price: ₹ {totalprice > 0 ? totalprice : 0}
            </Text>

            <Text style={{
                padding:25,
                fontSize:20,
                fontFamily:'outfit-bold',
            }}>Total Items: {cartCount > 0 ? cartCount : 0}
            </Text>

            {cartCount>0 ?
            <TouchableOpacity onPress={()=>{router.push('/checkout')}}>
                <Text style={{
                    backgroundColor:Colors.PRIMARY,
                    color:"#f0f0f0",
                    borderRadius:20,
                    marginTop:10,
                    paddingVertical:20,
                    paddingHorizontal:40,
                    fontSize:20,
                    fontFamily:'outfit-bold',
                }}>Checkout</Text>
            </TouchableOpacity>
            : ""}
        </View>
    );
}

export default CartStat;