// 注意：国际化语言命名规范!!!
// 具体到二级菜单，语言头按照模块起名，即 1级.2级.3级.....，不同模块之间不能重名
// 列如 ： 系统设置模块 的头为 system , 那么此模块里面的系统设置模块则为: system.sysConfig , 系统设置模块的分辨率列表则为：system.sysConfig.senseList
//         素材模块的头为 material ,那么此模块下的图片管理则为: material.pic ,那么图片管理模块的图片列表则为: material.pic.picList
//         依次类推......(此案例仅供参考)
// 新增，编辑，删除等采用公共定义语言，不同模块之间有3次及3次以上引用的需放在公共模块
//

var zh_CN = {
	//返回码-公共返回码
	'responseCode.200': '请求成功',
	'responseCode.400': '请求参数错误',
	'responseCode.404': '请求资源不存在',
	'responseCode.500': '系统繁忙，请稍候再试',

	/**
	 * 统一返回码：Code错误码区间[1000开头，共7位]
	 */
	'responseCode.1000000': '请求成功',
  'responseCode.1000001': '请求参数错误',
  'responseCode.1000002': '请求资源不存在',
  'responseCode.1000003': '系统繁忙，请稍候再试',
	'responseCode.1000004': '操作数据库失败',
				
	/**
	 * 系统返回码：Code错误码区间[1001开头，共7位]
	 */
	'responseCode.1001000': '登录凭证已过期，请重新登录',
  'responseCode.1001001': '登录凭证认证失败，请重新登录',
  'responseCode.1001002': '该账号异常，请联系管理员',
  'responseCode.1001003': '该用户已被锁定，请联系管理员',
	'responseCode.1001004': '授权信息已过期，请刷新token',
  'responseCode.1001006': '该用户不存在,请先注册',
  'responseCode.1001007': '该用户已被锁定，请联系管理员',
	'responseCode.1001008': '用户名或密码错误',
  'responseCode.1001009': '无访问权限',
  'responseCode.1001010': '登录凭证不能为空，请重新登录'
};
