$(document).ready(function(){
    var timer_save
    var time_to_save = 4000//50000

    //unpack_cookie()

    timer_save = setTimeout(function(){
        var json_quests = pack_cookie(node_list);
        var json_nodes = pack_cookie(quest_list);
        Cookies.set("nodes", json_quests, { expires: 2147483647 });
        Cookies.set("quests", json_nodes, { expires: 2147483647 });
        clearTimeout(timer_save);

        unpack_cookie()
    },time_to_save);
})

function pack_cookie(value) {
    var str = JSON.stringify(value)
    return str
}

function unpack_cookie() {
    //var value = `; ${document.cookie}`;
    console.log(Cookies.get("nodes"))
    /*var parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();*/
}