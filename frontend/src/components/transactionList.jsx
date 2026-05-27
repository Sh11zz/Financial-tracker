import styles from "../pages/dashboard.module.css";

function TransactionList({ transactions }) {
  return (
    <div className={styles.transactions}>
      {transactions.length === 0 && (
        <p>No transactions yet</p>
      )}

      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`${styles.card} ${
            transaction.type === "income"
              ? styles.income
              : styles.expense
          }`}>
          <h3>{transaction.name}</h3>
          <p><strong>Type:</strong>{" "}{transaction.type}</p>
          <p><strong>Amount:</strong> ${transaction.amount}</p>
          {transaction.type === "expense" && (<p><strong>Category:</strong>{" "}{transaction.category}</p>)}
        </div>
      ))}
    </div>
  );
}

export default TransactionList;