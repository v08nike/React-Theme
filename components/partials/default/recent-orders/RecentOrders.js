import React from "react";
import { Card } from "reactstrap";
import { DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../../Component";
import { recentOrderData } from "./OrderData";

const RecentOrders = () => {
  return (
    <Card className="card-full">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Recent Orders</h6>
          </div>
        </div>
      </div>
      <div className="nk-tb-list mt-n2">
        <DataTableHead>
          <DataTableRow>
            <span>Order No.</span>
          </DataTableRow>
          <DataTableRow size="sm">
            <span>Customer</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Date</span>
          </DataTableRow>
          <DataTableRow>
            <span>Amount</span>
          </DataTableRow>
          <DataTableRow>
            <span className="d-none d-sm-inline">Status</span>
          </DataTableRow>
        </DataTableHead>
        {recentOrderData.map((item, idx) => (
          <DataTableItem key={idx}>
            <DataTableRow>
              <span className="tb-lead">
                <a href="#order" onClick={(ev) => ev.preventDefault()}>
                  {item.order}
                </a>
              </span>
            </DataTableRow>
            <DataTableRow size="sm">
              <div className="user-card">
                <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.img}></UserAvatar>
                <div className="user-name">
                  <span className="tb-lead">{item.name}</span>
                </div>
              </div>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="tb-sub">{item.date}</span>
            </DataTableRow>
            <DataTableRow>
              <span className="tb-sub tb-amount">
                {item.amount} <span>USD</span>
              </span>
            </DataTableRow>
            <DataTableRow>
              <span
                className={`badge badge-dot badge-dot-xs badge-${
                  item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                }`}
              >
                {item.status}
              </span>
            </DataTableRow>
          </DataTableItem>
        ))}
      </div>
    </Card>
  );
};
export default RecentOrders;
