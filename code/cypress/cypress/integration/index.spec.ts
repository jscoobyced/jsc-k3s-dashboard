describe('Home', () => {
  it('should display main page content', () => {
    cy.visit('/')
    cy.get('h1').contains('Welcome')
    cy.get('caption').contains('Nodes list')
    cy.get('table.nodes-list').should('be.visible')
    cy.get('footer').contains('©')
  })
})

export { }