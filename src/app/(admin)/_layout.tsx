import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useColorScheme, StyleSheet, Animated, View } from 'react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '@/src/providers/AuthProvider';
import { useEffect, useRef } from 'react';

/**
 * Animated TabBarIcon component
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  isSelected: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate scale when the tab is selected or unselected
    Animated.timing(scale, {
      toValue: props.isSelected ? 1.2 : 1, // Scale up when selected
      duration: 200,
      useNativeDriver: true, // Use native driver for performance
    }).start();
  }, [props.isSelected]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <FontAwesome
        size={24}
        style={{ marginBottom: -3 }}
        color={props.color}
        name={props.name}
      />
    </Animated.View>
  );
}

export default function TabLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.
        light.tint,
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIconStyle: styles.tabIcon,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="cutlery" color={color} isSelected={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="list" color={color} isSelected={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} isSelected={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#87CEEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // for shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingBottom: 5, // Adjust for better alignment
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabIcon: {
    marginTop: 5,
  },
});
