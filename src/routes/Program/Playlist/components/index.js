import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import config from '@/config';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;
const notice = config.notice;

@connect(({ playlist, loading }) => ({
  playlist,
  loading: loading.models.playlist
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: []
  };
  
  getPayload = () => {
    const { playlist: { pageData } } = this.props;
    const { filters: values, pageNum, pageSize } = pageData;
    let { name = "", sense = "", type = "" } = values;
    let payload = {
      name,
      sense,
      type,
      currentPage: pageNum,
      rowSize: pageSize,
    }
    return payload;
  }

  handleSearch = () => {
    let payload = this.getPayload();

    let { dispatch } = this.props;

    dispatch({
      type: 'playlist/qryPlaylist',
      payload,
      success: () => {
        this.setState({
          rows: [],
        })
      }
    });
  }

  handleDelete = records => {
    let payload = this.getPayload();
    const { rows } = this.state;
    this.props.dispatch({
      type: 'playlist/delPlaylist',
      condition: records.map(item => item.id),
      payload,
      success: () => {
        // 如果操作成功，在已选择的行中，排除删除的行
        this.setState({
          rows: rows.filter(item => !records.some(jtem => jtem.id === item.id))
        }, () => {
          notice.success(window.language['conmmon.del.success']);
        });
      }
    });
  };

  handleSave = values => {
    let payload = this.getPayload();

    this.props.dispatch({
      type: 'playlist/savePlaylist',
      condition: {
        values,
        success: () => {
          this.setState({
            record: null,
            visible: false
          });
        }
      },
      payload
    });
  }

  render() {
    const { playlist, loading, dispatch } = this.props;
    const { pageData } = playlist;
    const columns = createColumns(this, playlist);
    const { rows, record, visible } = this.state;

    const searchBarProps = {
      columns,
      onSearch: values => {
        pageData.filter(values).jumpPage(1, 10);
        this.handleSearch();
      }
    };

    let yHeight = 216;

    const dataTableProps = {
      size: 'large',
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: false,
      isScroll: true,
      scroll: { y: `calc(100vh - ${yHeight}px)` },
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        pageData.jumpPage(pageNum, pageSize);
        this.handleSearch();
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };

    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      modalOpts: {
        width: 700
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        });
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values, record) => {
        this.handleSave(values);
      }
    };

    return (
      <Layout className="full-layout playlist-page">
        <Header>
          <Toolbar
            appendLeft={
              <Button.Group>
                <Button type="primary" cdmsicon="add-o" onClick={this.onAdd}>
                  {window.language['common.add']}
                </Button>
                <Button
                  disabled={!rows.length}
                  onClick={e => this.onDelete(rows)}
                  cdmsicon="delete-o"
                >
                  {window.language['common.del']}
                </Button>
              </Button.Group>
            }
            pullDown={<SearchBar type="grid" {...searchBarProps} />}
          >
            <SearchBar group="abc" {...searchBarProps} />
          </Toolbar>
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    );
  }
}
