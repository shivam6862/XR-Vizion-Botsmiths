import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "./useNotification";

export const useDeleteChat = () => {
  const { NotificationHandler } = useNotification();
  const { fetchPersonalDetails } = useLocalStorage();

  const deletechat = async (conversationId) => {
    try {
      const user = fetchPersonalDetails();
      const userId = user.data.id;
      const authToken = user.token;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/deletechat/${conversationId}/${userId}`;

      const headers = new Headers({
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      });

      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({}),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      NotificationHandler("Error", "Check your connection!", "Error");
      const data = {
        error: "Check your connection!",
        message: "Error!",
      };
      return data;
    }
  };
  return { deletechat };
};
