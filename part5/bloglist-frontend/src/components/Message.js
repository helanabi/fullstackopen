import "./Message.css";

const Message = ({ notif }) => {
  return <div className={`msg ${notif.type}`}>{notif.msg}</div>;
};

export default Message;
