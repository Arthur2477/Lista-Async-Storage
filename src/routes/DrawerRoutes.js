
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import StackPessoasAsyncStorage from '../screens/PessoasAsyncStorage/StacktarefaAsyncStorage'


const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='ListaTarefas'>

            <Drawer.Screen name="ListaTarefas" component={StackPessoasAsyncStorage} />
        
        </Drawer.Navigator>

    )
}