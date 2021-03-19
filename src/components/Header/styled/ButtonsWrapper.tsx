import styled from 'styled-components/native';

const ButtonsWrapper = styled.View<{ chatHeader?: boolean }>`
  flex-direction: ${(props) => (props.chatHeader ? 'row' : 'column')};
  margin-top: 25px;
`;

export default ButtonsWrapper;
