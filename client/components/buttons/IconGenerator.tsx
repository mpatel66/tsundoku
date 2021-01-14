import { Icon } from '@ui-kitten/components'
import React from 'react';
import { ImageProps } from 'react-native-svg';


interface Props {
  props: (Partial<ImageProps> | undefined);
  iconName: string;
}

const IconGenerator: React.FC<Props> = ({props, iconName}) => {
  return (
    <Icon { ...props} name={iconName} />
  )
}


export default IconGenerator;