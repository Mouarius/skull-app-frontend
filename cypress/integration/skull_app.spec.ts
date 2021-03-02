describe('SKULL_APP TESTS', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('INITIAL TESTS', () => {
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
    it('Can join the test game', () => {
      cy.get('#username-input').type('mouarius');
      cy.get('#game-id-input').type('test');
      cy.get('.join-game-button').click();
      cy.contains('Lobby');
      cy.get('.color-button-blue').click();
      cy.get('.start-button').click();
      cy.get('.game-board');
    });
  });
});
