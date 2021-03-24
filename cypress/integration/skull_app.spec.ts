import 'cypress-firebase';

enum TeamColor {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  PURPLE = 'purple',
  BLACK = 'black',
}

const testPlayer = {
  username: 'Tester',
  color: null,
  deck: null,
  isReady: true,
  hasWonOneRound: false,
  hasWonTheGame: false,
};

const initializeTestPlayers = (numberOfPlayers: number) => {
  for (let i = 0; i < numberOfPlayers; i++) {
    const fakePlayer = {
      username: '',
      color: null,
      deck: null,
      isReady: true,
      hasWonOneRound: false,
      hasWonTheGame: false,
    };
    fakePlayer.username = `Fake Player ${i}`;
    fakePlayer.color = Object.values(TeamColor)[i];
    cy.callFirestore('add', 'games/test/players', testPlayer);
  }
};

const initializeTestGame = (numberOfPlayers: number) => {
  const testGame = {
    ownerID: '',
  };
  cy.callFirestore('set', '/games/test', testGame);
  initializeTestPlayers(numberOfPlayers);
};

describe('SKULL_APP TESTS', () => {
  describe('INITIAL TESTS', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('Can enter a username', () => {
      cy.get('#username-input').type('mouarius');
    });
    it('Can enter a gameID', () => {
      cy.get('#game-id-input').type('some_id');
    });
    describe('Create a game', () => {
      it('Cannot create a game if no username is provided', () => {
        cy.get('.create-game-button').click();
        cy.get('.Login-card');
      });
      it('Creating a new game opens Lobby page', () => {
        cy.get('#username-input').type('mouarius');
        cy.get('.create-game-button').click();
        cy.get('.Lobby-card');
      });
    });
    describe('Join a game', () => {
      it('Cannot join a game if no username and no gameID is provided', () => {
        cy.get('.join-game-button').click();
        cy.get('.Login-card');
      });
      it('Cannot join a game if no username is provided', () => {
        cy.get('.join-game-button').click();
        cy.get('.Login-card');
      });
    });
  });
  describe.only('TEST GAME ACTIONS', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.callFirestore('delete', '/games/test/players', { recursive: true });
      initializeTestGame(4);
      cy.callFirestore('add', '/games/test/players', testPlayer);
    });
    it('Can join the test game', () => {
      cy.get('#username-input').type('mouarius');
      cy.get('#game-id-input').type('test');
      cy.get('.join-game-button').click();
      cy.contains('Lobby');
    });
    it('should change the player color', () => {
      cy.get('#username-input').type('mouarius');
      cy.get('#game-id-input').type('test');
      cy.get('.join-game-button').click();
      cy.get('.color-button-blue').click();
      cy.get('.start-button').click();
      cy.get('.game-board');
    });
  });
});
