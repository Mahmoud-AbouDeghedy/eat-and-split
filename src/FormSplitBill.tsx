import { useState } from "react";
import { Button } from "./Button";
import { FriendT } from "./App";

export function FormSplitBill({
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
