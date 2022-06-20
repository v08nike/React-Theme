import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import OrderStatistics from "../components/partials/default/OrderStatistics";
import StoreStatistics from "../components/partials/default/StoreStatistics";
import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../components/partials/default/top-products/TopProducts";
import DataCard from "../components/partials/default/DataCard";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../components/partials/charts/default/DefaultCharts";

const Homepage = () => {
  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col xxl="3" sm="6">
              <DataCard
                title="Today's Order"
                percentChange={"4.63"}
                up={true}
                chart={<DefaultOrderChart />}
                amount={"1975"}
              />
            </Col>
            <Col xxl="3" sm="6">
              <DataCard
                title="Today's Revenue"
                percentChange={"2.63"}
                up={false}
                chart={<DefaultRevenueChart />}
                amount={"$2293"}
              />
            </Col>
            <Col xxl="3" sm="6">
              <DataCard
                title="Today's Customers"
                percentChange={"4.63"}
                up={true}
                chart={<DefaultCustomerChart />}
                amount={"847"}
              />
            </Col>
            <Col xxl="3" sm="6">
              <DataCard
                title="Today's Visitors"
                percentChange={"2.63"}
                up={false}
                chart={<DefaultVisitorChart />}
                amount={"23,485"}
              />
            </Col>
            <Col xxl="6">
              <SalesStatistics />
            </Col>
            <Col xxl="3" md="6">
              <OrderStatistics />
            </Col>
            <Col xxl="3" md="6">
              <StoreStatistics />
            </Col>
            <Col xxl="8">
              <RecentOrders />
            </Col>
            <Col xxl="4" md="8" lg="6">
              <TopProducts />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
