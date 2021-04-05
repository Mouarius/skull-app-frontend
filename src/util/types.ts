export enum TeamColor {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  PURPLE = 'purple',
  BLACK = 'black',
}

export enum CardType {
  FLOWER = 'flower',
  SKULL = 'skull',
}

export interface BaseComponentProps {
  className?: string;
}

export type TakenColors = TeamColor[];

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
}

export interface NotificationObject {
  type: NotificationType;
  message: string;
}

export interface CardObject {
  id: string;
  color: TeamColor;
  type: CardType;
  isInGame: boolean;
  isVisible: boolean;
}

export interface Card {
  id: string;
  color: TeamColor;
  type: CardType;
  isPlayed: boolean;
  isVisible: boolean;
}

export interface Player {
  id: string;
  username: string;
  color?: TeamColor;
  deck?: Card[];
  isReady: boolean;
  isPlaying?: boolean;
  roundsWon?: 0 | 1 | 2;
  game_id?: string;
}

export interface Game {
  id: string;
  players: Player[];
  owner_id: string;
  playedCards?: Card[];
}
