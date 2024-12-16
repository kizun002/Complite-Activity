import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function studTabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown : false,
        tabBarActiveTintColor: '#E93023',
    }}
    >
      <Tabs.Screen name="studDashboard" options={{ 
            title : 'Dashboard',
            tabBarIcon : ({color, focused}) => (
                <Ionicons name={focused ? "book-sharp" : "book-outline"} size={24} color={color} />
            )
        }} 
        />
      <Tabs.Screen name="studActivity" options={{ 
            title : 'Activity',
            tabBarIcon : ({color, focused}) => (
                <Ionicons name={focused ? "pencil-sharp" : "pencil-outline"} size={24} color={color} />
            )
        }} 
        />
      <Tabs.Screen name="studProfile" options={{ 
            title : 'Profile',
            tabBarIcon : ({color, focused}) => (
                <Ionicons name={focused ? "person-circle-sharp" : "person-circle-outline"} size={24} color={color} />
            )
        }} 
        />
    </Tabs>
  );
}