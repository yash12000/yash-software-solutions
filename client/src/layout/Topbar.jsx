export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white p-4 shadow flex justify-between">
      <span>Dashboard</span>
      <span>{user?.name}</span>
    </div>
  );
}