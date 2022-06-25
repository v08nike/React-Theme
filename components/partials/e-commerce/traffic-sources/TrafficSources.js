import React, { useState } from "react";
import { Card, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { Icon } from "../../../Component";
import { TrafficSourcesChart } from "../../charts/e-commerce/EcomCharts";

const TrafficSources = () => {
  const [data, setData] = useState("7");
  return (
    <Card className="card-full overflow-hidden">
      <div className="nk-ecwg nk-ecwg4 h-100">
        <div className="card-inner flex-grow-1">
          <div className="card-title-group mb-4">
            <div className="card-title">
              <h6 className="title">Traffic Sources</h6>
            </div>
            <div className="card-tools">
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
          <div className="data-group">
            <div className="nk-ecwg4-ck">
              <TrafficSourcesChart state={data} />
            </div>
            <ul className="nk-ecwg4-legends">
              <li>
                <div className="title">
                  <span className="dot dot-lg sq" style={{ background: "#9cabff" }}></span>
                  <span>Organic Search</span>
                </div>
                <div className="amount amount-xs">{data === "7" ? "2505" : data === "15" ? "3505" : "4000"}</div>
              </li>
              <li>
                <div className="title">
                  <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
                  <span>Referrals</span>
                </div>
                <div className="amount amount-xs">{data === "7" ? "482" : data === "15" ? "800" : "1250"}</div>
              </li>
              <li>
                <div className="title">
                  <span className="dot dot-lg sq" style={{ background: "#b8acff" }}></span>
                  <span>Social Media</span>
                </div>
                <div className="amount amount-xs">{data === "7" ? "859" : data === "15" ? "1650" : "3250"}</div>
              </li>
              <li>
                <div className="title">
                  <span className="dot dot-lg sq" style={{ background: "#f9db7b" }}></span>
                  <span>Others</span>
                </div>
                <div className="amount amount-xs">{data === "7" ? "138" : data === "15" ? "150" : "250"}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-inner card-inner-md bg-light">
          <div className="card-note">
            <Icon className="info-fill"></Icon>
            <span>Traffic channels have beed generating the most traffics over past days.</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrafficSources;
