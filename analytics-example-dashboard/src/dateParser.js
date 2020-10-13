 const metricChartDateParser = (date) => {
    const newDate = new Date(date);
    return newDate.getHours() + ':' +  newDate.getMinutes();
};

export default metricChartDateParser;
