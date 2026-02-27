import MainLayout from "../layout/MainLayout";
import ChatUI from "../components/ChatUI";

export default function Messages() {
  return (
    <MainLayout>
      <h1 className="text-xl mb-4">Messages</h1>
      <ChatUI />
    </MainLayout>
  );
}