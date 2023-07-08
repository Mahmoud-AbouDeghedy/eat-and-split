import { useState } from "react";

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

type FriendT = {
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

function FriendsList({
	friends,
	onSelection,
	selectedFriend,
}: {
	friends: FriendT[];
	onSelection: (f: FriendT) => void;
	selectedFriend: FriendT | null;
}) {
	return (
		<ul>
			{friends.map((f) => (
				<Friend
					friend={f}
					key={f.id}
					onSelection={onSelection}
					selectedFriend={selectedFriend}
				/>
			))}
		</ul>
	);
}

function Friend({
	friend,
	onSelection,
	selectedFriend,
}: {
	friend: FriendT;
	onSelection: (f: FriendT) => void;
	selectedFriend: FriendT | null;
}) {
	return (
		<li className={friend.id === selectedFriend?.id ? "selected" : ""}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} {Math.abs(friend.balance)}£
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you {Math.abs(friend.balance)}£
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name} are even</p>}
			<Button onClick={() => onSelection(friend)}>
				{friend.id === selectedFriend?.id ? "Close" : "Select"}
			</Button>
		</li>
	);
}

function Button({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}

function FormAddFriend({
	onAddFriend,
}: {
	onAddFriend: (friend: FriendT) => void;
}) {
	const [name, setName] = useState("");
	const [imgURL, setImgURL] = useState("https://i.pravatar.cc/48?");

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!name || !imgURL) return;

		const id = crypto.randomUUID();
		const newFriend = {
			id,
			name,
			image: `${imgURL}u=${id}`,
			balance: 0,
		};

		onAddFriend(newFriend);

		setImgURL("");
		setName("https://i.pravatar.cc/48?");
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>🧑Friend Name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label>🖼️ Image URL</label>
			<input
				type="text"
				value={imgURL}
				onChange={(e) => setImgURL(e.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill({
	selectedFriend,
	onSplitBill,
}: {
	selectedFriend: FriendT;
	onSplitBill: (v: number) => void;
}) {
	const [bill, setBill] = useState<number | string>("");
	const [paidByUser, setPaidByUser] = useState<number | string>("");
	const [whoIsPaying, setWhoIsPaying] = useState("user");
	const paidByFriend = bill ? +bill - +paidByUser : "";

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!bill || !paidByUser) return;
		onSplitBill(whoIsPaying === "user" ? +paidByFriend : -paidByUser);
	}

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
			<label>💰 Bill Value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(+e.target.value)}
			/>
			<label>🫰 Your Expense</label>
			<input
				type="text"
				value={paidByUser}
				onChange={(e) =>
					setPaidByUser(+e.target.value > +bill ? paidByUser : e.target.value)
				}
			/>
			<label>🤼 {selectedFriend.name}'s Expense:</label>
			<input type="text" disabled value={paidByFriend} />
			<label>🤑 Who is paying the bill</label>
			<select
				value={whoIsPaying}
				onChange={(e) => setWhoIsPaying(e.target.value)}
			>
				<option value="user">You</option>
				<option value="friend">{selectedFriend.name}</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}
