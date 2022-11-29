import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    moneyManagerList: [],
    inputTitle: '',
    inputAmount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({inputAmount: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  onAddDetails = event => {
    event.preventDefault()
    const {inputTitle, inputAmount, optionId} = this.state

    // const optionType = transactionTypeOptions.find(
    //   eachTransaction => eachTransaction.optionId === optionId,
    // )
    // const {displayText} = optionType

    const addNewDetails = {
      id: v4(),
      title: inputTitle,
      amount: parseInt(inputAmount),
      type: optionId,
    }
    this.setState(prevState => ({
      moneyManagerList: [...prevState.moneyManagerList, addNewDetails],
      inputTitle: '',
      inputAmount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getBalance = () => {
    const {moneyManagerList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expenseAmount = 0
    moneyManagerList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].optionId) {
        incomeAmount += eachTransaction.amount
      } else {
        expenseAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expenseAmount
    return balanceAmount
  }

  getIncomeAmount = () => {
    const {moneyManagerList} = this.state

    let incomeAmount = 0

    moneyManagerList.forEach(eachIncome => {
      if (eachIncome.type === transactionTypeOptions[0].optionId) {
        incomeAmount += eachIncome.amount
      }
    })
    return incomeAmount
  }

  getExpenseAmount = () => {
    const {moneyManagerList} = this.state
    let expenseAmount = 0

    moneyManagerList.forEach(eachExpense => {
      if (eachExpense.type === transactionTypeOptions[1].optionId) {
        expenseAmount += eachExpense.amount
      }
    })
    return expenseAmount
  }

  onDeleteTransaction = id => {
    const {moneyManagerList} = this.state

    this.setState({
      moneyManagerList: moneyManagerList.filter(eachItem => eachItem.id !== id),
    })
  }

  render() {
    const {moneyManagerList, inputTitle, inputAmount, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncomeAmount()
    const expenseAmount = this.getExpenseAmount()
    return (
      <div className="app-container">
        <div className="moneyManager-container">
          <h1 className="name">Hi,Richard</h1>
          <p className="description">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
        />
        <div className="bottom-container">
          <form className="form-container" onSubmit={this.onAddDetails}>
            <h1 className="heading">Add Transactions</h1>
            <label className="label" htmlFor="title">
              TITLE
            </label>
            <input
              id="title"
              type="text"
              className="input"
              placeholder="TITLE"
              value={inputTitle}
              onChange={this.onChangeTitle}
            />
            <label className="label" htmlFor="amount">
              AMOUNT
            </label>
            <input
              id="amount"
              type="text"
              className="input"
              placeholder="AMOUNT"
              value={inputAmount}
              onChange={this.onChangeAmount}
            />
            <label className="label" htmlFor="type">
              TYPE
            </label>
            <select
              className="input"
              id="type"
              value={optionId}
              onChange={this.onChangeType}
            >
              {transactionTypeOptions.map(eachOption => (
                <option
                  value={eachOption.optionId}
                  key={eachOption.optionId}
                  className="options"
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="heading">History</h1>
            <ul className="history-details-container">
              <li className="history-items-container">
                <p className="description">Title</p>
                <p className="description">Amount</p>
                <p className="description">Type</p>
              </li>
              {moneyManagerList.map(eachTransaction => (
                <TransactionItem
                  transactionDetails={eachTransaction}
                  key={eachTransaction.id}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
