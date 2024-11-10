import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import { useProductList } from '@/src/api/products';
import Loader from '@/src/components/Loader';




export default function MenuScreen() {
  const { data: products, error, isLoading }:any = useProductList();  
  
  if(isLoading){
    return <Loader />
  }

  if(error){
    return <Text>Failed to fetch products</Text>
  }
  return (
    <View>
      {/* <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} /> */}

      <FlatList data={products}  renderItem={({item})=> <ProductListItem product={item}  />} numColumns={2} 
      contentContainerStyle={{gap: 10,  padding: 10}}
      columnWrapperStyle={{gap: 10}}
      />
    </View>
  );
}


