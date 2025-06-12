/** @format */

import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageSourcePropType
} from "react-native";

export default function Avatar({
  size = 120,
  image,
  name
}: {
  size?: number;
  image?: string | ImageSourcePropType;
  name?: string;
}) {
  const isLocalImage = typeof image !== "string";

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 }
      ]}>
      {image ? (
        <Image
          source={isLocalImage ? image : { uri: image }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.initials}>{name ? name[0] : "?"}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center"
  },
  initials: {
    fontSize: 40,
    color: "#aaa"
  }
});
