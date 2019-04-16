import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import styles from "../Login_signUpStyle/index"


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
        const {
            username,
            email,
            password
        } = this.state;
        this.setState({
            isLoader: true
        })

        if (username !== "" && email !== "" && password !== "") {
            fetch("https://shoopingapi.herokuapp.com/account/signup", {
                method: "POST",
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                res.json().then((data) => {
                    if (data.message == "User Created") {
                        this.setState({
                            isLoader: false
                        })
                        this.props.navigation.navigate("Home")
                    }
                    else {
                        alert("Somthin want to wrong")
                        this.setState({
                            isLoader: false
                        })
                    }
                })
            }).catch((err) => {
                this.setState({
                    isLoader: false
                })
            })
        }
        else {
            alert("Require All Feilds")
            this.setState({
                isLoader: false
            })
        }

    }



    render() {
        const {
            username,
            email,
            password } = this.state;


        return (
            <View style={styles.ScrollView_View} >
                <ScrollView>
                    <View style={[styles.ScrollViewContainet]}>
                        <View style={styles.logoContainer} >
                            <Image
                                source={require("../../assets/logo2.png")}
                                resizeMode={"stretch"}
                                style={styles.logoImage} />
                        </View>
                    </View>
                    <View style={styles.ScrollViewContainet}>
                        <View style={{ flex: 1, }} >
                            <View style={styles.TextInputView} >
                                <TextInput
                                    value={username}
                                    onChangeText={(username) => this.setState({ username })}
                                    style={styles.TextInput}
                                    placeholder="Username" />
                            </View>
                            <View style={styles.TextInputView}>
                                <TextInput
                                    value={email}
                                    onChangeText={(email) => this.setState({ email })}
                                    style={styles.TextInput}
                                    placeholder="Email" />
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
                                <Text style={styles.buttontext} >SIGN UP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("LoginScreen")}
                                style={[styles.TouchableOpacity_btn, { marginTop: 30 }]} >
                                <Text style={styles.buttontext} >SIGN IN</Text>
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

