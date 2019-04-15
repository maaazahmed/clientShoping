import React, { Component } from 'react';
import { Text, View, Dimensions,  TouchableOpacity, BackHandler, Alert, Platform, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Feather"
import ProductsList from "./ProducList/index"

const { height, width } = Dimensions.get("window")
export default class Dashboard extends Component {
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header} >
                    <View style={styles.headerHeadingView} >
                        <Text style={styles.headingText}>Products</Text>
                    </View>
                    <View style={styles.headerButtonContainer} >
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => this.props.navigation.navigate("CreateProducts",
                                {
                                    type: "CREATE",
                                    currentProduct: {
                                        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsNGytzxOHh4s3tLkhhyu_9ZqSXsPLqOTz4A0IoMqpMI10urKoAw",
                                        name: "",
                                        price: "",
                                        category: [],
                                        Size: [],
                                    }
                                })}
                            style={styles.headerButton}>
                            <Icon style={styles.headerButton}
                                name="plus" color="#fff" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1 }} >
                    <ProductsList navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(1,18,148, 1)",
        flex: 1,
    },
    tabButton: {
        alignSelf: "center",
        backgroundColor: "rgba( 126, 163, 250, 0.1)",
        height: 38,
        borderRadius: 1000,
        width: 38,
        justifyContent: "center",
        borderColor: "#fff",
    },
    Icon: {
        alignSelf: "center"
    },
    tapContainer: {
        backgroundColor: "rgba( 126, 163, 250, 0.1)",
        height: 50,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 5,
    },
    header: {
        backgroundColor: "rgba( 126, 163, 250, 0.10)",
        height: 50,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,

    },
    headerHeadingView: {
        justifyContent: "center",
        flex: 2
    },
    headingText: {
        color: "#fff",
        fontWeight: "500"
    },
    headerButtonContainer: {
        justifyContent: "flex-end",
        flex: 1, flexDirection: "row",
    },
    headerButton: { alignSelf: "center" }

})