import { BsFillChatLeftDotsFill } from "react-icons/bs";

const ChatLogo = ({ dim, dimL }) => {
  return (
    <div
      style={{
        backgroundColor: "#0000FF",
        width: dimL,
        height: dimL,
        padding: "1rem",
        borderRadius: "4px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <BsFillChatLeftDotsFill size={dim} color="white" />
      </div>
    </div>
  );
};
export default ChatLogo;
