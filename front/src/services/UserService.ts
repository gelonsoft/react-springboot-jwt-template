import APIHelper from "../helper/APIHelper";


class UserService {
    getPublicContent() {
        return APIHelper.get('test/all')
    }

    getUserBoard() {
        return  APIHelper.get('test/user',true)
    }

    getModeratorBoard() {
        return  APIHelper.get('test/mod',true)
    }

    getAdminBoard() {
        return  APIHelper.get('test/admin',true)
    }
}

export default new UserService();