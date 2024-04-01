// Services
import Store from './Store.js';
import Logger from './Logger.js';

window.app = {};

// @todo: for testing purposes, remove when done
app.store = Store;
app.logger = Logger;

window.addEventListener('DOMContentLoaded', async () => {
  // @test
  // app.logger.logClass('Global App.js');
  
  // console.log({
  //   GlobalScope: window,
  //   app: app,
  // });
});
