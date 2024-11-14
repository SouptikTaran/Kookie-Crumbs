import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/src/components/RemoteImage'

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error } = useProduct(id)

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product?.name}` }} />
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable accessibilityLabel="Edit Product">
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
      <RemoteImage path={product?.image} fallback={defaultPizzaImage} style={styles.image} />

      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>

      {/* Admin Action buttons */}
      <Button text="Edit Product" onPress={() => router.push(`/(admin)/menu/create?id=${id}`)} style={styles.editButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginVertical: 15,
    textAlign: 'center',
    color: Colors.light.text,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.tint,
    marginBottom: 20,
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availabilityLabel: {
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 10,
  },
  toggleButton: {
    marginTop: 10,
    backgroundColor: Colors.light.tint,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
  },
  editButton: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 15,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
})

export default ProductDetailsScreen
