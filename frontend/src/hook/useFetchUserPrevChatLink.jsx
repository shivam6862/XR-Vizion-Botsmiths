import { useState, useEffect, useContext } from "react";
import { useNotification } from "./useNotification";
import { useSession } from "next-auth/react";

export const useFetchUserPrevChatLink = (defaultValue) => {
  const { data: user } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultValue);
  const { NotificationHandler } = useNotification();

  useEffect(() => {
    const loadResources = async () => {
      if (user == null || user == undefined) {
        setData(defaultValue);
        setIsLoading(false);
        return;
      }
      const uid = user.user.email;
      const authToken = user.user.email;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${uid}/conversations`;
      console.log(url);
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
        const reversedArray = data.reverse();
        setData(reversedArray);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        NotificationHandler("Error", "Check your connection!", "Error");
        setData([{ id: "null", name: "No conversations" }]);
        setIsLoading(false);
      }
    };
    loadResources();
  }, [user?.user?.email]);

  return { isLoading, data, setData };
};
