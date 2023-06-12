$(document).ready(function(){ 
    var act_selected_quest = null;

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

    function attach_quest_list_events(this_quest) {
        $(this_quest).click(function(){
            $(act_selected_quest).css("background-color","#db6e51")
            act_selected_quest = this;
            $(this).css("background-color","#442a2e")
            select_quest_edit_tab(this_quest)
        })
    }

    function add_quest_to_list(text = "test") {
        var qt = $('<div class="quests">'+text+'</div>')
        $("#quest_list").append(qt)
        attach_quest_list_events(qt)
    }
})