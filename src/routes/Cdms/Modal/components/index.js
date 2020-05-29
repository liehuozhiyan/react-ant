import React from 'react';
import { connect } from 'dva';
import { Layout, Modal } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Button from 'components/Button';
import Panel from 'components/Panel';
import './index.less';
import 'components/Modal/modal.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  info = (type) => {
    Modal.info({
      className: type ? 'custom-modal' : '',
      title: '这是一条通知信息',
      content: (
        <div>
          <p>一些附加信息一些附加信息一些附加信息</p>
          <p>一些附加信息一些附加信息一些附加信息</p>
        </div>
      ),
      onOk() {},
    });
  }
  
  success = (type) => {
    Modal.success({
      className: type ? 'custom-modal' : '',
      title: '这是一条通知信息',
      content: '一些附加信息一些附加信息一些附加信息',
    });
  }
  
  error = (type) => {
    Modal.error({
      className: type ? 'custom-modal' : '',
      title: '这是一条通知信息',
      content: '一些附加信息一些附加信息一些附加信息',
    });
  }
  
  warning = (type) => {
    Modal.warning({
      className: type ? 'custom-modal' : '',
      title: '这是一条警告信息',
      content: '一些附加信息一些附加信息一些附加信息',
    });
  }

  showConfirm = (type) => {
    Modal.confirm({
      className: type ? 'custom-modal' : '',
      title: window.language['playlist.tip'],
      okText: window.language['common.ok'],
      cancelText: window.language['common.cancel'],
      content: 'content1',
      onOk: () => {
      },
      onCancel() { }
    });
  }

  render() {
    return (
      <Layout className="full-layout page modal-page">
        <Content>
          <Panel title="Antd Modal">
            <Button.Group>
              <Button onClick={this.info}>信息提示</Button>
              <Button onClick={this.success}>成功提示</Button>
              <Button onClick={this.error}>失败提示</Button>
              <Button onClick={this.warning}>警告提示</Button>
              <Button onClick={this.showConfirm}>确认对话框</Button>
            </Button.Group>
            <br/>
            <br/>
            <pre>
              <code>
                <span className="token keyword"></span>
                import {"{Modal}"} from 'antd';<br/>
                Modal.info({"{"}<br/>
                  &nbsp;&nbsp;title: '这是一条通知信息',<br/>
                  &nbsp;&nbsp;content: ('一些附加信息一些附加信息一些附加信息'),<br/>
                  &nbsp;&nbsp;onOk() {"{}"},<br/>
                  &nbsp;&nbsp;onCancel() {"{}"},<br/>
                {"}"});<br/>
              </code>
            </pre>
          </Panel>
          <Panel title="Cdms Modal">
            <Button.Group>
              <Button onClick={() => { this.info('cdms') }}>信息提示</Button>
              <Button onClick={() => { this.success('cdms') }}>成功提示</Button>
              <Button onClick={() => { this.error('cdms') }}>失败提示</Button>
              <Button onClick={() => { this.warning('cdms') }}>警告提示</Button>
              <Button onClick={() => { this.showConfirm('cdms') }}>确认对话框</Button>
            </Button.Group>
            <br/>
            <br/>
            <pre>
              <code>
                <span className="token keyword"></span>
                import {"{Modal}"} from 'antd';<br/>
                <span className="token keyword">import 'components/Modal/modal.less';</span><br/>
                Modal.info({"{"}<br/>
                  &nbsp;&nbsp;<span className="token keyword">className: 'custom-modal',</span><br/>
                  &nbsp;&nbsp;title: '这是一条通知信息',<br/>
                  &nbsp;&nbsp;content: ('一些附加信息一些附加信息一些附加信息'),<br/>
                  &nbsp;&nbsp;onOk() {"{}"},<br/>
                  &nbsp;&nbsp;onCancel() {"{}"},<br/>
                {"}"});<br/>
              </code>
            </pre>
          </Panel>
          <Panel title="注意">
            <br/>
            <pre>
              <code>
                1. 无特殊情况请用Cdms Modal <br/>
                2. 传送门<a href="https://ant.design/components/modal-cn/" target="_blank">ant modal</a> <br/>
              </code>
            </pre>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
