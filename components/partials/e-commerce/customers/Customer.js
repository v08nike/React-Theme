import React from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../Component";
import { TotalCustomerChart } from "../../charts/e-commerce/EcomCharts";

const Customer = () => {
  return (
    <Card>
      <div className="nk-ecwg nk-ecwg3">
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Customers</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">194</div>
              <div className="info text-right">
                <span className="change up text-danger">
                  <Icon name="arrow-long-up"></Icon>4.63%
                </span>
                <br />
                <span>vs. last week</span>
              </div>
            </div>
          </div>
        </div>
        <div className="nk-ecwg3-ck">
          <TotalCustomerChart />
        </div>
      </div>
    </Card>
  );
};
export default Customer;
