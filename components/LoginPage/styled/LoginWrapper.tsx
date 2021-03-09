import styled from 'styled-components/native';

const LoginWrapper = styled.View<{ statusBarHeight: number }>`
  margin-top: 30px;
  ${(props) => (props.statusBarHeight ? `padding: ${props.statusBarHeight}px` : '')};
`;

export default LoginWrapper;
