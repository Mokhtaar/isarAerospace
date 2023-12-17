import React from "react";
import GaugeComponent from "react-gauge-component";

const VelocityGauge = ({ value }: { value: number }) => {
  return (
    <GaugeComponent
      id="gauge-component4"
      arc={{
        gradient: false,
        width: 0.15,
        padding: 0,
        subArcs: [
          {
            limit: 20,
            color: "#054082",
            showTick: true,
          },
          {
            limit: 40,
            color: "#054082",
            showTick: true,
          },
          {
            limit: 60,
            color: "#054082",
            showTick: true,
          },
          {
            limit: 80,
            color: "#054082",
            showTick: true,
          },
          {
            limit: 100,
            color: "#054082",
            showTick: true,
          },
          {
            limit: 120,
            color: "#054082",
            showTick: true,
          },
          {
            limit: 140,
            color: "#054082",
            showTick: true,
          },
          {
            limit: 160,
            color: "#054082",
            showTick: true,
          },
          {
            limit: 180,
            color: "#054082",
            showTick: true,
          },
          { color: "#054082" },
        ],
      }}
      labels={{
        valueLabel: { formatTextValue: (value) => value + "mph" },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (value) => value + "mph",
          },
        },
      }}
      minValue={0}
      maxValue={200}
      value={value}
    />
  );
};

export default VelocityGauge;
