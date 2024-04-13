import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    gap: 12,
  },
  name: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.medium,
    fontSize: 18,
  },
})
