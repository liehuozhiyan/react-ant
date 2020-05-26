import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Layout, Button, Icon, Input, Checkbox, Spin } from 'antd';
import logoImg from 'assets/images/logo1.png';
import './index.less';
const { Content } = Layout;
const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login
}))
class Login extends Component {
  handleSubmit = e => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        let password = form.getFieldValue('password');
        let forge = require('node-forge');
        //md5加密
        let md = forge.md.md5.create();
        md.update(password);
        let md5Password = md.digest().toHex();
        let param = values;
        param.password = md5Password;
        dispatch({
            type: 'login/login',
            payload: values,
            success: (code, msg) => {
            }
        });
      }
    });
  };
  
  //校验验证码
  checkVerificationCode = (code) => {
    let verificationCodeArray = localStorage.getItem('verificationCode').split(",");
    let verificationCode = '';
    let flag = false;
    for (let i = 0; i < verificationCodeArray.length; i++) {
        verificationCode += String.fromCharCode(parseInt(verificationCodeArray[i]) > 57 && parseInt(verificationCodeArray[i]) < 84 ? parseInt(verificationCodeArray[i]) + 7 : (parseInt(verificationCodeArray[i]) < 57 ? parseInt(verificationCodeArray[i]) : parseInt(verificationCodeArray[i]) + 13));
    }
    if (code.toUpperCase() === verificationCode.toUpperCase()) {
        flag = true;
    }
    return flag;
  }
  render() {
    const { loading, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Layout className="full-layout login-page">
        <Content>
          <Spin tip="登录中..." spinning={!!loading}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="user-img">
                <img src={logoImg} alt="logo" />
                <b>LANIF</b>
                <span>Admin</span>
              </div>
              <FormItem>
                {getFieldDecorator('username', {
                  initialValue: 'sa',
                  rules: [{ required: true, message: '请输入您的用户名，示例admin' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" />}
                    placeholder="用户名"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  initialValue: '123456',
                  rules: [{ required: true, message: '请输入您的密码，示例admin' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="密码"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>记住我</Checkbox>)}
                <Link className="login-form-forgot" to="#">
                  忘记密码
                </Link>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                <div className="new-user">
                  新用户？<Link to="/sign/register">现在注册</Link>
                </div>
              </FormItem>
            </Form>
          </Spin>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Login);
