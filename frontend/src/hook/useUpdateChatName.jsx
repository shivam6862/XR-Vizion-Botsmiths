import { useNotification } from "./useNotification";
import { useSession } from "next-auth/react";

export const useUpdateChatName = () => {
  const { NotificationHandler } = useNotification();
  const { data: user } = useSession();
  const updateChatName = async (conversationId, name) => {
    try {
      const userId = user.user.email;
      const authToken = user.user.email;
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
