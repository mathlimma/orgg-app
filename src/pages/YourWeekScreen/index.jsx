import { useNavigation } from '@react-navigation/native';
import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import Colors from '../../utils/colors';
import { daysShortHand, months } from '../../utils/utils';

import {
  Container, CalendarContainer, TitleText,
} from './styles';

const YourWeekScreen = () => {
  const navigation = useNavigation();

  const date = new Date();
  const minDate = startOfWeek(date);
  const maxDate = endOfWeek(date);

  const handleDate = (selectedDate) => navigation.push('TaskList', {
    selectedDate: String(selectedDate),
  });

  return (
    <Container>
      <TitleText>Que dia vou planejar?</TitleText>
      <CalendarContainer>
        <CalendarPicker
          restrictMonthNavigation
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor={Colors.tertiary}
          onDateChange={handleDate}
          selectedDayColor={Colors.primary}
          weekdays={daysShortHand}
          months={months}
          monthYearHeaderWrapperStyle={{ display: 'none' }}
          dayLabelsWrapper={{ borderTopColor: 'transparent' }}
        />
      </CalendarContainer>
    </Container>
  );
};

export default YourWeekScreen;
