var node_list = []
var isDragging = false;
var draggingElement = null;
var timer;
var is_open_ac = false;
var open_node = null;
var tml_open_node;
var global_path_counter = 0;
const OPEN_CONNECTION_PANEL = "padding: unset; text-align: center; padding-bottom:23;"
const CLOSE_CONNECTION_PANEL = "padding: unset; text-align: center; height:100px"
const time_to_open_info_pane = 1;
class node {
    constructor(ui,svg, connections) {
        this.ui = ui;
        this.svg = svg;
        this.connections = connections;
    }
}

$(document).ready(function(){   
    //DEBUG PURPOSE, when fully created this pre function fill not be necessary anymore
    //permette di attaccare gli eventi a i nodi preesistenti per il debug
    //set_nodes(false,true)

    $("#close_node_info").on("touchend",function(){
        $("#node_info_container").removeClass("expand_node_info_container")
        $(".node_list_element").remove()
        $(".connected_node").remove()
        is_open_ac = false;
        $("#add_connection").attr("style",CLOSE_CONNECTION_PANEL)
        $(".node_list_element").remove()
    })

    //--------------------------------------NEW FUNCTIONS--------------------------------------
    $("#add_connection div").click(function(){
        if(!is_open_ac) {
            is_open_ac = true;
            if($(".quest_node").length != 1)
                $("#add_connection").attr("style",OPEN_CONNECTION_PANEL+" height: "+((($(".quest_node").length-1)*125)+88)+"px;")
            
            populate_connections_list()
        } else {
            is_open_ac = false;
            $("#add_connection").attr("style",CLOSE_CONNECTION_PANEL)
            $(".node_list_element").remove()
        }
    })

    $(document).on('touchmove',function(e){
        if(isDragging) {
            var newX = (e.touches[0].clientX - parseInt($("#svg1").position().left) - 211)+"px;"
            var newY = (e.touches[0].clientY - parseInt($("#svg1").position().top) - 75)+"px;"
            var id_node = $(draggingElement).attr("id");
            
            $(draggingElement).attr("style","left: "+newX+" top: "+newY)

            $(".quest_node").each(function (k,v) { 
                if($(v).attr("to").includes(id_node)) {
                    update_path(node_list[$(v).attr("id")])
                }
            })
            update_path(node_list[id_node])
        }
    })

    $("#new_node").click(function(){   
        $("#new_node_wizard").attr("style","opacity: 0; ")
        $( "#new_node_wizard" ).animate({ opacity: 1, }, 300, function() {});
    }) 

    $("#close_new_node_wizard").click(function(){
        $( "#new_node_wizard" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard").attr("style","opacity: 0; display:none")
            $("#new_node_wizard > input").val("")
        });
    })

    $("#new_node_wizard > div").click(function(){
        set_nodes(true,false,$("#new_node_wizard > input").val())
        add_quest_to_list($("#new_node_wizard > input").val())
        $( "#new_node_wizard" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard").attr("style","opacity: 0; display:none")
            $("#new_node_wizard > input").val("")
        });
    })
    
    $(document).click(function() {
        if(open_node != null)
            $($(open_node).children()).attr("style","height: 0px")
    })
})

function show_past_connections(element) {
    find_element_to_connect($(element).attr("to").split("-")).forEach(function(k,v){
        $("#list_possible_conn").after('<div ccnt="'+$(k).attr("id")+'" class="connected_node" style="max-height: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">'+$(k).text()+'<div><img src="https://img.icons8.com/fluency-systems-filled/96/F5DEB3/trash.png" alt="trash"/></div></div>')
        $(".connected_node > div").on("touchend",function(){ 
            delete_path($(this).parent()) 
            $(this).parent().remove()
        })
    })
}

function populate_connections_list () {
    $(".quest_node").each(function(k,v){
        var this_node_id = $(v).attr("id")
        if(this_node_id != $(open_node).attr("id"))
            var conn_choise = $('<div cnt="'+this_node_id+'" class="node_list_element">'+v.textContent+"</div>")
        $("#add_connection").append(conn_choise)

        $(conn_choise).on("touchend",function() {
            $("#list_possible_conn").after('<div ccnt="'+this_node_id+'" class="connected_node" style="max-height: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">'+v.textContent+'<div><img src="https://img.icons8.com/fluency-systems-filled/96/F5DEB3/trash.png" alt="trash"/></div></div>')
            $(".connected_node > div").on("touchend",function(){
               delete_path($(this).parent())
               $(this).parent().remove()
            })
            
            var conn_array = $(open_node).attr("to").length == 0 ? this_node_id : ($(open_node).attr("to")+"-"+this_node_id)
            $(open_node).attr("to",conn_array)
            add_path(open_node,this_node_id)
        })
    })
}

function find_element_to_connect (array_) {
    var final_array = []
    for(var i=0;i < array_.length;i++) {
        if(array_[i]!="")
            final_array.push($("#"+array_[i]));
    }
    return final_array;
}

function attach_node_events (node_ev) {
    $(node_ev).on('touchstart', function() { 
        draggingElement=this; isDragging = true; 
        if(open_node!=draggingElement)
            $($(open_node).children()).attr("style","height: 0px")
    })
    $(node_ev).on('touchend', function() { draggingElement=null; isDragging = false })
    $(node_ev).on("touchstart",function(e){
        e.preventDefault()
        tml_open_node = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            $($(node_ev[0]).children()).attr("style","height: 110px")
            open_node = tml_open_node;
            tml_open_node = null;
        },time_to_open_info_pane*1000);
    }).on("touchend touchmove",function(){ clearTimeout(timer); tml_open_node = null; });
    
    //open node info connections
    $($($($(node_ev)[0]).children()).children()[1]).on("touchstart",function(node_ev){
        $("#node_info_container").addClass("expand_node_info_container")

        if(open_node.innerText != undefined)
            $("#info_quest_name").text(open_node.innerText)
        else
            $("#info_quest_name").text($($(open_node)[0]).text())
        
        show_past_connections(open_node)
    })
    //delete node
    $($($($(node_ev)[0]).children()).children()[0]).on("touchstart",function(node_ev){
        if($(open_node).attr("to") != "") 
            delete_all_paths(open_node)
        //node_list.splice($(open_node).attr("id"), 1)
        node_list[$(open_node).attr("id")] = null
        node_list[$(open_node).attr("id")] = null
        $("#map_container").remove("#"+$(open_node).attr("id"))
        $($(open_node)).remove()

        delete_quest_to_list($(".quests[quest_id='"+$(open_node).attr("id")+"']"))
    })
}

function build_node (node_to_build) {
    attach_node_events(node_to_build)
    var conn_list = find_element_to_connect($(node_to_build).attr("to").split("-"))
    node_list.push(new node(node_to_build,[],conn_list))
}

function set_nodes(make_new = false,debug = false,quest_name="test_name",preset_id = "",location = "",to_node = "") {
    var id = (preset_id == "")?node_list.length:preset_id;
    var to = (to_node == "")?"":to_node;
    var style = (location == "")?"left: 15px; top: 21px;":location;

    if(make_new) {
        var new_element = $('<div id="'+id+'" to="'+to+'" class="quest_node" style="'+style+'">'+
                                quest_name+
                                '<div style="height:0px">'+
                                    '<img id="delete_btn" src="https://img.icons8.com/fluency-systems-filled/96/ff4545/close-window.png" alt="delete-sign"/>'+
                                    '<div id="info_btn">'+
                                        '<img src="https://img.icons8.com/fluency-systems-filled/96/442a2e/menu.png" alt="menu"/>'+
                                    '</div>'+
                                '</div>'+
                            '</div>')
        $("#map_container").prepend(new_element)
        build_node(new_element)
    }

    if(debug) {   
        $(".quest_node").each( function(key,element) {
            build_node(element)
        })
    }
    
    node_list.forEach(function (this_node) {
        update_path(this_node)
    })
    
}

function update_path (node_ev) {
    if(node_ev != null)
        node_ev.svg.forEach(function(this_path) {
            var dest_id = $(this_path).attr("id").split("-")

            dest_id = $(this_path).attr("id").substring(5,$(this_path).attr("id").length)
            dest_id = dest_id.substring(dest_id.indexOf("_")+1,dest_id.length)

            connectElements($("#svg1"),
                            $(this_path),
                            $(node_ev.ui),
                            $("#"+dest_id))
        })
}

function add_path (node_ev,destination_id) {
    var id = "path_"+global_path_counter+"_"+destination_id

    newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");  
    newpath.setAttributeNS(null, "id", id);
    newpath.setAttributeNS(null, "stroke-width", "10px");
    newpath.setAttributeNS(null, "fill", "none");
    newpath.setAttributeNS(null, "stroke", "#5F3B41");
    $("#svg1").append(newpath)
    global_path_counter++;
    
    node_list[$(node_ev).attr("id")].svg.push(newpath)
    connectElements($("#svg1"),
                    $(newpath),
                    $(node_list[$(node_ev).attr("id")].ui),
                    $("#"+destination_id))
}

function delete_path(this_node) {
    node_list[$(open_node).attr("id")].svg.forEach(function(k,v){            
        var dest_id = $(k).attr("id").split("-")
        
        dest_id = $(k).attr("id").substring(5,$(k).attr("id").length)
        dest_id = dest_id.substring(dest_id.indexOf("_")+1,dest_id.length)
        
        if(dest_id==$(this_node).attr("ccnt")) {
            $(node_list[$(open_node).attr("id")].svg.splice(v,1)).remove()
            $(open_node).attr("to","")
            return;
        }
    })
    
}

function delete_all_paths (this_node) {
    node_list[$(this_node).attr("id")].svg.forEach(function(k,v){            
        $(k).remove()
    })
}