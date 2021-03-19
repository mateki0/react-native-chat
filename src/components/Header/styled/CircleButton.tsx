import styled from 'styled-components/native';

const CircleButton = styled.TouchableOpacity<{
  backgroundColor?: string;
  customWidth: string;
  customHeight: string;
  customRadius: string;
  customMargin?: string;
}>`
  background: ${(props) => props.backgroundColor};
  width: ${(props) => props.customWidth};
  height: ${(props) => props.customHeight};
  border-radius: ${(props) => props.customRadius};
  ${(props) => (props.customMargin ? `margin-left: ${props.customMargin}` : '')};
  align-items: center;
  justify-content: center;
`;

export default CircleButton;
