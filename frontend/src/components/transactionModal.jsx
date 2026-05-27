import { useState } from "react";
import styles from '../pages/dashboard.module.css'

const balance = 0

function TransactionModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: "expense",
    name: "",
    amount: "",
    category: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (!formData.name || !formData.amount) {
      alert("Fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: formData.type,
      name: formData.name,
      amount: formData.amount,
      category:
        formData.type === "expense"
          ? formData.category
          
          : "",
    };

    onAdd(newTransaction);

    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Add Transaction</h2>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Transaction name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className={styles.input}
        />

        {formData.type === "expense" && (
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className={styles.input}
          />
        )}

        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default TransactionModal;