import { FriendT } from "./App";
import { Button } from "./Button";

export function Friend({
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
