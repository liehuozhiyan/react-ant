import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AntdIcon from 'antd/lib/icon';

/**
 * 字体图标，兼容antd的图标
 */
class Icon extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    font: PropTypes.string,
    antd: PropTypes.bool,
    spin: PropTypes.bool
  };

  static defaultProps = {
    prefixCls: 'iconfont',
    className: '',
    font: '',
    antdprefixCls: 'antui-icon',
    antdclassName: '',
    antdfont: 'ad'
  };

  render() {
    const {
      prefixCls,
      className,
      font,
      antdprefixCls,
      antdclassName,
      antdfont,
      type,
      children,
      antd,
      spin,
      ...props
    } = this.props;
    let cn = classnames(
      prefixCls,
      {
        [font]: font,
        [font + '-' + type]: font && type,
        spin
      },
      'icon-' + className
    );
    // 有className 或无 antd 为自定义
    // 无className 或有 antd 为默认
    if (!className) {
      cn = classnames(
        antdprefixCls,
        {
          [antdfont]: antdfont,
          [antdfont + '-' + type]: antdfont && type,
          spin
        },
        'icon-' + antdclassName
      );
    }
    return (
      <i className={cn} {...props}>
        {children}
      </i>
    );
  }
}

export default Icon;
