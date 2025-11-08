import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import './global.css'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text className="text-white text-2xl font-bold">
        Hello NativeWind!
      </Text>
      <Text className="text-white mt-4">
        Tailwind CSS is working!
      </Text>
      <StatusBar style="light" />
    </View>
  );
}