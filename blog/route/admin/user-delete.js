const { Users } = require('../../model/user');
module.exports = async (req, res) => {
	// res.send('ok');
	// res.send(req.query.id);

	//根据id删除用户

	await Users.findOneAndDelete({ _id: req.query.id });
	//将页面重定向到列表页面
	res.redirect('/admin/user');
};
