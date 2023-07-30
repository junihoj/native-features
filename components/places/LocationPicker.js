import React from "react";
import { View } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const LocationPicker = () => {
  const navigation = useNavigation();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const verifyLocationPermission = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();
      return permissionRes.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Perssion!",
        "You need to grant Location access to use this application "
      );
      return false;
    }

    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyLocationPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync({});
  };
  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };
  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View>
        <OutlinedButton onPress={getLocationHandler} icon="location">
          Locate User
        </OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} icon="map">
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default LocationPicker;
