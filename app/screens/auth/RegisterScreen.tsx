import { roots } from '@/app'
import RepeatedFields from '@/app/components/RepeatedFields'
import { UserContext } from '@/app/context/UserContext'
import MainLayout from '@/app/layout/MainLayout'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function RegisterScreen() {

  const{fullName,email,password,setFullName,setEmail,setPassword}=useContext(UserContext)
  const [message,setMessage]=React.useState('')

  const navigation = useNavigation<NavigationProp<roots>>();

  const Submit=async()=>{
    if (!email || !password) {
      setMessage('Please verify your fields')
      setTimeout(()=>{setMessage('')},7000)
      return ;
    }
    console.log('email from context after submit',email)

    try {
      const response= await fetch('https://newsapp-webservice.netlify.app/.netlify/functions/user-UserRegister',
        {
          method: 'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            fullName: fullName,
            email: email,
            password: password
          })
      }
      )
      const data = await response.json()
      console.log(data)
      setEmail('')
      setFullName('')
      setPassword('')
      
      if (!response.ok) {
      setMessage(data.error);
      setTimeout(() => setMessage(""), 7000);
      return;
      }
      navigation.navigate('Verification')
      setEmail(data.user.email);

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <MainLayout>
      <ImageBackground
        source={require('../../../assets/images/shape1.png')}
        style={{ width: 210, height: 300 }}
        className='absolute'
      />


      <View className='p-4 mt-[200px]'>
          <Text className='font-bold text-2xl text-purple underline'>Create Account</Text>
          <TextInput
                  className="border-2 border-purple p-3 m-3 rounded-full text-purple font-semibold mt-[45px]"
                  onChangeText={setFullName}
                  value={fullName??''}
                  keyboardType='default'
                  placeholder="FullName..."
                  placeholderTextColor="#912F56"
            />

          <RepeatedFields/>
          <Text className='font-bold text-sm text-gray-600 text-center'>{message}</Text>
          

          <View className="flex flex-row justify-end">
            <Image
                source={require('../../../assets/images/herb.png')}
                    style={{ width: 80, height: 80 }}
                    className='absolute left-9 mt-7 '
            />
            <TouchableOpacity
              onPress={Submit}
              className="bg-purple p-3 rounded-full w-40 mt-9 shadow-lg shadow-black/50"
            >
              <Text className="text-white text-center font-bold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

      </View>

    </MainLayout>
  )
}
