import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const Index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  if (!isAdmin) {
    return <Redirect href="/(user)" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Admin</Text>
      <Text style={styles.subtitle}>Choose an option below</Text>

      <View style={styles.buttonContainer}>
        <Link href="/(admin)/menu" asChild>
          <Button text="Admin Menu" style={styles.button} />
        </Link>
        <Link href="/(user)/menu" asChild>
          <Button text="User Menu" style={styles.button} />
        </Link>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => supabase.auth.signOut()}
      >
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f4f6f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Index;
