import styled from 'styled-components/native';

const ScreenWrapper = styled.SafeAreaView<{ statusBarHeight: number }>`
  padding-top: ${(props) => props.statusBarHeight}px;
`;
export default ScreenWrapper;
