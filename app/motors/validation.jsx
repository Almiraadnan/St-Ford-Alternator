import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const validation = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState("")
    const [token, setToken] = useState(null)
    const [alternator, setAlternator] = useState(undefined)
    const [serial, setSerial_no] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("token").then((tokenJWT) => {
            if (tokenJWT) {
                setToken(tokenJWT)
                return
            }
            setToken(null)
        })
        AsyncStorage.getItem("token").then((data) => {
            axios.post("https://stford-alternator-backend.vercel.app/api/v1/user/me", {
                token: data
            }).then((res) => {
                if (res.data.success === true) {
                    setUser(res.data.user)
                }
            }).catch((err) => {
                console.error(err);
            })
        })
    })
    const getSingleEngine = () => {
        if (serial === "") {
            Alert.alert("Alternator Serial Number", "Please fill the Serial no")
            return
        }
        setLoading(true)

        axios.post("https://stford-alternator-backend.vercel.app/api/v2/engine/" + serial, {
            name: user.name,
        })
            .then((res) => {
                if (!res.data.success) {
                    Alert.alert("Alternator Serial No Error", res.data.msg ? res.data.msg : "Please fill the serial no.")
                } else {
                    setLoading(false)
                    setSerial_no("")
                    setAlternator({
                        serial_no: serial,
                        model: res.data.engine.model,
                        engine_name: res.data.engine.engine_name,
                        location: res.data.engine.location,
                    })
                }
            }).catch((err) => {
                setLoading(false)
                console.error(err);
            })
    }


    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', alignItems: "center", width: '100%', justifyContent: "space-between", flexDirection: "row", marginBottom: 20 }}>
                <Text style={{ color: "#000", fontSize: 20, fontWeight: 450, }}>Validate an alternator</Text>
            </View>
            <View style={styles.wrapper}>
                <Text style={{ fontSize: 17, fontWeight: 400, color: "#C80036" }}>Enter a ST Ford Alternator serial{"\n"}number to validate It's status{"\n"}</Text>
                <TextInput autoCapitalize={"characters"} maxLength={10} onChangeText={newText => setSerial_no(newText)} placeholderTextColor={"#686D76"} placeholder='eg: PJ1234U123' value={serial} style={styles.input} />
                <View style={{ height: 1, backgroundColor: "#e1e6f0" }} />
                <Text numberOfLines={1}></Text>
                <TouchableOpacity onPress={getSingleEngine} style={styles.button_valid}>
                    {loading ? <ActivityIndicator size={20} color={"#fff"} /> : <Text style={{ color: "white" }}>Validate</Text>}
                </TouchableOpacity>
            </View>
            {
                alternator && <View style={{
                    backgroundColor: "white", borderRadius: 1, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0.3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                    elevation: 2,
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}>
                    <Image
                        style={
                            {
                                width: 180,
                                height: 140,
                                marginBottom: 16,
                                marginTop: 16
                            }
                        }
                        source={require("../../assets/images/alternator.png")}
                    />
                    <View>
                        <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'row', padding: 14, borderTopColor: "#ccc", borderTopWidth: 1, }}>
                            <Text style={{ marginBottom: 5, color: "#686D76" }}>Serial No</Text>
                            <Text>{alternator.serial_no}</Text>
                        </View>
                        <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'row', padding: 14, borderTopColor: "#ccc", borderTopWidth: 1, }}>
                            <Text style={{ marginBottom: 5, color: "#686D76" }}>Model Name</Text>
                            <Text>{alternator.model}</Text>
                        </View>
                        <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'row', borderTopColor: "#ccc", borderTopWidth: 1, borderBottomColor: "#ccc", borderBottomWidth: 1, padding: 14 }}>
                            <Text style={{ marginBottom: 5, color: "#686D76" }}>Build Year</Text>
                            <Text>{alternator.engine_name}</Text>
                        </View>
                        <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'row', padding: 14 }}>
                            <Text style={{ marginBottom: 5, color: "#686D76" }}>Build Location</Text>
                            <Text>{alternator.location}</Text>
                        </View>

                    </View>
                </View >
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 15,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: 1,
        shadowRadius: 30
    },
    wrapper: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 5,
        shadowColor: '#ececec',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.20,
        shadowRadius: 2,
        elevation: 5
    },
    button_valid: {
        backgroundColor: "#D80032",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 1,
        paddingLeft: 18,
        paddingRight: 18,
        textAlign: "center",
        fontSize: 16,
        width: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
})

export default validation