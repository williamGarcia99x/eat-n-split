/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Proptypes from "prop-types";

AddFriend.propTypes = {
  onAddFriend: Proptypes.func,
};

export default function AddFriend({ onAddFriend }) {
  //Need state to manage the input elements
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  function handleSubmit(event) {
    event.preventDefault();

    //if either of the input fields is empty, don't submit.
    if (!friendName || !imageUrl) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: friendName,
      image: `${imageUrl}?=${id}`,
      balance: 0,
    };
    setFriendName("");
    setImageUrl("https://i.pravatar.cc/48");
    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="friend-input">🧑‍🤝‍🧑 Friend Name</label>
      <input
        id="friend-input"
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <label htmlFor="img-url-input">🌄 Image URL</label>
      <input
        id="img-url-input"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}
