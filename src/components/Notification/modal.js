import React from 'react';
import { Modal } from 'antd';
import ReactDOM from 'react-dom';
import $$ from 'cmn-utils';

let modal = null;

function notice(config, type, title, time) {
  modal && modal.destroy();
  if ($$.isObject(config)) {
    modal = Modal[type]({
      className: 'custom-modal',
      content: config.message || config.content,
      title,
      ...config
    });
  } else {
    modal = Modal[type]({
      title: title ? title : window.language['material.notice'],
      className: 'custom-modal',
      content: config,
    });
  }

  time && setTimeout(() => {
    modal && modal.destroy();
  }, time);
}

export default class {
  static success(config, time) {
    notice(config, 'success', window.language['common.notice.success'], time);
  }

  static error(config, time) {
    notice(config, 'error',  window.language['common.notice.error'], time);
  }

  static info(config, time) {
    notice(config, 'info', window.language['common.notice.prompt'], time);
  }

  static warning(config, time) {
    notice(config, 'warning', window.language['common.notice.notice'], time);
  }

  static warn(config, time) {
    notice(config, 'warning', window.language['common.notice.notice'], time);
  }

  static confirm(config, time) {
    notice(config, 'confirm', window.language['common.notice.confirm'], time);
  }

  static close(key) {
    modal && modal.destroy();
    // notification.close(key);
  }

  static destroy() {
    modal && modal.destroy();
    // notification.destroy();
  }
}

