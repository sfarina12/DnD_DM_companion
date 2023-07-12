var act_selected_tab

$(document).ready(function(){ 
    var act_selected = $(".nav_btn")[0]
    //var act_selected_tab = $(".tab")[0]
    $('.nav_btn_selected').css('--myVar', '21px');
    $('.tab_selected').css('--myVar_2', '21px');

    $(".nav_btn").click(function(){ 
        if($(this) != act_selected) {
            
            $(this).css('--myVar', '21px');
            $(this).addClass("nav_btn_selected")
            $("#"+$(this).attr("page")).removeClass("closed")

            $(act_selected).removeClass("nav_btn_selected")
            $(act_selected).css('--myVar', '0px');
            $("#"+$(act_selected).attr("page")).addClass("closed")

            act_selected = $(this)
            
        }
    })

    $(".tab").click(function(){
        if((act_selected_quest != null) && ($(this) != act_selected_tab) && ($(this).attr("page") != $(act_selected_tab).attr("page"))) {
            $("#"+$(this).attr("page")).removeClass("closed")
            $("#tab_body").css("border-radius","30px")

            if($(this).hasClass("frst"))
                $("#tab_body").css("border-radius","0px 30px 30px 30px")
            if($(this).hasClass("last"))
                $("#tab_body").css("border-radius","30px 0px 30px 30px")
            
            $(this).css('--myVar_2', '21px');
            $(this).addClass("tab_selected")

            $("#"+$(act_selected_tab).attr("page")).addClass("closed")
            $(act_selected_tab).removeClass("tab_selected")
            $(act_selected_tab).css('--myVar_2', '0px');

            act_selected_tab = $(this)

            manage_tab_content()
        }
    })
})

function select_quest_edit_tab() {
    $("#tab_body").css("border-radius","30px")
    $("#tab_body").css("border-radius","0px 30px 30px 30px")
    
    if(act_selected_tab != null) {
        $(act_selected_tab).removeClass("tab_selected")
        $(act_selected_tab).css('--myVar_2', '0px');
    }

    $($(".tab")[0]).css('--myVar_2', '21px');
    $($(".tab")[0]).addClass("tab_selected")
    $("#"+$($(".tab")[0]).attr("page")).removeClass("closed")
    
    act_selected_tab = $(".tab")[0]
    manage_tab_content();
}

function manage_tab_content() {
    set_tab_content()
}

function set_tab_content() {
    var qk = get_selected_quest_item()

    $("#description_tab_body textarea").val(quest_list[get_selected_quest_item(false)].description)
    $("#check_list").empty()
    $("#loot_list").empty()
    $("#npc_list").empty()

    if(qk.checks.length > 0)
        qk.checks.forEach(function(k,v){
            attach_check_events(k)
            $("#check_list").append(k)
        })
    if(qk.loot.length > 0)
        qk.loot.forEach(function(k,v){
            $("#loot_list").append(k)
        })
    if(qk.npc.length > 0)
        qk.npc.forEach(function(k,v){
            $("#npc_list").append(k)
        })
}