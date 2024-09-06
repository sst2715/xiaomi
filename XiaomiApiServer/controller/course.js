const courseModel = require("../lib/mysql.js");


const fdata = async (data) => {

  const promises = data.map(async item => {
    const listItem = await courseModel.get_field_course_list(item.fieldType).then(res => res.length);
    return listItem;

  });

  const listItems = await Promise.all(promises);
  // console.log('promises', promises);
  // console.log('result listItems', listItems);
  const res = data.map((item, index) => ({
    ...item,
    totalCount: listItems[index]
  }));

  return res;
}

// 查询分类:
exports.getFieldCourse = async ctx => {

  await courseModel
    .get_field_course()
    .then(async result => {
      ctx.body = {
        code: 0,
        message: "成功",
        result: await fdata(result)
        // result:result
      };
    })
    .catch(() => {
      ctx.body = {
        code: 1,
        message: "失败"
      };
    });
}


// 查询分类对应的列表数据:

exports.getFieldCourseList = async ctx => {
  let { field = -1 } = ctx.query;
  // sleep.sleep(1);
  await courseModel
    .get_field_course_list(field)
    .then(result => {
      ctx.body = {
        code: 0,
        message: "成功",
        result: result
      };
    })
    .catch(() => {
      ctx.body = {
        code: 1,
        message: "失败"
      };
    });
}
