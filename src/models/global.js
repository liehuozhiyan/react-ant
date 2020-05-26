import $$ from 'cmn-utils';
import modelEnhance from '@/utils/modelEnhance';
import { routerRedux } from 'dva/router';

export default modelEnhance({
  namespace: 'global',

  state: {
    menu: [],
    flatMenu: [],
  },

  effects: {
    *getMenu({ payload = {}}, { call, put }) {
      let user = $$.getStore("user");
      if(!user || !user.role || !user.role.menuList){
        // notice.error('会话已过期,请重新登录')
        yield put(routerRedux.replace('/sign'));
        return;
      }

      let root = user.role.menuList;
      let menus = yield call(generateMenuTree, root);
      menus = menus.concat(getMenu());

      if (root) {
        const loopMenu = (menu, pitem = {}) => {
          menu.forEach(item => {
            if (pitem.path) {
              item.parentPath = pitem.parentPath ? pitem.parentPath.concat(pitem.path) : [pitem.path];
            }
            if (item.children && item.children.length) {
              loopMenu(item.children, item);
            }
          });
        }
        loopMenu(menus);
        
        yield put({
          type: 'getMenuSuccess',
          payload: menus,
        });
      }
    }
  },

  reducers: {
    getMenuSuccess(state, { payload }) {
      return {
        ...state,
        menu: payload,
        flatMenu: getFlatMenu(payload),
      };
    }
  },
});

export function getFlatMenu(menus) {
  let menu = [];
  menus.forEach(item => {
    if (item.children) {
      menu = menu.concat(getFlatMenu(item.children));
    }
    menu.push(item);
  });
  return menu;
}

export  function generateMenuTree(menuList){
  menuList || (menuList = []);
  
  //三级菜单不展示，素材下面的菜单不展示
  let newMenuList = [];
  for (let i = 0; i< menuList.length; i++) {
    if (menuList[i].menuLevel < 3 && menuList[i].pid !== "11000000") {
      newMenuList.push(menuList[i]);
    }
  }

  return newMenuList.map(item => {
    //菜单国际化
    let name = window.language[item.name];
    if(item.childList && item.childList.length > 0){
      return {
        id: item.id,
        name: name,
        icon: item.iconUrl,
        path: item.action,
        children: generateMenuTree(item.childList),
      }
    }else{
      return {
        id: item.id,
        name: name,
        icon: item.iconUrl,
        path: item.action,
      }
    }
  })
}

function getMenu(payload) {
  return [
    {
      name: '仪表盘',
      icon: 'dashboard',
      path: '/dashboard',
    },
    {
      name: '组件',
      icon: 'desktop',
      path: '/component',
      children: [
        {
          name: '工具条',
          path: '/toolbar',
        },
        {
          name: 'BaseComponent',
          path: '/baseComponent',
        },
        {
          name: 'Columns',
          path: '/column',
        },
        {
          name: '搜索条',
          path: '/searchBar',
        },
        {
          name: '数据表格',
          path: '/datatable',
        },
        {
          name: '表单',
          path: '/form',
        },
        {
          name: '穿梭树',
          path: '/transferTree',
        },
        {
          name: '图表',
          path: '/charts',
          children: [
            {
              name: 'ECharts',
              path: '/charts/ec',
            },
            {
              name: 'G2',
              path: '/charts/g2',
            },
          ]
        },
        {
          name: '打印',
          path: '/print',
        },
        {
          name: 'Banner 管理',
          path: '/banner',
        },
      ],
    },
    {
      name: 'UI元素',
      icon: 'share-alt',
      path: '/ui',
      children: [
        {
          name: '按钮',
          path: '/button',
        },
        {
          name: '消息',
          path: '/alerts',
        },
        {
          name: '动画',
          path: '/animations',
        },
        {
          name: '图标',
          path: '/icons',
        },
        {
          name: '富文本',
          path: '/editor',
        },
        {
          name: '模态窗',
          path: '/modal',
        },
        {
          name: '遮罩',
          path: '/mask',
        },
      ],
    },
    {
      name: '页面',
      icon: 'book',
      path: '/page',
      children: [
        {
          name: '登录页',
          path: '/sign/login',
        },
        {
          name: '注册页',
          path: '/sign/register',
        },
        {
          name: '锁屏',
          path: '/lock',
        },
        {
          name: '画廊',
          path: '/gallery',
        },
        {
          name: '空白页',
          path: '/blank',
        },
        {
          name: '结果页',
          path: '/result',
        },
        {
          name: 'Coming Soon',
          path: '/coming',
        },
        {
          name: '403',
          path: '/403',
        },
        {
          name: '404',
          path: '/404',
        },
        {
          name: '500',
          path: '/500',
        },
        {
          name: '多级路由',
          path: '/level-route/:sub?',
        },
      ],
    },
    {
      name: '通用场景',
      icon: 'bulb',
      path: '/business',
      children: [
        {
          name: 'CRUD',
          path: '/crud/:detail?',
        }
      ],
    },
  ];
  // return $$.post('/user/menu', payload);
}