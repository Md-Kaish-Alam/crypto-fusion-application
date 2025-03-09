import { useState } from "react";
import ReactApexChart from "react-apexcharts";

import { Button } from "@/components/ui/button";

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
const StockChart = () => {
  const [activeType, setActiveType] = useState(timeSeries[0]);
  const series = [
    {
      data: [
        [1738886631765, 96567.63486519158],
        [1738890508742, 96656.38389228036],
        [1738893850825, 97463.82094798237],
        [1738897441886, 97585.5765251919],
        [1738901038031, 97442.04681675724],
        [1738904621061, 97459.12539682529],
        [1738908097655, 97354.27325739387],
        [1738911626442, 96876.89154634211],
        [1738915431391, 96765.55824275386],
        [1738919049234, 97129.2131679456],
        [1738922630207, 97337.03098963221],
        [1738926214511, 97316.41651615771],
        [1738929656631, 97760.09397417755],
        [1738933435385, 98006.31102408515],
        [1738936986155, 98873.42490634344],
        [1738940589508, 99606.01843437883],
        [1738944253816, 98081.80812585702],
        [1738947832752, 97880.47132241819],
        [1738951463151, 97416.13593512993],
        [1738955045117, 97758.33738706807],
        [1738958654604, 96896.28982042264],
        [1738962222904, 95746.87395405429],
        [1738965830336, 96040.13865031378],
        [1738969442331, 96108.29568062663],
        [1738973044306, 96558.4563096667],
        [1738976656292, 96670.89656751913],
        [1738980255147, 96548.21819135682],
        [1738983824400, 96786.35922159553],
        [1738987425095, 96713.24797153489],
        [1738991051997, 96320.34813679579],
        [1738994646448, 96154.76117032336],
        [1738998229795, 95952.52432602612],
        [1739001840625, 96223.7407871112],
        [1739005427457, 95905.61306579997],
        [1739008954123, 96095.3786132481],
        [1739012623068, 96039.32910256689],
        [1739016248355, 96003.7579365969],
        [1739020125465, 96087.21179559056],
        [1739023432395, 96218.75936833651],
        [1739027036703, 96072.01389415626],
        [1739030631360, 95836.79513855922],
        [1739034248165, 96168.08067753738],
        [1739037836480, 96355.02099871126],
        [1739041464996, 96518.94915955854],
      ],
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
      <div id="chart-timelines">
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
