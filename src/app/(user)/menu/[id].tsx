// import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
// import React, { useState } from 'react'
// import { router, Stack, useLocalSearchParams } from 'expo-router'
// import { defaultPizzaImage } from '@/src/components/ProductListItem'
// import Button from '@/src/components/Button'
// import { useCart } from '@/src/providers/CartProvider'
// import { PizzaSize } from '@/src/types/types'
// import { useProduct } from '@/src/api/products'
// import RemoteImage from '@/src/components/RemoteImage'


// const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']




// const ProductDetailsScreen = () => {
//   const [selectedSize, setSelectedSize] = useState('M');
//   const { addItem } = useCart()

//   const { id: idString } = useLocalSearchParams()
  
//   const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

//   const {data: product , error} = useProduct(id)

//   if(error){
//     return <Text>Failed To fetch Product</Text>
//   }
  
//   const addToCart = () => {
//     if(!product) return
//     addItem(product , selectedSize)
//     router.push('/cart')
//   }


//   if (!product) return <Text>Product Not Found</Text>
//   return (
//     <View style={styles.container}>
//       <Stack.Screen options={{ title: `${product?.name}` }} />
//       <RemoteImage path={ product?.image} fallback={defaultPizzaImage} style={styles.image} />

//       <Text>Select Size</Text>
//       <View style={styles.sizes}>
//         {sizes.map((size) => (
//           <Pressable
//             key={size}
//             onPress={() => setSelectedSize(size)}
//             style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]}
//           >
//             <Text style={styles.sizeText}>{size}</Text>
//           </Pressable>
//         ))}
//       </View>



//       <Text style={styles.price}>${product?.price}</Text>
//       <Button onPress={addToCart} text="Add to cart" />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//     padding: 10,
//   },
//   image: {
//     width: '100%',
//     aspectRatio: 1
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 'auto'
//   },
//   sizes: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10
//   },
//   size: {
//     backgroundColor: 'gainsboro',
//     width: 50,
//     aspectRatio: 1,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   sizeText: {
//     fontSize: 20,
//     fontWeight: '500'
//   },
// })

// export default ProductDetailsScreen


import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';
import RemoteImage from '@/src/components/RemoteImage';
import Loader from '@/src/components/Loader';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const { addItem } = useCart();
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: product, error } = useProduct(id);

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (error) {
    Alert.alert('Error', 'Product not found');
    return <Text style={styles.errorText}>Product not found</Text>;
  }

  if (!product) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable accessibilityLabel="Go to Edit">
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

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      {/* Pizza size selector */}
      <Text style={styles.sizeLabel}>Select Size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSize,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </Pressable>
        ))}
      </View>

      {/* Add to Cart Button */}
      <Button text="Add to Cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
  sizeLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  sizeButton: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedSize: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  sizeText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default ProductDetailsScreen;
