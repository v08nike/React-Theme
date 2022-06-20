import React from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { ChatItemHeader } from "../../../../pages/app/chat/ChatPartials";
import { chatData } from "../../../../pages/app/chat/ChatData";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const ChatDropdown = () => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="a" href="#dropdown" onClick={(ev) => ev.preventDefault()} className="nk-quick-nav-icon">
        <div className="icon-status icon-status-na">
          <Icon name="comments"></Icon>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">Recent Chats</span>
          <Link to={`${process.env.PUBLIC_URL}/user-profile-setting`}>Setting</Link>
        </div>
        <div className="dropdown-body">
          <ul className="chat-list">
            {chatData.map((item, i) => {
              return item.convo.length > 0 && !item.group && <ChatItemHeader key={i} item={item} />;
            })}
          </ul>
        </div>
        <div className="dropdown-foot center">
          <Link to={`${process.env.PUBLIC_URL}/app-chat`}>View All</Link>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default withRouter(ChatDropdown);
