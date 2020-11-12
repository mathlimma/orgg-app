import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding: 8px 5px;
  border-bottom-width: 1px;
  border-bottom-color: #E3EDED;
`;

export const TaskTitle = styled.Text`
  font-size: 20px;
  font-family: Rubik_400Regular;
  font-weight: bold;
`;

export const TopContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const BottomContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;

export const EditButtonText = styled.Text`
  font-size: 14px;
  color: #808080;
  margin-left: 25px;
`;

export const TimeText = styled.Text`
  color: #000000;
  font-family: Rubik_400Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;
