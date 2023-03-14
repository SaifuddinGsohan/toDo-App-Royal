import React, { useCallback } from 'react'
import {
  HStack,
  VStack,
  Center,
  Image ,
  Heading,
  IconButton,
  useColorModeValue
} from 'native-base'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import AnimatedColorBox from './animated-color-box'
import ThemeToggle from './theme-toggle'
import { Feather } from '@expo/vector-icons'
import MenuButton from './menu-button'

const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props
  const currentRoute = state.routeNames[state.index]

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main')
  }, [navigation])
  const handlePressMenuTasks = useCallback(() => {
    navigation.navigate('Tasks')
  }, [navigation])
  const handlePressMenuProjects = useCallback(() => {
    navigation.navigate('Projects')
  }, [navigation])

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'darkBlue.700')
            }}
          />
        </HStack>
        <Image 
          source={require('../assets/royal.png')}
          size="xl"
          mb={6}
        />
        <Heading mb={4} size="xl">
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon="home"
        >
          All Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'Projects'}
          onPress={handlePressMenuProjects}
          icon="trello"
        >
          Project Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'Tasks'}
          onPress={handlePressMenuTasks}
          icon="check-circle"
        >
          Your Tasks
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  )
}

export default Sidebar
