import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from "../icon";

const noop = () => {};

const Kanji = ({ name, onReset, onPause }) => {
  const svgRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);

  const handleReset = useCallback(() => {
    if (svgRef.current) {
      svgRef.current.setCurrentTime(0);
      setIsPaused(false);
    }
    onReset();
  }, [onReset]);

  const handlePause = useCallback(() => {
    setIsPaused((state) => !state);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    if (isPaused) {
      svgRef.current.pauseAnimations();
    } else {
      svgRef.current.unpauseAnimations();
    }
  }, [isPaused]);

  return (
    <div className="kanji">
      <Icon
        ref={svgRef}
        name={`${name}-jlect`}
        onLoad={() => {
          if (svgRef.current) {
            svgRef.current.pauseAnimations();
            svgRef.current.setCurrentTime(0);
          }
        }}
      />
      <div className="controls">
        <button onClick={handlePause}>◼</button>
        <button onClick={handleReset}>⟳</button>
      </div>
    </div>
  );
};

Kanji.propTypes = {
  name: PropTypes.string.isRequired,
};

Kanji.defaultProps = {
  onReset: noop,
  onPause: noop,
};

export default Kanji;
