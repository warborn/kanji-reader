import React from "react";
import { getKanjiIcon } from "../../lib/icon-loader";

const Icon = React.forwardRef(({ name, ...rest }, ref) => {
  const IconComponent = getKanjiIcon(name);
  //
  return IconComponent ? <IconComponent ref={ref} {...rest} /> : null;
});

export default Icon;
