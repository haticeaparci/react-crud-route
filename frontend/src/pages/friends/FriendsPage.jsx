import FriendsList from "./FriendsList";

export default function FriendsPage() {
  return (
    <div
      className="products-page"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1> 📝 Todo / Planned Improvements ⏳ </h1>
      <FriendsList />
    </div>
  );
}
