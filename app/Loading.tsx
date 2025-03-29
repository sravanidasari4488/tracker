import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const Loading = () => {
  const router = useRouter();
  const [animation] = useState(new Animated.Value(0)); // Start the animation at 0

  useEffect(() => {
    // Simulate a loading process (e.g., fetching user data)
    const timer = setTimeout(() => {
      router.replace('/Login'); // Redirect to the login page
    }, 2000); // 2 seconds loading time

    // Bus animation (move the image and transition to the bus)
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000, // Duration for one loop of animation
        useNativeDriver: true, // Ensure smooth animations
      })
    ).start();

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router, animation]);

  // Animated style for the initial image
  const startTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Move the image from the bottom-right to the center
  });

  // Animated style for the bus animation
  const busTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // Moves the bus 300px to the right
  });

  return (
    <View style={styles.container}>
            <Image source={require('@/assets/images/vit-ap.png')} style={styles.logo} />

      {/* Initial image (vit-ap.png) */}
      <Animated.View style={styles.initialImage}>
        <Image source={require('@/assets/images/vit.png')} style={styles.logo} />
      </Animated.View>

      {/* Animated bus */}
      <Animated.View style={[styles.busContainer, { transform: [{ translateX: busTranslateX }] }]}>
        <Image source={require('@/assets/images/bus4.png')} style={styles.busImage} />
      </Animated.View>

      {/* Loading indicator */}
      <ActivityIndicator size="large" color="#0a7ea4" style={styles.loadingIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color
  },
  initialImage: {
    position: 'absolute',
    bottom: 50,
    left: 300, // Position vit-ap.png at the bottom-right initially
  },
  logo: {
    width: 120,
    height: 120,
  },
  busContainer: {
    position: 'absolute',
    bottom: 100, // Adjust vertical position of bus animation
    left: '10%', // Initial position of the bus
  },
  busImage: {
    width: 120, // Adjust size of the bus image
    height: 60, // Adjust size of the bus image
  },
  loadingIndicator: {
    marginTop: 50, // Space between bus animation and loading indicator
  },
});

export default Loading;
