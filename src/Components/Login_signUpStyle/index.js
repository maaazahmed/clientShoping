import { StyleSheet, Dimensions, } from 'react-native';
const { height } = Dimensions.get("window");





export default StyleSheet.create({
    container: {
        flex: 1,
    },
    ScrollViewContainet: {
        height: height / 2,
    },
    logoImage: {
        height: 150,
        width: 150,
        alignSelf: "center"
    },
    TextInputView: {
        backgroundColor: "#fff",
        width: "95%",
        height: 50,
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 5,
        // borderColor: "#0a3dfb",
        // borderWidth: 1,
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
        backgroundColor: "rgba(1,18,148, 1)"
    },
    TouchableOpacity_btn: {
        width: "95%",
        height: 50, alignSelf: "center",
        marginTop: 10, borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent: "center"
    },
    buttontext: {
        alignSelf: "center",
        color: "#fff"
    }

});

