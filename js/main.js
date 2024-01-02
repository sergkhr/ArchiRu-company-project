let container = $("#content");
let menu = $("#menu");
let menu_items = {
    activity: $("#activity_menu_item"),
    projects: $("#projects_menu_item"),
    texts: $("#texts_menu_item"),
    events: $("#events_menu_item")
}
let logo = $("#logo");
let section_container = $(".menu_item_content");


function cleanBackgroundStates(element){
    element.removeClass("white_background");
    element.removeClass("dark_background");
}
function cleanMenuStates(){
    menu.removeClass("on_white_background");
}

menu_items.activity.click(function(){
    cleanBackgroundStates(container);
    cleanMenuStates();
    container.addClass("dark_background");
});

menu_items.projects.click(function(){
    cleanBackgroundStates(container);
    cleanMenuStates();
    container.addClass("white_background");
    menu.addClass("on_white_background");
});



// in progress
menu_items.texts.click(function(){
    cleanBackgroundStates(container);
    cleanMenuStates();
});

menu_items.events.click(function(){
    cleanBackgroundStates(container);
    cleanMenuStates();
});