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

export type ITakenColors = (TeamColor | null)[];

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
}
