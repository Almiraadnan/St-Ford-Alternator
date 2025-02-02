import React from 'react'
import { Stack, router } from 'expo-router'
import { Image, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RootLayout = () => {
    const logout = () => {
        AsyncStorage.removeItem("token")
        router.replace("/")
    }
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='users/register' options={{ headerStyle: { backgroundColor: "#C80036" }, headerTitle: "", headerTintColor: "#fff", headerShadowVisible: false }} />
            <Stack.Screen name='users/login' options={{ headerStyle: { backgroundColor: "#C80036" }, headerTitle: "", headerTintColor: "#fff", headerShadowVisible: false }} />
            <Stack.Screen name='motors/Validation' options={{
                headerStyle: { backgroundColor: "#C80036" }, headerTitle: (props) => (
                    <Image
                        style={{ width: 360, height: 70 }}
                        source={require('../assets/images/logo.png')}
                        resizeMode='contain'
                    />
                ),
                headerTitleStyle: { flex: 1, textAlign: 'center' },
                headerLeft: null,
                headerBackVisible: false,
                headerRight: () => (
                    <TouchableOpacity onPress={logout} ><Text style={{ color: "white" }}>Logout</Text></TouchableOpacity>
                ),
                headerShadowVisible: false
            }} />
        </Stack>
    )
}

export default RootLayout