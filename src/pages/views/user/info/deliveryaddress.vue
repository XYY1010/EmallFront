<template>
    <div class="delivery-address-div">
      <p class="p-title">收货地址</p>
      <div class="inner-box">
        <p class="inner-p-title">新增收货地址</p>
        <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
          <FormItem label="地址信息：" prop="addressInfo">
            <Cascader :data="address" v-model="formItem.addressInfo" style="width:400px;" placeholder="请选择省/市/区"></Cascader>
          </FormItem>
          <FormItem label="详细地址：" prop="addressDetail">
            <Input v-model="formItem.addressDetail" style="width: 400px;" type="textarea" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息" :rows="3"/>
          </FormItem>
          <FormItem label="邮政编码：">
            <Input v-model="formItem.postcode" style="width: 400px;" placeholder="请填写邮政编码 默认为：000000"/>
          </FormItem>
          <FormItem label="收货人姓名：" prop="receiverName">
            <Input v-model="formItem.receiverName" style="width: 400px;" placeholder="长度不超过25个字符"/>
          </FormItem>
          <FormItem label="手机号码：" prop="phone">
            <Input v-model="formItem.phone" style="width: 400px;" placeholder="手机号必须填"/>
          </FormItem>
          <FormItem>
            <Button type="warning" @click="handleSubmit('formItem')">保存</Button>
          </FormItem>
        </Form>

        <Alert show-icon>已保存了 {{addressTable.length}} 条地址，还能保存 {{11-addressTable.length}} 条地址</Alert>

        <Table border :columns="columns" :data="addressTable" :loading="loading" no-data-text="暂无收货地址 请尽快添加~"></Table>

        <Modal
            v-model="modalStatus"
            title="提示"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>确定将该地址移除吗？</p>
        </Modal>
      </div>
    </div>
</template>

<script>
import addressData from '../../../../db/generateAddressData';
const {address} = addressData;
export default {
  name: 'deliveryaddress',
  data() {
    return {
      address,
      loading: false,
      modalStatus: false,
      rmIndex: -1,
      userInfo: {},
      formItem: {
        addressInfo: [],
        addressDetail: '',
        postcode: '',
        receiverName: '',
        phone: ''
      },
      ruleValidate: {
        addressInfo: [
          { type:'array', required: true, message: "请填写地址信息", trigger: 'change' }
        ],
        addressDetail: [
          { required: true, message: "请填写地址详情", trigger: 'blur' }
        ],
        receiverName: [
          { required: true, message: "请填写收货人姓名", trigger: 'blur' },
          { validator: this.checkReceiverName }
        ],
        phone: [
          { required: true, message: "请填写手机号", trigger: 'blur' },
          { validator: this.checkPhone }
        ]
      },
      columns: [
        {
          title: '地址ID',
          key: 'addressId',
          width: 105,
          align: 'center'
        },
        {
          title: '收货人',
          key: 'receiverName',
          width: 75,
          align: 'center'
        },
        {
          title: '所在地区',
          key: 'address',
          width: 100,
          align: 'center'
        },
        {
          title: '详细地址',
          key: 'addressDetail',
          width: 150,
          align: 'center'
        },
        {
          title: '邮编',
          key: 'postalCode',
          width: 90,
          align: 'center'
        },
        {
          title: '手机',
          key: 'receiverPhone',
          width: 120,
          align: 'center'
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.rmIndex = params.index;
                    this.modalStatus = true;
                  }
                }
              }, '移除')
            ])
          }
        },
        {
          title: ' ',
          key: 'isDefault',
          width: 120,
          align: 'center',
          render: (h, params) => {
            if (params.row.isDefault) {
              return h('div', [
                  h('p', {
                    attrs: {
                      style: "text-align:center; background-color: #FFE7BA; color: #FF8C00; border: 1px solid #FF8C00; padding: 2px; margin: 5px 0px;",
                      min: 1
                    }
                }, '默认地址')
              ])
            } else {
              return h('div', [
                  h('a', {
                  on: {
                    click: () => {
                      this.changeDefaultAddress(params.index);
                      this.$Message.success('默认地址修改成功！');
                    }
                  }
                }, '设为默认地址')
              ])
            }
          }
        }
      ],
      addressTable: []
    }
  },
  methods: {
    checkReceiverName(rule, value, callback) {
        if (value.length == 0) {
          callback();
        }
        if (value.length < 2 || value.length > 25) {
          callback("收货人姓名应为2-25个字符");
        } else {
          callback();
        }
    },
    checkPhone(rule, value, callback) {
        if (value.length == 0) {
          callback();
        }
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback("手机号码错误");
        } else {
          callback();
        }
    },
    handleSubmit(e) {
      if (this.addressTable.length >= 11) {
        this.$Message.error('最多只能添加11条地址记录！');
        return;
      }
      this.$refs[e].validate((valid) => {
          if (valid) {
            var address = '';
            var postcode = '';
            for (let i = 0; i < this.formItem.addressInfo.length; i++) {
              address += this.formItem.addressInfo[i] + '/';
            }
            if (this.formItem.postcode == "") {
              postcode = "000000";
            } else {
              postcode = this.formItem.postcode;
            }
            // 后端添加
            this.$axios({
              method: 'post',
              url: '/user/addAddress',
              params: {
                userId: this.userInfo.userId,
                address: address,
                addressDetail: this.formItem.addressDetail,
                postalCode: postcode,
                receiverName: this.formItem.receiverName,
                isDefault: false,
                receiverPhone: this.formItem.phone
              }
            }).then(res => {
              let result = res.data;
              if (result.status == 'success') {
                this.$Message.success('新增成功！');
                console.log(result.data);
                this.addressTable.push(result.data);
              } else {
                this.$Notice.error({
                  title: "错误" + result.data.errCode,
                  desc: result.data.errMsg
                });
              }
            }).catch(err => {
              this.$Notice.error({
                title: "错误",
                desc: "服务器开小差了,请稍后再试"
              });
            });
          } else {
            this.$Message.error('新增失败！');
          }
        });
      this.$refs[e].resetFields();
      this.formItem.postcode = '';
    },
    remove(index) {
      // 后端数据库删除请求
      this.addressTable[index].addressId
      this.$axios({
        method: 'get',
        url: '/user/delAddress',
        params: {
          userId: this.userInfo.userId,
          addressId: this.addressTable[index].addressId
        }
      }).then(res => {
        let result = res.data;
        if (result.status == 'success') {
          this.$Message.success('地址删除成功！');
          this.addressTable.splice(index, 1);
        } else {
          this.$Notice.error({
            title: "错误" + result.data.errCode,
            desc: result.data.errMsg
          });
        }
      }).catch(err => {
        this.$Notice.error({
          title: "错误",
          desc: "服务器开小差了,请稍后再试"
        });
      });
    },
    ok() {
      if(this.rmIndex != -1) {
        this.remove(this.rmIndex);
        this.rmIndex = -1;
      }
    },
    cancel() {
      this.$Message.success('取消移除！');
      this.rmIndex = -1;
    },
    changeDefaultAddress(index) {
      for (let i = 0; i < this.addressTable.length; i++) {
        if (i == index) {
          this.addressTable[i].isDefault = true;
        } else {
          this.addressTable[i].isDefault = false;
        }
      }
      // 后台数据库更新
    },
    getAllAddresses() {
      this.$axios({
        method: 'get',
        url: '/user/getAddresses',
        params: {
          userId: this.userInfo.userId,
        }
      }).then(res => {
        let result = res.data;
        if (result.status == 'success') {
          this.addressTable = result.data;
        } else {
          this.$Notice.error({
            title: "错误" + result.data.errCode,
            desc: result.data.errMsg
          });
        }
      }).catch(err => {
        this.$Notice.error({
          title: "错误",
          desc: "服务器开小差了,请稍后再试"
        });
      });
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.user;
    this.getAllAddresses();
  }

}
</script>

<style scoped>
.delivery-address-div {
  border: 1px solid #eeeeee;
  margin: 20px 50px;
}
.p-title {
  padding: 10px 10px;
  background-color:	#FFF0F5;
  color: #A013EB;
}
.inner-p-title {
  font-size: 10px;
  color: #FF7F00;
}
.inner-box {
  margin: 30px 50px;
}
</style>
