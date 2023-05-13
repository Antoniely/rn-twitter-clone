import { Dimensions, Platform, StatusBar } from "react-native";

const HEIGHT_STATUSBAR = Platform.OS != "ios" ? StatusBar.currentHeight : 44;
const CONTAINER_HEIGHT = 135;
const {width, height} =Dimensions.get('screen')

export default {
  HEIGHT_STATUSBAR,
  CONTAINER_HEIGHT,
  width,
  height,
};
