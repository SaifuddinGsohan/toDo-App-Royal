import React, { useCallback, useState } from 'react'
import { Icon, VStack, useColorModeValue, Fab, Text, Button, ScrollView } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import ProjectList from '../components/Project-list'
import shortid from 'shortid'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'
import { Feather } from '@expo/vector-icons'
import {projectsData, tasksData} from '../data'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial',
    done: false
  }
]

export default function MainScreen(props: { state: any; navigation: any }) {
  const { state, navigation } = props
  const [tData, setTData] = useState(tasksData)
  const [pData, setPData] = useState(projectsData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleProjectItem = useCallback((item: { done: any }) => {
    setPData((prevData: string | any[]) => {
      const index = prevData.indexOf(item)
      const newData = navigation.navigate('YourTasks',{
        Data: pData[index].tasks
      })
      return newData
    })
  }, [])
  const handleToggleTaskItem = useCallback((item: { done: any }) => {
    setTData((prevData: string | any[]) => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])
  const handleChangeProjectItemSubject = useCallback((item: any, newSubject: any) => {
    setPData((prevData: string | any[]) => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = useCallback((item: any, newSubject: any) => {
    setTData((prevData: string | any[]) => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])
  const handleFinishEditingProjectItem = useCallback((_item: any) => {
    // setEditingItemId(null)
  }, [])
  const handleFinishEditingTaskItem = useCallback((_item: any) => {
    // setEditingItemId(null)
  }, [])
  const handlePressProjectItemLabel = useCallback((item: { id: any }) => {
    setEditingItemId(item.id)
  }, [])
  const handlePressTaskItemLabel = useCallback((item: { id: any }) => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveProjectItem = useCallback((item: any) => {
    setPData((prevData: any[]) => {
      const newData = prevData.filter((i: any) => i !== item)
      return newData
    })
  }, [])
  const handleRemoveTaskItem = useCallback((item: any) => {
    setTData((prevData: any[]) => {
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
        title=""
        image={require('../assets/royalHome.png')} >
        <NavBar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-80px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        {/* <Heading color="white" p={6} size="xl">

        </Heading> */}
        <Text bold fontSize="xl" w="full" pl={4} >
          Project
        </Text>
        <ProjectList 
          data={pData}
          onToggleItem={handleToggleProjectItem}
          onChangeSubject={handleChangeProjectItemSubject}
          onFinishEditing={handleFinishEditingProjectItem}
          onPressLabel={handlePressProjectItemLabel}
          onRemoveItem={handleRemoveProjectItem}
          editingItemId={editingItemId}
          navigation={navigation}
          />
        {/* <ScrollView
          // onPress={() => navigation.navigate('YourTasks')}
        borderTopLeftRadius="0px"
        borderTopRightRadius="0px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="20px"
        pt="30px"
        p={4}
      >

        <VStack flex={1} space={4}>

        {data.map((item: { subject: any }) => (
          <Button
          onPress={() => navigation.navigate('YourTasks')}
          colorScheme={useColorModeValue('blue', 'darkBlue')}
          size="lg"
          borderRadius="full"
          leftIcon={
            <Icon as={Feather} name="calendar" size="sm" opacity={0.5} />
          }>
              {item.subject}
            </Button>
          ))}
          </VStack>
          </ScrollView> */}
      </VStack>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-80px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <Text bold fontSize="xl" w="full" pl={4} >
          Your Tasks
        </Text>
        <TaskList
          data={tData}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveTaskItem}
          editingItemId={editingItemId}
        />
      </VStack>
    </AnimatedColorBox>
  )
}
