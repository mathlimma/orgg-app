import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

import {
  Container, SubtitleText, TitleText, BoldTitleText,
} from './styles';
import Colors from '../../utils/colors';
import { dayContext, organize } from '../../state/day';

const OrganizingScreen = () => {
  const navigation = useNavigation();

  const { dispatch } = useContext(dayContext);

  useEffect(() => {
    setTimeout(() => {
      dispatch(organize());
      navigation.replace('YourDay');
    }, 2500);
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
