
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import styles from "../Login_signUpStyle/index"
import Logo from "../../assets/logo2.png"



export default class SimpleLoingScreen extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            isLoader: false
        }
    }


    submit() {
        this.setState({
            isLoader: true
        })
        const {
            email,
            password
        } = this.state;

        if (email !== "" & password !== "") {
            fetch("https://shoopingapi.herokuapp.com/account/signin", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                res.json().then((data) => {
                    if (data.message == "Login Successful") {
                        this.props.navigation.navigate("Home")
                        this.setState({
                            isLoader: false
                        })
                    }
                    else {
                        this.setState({
                            isLoader: false
                        })
                        alert("Somthin want to wrong")
                    }
                })
            }).catch((err) => {
                alert("Fetch feild ! ")
                this.setState({
                    isLoader: false
                })
            })
        } else {
            alert("Require All Feilds")
            this.setState({
                isLoader: false
            })
        }

    }



    render() {
        const {
            email,
            password } = this.state;
        return (
            <View style={styles.ScrollView_View} >
                <ScrollView>
                    <View style={[styles.ScrollViewContainet]}>
                        <View style={styles.logoContainer} >
                            <Image
                                source={Logo}
                                resizeMode={"stretch"}
                                style={styles.logoImage} />
                        </View>
                    </View>
                    <View style={styles.ScrollViewContainet}>
                        <View style={{ flex: 1, }} >
                            <View style={styles.TextInputView}>
                                <TextInput
                                    value={email}
                                    onChangeText={(email) => this.setState({ email })}
                                    style={styles.TextInput} placeholder="Email" />
                            </View>
                            <View style={styles.TextInputView} >
                                <TextInput
                                    value={password}
                                    onChangeText={(password) => this.setState({ password })}
                                    style={styles.TextInput}
                                    placeholder="Password"
                                    secureTextEntry={true} />
                            </View>
                            <TouchableOpacity
                                onPress={this.submit.bind(this)}
                                style={styles.TouchableOpacity_btn} >
                                <Text style={styles.buttontext} >SIGN IN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("SignUpScreen")}
                                style={[styles.TouchableOpacity_btn, { marginTop: 30 }]} >
                                <Text style={styles.buttontext} >SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {(this.state.isLoader) ?
                    <View style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(250,  250, 250,  0.5)",
                        justifyContent: "center",
                    }} >
                        <ActivityIndicator color="#003347" size={30} />
                    </View>
                    : null}
            </View>
        );
    }
}














