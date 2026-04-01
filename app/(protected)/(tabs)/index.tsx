import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text>Home Screen</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
