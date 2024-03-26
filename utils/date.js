const moment = require("moment");

module.exports = {
  getValue: (date) => new Date(date).valueOf(),
  is30days: (date) => {
    const dat = moment(date).format("MM/DD/YYYY");
    const thirtyDaysAgo = moment().subtract(30, "days").format("L");
    if (dat === thirtyDaysAgo) {
      return true;
    }

    return false;
  },
  isToday: (date) => {
    const dat = moment(date).format("MM/DD/YYYY");
    const today = moment().format("MM/DD/YYYY");

    if (dat === today) {
      return true;
    }

    return false;
  },
  epochWithoutTime: (shortEpoch) => {
    let date = new Date(shortEpoch * 1000);
    date = date.setHours(0, 0, 0, 0);
    date = new Date(date).getTime();
    return date / 1000;
  },
  epochToMDY: (epoch) => {
    const dat = moment(epoch).format("MM/DD/YYYY");
    return dat;
  },

  normalizeDate: (date, returnFormat) => {
    const dateEpoch = new Date(date) - 0;
    if (returnFormat == "epoch") return dateEpoch;
    const shortDate = new Date(dateEpoch).toISOString().slice(0, 10);
    if (returnFormat == "short") return shortDate;
    const longDate = new Date(shortDate).toISOString();
    if (returnFormat == "long") return longDate;
    return { dateEpoch, shortDate, longDate };
  },
  day_difference: (start, end) => {
    return Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
  },
};
