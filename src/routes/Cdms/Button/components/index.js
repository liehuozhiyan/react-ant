import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Button from 'components/Button';
import Panel from 'components/Panel';
import './index.less';
const { Content } = Layout;
const Ripple = Button.Ripple;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page cdms-button-page">
        <Content>
          <Panel title="AntD Button">
            <Button icon="plus" type="primary">Primary</Button>
            <Button icon="plus" tooltip="Tip!">Default</Button>
            <Button icon="plus" type="dashed">Dashed</Button>
            <Button icon="plus" type="danger">Danger</Button>
            <Button icon="plus">Default</Button>
            <br/>
            <br/>
            <pre>
              <code>
                import Button from 'components/Button';<br/>
                &lt;Button <span className="token keyword">icon</span>="plus" type="primary"&gt;Primary&lt;/Button&gt;<br/>
                &lt;Button <span className="token keyword">icon</span>="plus" tooltip="Tip!"&gt;Default&lt;/Button&gt;<br/>
                &lt;Button <span className="token keyword">icon</span>="plus" type="dashed"&gt;Dashed&lt;/Button&gt;<br/>
                &lt;Button <span className="token keyword">icon</span>="plus" type="danger"&gt;Danger&lt;/Button&gt;<br/>
                &lt;Button <span className="token keyword">icon</span>="plus"&gt;Default&lt;/Button&gt;<br/>
              </code>
            </pre>
          </Panel>
          <Panel title="Cdms Button">
            <Button cdmsicon="add-o" type="primary">Primary</Button>
            <Button cdmsicon="add-o" tooltip="Tip!">Default</Button>
            <Button cdmsicon="add-o" type="dashed">Dashed</Button>
            <Button cdmsicon="add-o" type="danger">Danger</Button>
            <Button cdmsicon="add-o">Default</Button>
            <br/>
            <br/>
            <pre>
              <code>
                import Button from 'components/Button';<br/>
                &lt;Button <span className="token keyword">cdmsicon</span>="add-o" type="primary"&gt;Primary&lt;/Button&gt;<br/>
                &lt;Button <span className="token keyword">cdmsicon</span>="add-o" tooltip="Tip!"&gt;Default&lt;/Button&gt;<br/>
                &lt;Button <span className="token keyword">cdmsicon</span>="add-o" type="dashed"&gt;Dashed&lt;/Button&gt;<br/>
                &lt;Button <span className="token keyword">cdmsicon</span>="add-o" type="danger"&gt;Danger&lt;/Button&gt;<br/>
                &lt;Button <span className="token keyword">cdmsicon</span>="add-o"&gt;Default&lt;/Button&gt;<br/>
              </code>
            </pre>
          </Panel>
          <Panel title="注意">
            <br/>
            <pre>
              <code>
                1. 无特殊情况请用Cdms Button <br/>
                2. AntD Button 为 icon，Cdms Button 为 cdmsicon <br/>
                3. 需要引入import Button from 'components/Button';<br/>
                4. 传送门<a href="https://ant.design/components/button-cn/" target="_blank">ant button</a> <br/>
              </code>
            </pre>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
