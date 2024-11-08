import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types/types'


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']




const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const { addItem } = useCart()

  const { id } = useLocalSearchParams()
  const addToCart = () => {
    if(!product) return
    addItem(product , selectedSize)
    router.push('/cart')
  }

  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <Text>Product Not Found</Text>
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product?.name}` }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </Pressable>
        ))}
      </View>



      <Text style={styles.price}>${product?.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto'
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  },
})

export default ProductDetailsScreen