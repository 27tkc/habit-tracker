import { useAuth } from "@/lib/auth-context";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/auth" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
