import { RouteProp } from '@react-navigation/native';

export type RouteProps = {
  roomId: string;
  roomName: string;
  messages: any;
};

export type ChatScreenRouteProp = { route: RouteProp<{ params: RouteProps }, 'params'> };

export type ChatProps = {
  route: any;
};

export type RoomDetails = {
  roomName: string;
  roomId: string;
};

export type MessageProps = {
  id: string;
  body: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    avatarUrl: string;
  };
};
