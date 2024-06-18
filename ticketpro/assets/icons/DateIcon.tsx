import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"

const DateIcon = () => {
  return (
    <Svg
    width={19}
    height={19}
    viewBox="0 0 19 19"
    fill="none"
  >
    <Path
      d="M5.26 8.563h1.502v1.503H5.26V8.563zm0 3.006h1.502v1.503H5.26v-1.503zm3.005-3.006h1.503v1.503H8.265V8.563zm0 3.006h1.503v1.503H8.265v-1.503zm3.006-3.006h1.503v1.503h-1.503V8.563zm0 3.006h1.503v1.503h-1.503v-1.503z"
      fill="#333"
    />
    <Path
      d="M3.757 16.83h10.521c.83 0 1.503-.674 1.503-1.503V4.807c0-.83-.674-1.504-1.503-1.504h-1.503V1.8h-1.503v1.503H6.763V1.8H5.26v1.503H3.757c-.829 0-1.503.674-1.503 1.503v10.521c0 .83.674 1.503 1.503 1.503zM14.278 6.31l.001 9.017H3.757V6.31h10.521z"
      fill="#333"
    />
  </Svg>
  )
}

export default DateIcon

const styles = StyleSheet.create({})