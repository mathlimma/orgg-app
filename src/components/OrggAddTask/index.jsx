import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import OrggTextInput from '../OrggTextInput';
import OrggOptionGroup from '../OrggOptionGroup';
import OrggButton from '../OrggButton';
import OrggCheckBox from '../OrggCheckBox';

import {
  Container, FixedTimeContainer, OptionText, TitleText,
} from './styles';
import { insertUserTask, tasksContext } from '../../state/tasks';
import colors from '../../utils/colors';

import LowPriorityIcon from '../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../assets/VeryHighPriorityIcon';

const OrggAddTask = ({ onFinish }) => {
  const [task, setTask] = useState('');
  const [difficulty, setDifficulty] = useState(2);
  const [priority, setPriority] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState('90');
  const [isTimeFixed, setIsTimeFixed] = useState(false);
  const [startingTime, setStartingTime] = useState('12h');
  const [canPause, setCanPause] = useState(true);

  const { dispatch } = useContext(tasksContext);
  const createTask = () => {
    dispatch(insertUserTask(
      task, priority, startingTime, isTimeFixed, estimatedTime,
    ));
    onFinish();
  };

  const difficultyOptions = [{
    element: () => (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{ fontSize: 25 }}>😧</Text>
        <OptionText>Muito</OptionText>
      </View>
    ),
  }, {
    element: () => (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{ fontSize: 25 }}>🙁</Text>
        <OptionText>Bastante</OptionText>
      </View>
    ),
  }, {
    element: () => (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{ fontSize: 25 }}>😐</Text>
        <OptionText>Moderado</OptionText>
      </View>
    ),
  }, {
    element: () => (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{ fontSize: 25 }}>☺️</Text>
        <OptionText>Pouco</OptionText>
      </View>
    ),
  }, {
    element: () => (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{ fontSize: 25 }}>😀</Text>
        <OptionText>Nada</OptionText>
      </View>
    ),
  }];

  const priorityOptions = [
    {
      element: () => (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <LowPriorityIcon height={25} width={25} />
          <OptionText>Baixa</OptionText>
        </View>
      ),
    },
    {
      element: () => (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <MediumPriorityIcon height={25} width={25} />
          <OptionText>Média</OptionText>
        </View>
      ),
    },
    {
      element: () => (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <HighPriorityIcon height={25} width={25} />
          <OptionText>Alta</OptionText>
        </View>
      ),
    },
    {
      element: () => (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <VeryHighPriorityIcon height={25} width={25} />
          <OptionText>Muito Alta</OptionText>
        </View>
      ),
    }];

  return (
    <Container>
      <TitleText>Nova tarefa</TitleText>
      <OrggTextInput
        label="Minha tarefa"
        onChangeText={(text) => setTask(text)}
        placeholder="ex: Estudar matemática"
      />
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
      <OrggOptionGroup
        label="Qual a prioridade disto?"
        onPress={setPriority}
        defaultIndex={priority}
        options={priorityOptions}
      />
      <OrggButton label="Próximo" onPress={createTask} color={colors.primary} />
    </Container>
  );
};

OrggAddTask.propTypes = {
  onFinish: PropTypes.func,
};

OrggAddTask.defaultProps = {
  onFinish: null,
};

export default OrggAddTask;
