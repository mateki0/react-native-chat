import * as React from 'react';

import { ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import RoomsContainer from './styled/RoomsContainer';
import SingleRoom from './SingleRoom';
import RoomsList from './styled/RoomsList';
import GET_ROOMS from '../../utils/apollo/queries/getRooms';

type RoomProps = {
  item: {
    name: string;
    id: string;
  };
};

const Rooms: React.FunctionComponent = () => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) {
    return <ActivityIndicator size="large" color="#5b61b9" />;
  }

  const renderRoom = ({ item }: RoomProps) => <SingleRoom roomName={item.name} roomId={item.id} />;

  return (
    <RoomsContainer>
      <RoomsList data={data.usersRooms.rooms} renderItem={renderRoom} />
    </RoomsContainer>
  );
};

export default Rooms;
