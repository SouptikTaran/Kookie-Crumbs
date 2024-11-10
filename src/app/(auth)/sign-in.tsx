import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.header}>Welcome Back 👋</Text>
      <Text style={styles.subHeader}>Sign in to your account</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="john@gmail.com"
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="* * * * * "
          style={styles.passInput}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <FontAwesome name={passwordVisible ? 'eye' : 'eye-slash'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? 'Signing in...' : 'Sign In'}
        style={styles.signInButton}
      />

      <Link href="/sign-up" style={styles.textButton}>
        Don't have an account? Sign Up
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#f7f8fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  passInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  textButton: {
    alignSelf: 'center',
    color: Colors.light.tint,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
