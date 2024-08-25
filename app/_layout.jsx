import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";

const AppContent = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
  </Stack>
);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    // Show a loading indicator while fonts are loading
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return <AppContent />;
}
