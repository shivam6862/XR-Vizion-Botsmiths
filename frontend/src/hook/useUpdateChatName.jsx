import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "./useNotification";

export const useUpdateChatName = () => {
  const { fetchPersonalDetails } = useLocalStorage();
  const { NotificationHandler } = useNotification();

  const updateChatName = async (conversationId, name) => {
    try {
      const user = fetchPersonalDetails();
      const userId = user.data.id;
      const authToken = user.token;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/updatechatname/${conversationId}/${userId}`;

      const headers = new Headers({
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      });

      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          name: name,
        }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      NotificationHandler("Error", "Check your connection!", "Error");
      const data = {
        error: "Server Error!",
        message: "Error!",
      };
      return data;
    }
  };
  return { updateChatName };
};
