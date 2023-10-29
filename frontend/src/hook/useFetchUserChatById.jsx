import { useState, useEffect } from "react";
import { useNotification } from "./useNotification";
import { useSession } from "next-auth/react";

export const useFetchUserChatById = (conversationId, defaultValue) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultValue);
  const [messageHistory, setMessageHistory] = useState("");
  const { NotificationHandler } = useNotification();
  const { data: user } = useSession();

  useEffect(() => {
    const loadResources = async () => {
      if (user == null || user == undefined) {
        setData(defaultValue);
        setIsLoading(false);
        return;
      }

      if (conversationId.substr(0, 3) == "new") {
        setData(defaultValue);
        setIsLoading(false);
        return;
      }

      const userId = user.user.email;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/getconversations/${conversationId}/${userId}`;

      const authToken = user.user.email;
      const headers = new Headers({
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      });
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        setData(data.conversation);
        setMessageHistory(data.messageHistory);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        NotificationHandler("Error", "Check your connection!", "Error");
        setData([]);
        setMessageHistory("");
        setIsLoading(false);
      }
    };
    loadResources();
  }, [conversationId, user?.user]);

  return { isLoading, data, setData, messageHistory, setMessageHistory };
};
