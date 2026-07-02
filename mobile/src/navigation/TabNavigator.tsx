import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { theme } from '../components/theme';

const Tab = createBottomTabNavigator();

// Temporary screen placeholders
const DashboardScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Dashboard</Text></View>;
const AccountsScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Accounts</Text></View>;
const TransactionsScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Transactions</Text></View>;
const ProductsScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Products</Text></View>;
const SupportScreen = () => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Support</Text></View>;

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: true,
      tabBarActiveTintColor: theme.colors.primary.main,
      tabBarInactiveTintColor: theme.colors.neutral.text_secondary,
    }}>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Accounts" component={AccountsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Support" component={SupportScreen} />
    </Tab.Navigator>
  );
};
