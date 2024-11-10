import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/src/api/products';
import React from 'react';
import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/src/lib/supabase';
import { decode } from 'base64-arraybuffer';
import RemoteImage from '@/src/components/RemoteImage';

const CreateProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [creating, setCreating] = useState('Create')
  const [updating, setUpdating] = useState('Update')
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false)
  const [hasImage, sethasImage] = useState(false);


  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === 'string' ? idString : idString?.[0]
  );
  const isUpdating = !!idString;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName('');
    setPrice('');
  };

  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price is not a number');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      // update
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }
    setCreating('Creating')
    setLoading(true)

    const imagePath = await uploadImage();

    // Save in the database
    insertProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          setCreating('Created')
          setLoading(false)
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }
    setUpdating('Updating')
    setLoading(true)

    const imagePath = await uploadImage();

    updateProduct(
      { id, name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          setUpdating('Updated')
          setLoading(false)
          resetFields();
          router.back();
        },
      }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      sethasImage(true)
      setImage(result.assets[0].uri);
    }
  };
  const onDelete = () => {
    setDeleting(true);
    deleteProduct(id, {
      onSuccess: () => {
        setDeleting(false);
        resetFields();
        router.replace('/(admin)');
      },
      onError: () => {
        setDeleting(false);
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
  };

  const uploadImage = async () => {
    if (!image || !image?.startsWith('file://')) {
      console.log('Invalid image URI:', image);
      return null; // Handle cases where the image is not a local file
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
      />

      {!hasImage && <RemoteImage path={image} fallback={defaultPizzaImage} style={styles.image} />}
      {hasImage && <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />}

      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: 'red' }}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? `${updating}` : `${creating}`} disabled={loading} />
      {isUpdating && (<View style={styles.deleteContainer}>
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      </View>
      )
      }

      {(loading || deleting) && (
        <Modal transparent={true} animationType="none" visible={loading || deleting}>
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </Modal>
      )}

    </View >
  );
};

export default CreateProductScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },

  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
  loader: {
    marginLeft: 5,
  },
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center', // Center horizontally if desired
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },
});