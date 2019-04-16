import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, Image, TouchableOpacity, BackHandler, Alert, Platform, Modal, ImageBackground } from 'react-native';


const { height } = Dimensions.get("window")
export default class ProductsList extends Component {
    state = {
        productList: [],
    }
    componentDidMount() {
        const fashion = this.props.navigation.state.params.type
        fetch("https://shoopingapi.herokuapp.com/product/getProduct?fashion=" + fashion, {
            method: "GET",
        }).then((res) => {
            res.json().then((data) => {
                this.setState({
                    productList: data
                })
            })
        }).catch((err) => {
            console.log("Error: ", err)
        })
    }


    render() {
        const { productList } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <ScrollView>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        paddingLeft: "1%",
                        paddingRight: "1%"
                    }} >
                        {productList.map((val, ind) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("ViewProduct", val)}
                                    activeOpacity={0.6}
                                    key={ind}
                                    style={{
                                        width: "48%",
                                        marginTop: "1%",
                                        marginBottom: "1%",
                                        height: 300,
                                        backgroundColor: "#fff",
                                        borderRadius: 5,
                                    }} >
                                    <View style={{
                                        height: 300, width: "100%"
                                    }} >
                                        <View style={{ flex: 1 }} >
                                            <View style={{ flex: 2.5, padding: 10 }} >
                                                <Image
                                                    source={{ uri: val.imageUrl }}
                                                    resizeMode={"center"}
                                                    style={{ height: "100%", width: "100%", }} />
                                            </View>
                                            <View style={{ flex: 1, padding: 10, justifyContent: "space-around" }} >
                                                <Text style={{ color: "rgba(1,18,148, 1)", fontSize: 15, fontWeight: "bold" }} >{val.name}</Text>
                                                <Text style={{ color: "rgba(1,18,148, 1)", fontSize: 14, fontWeight: "bold" }} >Prise: {val.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>

            </View>
        )
    }
}