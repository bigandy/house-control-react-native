import * as React from "react";
import { Button, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import { styles } from "../styles/tabs";

export default function TabOneScreen() {
  const [pressed, setPressed] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const handleButtonPress = () => {
    setCount((c) => c + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>First Tab</Text>
      <View
        style={styles.separator}
        lightColor="#f0f00f"
        darkColor="rgba(255,0,0,0.7)"
      />
      <Text style={styles.text}>So this is the first tab</Text>

      <Button onPress={handleButtonPress} title={"Increment the number"} />

      <Text style={styles.text}>{count}</Text>
    </View>
  );
}
