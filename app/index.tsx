
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css'
import RegisterScreen from './screens/auth/RegisterScreen';
import UserProvider from './context/UserContext';
import VerificationScreen from './screens/auth/VerificationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import HomeScreen from './screens/HomeScreen';


export type roots={
    Login:undefined,
    Register:undefined,
    Verification:undefined,
    Home:undefined,


  }
const Stack=createNativeStackNavigator<roots>()

export default function App() {

  return (
    <UserProvider>

      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Verification" component={VerificationScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>

      </Stack.Navigator>

    </UserProvider>

  );
}