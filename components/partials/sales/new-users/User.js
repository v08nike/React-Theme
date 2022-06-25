import React from "react";
import { newUserData } from "./UserData";
import UserAvatar from "../../../user/UserAvatar";
import Icon from "../../../icon/Icon";
import { DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, CardTitle } from "reactstrap";

const NewsUsers = () => {
  const DropdownTrans = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger mr-n1">
          <Icon name="more-h"></Icon>
        </DropdownToggle>
        <DropdownMenu right>
          <ul className="link-list-opt no-bdr">
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                <Icon name="setting"></Icon>
                <span>Action Settings</span>
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                <Icon name="notify"></Icon>
                <span>Use Notification</span>
              </DropdownItem>
            </li>
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
  return (
    <div className="card-inner-group">
      <div className="card-inner">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">New Users</h6>
          </CardTitle>
          <div className="card-tools">
            <a
              href="#dropdownitem"
              className="link"
              onClick={(ev) => {
                ev.preventDefault();
              }}
            >
              View All
            </a>
          </div>
        </div>
      </div>
      {newUserData.map((item, idx) => {
        return (
          <div className="card-inner card-inner-md" key={idx}>
            <div className="user-card">
              <UserAvatar theme={item.theme} text={item.initial}></UserAvatar>
              <div className="user-info">
                <span className="lead-text">{item.name}</span>
                <span className="sub-text">{item.email}</span>
              </div>
              <div className="user-action">
                <DropdownTrans />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default NewsUsers;
