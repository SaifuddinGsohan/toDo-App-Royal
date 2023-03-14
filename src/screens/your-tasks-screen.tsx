import React, { useCallback, useState } from 'react'
import { Icon, VStack, useColorModeValue, Fab, HStack, IconButton } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import shortid from 'shortid'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'
import { Feather } from '@expo/vector-icons'
import { tasksData} from '../data'

export default function YourTaskScreen(props: { state: any; navigation: any, Data: any }) {
  const { state, navigation, Data } = props
  const [data, setData] = useState(tasksData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handlePressBackButton = useCallback(() => {
    navigation.navigate('Projects')
  }, [navigation])

  const handleToggleTaskItem = useCallback((item: { done: any }) => {
    setData((prevData: string | any[]) => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = useCallback((item: any, newSubject: any) => {
    setData((prevData: string | any[]) => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])
  const handleFinishEditingTaskItem = useCallback((_item: any) => {
    setEditingItemId(null)
  }, [])
  const handlePressTaskItemLabel = useCallback((item: { id: any }) => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveItem = useCallback((item: any) => {
    setData((prevData: any[]) => {
      const newData = prevData.filter((i: any) => i !== item)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
        
      <Masthead
        title="YOUR JOURNAOL"
        image={require('../assets/bgTodo.png')} >
      <HStack p={6} pl={0} justifyContent="flex-end" space={200}>
        <NavBar h={20} w={20} />
      <HStack p={6} pr={0}>
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
        </HStack>
        
      </Masthead>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
