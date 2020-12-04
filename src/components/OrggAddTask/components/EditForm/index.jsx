/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { subMinutes, addMinutes, differenceInMinutes } from 'date-fns';
import OrggOptionGroup from '../../../OrggOptionGroup';
import OrggCheckBox from '../../../OrggCheckBox';

import { FixedTimeContainer, OptionText } from './styles';
import { DifficultyOption } from '../../styles';
import OrggDateTimePicker from '../../../OrggDateTimePicker';

const EditForm = ({
  difficultyState, estimatedTimeState, isTimeFixedState, startingTimeState, canPauseState,
}) => {
  const [difficulty, setDifficulty] = difficultyState;
  const [estimatedTime, setEstimatedTime] = estimatedTimeState;
  const [isTimeFixed, setIsTimeFixed] = isTimeFixedState;
  const [startingTime, setStartingTime] = startingTimeState;
  const [canPause, setCanPause] = canPauseState;

  const handleEstimatedTime = (date) => {
    setEstimatedTime(differenceInMinutes(date, startingTime) > 5
      ? differenceInMinutes(date, startingTime)
      : 5);
  };

  const difficultyOptions = [{
    element: () => (
      <DifficultyOption>
        <Text style={{ fontSize: 25 }}>😧</Text>
        <OptionText>Muito</OptionText>
      </DifficultyOption>
    ),
  }, {
    element: () => (
      <DifficultyOption>
        <Text style={{ fontSize: 25 }}>🙁</Text>
        <OptionText>Bastante</OptionText>
      </DifficultyOption>
    ),
  }, {
    element: () => (
      <DifficultyOption>
        <Text style={{ fontSize: 25 }}>😐</Text>
        <OptionText>Moderado</OptionText>
      </DifficultyOption>
    ),
  }, {
    element: () => (
      <DifficultyOption>
        <Text style={{ fontSize: 25 }}>☺️</Text>
        <OptionText>Pouco</OptionText>
      </DifficultyOption>
    ),
  }, {
    element: () => (
      <DifficultyOption>
        <Text style={{ fontSize: 25 }}>😀</Text>
        <OptionText>Nada</OptionText>
      </DifficultyOption>
    ),
  }];

  return (
    <>
      <View>
        <OrggCheckBox
          checked={canPause}
          title="Posso ser interrompido?"
          onPress={() => setCanPause(!canPause)}
        />
        <OrggCheckBox
          checked={isTimeFixed}
          title="Tenho hora pra começar e terminar?"
          onPress={() => setIsTimeFixed(!isTimeFixed)}
        />
      </View>
      <View>
        {!isTimeFixed ? (
          <OrggDateTimePicker
            label="Quantas horas devo usar?"
            value={addMinutes(
              startingTime,
              estimatedTime,
            )}
            onChange={(date) => handleEstimatedTime(date)}
          />
        ) : (
          <FixedTimeContainer>
            <OrggDateTimePicker
              label="Início"
              value={startingTime}
              onChange={(date) => setStartingTime(date)}
              containerStyle={{ width: '48%' }}
              mode="time"
            />
            <OrggDateTimePicker
              label="Fim"
              value={
                addMinutes(
                  startingTime,
                  estimatedTime,
                )
              }
              onChange={(date) => handleEstimatedTime(date)}
              containerStyle={{ width: '48%' }}
              mode="time"
            />
          </FixedTimeContainer>
        )}
      </View>
      <OrggOptionGroup
        label="O quanto isso me cansa?"
        onPress={setDifficulty}
        defaultIndex={difficulty}
        options={difficultyOptions}
      />
    </>
  );
};

EditForm.propTypes = {
  difficultyState: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ])).isRequired,
  estimatedTimeState: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ])).isRequired,
  isTimeFixedState: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ])).isRequired,
  startingTimeState: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.func,
  ])).isRequired,
  canPauseState: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ])).isRequired,
};

export default EditForm;
