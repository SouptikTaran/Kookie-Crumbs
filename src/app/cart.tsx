import { Platform, StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {useCart} from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'



const cartScreen = () => {
  const {items} = useCart()

  return (
    <View>
      <FlatList 
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        contentContainerStyle={{padding: 10 , gap: 10}}
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default cartScreen

const styles = StyleSheet.create({})