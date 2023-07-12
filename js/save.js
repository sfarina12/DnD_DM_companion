/*$(document).ready(function(){
    var timer_save
    var save_every = 4000//50000

    //unpack_cookie()

    timer_save = setTimeout(function(){
        var json_quests = pack_cookie(node_list);
        var json_nodes = pack_cookie(quest_list);
        Cookies.set("nodes", json_quests, { expires: 2147483647 });
        Cookies.set("quests", json_nodes, { expires: 2147483647 });
        clearTimeout(timer_save);

        unpack_cookie()
    },save_every);
})

function pack_cookie(value) {
    var str = JSON.stringify(value)
    console.log(str)
    return str
}

function unpack_cookie() {
    Cookies.get("nodes")
}*/

$("#save_menu").click(function() {
    if($("#save_contex_menu").hasClass("menu_closed")) 
        $("#save_contex_menu").removeClass("menu_closed")
    else
        $("#save_contex_menu").addClass("menu_closed")
})