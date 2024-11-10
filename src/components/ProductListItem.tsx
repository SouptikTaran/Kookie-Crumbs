import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Product, Tables } from '@/src/types/types';
import { Link, useSegments } from "expo-router";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';



type ProductListItemProps = {
    product: Product
}





const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments();
    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <RemoteImage path={product.image}
                    fallback={defaultPizzaImage}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        maxWidth: '50%',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    }
});

export default ProductListItem