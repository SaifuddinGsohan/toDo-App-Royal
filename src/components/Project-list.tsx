import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import { VStack } from 'native-base'

import ProjectItem from './Project-item'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface ProjectItemData {
  id: string
  subject: string
  done: boolean
}

interface ProjectListProps {
  data: Array<ProjectItemData>
  editingItemId: string | null
  onToggleItem: (item: ProjectItemData) => void
  onChangeSubject: (item: ProjectItemData, newSubject: string) => void
  onFinishEditing: (item: ProjectItemData) => void
  onPressLabel: (item: ProjectItemData) => void
  onRemoveItem: (item: ProjectItemData) => void
  navigation: any
}

interface ProjectItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: ProjectItemData
  isEditing: boolean
  onToggleItem: (item: ProjectItemData) => void
  onChangeSubject: (item: ProjectItemData, newSubject: string) => void
  onFinishEditing: (item: ProjectItemData) => void
  onPressLabel: (item: ProjectItemData) => void
  onRemove: (item: ProjectItemData) => void
  navigation: any
}

export const AnimatedProjectItem = (props: ProjectItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove,
    navigation
  } = props
  const handleToggleCheckbox = () => {
    navigation.navigate('YourTasks')
  }
  // const handleToggleCheckbox = useCallback(() => {
  //   onToggleItem(data)
  // }, [data, onToggleItem])
  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject]
  )
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])
  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])
  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])
  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <ProjectItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

export default function ProjectList(props: ProjectListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem,
    navigation
  } = props
  const refScrollView = useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w="full" h="80">
      <AnimatePresence>
        <VStack flex={1} space={4}>
        {data.map(item => (

          <AnimatedProjectItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
            navigation={navigation}
            />
            ))}
            </VStack>
      </AnimatePresence>
    </StyledScrollView>
  )
}
