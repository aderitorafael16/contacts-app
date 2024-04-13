import {
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
  ImageProps,
} from 'react-native'
import { styles } from './styles'
import { Avatar } from '../avatar'

export interface ContactProps {
  id: string
  name: string
  image?: ImageProps
}

interface Props extends TouchableOpacityProps {
  contact: ContactProps
}

export function Contact({ contact, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Avatar name={contact.name} image={contact.image} />
      <Text style={styles.name}>{contact.name}</Text>
    </TouchableOpacity>
  )
}
