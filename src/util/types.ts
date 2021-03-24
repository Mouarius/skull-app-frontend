import Deck from '../model/deck';

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

export type ITakenColors = (string | null | TeamColor)[][];

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
}

export interface PlayerObject {
  color: TeamColor | null;
  username: string;
  deck: Deck | null;
  isReady: boolean;
  hasWonOneRound: boolean;
  hasWonTheGame: boolean;
  id: string;
}

export interface CardObject {
  id: string;
  color: TeamColor;
  type: CardType;
  isInGame: boolean;
  isVisible: boolean;
}
