var act_selected_quest = null;
var quest_list = []

class quest {
    constructor(ui,description = "", checks = [],loot = [],nps = []) {
        this.ui = ui;
        this.description = description;
        this.checks = checks;
        this.loot = loot;
        this.nps = nps;
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

    $("#new_addloot").click(function(){
        $("#new_node_wizard_4").attr("style","opacity: 0;")
        $( "#new_node_wizard_4" ).animate({ opacity: 1, }, 300, function() {});
    })

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

    $("#new_node_wizard_4 > div").click(function(){
        
    })

    $("#close_new_node_wizard_4").click(function(){
        $( "#new_node_wizard_4" ).animate({ opacity: 0, }, 300, function() {
            $("#new_node_wizard_4").attr("style","opacity: 0; display:none")

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
        if(!t) {
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
    $(this_quest).click(function(){
        $(act_selected_quest).removeClass("quest_selected")
        $(act_selected_quest).css('--myVar_3', '21px');
        act_selected_quest = this;

        $(this).addClass("quest_selected")
        $(this).css('--myVar_3', '21px');
        select_quest_edit_tab(this_quest)
    })
}

function add_quest_to_list(text = "test") {
    var qt = $('<div class="quests" quest_id="'+(node_list.length-1)+'">'+text+'</div>')
    $("#quest_list").append(qt)
    quest_list.push(new quest(qt))
    attach_quest_list_events(qt)
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
}

function add_check(text = "text_check") {
    var ch = $('<div class="checks_container" style="margin-bottom:20px"><div check="n"></div><p>'+text+'</p></div>')
    $("#check_list").append(ch)
    
    attach_check_events(ch)
    get_selected_quest_item().checks.push(ch);
}