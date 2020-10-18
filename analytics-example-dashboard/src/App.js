import React, { useState, useEffect } from "react";
import MyLineChart from "./components/MyLineChart";
import metricChartDateParser from "./dateParser";
import "./App.css";

const TTFB = "ttfb";
const FCP = "fcp";
const DOM_LOAD = "dom_load";
const WINDOW_LOAD = "window_load";

const App = () => {
  const [TTFBData, setTTFBData] = useState("");
  const [FCPData, setFCPData] = useState("");
  const [domLoadData, setDomLoadData] = useState("");
  const [windowLoadData, setWindowLoadData] = useState("");

  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    const getAnalytics = (type) => {
      fetch(`${BASE_URL}/?type=${type}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          data = data.map((item) => {
            item.created_at = metricChartDateParser(item.created_at);
            return item;
          });
          switch (type) {
            case TTFB:
              setTTFBData(data);
              break;
            case FCP:
              setFCPData(data);
              break;
            case DOM_LOAD:
              setDomLoadData(data);
              break;
            case WINDOW_LOAD:
              setWindowLoadData(data);
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    getAnalytics(TTFB);
    getAnalytics(FCP);
    getAnalytics(DOM_LOAD);
    getAnalytics(WINDOW_LOAD);
  }, []);

  const chartStyles = {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
  };

  return (
    <div className="App">
      <div className="chart-container" style={chartStyles}>
        <MyLineChart width={400} height={500} data={TTFBData} />
        <MyLineChart width={400} height={500} data={FCPData} />
        <MyLineChart width={400} height={500} data={domLoadData} />
        <MyLineChart width={400} height={500} data={windowLoadData} />
      </div>
    </div>
  );
};

export default App;
