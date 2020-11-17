import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import OrggTextInput from '../../../OrggTextInput';
import OrggOptionGroup from '../../../OrggOptionGroup';
import OrggCheckBox from '../../../OrggCheckBox';

import { FixedTimeContainer, OptionText } from './styles';
import { DifficultyOption } from '../../styles';

const EditForm = ({
  difficultyState, estimatedTimeState, isTimeFixedState, startingTimeState, canPauseState,
}) => {
  const [difficulty, setDifficulty] = difficultyState;
  const [estimatedTime, setEstimatedTime] = estimatedTimeState;
  const [isTimeFixed, setIsTimeFixed] = isTimeFixedState;
  const [startingTime, setStartingTime] = startingTimeState;
  const [canPause, setCanPause] = canPauseState;

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
          <OrggTextInput
            label="Quanto tempo devo usar?"
            onChangeText={(text) => setEstimatedTime(text)}
            defaultValue={String(estimatedTime)}
          />
        ) : (
          <FixedTimeContainer>
            <OrggTextInput
              label="Início"
              onChangeText={(text) => setStartingTime(text)}
              defaultValue={String(startingTime)}
              containerStyle={{ width: '48%' }}
            />
            <OrggTextInput
              label="Fim"
              onChangeText={(text) => setEstimatedTime(text)}
              defaultValue={String(estimatedTime)}
              containerStyle={{ width: '48%' }}
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
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
  isTimeFixedState: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ])).isRequired,
  startingTimeState: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
  canPauseState: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ])).isRequired,
};

export default EditForm;
