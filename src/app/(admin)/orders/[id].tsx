import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { OrderStatusList } from '@/src/types/types';
import { notifyUserAboutOrderUpdate } from '@/src/lib/notification';
import Colors from '@/src/constants/Colors';
import React from 'react';
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders';
import Loader from '@/src/components/Loader';

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  const {mutate: updateOrder} = useUpdateOrder()

  const updateStatus = async (status: string) => {
    await updateOrder({
      id: id,
      updatedFields: { status },
    });
    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  // Early return if order is undefined
  if (!order) {
    return <Text>Order not found</Text>; // Render this message if order is undefined
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_item}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={()=> updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color: order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}
