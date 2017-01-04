import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalManager from './bits/modals/manager';
import HeaderSearch from './components/HeaderSearch';
import LoginModal from './components/LoginModal';
import perf from './tracking/perf';
import renderSearch from './apps/search';

// Promise polyfil
if (!window.Promise) {
  window.Promise = Promise;
}

const modals = ModalManager();

const actions = {
  login(e) {
    e.preventDefault();
    modals.add(<LoginModal />);
  },
};

function linkListener(e) {
  const el = e.target.dataset;
  if (Object.hasOwnProperty.call(actions, el.action)) {
    actions[el.action](e);
  }
}

window.ga = () => {};

document.addEventListener('DOMContentLoaded', () => {
  modals.init();
  [...document.querySelectorAll('a')].forEach((e) => {
    e.addEventListener('click', linkListener);
  });

  if (document.querySelector('.app__search')) {
    // eslint-disable-next-line
    renderSearch();
  }

  ReactDOM.render(<HeaderSearch />, document.querySelector('.Header__search'));

  if (document.querySelector('.app__events')) {
    const t = perf.recordTime('import', 'calender');
    System.import('./apps/events-calender').then(() => t.done());
  }

  if (document.querySelector('.app__activities')) {
    const t = perf.recordTime('import', 'activities');
    System.import('./apps/activities').then(() => t.done());
  }

  if (document.querySelector('.app__tweets')) {
    const t = perf.recordTime('import', 'tweets');
    System.import('./apps/tweets').then(() => t.done());
  }

  System.import('./bits/panel').then(panel => panel.default());
});
