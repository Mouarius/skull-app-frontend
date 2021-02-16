const APP_URL = 'http://localhost:3000';
describe('SKULL_APP TESTS', () => {
  beforeEach(() => {
    cy.visit(APP_URL);
  });
  describe('INITIAL TESTS', () => {
    it('Can enter a username', () => {
      cy.get('#username-input').type('mouarius');
    });
    it('Can enter a gameID', () => {
      cy.get('#game-id-input').type('some_id');
    });
  });
  describe('CREATE A GAME', () => {
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
  describe('JOIN A GAME', () => {
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
