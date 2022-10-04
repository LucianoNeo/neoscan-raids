import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Game } from '../screens/Game'
import { Home } from '../screens/Home'
import { SignIn } from '../screens/SignIn'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen
                name='signin'
                component={SignIn}

            />

            <Screen
                name='home'
                component={Home}

            />

            <Screen
                name='game'
                component={Game}
            />
        </Navigator>
    )
}