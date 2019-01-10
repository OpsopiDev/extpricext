var result_view = "";
var mc_root = "";
var main_template = "";
var preview_box_template = "";
var result_template = "";
var preview_loading_template = "";
var dittory_template = "";
var preview_min_box = "";
var dock_settings = "";
var view_update = false;
var price_results = [];
var oos_results = [];
var search_results = [];
var exclusive_results = [];
var is_dittory_prods = false;
var is_exclusive = false;
var is_product_tracked = false;
var view_results_first_time = true;
var release_type = "";
var ctabby_click = "";
var site_type = "";
var id_deets = {};
var housefly = chrome.extension.getURL('design_files/resources/images/logo.png');
var closebox = chrome.extension.getURL('design_files//resources/images/close_box.png');

function insert_main_container() {
    view_update = false;
    price_results = [];
    oos_results = [];
    search_results = [];
    exclusive_results = [];
    is_dittory_prods = false;
    is_exclusive = false;
    chrome.storage.local.get({
        "dock_settings": ""
    }, function (response) {
        if (response.dock_settings != "") {
            if (response.dock_settings[prod_deets.prod_site]) {
                dock_settings = response.dock_settings[prod_deets.prod_site];
                load_template();
            } else {
                var d_settings = response.dock_settings;
                d_settings[prod_deets.prod_site] = "left"
                chrome.storage.local.set({
                    "dock_settings": d_settings
                }, function (set_response) {
                    dock_settings = "left";
                    load_template();
                });
            }
        } else {
            var d_settings = {};
            d_settings[prod_deets.prod_site] = "left"
            chrome.storage.local.set({
                "dock_settings": d_settings
            }, function (set_response) {
                dock_settings = "left";
                load_template();
            });
        }
    });

    function load_template() {
        var content = $("<div/>").append(template_main_container)[0];
        do_post_template_load_task(content);
        setevents();
        insert_preview_box();
    }

    function do_post_template_load_task(main_temlpate_content) {
        all_container_templates = main_temlpate_content.cloneNode(true);
        if (dock_settings == "top") {
            $("body").append("<div id=\"mc_main_host\" style=\"position:fixed; left:0px; top:200px; z-index:9999;\" > <div id=\"mc_host\" style=\"\" ></div> </div>");
            var host = document.getElementById('mc_host');
            main_template = main_temlpate_content.querySelector('template#main_template_dock_top').content;
            main_template.querySelector("#owl_css_style").href = chrome.extension.getURL('design_files/css/owl.carousel.min.css');
            main_template.querySelector(".owl_css_style").textContent = "@import \"" + chrome.extension.getURL('design_files/css/owl.carousel.min.css'); + "\"";
        }
        if (dock_settings == "left") {
            $("body").append("<div id=\"mc_main_host\" style=\"position:fixed; left:0px; top:200px; z-index:99999999999999;\" > <div id=\"mc_host\" style=\"\" ></div> </div>");
            var host = document.getElementById('mc_host');
            main_template = main_temlpate_content.querySelector('template#main_template_dock_left').content;
        }
        if (dock_settings == "right") {
            $("body").append("<div id=\"mc_main_host\" style=\"position:fixed; right:0px; top:200px; z-index:9999;\" > <div id=\"mc_host\" style=\"\" ></div> </div>");
            var host = document.getElementById('mc_host');
            main_template = main_temlpate_content.querySelector('template#main_template_dock_left').content;
        }
        if (dock_settings == "bottom") {
            $("body").append("<div id=\"mc_main_host\" style=\"position:fixed; left:0px; bottom:200px; z-index:9999;\" > <div id=\"mc_host\" style=\"\" ></div> </div>");
            var host = document.getElementById('mc_host');
            main_template = main_temlpate_content.querySelector('template#main_template_dock_bot').content;
            main_template.querySelector("#owl_css_style").href = chrome.extension.getURL('design_files/css/owl.carousel.min.css');
            main_template.querySelector(".owl_css_style").textContent = "@import \"" + chrome.extension.getURL('design_files/css/owl.carousel.min.css'); + "\"";
        }
        var dock_icon_0 = chrome.extension.getURL('design_files/resources/images/icons0.png');
        var dock_icon_1 = chrome.extension.getURL('design_files/resources/images/icons1.png');
        var dock_icon_2 = chrome.extension.getURL('design_files/resources/images/icons2.png');
        var dock_icon_3 = chrome.extension.getURL('design_files/resources/images/icons3.png');
        var dock_icon_4 = chrome.extension.getURL('design_files/resources/images/icon4.png');
        main_template.querySelector("#fa_style").href = chrome.extension.getURL('design_files/css/font-awesome.min.css');
        main_template.querySelector("#main_css_style").href = chrome.extension.getURL('design_files/css/popup.css');
        main_template.querySelector(".main_css_style").textContent = "@import \"" + chrome.extension.getURL('design_files/css/popup.css') + "\"";
        main_template.querySelector(".fa_style").textContent = "@import \"" + chrome.extension.getURL('design_files/css/font-awesome.min.css') + "\"";
        main_template.querySelector("#green_arrow img").src = chrome.extension.getURL('design_files/resources/images/arrow-green.png');
        main_template.querySelector("#dock_main img").src = dock_icon_0;
        main_template.querySelector("#dock_row_1 img").src = dock_icon_0;
        main_template.querySelector("#dock_row_2 img").src = dock_icon_1;
        main_template.querySelector("#dock_row_3 img").src = dock_icon_2;
        main_template.querySelector("#dock_row_4 img").src = dock_icon_3;
        main_template.querySelector("#dock_row_5 img").src = dock_icon_4;
        var fa = document.createElement('style');
        fa.type = 'text/css';
        fa.textContent = '@font-face { font-family: FontAwesome; src: url("' +
            chrome.extension.getURL('design_files/fonts/fontawesome-webfont.woff') +
            '"); }';
        $('head').append(fa);
        var bp = document.createElement('style');
        bp.type = 'text/css';
        bp.textContent = '@font-face { font-family: baloo; src: url("' +
            chrome.extension.getURL('design_files/fonts/BalooPaaji-Regular.ttf') +
            '"); }';
        $('head').append(bp);
        var bp = document.createElement('style');
        bp.type = 'text/css';
        bp.textContent = '@font-face { font-family: baloo; src: url("' +
            chrome.extension.getURL('design_files/fonts/BalooPaaji-Regular.ttf') +
            '"); }';
        $('head').append(bp);
        la_tag = "<style>\
            @font-face {\
              font-family: 'Lato';\
              font-style: normal;\
              font-weight: 400;\
              src: local('Lato Regular'), local('Lato-Regular'), url(" + chrome.extension.getURL('design_files/fonts/lato/UyBMtLsHKBKXelqf4x7VRQ.woff2') + ") format('woff2');\
              unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\
            }\
            @font-face {\
              font-family: 'Lato';\
              font-style: normal;\
              font-weight: 400;\
              src: local('Lato Regular'), local('Lato-Regular'), url(" + chrome.extension.getURL('design_files/fonts/lato/1YwB1sO8YE1Lyjf12WNiUA.woff2') + ") format('woff2');\
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\
            }\
         </style>";
        $("head").append(la_tag);
        la_tag = "<style id='la_tag'>\
            @font-face {\
              font-family: 'mc_lato';\
              font-style: normal;\
              font-weight: 400;\
              src: local('Lato Regular'), local('Lato-Regular'), url(" + chrome.extension.getURL('design_files/fonts/lato/UyBMtLsHKBKXelqf4x7VRQ.woff2') + ") format('woff2');\
              unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\
            }\
            @font-face {\
              font-family: 'mc_lato';\
              font-style: normal;\
              font-weight: 400;\
              src: local('Lato Regular'), local('Lato-Regular'), url(" + chrome.extension.getURL('design_files/fonts/lato/1YwB1sO8YE1Lyjf12WNiUA.woff2') + ") format('woff2');\
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\
            }\
         </style>";
        $("head").append(la_tag);
        $("#mc_main_host").css("display", "none");
        if (shadow_dom_support == "v1") {
            var container_dom = host.attachShadow({
                "mode": "open"
            });
        } else if (shadow_dom_support == "v0") {
            var container_dom = host.createShadowRoot({
                "mode": "open"
            });
        }
        container_dom.appendChild(main_template.cloneNode(true));
        mc_root = container_dom.querySelector("#mc_root");
        result_view = container_dom.querySelector("#results_view_root");
        if (dock_settings == "top") {
            initialize_carousel();
        }
        if (dock_settings == "bottom") {
            initialize_carousel();
        }
        if (dock_settings == "right") {
            $(result_view).find("#green_arrow img").css("transform", "rotate(180deg)");
        } else {}
    }
}

function insert_preview_box() {
    var content = $("<div/>").append(template_preview_box)[0];
    do_post_template_load_task(content);
    make_preview_draggable();
    make_results_template();

    function do_post_template_load_task(main_temlpate_content) {
        preview_loading_template = main_temlpate_content.querySelector('template#loading_template').content;
        var loading_template = preview_loading_template.cloneNode(true);
        loading_template.querySelector("#pv_makkhi_logo img").src = chrome.extension.getURL('design_files/resources/images/logo.png');
        loading_template.querySelector("#pv_prod_image img").src = prod_deets.prod_img;
        loading_template.querySelector("#pv_load_image img").src = chrome.extension.getURL('design_files/resources/images/spinner.png');
        var preview_root = $(loading_template).insertBefore(result_view);
        preview_box_template = main_temlpate_content.querySelector('template#price_update_template').content;
        preview_min_box = main_temlpate_content.querySelector('template#preview_mini_box').content;
        loading_template = preview_min_box.cloneNode(true);
        loading_template.querySelector("#pv_makkhi_logo img").src = chrome.extension.getURL('design_files/resources/images/logo.png');
        loading_template.querySelector("#pv_popup_close img").src = chrome.extension.getURL('design_files/resources/images/popup-close.png');
        loading_template.querySelector("#price").textContent = "loading";
        var preview_min_root = $(loading_template).insertBefore(result_view);
    }
}

function make_preview_box(price, image) {
    var preview_box = preview_box_template.cloneNode(true);
    preview_box.querySelector("#pv_makkhi_logo img").src = chrome.extension.getURL('design_files/resources/images/logo.png');
    preview_box.querySelector("#pv_prod_image img").src = image
    if (!isNaN(price)) {
        preview_box.querySelector("#pv_prod_price").textContent = '$' + price;
        if (price < prod_deets.prod_price) {
            preview_box.querySelector("#pv_prod_price").style.color = "#8fc952";
        } else {
            preview_box.querySelector("#pv_prod_price").style.color = "#f73f52";
        }
    } else {
        preview_box.querySelector("#pv_prod_price").textContent = price;
        preview_box.querySelector("#pv_prod_price").style.color = "black";
    }
    return preview_box
}

function update_preview_box(box) {
    $(mc_root).find("#preview_root").html(box);
}

function update_preview_min(price) {
    $(mc_root).find("#preview_min_root #price").text("$" + price);
    if (parseInt(price) < parseInt(prod_deets.prod_price)) {
        $(mc_root).find("#preview_min_root #price").css("color", "#8fc952");
    } else {
        $(mc_root).find("#preview_min_root #price").css("color", "#f73f52");
    }
}

function make_results_template() {
    var content = $("<div/>").append(template_results_template)[0];
    do_post_template_load_task(content);
    check_user_settings_show_results();

    function do_post_template_load_task(template_html) {
        all_result_templates = template_html.cloneNode(true);
        if (dock_settings == "left") {
            result_template = template_html.querySelector('template#makkhi_results').content;
            dittory_template = template_html.querySelector('template#dittory_results_left').content;
        }
        if (dock_settings == "top") {
            result_template = template_html.querySelector('template#makkhi_results').content;
            dittory_template = template_html.querySelector('template#dittory_results_top').content;
        }
        if (dock_settings == "right") {
            result_template = template_html.querySelector('template#makkhi_results').content;
            dittory_template = template_html.querySelector('template#dittory_results_left').content;
        }
        if (dock_settings == "bottom") {
            result_template = template_html.querySelector('template#makkhi_results').content;
            dittory_template = template_html.querySelector('template#dittory_results_top').content;
        }
    }
}

function make_results_box(curr_prod_deets_var, afftridtype = ' ', oos = false) {
    if (afftridtype === 'searchid') {
        curr_prod_deets_var["link"] = curr_prod_deets_var.prod_link;
        curr_prod_deets_var["from_back_search"] = true;
    } else {
        curr_prod_deets_var["from_back_search"] = false;
    }
    if (!oos) {
        var current_result_price = parseInt(curr_prod_deets_var.prod_price);
        var page_price = parseInt(prod_deets.prod_price);
        var website = "";
        if (afftridtype === 'searchid') {
            website = curr_prod_deets_var.prod_site;
        } else {
            website = curr_prod_deets_var.website
        }
    }
    if (!view_update) {
        if (!oos) {
            price_results.push(curr_prod_deets_var);
        } else {
            oos_results.push(curr_prod_deets_var);
        }
    }
    var repl_strng, redir_link;
    if (afftridtype === 'searchid') {
        curr_prod_deets_var.website = curr_prod_deets_var.prod_site;
    }
    redir_link = curr_prod_deets_var.link;
    var site_name = prod_site_list[curr_prod_deets_var.website];
    if (site_name) {
        site_name = site_name.charAt(0).toUpperCase() + site_name.slice(1);
    } else if (curr_prod_deets_var.prod_site) {
        site_name = curr_prod_deets_var.prod_site;
    } else {
        curr_prod_deets_var;
    }
    var result_box = result_template.cloneNode(true);
    result_box.querySelector("a").href = redir_link;
    result_box.querySelector(".site_name").textContent = site_name;
    result_box.querySelector(".prod_title").textContent = curr_prod_deets_var.title;
    result_box.querySelector("a").setAttribute("title", curr_prod_deets_var.title);
    if (oos == false) {
        result_box.querySelector("div").classList.add("price_result");
        result_box.querySelector(".main-price").textContent = "$" + parseInt(curr_prod_deets_var.prod_price);
        if (curr_prod_deets_var.prod_price < prod_deets.prod_price) {
            result_box.querySelector(".main-price").classList.add("green-title");
        } else {
            result_box.querySelector(".main-price").classList.add("red-title");
        }
    } else {
        result_box.querySelector("div").classList.add("oos_result");
        result_box.querySelector(".main-price").textContent = "Sold";
        result_box.querySelector(".main-price").style.color = "gray";
    }
    result_box.querySelector(".image img").src = curr_prod_deets_var.img_src;
    return result_box.cloneNode(true);
}

function make_manual_search_box(curr_prod_deets_var, link_type, afftridtype = ' ') {
    curr_prod_deets_var["website"] = curr_prod_deets_var["prod_site"];
    if (!view_update) {
        search_results.push(curr_prod_deets_var);
    }
    var repl_strng, redir_link;
    var site_name = "";
    redir_link = curr_prod_deets_var.prod_link;
    var site_name = prod_site_list[curr_prod_deets_var.prod_site];
    if (site_name) {
        site_name = site_name.charAt(0).toUpperCase() + site_name.slice(1);
    }
    var result_box = result_template.cloneNode(true);
    result_box.querySelector("a").href = redir_link;
    result_box.querySelector(".site_name").textContent = site_name;
    result_box.querySelector(".prod_title").textContent = curr_prod_deets_var.title;
    result_box.querySelector(".main-price").textContent = "Search"
    result_box.querySelector(".image img").src = curr_prod_deets_var.img_src;
    result_box.querySelector(".image img").classList.add("opaque");
    result_box.querySelector("div").classList.add("manual_search_result");
    return result_box.cloneNode(true);
}
r_box = "";

function insert_price_result_box(result_box) {
    var results_list = [];
    if (!result_box) {
        return;
    }
    if ($("#mc_main_host").css("display") == 'none') {
        $("#mc_main_host").css("display", "block");
    }
    result_box = result_box.querySelector("div.item");
    r_box = result_box;
    var current_price = parseInt($(result_box).find(".main-price").text().slice(1));
    var current_image = $(result_box).find(".image img").attr("src");
    results_list = $(mc_root).find("#results_container #price_results div.item");
    if (results_list.length == 0) {
        $(result_view).find("#results_container #price_results").append(result_box);
        update_preview_box(make_preview_box(current_price, current_image));
        update_preview_min(current_price);
    } else {
        var result_inserted = false;
        for (var i = 0; i < results_list.length; i++) {
            var result_list_el_price = parseInt($(results_list[i]).find(".main-price").text().slice(1));
            if (current_price < result_list_el_price) {
                $(result_box).insertBefore(results_list[i]);
                if (i == 0) {
                    update_preview_box(make_preview_box(current_price, current_image));
                    update_preview_min(current_price);
                }
                var result_inserted = true;
                break;
            }
        }
        if (!result_inserted) {
            $(result_view).find("#results_container #price_results").append(result_box);
        }
    }
    if (dock_settings == "top") {
        insert_to_carousel();
        return;
    }
    if (dock_settings == "bottom") {
        insert_to_carousel();
        return;
    }
}

function insert_manual_search_box(box) {
    // $(result_view).find("#results_container #manual_search").append(box);
    $(result_view).find("#results_container #manual_search").append(box);
    if ($(mc_root).find("#preview_min_root #price").text() == "loading") {
        $(mc_root).find("#preview_min_root #price").text("Search");
        update_preview_box(make_preview_box("search", prod_deets.prod_img));
    }
    if (dock_settings == "top") {
        insert_to_carousel();
        return;
    }
    if (dock_settings == "bottom") {
        insert_to_carousel();
        return;
    }
}

function insert_oos_box(box) {
    $(result_view).find("#results_container #oos").append(box);
    if (dock_settings == "top") {
        insert_to_carousel();
        return;
    }
}

function hide_preview_display_results() {
    //making preview box it draggable
    if (view_results_first_time) {
        view_results_first_time = false;
    }
    if (dock_settings == "left") {
        $("#mc_main_host").animate({
            "left": -500
        }, "fast", function () {
            $(mc_root).find("#preview_root").css("display", "none");
            $(mc_root).find("#results_view_root").css("display", "block");
            $("#mc_main_host").animate({
                "left": 0,
                "top": 100
            }, "fast", function () {});
        });
    }
    if (dock_settings == "top") {
        $("#mc_main_host").animate({
            "left": -500
        }, "fast", function () {
            $(mc_root).find("#preview_root").css("display", "none");
            $("#mc_main_host").css({
                left: "0px",
                top: "30px",
                width: "100%"
            });
            $("#mc_host").css({
                width: "1100px",
                margin: "0 auto"
            });
            $(mc_root).find("#results_view_root").css("display", "block");
            $("#mc_main_host").animate({
                "top": 30
            }, "fast", function () {});
        });
    }
    if (dock_settings == "right") {
        $("#mc_main_host").animate({
            "right": -500
        }, "fast", function () {
            $(mc_root).find("#preview_root").css("display", "none");
            $(mc_root).find("#results_view_root").css("display", "block");
            $("#mc_main_host").animate({
                "right": 0,
                "top": 100
            }, "fast", function () {});
        });
    }
    if (dock_settings == "bottom") {
        $("#mc_main_host").animate({
            "bottom": -500
        }, "fast", function () {
            $(mc_root).find("#preview_root").css("display", "none");
            $("#mc_main_host").css({
                left: "0px",
                bottom: "30px",
                width: "100%"
            });
            $("#mc_host").css({
                width: "1100px",
                margin: "0 auto"
            });
            $(mc_root).find("#results_view_root").css("display", "block");
            $("#mc_main_host").animate({
                "bottom": 30
            }, "fast", function () {});
        });
    }
}

function hide_results_display_preview() {
    if (dock_settings == "left") {
        $("#mc_main_host").animate({
            "left": -500
        }, "fast", function () {
            $(mc_root).find("#results_view_root").css("display", "none");
            $(mc_root).find("#preview_root").css("display", "block");
            $("#mc_main_host").animate({
                "left": 0
            }, "fast");
        });
    }
    if (dock_settings == "top") {
        $(mc_root).find("#results_view_root").css("display", "none");
        $("#mc_main_host").css({
            left: "0px",
            top: "100px",
            width: "150px"
        });
        $("#mc_host").css({
            width: "150px",
            margin: "0 auto"
        });
        $(mc_root).find("#preview_root").css("display", "block");
        $("#mc_host").animate({
            "left": "0px"
        }, "fast");
    }
    if (dock_settings == "right") {
        $("#mc_main_host").animate({
            "right": -500
        }, "fast", function () {
            $(mc_root).find("#results_view_root").css("display", "none");
            $(mc_root).find("#preview_root").css("display", "block");
            $("#mc_main_host").animate({
                "right": 0
            }, "fast");
        });
    }
    if (dock_settings == "bottom") {
        $(mc_root).find("#results_view_root").css("display", "none");
        $("#mc_main_host").css({
            left: "0px",
            top: "100px",
            width: "150px"
        });
        $("#mc_host").css({
            width: "150px",
            margin: "0 auto"
        });
        $(mc_root).find("#preview_root").css("display", "block");
        $("#mc_host").animate({
            "left": "0px"
        }, "fast");
    }
}

function hide_preview_min_display_results() {
    if (view_results_first_time) {
        view_results_first_time = false;
    }
    if (dock_settings == "left") {
        $(mc_root).find("#preview_min_root").css("display", "none");
        $(mc_root).css({
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $("#mc_host").css({
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $("#mc_main_host").css({
            "left": "-500px",
            "top": "",
            "bottom": "50px",
            "right": "auto",
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $(mc_root).find("#results_view_root").css("display", "block");
        $("#mc_main_host").animate({
            "left": 0
        }, "fast");
    }
    if (dock_settings == "top") {
        $(mc_root).find("#preview_min_root").css("display", "none");
        $("#mc_main_host").css({
            "top": "-500px",
            "bottom": "auto"
        });
        $(mc_root).css({
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $("#mc_host").css({
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $("#mc_main_host").css({
            left: "0px",
            width: "100%"
        });
        $("#mc_host").css({
            width: "1100px",
            margin: "0 auto"
        });
        $(mc_root).find("#results_view_root").css("display", "block");
        $("#mc_main_host").animate({
            "top": 30
        }, "fast");
    }
    if (dock_settings == "right") {
        $(mc_root).find("#preview_min_root").css("display", "none");
        $(mc_root).css({
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $("#mc_host").css({
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $("#mc_main_host").css({
            "right": "-500px",
            "top": "",
            "bottom": "50px",
            "left": "auto",
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $(mc_root).find("#results_view_root").css("display", "block");
        $("#mc_main_host").animate({
            "right": 0
        }, "fast");
    }
    if (dock_settings == "bottom") {
        $(mc_root).find("#preview_min_root").css("display", "none");
        $(mc_root).css({
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $("#mc_host").css({
            "width": $(mc_root).find("#results_view_root").css("width")
        });
        $("#mc_main_host").css({
            "bottom": "-500px",
            "top": "auto"
        });
        $("#mc_main_host").css({
            left: "0px",
            width: "100%"
        });
        $("#mc_host").css({
            width: "1100px",
            margin: "0 auto"
        });
        $(mc_root).find("#results_view_root").css("display", "block");
        $("#mc_main_host").animate({
            "bottom": 30
        }, "fast");
    }
}

function hide_results_display_preview_min() {
    $(mc_root).find("#results_view_root").css("display", "none");
    $("#mc_main_host").css({
        left: "0px",
        top: "0px",
        "right": "auto",
        "bottom": "auto",
        "width": "0px"
    });
    $(mc_root).css({
        "width": "0px"
    });
    $("#mc_host").css({
        "width": "0px"
    });
    $(mc_root).find("#preview_min_root").css("display", "block");
}

function update_data_for_spa(prod_deets_to_process) {
    prod_deets = _.clone(prod_deets_to_process);
    view_results_first_time = true;
    if (preview_box_template != "" && result_template != "" && main_template != "") {
        view_update = false;
        price_results = [];
        oos_results = [];
        search_results = [];
        exclusive_results = [];
        is_dittory_prods = false;
        is_exclusive = false;
        $("#mc_main_host").remove();
        update_main_template();
        setevents();
        var preview_box = preview_loading_template.cloneNode(true);
        preview_box.querySelector("#pv_makkhi_logo img").src = chrome.extension.getURL('design_files/resources/images/logo.png');
        preview_box.querySelector("#pv_prod_image img").src = prod_deets.prod_img;
        preview_box.querySelector("#pv_load_image img").src = chrome.extension.getURL('design_files/resources/images/spinner.png');
        $(preview_box).insertBefore(result_view);
        var loading_template = preview_min_box.cloneNode(true);
        loading_template.querySelector("#pv_makkhi_logo img").src = chrome.extension.getURL('design_files/resources/images/logo.png');
        loading_template.querySelector("#pv_popup_close img").src = chrome.extension.getURL('design_files/resources/images/popup-close.png');
        loading_template.querySelector("#price").textContent = "loading";
        var preview_min_root = $(loading_template).insertBefore(result_view);
        make_preview_draggable();
        update_results_template();
        if (dock_settings == "top") {
            initialize_carousel();
        }
        if (dock_settings == "bottom") {
            initialize_carousel();
        }
        check_user_settings_show_results();
    } else {
        insert_main_container();
    }
}

function update_main_template() {
    var main_temlpate_content = all_container_templates.cloneNode(true);
    if (dock_settings == "top") {
        $("body").append("<div id=\"mc_main_host\" style=\"position:fixed; left:0px; top:200px; z-index:9999;\" > <div id=\"mc_host\" style=\"\" ></div> </div>");
        var host = document.getElementById('mc_host');
        main_template = main_temlpate_content.querySelector('template#main_template_dock_top').content;
        main_template.querySelector("#owl_css_style").href = chrome.extension.getURL('design_files/css/owl.carousel.min.css');
        main_template.querySelector(".owl_css_style").textContent = "@import \"" + chrome.extension.getURL('design_files/css/owl.carousel.min.css'); + "\"";
    }
    if (dock_settings == "left") {
        $("body").append("<div id=\"mc_main_host\" style=\"position:fixed; left:0px; top:200px; z-index:9999;\" > <div id=\"mc_host\" style=\"\" ></div> </div>");
        var host = document.getElementById('mc_host');
        main_template = main_temlpate_content.querySelector('template#main_template_dock_left').content;
    }
    if (dock_settings == "right") {
        $("body").append("<div id=\"mc_main_host\" style=\"position:fixed; right:0px; top:200px; z-index:9999;\" > <div id=\"mc_host\" style=\"\" ></div> </div>");
        var host = document.getElementById('mc_host');
        main_template = main_temlpate_content.querySelector('template#main_template_dock_left').content;
    }
    if (dock_settings == "bottom") {
        $("body").append("<div id=\"mc_main_host\" style=\"position:fixed; left:0px; bottom:200px; z-index:9999;\" > <div id=\"mc_host\" style=\"\" ></div> </div>");
        var host = document.getElementById('mc_host');
        main_template = main_temlpate_content.querySelector('template#main_template_dock_bot').content;
        main_template.querySelector("#owl_css_style").href = chrome.extension.getURL('design_files/css/owl.carousel.min.css');
        main_template.querySelector(".owl_css_style").textContent = "@import \"" + chrome.extension.getURL('design_files/css/owl.carousel.min.css'); + "\"";
    }
    var dock_icon_0 = chrome.extension.getURL('design_files/resources/images/icons0.png');
    var dock_icon_1 = chrome.extension.getURL('design_files/resources/images/icons1.png');
    var dock_icon_2 = chrome.extension.getURL('design_files/resources/images/icons2.png');
    var dock_icon_3 = chrome.extension.getURL('design_files/resources/images/icons3.png');
    var dock_icon_4 = chrome.extension.getURL('design_files/resources/images/icon4.png');
    main_template.querySelector("#fa_style").href = chrome.extension.getURL('design_files/css/font-awesome.min.css');
    main_template.querySelector("#main_css_style").href = chrome.extension.getURL('design_files/css/popup.css');
    main_template.querySelector(".main_css_style").textContent = "@import \"" + chrome.extension.getURL('design_files/css/popup.css') + "\"";
    main_template.querySelector(".fa_style").textContent = "@import \"" + chrome.extension.getURL('design_files/css/font-awesome.min.css') + "\"";
    main_template.querySelector("#green_arrow img").src = chrome.extension.getURL('design_files/resources/images/arrow-green.png');
    main_template.querySelector("#dock_main img").src = dock_icon_0;
    main_template.querySelector("#dock_row_1 img").src = dock_icon_0;
    main_template.querySelector("#dock_row_2 img").src = dock_icon_1;
    main_template.querySelector("#dock_row_3 img").src = dock_icon_2;
    main_template.querySelector("#dock_row_4 img").src = dock_icon_3;
    main_template.querySelector("#dock_row_5 img").src = dock_icon_4;
    $("#mc_main_host").css("display", "none");
    if (shadow_dom_support == "v1") {
        var container_dom = host.attachShadow({
            "mode": "open"
        });
    } else if (shadow_dom_support == "v0") {
        var container_dom = host.createShadowRoot({
            "mode": "open"
        });
    }
    container_dom.appendChild(main_template.cloneNode(true));
    mc_root = container_dom.querySelector("#mc_root");
    result_view = container_dom.querySelector("#results_view_root");
    if (dock_settings == "top") {
        initialize_carousel();
    }
    if (dock_settings == "bottom") {
        initialize_carousel();
    }
    if (dock_settings == "right") {
        $(result_view).find("#green_arrow img").css("transform", "rotate(180deg)");
    }
}

function update_results_template() {
    var template_html = all_result_templates.cloneNode(true);
    if (dock_settings == "left") {
        result_template = template_html.querySelector('template#makkhi_results').content;
        dittory_template = template_html.querySelector('template#dittory_results_left').content;
    }
    if (dock_settings == "top") {
        result_template = template_html.querySelector('template#makkhi_results').content;
        dittory_template = template_html.querySelector('template#dittory_results_top').content;
    }
    if (dock_settings == "right") {
        result_template = template_html.querySelector('template#makkhi_results').content;
        dittory_template = template_html.querySelector('template#dittory_results_left').content;
    }
    if (dock_settings == "bottom") {
        result_template = template_html.querySelector('template#makkhi_results').content;
        dittory_template = template_html.querySelector('template#dittory_results_top').content;
    }
}
function setevents() {
    $(document).on("click", doc_click_handler);
    set_button_events();
    $(result_view).on('mousewheel', '#results_container', function (e) {
        var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
    });
    $(result_view).find(".dropdown-menu #dock_main").click(function () {
        if ($(result_view).find(".dropdown-menu ul").css("display") == "none") {
            $(result_view).find(".dropdown-menu ul").css("display", "block");
        } else if ($(result_view).find(".dropdown-menu ul").css("display") == "block") {
            $(result_view).find(".dropdown-menu ul").css("display", "none");
        }
    });
    $(result_view).find(".dropdown-menu #dock_row_1").click(function () {
        if (dock_settings != "left") {
            chrome.storage.local.get({
                "dock_settings": ""
            }, function (response) {
                if (response.dock_settings != "") {
                    var d_settings = response.dock_settings;
                    d_settings[prod_deets.prod_site] = "left"
                    chrome.storage.local.set({
                        "dock_settings": d_settings
                    }, function (set_response) {
                        dock_settings = "left";
                        update_view_data();
                    });
                } else {
                    var d_settings = {};
                    d_settings[prod_deets.prod_site] = "left"
                    chrome.storage.local.set({
                        "dock_settings": d_settings
                    }, function (set_response) {
                        dock_settings = "left";
                        update_view_data();
                    });
                }
            });
        }
    });
    $(result_view).find(".dropdown-menu #dock_row_2").click(function () {
        if (dock_settings != "right") {
            chrome.storage.local.get({
                "dock_settings": ""
            }, function (response) {
                if (response.dock_settings != "") {
                    var d_settings = response.dock_settings;
                    d_settings[prod_deets.prod_site] = "right"
                    chrome.storage.local.set({
                        "dock_settings": d_settings
                    }, function (set_response) {
                        dock_settings = "right";
                        update_view_data();
                    });
                } else {
                    var d_settings = {};
                    d_settings[prod_deets.prod_site] = "right"
                    chrome.storage.local.set({
                        "dock_settings": d_settings
                    }, function (set_response) {
                        dock_settings = "right";
                        update_view_data();
                    });
                }
            });
        }
    });
    $(result_view).find(".dropdown-menu #dock_row_3").click(function () {
        if (dock_settings != "top") {
            chrome.storage.local.get({
                "dock_settings": ""
            }, function (response) {
                if (response.dock_settings != "") {
                    var d_settings = response.dock_settings;
                    d_settings[prod_deets.prod_site] = "top"
                    chrome.storage.local.set({
                        "dock_settings": d_settings
                    }, function (set_response) {
                        dock_settings = "top";
                        update_view_data();
                    });
                } else {
                    var d_settings = {};
                    d_settings[prod_deets.prod_site] = "top"
                    chrome.storage.local.set({
                        "dock_settings": d_settings
                    }, function (set_response) {
                        dock_settings = "top";
                        update_view_data();
                    });
                }
            });
        }
    });
    $(result_view).find(".dropdown-menu #dock_row_4").click(function () {
        if (dock_settings != "bottom") {
            chrome.storage.local.get({
                "dock_settings": ""
            }, function (response) {
                if (response.dock_settings != "") {
                    var d_settings = response.dock_settings;
                    d_settings[prod_deets.prod_site] = "bottom"
                    chrome.storage.local.set({
                        "dock_settings": d_settings
                    }, function (set_response) {
                        dock_settings = "bottom";
                        update_view_data();
                    });
                } else {
                    var d_settings = {};
                    d_settings[prod_deets.prod_site] = "bottom"
                    chrome.storage.local.set({
                        "dock_settings": d_settings
                    }, function (set_response) {
                        dock_settings = "bottom";
                        update_view_data();
                    });
                }
            });
        }
    });
    $(result_view).find(".dropdown-menu #dock_row_5").click(function () {
    });
    $(mc_root).on("click", "#preview_root", function (e) {
        if (!$(mc_root).find("#preview_root").hasClass('closed')) {
            $(mc_root).find("#preview_root").addClass('closed')
            hide_preview_display_results();
        }
    });
    $(mc_root).on("mouseenter", "#preview_root", function (e) {
        $(this).data('timeout', setTimeout(function () {
            if (!$(mc_root).find("#preview_root").hasClass('closed')) {
                $(mc_root).find("#preview_root").addClass('closed')
                hide_preview_display_results();
            } else {
                clearTimeout($(this).data('timeout'));
            }
        }, 1000));
    });
    $(mc_root).on("mouseleave", "#preview_root", function (e) {
        clearTimeout($(this).data('timeout'));
    });
    $(mc_root).on("mouseenter", "#preview_min_root", function (e) {
        $(mc_root).find("#preview_min_root .pop-up").css("box-shadow", "3px 3px #e0e0e0");
    });
    $(mc_root).on("mouseleave", "#preview_min_root", function (e) {
        $(mc_root).find("#preview_min_root .pop-up").css("box-shadow", "");
    });
    $(mc_root).on("click", "#preview_min_root", function (event) {
        ctabby_click = 'button_click';
        if ($(event.target).is("#pv_track_button") || $(event.target).is("span#track_icon")) {
            ctabby_click = 'pvm_track_button_click';
        }
    });
    $(mc_root).on("click", "#green_arrow", function (e) {
        hide_results_display_preview_min();
    });
}

function insert_to_carousel(result) {
    var carousel_html = $(result_view).find("#results_container #exclusive").html();
    carousel_html += $(result_view).find("#results_container #price_results").html();
    carousel_html += $(result_view).find("#results_container #oos").html();
    carousel_html += $(result_view).find("#results_container #manual_search").html();
    owl.trigger('replace.owl.carousel', [jQuery($.trim(carousel_html))]).trigger('refresh.owl.carousel');
    owl.trigger("to.owl.carousel", [0]);
    if ($(result_view).find(".mc_owl_prev").length == 0) {
        insert_owl_custom_nav_buttons();
    }
}
var owl = "";

function initialize_carousel() {
    owl = $(result_view).find('.products .owl-carousel');
    owl.owlCarousel({
        loop: false,
        stagePadding: 30,
        nav: true,
        navText: ["<a class='btn prev'><img src='" + chrome.extension.getURL("design_files/resources/images/arrow-green.png") + "'/></a>",
            "<a class='btn next'><img src='" + chrome.extension.getURL("design_files/resources/images/arrow-green.png") + "'/></a>"
        ],
        items: 1,
        responsive: {
            0: {
                items: 1
            },
            650: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            owl.trigger('prev.owl.carousel');
        } else {
            owl.trigger('next.owl.carousel');
        }
        e.preventDefault();
    });
}

function insert_owl_custom_nav_buttons() {
    $(result_view).find(".owl-nav").remove()
    $(result_view).find(".owl-carousel").append('<a href="javascript:;" class="mc_owl_prev" style="position:absolute; top:50%; left:15px;">\
                <img src="' + chrome.extension.getURL("design_files/resources/images/arrow-green.png") + '">\
            </a>')
    $(result_view).find(".owl-carousel").append('<a href="javascript:;" class="mc_owl_next" style="position:absolute; top:50%; right:15px;">\
                <img style="transform: rotate(180deg);"src="' + chrome.extension.getURL("design_files/resources/images/arrow-green.png") + '">\
            </a>')
    $(result_view).on('click', '.mc_owl_prev', function () {
        owl.trigger("prev.owl.carousel");
    });
    $(result_view).on('click', '.mc_owl_next', function () {
        owl.trigger("next.owl.carousel");
    });
}

function update_view_data() {
    $("#mc_main_host").remove();
    update_main_template();
    setevents();
    var preview_box = preview_loading_template.cloneNode(true);
    preview_box.querySelector("#pv_makkhi_logo img").src = chrome.extension.getURL('design_files/resources/images/logo.png');
    preview_box.querySelector("#pv_prod_image img").src = prod_deets.prod_img;
    preview_box.querySelector("#pv_load_image img").src = chrome.extension.getURL('design_files/resources/images/spinner.png');
    preview_box.querySelector("div").style.display = "none";
    $(preview_box).insertBefore(result_view);
    var loading_template = preview_min_box.cloneNode(true);
    loading_template.querySelector("#pv_makkhi_logo img").src = chrome.extension.getURL('design_files/resources/images/logo.png');
    loading_template.querySelector("#pv_popup_close img").src = chrome.extension.getURL('design_files/resources/images/popup-close.png');
    loading_template.querySelector("#price").textContent = "loading";
    var preview_min_root = $(loading_template).insertBefore(result_view);
    make_preview_draggable();
    update_results_template();
    if (dock_settings == "top") {
        initialize_carousel();
    }
    if (dock_settings == "bottom") {
        initialize_carousel();
    }
    if (is_exclusive) {
        insert_exclusive_msg();
    }
    view_update = true;
    if (price_results.length == 0) {
        // 
        $(mc_root).find("#preview_min_root #price").text("aww");
        $(mc_root).find("#preview_min_root #price").css("color", "gray");
    }
    if (!is_dittory_prods) {
        for (var i = 0; i < price_results.length; i++) {
            insert_price_result_box(make_results_box(price_results[i], '', false))
        }
        for (var i = 0; i < oos_results.length; i++) {
            insert_oos_box(make_results_box(oos_results[i], '', true))
        }
        for (var i = 0; i < search_results.length; i++) {
            insert_manual_search_box(make_manual_search_box(search_results[i], '', false))
        }
    }
    hide_preview_display_results();
    $("#mc_main_host").css("display", "block");
    view_update = true;
}

function get_report() {
    var report_box = '  <div id="mc_report_popup_container" style="width:100%; position:fixed; top:30%; box-sizing:content-box; z-index:99999;">\
            <div id="mc_email_popup" style="margin:auto; border-width: 1px; border-bottom: 4px solid #82ceee; padding:20px; border-radius: 5px;  width:350px; box-shadow: 0px 0px 38px 2px; background: #fff url(' + housefly + ') no-repeat right 5px bottom 5px; background-size: 45px; box-sizing:content-box;">\
                    <div id ="mc_report_popup_close_box" style=" box-sizing:content-box; height: 16px; width: 16px;cursor: pointer;background:url(' + closebox + ');position:relative; top:-5px; left:330px;" title="Close"></div>\
                    <div style="font-family: baloo; font-size: 18px; color:#2e3437;">Please tell us what was wrong </div>\
                    <select name="" id="" style="width:100%; outline:none; background-color:white; border: 0; border-bottom: 1px solid #c5d0d0; width:100%; font-family: \'Lato\'; width:100%; font-family: baloo;  color:#2e3437; font-size:12px;">\
                        <option value="Results are not relevant to the search">Results are not relevant to the search</option>\
                        <option value="Images do not match with product">Images do not match with product</option>\
                        <option value="Results are from wrong category">Results are from wrong category</option>\
                        <option value="I cannot find what I\'m looking for">I cannot find what I\'m looking for</option>\
                        <option value="Others">Others</option>\
                    </select>\
                    <div style="font-family: baloo; font-size: 18px; color:#2e3437; margin: 5px 0 0px 0px;">Additional Comments </div>\
                    <textarea type="text" placeholder="Additional Comments" style="border: 1px solid #c5d0d0; width:100%; font-family: \'Lato\'; margin: 0px 0 25px 0px; outline: none; background-color: white; "></textarea>\
                    <button class="submit" style="color: #82ceee; background: none; border: 2px solid #82ceee;     border-radius: 30px; padding: 9px 22px;font-family: \'Lato\', sans-serif; font-weight: bold; font-size: 14px; transition: 0.3s; text-align: center; outline:none; cursor:pointer;">    Submit\
                    </button>   \
                    <div id="mc_report_popup_msg" style="text-align: center; display:none;"> Success </div>\
            </div>\
        </div>';
    $("body").append(report_box);

    function remove_report_popup() {
        $("body").off("click", "#mc_report_popup_container #mc_report_popup_close_box");
        $("body").off("click", "#mc_report_popup_container .submit");
        $("#mc_report_popup_container").remove();
    }
    $("body").on("click", "#mc_report_popup_container #mc_report_popup_close_box", function () {
        remove_report_popup();
    });
    $("body").on("click", "#mc_report_popup_container .submit", function () {
        chrome.storage.local.get({
            "gcm_id": "",
            "user_id": ""
        }, function (response) {
            var id_deets = {};
            id_deets['user_id'] = response.user_id;
            id_deets['gcm_id'] = response.gcm_id;
            $("#mc_report_popup_container .submit").attr("disabled", true);
            var reason = $('#mc_report_popup_container select').val();
            var comment = $('#mc_report_popup_container textarea').val();
            var link = window.location.href;
            $("#mc_report_popup_msg").css("display", "none");
            if ((comment != "") && ($.trim(comment) != "")) {
                var feedback_obj = {
                    'link': link,
                    'comment': comment,
                    'reason': reason,
                    'user_id': id_deets.user_id,
                    'gcm_id': id_deets.gcm_id,
                    'ver': chrome.runtime.getManifest().version.toString(),
                    'ext_id': chrome.runtime.id
                };
                var req_send = backPostGet({
                    type: "POST",
                    url: "https://shades.makkhichoose.com/analytics/logextensionfeedback",
                    data: JSON.stringify(feedback_obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    timeout: 3500,
                });
                req_send.done(function (response) {
                    $('#mc_report_popup_container .submit').attr("disabled", true);
                    $('#mc_report_popup_msg').css('color', '#8fc952');
                    $('#mc_report_popup_msg').text("Thank you for your feedback");
                    $("#mc_report_popup_msg").css("display", "block");
                    setTimeout(function () {
                        remove_report_popup();
                    }, 1500);
                });
                req_send.fail(function (response) {
                    $('#mc_report_popup_container .submit').attr("disabled", false);
                    $('#mc_report_popup_msg').css('color', '#f73f52');
                    $('#mc_report_popup_msg').text("Something went wrong, please try again");
                    $("#mc_report_popup_msg").css("display", "block");
                });
            } else {
                $('#mc_report_popup_container .submit').attr("disabled", false);
                $('#mc_report_popup_msg').css('color', '#f73f52');
                $('#mc_report_popup_msg').text("Something went wrong, please try again");
                $("#mc_report_popup_msg").css("display", "block");
            }
        });
    });
}

function set_button_events() {
    $(result_view).find(".options_button").on('click', function () {
        chrome.runtime.sendMessage({
            method: 'settings_button_click'
        });
        chrome.runtime.sendMessage({
            method: "showOptionsPage"
        });
    });
    $(result_view).find(".report_button").on('click', function () {
        get_report();
    });
    $(result_view).find(".tutorial_button").on('click', function () {
        chrome.runtime.sendMessage({
            "method": "help_button_click",
            "uid": id_deets.user_id
        });
    });
}

function make_preview_draggable() {
    $(mc_root).find("#preview_min_root").draggable({
        containment: [-90000, -90000, 90000, 90000],
        start: function (event, ui) {
            $(this).addClass('noclick');
        },
        stop: makkhimin_drag_stop,
        zIndex: 99999
    });
    getmmpos();
}

function doc_click_handler(event) {
    if (ctabby_click == 'button_click') {
        ctabby_click = '';
        if (site_type == "flights") {
            flights_hide_preview_display_results();
        } else {
            hide_preview_min_display_results();
        }
        event.preventDefault();
        return;
    }
    if (ctabby_click == 'pvm_track_button_click') {
        ctabby_click = '';
        event.preventDefault();
        return;
    }
    if (ctabby_click == 'show_all_button_click') {
        ctabby_click = '';
        event.preventDefault();
        return;
    }
    if ($(event.target).is("#mc_host")) {
        return;
    } else {
        if (prod_deets.prod_site == "aj") {
            if ($(event.target).is(".slick-next")) {
                return;
            }
        }
    }
    if (result_view && (site_type != "flights") && ($(mc_root).find("#preview_root").css("display") == "none")) {
        if ($(mc_root).find("#preview_root_min").css("display") != "none") {
            if ($(result_view).find(".dropdown-menu ul").css("display") == "block") {
                $(result_view).find(".dropdown-menu ul").css("display", "none");
            }
            hide_results_display_preview_min();
        }
        return;
    }
    if (result_view && (site_type == "flights")) {
        if ($(mc_root).find("#preview_root_min").css("display") != "none") {
            if ($(result_view).find(".dropdown-menu ul").css("display") == "block") {
                $(result_view).find(".dropdown-menu ul").css("display", "none");
            }
            flights_hide_results_display_preview();
        }
        return;
    }
}

function dateDiffInDays(time_in_ms1, time_in_ms2) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var a = new Date(time_in_ms1);
    var b = new Date(time_in_ms2);
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}

function makkhimin_drag_stop(event, ui) {
    var mc_draggable_left_limit = 0;
    var mc_draggable_top_limit = 0;
    var mc_draggable_right_limit = parseInt($(mc_root).find("#preview_min_root .pop-up").outerWidth());
    var mc_draggable_bot_limit = parseInt($(mc_root).find("#preview_min_root").css("height"));;
    if (prod_deets.prod_site == "mmt") {
        mc_draggable_top_limit = 75;
    }
    if (prod_deets.prod_site == "aj") {
        mc_draggable_top_limit = 75;
    }
    var top_pos = parseInt($(this).css('top'));
    var left_pos = parseInt($(this).css('left'));
    var pos_saved = false;
    if ((top_pos > window.innerHeight - mc_draggable_bot_limit) || top_pos < 0) {} else if ((left_pos > window.innerWidth - mc_draggable_right_limit) || left_pos < 0) {} else {
        pos_saved = true;
        savemakkhiminpos(top_pos, left_pos, window.innerHeight, window.innerWidth);
    }
    if (top_pos > window.innerHeight - mc_draggable_bot_limit) {
        top_pos = (window.innerHeight - mc_draggable_bot_limit);
        $(mc_root).find("#preview_min_root").css('top', (window.innerHeight - mc_draggable_bot_limit) + 'px');
    }
    if (top_pos < mc_draggable_top_limit) {
        top_pos = mc_draggable_top_limit;
        $(mc_root).find("#preview_min_root").css('top', mc_draggable_top_limit + 'px');
    }
    if (left_pos > window.innerWidth - mc_draggable_right_limit) {
        left_pos = (window.innerWidth - mc_draggable_right_limit);
        $(mc_root).find("#preview_min_root").css('left', (window.innerWidth - mc_draggable_right_limit) + 'px');
    }
    if (left_pos < mc_draggable_left_limit) {
        left_pos = -mc_draggable_left_limit;
        $(mc_root).find("#preview_min_root").css('left', mc_draggable_left_limit + 'px');
    }
    if (pos_saved == false) {
        savemakkhiminpos(top_pos, left_pos, window.innerHeight, window.innerWidth);
    }
}

function savemakkhiminpos(top, left, wh, ww) {
    chrome.runtime.sendMessage({
        site: prod_deets.prod_site,
        method: 'save_makkhi_min_pos',
        top: top,
        left: left,
        wh: wh,
        ww: ww
    });
}

function getmmpos() {
    var mc_draggable_top_limit = 0;
    var mc_draggable_left_limit = 0;
    var mc_draggable_right_limit = parseInt($(mc_root).find("#preview_min_root div.pop-up").outerWidth());
    var mc_draggable_bot_limit = parseInt($(mc_root).find("#preview_min_root").css("height"));;
    if (prod_deets.prod_site == "mmt") {
        mc_draggable_top_limit = 75;
    }
    var c_wh, c_ww, top, left;
    if (prod_deets.prod_site != undefined) {
        chrome.runtime.sendMessage({
            method: "get_mmpos",
            site: prod_deets.prod_site
        }, function (response) {
            if (response.state == 'ok') {
                if (response.win_height == undefined || response.win_height == undefined) {
                    $(mc_root).find("#preview_min_root").css('left', '0px');
                    $(mc_root).find("#preview_min_root").css('top', (window.innerHeight - 150));
                } else {
                    c_wh = window.innerHeight;
                    c_ww = window.innerWidth;
                    top = Math.round((parseInt(response.pos_top) / parseInt(response.win_height)) * parseInt(c_wh));
                    left = Math.round((parseInt(response.pos_left) / parseInt(response.win_width)) * parseInt(c_ww));
                    if (top < mc_draggable_top_limit) {
                        top = mc_draggable_top_limit;
                    }
                    if (top > window.innerHeight - mc_draggable_bot_limit) {
                        top = (window.innerHeight - mc_draggable_bot_limit);
                    }
                    if (left < mc_draggable_left_limit) {
                        left = mc_draggable_left_limit;
                    }
                    if (left > window.innerWidth - mc_draggable_right_limit) {
                        left = (window.innerWidth - mc_draggable_right_limit);
                    }
                    $(mc_root).find("#preview_min_root").css('left', left + 'px');
                    $(mc_root).find("#preview_min_root").css('top', top + 'px');
                    savemakkhiminpos(top, left, window.innerHeight, window.innerWidth);
                }
            } else {}
        });
    } else {
        setTimeout(getmmpos, 10 * 1000);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function check_user_settings_show_results() {
    if (prod_deets.backsearch_site) {
        $(mc_root).find("#preview_root").css("display", "none");
        $(mc_root).find("#track_icon").css("display", "none")
        do_backsearch_and_get_results(prod_deets);
        hide_results_display_preview_min();
        $(result_view).find(".graph-title").css("display", "none");
        $("#mc_main_host").css("display", "block");
    } else {
        chrome.storage.local.get({
            "user_added_sites_pp": {},
            "user_added_scripts": []
        }, function (response) {
            var backsearch_site = false;
            if (response["user_added_sites_pp"] || response.user_added_scripts.indexOf(window.location.hostname) > -1) {
                var user_added_sites_pp = response.user_added_sites_pp;
                if (user_added_sites_pp[window.location.hostname] || response.user_added_scripts.indexOf(window.location.hostname) > -1) {
                    backsearch_site = true;
                    $(mc_root).find("#preview_root").css("display", "none");
                    $(mc_root).find("#track_icon").css("display", "none")
                    do_backsearch_and_get_results(prod_deets);
                    hide_results_display_preview_min();
                    $(result_view).find(".graph-title").css("display", "none");
                    $("#mc_main_host").css("display", "block");
                }
            }
            if (!backsearch_site) {
                $(mc_root).find("#preview_root").css("display", "none");
                hide_preview_min_display_results = function (e) {
                    var img_src = prod_deets.prod_img;
                    if (prod_deets.prod_img.indexOf('?') > -1) {
                        img_src = prod_deets.prod_img.substring(0, prod_deets.prod_img.indexOf('?'));
                    }
                    var url = "http://www.dittory.com/results?pid=" + prod_deets.product_id + prod_deets.prod_site + "&img_src=" + img_src;
                    chrome.runtime.sendMessage({
                        "method": "open_url_in_tab",
                        "url": url
                    })
                };
                hide_results_display_preview_min();
                $(mc_root).find("#preview_min_root #price").css("display", "none");
                $(mc_root).find("#preview_min_root #pv_track_button").css({
                    "padding-left": "0px"
                });
                $(mc_root).find("#preview_min_root #pv_makkhi_logo").css({
                    "flex-direction": "column"
                });
                $(mc_root).find("#preview_min_root .pop-up").css({
                    "padding": "12px"
                });
                $(mc_root).find("#preview_min_root #pv_track_button").css({
                    "padding-top": "5px"
                });
                $("#mc_main_host").css("display", "block");
            }
        });
    }
}