let container = $("#content");
let menu = $("#menu");
let all_menu_items = $("#menu .menu_item");
let logo = $("#logo");
let section_container = $(".menu_item_content");
let content_items = $(".content_item");

let normal_animation_time = parseFloat($(":root").css("--normal-animation-time"), 10) * 1000;



function load_resize(){ // same code on load and on resize
    updateContentContainerHeight();
}
$(document).ready(function(){
    load_resize();
});
$(window).on("resize", function(){
    load_resize();
});



function updateContentContainerHeight(additional_element_height = 0){
    let additional_height = parseInt($(":root").css("--menu-top-margin"), 10) * 2 + 10;
    let maxHeight = additional_element_height; 

    // Iterate through each child of the main element
    section_container.children(".content_item").not('.hidden').each(function() {
        // Get the height of the current non-hidden child
        const childHeight = $(this).outerHeight(true); // Including margins
        // Update the maxHeight if the current child's height is greater
        if (childHeight > maxHeight) {
            maxHeight = childHeight;
        }
    });

    // Set the height of the main element to the maxHeight + 200px
    section_container.height(maxHeight + additional_height);
}

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
    let previous_item = content_items.filter(function() {
        return !$(this).hasClass("hidden");
    });
    let previous_height = previous_item.outerHeight(true);

    content_items.addClass("hidden");
    item.removeClass("hidden");

    let iteration_count = 0;
    updateContentContainerHeight(previous_height);
    item.on("animationend", function(event){
        //check for animation name
        if(event.originalEvent.animationName != "show_content"){
            return;
        }
        updateContentContainerHeight();
    });
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

