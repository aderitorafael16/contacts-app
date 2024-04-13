import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_200,
  },
  header: {
    width: '100%',
    height: 132,
    backgroundColor: theme.colors.blue,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    zIndex: 1,
  },
  input: {
    marginBottom: -27,
  },
  section: {
    fontSize: 18,
    fontFamily: theme.fontFamily.bold,
    backgroundColor: theme.colors.blue,
    width: 34,
    height: 34,
    color: theme.colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 12,
    marginTop: 32,
  },
  contentList: {
    padding: 24,
    gap: 12,
    paddingTop: 64,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.gray_300,
    marginTop: 12,
  },
  bottonSheet: {
    backgroundColor: 'transparent',
  },
  bottonSheetContent: {
    flex: 1,
    backgroundColor: theme.colors.gray_100,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingTop: 64,
    alignItems: 'center',
    padding: 32,
  },
  image: {
    marginBottom: -50,
    zIndex: 1,
    alignSelf: 'center',
  },
  contactName: {
    fontSize: 32,
    fontFamily: theme.fontFamily.bold,
  },
  phoneNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 24,
  },
  phone: {
    fontSize: 18,
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.gray_400,
  },
})
