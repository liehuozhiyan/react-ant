import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';

export default (self, playlist) => [
  {
    title: window.language['playlist.playlistname'], // 列表名称
    name: 'name',
    tableItem: {},
    formItem: {},
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '列表类型',
    name: 'type',
    dict: [{ code: '0', codeName: '播放列表' }, { code: '1', codeName: '即时插播' }],
    tableItem: {},
    formItem: {
      type: 'select'
    },
    searchItem: {
      type: 'select',
      width: 160,
      group: 'abc'
    }
  },
  {
    title: window.language['playlist.sense'], // 分辨率
    name: 'sense',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: window.language['playlist.updatetime'], //'更新时间'
    name: 'updateTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    }
  },
  {
    title: '备注',
    name: 'remark',
    formItem: {
      type: 'editor'
    }
  },
  {
		title: window.language['playlist.operate'], // '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip={window.language['common.update']} onClick={e => self.onUpdate(record)}>
            <Icon className="edit-o" />
          </Button>
          <Button tooltip={window.language['common.del']} onClick={e => self.onDelete(record)}>
            <Icon className="delete-o" />
          </Button>
          <Button tooltip="跳转到新路由">
            <Link to={"/playlist/detail?id=" + record.id}>
              vvv<Icon type="link" />
            </Link>
          </Button>
        </DataTable.Oper>
      )
    }
  }
];
