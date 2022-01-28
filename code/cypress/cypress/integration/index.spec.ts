describe('Home', () => {
  it('should display header and footer', () => {
    cy.visit('/')
    cy.get('h1').contains('Welcome')
    cy.get('footer').contains('©')
  })

  it('should display the nodes list', () => {
    // Number of row is 2 (for headers) + number of nodes
    // in `rootDir/code/e2e/data/nodes.json`    
    cy.visit('/')
    cy.get('caption').contains('Nodes list')
    cy.get('table.nodes-list').should('be.visible')
    cy.get('table.nodes-list').find("tr").should('have.length', 6)
    cy.get('table.nodes-list').find("tr").find("td").contains("5.00 GB")
  })
})

export { }