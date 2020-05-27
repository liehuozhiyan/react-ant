import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { qryPlaylist, qryPlaylistById, savePlaylist, delPlaylist } from '../service';

/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'playlist',

  state: {
    pageData: PageHelper.create()
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/playlist' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'beforeload'
          });
        }
      });
    }
  },

  effects: {
    *beforeload({ }, { call, put, select }) {
      const { pageData } = yield select(state => state.playlist);
      yield put({
        type: 'qryPlaylist',
        payload: pageData.requestFormat().startPage(1, 10)
      });
    },
    *savePlaylist({ condition, payload, success }, { call, put }) {
      const { code, msg } = yield call(savePlaylist, condition);
      if (code === "200") {
        yield put({
          type: 'qryPlaylist',
          payload: payload,
        });
        yield call(success, msg)
      } else {
        yield put({
          type: 'qryPlaylistError',
          msg:  msg 
        });
      }
    },
    *delPlaylist({ condition, payload, success }, { call, put }) {
      condition = {
        ids: condition.concat().toString()
      }
      const { code, msg } = yield call(delPlaylist, condition);
      if (code === "200") {
        yield put({
          type: 'qryPlaylist',
          payload: payload,
          success
        });
      } else {
        yield put({
          type: 'qryPlaylistError',
          msg:  msg 
        });
      }
    },
    *qryPlaylist({ payload = {}, success }, { call, put }) {
      const { code, msg, root: playlist, totalNum } = yield call(qryPlaylist, payload);
      if (code === "200") {
        yield put({
          type: 'qryPlaylistSuccess',
          playlist:  playlist,
          totalNum: totalNum
        });
        if(success) yield call(success);
      } else {
        yield put({
          type: 'qryPlaylistError',
          msg:  msg 
        });
      }
    },
    *qryPlaylistById({ payload = {}, success }, { call, put }) {
      const { code, msg, root: playlistInfo } = yield call(qryPlaylistById, payload);
      if (code === "200") {
        yield put({
          type: 'qryPlaylistByIdSuccess',
          playlistInfo
        });
        if(success) yield call(success);
      } else {
        yield put({
          type: 'qryPlaylistError',
          msg:  msg 
        });
      }
    },
  },
  reducers: {
    qryPlaylistSuccess(state, { playlist, totalNum }) {
      return {
        ...state,
        pageData: state.pageData.setData(playlist, totalNum),
      };
    },
    qryPlaylistByIdSuccess(state, { playlistInfo }) {
      return {
        ...state,
        playlistInfo,
      };
    },
    qryPlaylistError(state, { msg }) {
      return {
        ...state,
        msg: msg
      };
    },
  }
});
