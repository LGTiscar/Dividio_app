import { StyleSheet, Image, Text } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage, checkedImage}) {
    const imageSource = selectedImage !== null
    ? checkedImage 
    : placeholderImageSource;
    return (
          <Image source={imageSource} style={styles.image} /> 
    );
}

const styles = StyleSheet.create({
    image: {
      width: 40,
      height: 40,
      borderRadius: 18,
    },
  });
  