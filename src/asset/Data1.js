export async function userList() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );
  const data1 = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );
  const data2 = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );
  return Promise.all([data, data1, data2]);
}
userList().then((res) => console.log(res));
