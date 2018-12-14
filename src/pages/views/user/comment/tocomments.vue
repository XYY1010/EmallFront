<template>
    <div class="from-comments-div">
      <div class="inner-box">
        <Table border :columns="columns" :data="historyData" :loading="loading" size="large" no-data-text="暂无评价信息，赶快去评价吧~"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
      </div>
    </div>
</template>

<script>
export default {
  name: 'fromcomments',
  data() {
    return {
      ajaxHistoryData:[],
      // 初始化信息总条数
      dataCount:0,
      // 每页显示多少条
      pageSize:10,
      historyData: [],
      loading: false,
      tableData:[{
    			icon:"http://139.199.125.60/goodcomment.png",
    			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。🌹",
    			date:"2018-10-02 19:39:10",
    			seller:"momo沫沫银饰",
    			sellerIcon:"/",
    			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
          goodsUrl: "/goodsdetail",
    			goodsPrize:"164.0"
    		},
    		{
    			icon:"http://139.199.125.60/middlecomment.png",
    			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💗",
    			date:"2018-10-02 19:39:10",
    			seller:"momo沫沫银饰",
    			sellerIcon:"/",
    			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
          goodsUrl: "/goodsdetail",
    			goodsPrize:"164.0"
    		},
    		{
    			icon:"http://139.199.125.60/middlecomment.png",
    			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💗",
    			date:"2018-10-02 19:39:10",
    			seller:"momo沫沫银饰",
    			sellerIcon:"/",
    			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
          goodsUrl: "/goodsdetail",
    			goodsPrize:"164.0"
    		},
    		{
    			icon: "http://139.199.125.60/badcomment.png",
    			comment: "感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💔",
    			date: "2018-10-02 19:39:10",
    			seller: "momo沫沫银饰",
    			sellerIcon: "/",
    			goodsDetail: "男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
          goodsUrl: "/goodsdetail",
    			goodsPrize:"164.0"
    		},
        {
      			icon:"http://139.199.125.60/goodcomment.png",
      			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。🌹",
      			date:"2018-10-02 19:39:10",
      			seller:"momo沫沫银饰",
      			sellerIcon:"/",
      			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
            goodsUrl: "/goodsdetail",
      			goodsPrize:"164.0"
      		},
      		{
      			icon:"http://139.199.125.60/middlecomment.png",
      			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💗",
      			date:"2018-10-02 19:39:10",
      			seller:"momo沫沫银饰",
      			sellerIcon:"/",
      			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
            goodsUrl: "/goodsdetail",
      			goodsPrize:"164.0"
      		},
      		{
      			icon:"http://139.199.125.60/middlecomment.png",
      			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💗",
      			date:"2018-10-02 19:39:10",
      			seller:"momo沫沫银饰",
      			sellerIcon:"/",
      			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
            goodsUrl: "/goodsdetail",
      			goodsPrize:"164.0"
      		},
      		{
      			icon: "http://139.199.125.60/badcomment.png",
      			comment: "感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💔",
      			date: "2018-10-02 19:39:10",
      			seller: "momo沫沫银饰",
      			sellerIcon: "/",
      			goodsDetail: "男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
            goodsUrl: "/goodsdetail",
      			goodsPrize:"164.0"
      		},
          {
        			icon:"http://139.199.125.60/goodcomment.png",
        			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。🌹",
        			date:"2018-10-02 19:39:10",
        			seller:"momo沫沫银饰",
        			sellerIcon:"/",
        			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
              goodsUrl: "/goodsdetail",
        			goodsPrize:"164.0"
        		},
        		{
        			icon:"http://139.199.125.60/middlecomment.png",
        			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💗",
        			date:"2018-10-02 19:39:10",
        			seller:"momo沫沫银饰",
        			sellerIcon:"/",
        			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
              goodsUrl: "/goodsdetail",
        			goodsPrize:"164.0"
        		},
        		{
        			icon:"http://139.199.125.60/middlecomment.png",
        			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💗",
        			date:"2018-10-02 19:39:10",
        			seller:"momo沫沫银饰",
        			sellerIcon:"/",
        			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
              goodsUrl: "/goodsdetail",
        			goodsPrize:"164.0"
        		},
        		{
        			icon: "http://139.199.125.60/badcomment.png",
        			comment: "感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💔",
        			date: "2018-10-02 19:39:10",
        			seller: "momo沫沫银饰",
        			sellerIcon: "/",
        			goodsDetail: "男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
              goodsUrl: "/goodsdetail",
        			goodsPrize:"164.0"
        		},
            {
          			icon:"http://139.199.125.60/goodcomment.png",
          			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。🌹",
          			date:"2018-10-02 19:39:10",
          			seller:"momo沫沫银饰",
          			sellerIcon:"/",
          			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
                goodsUrl: "/goodsdetail",
          			goodsPrize:"164.0"
          		},
          		{
          			icon:"http://139.199.125.60/middlecomment.png",
          			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💗",
          			date:"2018-10-02 19:39:10",
          			seller:"momo沫沫银饰",
          			sellerIcon:"/",
          			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
                goodsUrl: "/goodsdetail",
          			goodsPrize:"164.0"
          		},
          		{
          			icon:"http://139.199.125.60/middlecomment.png",
          			comment:"感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💗",
          			date:"2018-10-02 19:39:10",
          			seller:"momo沫沫银饰",
          			sellerIcon:"/",
          			goodsDetail:"男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
                goodsUrl: "/goodsdetail",
          			goodsPrize:"164.0"
          		},
          		{
          			icon: "http://139.199.125.60/badcomment.png",
          			comment: "感谢亲的光临，亲的满意，就是我们最大的欣慰。最大的回报。小店会更加努力做好。💔",
          			date: "2018-10-02 19:39:10",
          			seller: "momo沫沫银饰",
          			sellerIcon: "/",
          			goodsDetail: "男士BB霜自然色遮瑕裸妆控油男士化妆品套装男初学者...",
                goodsUrl: "/goodsdetail",
          			goodsPrize:"164.0"
          		}
    	],
      columns: [
        {
          title: '评价类型',
          key: 'icon',
          width: 110,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.icon,
                  style: "width: 20px; height: 20px;"
                }
              })
            ])
          },
          align: 'center',
          filters: [
            {
              label: '好评',
              value: 1
            },
            {
              label: '中评',
              value: 2
            },
            {
              label: '差评',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.icon.substring(22, row.icon.length) === "goodcomment.png";
            } else if (value === 2) {
              return row.icon.substring(22, row.icon.length) === "middlecomment.png";
            } else if (value === 3) {
              return row.icon.substring(22, row.icon.length) === "badcomment.png";
            }
          }
        },
        {
          title: '评价内容',
          key: 'comment',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h('p', {
                attrs: {
                  style: "margin: 10px 0px;"
                }
              }, params.row.comment),
              h('p', {
                attrs:{
                  style:"font-size: 12px; color: #666;"
                }
              }, '[' + params.row.date + ']')
            ])
          },
          align: 'left',
          filters: [
            {
              label: '有评论内容',
              value: 1
            },
            {
              label: '无评论内容',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.comment !== "";
            } else if (value === 2) {
              return row.comment === "";
            }
          }
        },
        {
          title: '评论人',
          key: 'seller',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('p', {

              }, params.row.seller),
              h('img', {
                attrs: {
                  src: params.row.sellerIcon
                }
              })
            ])
          },
          align: 'center'
        },
        {
          title: '宝贝信息',
          key: 'goodsDetail',
          width: 220,
          render: (h, params) => {
            return h('div', [
              h('a', {
                attrs: {
                  href: params.row.goodsUrl
                }
              }, params.row.goodsDetail),
              h('p', {
                attrs: {
                  style:"font-size: 12px; color: #FF0000;"
                }
              }, params.row.goodsPrize + '元')
            ])
          },
          align: 'left'
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    // 获取历史记录信息
    handleListApproveHistory(){
      // 保存取到的所有数据
      this.ajaxHistoryData = this.tableData
      this.dataCount = this.tableData.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if(this.tableData.length < this.pageSize){
        this.historyData = this.ajaxHistoryData;
      }else{
        this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
      }
    },
    changepage(index){
      var _start = ( index - 1 ) * this.pageSize;
      var _end = index * this.pageSize;
      this.historyData = this.ajaxHistoryData.slice(_start,_end);
    }
  },
  created(){
    this.handleListApproveHistory();
  }
}
</script>

<style scoped>
.from-comments-div {
  border: 1px solid #eeeeee;
  margin: 20px 50px;
}
.inner-box {
  margin: 30px 50px;
}
.paging{
  margin:10px 0px;
  text-align: right;
}
</style>
