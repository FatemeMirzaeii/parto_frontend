
import NetInfo from "@react-native-community/netinfo"


export const CheckConnectivity = async () => {
    let flag;
    await NetInfo.fetch().then(state => {
        if (state.isConnected) {
            flag = true;
        } else {
            flag = false
        }
    });
    return flag;
};
