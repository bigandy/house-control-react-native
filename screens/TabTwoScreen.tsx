import * as React from "react";

import { Text, View } from "../components/Themed";

import { styles } from "../styles/tabs";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#f0f00f"
        darkColor="rgba(255,0,0,0.7)"
      />
      <Text style={styles.text}>
        So this is the <strong>second</strong> tab
      </Text>
    </View>
  );
}
