import { useNotification } from "./useNotification";
import { useSession } from "next-auth/react";

const usecreateConversation = () => {
  const { NotificationHandler } = useNotification();
  const { data: user } = useSession();

  const create = async (name, chat, conversationId, messageHistory) => {
    const userId = user.user.email;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            userId: userId,
            chat: chat,
            conversationId: conversationId,
            messageHistory: messageHistory,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      NotificationHandler("Error", "Check your connection!", "Error");
      return "false";
    }
  };
  return { create };
};
export default usecreateConversation;
