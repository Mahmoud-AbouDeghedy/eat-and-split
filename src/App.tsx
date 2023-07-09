import { useState } from "react";
import { FriendsList } from "./FriendsList";
import { Button } from "./Button";
import { FormAddFriend } from "./FormAddFriend";
import { FormSplitBill } from "./FormSplitBill";

const initialFriends = [
	{
		id: "118836",
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: "933372",
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: "499476",
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export type FriendT = {
	id: string;
	name: string;
	image: string;
	balance: number;
};

export default function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState<FriendT | null>(null);

	function handleAddFriend(friend: FriendT) {
		const newFriends = [...friends, friend];
		setFriends(newFriends);
		setShowAddFriend(false);
	}

	function handleShowAddFriend() {
		setShowAddFriend((prev) => !prev);
	}

	function handleSelectFriend(friend: FriendT) {
		setShowAddFriend(false);
		setSelectedFriend((selectedOne) =>
			selectedOne?.id === friend.id ? null : friend
		);
	}

	function handleSplitBill(value: number) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend?.id
					? { ...friend, balance: friend.balance + value }
					: friend
			)
		);
		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelection={handleSelectFriend}
					selectedFriend={selectedFriend}
				/>

				{showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
				/>
			)}
		</div>
	);
}
