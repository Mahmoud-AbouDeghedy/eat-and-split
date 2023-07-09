import { useState } from "react";
import { Button } from "./Button";
import { FriendT } from "./App";

export function FormAddFriend({
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
