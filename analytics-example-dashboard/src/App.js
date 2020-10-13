import React, { useState, useEffect } from "react";
import MyLineChart from "./components/MyLineChart";
import  metricChartDateParser  from './dateParser';
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
            console.log('item.created_at', item);
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
        });
    };

    getAnalytics(TTFB);
    getAnalytics(FCP);
    getAnalytics(DOM_LOAD);
    getAnalytics(WINDOW_LOAD);
  }, []);

  console.log("TTFBData", TTFBData);
  console.log("FCPData", FCPData);
  console.log("domLoadData", domLoadData);
  console.log("windowLoadData", windowLoadData);

  return (
    <div className="App">
      <MyLineChart data={TTFBData} />
      <MyLineChart data={FCPData} />
      <MyLineChart data={domLoadData} />
      <MyLineChart data={windowLoadData} />
    </div>
  );
};

export default App;
