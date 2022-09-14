//将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
module.exports = async (req, res) => {
	// res.send('ok');
	// res.send(req.query.id);

	//根据id删除用户

	await Article.findOneAndDelete({ _id: req.query.id });
	//将页面重定向到列表页面
	res.redirect('/admin/article');
};
