$(document).ready(function(){ 
    var act_selected = $(".nav_btn")[0]
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
})