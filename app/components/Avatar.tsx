/** @format */

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { fonts } from "../theme/fonts";

interface AvatarProps {
  size?: number;
  image?: string;
  name?: string;
}

export default function Avatar({ size = 100, image, name }: AvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (image) {
    return (
      <Image
        source={{ uri: image }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 }
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#E0E0E0"
        }
      ]}>
      {name ? (
        <Text style={[styles.initials, { fontSize: size * 0.4, fontFamily: fonts.semiBold }]}>
          {getInitials(name)}
        </Text>
      ) : (
        <View style={styles.defaultAvatar}>
          <View
            style={[
              styles.head,
              {
                width: size * 0.4,
                height: size * 0.4,
                borderRadius: size * 0.2
              }
            ]}
          />
          <View
            style={[
              styles.body,
              {
                width: size * 0.6,
                height: size * 0.5,
                borderRadius: size * 0.3
              }
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  initials: {
    color: "#666",
    fontWeight: "600"
  },
  defaultAvatar: {
    alignItems: "center",
    justifyContent: "center"
  },
  head: {
    backgroundColor: "#999",
    marginBottom: 5
  },
  body: {
    backgroundColor: "#999"
  }
});
