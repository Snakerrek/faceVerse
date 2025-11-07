import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import styles, { BackgroundContext } from "./ProfileBackground.styles";

const defaultBackgroundImage = require("../../../assets/default_background.png");

interface ProfileBackgroundProps {
  backgroundUrl: string | null | undefined;
  context: BackgroundContext;
}

const ProfileBackground: React.FC<ProfileBackgroundProps> = ({
  backgroundUrl,
  context,
}) => {
  const source: ImageSourcePropType = backgroundUrl
    ? { uri: backgroundUrl }
    : defaultBackgroundImage;

  const contextStyle = styles[context];

  return (
    <View style={[styles.baseContainer, contextStyle]}>
      <Image source={source} style={styles.baseImage} />
    </View>
  );
};

export default ProfileBackground;
