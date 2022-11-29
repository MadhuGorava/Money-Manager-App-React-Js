// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {title, amount, type, id} = transactionDetails

  const onDelete = () => {
    onDeleteTransaction(id)
  }

  return (
    <li className="history-list">
      <p className="details">{title}</p>
      <p className="details">Rs {amount}</p>
      <p className="details">{type}</p>
      <div className="delete-container">
        <button
          className="delete-button"
          type="button"
          onClick={onDelete}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete-img"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
