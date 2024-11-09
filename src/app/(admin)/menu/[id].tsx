import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { useProduct } from '@/src/api/products'


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize]: any = useState('M');
  const { addItem } = useCart()

  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const {data: product , error} = useProduct(id)

  const addToCart = () => {
    if (!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }


  if (!product) return <Text>Product Not Found</Text>

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product?.name}` }} />
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable accessibilityLabel="Go to Home">
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
})

export default ProductDetailsScreen
