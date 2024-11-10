import { Text, FlatList,StyleSheet } from 'react-native';
import OrderListItem from '@/components/OrderListItem';
import { useMyOrderList } from '@/src/api/orders';
import Loader from '@/src/components/Loader';
import { View } from 'react-native';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.noOrdersContainer}>
        <Text style={styles.noOrdersText}>You have no orders yet.</Text>
        <Text style={styles.suggestionText}>Browse our menu and place an order to get started!</Text>
      </View>
    );
  }

  // console.log(orders)

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}


const styles = StyleSheet.create({
  noOrdersContainer: {
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});












