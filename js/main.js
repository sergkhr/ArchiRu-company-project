let container = $("#content");
let menu = $("#menu");
let all_menu_items = $("#menu .menu_item");
let logo = $("#logo");
let section_container = $(".menu_item_content");
let content_items = $(".content_item");



function cleanBackgroundStates(element){
    element.removeClass("white_background");
    element.removeClass("dark_background");
}

function cleanMenuStates(){
    menu.removeClass("on_white_background");
}

function turnContainerBackgroundToWhite(){
    cleanBackgroundStates(container);
    cleanMenuStates();
    container.addClass("white_background");
    menu.addClass("on_white_background");
}

function turnContainerBackgroundToDark(){
    cleanBackgroundStates(container);
    cleanMenuStates();
    container.addClass("dark_background");
}



function activateMenuItem(item){
    all_menu_items.removeClass("hidden"); //show all menu items before hiding one
    $("#menu .menu_item_border").removeClass("hidden");

    item.addClass("hidden");
    if(item.is(":last-child")){
        item.prev().addClass("hidden");
    }
    else{
        item.next().addClass("hidden");
    }


    $("#selected_item_title .menu_item").addClass("hidden");
    const index = item.data("index");
    $("#selected_item_title .menu_item").filter(function() {
        return $(this).data("index") == index;
    }).removeClass("hidden");
}

function openContentItem(item){
    content_items.addClass("hidden");
    item.removeClass("hidden");
}



let background_type_functions = {
    "white": turnContainerBackgroundToWhite,
    "dark": turnContainerBackgroundToDark
}
all_menu_items.click(function(){
    const index = $(this).data("index");
    const background_type = $(this).data("background-type");
    const section = content_items.filter(function() {
        return $(this).data("index") == index;
    });

    background_type_functions[background_type]();
    activateMenuItem($(this));
    openContentItem(section);
});

