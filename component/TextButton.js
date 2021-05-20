import React from 'react'
import { Text, TouchableOpacity, StyleSheet,Platform } from 'react-native'
import { purple } from '../utils/colors'
export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
    backgroundColor: '#f8f',
    padding:10,
    borderRadius: Platform.OS === 'ios' ? 16 : 5,

  }
})