import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  salesStatistics,
  todayCustomers,
  todayOrders,
  todayRevenue,
  todayVisitors,
  salesStatisticsSet2,
  salesStatisticsSet3,
  salesStatisticsSet4,
  orderStatistics,
} from "./DefaultData";

export const DefaultOrderChart = () => {
  return (
    <Line
      className="ecommerce-line-s3"
      data={todayOrders}
      options={{
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            title: function (tooltipItem, data) {
              return false;
            },
            label: function (tooltipItem, data) {
              return `${data.datasets[tooltipItem.datasetIndex]["data"][tooltipItem["index"]]} orders`;
            },
          },
          backgroundColor: "#1c2b46",
          titleFontSize: 8,
          titleFontColor: "#fff",
          titleMarginBottom: 4,
          bodyFontColor: "#fff",
          bodyFontSize: 8,
          bodySpacing: 4,
          yPadding: 6,
          xPadding: 6,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: "#9eaecf",
                padding: 0,
              },
              gridLines: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              ticks: {
                fontSize: 12,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 0,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    />
  );
};

export const DefaultCustomerChart = () => {
  return (
    <Line
      className="ecommerce-line-s3"
      data={todayCustomers}
      options={{
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            title: function (tooltipItem, data) {
              return false;
            },
            label: function (tooltipItem, data) {
              return `${data.datasets[tooltipItem.datasetIndex]["data"][tooltipItem["index"]]} customers`;
            },
          },
          backgroundColor: "#1c2b46",
          titleFontSize: 8,
          titleFontColor: "#fff",
          titleMarginBottom: 4,
          bodyFontColor: "#fff",
          bodyFontSize: 8,
          bodySpacing: 4,
          yPadding: 6,
          xPadding: 6,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: "#9eaecf",
                padding: 0,
              },
              gridLines: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              ticks: {
                fontSize: 12,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 0,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    />
  );
};

export const DefaultRevenueChart = () => {
  return (
    <Line
      className="ecommerce-line-s3"
      data={todayRevenue}
      options={{
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            title: function (tooltipItem, data) {
              return false;
            },
            label: function (tooltipItem, data) {
              return `${data.datasets[tooltipItem.datasetIndex]["data"][tooltipItem["index"]]} orders`;
            },
          },
          backgroundColor: "#1c2b46",
          titleFontSize: 8,
          titleFontColor: "#fff",
          titleMarginBottom: 4,
          bodyFontColor: "#fff",
          bodyFontSize: 8,
          bodySpacing: 4,
          yPadding: 6,
          xPadding: 6,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: "#9eaecf",
                padding: 0,
              },
              gridLines: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              ticks: {
                fontSize: 12,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 0,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    />
  );
};

export const DefaultVisitorChart = () => {
  return (
    <Line
      className="ecommerce-line-s3"
      data={todayVisitors}
      options={{
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            title: function (tooltipItem, data) {
              return false;
            },
            label: function (tooltipItem, data) {
              return `${data.datasets[tooltipItem.datasetIndex]["data"][tooltipItem["index"]]} users`;
            },
          },
          backgroundColor: "#1c2b46",
          titleFontSize: 8,
          titleFontColor: "#fff",
          titleMarginBottom: 4,
          bodyFontColor: "#fff",
          bodyFontSize: 8,
          bodySpacing: 4,
          yPadding: 6,
          xPadding: 6,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: "#9eaecf",
                padding: 0,
              },
              gridLines: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              ticks: {
                fontSize: 12,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 0,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    />
  );
};

export const DefaultSalesStatistics = ({ state }) => {
  const [data, setData] = useState(salesStatistics);
  useEffect(() => {
    let object;
    if (state === "Daily") {
      object = salesStatisticsSet2;
    } else if (state === "Monthly") {
      object = salesStatisticsSet3;
    } else {
      object = salesStatisticsSet4;
    }
    setData(object);
  }, [state]);
  return (
    <Line
      className="ecommerce-line-s4"
      data={data}
      options={{
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            title: function (tooltipItem, data) {
              return data["labels"][tooltipItem[0]["index"]];
            },
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex]["data"][tooltipItem["index"]];
            },
          },
          backgroundColor: "#1c2b46",
          titleFontSize: 13,
          titleFontColor: "#fff",
          titleMarginBottom: 6,
          bodyFontColor: "#fff",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: true,
              //stacked: _get_data.stacked ? _get_data.stacked : false,
              //position: NioApp.State.isRTL ? "right" : "left",
              ticks: {
                beginAtZero: true,
                fontSize: 11,
                fontColor: "#9eaecf",
                padding: 10,
                callback: function (value, index, values) {
                  return "$ " + value;
                },
                min: 0,
                stepSize: 3000,
              },
              gridLines: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              //stacked: _get_data.stacked ? _get_data.stacked : false,
              ticks: {
                fontSize: 9,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 10,
                //reverse: NioApp.State.isRTL,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "transparent",
              },
            },
          ],
        },
      }}
    />
  );
};

export const DefaultOrderStatistics = () => {
  return (
    <Doughnut
      data={orderStatistics}
      options={{
        legend: {
          display: false,
          labels: {
            boxWidth: 12,
            padding: 20,
            fontColor: "#6783b8",
          },
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            title: function (tooltipItem, data) {
              return data["labels"][tooltipItem[0]["index"]];
            },
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex]["data"][tooltipItem["index"]] + " ";
            },
          },
          backgroundColor: "#1c2b46",
          titleFontSize: 13,
          titleFontColor: "#fff",
          titleMarginBottom: 6,
          bodyFontColor: "#fff",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false,
        },
      }}
    />
  );
};
