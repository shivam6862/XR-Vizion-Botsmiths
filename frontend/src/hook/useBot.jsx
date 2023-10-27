const useBot = () => {
  const uploadDocument = async (question) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PYTHON_URL}/uploadDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      const data = [{ text: "Sorry server is busy!" }];
      return data;
    }
  };
  return { uploadDocument };
};
export default useBot;
