$(document).ready(function(){   
    class node {
        constructor(ui,svg, connections) {
            this.ui = ui;
            this.svg = svg;
            this.connections = connections;
        }
    }

    class point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
    }

    $(".quest_node").on('touchstart mousedown', function() { initX = $(this).css("left"); initY = $(this).css("top"); draggingElement=this; isDragging = true })
    $(".quest_node").on('touchend mouseup', function() { draggingElement=null; isDragging = false })
    $(".quest_node").on("touchstart",function(e){
        e.preventDefault()
        tml_open_node = this;
        timer = setTimeout(function(){
            $("#node_info_container").addClass("expand_node_info_container")
            open_node = tml_open_node;
            tml_open_node = null;
            show_past_connections(open_node)
        },1*1000);
    }).on("touchend touchmove",function(){ clearTimeout(timer); tml_open_node = null; });

    var node_list = []
    var isDragging = false;
    var draggingElement = null;
    var initX
    var initY
    var timer;
    var is_open_ac = false;
    var open_node = null;
    var tml_open_node;

    setup_nodes(true)
    
    $(document).mousemove(function(e){
        if(isDragging) {
            var newX = (e.pageX - parseInt($("#svg1").position().left) - 200)+"px;"
            var newY = (e.pageY - parseInt($("#svg1").position().top) - 75)+"px;"
            
            $(draggingElement).attr("style","left: "+newX+" top: "+newY)
            
            for(var i=0;i < node_list.length-1;i++) {
                node_list[i].svg = $("#path_"+i)
                connectElements($("#svg1"),
                                $(node_list[i].svg),
                                $(node_list[i].ui),
                                $(node_list[i+1].ui));
            }
        }
    })

    $(document).on('touchmove',function(e){
        
        if(isDragging) {
            var newX = (e.touches[0].clientX - parseInt($("#svg1").position().left) - 200)+"px;"
            var newY = (e.touches[0].clientY - parseInt($("#svg1").position().top) - 75)+"px;"
            
            $(draggingElement).attr("style","left: "+newX+" top: "+newY)
            
            for(var i=0;i < node_list.length;i++) {
                //node_list[i].svg = $("#path_"+i)
                if(node_list[i].svg != null) {
                    for(var j = 0;j < node_list[i].svg.length;j++)
                        node_list[i].connections.forEach(function (k,v) {
                            connectElements($("#svg1"),
                                            $("#path_"+i+"_"+j),
                                            $(node_list[i].ui),
                                            $($(k)))
                        })
                }
            }
        }
    })

    $("#new_node").click(function(){
        setup_nodes()
    }) 

    $("#add_connection div").click(function(){
        if(!is_open_ac) {
            $("#add_connection").attr("style","padding: unset; text-align: center; padding-bottom:23;")
            is_open_ac = true;
            $(".quest_node").each(function(k,v){
                var id_node = $(v).attr("id")
                var elem = $('<div cnt="'+id_node+'" class="node_list_element">'+v.textContent+"</div>")
                
                $("#add_connection").append(elem)
                $(elem).on("touchend",function() {
                    $("#node_info_container > div p").after('<div ccnt="'+$(this).attr("cnt")+'" class="connected_node">'+v.textContent+"</div>")
                    var tml_id = $(open_node).attr("id")
                    
                    $(open_node).attr("to",$(open_node).attr("to")+"-"+$(this).attr("cnt"))
                    setup_nodes(true)
                })
            })
        } else {
            is_open_ac = false;
            $("#add_connection").attr("style","padding: unset; text-align: center;")
            $(".node_list_element").remove()
        }
    })

    $("#close_node_info").on("touchend",function(){
        $("#node_info_container").removeClass("expand_node_info_container")
        $(".node_list_element").remove()
        $(".connected_node").remove()
    })

    function setup_nodes(prevent_new_node = false) {
        if(!prevent_new_node) {
            var new_element = $('<div id="'+node_list.length+'" class="quest_node" style="left: 15px; top: 21px;"></div>')
            $("#map_container").prepend(new_element)
            $(new_element).on('touchstart mousedown', function() { initX = $(this).css("left"); initY = $(this).css("top"); draggingElement=this; isDragging = true })
            $(new_element).on('touchend mouseup', function() { draggingElement=null; isDragging = false })
            $(new_element).on("touchstart",function(e){
                e.preventDefault()
                tml_open_node = this;
                timer = setTimeout(function(){
                    $("#node_info_container").addClass("expand_node_info_container")
                    open_node = tml_open_node;
                    tml_open_node = null;
                    show_past_connections(open_node)
                },1*1000);
            }).on("touchend touchmove",function(){ clearTimeout(timer); tml_open_node = null; });
        }

        node_list = []
        var i=0;
        $(".quest_node").each( function(key,element) {
            var conn_list = find_element_to_connect($(element).attr("to").split("-"))

            node_list.push(new node(element,null,conn_list))
            i++;
        })
        
        for(var i=0;i < node_list.length;i++) {
            node_list[i].connections.forEach(function (k,v) {
                newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");  
                newpath.setAttributeNS(null, "id", "path_"+i+"_"+v);
                newpath.setAttributeNS(null, "stroke-width", "10px");
                newpath.setAttributeNS(null, "fill", "none");
                newpath.setAttributeNS(null, "stroke", "#5F3B41");
                $("#svg1").append(newpath)

                node_list[i].svg = node_list[i].svg == null ? [] : node_list[i].svg
                node_list[i].svg.push($("#path_"+i+"_"+v))
                node_list[i].svg.forEach(function(e) {
                    connectElements($("#svg1"),
                                    $(e),
                                    $(node_list[i].ui),
                                    $($(k)))
                })
                
            })
        }
    }

    function find_element_to_connect (array_) {
        var final_array = []
        for(var i=0;i < array_.length;i++) {
            if(array_[i]!="")
                final_array.push($("#"+array_[i]));
        }
        return final_array;
    }

    function show_past_connections(element) {
        find_element_to_connect($(element).attr("to").split("-")).forEach(function(k,v){
            $("#node_info_container > div p").after('<div ccnt="'+$(k).attr("id")+'" class="connected_node">'+$(k).html()+"</div>")
        })
    }
})