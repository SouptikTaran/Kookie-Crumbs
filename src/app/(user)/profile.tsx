import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '@/src/lib/supabase';

const ProfileScreen = () => {
  // Example user data (replace with actual user data from Supabase)
  const [user, setUser] = useState({
    username: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://avatar.iran.liara.run/public', // Remote image or use a default one
  });

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>

        yF9FjJFz@7wJfLt
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'center',
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#4F46E1',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    marginTop: 32,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProfileScreen;
