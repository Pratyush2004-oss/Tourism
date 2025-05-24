import { CAROUSELIMAGE } from "@/assets/services/Options";
import { imageMap } from "@/assets/services/imageMap";
import { useAuthStore } from "@/assets/store/auth.store";
import Disclaimer from "@/components/Disclaimer";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const segments = useSegments();

  const { token, user } = useAuthStore();

  // handle navigation based on auth state
  useEffect(() => {
    const isAuthScreen = segments[0] === "(auth)";
    const isTabScreen = segments[0] === "(tabs)";
    const isSignedIn = user && token;

    if (isSignedIn && isAuthScreen) router.replace("/(tabs)");
    if(!isSignedIn && isTabScreen) router.replace("/(auth)");
  }, [user, segments, token]);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View>
        <Carousel
          width={width}
          height={220}
          autoPlay
          data={CAROUSELIMAGE}
          scrollAnimationDuration={1800}
          renderItem={({ item }) => (
            <ImageBackground
              source={imageMap[item.image]}
              style={{
                width: width - 2,
                height: 200,
                alignSelf: "center",
                overflow: "hidden",
                justifyContent: "flex-end",
              }}
              imageStyle={{}}
            >
              {/* Render content inside the image */}
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 16,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 4,
                  }}
                >
                  {item.content}
                </Text>
              </View>
            </ImageBackground>
          )}
        />
      </View>
      <Disclaimer />
      <TouchableOpacity
        onPress={() => router.push("/(auth)")}
        style={styles.button}
      >
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    paddingVertical: 15,
    width: 300,
    alignSelf: "center",
    textAlign: "center",
    color: "blue",
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 700,
    color: "white",
    textAlign: "center",
  },
});
