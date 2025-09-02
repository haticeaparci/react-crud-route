import { useParams, useLoaderData } from "react-router-dom";

const FriendsDetail = () => {
  const { friendId } = useParams();

  const friends = useLoaderData();
  const friend = friends.find((f) => f.id === friendId);

  if (!friend) return <p>Friend not found</p>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1> 📝 Todo / Planned Improvements ⏳ </h1>
      <h2>{friend.name}</h2>
      <p>
        <strong>Address: </strong> {friend.address1}
      </p>
      <p>
        <strong>City: </strong> {friend.city}
      </p>
      <p>
        <strong>Rating: </strong> {friend.rating} ⭐
      </p>
    </div>
  );
};

export default FriendsDetail;
