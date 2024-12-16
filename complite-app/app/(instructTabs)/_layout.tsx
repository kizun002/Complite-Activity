import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function instructTabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown : false,
        tabBarActiveTintColor: '#ffd33d',
    }}
    >
      <Tabs.Screen name="instructDashboard" options={{ 
            title : 'Dashboard',
            tabBarIcon : ({color, focused}) => (
                <Ionicons name={focused ? "book-sharp" : "book-outline"} size={24} color={color} />
            )
        }} 
        />
      <Tabs.Screen name="instructProfile" options={{ 
            title : 'Profile',
            tabBarIcon : ({color, focused}) => (
                <Ionicons name={focused ? "person-circle-sharp" : "person-circle-outline"} size={24} color={color} />
            )
        }} 
        />
    </Tabs>
  );
}