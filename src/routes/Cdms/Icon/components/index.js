import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Icon from 'components/Icon';
import Panel from 'components/Panel';
import './index.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page icon-page">
        <Content>
          <Panel title="AntD Icon">
            <Icon type="lines" />
            <Icon type="ruby" style={{fontSize: 20, color: 'red'}} />
            <Icon type="wand" style={{fontSize: 30, color: 'blue'}} />
            <br/>
            <br/>
            <pre>
              <code>
                import Icon from 'components/Icon';<br/>
                &lt;Icon <span className="token keyword">type</span>="lines" /&gt;<br/>
                &lt;Icon <span className="token keyword">type</span>="ruby" /&gt;<br/>
              </code>
            </pre>
          </Panel>
          <Panel title="Cdms Icon">
            <Icon className="add-o" />
            <Icon className="delete-o" style={{fontSize: 20, color: 'red'}} />
            <Icon className="edit-o" style={{fontSize: 30, color: 'blue'}} />
            <br/>
            <br/>
            <pre>
              <code>
                import Icon from 'components/Icon';<br/>
                &lt;Icon <span className="token keyword">className</span>="add-o" /&gt;<br/>
              </code>
            </pre>
          </Panel>
          <Panel title="注意">
            <br/>
            <pre>
              <code>
                1. 无特殊情况请用Cdms Icon <br/>
                2. AntD Icon 为 type，Cdms Icon 为 className <br/>
                3. 需要引入import Icon from 'components/Icon';
              </code>
            </pre>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
