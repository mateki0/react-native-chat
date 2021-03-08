import * as React from 'react';

import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import { GET_ROOMS } from '../../src/utils/queries';
import RoomsContainer from './styled/RoomsContainer';
import SingleRoom from './SingleRoom';

export type RoomProps = {
  item: {
    name: string;
    id: string;
  };
};

const Rooms: React.FunctionComponent = () => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const renderRoom = ({ item }: RoomProps) => <SingleRoom item={item} />;

  return (
    <RoomsContainer>
      <FlatList data={data.usersRooms.rooms} renderItem={renderRoom} />
    </RoomsContainer>
  );
};

export default Rooms;
