import React, { useState } from "react";
import { Card, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { DefaultSalesStatistics } from "../charts/default/DefaultCharts";

const SalesStatistics = () => {
  const [data, setData] = useState("Weekly");
  return (
    <Card>
      <div className="nk-ecwg nk-ecwg8 h-100">
        <div className="card-inner">
          <div className="card-title-group mb-3">
            <div className="card-title">
              <h6 className="title">Sales Statistics</h6>
            </div>
            <div className="card-tools">
              <UncontrolledDropdown>
                <DropdownToggle
                  tag="a"
                  href="#toggle"
                  onClick={(ev) => ev.preventDefault()}
                  className="link link-light link-sm dropdown-indicator"
                >
                  {data}
                </DropdownToggle>
                <DropdownMenu right className="dropdown-menu-sm">
                  <ul className="link-list-opt no-bdr">
                    <li>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("Daily");
                        }}
                        className={data === "Daily" ? "active" : ""}
                      >
                        <span>Daily</span>
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("Weekly");
                        }}
                        className={data === "Weekly" ? "active" : ""}
                      >
                        <span>Weekly</span>
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("Monthly");
                        }}
                        className={data === "Monthly" ? "active" : ""}
                      >
                        <span>Monthly</span>
                      </DropdownItem>
                    </li>
                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <ul className="nk-ecwg8-legends">
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#6576ff" }}></span>
                <span>Total Order</span>
              </div>
            </li>
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#eb6459" }}></span>
                <span>Cancelled Order</span>
              </div>
            </li>
          </ul>
          <div className="nk-ecwg8-ck">
            <DefaultSalesStatistics state={data} />
          </div>
          <div className="chart-label-group pl-5">
            <div className="chart-label">01 Jul, 2020</div>
            <div className="chart-label">{data === "Daily" ? "02" : data === "Weekly" ? "07" : "30"} Jul, 2020</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default SalesStatistics;
