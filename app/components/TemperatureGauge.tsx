import * as React from "react";
import GaugeComponent from "react-gauge-component";

const TemperatureGauge = ({ value }: { value: number }) => {
  return (
    <GaugeComponent
      type="semicircle"
      style={{ width: "280px", height: "170px", marginTop: 10 }}
      arc={{
        width: 0.2,
        padding: 0.005,
        cornerRadius: 1,
        // gradient: true,
        subArcs: [
          {
            limit: 15,
            color: "#EA4228",
            showTick: true,
            tooltip: {
              text: "Too low temperature!",
            },
          },
          {
            limit: 17,
            color: "#F5CD19",
            showTick: true,
            tooltip: {
              text: "Low temperature!",
            },
          },
          {
            limit: 28,
            color: "#5BE12C",
            showTick: true,
            tooltip: {
              text: "OK temperature!",
            },
          },
          {
            limit: 30,
            color: "#F5CD19",
            showTick: true,
            tooltip: {
              text: "High temperature!",
            },
          },
          {
            color: "#EA4228",
            tooltip: {
              text: "Too high temperature!",
            },
          },
        ],
      }}
      pointer={{
        color: "#345243",
        length: 0.8,
        width: 15,
        // elastic: true,
      }}
      labels={{
        valueLabel: { formatTextValue: (value) => value + "ºC" },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (value) => value + "ºC",
          },
          ticks: [{ value: 13 }, { value: 22.5 }, { value: 32 }],
        },
      }}
      value={value}
      minValue={10}
      maxValue={35}
    />
  );
};

export default TemperatureGauge;
