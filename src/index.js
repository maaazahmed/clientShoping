
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
    LoginScreen,
    SignUpScreen,
    Dashboard,
    CreateProducts,
    ViewProduct,
    Home
} from "./Components"




const MainNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        },
    },
    SignUpScreen: {
        screen: SignUpScreen,
        navigationOptions: {
            header: null
        },
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        },
    },
    CreateProducts: {
        screen: CreateProducts,
    },
    ViewProduct: {
        screen: ViewProduct,
    },

}, {
        initialRouteName: "LoginScreen",
    })




const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;