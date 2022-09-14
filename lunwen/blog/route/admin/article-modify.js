//引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');

//将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
	//接收客户端传递过来的请求参数
	const body = req.body;
	// const { title, author, publishDate, cover, content } = req.body;
	//即将要修改的用户id
	const id = req.query.id;

	let user = await Article.findOne({ _id: id });
	body.author = user.author;
	// res.send('成功');
	//1.创建表单解析对象
	const form = new formidable.IncomingForm();
	//2 配置上传文件的存放位置
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
	//3.保留上传文件的后缀
	form.keepExtensions = true;
	//4.解析表单
	form.parse(req, async (err, fields, files) => {
		//1. err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err 将会是null
		//2. fields 对象类型 保存普通表单数据
		//3.files 对象类型 保存了和上传文件相关的数据
		// res.send(files.cover.path.split('public')[1]);
		//将用户信息更新到数据库中
		await Article.updateOne(
			{ _id: id },
			{
				title: fields.title,
				author: fields.author,
				publishDate: fields.publishDate,
				cover: files.cover.path.split('public')[1],
				content: fields.content
			}
		);
		//将页面重定向到列表文章页面
		res.redirect('/admin/article');
	});
};
