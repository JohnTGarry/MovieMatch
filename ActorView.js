import React from "react";
import { Image, Text, View } from "react-native";
import { WHITE } from "./resources/colours";

const viewStyle = {
  padding: 0,
  margin: 0,
  textAlignVertical: "center",
  flexDirection: "row",
};

const imageStyle = {
  borderRadius: 5,
  width: 50,
  height: 50,
  marginTop: 6,
  marginBottom: 5,
  paddingTop: 5,
  paddingBottom: 5,
};

const nameStyle = {
  color: WHITE,
  paddingLeft: 10,
  marginTop: 5,
  marginBottom: 5,
  paddingTop: 5,
  paddingBottom: 5,
};

const ActorView = (props) => {
  const { imagePath, text } = props;

  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  const defaultImagePath = "./resources/images/icons8-name-96.png";
  // const imageSource = imagePath
  //   ? { uri: `${baseImageUrl}${imagePath}` }
  //   : require(defaultImagePath);
 
  return (
    <View style={viewStyle}>
      {/* <Image
        style={imageStyle}
        source={imageSource}
      /> */}
      <Text style={nameStyle}>{text}</Text>
    </View>
  );
};

export default ActorView;
