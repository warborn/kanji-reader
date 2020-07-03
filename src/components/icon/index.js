import React from "react";
import SVG from "react-inlinesvg";

const Icon = React.forwardRef(({ name, ...rest }, ref) => (
  <SVG
    src={`${process.env.REACT_APP_S3_BASE_URL}/${name}.svg`}
    innerRef={ref}
  />
));

export default Icon;
