import React, { useCallback, useState } from 'react'
import { Icon, VStack, useColorModeValue, Fab } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import ProjectList from '../components/Project-list'
import shortid from 'shortid'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'
import {projectsData} from '../data'


export default function ProjectScreen(props: { state: any; navigation: any }) {
  const { state, navigation } = props
  const [data, setData] = useState(projectsData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleProjectItem = useCallback(item => {
    const index = data.indexOf(item)
      const newData = navigation.navigate('YourTasks', {
        Data: data[index].tasks,
      })
      return newData
  }, [])

  const handleChangeProjectItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])
  const handleFinishEditingProjectItem = useCallback(_item => {
    setEditingItemId(null)
  }, [])
  const handlePressProjectItemLabel = useCallback(item => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
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
        title="YOUR PROJECTS"
        image={require('../assets/taskProject.png')}
      >
        <NavBar />
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
        <ProjectList
          data={data}
          onToggleItem={handleToggleProjectItem}
          onChangeSubject={handleChangeProjectItemSubject}
          onFinishEditing={handleFinishEditingProjectItem}
          onPressLabel={handlePressProjectItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
          navigation={navigation}
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
