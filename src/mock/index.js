import Mock from 'mockjs';

// mock数据，测试时默认开启时
let data = [].concat();

data.forEach((res) => {
  Mock.mock(res.path, res.type, res.data);
})
