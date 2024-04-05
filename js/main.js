let container = $("#content");
let menu = $("#menu");
let all_menu_items = $("#menu .menu_item");
let logo = $("#logo");
let section_container = $(".menu_item_content");
let content_items = $(".content_item");

let normal_animation_time = parseFloat($(":root").css("--normal-animation-time"), 10) * 1000;



function load_resize(){ // same code on load and on resize
    updateContentContainerHeight();
    // projectsCheckScrollable();

    // let projectsSection = $(".content_item.projects");
    // if(!projectsSection.hasClass("hidden")){
    //     updateProjectsBlocksHeight();
    // }
}
$(document).ready(function(){
    load_resize();
    eventsSetRandomizedTitlePositions();
    initiateSimpleBar();

    all_menu_items.filter(function() { // first seen page is texts
        return $(this).data("index") == 3;
    }).trigger("click");
});
$(window).on("resize", function(){
    load_resize();
    // projectsCheckScrollable();
});

function initiateSimpleBar(){
    let scrollable_elements = $(".connected_container");
    scrollable_elements.each(function(){
        let element = $(this);
        let simpleBar = new SimpleBar(element[0], {
            autoHide: false,
            // classNames: {
            //     content: 'projects-simplebar-content',
            //     scrollContent: 'projects-simplebar-scroll-content',
            //     scrollbar: 'projects-simplebar-scrollbar',
            //     track: 'projects-simplebar-track'
            // }
        });
    });
}

function checkScrollable(element){
    return element[0].scrollHeight > element[0].clientHeight;
}
// function projectsCheckScrollable(){
//     let cont = $(".content_item.projects .connected_container");
//     cont.each(function(index, element){
//         let connected = $(element);
//         let scrollable = checkScrollable(connected);
//         if(scrollable){
//             let conn_parent = connected.parent();
//             conn_parent.addClass("scrollable");
//         }
//         else{
//             let conn_parent = connected.parent();
//             conn_parent.removeClass("scrollable");
//         }
//     });
// }

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

// function updateProjectsBlocksHeight(){
//     let blocks = $(".content_item.projects .block");

//     blocks.each(function() {
//         let block = $(this);
//         let object = block.children(".object");
//         let object_height = object.outerHeight(true);
//         let connected = block.children(".connected");
//         connected.height(object_height);
//     });
// }

function eventsSetRandomizedTitlePositions(){
    let titles = $(".content_item.events .block .image_place");
    let vertical_classes = ["top", "bottom"];
    let horizontal_classes = ["right", "left"];
    titles.each(function(){
        let vertical_class = vertical_classes[Math.floor(Math.random() * vertical_classes.length)];
        let horizontal_class = horizontal_classes[Math.floor(Math.random() * horizontal_classes.length)];
        $(this).addClass(vertical_class);
        $(this).addClass(horizontal_class);
    });
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
    setTimeout(function(){
        if(container.attr("class").length > 0) return; // if background was changed in the meantime
        
        container.addClass("dark_background");
    }, background_type_change_delay["dark"]);
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

// function contentOpeningRoutine(item){ // what is done when content is opened
//     if(item.hasClass("projects")){
//         updateProjectsBlocksHeight();
//     }
// }
function openContentItem(item, background_type = null){
    // contentOpeningRoutine(item);

    let previous_item = content_items.filter(function() {
        return !$(this).hasClass("hidden");
    });
    let previous_height = previous_item.outerHeight(true);

    content_items.addClass("hidden");
    setTimeout(function(){
        if(background_type == "dark" && !container.hasClass("dark_background")){ //crunchy fix for dark background
                return; // if content was changed in the meantime
        }  
        
        item.removeClass("hidden");

        // if(item.hasClass("projects")){
        //     projectsCheckScrollable();
        // }

        updateContentContainerHeight(previous_height);
        item.on("animationend", function(event){
            //check for animation name
            if(event.originalEvent.animationName != "show_content"){
                return;
            }
            updateContentContainerHeight();
        });
    }, background_type_change_delay[background_type] * 1.25);
}



let background_type_functions = {
    "white": turnContainerBackgroundToWhite,
    "dark": turnContainerBackgroundToDark
}
let background_type_change_delay = {
    null: 0,
    "white": 0,
    "dark": 1500
}
all_menu_items.click(function(){
    const index = $(this).data("index");
    const background_type = $(this).data("background-type");
    const section = content_items.filter(function() {
        return $(this).data("index") == index;
    });

    background_type_functions[background_type]();
    activateMenuItem($(this));
    openContentItem(section, background_type);
});


$("#menu__toggle").change(function(){
    if(this.checked){
        menu.addClass("opened");
    }
    else{
        menu.removeClass("opened");
    }
});

