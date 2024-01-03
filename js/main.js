let container = $("#content");
let menu = $("#menu");
let all_menu_items = $("#menu .menu_item");
let logo = $("#logo");
let section_container = $(".menu_item_content");



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

function hideMunuItem(item){
    all_menu_items.removeClass("hidden"); //show all menu items before hiding one
    $("#menu .menu_item_border").removeClass("hidden");

    item.addClass("hidden");
    if(item.is(":last-child")){
        item.prev().addClass("hidden");
    }
    else{
        item.next().addClass("hidden");
    }
}



let background_type_functions = {
    "white": turnContainerBackgroundToWhite,
    "dark": turnContainerBackgroundToDark
}
all_menu_items.click(function(){
    const index = $(this).data("index");
    const background_type = $(this).data("background-type");
    const section = section_container.eq(index);

    background_type_functions[background_type]();
    hideMunuItem($(this));
});

