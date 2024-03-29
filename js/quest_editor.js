var act_selected_quest = null;
var quest_list = []
var loot_lit = ["sword","axe","apple","tua madre","boat","mithril","oppenhimer"]
var npc_lit = ["nicola","peppe","sir alonne","tua madre","napoli","naruto","oppenhimer"]
var is_deleteing = false;

class quest {
    constructor(ui,description = "", checks = [],loot = [],nps = []) {
        this.ui = ui;
        this.description = description;
        this.checks = checks;
        this.loot = loot;
        this.npc = nps;
    }
}

$(document).ready(function(){ 
    $("#new_quest").click(function(){   
        $("#new_node_wizard_2").attr("style","opacity: 0; ")
        $( "#new_node_wizard_2" ).animate({ opacity: 1, }, 300, function() {});
    }) 

    $("#new_check").click(function(){
        $("#new_node_wizard_3").attr("style","opacity: 0;")
        $( "#new_node_wizard_3" ).animate({ opacity: 1, }, 300, function() {});
    })

    $("#del_check").click(function(){
        if(get_selected_quest_item().checks.length > 0) {
            is_deleteing = !is_deleteing

            if(is_deleteing) $(this).attr("style","margin:0;width: 48%;background-color: #c43d3d;")
            else $(this).attr("style","margin:0;width: 48%;background-color: #994747;")
        }
    })

    $("#new_addloot").click(function(){
        $("#new_node_wizard_4").attr("style","opacity: 0;")
        $( "#new_node_wizard_4" ).animate({ opacity: 1, }, 300, function() {});

        fill_loot_list()
    })

    $("#new_addnpc").click(function(){
        $("#new_node_wizard_5").attr("style","opacity: 0;")
        $( "#new_node_wizard_5" ).animate({ opacity: 1, }, 300, function() {});

        fill_npc_list()
    })
//---------------------------------------------QUEST
    $("#new_node_wizard_2 > div").click(function(){
        set_nodes(true,false,$("#new_node_wizard_2 > input").val())
        add_quest_to_list($("#new_node_wizard_2 > input").val())
        $( "#new_node_wizard_2" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_2").attr("style","opacity: 0; display:none")
            $("#new_node_wizard_2 > input").val("")
        });
    })

    $("#close_new_node_wizard_2").click(function(){
        $( "#new_node_wizard_2" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_2").attr("style","opacity: 0; display:none")
            $("#new_node_wizard_2 > input").val("")
        });
    })
//---------------------------------------------CHECKS
    $("#new_node_wizard_3 > div").click(function(){
        add_check($("#new_node_wizard_3 > input").val())
        $( "#new_node_wizard_3" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_3").attr("style","opacity: 0; display:none")
            $("#new_node_wizard_3 > input").val("")
        });
    })

    $("#close_new_node_wizard_3").click(function(){
        $( "#new_node_wizard_3" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_3").attr("style","opacity: 0; display:none")
            $("#new_node_wizard_3 > input").val("")
        });
    })
//---------------------------------------------LOOT
    $("#new_node_wizard_4 > div").click(function(){
        add_loot()
        $( "#new_node_wizard_4" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_4").attr("style","opacity: 0; display:none")
        });
    })

    $("#close_new_node_wizard_4").click(function(){
        $( "#new_node_wizard_4" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_4").attr("style","opacity: 0; display:none")
        });
    })
//---------------------------------------------NPC
    $("#new_node_wizard_5 > div").click(function(){
        add_npc()
        $( "#new_node_wizard_5" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_5").attr("style","opacity: 0; display:none")
        });
    })

    $("#close_new_node_wizard_5").click(function(){
        $( "#new_node_wizard_5" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_5").attr("style","opacity: 0; display:none")
        });
    })


    $("#description_tab_body textarea").on("focusout",function(){
        get_selected_quest_item().description = $("#description_tab_body textarea").val();
    })
})

function get_selected_quest_item(is_content=true){
    var finalK;
    var finalV;
    var t = false;
    quest_list.forEach(function(k,v){
        if(!t && (k != null)) {
            if($(k.ui).attr("quest_id") == $(".quest_selected").attr("quest_id")) {
                finalK = k
                finalV = v;
                t=true;
            }
        }
    });
    return is_content?finalK:finalV;
}

function attach_quest_list_events(this_quest) {
    //open quest
    $(this_quest).click(function(e){
        if($(e.target).prop("tagName") != "IMG") {
            $(act_selected_quest).removeClass("quest_selected")
            $(act_selected_quest).css('--myVar_3', '21px');
            act_selected_quest = this;

            $(this).addClass("quest_selected")
            $(this).css('--myVar_3', '21px');
            select_quest_edit_tab(this_quest)
        }
    })
    //delete quest & node
    $(this_quest).find("img").click(function(){
        selected_node = $("#"+$(this_quest).attr("quest_id"))
        if($(selected_node).attr("to") != "") 
            delete_all_paths(selected_node)
        
        node_list[$(selected_node).attr("id")] = null
        $("#map_container").remove("#"+$(selected_node).attr("id"))
        $($(selected_node)).remove()

        delete_quest_to_list(this_quest)
        act_selected_quest = null
    })
}

function add_quest_to_list(text = "test",quest_id = "") {
    var id = quest_id == "" ? (node_list.length-1) : quest_id

    var qt = $('<div class="quests" quest_id="'+id+'">'+
                    '<img style="width:57px" src="https://img.icons8.com/fluency-systems-filled/96/F5DEB3/trash.png" alt="trash"/>'+
                    '<text>'+text+'</text>'+
                '</div>')
    $("#quest_list").append(qt)
    quest_list.push(new quest(qt))
    attach_quest_list_events(qt)

    return quest_list[quest_list.length-1];
}

function delete_quest_to_list(quest_to_delete) {
    quest_list.forEach(function(k,v) {
        if(k != null)
            if($(k.ui).attr("quest_id") == $(quest_to_delete).attr("quest_id")) {
                quest_list[v] = null
                $(k.ui).remove()
                close_quest()
            }
    })
}

function attach_check_events (this_check) {
    $($(this_check).find("div")).click(function(){ 
        if($($(this_check).find("div")).attr("check")=="n") {
            $($(this_check).find("div")).css("background-color","#5f3b41")
            $($(this_check).find("div")).attr("check","y")
        } else {
            $($(this_check).find("div")).css("background-color","#db6e51")
            $($(this_check).find("div")).attr("check","n")
        }
    })
    $(this_check).click(function() {
        if(is_deleteing) 
            delete_check(this)
    })
}

function add_check(text = "text_check",selected_quest = "",check_state = "") {
    var state = check_state == ""?"n":check_state
    
    var ch = $( '<div class="checks_container" style="margin-bottom:20px">'+
                    '<div check="'+state+'"></div>'+
                    '<p>'+text+'</p>'+
                '</div>')
    $("#check_list").append(ch)
    
    attach_check_events(ch)
    if(selected_quest == "")
        get_selected_quest_item().checks.push(ch);
    else
        selected_quest.checks.push(ch);

    return ch
}

function delete_check (this_check) {
    quest_list[get_selected_quest_item(false)].checks.forEach(function(k,v) {
            if(k.text() == $(this_check).text())
                quest_list[get_selected_quest_item(false)].checks.splice(v, 1);
    })
    $(this_check).remove()

    if(get_selected_quest_item().checks.length == 0) 
        $("#del_check").attr("style","margin:0;width: 48%;background-color: #994747;")
}

function fill_loot_list() {
    var last_sel = $(".li_sel_chx")
    $("#new_node_wizard_4 ul").empty()

    loot_lit.forEach(function(k,v){
        var elem = $("<li>"+k+"</li>")
        $("#new_node_wizard_4 ul").append(elem)

        for(var i = 0; i<last_sel.length;i++) {
            if($(last_sel[i]).html() == k)
                $(elem).addClass("li_sel_chx")
        }

        attach_loot_npc_list_events(elem)
    })
}

function attach_loot_npc_list_events (elem,is_loot = true) {
    $(elem).click(function () {
        var cls = is_loot ? "li_sel_chx" : "li_sel_npc"
        if($(this).hasClass(cls))
            $(this).removeClass(cls)
        else
            $(this).addClass(cls)
    })
}

function add_loot() {
    $("#loot_list").empty()

    quest_list[get_selected_quest_item(false)].loot = []

    $(".li_sel_chx").each(function(k,v){
        var lt = $('<div class="checks_container" style="padding-left:29px;margin-bottom:20px" style="margin-bottom:20px"><p>'+$(v).html()+'</p></div>')
        $("#loot_list").append(lt)
        quest_list[get_selected_quest_item(false)].loot.push(lt)
    })
}

function fill_npc_list() {
    var last_sel = $(".li_sel_npc")
    $("#new_node_wizard_5 ul").empty()

    npc_lit.forEach(function(k,v){
        var elem = $("<li>"+k+"</li>")
        $("#new_node_wizard_5 ul").append(elem)

        for(var i = 0; i<last_sel.length;i++) {
            if($(last_sel[i]).html() == k)
                $(elem).addClass("li_sel_npc")
        }

        attach_loot_npc_list_events(elem,false)
    })
}

function add_npc() {
    $("#npc_list").empty()

    quest_list[get_selected_quest_item(false)].npc = []

    $(".li_sel_npc").each(function(k,v){
        var lt = $('<div class="checks_container" style="padding-left:29px;margin-bottom:20px" style="margin-bottom:20px"><p>'+$(v).html()+'</p></div>')
        $("#npc_list").append(lt)
        quest_list[get_selected_quest_item(false)].npc.push(lt)
    })
}