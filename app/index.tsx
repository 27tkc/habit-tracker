import { Redirect } from "expo-router";

export default function Index() {
  // temporary auth state
  const isAuth = false;

  if (isAuth) {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return <Redirect href="/(auth)/auth" />;
}
