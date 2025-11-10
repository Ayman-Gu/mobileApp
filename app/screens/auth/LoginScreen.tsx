import { roots } from '@/app'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<roots>>();

  return (
    <View>
      <Text>Login</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>To register</Text>
      </TouchableOpacity>

    </View>
  )
}
