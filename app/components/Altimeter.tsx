import React from "react";
import { Altimeter } from "react-typescript-flight-indicators";

const Altitude = ({ value }: { value: number }) => {
  return <Altimeter size="190px" altitude={value} showBox={false} />;
};

export default Altitude;
