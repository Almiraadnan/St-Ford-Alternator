import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreenView from './SplashScreenView'
import Validation from './motors/Validation.jsx'

const Index = () => {

    const [token, setToken] = useState(null)
    const [isShowSplash, setIsShowSplash] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsShowSplash(false)
            AsyncStorage.getItem("token").then((tokenJWT) => {
                if (tokenJWT) {
                    setToken(tokenJWT)
                    return
                }
                setToken(null)
            })
        }, 4000);
    }, [])



    return (
        <>
            {isShowSplash ? <SplashScreenView /> : <View style={{
                flex: 1, backgroundColor: "#C80036", padding: 20,
                paddingTop: 100
            }}>
                <Text style={styles.welcome_text}>Welcome to the,</Text>
                <Text style={{
                    color: "white",
                    fontSize: 30,
                    fontWeight: 600
                }}>ST Ford Alternator App</Text>
                <View style={styles.second_container}>
                    <Text style={{
                        color: "white",
                        fontSize: 15
                    }}>New to ST Ford Alternator app ?</Text>
                    <Link href={"users/register"} style={styles.button}>
                        <Text style={{ fontSize: 15, color: "#C80036", fontWeight: 500 }}>Create Account</Text>
                    </Link>
                    <Text style={{
                        color: "white",
                        fontSize: 15
                    }}>Already have an account on ST Ford ?</Text>
                    <Link href={"users/login"} style={styles.button}>
                        <Text style={{ fontSize: 15, color: "#C80036", fontWeight: 500 }}>Login</Text>
                    </Link>
                    <Text style={{ color: "white", fontSize: 15 }}>Validate a ST Ford alternator ?</Text>
                    <Link href={"/users/login"} style={{
                        backgroundColor: "transparent",
                        borderColor: "#fff",
                        borderWidth: 2,
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: 5,
                        paddingTop: 15,
                        paddingBottom: 15,
                        marginBottom: 20,
                        marginTop: 10,
                        fontSize: 15, color: "#fff", fontWeight: 500
                    }}>
                        Validate an Alternator
                    </Link>
                </View>
            </View >
            }
        </>

    )
}


const styles = StyleSheet.create({
    input: {
        borderBottomColor: "#ececec",
        borderBottomWidth: 1,
        color: "#686D76",
        paddingBottom: 10
    },
    main_container: {
        backgroundColor: "#C80036",

    },
    welcome_text: {
        color: "white",
        fontSize: 16,
        marginBottom: 5
    },
    button: {
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: "center",
        marginBottom: 20,
        marginTop: 10
    },
    second_container: {
        marginTop: 26
    },
})

export default Index
