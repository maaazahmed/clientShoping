import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import CheckBox from 'react-native-check-box'


const { height } = Dimensions.get("window");

export default class CreateProducts extends Component {
    static navigationOptions = {
        title: "Product",
        headerStyle: { backgroundColor: 'rgba(1,18,148, 1)' },
        headerTitleStyle: { color: '#fff', fontSize: 14 },
        headerTintColor: '#ffffff',
    }
    constructor() {
        super()
        this.state = {
            imageUrl: "",
            productName: "",
            Price: "",
            size: "",
            submitionType: "",
            categoryType: "Select",
            isChecked1: false,
            isChecked2: false,
            isChecke3: false,
            isLoader: false,
            sizeArry: [],
            categoryVal: ""
        }
    }
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu(type) {
        this.setState({
            categoryType: type
        })
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };



    componentDidMount() {
        const currentProduct = this.props.navigation.state.params;
        this.setState({
            submitionType: currentProduct.type,
            imageUrl: currentProduct.currentProduct.imageUrl,
            productName: currentProduct.currentProduct.name,
            Price: currentProduct.currentProduct.price.toString(),
            size: currentProduct.currentProduct.size,
            categoryVal: currentProduct.currentProduct.category[0],
            categoryType: currentProduct.currentProduct.category[1]
        })
    }



    create() {
        const {
            productName,
            Price,
            imageUrl,
            categoryType,
            categoryVal,
            sizeArry,
        } = this.state;
        if (productName !== "" && Price !== "" && categoryVal !== "" && categoryType !== "Select" && imageUrl !== "") {
            this.setState({
                isLoader: true
            })
            fetch("https://shoopingapi.herokuapp.com/product/createProducts", {
                method: "POST",
                body: JSON.stringify({
                    imageUrl,
                    name: productName,
                    price: Number(Price),
                    category: [categoryVal, categoryType],
                    size: sizeArry,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                res.json().then(async (data) => {
                    setTimeout(() => {
                        this.setState({
                            isLoader: false
                        })
                        Alert.alert(
                            'Product has been created',
                            'Go to dashboard', [{
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            }, {
                                text: 'OK',
                                onPress: () => this.props.navigation.navigate("Dashboard", data)
                            },], {
                                cancelable: false
                            }
                        )
                    }, 1000)

                })

            }).catch((err) => {
                this.setState({
                    isLoader: false
                })
            })
        }
        else {
            alert("Rrequir all feilds")
        }

    }



    updateProduct() {
        const {
            productName,
            Price,
            imageUrl,
            sizeArry,
            categoryType,
            categoryVal,
        } = this.state;
        if (productName !== "" && Price !== "" && categoryVal !== "" && categoryType !== "Select" && imageUrl !== "") {
            this.setState({
                isLoader: true
            })
            fetch("https://shoopingapi.herokuapp.com/product/updateProduct", {
                method: "PUT",
                body: JSON.stringify({
                    imageUrl,
                    name: productName,
                    price: Number(Price),
                    _id: this.props.navigation.state.params.currentProduct._id,
                    category: [categoryVal, categoryType],
                    size: sizeArry,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                res.json().then(() => {
                    setTimeout(() => {
                        this.setState({
                            isLoader: false
                        })
                        Alert.alert(
                            'Product has been Updated',
                            'Go to dashboard', [{
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            }, {
                                text: 'OK',
                                onPress: () => this.props.navigation.navigate("Dashboard")
                            },], {
                                cancelable: false
                            }
                        )
                    }, 1000)
                })
            }).catch((err) => {
                this.setState({
                    isLoader: false
                })
            })
        }
        else {
            alert("Requier all feild !")
        }
    }
    render() {
        const {
            productName,
            Price,
            submitionType,
            categoryType,
            sizeArry,
            categoryVal,
            imageUrl

        } = this.state;
        return (
            <View style={styles.ScrollView_View} >
                <ScrollView>
                    <View style={styles.ScrollViewContainet}>
                        <View style={{ flex: 3, justifyContent: "center" }} >
                            <View style={styles.TextInputView} >
                                <TextInput
                                    value={productName}
                                    onChangeText={(productName) => this.setState({ productName })}
                                    style={styles.TextInput}
                                    placeholder="Name" />
                            </View>
                            <View style={styles.TextInputView}>
                                <TextInput
                                    keyboardType={"numeric"}
                                    value={Price}
                                    onChangeText={(Price) => this.setState({ Price })}
                                    style={styles.TextInput}

                                    placeholder="Price" />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", alignSelf: "center" }} >
                                <View style={[styles.TextInputView, { width: "49%", }]} >
                                    <TextInput
                                        value={categoryVal}
                                        onChangeText={(categoryVal) => this.setState({ categoryVal })}
                                        style={styles.TextInput}
                                        placeholder="Category" />
                                </View>
                                <TouchableOpacity activeOpacity={.7} onPress={this.showMenu} style={[styles.TextInputView, { width: "49%", justifyContent: "center", paddingLeft: 15 }]} >
                                    <Menu
                                        ref={this.setMenuRef}
                                        button={<Text style={{ color: "#003374" }}>{categoryType}</Text>}>
                                        <MenuItem onPress={this.hideMenu.bind(this, "Kids")}>Kids</MenuItem>
                                        <MenuItem onPress={this.hideMenu.bind(this, "Male")}>Male</MenuItem>
                                        <MenuItem onPress={this.hideMenu.bind(this, "Female")}>Female</MenuItem>
                                    </Menu>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.TextInputView]} >
                                <TextInput
                                    value={imageUrl}
                                    onChangeText={(imageUrl) => this.setState({ imageUrl })}
                                    style={styles.TextInput}
                                    placeholder="Image URL" />
                            </View>
                            <View style={[styles.TextInputView, { justifyContent: "space-between", flexDirection: "row", backgroundColor: "rgba(1,18,148, 1)" }]}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        this.setState({
                                            isChecked1: !this.state.isChecked1
                                        }, () => {
                                            if (this.state.isChecked1) {
                                                sizeArry.push("Small")
                                                this.setState({
                                                    sizeArry: sizeArry
                                                })
                                            }
                                            else {
                                                sizeArry.splice(sizeArry.indexOf("Small"), 1)
                                            }
                                        })
                                    }}
                                    isChecked={this.state.isChecked1}
                                    rightText={"Small"}
                                    checkedCheckBoxColor="fff"
                                    uncheckedCheckBoxColor="#fff"
                                    rightTextStyle={{ color: "#fff" }}
                                />

                            </View>
                            <View style={[styles.TextInputView, { justifyContent: "space-between", flexDirection: "row", backgroundColor: "rgba(1,18,148, 1)" }]}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        this.setState({
                                            isChecked2: !this.state.isChecked2
                                        }, () => {
                                            if (this.state.isChecked2) {
                                                sizeArry.push("Medium")
                                                this.setState({
                                                    sizeArry: sizeArry
                                                })
                                            }
                                            else {
                                                sizeArry.splice(sizeArry.indexOf("Medium"), 1)
                                            }
                                        })
                                    }}
                                    isChecked={this.state.isChecked2}
                                    rightText={"Medium"}
                                    checkedCheckBoxColor="fff"
                                    uncheckedCheckBoxColor="#fff"
                                    rightTextStyle={{ color: "#fff" }}
                                />

                            </View>
                            <View style={[styles.TextInputView, { justifyContent: "space-between", flexDirection: "row", backgroundColor: "rgba(1,18,148, 1)" }]}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        this.setState({
                                            isChecked3: !this.state.isChecked3
                                        }, () => {
                                            if (this.state.isChecked3) {
                                                sizeArry.push("Larg")
                                                this.setState({
                                                    sizeArry: sizeArry
                                                })
                                            }
                                            else {
                                                sizeArry.splice(sizeArry.indexOf("Larg"), 1)
                                            }
                                        })
                                    }}
                                    isChecked={this.state.isChecked3}
                                    rightText={"Larg"}
                                    checkedCheckBoxColor="fff"
                                    uncheckedCheckBoxColor="#fff"
                                    rightTextStyle={{ color: "#fff" }}
                                />

                            </View>
                            <TouchableOpacity
                                onPress={submitionType == "CREATE" ? this.create.bind(this) : this.updateProduct.bind(this)}
                                style={styles.TouchableOpacity_btn} >
                                <Text style={styles.buttontext} >{submitionType == "CREATE" ? "SUBMIT" : "UPDATE"}</Text>
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



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ScrollViewContainet: {
        height: height,
        justifyContent: "center",
    },
    logoImage: {
        height: 150,
        width: 150,
        alignSelf: "center"
    },
    TextInputView: {
        backgroundColor: "#fff",
        width: "90%",
        height: 50,
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 5,
    },
    TextInput: {
        flex: 1,
        color: "#003374",
        fontSize: 13,
        padding: 5,
        paddingLeft: 20
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
    },
    ScrollView_View: {
        backgroundColor: "rgba(1,18,148, 1)",
        flex: 1
    },
    TouchableOpacity_btn: {
        width: "90%",
        height: 50, alignSelf: "center",
        marginTop: 10,
        borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent: "center"
    },
    buttontext: {
        alignSelf: "center",
        color: "#fff"
    }

});

