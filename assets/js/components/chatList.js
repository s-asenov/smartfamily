import React from "react";

const InvitationItem = ({ item, index, accept, reject, isGroup }) => {
  let invitationImg;

  if (!item["inviter_userImg"]) {
    invitationImg = noProfilePic;
  } else {
    invitationImg = BASE_URL + "uploads/" + item["inviter_userImg"];
  }

  return (
    <Col
      md="12"
      className={index % 2 ? "invitation-wrap even" : "invitation-wrap odd"}
    >
      <div className="invitation-target">
        <Image roundedCircle src={invitationImg} height="35" width="35" />
        <p className="invitation-description">
          Покана от {item["inviter_firstName"] + " " + item["inviter_lastName"]}
          {isGroup
            ? " за членство в група" + " " + item["groupName"]
            : " за добавяне като " +
              (item["isChild"] === 1 ? "дете" : "приятел")}
        </p>
      </div>
      <div className="invitation-action">
        <FontAwesomeIcon
          style={{ color: "green" }}
          icon={faCheck}
          title="Приемане!"
          onClick={accept}
        />
        <FontAwesomeIcon
          style={{ color: "red", marginLeft: "10px" }}
          title="Отказване!"
          icon={faBan}
          onClick={reject}
        />
      </div>
    </Col>
  );
};

function ChatList() {}

export default ChatList;
