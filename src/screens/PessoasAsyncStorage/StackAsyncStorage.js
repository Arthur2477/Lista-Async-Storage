import { createStackNavigator } from '@react-navigation/stack'
import ListaAsyncStorage from './ListaAsyncStorage.js'
import FormAsyncStorage from './FormAsyncStorage.js'

const Stack = createStackNavigator()

export default function StackAsyncStorage() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaAsyncStorage'
        >

            <Stack.Screen name='ListaAsyncStorage' component={ListaAsyncStorage} />

            <Stack.Screen name='FormAsyncStorage' component={FormAsyncStorage} />

        </Stack.Navigator>

    )
}
