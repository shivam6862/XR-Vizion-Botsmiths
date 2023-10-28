import { useState, useEffect, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "./useNotification";

export const useFetchUserPrevChatLink = (defaultValue) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultValue);
  const { fetchPersonalDetails } = useLocalStorage();
  const user = fetchPersonalDetails();
  const { NotificationHandler } = useNotification();

  useEffect(() => {
    const loadResources = async () => {
      if (user == null || user == undefined) {
        setData(defaultValue);
        setIsLoading(false);
        return;
      }
      const uid = user.data.id;
      const authToken = user.token;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${uid}/conversations`;

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
  }, []);

  return { isLoading, data, setData };
};
