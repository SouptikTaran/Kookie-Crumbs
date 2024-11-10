import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <Modal transparent={true} animationType="fade">
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({

    loader: {
      marginLeft: 5,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for blur effect
      justifyContent: 'center',
      alignItems: 'center',
    },
  });