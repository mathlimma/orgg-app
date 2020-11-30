import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

import {
  Container, SubtitleText, TitleText, BoldTitleText,
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
      {/* TODO: Lottie makes app crache on expo client */}
      <ActivityIndicator color={Colors.text.screenSubtitle} size={100} />
      {/* <LottieView source={require('../../../assets/lottie-clock.json')} autoPlay loop /> */}
      <TitleText>
        {' '}
        <BoldTitleText>Orgganizando</BoldTitleText>
        {' '}
        sua vida
      </TitleText>
      <SubtitleText>Aguarde um momento :)</SubtitleText>
    </Container>
  );
};

export default OrganizingScreen;
