class Budget {
  constructor() {
    this.expenses = [];
    this.incomes = [];
  }

  addExpense(expense) {
    this.expenses.push(expense);
  }

  addIncome(income) {
    this.incomes.push(income);
  }

  getTotalExpenses() {
    let total = 0;
    this.expenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  }

  getTotalIncomes() {
    let total = 0;
    this.incomes.forEach(income => {
      total += income.amount;
    });
    return total;
  }
}
class View {
  constructor() {
    this.budgetEl = document.querySelector('.budget-total');
    this.expensesEl = document.querySelector('.expenses-total');
    this.incomesEl = document.querySelector('.incomes-total');
  }

  handleInputExpenses () {
    

  }

  displayBudget(budget) {
    this.budgetEl.innerHTML = budget;
  }

  displayExpenses(expenses) {
    this.expensesEl.innerHTML = expenses;
  }

  displayIncomes(incomes) {
    this.incomesEl.innerHTML = incomes;
  }
}
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  addExpense(expense) {
    this.model.addExpense(expense);
    this.updateView();
  }

  addIncome(income) {
    this.model.addIncome(income);
    this.updateView();
  }

  updateView() {
    const totalExpenses = this.model.getTotalExpenses();
    const totalIncomes = this.model.getTotalIncomes();
    const budget = totalIncomes - totalExpenses;
    this.view.displayBudget(budget);
    this.view.displayExpenses(totalExpenses);
    this.view.displayIncomes(totalIncomes);
  }
}
class App {
  static getInstance() {
    if (!App.instance) {
      const model = new Budget();
      const view = new View();
      const controller = new Controller(model, view);
      App.instance = controller;
    }
    return App.instance;
  }
}
const addExpenseButton = document.querySelector('#add-expense');
const addIncomeButton = document.querySelector('#add-income');

addExpenseButton.addEventListener('click', () => {
  const amount = parseFloat(document.querySelector('#expense-amount').value);
  const description = document.querySelector('#expense-description').value;
  const expense = { amount, description };
  controller.addExpense(expense);
});

addIncomeButton.addEventListener('click', () => {
  const amount = parseFloat(document.querySelector('#income-amount').value);
  const description = document.querySelector('#income-description').value;
  const income = { amount, description };
  controller.addIncome(income);
});




const controller = App.getInstance();