import React, { useCallback } from 'react'
import { HStack, IconButton } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const NavBar = ({h=40, p=4, name='menu', w="full"}) => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  return (
    <HStack h={h} w={w} alignItems="center" alignContent="center" p={p} >
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        _icon={{
          as: Feather,
          name: name,
          size: 6,
          color: 'white'
        }}
      />
    </HStack>
  )
}

export default NavBar
