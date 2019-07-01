import * as WebBrowser from 'expo-web-browser'
import React, { useState, useEffect } from 'react'
import {
   Image,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   AsyncStorage,
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import MapView from 'react-native-maps'
import { Marker, Polygon } from 'react-native-maps'

import { MonoText } from '../components/StyledText'

// const routes = []

export default function HomeScreen() {
  

   const [routes,setRoutes] = useState([])
   console.log('routes', routes)
   const [locations, setLocations] = useState({
      latitude: 33.7490,
      longitude: -84.3880,
      title: 'Atlanta, GA',
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0821,
   })

   const getLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
         console.log('Permission to access location was denied')
      }
      await _getLocationAsync()
      await Location.startLocationUpdatesAsync('LOCATION_TRACKER', {
         accuracy: Location.Accuracy.Balanced,
      })
   }
   useEffect(()=>{
      setInterval(()=>getLocation(), 15000)
        return;
   }
      ,[])

   const onPress = async () => {
      setRoutes([])
      _getLocationAsync()
   }


   const _getLocationAsync = async () => {
      console.log('location clicked')
      const latitude = await AsyncStorage.getItem('lat')
      const longitude = await AsyncStorage.getItem('lng')
      let locations = {latitude, longitude}
      // let locations = await Location.getCurrentPositionAsync({})
      locations.latitudeDelta = 0.00522
      locations.longitudeDelta = 0.00521
      locations.title = 'My Location'
      console.log('currentLocation', locations)
      routes.push(locations)
      setLocations(locations)
   }

   return (
      <View style={styles.container}>
         <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
               <Text>My Location Tracker</Text>
               <TouchableOpacity onPress={onPress} style={styles.helpLink}>
                  <Image
                     source={require('../assets/images/robot-dev.png')}
                     style={styles.welcomeImage}
                  />
               </TouchableOpacity>
            </View>

            <View style={styles.getStartedContainer}>
               <View
                  style={[
                     styles.codeHighlightContainer,
                     styles.homeScreenFilename,
                  ]}>
                  <MonoText>
                     Click the icon to fetch your current Location :{' '}
                  </MonoText>
                  <MonoText>
                     {locations ? locations.latitude : 'Lat'}{' '}
                     {locations ? locations.longitude : 'Lng'}
                  </MonoText>
               </View>
            </View>
            <MapView
               style={{ width: '100%', height: 500 }}
               initialRegion={locations}
               region={locations}
               //   onRegionChange={this.onRegionChange}
            >
               <Marker coordinate={locations} title={locations.title}>
                  <Image
                     style={{ width: 30, height: 50 }}
                     source={require('../assets/images/marker.png')}
                  />
               </Marker>
            {routes.length>0 &&  
            <Polygon coordinates={routes.map(route=>({
               latitude:route.latitude, 
               longitude:route.longitude
            }))

        }/>}
            </MapView>
         </ScrollView>
      </View>
   )
}

HomeScreen.navigationOptions = {
   header: null,
}

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
      paddingTop: 40,
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
      width: '97.5%',
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 1,
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
})
