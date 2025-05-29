import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { SHOPPING } from "@/assets/services/Options";
import { imageMap } from "@/assets/services/imageMap"; // Make sure this exists
import { useAuthStore } from "@/assets/store/auth.store";

export default function Shopping({ title }: { title: string }) {
  const { user } = useAuthStore();
  const handlePress = (url: string) => {
    if (url) {
      Linking.openURL(`${url}&subid=${user?.mobile || ""}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <FlatList
        data={SHOPPING}
        numColumns={4}
        keyExtractor={(item, idx) => item.name?.toString() || idx.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            activeOpacity={0.8}
            onPress={() => handlePress(item.path)}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={
                  imageMap[item.image] || require("@/assets/images/logo.png")
                }
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 8,
    marginTop: 10,
    marginLeft: 10,
  },
  gridItem: {
    flex: 1,
    alignItems: "center",
    marginBottom: 18,
    paddingHorizontal: 6,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: "95%",
    height: "95%",
    borderRadius: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 2,
  },
  poweredBy: {
    fontSize: 11,
    marginTop: 2,
    color: "#6b7280",
    textAlign: "center",
  },
});
