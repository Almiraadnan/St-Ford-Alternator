import React from "react"
import { View, Text } from "react-native"
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";

const ToastNotification = () => {
    return (
        <>

            <Animated.View
                entering={FadeInUp}
                exiting={FadeOutUp}
                style={{
                    top: 70,
                    backgroundColor: "#4BB543",
                    width: "90%",
                    borderRadius: 5,
                    position: "absolute",
                    padding: 20,
                    flexDirection: 'row',
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    shadowColor: "#4BB543",
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    shadowOffset: { width: 0, height: 1 },
                    elevation: 2
                }}>
                <Entypo name="check" size={30} color={"#F6F4F4"} />
                <View>
                    <Text style={{
                        color: "#fff",
                        fontWeight: 500,
                        marginLeft: 10,
                        fontSize: 16
                    }}>Success</Text>
                    <Text style={{
                        color: "#fff",
                        fontWeight: 500,
                        marginLeft: 10,
                        fontSize: 16
                    }}>Registration Successfull!</Text>
                </View>
            </Animated.View>
        </>
    )
}

export default ToastNotification;