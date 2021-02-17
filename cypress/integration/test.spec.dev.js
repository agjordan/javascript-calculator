"use strict";

it('all buttons loaded', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get("#calculator__display__numbers__previous").should('contain', '');
  cy.get("#calculator__display__numbers__current").should('contain', "1234567890");
});
it('all num buttons work', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get('#num_1').click();
  cy.get('#num_2').click();
  cy.get('#num_3').click();
  cy.get('#num_4').click();
  cy.get('#num_5').click();
  cy.get('#num_6').click();
  cy.get('#num_7').click();
  cy.get('#num_8').click();
  cy.get('#num_9').click();
  cy.get('#num_0').click();
  cy.get("#calculator__display__numbers__previous").should('contain', '');
  cy.get("#calculator__display__numbers__current").should('contain', "1234567890");
});
it('adds numbers together (3+4= 7)', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get('#num_3').click();
  cy.get('#sym_plus').click();
  cy.get('#num_4').click();
  cy.get('#sym_equal').click();
  cy.get("#calculator__display__numbers__current").should('contain', '7'); //should equal 7

  cy.get("#calculator__display__numbers__previous").should('contain', '3+4='); //should equal 7
});
it('substracts numbers (10-12= -2)', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get('#num_1').click();
  cy.get('#num_0').click();
  cy.get('#sym_minus').click();
  cy.get('#num_1').click();
  cy.get('#num_2').click();
  cy.get('#sym_equal').click();
  cy.get("#calculator__display__numbers__current").should('contain', '-2'); //should equal 7

  cy.get("#calculator__display__numbers__previous").should('contain', '10-12='); //should equal 7
});
it('multiplies numbers (11×33= 363)', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get('#num_1').click();
  cy.get('#num_1').click();
  cy.get('#sym_times').click();
  cy.get('#num_3').click();
  cy.get('#num_3').click();
  cy.get('#sym_equal').click();
  cy.get("#calculator__display__numbers__current").should('contain', '363'); //should equal 7

  cy.get("#calculator__display__numbers__previous").should('contain', '11×33='); //should equal 7
});
it('divides numbers (10÷12= 0.833)', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get('#num_1').click();
  cy.get('#num_0').click();
  cy.get('#sym_divide').click();
  cy.get('#num_1').click();
  cy.get('#num_2').click();
  cy.get('#sym_equal').click();
  cy.get("#calculator__display__numbers__current").should('contain', '0.833'); //should equal 7

  cy.get("#calculator__display__numbers__previous").should('contain', '10÷12='); //should equal 7
});
it('can add decimals (10+1.2 = 11.2)', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get('#num_1').click();
  cy.get('#num_0').click();
  cy.get('#sym_plus').click();
  cy.get('#num_1').click();
  cy.get('#num_period').click();
  cy.get('#num_2').click();
  cy.get('#sym_equal').click();
  cy.get("#calculator__display__numbers__current").should('contain', '11.2');
  cy.get("#calculator__display__numbers__previous").should('contain', '10+1.2=');
});
it('displays message when input/output too long', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get('#num_1').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get('#num_0').click();
  cy.get("#calculator__display__numbers__current").should('contain', "I ain't got that much space");
  cy.get("#calculator__display__numbers__previous").should('contain', '');
  cy.get('#joy').should('contain', "I'm basically just a toy");
});
it('clear (C) button works', function () {
  cy.visit("http://127.0.0.1:5500/calculatorB/index.html");
  cy.get('#num_1').click();
  cy.get('#num_0').click();
  cy.get('#sym_divide').click();
  cy.get('#num_1').click();
  cy.get('#num_2').click();
  cy.get('#sym_clear').click();
  cy.get("#calculator__display__numbers__current").should('contain', '');
  cy.get("#calculator__display__numbers__previous").should('contain', '');
});