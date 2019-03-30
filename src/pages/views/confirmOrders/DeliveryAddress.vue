<template>
    <div @click="change"
         :class="address.isDefault?'change-border':'init-border'">
        <!--收款人，手机号，具体地址-->
        <em>{{ address.receiverName}}</em>
        <br/>
        <p>{{ address. receiverPhone}}</p>
        <p>{{address.address}}</p>
        <p>{{ address.addressDetail}}</p>
    </div>
</template>

<script>

    export default {
        name: "DeliveryAddress",
        props:{
            address: {
                type: Object
            }

        },
        methods: {
            change: function () {
              /*  this.initBorder = !this.initBorder;
                this.changeBorder = !this.changeBorder;*/
              const addresses=this.$store.getters.getAllAddresses;
              let lastAddressId;
              const curAddressId=this.address.addressId;
                for (let i = 0; i <addresses.length ; i++) {
                    lastAddressId=addresses[i].addressId;
                    if(curAddressId===lastAddressId){
                        addresses[i].isDefault=true;
                    } else {
                        addresses[i].isDefault=false;
                    }
                }
                this.$emit('change', this.address)
            },
            initAddress:function () {
             this.address=this.$store.getters.addresses[0];
            }
        }
    }
</script>

<style scoped>
    .init-border {
        border: 1px solid gray;
        padding: 10px;
        margin: 10px;
    }

    .change-border {
        border: 1px solid #A013EB;
        background-color: #A013EB;
        color: #FFF;
        font-weight: bold;
        padding: 10px;
        margin: 10px;
    }
</style>
