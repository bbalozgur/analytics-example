import { getFCP } from "web-vitals";

const TTFB = "ttfb";
const FCP = "fcp";
const DOM_LOAD = "dom_load";
const WINDOW_LOAD = "window_load";

const BASE_URL = "http://localhost:4000";

class PerformanceAnalytics {
  constructor() {
    this.sendTTFB();
    this.sendFCP();
    document.addEventListener(
      "DOMContentLoaded",
      this.sendDOMLoad.bind(this),
      false
    );
    window.onload = (event) => {
      this.sendWindowLoad();
    };
  }

  sendMetric(type, value) {
    const requestBody = {
      host: location.host || "localhost",
      type,
      value,
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  }

  getTTFB() {
    const performanceTiming = performance.timing;
    const ttfb =
      performanceTiming.responseStart - performanceTiming.requestStart;
    return ttfb;
  }

  sendTTFB() {
    this.sendMetric(TTFB, this.getTTFB());
  }

  getFCP(resultListener) {
    getFCP((FCPReport) => {
      resultListener(FCPReport);
    });
  }

  sendFCP() {
    this.getFCP((FCPReport) => {
      this.sendMetric(FCP, FCPReport.value);
    });
  }

  getCurrentLoad() {
    return performance.now();
  }

  sendDOMLoad() {
    this.sendMetric(DOM_LOAD, this.getCurrentLoad());
  }

  sendWindowLoad() {
    this.sendMetric(WINDOW_LOAD, this.getCurrentLoad());
  }
}

const performanceAnalytics = new PerformanceAnalytics();

export default performanceAnalytics;
