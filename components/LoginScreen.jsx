import React, { useState }  from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { BACKEND_URL } from '../config';

function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email: email,
            password: password,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            await AsyncStorage.setItem('authToken', result.token);
            await AsyncStorage.setItem('webuserId', result.data.id.toString());
            await AsyncStorage.setItem('name', result.data.name);
            router.push('/home');
        } else {
            // Handle errors from the API
            alert(result.message || 'An error occurred');
        }
        } catch (error) {
        // Handle network errors
        alert('Network Error', 'An error occurred while trying to connect to the server');
        console.error('Network Error:', error);
        }
    };

    return (

    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16 }}>

            <Text style={{
                fontSize: 24,
                marginBottom: 16}}>
                Login Screen
            </Text>
            
            <TextInput
                style={{
                    width: '100%',
                    padding: 10,
                    marginVertical: 8,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 4,
                }}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            
            <TextInput
                style={{
                    width: '100%',
                    padding: 10,
                    marginVertical: 8,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 4,
                }}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Submit" onPress={handleLogin} color="#7F57F1"/>
            
    </View>

    );
}

export default LoginScreen;