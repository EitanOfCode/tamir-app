import React from 'react';
import { Container } from 'native-base';
import { Header, FilterableList } from '../components';

const students = {
  studentA_UID: { 'שם פרטי': 'חניך א׳' },
  studentB_UID: { 'שם פרטי': 'חניך ב׳' },
  studentC_UID: { 'שם פרטי': 'חניך ג׳' },
  studentD_UID: { 'שם פרטי': 'חניך ד׳' },
  studentE_UID: { 'שם פרטי': 'חניך ה׳' }
};

const SelectMultipleStudentsScene = ({ title, actionTitle, onAction }) => (
  <Container>
    <Header title={title} back />
    <FilterableList data={students} multiselect actionTitle={actionTitle} onAction={onAction} />
  </Container>
);

export { SelectMultipleStudentsScene };
