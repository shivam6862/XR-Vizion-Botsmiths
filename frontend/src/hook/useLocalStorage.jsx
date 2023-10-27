export const useLocalStorage = () => {
  const updatePersonalDetails = (data) => {
    localStorage.setItem("PersonalDetails", JSON.stringify(data));
  };
  const fetchPersonalDetails = () => {
    if (typeof localStorage == "undefined") return;
    const Data = localStorage.getItem("PersonalDetails");
    const response = JSON.parse(Data);
    return response;
  };
  const removePersonalDetails = () => {
    localStorage?.removeItem("PersonalDetails");
  };

  return {
    updatePersonalDetails,
    fetchPersonalDetails,
    removePersonalDetails,
  };
};
