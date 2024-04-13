import { Alert, TouchableOpacity, View, SectionList, Text } from 'react-native'
import { useState, useEffect, useId, useRef } from 'react'

import { Feather } from '@expo/vector-icons'
import * as Contacts from 'expo-contacts'
import BottomSheet from '@gorhom/bottom-sheet'
import { styles } from './styles'
import { Input } from '../../components/input'
import { theme } from '../../theme'
import { Contact, ContactProps } from '../../components/contact'
import { Avatar } from '../../components/avatar'
import { Button } from '../../components/button'

interface SectionListDataProps {
  title: string
  data: ContactProps[]
}

export function Home() {
  const [name, setName] = useState('')
  const [contacts, setContacts] = useState<SectionListDataProps[]>([])
  const [contact, setContact] = useState<Contacts.Contact>()

  const bottonSheetRef = useRef<BottomSheet>(null)
  const handleBottonShetOpen = () => bottonSheetRef.current?.expand()
  const handleBottonShetClose = () => bottonSheetRef.current?.snapToIndex(0)

  async function handleOpenDetails(id: string) {
    const response = await Contacts.getContactByIdAsync(id)
    setContact(response)
    handleBottonShetOpen()
  }
  async function fetchContacts() {
    try {
      const { status } = await Contacts.requestPermissionsAsync()

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          name,
          sort: 'firstName',
        })

        const list = data
          .map((contact) => ({
            // eslint-disable-next-line react-hooks/rules-of-hooks
            id: contact.id ?? useId(),
            name: contact.name,
            image: contact.image,
          }))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .reduce<SectionListDataProps[]>((acc: any, item) => {
            const firstLetter = item.name[0].toUpperCase()

            const existingEntry = acc.find(
              (entry: SectionListDataProps) => entry.title === firstLetter,
            )

            if (existingEntry) {
              existingEntry.data.push(item)
            } else {
              acc.push({ title: firstLetter, data: [item] })
            }

            return acc
          }, [])

        setContacts(list)
        setContact(data[0])
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Contatos', 'Não foi possível carregar os contatos.')
    }
  }
  useEffect(() => {
    fetchContacts()
  }, [name])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input style={styles.input}>
          <Feather name="search" size={16} color={theme.colors.gray_300} />
          <Input.Field
            value={name}
            onChangeText={setName}
            placeholder="Pesquisar pelo nome..."
          />

          <TouchableOpacity onPress={() => setName('')}>
            <Feather name="x" size={16} color={theme.colors.gray_300} />
          </TouchableOpacity>
        </Input>
      </View>

      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Contact contact={item} onPress={() => handleOpenDetails(item.id)} />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.section}>{section.title}</Text>
        )}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {contact && (
        <BottomSheet
          ref={bottonSheetRef}
          snapPoints={[0.01, 284]}
          handleComponent={null}
          backgroundStyle={styles.bottonSheet}
        >
          <Avatar
            containerStyle={styles.image}
            name={contact.name}
            image={contact.image}
            variant="large"
          />
          <View style={styles.bottonSheetContent}>
            <Text style={styles.contactName}>{contact.name}</Text>
            {contact.phoneNumbers && (
              <View style={styles.phoneNumber}>
                <Feather name="phone" size={18} color={theme.colors.gray_400} />
                <Text style={styles.phone}>
                  {contact?.phoneNumbers[0].number}
                </Text>
              </View>
            )}
            <Button title="Fechar" onPress={handleBottonShetClose} />
          </View>
        </BottomSheet>
      )}
    </View>
  )
}
