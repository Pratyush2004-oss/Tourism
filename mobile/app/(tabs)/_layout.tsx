import { useAuthStore } from "@/assets/store/auth.store";
import ChatBot from "@/components/Chatbot";
import Sidebar from "@/components/Sidebar"; // <-- import Sidebar
import TabHeader from "@/components/TabHeader";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();
  const segments = useSegments();
  const { user, token } = useAuthStore();
  useEffect(() => {
    const isTabScreen = segments[0] === "(tabs)";
    const isSignedIn = user && token;

    if (!isSignedIn && isTabScreen) router.replace("/(auth)");
  }, [user, segments, token]);

  return (
    <View style={{ flex: 1 }}>
      <TabHeader onSidebarPress={() => setSidebarVisible(true)} />
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            color: Colors.PRIMARY,
            fontWeight: "600",
          },
          tabBarActiveTintColor: Colors.PRIMARY,
          headerShadowVisible: false,
          tabBarStyle: {
            borderTopWidth: 1,
            padding: 10,
            paddingBottom: insets.bottom,
            height: 50 + insets.bottom,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="bookings"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmarks-outline" color={color} size={size} />
            ),
            tabBarLabel: "Bookings",
          }}
        />
        <Tabs.Screen
          name="createCustomPackage"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bed-outline" color={color} size={size} />
            ),
            tabBarLabel: "Own Package",
          }}
        />
        <Tabs.Screen
          name="hotels"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bed-outline" color={color} size={size} />
            ),
            tabBarLabel: "Hotels",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person-circle-outline"
                color={color}
                size={size}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
      <ChatBot />
    </View>
  );
}
