const router = require('koa-router')(),
  controller = require('../controller/course.js'),
  courseData = require('../data/course'),
  courseFieldData = require('../data/course_field'),
  swiperData = require('../data/swiper'),
  recomCourseData = require('../data/recom_course');

const { default: axios } = require('axios');
const XiaomiSwiperData = require("../data/xiaomidata/swiper_data"),
  XiaomiPhoneData = require("../data/xiaomidata/phone_data"),
  XiaomiFieldData = require("../data/xiaomidata/field_data"),
  XiaomiMihomeData = require("../data/xiaomidata/mihome_data"),
  XiaomiMihomeData1 = require("../data/xiaomidata/mihome_data1");

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    message: 'by bibilili jsplusplus api'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/get_courses/:field', (ctx, next) => {
  const field = ctx.params.field || 'all',
    cb = ctx.query.callback || 'callback';

  const retData = {};

  retData.ret_code = 0;
  retData.result = courseData.filter((item) => {

    if (field === 'all') {
      return true;
    }

    return item.field === field;
  });

  ctx.body = `${cb}(${JSON.stringify(retData)})`;

});


router.get('/get_swipers', (ctx, next) => {
  const cb = ctx.query.callback || 'callback';

  const retData = {};

  retData.ret_code = 0;
  retData.result = swiperData;

  ctx.body = `${cb}(${JSON.stringify(retData)})`;

});



router.get('/get_course_fields', (ctx, next) => {

  const cb = ctx.query.callback || 'callback';

  const retData = JSON.stringify({
    ret_code: 0,
    result: courseFieldData
  });

  ctx.body = `${cb}(${retData})`;

});

router.get('/get_course_datas', (ctx, next) => {
  const cb = ctx.query.callback || 'callback';
  console.log(cb);
  const retData = {
    ret_code: 0,
    result: {
      swipers: swiperData,
      fields: courseFieldData,
      courses: courseData,
      recomCourses: recomCourseData
    }
  };

  ctx.body = `${cb}(${JSON.stringify(retData)})`;
});

//课程所有分类列表(读自数据库)
//router.get('/course/get_course_fields', controller.getFieldCourse)

//课程分类列表数据
//router.get('/course/get_courses/all', controller.getFieldCourseList)
//swiper=${options.swiper}&phone=${options.phone}&field=${options.field}


//小米手机商城的JSONP接口，获取所有数据：
//http://localhost:3001/getDatas?swiper=true&phone=true&field=true&cb=jQuery17206151534095129494_1670159423610&_=1670159423658
router.get('/getDatas', async (ctx, next) => {
  //const cb = ctx.query.callback || 'callback';
  const cb = ctx.request.query.cb;
  const retData = {};

  //ctx.request.query.phone&&ctx.request.query.phone=="true" && (retData.phone_data = XiaomiPhoneData);

  if (ctx.request.query.phone && ctx.request.query.phone == "true") retData.phone_data = XiaomiPhoneData;
  if (ctx.request.query.field && ctx.request.query.field == "true") retData.field_data = XiaomiFieldData;
  if (ctx.request.query.swiper && ctx.request.query.swiper == "true") retData.swiper_data = XiaomiSwiperData;
  if (ctx.request.query.mihome && ctx.request.query.mihome == "true") retData.mihome_data = XiaomiMihomeData;
  if (ctx.request.query.mihome_data && ctx.request.query.mihome_data == "true") retData.mihome_data1 = XiaomiMihomeData1;

  //ctx.body = retData;
  ctx.body = `${cb}(${JSON.stringify(retData)})`;
})

//小米手机商城的JSONP接口，获取某台id的手机详细信息：
//http://localhost:3001/getPhoneInfo?pid=1&cb=jQuery17206151534095129494_1670159423610&_=1670159423658
router.get('/getPhoneInfo', async (ctx, next) => {
  //const cb = ctx.query.callback || 'callback';
  const cb = ctx.request.query.cb;
  const id = ctx.request.query.id;
  let retData = {};

  retData = XiaomiPhoneData.filter((element)=>{
    return element.id == id;
  })

  console.log(retData[0]);

  ctx.body = `${cb}(${JSON.stringify(retData[0])})`;
})
// 获取地址
router.get('/address', async (ctx, next) => {
  const cb = ctx.request.query.cb;
  const { data } = await axios.get('https://s1.mi.com/open/common/js/address_all_new.js')
  ctx.body = `${cb}(${data.split('=')[1]})`;
})

// 根据地址获取数据
router.get('/store_list', async (ctx, next) => {
  const cb = ctx.request.query.cb;
  const { data } = await axios({
    url: 'https://api2.service.order.mi.com/store/store_list',
    headers: {
      Origin:"https://www.mi.com",
      Referer: "https://www.mi.com/"
    },
    params: ctx.request.query
  })
  ctx.body = `${cb}(${JSON.stringify(data.data)})`;
})

module.exports = router
