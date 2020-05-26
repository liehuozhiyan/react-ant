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
      const { code, msg, root, token } = yield call(login, payload);
      yield call(success, code, msg);
      if (code === "200") {
        //登录成功，缓存当前登录用户
        $$.setStore('user', root);

        //登录成功，缓存token
        $$.setStore('token', token);

        //登录成功，缓存权限
        let authCodes = {};

        const privilegeList = root.role.privilegeList;

        privilegeList.map(privilege => {
          authCodes[privilege.authCode] = privilege;
        });

        $$.setStore('authCodes', authCodes);

        if (root.clientColumns) {
          let clientColumns = JSON.parse(root.clientColumns);
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
