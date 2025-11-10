import React, { useContext } from 'react'
import { TextInput, View} from 'react-native'
import { UserContext } from '../context/UserContext'

export default function RepeatedFields() {

  const {email,setEmail,password,setPassword}=useContext(UserContext)

  return (
    <View>
      <TextInput
        className="border-2 border-purple p-3 m-3 rounded-full text-purple font-semibold"
        onChangeText={setEmail}
        value={email??''}
        keyboardType='email-address'
        placeholder="Email..."
        placeholderTextColor="#912F56"

      />
      <TextInput
        className="border-2 border-purple p-3 m-3 rounded-full text-purple font-semibold"
        onChangeText={setPassword}
        value={password??''}
        secureTextEntry={true}
        placeholder="Password..."
        placeholderTextColor="#912F56"

      />
    </View>
  )
}
