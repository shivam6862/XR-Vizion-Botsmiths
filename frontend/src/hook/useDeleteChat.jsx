import { useNotification } from "./useNotification";
import { useSession } from "next-auth/react";

export const useDeleteChat = () => {
  const { NotificationHandler } = useNotification();
  const { data: user } = useSession();

  const deletechat = async (conversationId) => {
    try {
      const userId = user.user.email;
      const authToken = user.user.email;
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
