//连接数据库
//引入mongoose第三方模块
const mongoose = require('mongoose');
//导入config模块
const config = require('config');
//连接数据库
mongoose
	.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('数据库连接成功'))
	.catch(err => console.log(err, '数据库连接失败'));
