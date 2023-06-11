$(document).ready(function(){ 
    var act_selected = $(".nav_btn")[0]
    var act_selected_tab = $(".tab")[0]
    $('.nav_btn_selected').css('--myVar', '21px');

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
        if($(this) != act_selected_tab) {
            
            $(this).css('--myVar_2', '21px');
            $(this).addClass("tab_selected")

            $(act_selected_tab).removeClass("tab_selected")
            $(act_selected_tab).css('--myVar_2', '0px');

            act_selected_tab = $(this)
        }
    })
})