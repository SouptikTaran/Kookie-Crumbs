import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import ActiveOrdersScreen from './index';
import ArchiveOrdersScreen from './archive';
import { StatusBar } from 'react-native';

// Create the navigator
const TopTab = createMaterialTopTabNavigator();



export default function OrderListNavigator() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
        <TopTab.Navigator>
          <TopTab.Screen name="index" component={ActiveOrdersScreen} options={{ title: 'Active' }} />
          <TopTab.Screen name="another" component={ArchiveOrdersScreen} options={{ title: 'Archive' }} />
        </TopTab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
