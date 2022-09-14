//将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
	//接收客户端传递过来的页码
	const page = req.query.page;
	// 标识 标识当前访问的是文章管理页面
	req.app.locals.currentLink = 'article';
	//page 指定当前页
	//size 指定每页显示的数据条数
	//display 指定客户端要显示的页码数量
	//exec向数据库中发送查询请求
	//查询所有文章数据
	// 可以在查询链上使用lean()。告诉mongoose返回普通对象 不返回mongoose文档对象
	// lean属性的作用：转换mongoose查询结果类型，从MongooseDocuments转换为JS Object，从而便于我们修改查询结果。

	let articles = await pagination(Article).page(page).size(6).display(3).find({}).populate('author').exec();
	// res.send(articles);
	//渲染文章列表页面模板
	//将查询到的数据转化
	articles = JSON.stringify(articles); //将JavaScript 对象转换为 JSON 字符串
	articles = JSON.parse(articles); //将字符串还原成对象
	res.render('admin/article.art', {
		articles: articles
	});
};
