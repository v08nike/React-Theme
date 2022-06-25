import React from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../Component";
import { TotalSalesChart } from "../../charts/e-commerce/EcomCharts";

const TotalSales = () => {
  return (
    <Card className="is-dark h-100">
      <div className="nk-ecwg nk-ecwg1">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Total Sales</h6>
            </div>
            <div className="card-tools">
              <a href="#report" onClick={(ev) => ev.preventDefault()} className="link">
                View Report
              </a>
            </div>
          </div>
          <div className="data">
            <div className="amount">$74,958.49</div>
            <div className="info">
              <strong>$7,395.37</strong> in last month
            </div>
          </div>
          <div className="data">
            <h6 className="sub-title">This week so far</h6>
            <div className="data-group">
              <div className="amount">$1,338.72</div>
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
        <div className="nk-ecwg1-ck">
          <TotalSalesChart />
        </div>
      </div>
    </Card>
  );
};

export default TotalSales;
