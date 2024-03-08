import { useState } from "react";
import PropTypes from "prop-types";

SplitBill.propTypes = {
  friends: PropTypes.array,
  selectedFriend: PropTypes.number,
  onSplitBill: PropTypes.func,
};

export default function SplitBill({ friends, selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [personPayingBill, setPersonPayingBill] = useState("user");
  const otherFriendExpense = billValue ? billValue - userExpense : "";

  const friendInfo = friends.find(
    (friendObj) => friendObj.id === selectedFriend
  );

  function handleUserExpenseInput(value) {
    if (isNaN(value) || (billValue && value > billValue)) return;

    setUserExpense(Number(value));
  }
  function handleBillInput(value) {
    //if the value is not a number, return
    if (isNaN(value)) return;

    //If the value is less than userExpense, reset userExpense back to 0 to avoid negative numbers.
    if (value < userExpense) setUserExpense("");

    setBillValue(Number(value));
  }

  function handleSubmit(e) {
    e.preventDefault();

    //If user is paying the bill, then add the Friend's part of the expense to the modified friend object. If friend is paying bill, then subtract the User's part of the expense from the modified friend object.

    if (!billValue || !userExpense) return;

    const modifiedFriend = { ...friendInfo };
    modifiedFriend.balance =
      personPayingBill === "user"
        ? modifiedFriend.balance + otherFriendExpense
        : modifiedFriend.balance - userExpense;

    onSplitBill(modifiedFriend);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friendInfo.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => handleBillInput(e.target.value)}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => handleUserExpenseInput(e.target.value)}
      />

      <label>👫 {friendInfo.name}&apos;s Expense </label>
      <input type="text" disabled value={otherFriendExpense} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={personPayingBill}
        onChange={(e) => setPersonPayingBill(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friendInfo.name}</option>
      </select>

      <button className="button">Split bill</button>
    </form>
  );
}
