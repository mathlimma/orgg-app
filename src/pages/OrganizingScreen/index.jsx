import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import {
  Container, SubtitleText, TitleText,
} from './styles';
import Colors from '../../utils/colors';

const OrganizingScreen = () => {
  const navigation = useNavigation();

  // NEXT_SPRINT: Remove this timeout in favor of a real organization
  useEffect(() => {
    setTimeout(() => navigation.replace('YourDay'), 2500);
  }, []);

  return (
    <Container>
      {/* TODO: Chance ActivityIndicator to a better one, which can work on iOS */}
      <ActivityIndicator color={Colors.text.screenSubtitle} size={100} />
      <TitleText>Orgganizando sua vida</TitleText>
      <SubtitleText>Aguarde um momento</SubtitleText>
    </Container>
  );
};

export default OrganizingScreen;
