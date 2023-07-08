import { useState } from "react";

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

type FriendT = {
	id: number;
	name: string;
	image: string;
	balance: number;
};

export default function App() {
	const [showAddFriend, setShowAddFriend] = useState(false);

	function handleShowAddFriend() {
		setShowAddFriend((prev) => !prev);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList />
				{showAddFriend && <FormAddFriend />}
				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			<FormSplitBill />
		</div>
	);
}

function FriendsList() {
	return (
		<ul>
			{initialFriends.map((f) => (
				<Friend friend={f} key={f.id} />
			))}
		</ul>
	);
}

function Friend({ friend }: { friend: FriendT }) {
	return (
		<li>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} (Math.abs({friend.balance}))£
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you (Math.abs({friend.balance}))£
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name} are even</p>}
			<Button>Select</Button>
		</li>
	);
}

function Button({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}

function FormAddFriend() {
	return (
		<form className="form-add-friend">
			<label>🧑Friend Name</label>
			<input type="text" />

			<label>🖼️ Image URL</label>
			<input type="text" />

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill() {
	return (
		<form className="form-split-bill">
			<h2>SPLIT A BILL WITH x</h2>
			<label>💰 Bill Value</label>
			<input type="text" />
			<label>🫰 Your Expense</label>
			<input type="text" />
			<label>🤼 s's Expense:</label>
			<input type="text" disabled />
			<label>🤑 Who is paying the bill</label>
			<select name="" id="">
				<option value="user">You</option>
				<option value="friend">x</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}
