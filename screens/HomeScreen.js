import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {

   const [locations, setLocations] = useState({
         latitude:33.7490, 
         longitude:-84.3880,
         title:'Atlanta, GA',
         // latitudeDelta:0.0122,
         // longitudeDelta:0.0121
      })

 const onPress = async () => {
    console.log('clicked')
    await _getLocationAsync();
   await Location.startLocationUpdatesAsync('LOCATION_TRACKER', {
     accuracy: Location.Accuracy.Balanced,
   });
 };

 const _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
   //   this.setState({
   //     errorMessage: 'Permission to access location was denied',
   //   });
   }

   let locations = await Location.getCurrentPositionAsync({});
   locations.coords.latitudeDelta = 0.00522;
   locations.coords.longitudeDelta = 0.00521;
   locations.coords.title='Sanfrancisco,CA'
   setLocations(locations.coords);
 };



  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
        <TouchableOpacity onPress={onPress} style={styles.helpLink}>
          <Image
            source={require('../assets/images/robot-dev.png')}
            style={styles.welcomeImage}
          />
          </TouchableOpacity>
        </View>

        <View style={styles.getStartedContainer}>
          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>Click the icon to fetch your current Location : {' '}</MonoText>
            <MonoText>{locations ? locations.latitude: 'Lat'}{' '}
            {locations ? locations.longitude:'Lng'}</MonoText>
          </View>
        </View>
        <MapView 
        style={{  width: '100%', height:400 }}
        initialRegion={locations}
        region={locations}
      //   onRegionChange={this.onRegionChange}
        >
            <Marker coordinate={locations} title={locations.title}>
               <Image 
               style={{ width:10, height:15 }}
               source={require('../assets/images/marker.png')}/>
            </Marker>
         </MapView>

      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 110,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
