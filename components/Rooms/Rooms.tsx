import * as React from 'react';

import { ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ROOMS } from '../../src/utils/queries';
import RoomsContainer from './styled/RoomsContainer';
import SingleRoom from './SingleRoom';
import RoomsList from './styled/RoomsList';

type RoomProps = {
  item: {
    name: string;
    id: string;
  };
};

const Rooms: React.FunctionComponent = () => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderRoom = ({ item }: RoomProps) => <SingleRoom roomName={item.name} roomId={item.id} />;

  return (
    <RoomsContainer>
      <RoomsList data={data.usersRooms.rooms} renderItem={renderRoom} />
    </RoomsContainer>
  );
};

export default Rooms;
