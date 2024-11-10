import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/src/api/orders';
import Loader from '@/src/components/Loader';

export default function ArchiveOrdersScreen() {
    const {
        data: orders,
        isLoading,
        error,
      } = useAdminOrderList({ archived: true });
    
    
      if (isLoading) {
        return <Loader />;
      }
      if (error) {
        return <Text>Failed to fetch</Text>;
      }
    


    return (
        <FlatList
        data={orders}             
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    );
}