export class MenuHelper {
    static items = [
        {id: 0, name: "FAQ", url: "faq", need_login: false},
        {id: 14, name: "Profile", url: "protected/profile", need_login: true,need_admin: false},
        {id: 15, name: "Settings", url: "settings", need_login: false}
    ]
    static default=MenuHelper.items[0].url
    static getIdByURL(url:string) {
        for(const x of MenuHelper.items) {
            // @ts-ignore
            if (x.url.includes(url)) return x.id
        }
        return 0
    }
    static getNameByURL(name:string) {
        for(const x of MenuHelper.items) {
            // @ts-ignore
            if (x.name.includes(name)) return x.name
        }
        return 0
    }
}