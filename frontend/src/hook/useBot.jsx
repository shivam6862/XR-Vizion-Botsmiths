const useBot = () => {
  const uploadDocument = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PYTHON_URL}/uploadDocument`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      const data = [
        {
          text: "Sorry server is busy!",
          timeTaken: "15s",
          queryCost: "1",
          messageHistory: { title: "", chat_summary: "new chat begins" },
        },
      ];
      return data;
    }
  };
  return { uploadDocument };
};
export default useBot;
