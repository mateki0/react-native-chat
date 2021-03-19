import styled from 'styled-components/native';

const FormWrapper = styled.View<{ statusBarHeight: number }>`
  ${(props) => (props.statusBarHeight ? `padding: ${props.statusBarHeight}px` : 'padding:0 30px')};
  border-radius: 50px;
  margin-top: -45px;
  background-color: #fff;
`;

export default FormWrapper;
