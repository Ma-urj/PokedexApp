import { View, Text } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

export default function Loading() {
  return (
    <View className="flex-1 flex-row justify-center">
      <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" animationConfig={{duration: 30}}/>
    </View>
  )
}