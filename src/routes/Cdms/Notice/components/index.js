import React from 'react';
import { connect } from 'dva';
import { Layout, message } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Panel from 'components/Panel';
import { normal, antdNotice } from 'components/Notification';
import config from '@/config';
const notice = config.notice;
import './index.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page notice-page">
        <Content>
          <Panel title="Normal notice">
            <Button.Group>
              <Button onClick={_ => normal.success('I‘m Hero')}>成功</Button> 
              <Button onClick={_ => normal.error('I‘m Hero')}>失败</Button> 
              <Button onClick={_ => normal.warning('I‘m Hero')}>注意</Button> 
              <Button onClick={_ => normal.info('I‘m Hero')}>通知</Button> 
              <br/>
              <pre>
                <code>
                  <span className="token keyword"></span>
                  import {"{normal}"} from 'components/Notification';<br/>
                  <span className="token keyword">normal</span>.success('I‘m Hero') <br/>
                  <span className="token keyword">normal</span>.error('I‘m Hero') <br/> 
                  <span className="token keyword">normal</span>.warning('I‘m Hero') <br/> 
                  <span className="token keyword">normal</span>.info('I‘m Hero') <br/> 
                </code>
              </pre>
            </Button.Group>
          </Panel>
          <Panel title="Antd notice">
            <Button.Group>
              <Button onClick={_ => antdNotice.success('I‘m Hero')}>成功</Button> 
              <Button onClick={_ => antdNotice.error('I‘m Hero')}>失败</Button> 
              <Button onClick={_ => antdNotice.warning('I‘m Hero')}>注意</Button> 
              <Button onClick={_ => antdNotice.info('I‘m Hero')}>通知</Button> 
            </Button.Group>
            <br/>
            <pre>
              <code>
                <span className="token keyword"></span>
                import {"{antdNotice}"} from 'components/Notification';<br/>
                <span className="token keyword">antdNotice</span>.success('I‘m Hero') <br/>
                <span className="token keyword">antdNotice</span>.error('I‘m Hero') <br/> 
                <span className="token keyword">antdNotice</span>.warning('I‘m Hero') <br/> 
                <span className="token keyword">antdNotice</span>.info('I‘m Hero') <br/> 
              </code>
            </pre>
          </Panel>
          <Panel title="Antd message">
            <Button.Group>
              <Button onClick={_ => message.success('I‘m Hero')}>成功</Button> 
              <Button onClick={_ => message.error('I‘m Hero')}>失败</Button> 
              <Button onClick={_ => message.warning('I‘m Hero')}>注意</Button> 
              <Button onClick={_ => message.info('I‘m Hero')}>通知</Button> 
            </Button.Group>
            <br/>
            <pre>
              <code>
                <span className="token keyword"></span>
                import {"{message}"} from 'antd';<br/>
                <span className="token keyword">message</span>.success('I‘m Hero') <br/>
                <span className="token keyword">message</span>.error('I‘m Hero') <br/> 
                <span className="token keyword">message</span>.warning('I‘m Hero') <br/> 
                <span className="token keyword">message</span>.info('I‘m Hero') <br/> 
              </code>
            </pre>
          </Panel>
          <Panel title="Cdms notice">
            <Button.Group>
              <Button onClick={_ => notice.success('I‘m Hero')}>成功</Button> 
              <Button onClick={_ => notice.error('I‘m Hero')}>失败</Button> 
              <Button onClick={_ => notice.warning('I‘m Hero')}>注意</Button> 
              <Button onClick={_ => notice.info('I‘m Hero')}>通知</Button> 
            </Button.Group>
            <br/>
            <pre>
              <code>
                <span className="token keyword"></span>
                <span className="token keyword">notice</span>.success('I‘m Hero') <br/>
                <span className="token keyword">notice</span>.error('I‘m Hero') <br/> 
                <span className="token keyword">notice</span>.warning('I‘m Hero') <br/> 
                <span className="token keyword">notice</span>.info('I‘m Hero') <br/> 
              </code>
            </pre>
          </Panel>
          <Panel title="注意">
            <br/>
            <pre>
              <code>
                1. 无特殊情况请用Cdms notice <br/>
              </code>
            </pre>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
