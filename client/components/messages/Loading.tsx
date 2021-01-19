import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Button} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';

const Loading: React.FC = () => {
  const LottieRef = useRef<AnimatedLottieView>(null);
  
  const resetAnimation = () => {
    if (LottieRef.current !== null) {
      LottieRef.current.reset();
      LottieRef.current.play();
    }
  };

  useEffect(() => {
    if (LottieRef.current !== null) {
      LottieRef.current.play();
    }
    return ( () => {
      console.log('unmounted', LottieRef);
    });
  },[]);
 

  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={LottieRef}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        loop={true}
        source={require('../../assets/animation.json')}
      />
      <View style={styles.buttonContainer}>
        <Button title="Restart Animation" onPress={resetAnimation} />
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default Loading;