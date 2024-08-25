import React from 'react'
import { Tabs } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from './../../constants/Colors'

export default function TabLayout(){
    return(
        <Tabs screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:Colors.PRIMARY,
            tabBarStyle: {
                height: 95,
                paddingBottom: 25,
                paddingTop: 10,
                backgroundColor: '#f0f0f0',
              },
            tabBarLabelStyle: {
                fontSize: 16,
            },
            }}>
            <Tabs.Screen name='home'
                options={{
                    tabBarLabel:'Home',
                    tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='cart'
                options={{
                    tabBarLabel:'Cart',
                    tabBarIcon: ({color}) => <Ionicons name="cart" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='profile'
                options={{
                    tabBarLabel:'Profile',
                    tabBarIcon: ({color}) => <Ionicons name="person-circle" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}