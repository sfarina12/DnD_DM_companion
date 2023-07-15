var save__quests = [];
var save__nodes = [];

$("#save_menu").click(function() {
    if($("#save_contex_menu").hasClass("menu_closed")) 
        $("#save_contex_menu").removeClass("menu_closed")
    else
        $("#save_contex_menu").addClass("menu_closed")
})

$("#download").click(function() {
    save__quests = pack_quest(quest_list)
    save__nodes = pack_node(node_list)

    var filename = "your_campain.txt";
    download(filename, global_path_counter+"|88|"+save__quests+"|88|"+save__nodes);
})

$("#upload").click(function() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept=".txt"
    input.onchange = _ => {
              let file =   Array.from(input.files);
              _unpack(file)
          };
    input.click();
})

function pack_quest(value) {
    var tmp_array = []
    value.forEach(function(k,v) {
        var q_id = $(k.ui).attr("quest_id")
        var q_name = $(k.ui).text()
        var q_desc = k.description
        
        var q_checks = []
        k.checks.forEach(function(k1,v1) {
            q_checks.push($(k1).html())
        })
        
        var q_loot = []
        k.loot.forEach(function(k1,v1) {
            q_loot.push($(k1).html())
        })
        
        var q_npc = []
        k.npc.forEach(function(k1,v1) {
            q_npc.push($(k1).html())
        })
        
        tmp_array.push("("+q_id+"|"+q_name+"|"+q_desc+"|"+q_checks+"|"+q_loot+"|"+q_npc+")")
    })
    return tmp_array
}

function pack_node(value) {
    var tmp_array = []
    value.forEach(function(k,v) {
        var q_id = $(k.ui).attr("id")
        var q_to = $(k.ui).attr("to")
        var q_name = $(k.ui).text()
        var q_location = $(k.ui).attr("style")
        
        var q_svg = []
        k.svg.forEach(function(k1,v1) {
            q_svg.push($(k1).attr("id"))
        })
        
        tmp_array.push("("+q_id+"|"+q_name+"|"+q_location+"|"+q_svg+"|"+q_to+")")
    })
    return tmp_array
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function _unpack(file) {
    var textType = /text.*/;
    
    if (file[0].type.match(textType)) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var content = reader.result;
            
            global_path_counter = content.split("|88|")[0]

            save__quests = content.split("|88|")[1]
            save__quests = content.split(",")

            save__nodes = content.split("|88|")[2]
            save__nodes = save__nodes.split("(")

            tmp_array = save__nodes
            paths_list = []
            
            tmp_array.forEach(function(k,v) {
                if(k!="") {
                    tmp_node = k.split("|")
                    
                    if(tmp_node[3] != "")
                        paths_list.push(tmp_node[3]+"("+tmp_node[0]+")")
                    
                    var to = tmp_node[4].split(")")

                    set_nodes(true,
                              false,
                              tmp_node[1],
                              tmp_node[0],
                              tmp_node[2],
                              to[0]
                              )  
                }
            })

            paths_list.forEach(function(k,v) {
                tmp_paths = k.split(",")
                                
                tmp_paths.forEach(function (k1,v1) {
                    if(k1 != "") {                       
                        var name_path = k1.split("_")

                        var start_str = name_path[2].split("(")[1]
                        start_str = start_str.substring(0,start_str.length-1)
                        var start = $("#"+start_str)
                        
                        var end = name_path[2].split("(")[0]
                    
                        add_path(start,end)
                    }
                })
            })
        }
        
        reader.readAsText(file[0]);	
    } else { /*file non supportato*/ }
}