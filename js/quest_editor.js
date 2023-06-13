var act_selected_quest = null;
$(document).ready(function(){ 
    $("#new_node_wizard_2 > div").click(function(){
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

    $("#new_quest").click(function(){   
        $("#new_node_wizard_2").attr("style","opacity: 0; ")
        $( "#new_node_wizard_2" ).animate({ opacity: 1, }, 300, function() {});
    }) 

    $(".checks_container > div").click(function(){ 
        if($(this).attr("check")=="n") {
            $(this).css("background-color","#5f3b41")
            $(this).attr("check","y")
        } else {
            $(this).css("background-color","#db6e51")
            $(this).attr("check","n")
        }
     })

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
        var qt = $('<div class="quests">'+text+'</div>')
        $("#quest_list").append(qt)
        attach_quest_list_events(qt)
    }
})