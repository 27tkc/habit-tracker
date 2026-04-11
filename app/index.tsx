import { useAuth } from "@/lib/auth-context";
import { Redirect, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isLoadingUser) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/auth");
    } else if (user && inAuthGroup) {
      router.replace("/(protected)/(tabs)");
    }
  }, [user, segments, isLoadingUser]);

  if (isLoadingUser) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return user ? (
    <Redirect href="/(protected)/(tabs)" />
  ) : (
    <Redirect href="/(auth)/auth" />
  );
}
