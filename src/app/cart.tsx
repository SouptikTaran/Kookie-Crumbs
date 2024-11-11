import { Platform, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';
import { useRouter } from 'expo-router';

const CartScreen = () => {
  const { items, total, checkout } = useCart();
  const router = useRouter()
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>Looks like you haven’t added any items yet</Text>
        <Button text="Order Now" onPress={() => router.push('/')} style={styles.shopButton} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        </View>
        <Button text='Proceed to Checkout' onPress={checkout} style={styles.checkoutButton} />
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 8,
    paddingVertical: 12,
  },
});
