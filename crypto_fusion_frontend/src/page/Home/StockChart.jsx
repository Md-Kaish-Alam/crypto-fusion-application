import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { fetchMarketChart } from "@/store/Coin/CoinAction";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3",
    key: "3 Month Time Series",
    lable: "3 Month",
    value: 90,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_6",
    key: "6 Month Time Series",
    lable: "6 Month",
    value: 180,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    lable: "1 year",
    value: 365,
  },
];

const options = {
  chart: {
    id: "area-datetime",
    type: "area",
    height: 450,
    zoom: {
      autoScaleYaxis: true,
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
      theme: "dark",
    },
    background: "#030712",
  },
  theme: {
    mode: "dark", // 👈 Important: enables dark mode
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    tickAmount: 6,
  },
  // colors: ["#758AA2"],
  colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
  markers: {
    colors: ["#fff"],
    strokeColors: "#fff",
    strokeWidth: 1,
    size: 0,
    style: "hollow",
  },
  tooltip: {
    theme: "dark",
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.1,
      opacityTo: 0.3,
      stops: [0, 100],
    },
  },
  grid: {
    borderColor: "#47535E",
    strokeDashArray: 4,
    show: true,
  },
  stroke: {
    curve: "smooth",
  },
};

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const [activeType, setActiveType] = useState(timeSeries[0]);

  const series = [
    {
      name: "Price",
      data: coin?.marketChart?.data,
    },
  ];

  useEffect(() => {
    if (coinId) {
      dispatch(
        fetchMarketChart({
          coinId,
          days: activeType.value,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [coinId, dispatch, activeType.value]);

  return (
    <div>
      <div id="chart">
        <div className="toolbars space-x-2">
          {timeSeries.map((item) => (
            <Button
              key={item.lable}
              onClick={() => setActiveType(item)}
              variant={activeType.lable == item.lable ? "default" : "outline"}
            >
              {item.lable}
            </Button>
          ))}
        </div>
      </div>
      <div id="chart-timelines" className="mt-4">
        <ReactApexChart
          options={options}
          series={series}
          height={450}
          type="area"
        />
      </div>
    </div>
  );
};

export default StockChart;

StockChart.propTypes = { coinId: PropTypes.string.isRequired };
