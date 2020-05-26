import React from 'react';
import PageLoading from 'components/Loading/PageLoading';
import { normal } from 'components/Notification';
import store from 'cmn-utils/lib/store';
import {
	forceHomepage,
} from '@/utils/common';

// 系统通知, 定义使用什么风格的通知，normal或antdNotice
const notice = normal;

/**
 * 应用配置 如请求格式，反回格式，异常处理方式，分页格式等
 */
export default {
  /**
   * HTML的title模板
   */
  htmlTitle: 'DBAdmin - {title}',
  
  /**
   * 系统通知
   */
  notice,

  // 异步请求配置,配置这个参数，每次发送请求时都会默认增加这个前缀
  request: {
    prefix: '/cdmsA',

    // 可跟据接口需求自定义头部信息，每次请求头部都会带着这些参数
    withHeaders: () => ({
      token: store.getStore("token"),
    }),

    /**
     * 每个请求反回时都会先进入这个函数，
     * 因为modelEnhance需要知道服务器反回的数据，
     * 什么样的是成功，什么样的是失败，如
     * {status: true, data: ...} // 代表成功
     * {status: false, message: ...} // 代表失败
     * 实际中应该通过服务端反回的response中的
     * 成功失败标识来进行区分
     */
    afterResponse: response => {
      const { code, msg } = response;
      if (code === '200') {
      } else if(code === '1003000'){
        // console.log("config afterResponse", response, info)
        //如果异常代码是1003000，表示用户会话过期，弹框退出页面
        forceHomepage();
      } else {
        notice.error(window.language['responseCode.' + code]);
      }
      return response;
    },
    // 即在请求出现错误时进入这个函数
    errorHandle: err => {
      // 请求错误全局拦截
      if (err.name === 'RequestError') {
        let content = err.text || err.message;
        let contentMsg = content;
        if (content === 'Failed to fetch') {
          contentMsg = '当前网络状况复杂，请尝试使用其他网络';
        }
        notice.error({
          title: window.language['material.notice'],
          className: 'custom-modal',
          content: contentMsg,
          message: contentMsg,
          onOk: () => {
            window.location.href = window.contextPath + '#/sign/login';
          }
        })
      }
    }
  },
  // 全局异常
  // 此处即为dvajs中的onError，可以看src/index.js，effect 执行错误或 subscription 通过 done 主动抛错时触发，可用于管理全局出错状态
  exception: {
    global: (err, dispatch) => {
      const errName = err.name;
      // RequestError为拦截请求异常
      if (errName === 'RequestError') {
        console.error(err);
      } else {
        notice.error(err.message);
        console.error(err);
      }
      // notice.error(err.message);
    },
  },

  // 分页助手
  pageHelper: {
    // 格式化要发送到后端的数据
    requestFormat: pageInfo => {
      const { pageNum, pageSize, filters, sorts } = pageInfo;
      return {
        currentPage: pageNum,
        showCount: pageSize,
        sortMap: sorts,
        paramMap: filters
      };
    },

    // 格式化从后端反回的数据
    responseFormat: resp => {
      const {
        currentPage,
        showCount,
        totalResult,
        dataList,
        totalPage
      } = resp.data;
      return {
        pageNum: currentPage,
        pageSize: showCount,
        total: totalResult,
        totalPages: totalPage,
        list: dataList
      };
    }
  },

  // 路由加载效果
  router: {
    loading: <PageLoading loading />
  },

  /**
   * 模拟数据时包装反回数据
   * 因为，后端反回数据时一般都会在外边包装一层状态信息
   * 如成功时：
   * {
   *   status: true,
   *   data: responseData
   * }
   * 或出错时：
   * {
   *   status: false,
   *   code: 500,
   *   message: '用户名或密码错误'
   * }
   * 这里就是配置这两个函数，为了我们模拟数据时可以少写几行代码的 orz...
   */
  mock: {
    toSuccess: response => ({
      status: true,
      data: response
    }),

    toError: message => ({
      status: false,
      message: message
    })
  }
};
