import { useEffect, useState } from "react";
import { API } from "../services/api";
import MainLayout from "../layout/MainLayout";

export default function Messages() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!msg) return alert("Enter message");

    try {
      await API.post("/messages", { text: msg });
      setMsg("");
      fetchMessages();
    } catch (err) {
      alert("Error sending message");
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>

        <div className="bg-white p-4 rounded shadow mb-4 h-64 overflow-y-auto">
          {messages.length === 0 ? (
            <p>No messages</p>
          ) : (
            messages.map((m) => (
              <div key={m._id} className="border-b mb-2 pb-2">
                <p className="text-sm text-gray-600">
                  {m.sender?.name || "User"}
                </p>
                <p>{m.text}</p>
              </div>
            ))
          )}
        </div>

        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="border w-full p-2 mb-2"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Send
        </button>
      </div>
    </MainLayout>
  );
}