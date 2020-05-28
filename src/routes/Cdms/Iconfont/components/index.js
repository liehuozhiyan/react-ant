import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page iconfont-page">
        <Content>
          <iframe src="iconfont/demo.html" frameBorder="0" style={{width: '100%', height: '100%', }} />
        </Content>
      </Layout>
    );
  }
}
