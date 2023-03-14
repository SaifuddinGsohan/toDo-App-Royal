import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import TaskScreen from './screens/tasks-screen'
import YourTaskScreen from './screens/your-tasks-screen'
import ProjectScreen from './screens/projects-screen'
import Sidebar from './components/sidebar'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="Projects" component={ProjectScreen} />
      <Drawer.Screen name="YourTasks" component={YourTaskScreen} />
      <Drawer.Screen name="Tasks" component={TaskScreen} />
    </Drawer.Navigator>
  )
}

export default App
