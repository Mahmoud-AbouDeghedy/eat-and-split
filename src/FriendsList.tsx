import { FriendT } from "./App";
import { Friend } from "./Friend";

export function FriendsList({
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
