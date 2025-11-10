import React, { ReactNode } from 'react'
import { View } from 'react-native'
import '../global.css'

export default function MainLayout({children}:{children:ReactNode}) {
  return (
    <View>
        {children}
    </View>
  )
}
