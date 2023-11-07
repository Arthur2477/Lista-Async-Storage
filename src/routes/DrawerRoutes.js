
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import StackAsyncStorage from '../screens/PessoasAsyncStorage/StackAsyncStorage'


const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='ListaAsyncStorage'>

            <Drawer.Screen name="ListaAsyncStorage" component={StackAsyncStorage} />
        
        </Drawer.Navigator>

    )
}