import { createStackNavigator } from '@react-navigation/stack'
import FormtarefaAsyncStorage from './FormtarefaAsyncStorage.js'
import ListatarefasAsyncStorage from './ListatarefasAsyncStorage.js'

const Stack = createStackNavigator()

export default function StacktarefasAsyncStorage() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListatarefasAsyncStorage'
        >

            <Stack.Screen name='ListatarefasAsyncStorage' component={ListatarefasAsyncStorage} />

            <Stack.Screen name='FormtarefaAsyncStorage' component={FormtarefaAsyncStorage} />

        </Stack.Navigator>

    )
}
