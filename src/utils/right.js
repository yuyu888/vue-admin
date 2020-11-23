const MenuAuthList = {};
function CheckPath(path, menu_auth_list) {
    if(menu_auth_list.hasOwnProperty(path)&& menu_auth_list[path] == false){
        return false
    }else{
        return true
    }
}
export default {
    MenuAuthList,
    CheckPath
}