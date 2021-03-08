import styled from 'styled-components/native';

const CircleButton = styled.TouchableOpacity<{ backgroundColor?: string }>`
  background: ${(props) => props.backgroundColor};
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export default CircleButton;
