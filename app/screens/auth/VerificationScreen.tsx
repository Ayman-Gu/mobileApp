import { UserContext } from '@/app/context/UserContext';
import MainLayout from '@/app/layout/MainLayout'
import { useRouter } from 'expo-router';
import React, { useContext, useRef, useState } from 'react'
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function VerificationScreen() {

    const { email } = useContext(UserContext);

  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState(["", "", "", ""]); // one per digit
  const router = useRouter();    

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move focus to next input
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  const Verify = async () => {
    const code = otp.join(""); // combine all digits
    try {
      const response = await fetch('https://newsapp-webservice.netlify.app/.netlify/functions/user-VerifyCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      if (response.ok) {
            console.log('email from context',email)
            router.push('/screens/HomeScreen'); 
        }
    } catch (error) {
      console.log(error);
    }
  }

  const SendAgain = async () => {
    try {
      const response = await fetch('https://newsapp-webservice.netlify.app/.netlify/functions/user-SendVerification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        return;
      }
      console.log('Code sent again:', data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <MainLayout>
      <ImageBackground
        source={require('../../../assets/images/shape1.png')}
        style={{ width: 210, height: 300 }}
        className='absolute'
      />

      <View className='p-4 mt-[20px]'>
        <Text className='font-bold text-2xl text-gray-700 underline text-center'>Verify Your Email</Text>
        
        <View className="flex-row space-x-2.5 justify-center mt-9">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              className="w-16 h-16 text-center text-xl font-semibold border rounded-md bg-gray-300 border-gray-300 focus:border-purple"
            />
          ))}
        </View>

        <Text className='font-bold text-sm text-purple mt-11 p-9 text-center'>
          *Please if you don't receive the code just click send again or verify your credentials
        </Text>

        <View className="flex flex-row justify-around">
          <TouchableOpacity
            onPress={SendAgain}
            className="bg-gray-500 p-3 rounded-full w-40 mt-9 shadow-lg shadow-black/50"
          >
            <Text className="text-white text-center font-bold">Send Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={Verify}
            className="bg-purple p-3 rounded-full w-40 mt-9 shadow-lg shadow-black/50"
          >
            <Text className="text-white text-center font-bold">Verify</Text>
          </TouchableOpacity>
        </View>

      </View>

      <TouchableOpacity
        onPress={() => router.push('/screens/auth/RegisterScreen')}
        className="bg-purple p-3 rounded-full w-10 mt-2 ml-2 shadow-lg shadow-black/50"
      >
        <Text className="text-white text-center font-bold">a</Text>
      </TouchableOpacity>
    </MainLayout>
  )
}
