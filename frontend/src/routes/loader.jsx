export async function usersLoader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Users not found");
  }
  return res.json();
}

export async function friendsLoader() {
  const res = await fetch(
    "https://raw.githubusercontent.com/Lemoncode/simple-hotels-mock-rest-api/master/mock-data/hotels-data.json"
  );
  if (!res.ok) {
    throw new Error("Hotels not found", { status: 500 });
  }
  const data = await res.json();

  return data.hotels;
}

export async function productsLoader() {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) {
    throw new Error("Products not found");
  }
  const data = await res.json();

  return data.products;
}
