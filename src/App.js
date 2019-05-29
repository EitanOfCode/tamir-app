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
  ChooseStudentScene,
  ManageGroupsList,
  ChooseActivityTypeScene,
  EditDiscussionDetailsScene
} from './scenes';

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      MainScene,
      StudentDetailsScene,
      ChooseActivityTypeScene,
      EditDiscussionDetailsScene,
      ChooseStudentScene,
      ManageGroupsList
    },
    {
      initialRouteName: 'MainScene'
    }
  )
);

const App = () => <AppContainer />;

import Navigator from './Navigator';

const App = () => <Navigator />;

export default App;
