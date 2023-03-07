  // LIBRARIES
  import { StatusBar } from "expo-status-bar";
  import { StyleSheet, View, Text, TextInput} from "react-native";
  import * as ImagePicker from 'expo-image-picker';
  import { useState } from 'react';
  import { useFonts } from 'expo-font';

  // CUSTOM COMPONENTS
  import Button from './components/Button';
  import ImageViewer from './components/ImageViewer';
  import extractTextFromImage from './components/ocr';

  // APP CODE
  export default function App() {

    /////////////////////////////////////////////// PROPERTIES /////////////////////////////////////////////////////////////////////
    // Dividio icon required variable
    const PlaceholderImage = require('./assets/divider.png');
    const checkedImage = require('./assets/checked.png');

    // Declare state image variable: When the user clics on the button Choose a photo, it calls 
    // pickImageAsync method. This method allows the user to select a photo. If they selected a 
    // valid photo or didn't cancel the selection, we call the setSelectedImage method of the state variable
    // Then react renders the selectedImage value with the selected photo URI.
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Same for the OCR extracted text from the photo
    const [extractedText, setExtractedText] = useState(null);

    // Same for user's input names
    // const [myValue, setMyValue] = useState("")

    // Possible Bill object declaration
    // const Bill = {
    //   Bill: {
    //       Item1 : {
    //           Price: "Price1", clients : ["Luis", "Andrea"]
    //       },
    //       Item2 : {
    //           Price: "Price2", clients: ["Luis", "Andrea", "Dasua"]
    //       },
    //       Item3 : {
    //           Price: "Price3", clients: ["Luis", "Dani", "Dasua"]
    //       },
    //   }
    // }

    //Access fonts
      
    useFonts({
      'QS-medium': require('./assets/fonts/Quicksand-Light.ttf'),
      'QS-light': require('./assets/fonts/Quicksand-Medium.ttf'),
      'QS-reg': require('./assets/fonts/Quicksand-Regular.ttf'),
      'QS-semibold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
      'QS-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    });

    /////////////////////////////////////////////// METHODS /////////////////////////////////////////////////////////////////////
    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      console.log('Image selected')
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        alert('You did not select any image.');
      }
    };

    async function handleImageUpload() {
      console.log('Button pressed');
      // extract text from image
      const text = await extractTextFromImage(selectedImage);
      // set extracted text as state
      setExtractedText(text);
      console.log('Extracted text:', text);
    }
    /////////////////////////////////////////////// APP RETURN /////////////////////////////////////////////////////////////////////

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

        {/* Selected image */}
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
            checkedImage={checkedImage}
            theme={"primary"}
          />
        </View>

        {/* Buttons container */}
        <View style={styles.footerContainer}>
          <Button theme='primary' label="Choose a photo" onPress={pickImageAsync}/>
          <Button label="Calculate Bill" onPress={handleImageUpload()}/>
        </View>
        
        <Text style={styles.extracted_text}>{extractedText}</Text>

        <StatusBar style="auto" />

        <TextInput>
        </TextInput>

      </View>
      
    );
  }

  /////////////////////////////////////////////// STYLE /////////////////////////////////////////////////////////////////////
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDF1D6',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1/15,
      paddingTop: 40,
      alignItems: 'center'
    },
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
      paddingTop: 30
    },
    titleText: {
      fontSize: 50,
      // fontFamily: 'QS-medium',
      paddingBottom: 15
    },
    text: {
      color: '#9DC08B',
      paddingBottom: 10,
      // fontFamily: 'QS-reg',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      paddingBottom: 100,
    },
    extracted_text: {
      color: '#609966',
      paddingTop: 40,
      // fontFamily: 'QS-light',
      alignItems: 'center'
    },
    
    // bill:

  });