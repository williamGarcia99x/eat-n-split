import PropTypes from "prop-types";

FriendsList.propTypes = {
  listOfFriends: PropTypes.array,
  onToggleSplitBillForm: PropTypes.func,
  selectedFriend: PropTypes.number,
};

export default function FriendsList({
  listOfFriends,
  onToggleSplitBillForm,
  selectedFriend,
}) {
  return (
    <ul>
      {Array.from(listOfFriends, (friend) => {
        return (
          <FriendItem
            friend={friend}
            key={friend.id}
            onToggleSplitBillForm={onToggleSplitBillForm}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </ul>
  );
}

FriendItem.propTypes = {
  friend: PropTypes.object,
  onToggleSplitBillForm: PropTypes.func,
  selectedFriend: PropTypes.number,
};
function FriendItem({
  friend,
  onToggleSplitBillForm,

  selectedFriend,
}) {
  return (
    <li>
      <img src={friend.image} alt={`Image of your friend, ${friend.name}`} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          {`You owe ${friend.name} $${friend.balance + friend.balance * -2}`}
        </p>
      )}
      {friend.balance === 0 && <p>{`You and ${friend.name} are even`}</p>}
      {friend.balance > 0 && (
        <p className="green">{`${friend.name} owes you $${friend.balance}`}</p>
      )}
      <button
        className="button"
        onClick={() => onToggleSplitBillForm(friend.id)}
      >
        {selectedFriend === friend.id ? `Close` : `Select`}
      </button>
    </li>
  );
}
