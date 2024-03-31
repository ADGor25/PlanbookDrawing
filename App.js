import React, { useState } from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path } from "@shopify/react-native-skia";

export default function Draw() {
  const [paths, setPaths] = useState([]);

  const pan = Gesture.Pan()
    .onStart((g) => {
      setPaths(prevPaths => {
        const newPaths = [...prevPaths];
        newPaths.push({
          segments: [`M ${g.x} ${g.y}`], // Initialize segments with start point
          color: "#06d6a0",
        });
        return newPaths;
      });
    })
    .onUpdate((g) => {
      setPaths(prevPaths => {
        if (prevPaths.length === 0) return prevPaths; // Return if no paths are drawn yet
        const index = prevPaths.length - 1;
        const newPaths = [...prevPaths];
        newPaths[index].segments.push(`L ${g.x} ${g.y}`); // Add line segment
        return newPaths;
      });
    })
    .minDistance(1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <Canvas style={{ flex: 1 }}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(" ")}
                strokeWidth={5}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
