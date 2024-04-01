const colors = {
  darkgreen: 'color: darkgreen',
  lightgreen: 'color: lightgreen',
  green: 'color: green;',
  red: 'color: red;'
};

const sizes = {
  sm: 'font-size: 12px;',
  md: 'font-size: 14px;',
  lg: 'font-size: 16px;'
};

const Logger = {
  logClass: (className) => {
    console.log(`%c${className}`, `${sizes.lg} ${colors.lightgreen}`);
  },
  logError: (message, ...args) => {
    console.log(`%cERROR: Theme's JS-`, `${sizes.lg} ${colors.red}`);
    console.error(message, ...args);
  },
  logJsPage: (fileName) => {
    console.log(`%c--${fileName}JS--`, `${sizes.lg} ${colors.darkgreen}`)
  },
  logLiquidPage: (fileName) => {
    console.log(`%c${fileName}Liquid`, `${sizes.lg} ${colors.darkgreen}`)
  },
  logMethod: (methodName, data) => {
    console.log(`%c${methodName}`, `${sizes.md} ${colors.green}`);

    if (data) {
      console.log(data);
    }
  }
}

export default Logger;
