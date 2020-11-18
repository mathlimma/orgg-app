import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const RoundSquare = styled.View`
  width: 25px;
  height: 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.color};
  margin-left: 10px;
`;
