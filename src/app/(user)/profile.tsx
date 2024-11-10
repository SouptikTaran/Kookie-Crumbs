import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { supabase } from '@/src/lib/supabase';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';


const ProfileScreen = () => {
  const {handleSignOut , session} = useAuth()
  const [user, setUser] = useState({
    username: session?.user?.user_metadata?.full_name ? session.user.user_metadata.full_name : "Customer",
    email: `${session?.user?.email || ''}`, // Add a fallback if email might be undefined
    profilePicture: `https://avatar.iran.liara.run/username?username=${session?.user?.user_metadata?.full_name || 'default'}`, // Add a fallback value here as well
});

  


  // If user is null, show a different screen or message
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.signOutMessage}>You have signed out successfully.</Text>
      </View>
    );
  }

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
  signOutMessage: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProfileScreen;
