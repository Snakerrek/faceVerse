import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { ProfileBackgroundStyles, BackgroundContext } from './ProfileBackground.styles';

const defaultBackgroundImage = require('../../assets/default_background.png'); 

interface ProfileBackgroundProps {
  backgroundUrl: string | null | undefined;
  context: BackgroundContext; 
}

const ProfileBackground: React.FC<ProfileBackgroundProps> = ({ backgroundUrl, context }) => {
  const source: ImageSourcePropType = backgroundUrl 
    ? { uri: backgroundUrl } 
    : defaultBackgroundImage;

  const contextStyle = ProfileBackgroundStyles[context]; 

  return (
    <View style={[ProfileBackgroundStyles.baseContainer, contextStyle]}>
      <Image 
        source={source} 
        style={ProfileBackgroundStyles.baseImage} 
      />
    </View>
  );
};

export default ProfileBackground;