import React, { Component } from "react";
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Dimensions, BackHandler, Platform, Alert, StyleSheet } from "react-native"


const { height } = Dimensions.get("window")
export default class Home extends Component {
    componentDidMount() {
        if (Platform.OS == "android") {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    next(param) {
        this.props.navigation.navigate("Dashboard", { type: param })
    }


    render() {
        return (
            <View style={styles.container} >
                <ScrollView>
                    <TouchableOpacity onPress={this.next.bind(this, "Female")}
                        style={styles.type} >
                        <ImageBackground source={require("../../assets/Female.jpg")}
                            style={styles.ImageBackground} resizeMode="stretch" >
                            <Text style={styles.typeText} > Female</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.next.bind(this, "Male")}
                        style={styles.type} >
                        <ImageBackground source={require("../../assets/Male.jpg")}
                            style={styles.ImageBackground} resizeMode="stretch" >
                            <Text style={styles.typeText} > Male</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.next.bind(this, "Kids")}
                        style={styles.type} >
                        <ImageBackground source={require("../../assets/Kids.jpg")}
                            style={styles.ImageBackground} resizeMode="stretch" >
                            <Text style={styles.typeText} > Kids</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: { flex: 1 },
    ImageBackground: { flex: 1, justifyContent: "flex-end" },
    typeText: { fontSize: 25, fontWeight: "bold", color: "#fff", margin: 20 },
    type: { height: height / 3, }
})