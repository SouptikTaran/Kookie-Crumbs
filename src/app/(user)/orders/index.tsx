import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/components/OrderListItem';
import { useMyOrderList } from '@/src/api/orders';
import Loader from '@/src/components/Loader';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
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