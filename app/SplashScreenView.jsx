import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Animated, { FadeIn, FadeInRight, FadeInUp, FadeOut, FadeOutRight, FadeOutUp } from 'react-native-reanimated'

const SplashScreenView = () => {
    return (
        <>
            <View style={styles.container}>
                <Animated.View entering={FadeIn}
                    exiting={FadeOut} style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Image source={require("../assets/images/full-logo.png")} style={{ width: 225, height: 70 }}></Image>
                    <Text style={{ color: "#fff", marginTop: 21, fontSize: 20 }}>
                        Welcome to the</Text>
                    <Text style={{ fontWeight: 600, color: "#fff", fontSize: 20 }}>ST Ford Alternator App</Text>
                </Animated.View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C80036",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SplashScreenView