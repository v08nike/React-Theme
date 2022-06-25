import React from "react";
import { Card } from "reactstrap";
import { DefaultOrderStatistics } from "../charts/default/DefaultCharts";

const OrderStatistics = () => {
  return (
    <Card className="card-full overflow-hidden">
      <div className="nk-ecwg nk-ecwg7 h-100">
        <div className="card-inner flex-grow-1">
          <div className="card-title-group mb-4">
            <div className="card-title">
              <h6 className="title">Order Statistics</h6>
            </div>
          </div>
          <div className="nk-ecwg7-ck">
            <DefaultOrderStatistics />
          </div>
          <ul className="nk-ecwg7-legends">
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#816bff" }}></span>
                <span>Completed</span>
              </div>
            </li>
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#13c9f2" }}></span>
                <span>Processing</span>
              </div>
            </li>
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#ff82b7" }}></span>
                <span>Canclled</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
export default OrderStatistics;
