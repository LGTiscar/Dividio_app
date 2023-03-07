  // LIBRARIES
  import { StatusBar } from "expo-status-bar";
  import { StyleSheet, View, Text, TextInput} from "react-native";
  import * as ImagePicker from 'expo-image-picker';
  import { useState } from 'react';
  import { useFonts } from 'expo-font';

  //CUSTOM COMPONENTS
  import Button from './components/Button';
  import ImageViewer from './components/ImageViewer';
  import ocr_parse from './components/ocr';

  const PlaceholderImage = require('./assets/divider.png');

  export default function App() {

    //Access fonts
    useFonts({
      'QS-medium': require('./assets/fonts/Quicksand-Light.ttf'),
      'QS-light': require('./assets/fonts/Quicksand-Medium.ttf'),
      'QS-reg': require('./assets/fonts/Quicksand-Regular.ttf'),
      'QS-semibold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
      'QS-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const Bill = {
      Bill: {
          Item1 : {
              Price: "Price1", clients : ["Luis", "Andrea"]
          },
          Item2 : {
              Price: "Price2", clients: ["Luis", "Andrea", "Dasua"]
          },
          Item3 : {
              Price: "Price3", clients: ["Luis", "Dani", "Dasua"]
          },
      }
    }

    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        alert('You did not select any image.');
      }
    };

    const [myValue, setMyValue] = useState("")

    return (
      
      // Page main container
      <View style={styles.container}>

        {/* Image Container */}
        <View style={styles.imageContainer}>

          {/* Dividio Icon */}
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
          />     
        </View>
        {/* Dividio title */}
        <Text style={styles.titleText}>
          DIVIDIO
        </Text>
        {/* Dividio subtitle */}
        <Text>Splitting bills made simple!</Text>

        {/* Buttons container */}
        <View style={styles.footerContainer}>
          <Button theme='primary' label="Choose a photo" onPress={pickImageAsync}/>
          <Button label="Calculate Bill" />
        </View>
        
        <StatusBar style="auto" />

        <TextInput>
        </TextInput>

      </View>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDF1D6',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1/15,
      paddingTop: 58,
      alignItems: 'center'
    },
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
      paddingTop: 15
    },
    titleText: {
      fontSize: 50,
      fontFamily: 'QS-medium',
      paddingBottom: 15
    },
    text: {
      color: '#9DC08B',
      paddingBottom: 10,
      fontFamily: 'QS-reg',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      paddingBottom: 100,
    },
    
    // bill:

  });