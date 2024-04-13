import {
  Image,
  ImageProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { styles } from './styles'

const variants = {
  size: {
    medium: {
      width: 54,
      height: 54,
      borderRadius: 18,
    },
    large: {
      width: 100,
      height: 100,
      borderRadius: 32,
    },
  },
  text: {
    medium: {
      fontSize: 24,
    },
    large: {
      fontSize: 52,
    },
  },
}

type AvatarProps = {
  image?: ImageProps | null
  name: string
  variant?: 'medium' | 'large'
  containerStyle?: StyleProp<ViewStyle>
}

export function Avatar({
  containerStyle,
  image,
  name,
  variant = 'medium',
}: AvatarProps) {
  return (
    <View style={containerStyle}>
      {image ? (
        <Image source={image} alt={name} style={variants.size[variant]} />
      ) : (
        <View style={[styles.letter, variants.size[variant]]}>
          <Text style={[styles.text, variants.text[variant]]}>
            {name[0].toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  )
}
