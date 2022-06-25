import React, { useState } from "react";
import { Icon } from "../../../Component";
import { Card, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { AverageOrderChart } from "../../charts/e-commerce/EcomCharts";

const AverageOrder = () => {
  const [data, setData] = useState("7");
  return (
    <Card className="h-100">
      <div className="nk-ecwg nk-ecwg2">
        <div className="card-inner">
          <div className="card-title-group mt-n1">
            <div className="card-title">
              <h6 className="title">Averarge order</h6>
            </div>
            <div className="card-tools mr-n1">
              <UncontrolledDropdown>
                <DropdownToggle
                  tag="a"
                  href="#toggle"
                  onClick={(ev) => ev.preventDefault()}
                  className="dropdown-toggle btn btn-icon btn-trigger"
                >
                  <Icon name="more-h" />
                </DropdownToggle>
                <DropdownMenu right className="dropdown-menu-sm">
                  <ul className="link-list-opt no-bdr">
                    <li className={data === "7" ? "active" : ""}>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("7");
                        }}
                      >
                        <span>7 Days</span>
                      </DropdownItem>
                    </li>
                    <li className={data === "15" ? "active" : ""}>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("15");
                        }}
                      >
                        <span>15 days</span>
                      </DropdownItem>
                    </li>
                    <li className={data === "30" ? "active" : ""}>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("30");
                        }}
                      >
                        <span>30 days</span>
                      </DropdownItem>
                    </li>
                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">$463.35</div>
              <div className="info text-right">
                <span className="change up text-danger">
                  <Icon name="arrow-long-up"></Icon>4.63%
                </span>
                <br />
                <span>vs. last week</span>
              </div>
            </div>
          </div>
          <h6 className="sub-title">Orders over time</h6>
        </div>
        <div className="nk-ecwg2-ck">
          <AverageOrderChart state={data} />
        </div>
      </div>
    </Card>
  );
};
export default AverageOrder;
