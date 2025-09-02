import { useLoaderData, useNavigation, Link } from "react-router-dom";
import Loader from "../../components/loader/Loader"; // UI spinner

const FriendsList = () => {
  const friends = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Loader />;
  }

  return (
    <div
      className="hotel-list"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Available Friends</h2>
      <p>We have {friends.length} friends available.</p>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <Link to={`/friends/${friend.id}`}>
                {friend.name} ⭐ {friend.rating}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
