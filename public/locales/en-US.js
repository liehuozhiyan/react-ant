// 英语
var en_US = {
		//返回码-公共返回码
	'responseCode.200': 'Request success',
	'responseCode.400': 'Request parameter error',
	'responseCode.404': 'Request resource does not exist',
	'responseCode.500': 'The system is busy, please try again later',
	
		/**
		 * 统一返回码：Code错误码区间[1000开头，共7位]
		 */
		'responseCode.1000000': 'Request succeeded',
	  'responseCode.1000001': 'Request parameter error',
	  'responseCode.1000002': 'The requested resource does not exist',
	  'responseCode.1000003': 'System is busy, please try again later',
		'responseCode.1000004': 'Failed to operate database',
					
		/**
		 * 系统返回码：Code错误码区间[1001开头，共7位]
		 */
		'responseCode.1001000': 'Login credentials have expired, please log in again',
	  'responseCode.1001001': 'Login credential authentication failed, please log in again',
	  'responseCode.1001002': 'The account is abnormal, please contact the administrator',
	  'responseCode.1001003': 'The user has been locked, please contact the administrator',
		'responseCode.1001004': 'The authorization information has expired, please refresh the token',
	  'responseCode.1001006': 'This user does not exist, please register first',
	  'responseCode.1001007': 'This user has been locked, please contact the administrator',
		'responseCode.1001008': 'Wrong username or password',
	  'responseCode.1001009': 'No access rights',
	  'responseCode.1001010': 'Login credentials cannot be empty, please log in again'
};
