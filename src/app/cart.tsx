import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
  const { items, total , checkout } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Items Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button text='Checkout' onPress={checkout} />
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 80, // add some space for the bottom button
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  totalContainer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});
