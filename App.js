import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Tabs from './src/navigation/tabs'
import { Restaurant, OrderDelivery } from './src/screens'


const Stack = createStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Tabs"
      >
        <Stack.Screen
          name="Tabs"
          component={Tabs}
        />
        <Stack.Screen
          name="Restaurant"
          component={Restaurant}
        />
        <Stack.Screen
          name="OrderDelivery"
          component={OrderDelivery}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App