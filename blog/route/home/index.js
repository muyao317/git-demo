const { Article } = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
	//接收客户端传递过来的页码
	const page = req.query.page;
	// let result = await Article.find().populate('author');
	let result = await pagination(Article).page(page).size(4).display(5).find({}).populate('author').exec();
	// res.send(result);
	result = JSON.stringify(result); //将JavaScript 对象转换为 JSON 字符串
	result = JSON.parse(result); //将字符串还原成对象

	// res.send('欢迎来到博客首页');
	//渲染模板并传递数据
	res.render('home/default.art', {
		result: result
	});
};
