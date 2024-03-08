import { useState } from "react";
import FriendsList from "./FriendsList";
import AddFriend from "./AddFriend";
import SplitBill from "./SplitBill";
import SideBar from "./SideBar";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  //Need state to keep track of initial friends and friends that are added.
  const [friends, setFriends] = useState(initialFriends);
  const [isFriendFormActive, setIsFriendFormActive] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    toggleAddFriendForm();
  }

  function toggleAddFriendForm() {
    setIsFriendFormActive((status) => !status);
  }
  function toggleSplitBillForm(friendId) {
    //If the selected button is clicked on a friend that is currently selected, set the id to null. This should close the SplitBillForm form.
    if (selectedFriend === friendId) {
      setSelectedFriend(null);

      return;
    }
    setSelectedFriend(friendId);
  }

  //When we split bill, we don't mutate the current array of friends. We assign it a new one that has the updated information for the selected friend.
  function handleSplitBill(friendObj) {
    setFriends((currentFriends) =>
      currentFriends.map((fr) => (friendObj.id === fr.id ? friendObj : fr))
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <SideBar>
        <FriendsList
          listOfFriends={friends}
          onToggleSplitBillForm={toggleSplitBillForm}
          selectedFriend={selectedFriend}
        />
        {isFriendFormActive && <AddFriend onAddFriend={handleAddFriend} />}
        <button className="button" onClick={toggleAddFriendForm}>
          {isFriendFormActive ? `Close` : `Add Friend`}
        </button>
      </SideBar>
      {selectedFriend && (
        <SplitBill
          friends={friends}
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

export default App;
