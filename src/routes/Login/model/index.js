import { routerRedux } from 'dva/router';
import { login } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {}
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
          $$.removeStore('token');
        }
      });
    }
  },

  effects: {
    *login({ payload, success }, { call, put }) {
      const { code, msg, data, token } = yield call(login, payload);
      yield call(success, code, msg);
      if (code === "1000000") {
        //登录成功，缓存当前登录用户
        $$.setStore('user', data);

        //登录成功，缓存token
        $$.setStore('token', data.token);

        //登录成功，缓存权限
        let authCodes = {};

        const menuList = data.menuList;

        menuList.map(menu => {
          authCodes[menu.permissionAuthcode] = menu;
        });

        $$.setStore('authCodes', authCodes);

        if (data.clientColumns) {
          let clientColumns = JSON.parse(data.clientColumns);
          $$.setStore('unDisplays', clientColumns.unDisplays);
          $$.setStore('unWidth', clientColumns.unWidth);
        }

        yield put(routerRedux.replace('/'));
      } else {
        yield put({
          type: 'loginError',
          payload: { msg }
        });
      }
    },
    *logout(_, { put }) {}
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message
      };
    }
  }
};
