import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import './style/index.less';

const ButtonGroup = Button.Group;
/**
 *  Button
 */
export default class extends React.Component {
  static Group = ButtonGroup;

  static propTypes = {
    /**
     * 是否用Tooltip组件显示提示信息
     */
    tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
  };

  static defaultProps = {
    prefixCls: 'antui-button-tooltip',
    cdmsPrefixCls: 'iconfont icon-'
  };

  render() {
    const { 
      tooltip, 
      prefixCls, 
      cdmsPrefixCls,//cdms系统定制按钮样式
      cdmsicon,
      ...otherProps 
    } = this.props;

    let custombutton = cdmsicon ? (
      <Button {...otherProps}>
        <i className={cdmsPrefixCls + cdmsicon}></i>
        <span>{this.props.children}</span>
      </Button>
    ) : (
      <Button {...otherProps}/>
    );
        
    
    return tooltip ? (
      <Tooltip overlayClassName={prefixCls} title={tooltip === true ? otherProps.title : tooltip}>
        {custombutton}
      </Tooltip>
    ) : (
      <React.Fragment>
        {custombutton}
      </React.Fragment>
    );

    // return tooltip ? (
    //   <Tooltip overlayClassName={prefixCls} title={tooltip === true ? otherProps.title : tooltip}>
    //     <Button {...otherProps} />
    //   </Tooltip>
    // ) : (
    //   <Button {...otherProps} />
    // );
  }
}
