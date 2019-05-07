/* eslint-disable no-unused-vars */
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
  MainScene,
  AttendanceCalendarScene,
  StudentDetailsScene,
  GroupParticipantsAttendanceScene,
  GroupActivityDetailsScene,
  PotentialStudentsScene,
  SelectMultipleStudentsScene,
  ManageGroupParticipantsScene,
  ChooseStudentScene
} from './scenes';

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      MainScene,
      StudentDetailsScene
    },
    {
      initialRouteName: 'MainScene'
    }
  )
);

const App = () => <AppContainer />;

export default App;
