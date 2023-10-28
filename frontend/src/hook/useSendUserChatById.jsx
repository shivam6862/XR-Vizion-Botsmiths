import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "./useNotification";

export const useSendUserChatById = () => {
  const { NotificationHandler } = useNotification();
  const { fetchPersonalDetails } = useLocalStorage();

  const sendUserChat = async (conversationId, chat, messageHistory) => {
    try {
      const user = fetchPersonalDetails();
      const userId = user.data.id;
      const authToken = user.token;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addconversations/${conversationId}/${userId}`;

      const headers = new Headers({
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      });

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          text: chat[chat.length - 1],
          messageHistory: messageHistory,
        }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      NotificationHandler("Error", "Check your connection!", "Error");
      const data = {
        error: "Server Error!",
        conversation: [],
        messageHistory: "",
      };
      return data;
    }
  };
  return { sendUserChat };
};
