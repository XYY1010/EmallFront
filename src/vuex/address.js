const state = {
    addresses: [{
        addressId: '',
        userId: '',
        receiverName: '',
        receiverPhone: '',
        address: '',
        addressDetail: '',
        postalCode: '',
        isDefault: true
    }]
}
const getters = {
    getAllAddresses: state => {
        state.addresses = [{
            addressId: '123',
            userId: 'user1',
            receiverName: '李良俊',
            receiverPhone: '15651622009',
            address: '江苏省 南京市 栖霞区 南京仙林大学城',
            addressDetail: '文苑路一号南京师范大学',
            postalCode: '000000',
            isDefault: true
        },
            {
                addressId: '456',
                userId: 'user1',
                receiverName: '木子李',
                receiverPhone: '15651622009',
                address: '浙江省 宁波市 鄞州区',
                addressDetail: '江南路1689号',
                postalCode: '000000',
                isDefault: false
            }]
        return state.addresses;
    }
}
const actions = {}

const mutations = {
    setAddresses(state, payload) {

    }
};
export default {

    state,
    getters,
    //actions,
    mutations
};
