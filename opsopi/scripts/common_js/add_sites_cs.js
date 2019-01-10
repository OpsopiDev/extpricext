chrome.storage.local.get({
    "add_site_deets": ""
}, function (storage_read_response) {
    if (storage_read_response.add_site_deets && storage_read_response.add_site_deets.hostname) {
        if (window.location.hostname == storage_read_response.add_site_deets.hostname) {
            guide_user_to_add_site(storage_read_response.add_site_deets);
        }
    }
})

function guide_user_to_add_site(add_site_deets) {
    if (add_site_deets.state == "waiting_for_user_search") {
        do_waiting_for_user_search_task();
    } else if (add_site_deets.state == "waiting_for_product_page_selectors") {
        get_selectors_for_product_page();
    } else if (add_site_deets.state == "user_searched") {
        chrome.storage.local.get({
            "switch_tab_msg_url": ""
        }, function (response) {
            if (response.switch_tab_msg_url && response.switch_tab_msg_url == window.location.href) {
                display_reminder_div("Switch to search results tab, This tab will get closed automatically");
                setTimeout(function () {
                    window.close();
                }, 1000 * 10);
            }
        });
    }
}
var logo_icon = chrome.runtime.getURL("design_files/resources/images/mcicon128.png");
var dialog_title = `
    <span>
        <img src="${logo_icon}" alt="" style ="max-width:25px; vertical-align:middle;" />
    </span>

`;

function add_dialog_title() {
    $(this).parent().find('.ui-dialog-title').html(dialog_title);
}

function destroy_dialog_on_close() {
    $(this).dialog('destroy').remove()
}

function do_waiting_for_user_search_task() {
    $("<div id='ditto_dialog'>Did you search with the phrase?</div>").dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                //ask details
                $("#ditto_dialog").dialog('close');
                user_searched_for_the_phrase();
            },
            "No": function () {
                $("#ditto_dialog").dialog('close');
                $("<div id='ditto_dialog'>Please serach with the phrase to add the site</div>").dialog({
                    title: "OPSOPI Dialog",
                    modal: true,
                    draggable: false,
                    open: add_dialog_title,
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    close: destroy_dialog_on_close,
                    buttons: {
                        "Ok": function () {
                            //ask details
                            $("#ditto_dialog").dialog('close');
                            display_reminder_div("Search With a Phrase");
                        },
                        "Stop Walkthrough": function () {
                            stop_walk_through();
                        }
                    }
                });
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    })
}

function user_searched_for_the_phrase() {
    $("#ditto_dialog").dialog('close');
    $("<div id='ditto_dialog'>is this the search results page</div>").dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                $("#ditto_dialog").dialog('close');
                user_on_search_results_page();
            },
            "No": function () {
                something_went_wrong_inform_user_that_we_will_add_the_site();
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function user_on_search_results_page() {
    close_reminder_div();
    $("#ditto_dialog").dialog('close');
    $("<div id='ditto_dialog'>Do you see results on this page</div>").dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                user_on_search_results_page_with_results();
            },
            "No": function () {
                user_on_search_results_page_with_out_results();
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function user_on_search_results_page_with_results() {
    $("#ditto_dialog").dialog('close');
    extract_the_search_url_format_from_user();
}

function user_on_search_results_page_with_out_results() {
    $("#ditto_dialog").dialog('close');
    $("<div id='ditto_dialog'>Please search with some other phrase to get result</div>").dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Ok": function () {
                $("#ditto_dialog").dialog('close');
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function extract_the_search_url_format_from_user() {
    $("#ditto_dialog").dialog('close');
    $(
        `
            <div id="ditto_dialog">
                Please Enter the search term used in the below box and click next
                <input type="text" placeholder="Enter the search term" id="user_search_term" />
            </div>
        `
    ).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Next": function () {
                var search_term = $(this).parent().find("#user_search_term").val();
                $("#ditto_dialog").dialog('close');
                user_entered_search_term(search_term);
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}
var current_search_url = "";

function user_entered_search_term(search_term) {
    current_search_url = window.location.href;
    $("#ditto_dialog").dialog('close');
    var search_term_words = search_term.split(" ");
    if (search_term_words.length < 2) {
        $("<div id='ditto_dialog'>Please search with a phrase having atleast 2 words</div>").dialog({
            title: "OPSOPI Dialog",
            modal: true,
            draggable: false,
            open: add_dialog_title,
            position: {
                my: "center",
                at: "center",
                of: window
            },
            close: destroy_dialog_on_close,
            buttons: {
                "Ok": function () {
                    $("#ditto_dialog").dialog('close');
                },
                "Stop Walkthrough": function () {
                    stop_walk_through();
                }
            }
        });
    } else {
        $("#ditto_dialog").dialog('close');
        var url_pattern = extract_pattern_from_search_phrase_and_url(window.location.href, search_term);
        chrome.storage.local.get({
            "add_site_deets": ""
        }, function (response) {
            if (response && response.add_site_deets) {
                var deets = response.add_site_deets;
                deets['search_url'] = url_pattern.url;
                deets['space_delimiter'] = url_pattern.delimiter;
                chrome.storage.local.set({
                    "add_site_deets": deets
                }, function () {
                    get_first_result();
                });
            }
        });
    }
}

function make_search_url_from_pattern(url, delimiter, search_string) {
    var search_term_words = search_string.split(" ");
    var space_delimiter = delimiter;
    var search_term_with_space_delimiters = "";
    for (var i = 0; i < search_term_words.length; i++) {
        if (i == search_term_words.length - 1) {
            search_term_with_space_delimiters += search_term_words[i];
            continue;
        }
        search_term_with_space_delimiters += search_term_words[i] + space_delimiter;
    }
    var final_url = url.replace("$~search_term_holder~$", search_term_with_space_delimiters);
    return final_url;
}

function extract_pattern_from_search_phrase_and_url(url, search_term) {
    var search_term_words = search_term.split(" ");
    var first_word = search_term_words[0];
    var second_word = search_term_words[1];
    var last_word = search_term_words[search_term_words.length - 1];
    var first_word_index = url.indexOf(first_word);
    var second_word_index = url.indexOf(second_word);
    var space_delimiter_start_index = first_word_index + first_word.length;
    var space_delimiter_end_index = second_word_index;
    var space_delimiter = url.slice(space_delimiter_start_index, space_delimiter_end_index);
    var search_term_with_space_delimiters = "";
    for (var i = 0; i < search_term_words.length; i++) {
        if (i == search_term_words.length - 1) {
            search_term_with_space_delimiters += search_term_words[i];
            continue;
        }
        search_term_with_space_delimiters += search_term_words[i] + space_delimiter;
    }
    var search_url = url.replace(search_term_with_space_delimiters, "$~search_term_holder~$");
    return {
        url: search_url,
        delimiter: space_delimiter
    };
}
// rework from here
var first_elem_selector;
var search_result_elems = [];
var highlight_div_style = document.createElement("style");
var highlight_css = document.createTextNode(`
       .gs_hover {
            background: repeating-linear-gradient(
                135deg,
                rgba(126,139,218,0.3),
                rgba(126,139,218,0.3) 10px,
                rgba(70,82,152,0.3) 10px,
                rgba(70,82,152,0.3) 20px
            );
            cursor: pointer;
        }
        `);
highlight_div_style.appendChild(highlight_css);
document.querySelector("head").appendChild(highlight_div_style);
document.addEventListener("mouseover", mouseover_highlight_listener);
var highlight_on_hover = false;

function mouseover_highlight_listener(e) {
    if (highlight_on_hover) {
        $(".gs_hover").removeClass("gs_hover");
        $(e.target).addClass('gs_hover');
    }
};

function result_select_key_down_listener(e) {
    if (e.key == "a" || e.key == "A") {
        // ctrl key listener     
        var selected_element = $(".gs_hover");
        if (selected_element.length <= 0) {
            $.toast("highlight a result and press ctrl")
            return;
        }
        close_reminder_div();
        search_result_elems.push(selected_element);
        highlight_on_hover = false;
        document.removeEventListener("keydown", result_select_key_down_listener);
        if (search_result_elems.length == 1) {
            $(".gs_hover").removeClass("gs_hover");
            extract_selector();
        }
    }
}

function get_class_selector(element) {
    var classlist = element.classList;
    var class_selector = "";
    for (var i = 0; i < classlist.length; i++) {
        if (classlist[i] == "gs_hover") {
            continue;
        }
        class_selector = class_selector + "." + classlist[i];
    }
    return class_selector;
}

function extract_selector() {
    first_elem_selector = get_class_selector(search_result_elems[0].get()[0]);
    if (first_elem_selector) {
        $(".gs_hover").removeClass("gs_hover");
        $(first_elem_selector + ":eq(0)").addClass("gs_hover");
        $(`
            
            <div class="get_result_dialog">
                First result highlighted?
            <div>

        `).dialog({
            modal: false,
            close: destroy_dialog_on_close,
            buttons: {
                "Yes": selector_1st_element_highlighted_success,
                "No": selector_1st_element_highlighted_fail,
                "Stop Walkthrough": function () {
                    stop_walk_through();
                }
            }
        });
    }
}

function selector_1st_element_highlighted_success(e) {
    $(".get_result_dialog").dialog('close');
    // test_div_selector();
    get_title_selector_dialog();
}

function selector_1st_element_highlighted_fail(e) {
    $(".get_result_dialog").dialog('close');
    something_went_wrong_inform_user_that_we_will_add_the_site();
}

function first_result_select_start_function() {
    $(".get_result_dialog").dialog('close');
    display_reminder_div("Highlight the 1st result and press A on key board");
    search_result_elems = [];
    highlight_on_hover = true;
    document.addEventListener("keydown", result_select_key_down_listener);
}

function get_first_result() {
    $(`
        
        <div class="get_result_dialog">
            Highlight the first result and press 'A' on keyboard
        <div>

    `).dialog({
        modal: true,
        close: destroy_dialog_on_close,
        buttons: {
            "ok": first_result_select_start_function,
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function test_div_selector() {
    chrome.storage.local.get({
        "add_site_deets": ""
    }, function (response) {
        if (response && response.add_site_deets) {
            var test_url = make_search_url_from_pattern(response.add_site_deets.search_url, response.add_site_deets.space_delimiter, "iphone back cover");
            var test_search = backPostGet({
                "type": "GET",
                "url": test_url
            });
            test_search.done(function (req_response) {
                if (!req_response) {
                    return;
                }
                var rr = req_response;
                var div = document.createElement("div");
                div.innerHTML = req_response;
                if (div.querySelector(first_elem_selector)) {
                    get_title_selector_dialog();
                }
            });
            test_search.fail(function (response) {})
        }
    })
}

function get_title_selector_dialog() {
    $(".gs_hover").removeClass("gs_hover");
    $(`
        <div class="get_result_dialog">
            Highlight the title for the result and press 'A' in the keyboard
        <div>
    `).dialog({
        modal: true,
        close: destroy_dialog_on_close,
        buttons: {
            "ok": get_title_selector,
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_title_selector() {
    $(".get_result_dialog").dialog('close');
    highlight_on_hover = true;
    document.addEventListener("keydown", title_select_key_down_listener);
    display_reminder_div("Highlight the title for the result and press 'A' in the keyboard");
}

function title_select_key_down_listener(e) {
    if (e.key == "a" || e.key == "A") {
        var selected_element = $(".gs_hover");
        if (selected_element.length <= 0) {
            $.toast("highlight Title and press A")
            return;
        }
        highlight_on_hover = false;
        document.removeEventListener("keydown", title_select_key_down_listener);
        if (selected_element) {
            extract_title_selector(selected_element);
        }
    }
}
var title_selector = "";

function extract_title_selector(element) {
    close_reminder_div();
    title_selector = get_selector_for_element(element);
    if (title_selector) {
        get_title_feed_back();
    }
    $(".gs_hover").removeClass("gs_hover");
}

function get_title_feed_back() {
    close_reminder_div();
    var first_result_element_selector = $("body").find(first_elem_selector + ":eq(0)");
    var title = $(first_result_element_selector).find(title_selector + ":eq(0)").text();
    if (title) {
        title = $.trim(title);
    }
    $(`<div class='title_feed_back_dialog'>You have selected "${title}" as Title</div>`).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                $(".title_feed_back_dialog").dialog('close');
                get_price_selector_dialog();
            },
            "No": function () {
                $(".title_feed_back_dialog").dialog('close');
                $(`<div class='title_re_select_dialog'>Do you want to select correct title</div>`).dialog({
                    title: "OPSOPI Dialog",
                    modal: true,
                    draggable: false,
                    open: add_dialog_title,
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    close: destroy_dialog_on_close,
                    buttons: {
                        "Yes": function () {
                            $(".title_re_select_dialog").dialog('close');
                            get_title_selector_dialog();
                        },
                        "No": function () {
                            $(".title_re_select_dialog").dialog('close');
                            something_went_wrong_inform_user_that_we_will_add_the_site();
                        },
                        "Stop Walkthrough": function () {
                            stop_walk_through();
                        }
                    }
                });
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_price_selector_dialog() {
    $(".gs_hover").removeClass("gs_hover");
    $(`
        <div class="get_result_dialog">
            Highlight the price for the result and press 'A' in the keyboard
        <div>
    `).dialog({
        modal: true,
        close: destroy_dialog_on_close,
        buttons: {
            "ok": get_price_selector,
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_price_selector() {
    $(".get_result_dialog").dialog('close');
    highlight_on_hover = true;
    document.addEventListener("keydown", price_select_key_down_listener);
    display_reminder_div("Highlight the price for the result and press 'A' in the keyboard");
}

function price_select_key_down_listener(e) {
    if (e.key == "a" || e.key == "A") {
        var selected_element = $(".gs_hover");
        if (selected_element.length <= 0) {
            $.toast("highlight Title and press A")
            return;
        }
        highlight_on_hover = false;
        document.removeEventListener("keydown", price_select_key_down_listener);
        if (selected_element) {
            extract_price_selector(selected_element);
        }
    }
}
var price_selector = "";

function extract_price_selector(element) {
    price_selector = get_selector_for_element(element);
    if (price_selector) {
        get_price_feed_back();
    }
    $(".gs_hover").removeClass("gs_hover");
}

function get_price_feed_back() {
    close_reminder_div();
    var first_result_element_selector = $("body").find(first_elem_selector + ":eq(0)");
    var price = $(first_result_element_selector).find(price_selector + ":eq(0)").text();
    if (price) {
        price = $.trim(price);
        price = process_price_for_user_added_site(price);
    }
    $(`<div class='price_feed_back_dialog'>
        You have selected "${price}" as Price
        </div>
    `).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                $(".price_feed_back_dialog").dialog('close');
                get_image_selector_dialog();
            },
            "No": function () {
                $(".price_feed_back_dialog").dialog('close');
                $(`<div class='price_re_select_dialog'>
                        Do you want to re select correct price
                    </div>
                `).dialog({
                    title: "OPSOPI Dialog",
                    modal: true,
                    draggable: false,
                    open: add_dialog_title,
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    close: destroy_dialog_on_close,
                    buttons: {
                        "Yes": function () {
                            $(".price_re_select_dialog").dialog('close');
                            get_price_selector_dialog();
                        },
                        "No": function () {
                            $(".price_re_select_dialog").dialog('close');
                            something_went_wrong_inform_user_that_we_will_add_the_site();
                        }
                    }
                });
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_image_selector_dialog() {
    close_reminder_div();
    $(".gs_hover").removeClass("gs_hover");
    $(`
        <div class="get_result_dialog">
            Highlight the image for the result and press 'A' in the keyboard
        <div>
    `).dialog({
        modal: true,
        close: destroy_dialog_on_close,
        buttons: {
            "ok": get_image_selector,
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_image_selector() {
    display_reminder_div("Highlight the image for the result and press 'A' in the keyboard");
    $(".get_result_dialog").dialog('close');
    highlight_on_hover = true;
    document.addEventListener("keydown", image_select_key_down_listener);
}

function image_select_key_down_listener(e) {
    if (e.key == "a" || e.key == "A") {
        var selected_element = $(".gs_hover");
        if (selected_element.length <= 0) {
            $.toast("highlight Title and press A")
            return;
        }
        highlight_on_hover = false;
        document.removeEventListener("keydown", image_select_key_down_listener);
        if (selected_element.length > 0) {
            close_reminder_div();
            extract_image_selector(selected_element);
        }
    }
}
var image_selector = "";

function extract_image_selector(element) {
    var img_element = "";
    if ($(element).length > 0 && $(element).find("img[src]:eq(0)").length > 0) {
        img_element = $(element).find("img[src]:eq(0)");
    } else if ($(element).length > 0 && $(element).get()[0].tagName.toLowerCase() == "img") {
        img_element = $(element);
    } else if ($(first_elem_selector).find("img[src]:eq(0)").length > 0) {
        img_element = $(first_elem_selector).find("img[src]:eq(0)");
    }
    image_selector = get_selector_for_image_element(img_element);
    if (image_selector) {
        get_image_feed_back();
    }
    $(".gs_hover").removeClass("gs_hover");
}

function get_image_feed_back() {
    close_reminder_div();
    var first_result_element_selector = $("body").find(first_elem_selector + ":eq(0)");
    var img_src = "";
    var image_select = $(first_result_element_selector).find(image_selector + ":eq(0)");
    if (image_select.length > 0) {
        img_src = $(image_select).attr("src");
    } else {
        var img_from_first_slector = get_img_src_from_result_selector("body", first_result_element_selector);
        if (img_from_first_slector) {
            img_src = img_from_first_slector;
        }
    }
    $(`<div class='image_feed_back_dialog'>
            You have selected the following image :
            <div style="max-width:200px; max-height:200px;">
                <img src ="${img_src}">
            </div>
        </div>
    `).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                $(".image_feed_back_dialog").dialog('close');
                extract_link_selector();;
            },
            "No": function () {
                $(".image_feed_back_dialog").dialog('close');
                $(`<div class='image_re_select_dialog'>
                        Do you want to re select correct image
                    </div>
                `).dialog({
                    title: "OPSOPI Dialog",
                    modal: true,
                    draggable: false,
                    open: add_dialog_title,
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    close: destroy_dialog_on_close,
                    buttons: {
                        "Yes": function () {
                            $(".image_re_select_dialog").dialog('close');
                            get_image_selector_dialog();
                        },
                        "No": function () {
                            $(".image_re_select_dialog").dialog('close');
                            something_went_wrong_inform_user_that_we_will_add_the_site();
                        },
                        "Stop Walkthrough": function () {
                            stop_walk_through();
                        }
                    }
                });
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}
var link_selector = "";
var add_host_name_with_link = false

function extract_link_selector() {
    var link_elem = $(first_elem_selector).find("a[href]");
    if (link_elem.length > 0) {
        link_selector = get_selector_for_link_element(link_elem, first_elem_selector);
        do_page_loads_with_required_data_check();
    } else {
        var link_elem = find_parent_a_tag_for_first_element();
        if (link_elem.length > 0) {
            link_selector = get_selector_for_link_element(link_elem, first_elem_selector);
            do_page_loads_with_required_data_check();
        }
    }
}

function do_page_loads_with_required_data_check() {
    var test_req = backPostGet({
        "type": "get",
        "url": current_search_url
    });
    test_req.done(function (response) {
        if (!response) {
            return;
        }
        var rr = response;
        div = document.createElement("div");
        div.innerHTML = rr;
        var result_deets = {
            "title": "",
            "image": "",
            "price": "",
            "link": ""
        }
        if (div.querySelector(first_elem_selector)) {
            var first_element = $(div).find(first_elem_selector + ":eq(0)");
            var title_select = $(first_element).find(title_selector + ":eq(0)");
            if (title_select.length <= 0) {
                title_select = $(div).find(title_selector + ":eq(0)");
            }
            if (title_select.length > 0) {
                result_deets["title"] = $(title_select).text();
            }
            var image_select = $(first_element).find(image_selector + ":eq(0)");
            if (image_select.length <= 0) {
                image_select = $(div).find(image_selector + ":eq(0)");
            }
            if (image_select.length > 0) {
                result_deets["image"] = $(image_select).attr("src");
            }
            var price_select = $(first_element).find(price_selector + ":eq(0)");
            if (price_select.length <= 0) {
                price_select = $(div).find(price_selector + ":eq(0)");
            }
            if (price_select.length > 0) {
                result_deets["price"] = $(price_select).text();
            }
            var link_select = $(first_element).find(link_selector + ":eq(0)");
            if (link_select.length <= 0) {
                link_select = $(div).find(link_selector + ":eq(0)");
            }
            if (link_select.length > 0) {
                result_deets["link"] = $(link_select).attr("href");
            }
            do_selectors_check();
        } else {
            something_went_wrong_inform_user_that_we_will_add_the_site();
        }
    });
}

function do_selectors_check() {
    function make_selector_check_req(search_title) {
        chrome.storage.local.get({
            "add_site_deets": ""
        }, function (response) {
            if (response && response.add_site_deets) {
                var test_url = make_search_url_from_pattern(response.add_site_deets.search_url, response.add_site_deets.space_delimiter, search_title);
                var test_search =
                    backPostGet({
                        "type": "GET",
                        "url": test_url
                    });
                display_reminder_div("Loading...");
                test_search.done(function (response) {
                    close_reminder_div();
                    if (!response) {
                        return;
                    }
                    rr = response;
                    div = document.createElement("div");
                    div.innerHTML = rr;
                    var result_deets = {
                        "title": "",
                        "image": "",
                        "price": "",
                        "link": ""
                    }
                    if (div.querySelector(first_elem_selector)) {
                        var first_element = $(div).find(first_elem_selector + ":eq(0)");
                        var title_select = $(first_element).find(title_selector + ":eq(0)");
                        if (title_select.length <= 0) {
                            title_select = $(div).find(title_selector + ":eq(0)");
                        }
                        if (title_select.length > 0) {
                            result_deets["title"] = $(title_select).text();
                        }
                        var image_select = $(first_element).find(image_selector + ":eq(0)");
                        if (image_select.length <= 0) {
                            image_select = $(div).find(image_selector + ":eq(0)");
                        }
                        if (image_select.length > 0) {
                            result_deets["image"] = $(image_select).attr("src");
                        } else {
                            var l = get_img_src_from_result_selector(div, first_elem_selector);
                            if (l) {
                                result_deets["image"] = l;
                            } else {
                                img_test_first_div = first_element;
                            }
                        }
                        var price_select = $(first_element).find(price_selector + ":eq(0)");
                        if (price_select.length <= 0) {
                            price_select = $(div).find(price_selector + ":eq(0)");
                        }
                        if (price_select.length > 0) {
                            result_deets["price"] = process_price_for_user_added_site($(price_select).text());
                        }
                        var link_select = $(first_element).find(link_selector + ":eq(0)");
                        if (link_select.length <= 0) {
                            link_select = $(div).find(link_selector + ":eq(0)");
                        }
                        if (link_select.length > 0) {
                            result_deets["link"] = $(link_select).attr("href");
                        } else {
                            var l = get_link_from_first_result_selector(div, first_elem_selector);
                            if (l) {
                                result_deets["link"] = l;
                            }
                        }
                        chrome.storage.local.get({
                            "add_site_deets": ""
                        }, function (response) {
                            if (response.add_site_deets) {
                                var add_site_deets = response.add_site_deets;
                                add_site_deets["state"] = "user_searched";
                                chrome.storage.local.set({
                                    "add_site_deets": add_site_deets
                                }, function (response) {
                                    get_user_feed_back_to_finalize_selectors_for_link(result_deets);
                                });
                            }
                        });
                    } else {
                        something_went_wrong_inform_user_that_we_will_add_the_site();
                    }
                });
                test_search.fail(function () {
                    close_reminder_div();
                    something_went_wrong_inform_user_that_we_will_add_the_site();
                })
            }
        });
    }
    $("#ditto_dialog").dialog('close');
    $(
        `
            <div id="ditto_dialog">
                Please Enter a product title to test.
                <input type="text" placeholder="Enter the search term" id="user_search_term" />
            </div>
        `
    ).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Next": function () {
                var search_term = $(this).parent().find("#user_search_term").val();
                $("#ditto_dialog").dialog('close');
                make_selector_check_req(search_term);
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_user_feed_back_to_finalize_selectors(deets) {
    $(
        `
            <div id="ditto_dialog" style="overflow:hidden;">
                <div style="max-width:270px;">
                    <span style="font-weight:bold;">Check if the following product result matches your test search</span>
                    <div title="${deets.title}" style="padding:5px; border: 1px solid gray; border-right:none;">
                        <a href="${deets.link}" style="text-decoration:none;" target="_blank;">
                            <div style="display:flex; flex-direction:row">
                                <div>
                                    <div style="font-size:12px; color:#9eb3b3; font-weight:bold; margin:0px;">Site name</div>
                                    <div class="mc_prod_title"style="min-width: 174px; max-width: 174px; min-height: 40px; max-height:40px; overflow:hidden; line-height: 19px; color:#2e3437; ">${deets.title}</div>
                                    <div style="color:#f73f52; font-weight:bold; font-size:18px;">${deets.price}</div>
                                </div>
                                <div>
                                    <div class="image" style="width:130px; height:98px;">
                                        <img style="max-width:100px; max-height:98px; width:auto; height:auto;" src="${deets.image}">    
                                    </div>
                                </div>
                            </div>  
                        </a>
                    </div>
                </div>
            </div>
        `
    ).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "yes": function () {
                $("#ditto_dialog").dialog('close');
                save_selectors_and_inform_user(deets);
            },
            "no": function () {
                something_went_wrong_inform_user_that_we_will_add_the_site();
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_user_feed_back_to_finalize_selectors_for_image(deets) {
    $(
        `
            <div id="ditto_dialog" style="overflow:hidden;">
                <div style="max-width:270px;">
                    <span style="font-weight:bold;">Check if the following product result has an image</span>
                    <div title="${deets.title}" style="padding:5px; border: 1px solid gray; border-right:none;">
                        <a href="${deets.link}" style="text-decoration:none;" target="_blank;">
                            <div style="display:flex; flex-direction:row">
                                <div>
                                    <div style="font-size:12px; color:#9eb3b3; font-weight:bold; margin:0px;">Site name</div>
                                    <div class="mc_prod_title"style="min-width: 174px; max-width: 174px; min-height: 40px; max-height:40px; overflow:hidden; line-height: 19px; color:#2e3437; "></div>
                                    <div style="color:#f73f52; font-weight:bold; font-size:18px;"></div>
                                </div>
                                <div>
                                    <div class="image" style="width:130px; height:98px;">
                                        <img style="max-width:100px; max-height:98px; width:auto; height:auto;" src="${deets.image}">    
                                    </div>
                                </div>
                            </div>  
                        </a>
                    </div>
                </div>
            </div>
        `
    ).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "yes": function () {
                $("#ditto_dialog").dialog('close');
                get_user_feed_back_to_finalize_selectors(deets);
            },
            "no": function () {
                something_went_wrong_inform_user_that_we_will_add_the_site();
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_user_feed_back_to_finalize_selectors_for_link(deets) {
    chrome.storage.local.set({
        "switch_tab_msg_url": deets.link
    }, function (response) {
        $(
            `
                    <div id="ditto_dialog" style="overflow:hidden;">
                        <div style="max-width:270px;">
                            <span style="font-weight:bold;">Click the following result and Check if product page is opening</span>
                            <div title="${deets.title}" style="padding:5px; border: 1px solid gray; border-right:none;">
                                <a href="${deets.link}" style="text-decoration:none;" target="_blank;">
                                    <div style="display:flex; flex-direction:row">
                                        <div>
                                            <div style="font-size:12px; color:#9eb3b3; font-weight:bold; margin:0px;">Site name</div>
                                            <div class="mc_prod_title"style="min-width: 174px; max-width: 174px; min-height: 40px; max-height:40px; overflow:hidden; line-height: 19px; color:#2e3437; ">${deets.title}</div>
                                            <div style="color:#f73f52; font-weight:bold; font-size:18px;">${deets.price}</div>
                                        </div>
                                        <div>
                                            <div class="image" style="width:130px; height:98px;">
                                                <img style="max-width:100px; max-height:98px; width:auto; height:auto;" src="${deets.image}">    
                                            </div>
                                        </div>
                                    </div>  
                                </a>
                            </div>
                        </div>
                    </div>
                `
        ).dialog({
            title: "OPSOPI Dialog",
            modal: true,
            draggable: false,
            open: add_dialog_title,
            position: {
                my: "center",
                at: "center",
                of: window
            },
            close: destroy_dialog_on_close,
            buttons: {
                "yes": function () {
                    $("#ditto_dialog").dialog('close');
                    get_user_feed_back_to_finalize_selectors_for_title(deets);
                },
                "no": function () {
                    something_went_wrong_inform_user_that_we_will_add_the_site();
                },
                "Stop Walkthrough": function () {
                    stop_walk_through();
                }
            }
        });
    });
}

function get_user_feed_back_to_finalize_selectors_for_price(deets) {
    $(
        `
            <div id="ditto_dialog" style="overflow:hidden;">
                <div style="max-width:270px;">
                    <span style="font-weight:bold;">Check if the following product result has price displayed</span>
                    <div title="${deets.title}" style="padding:5px; border: 1px solid gray; border-right:none;">
                        <a href="${deets.link}" style="text-decoration:none;" target="_blank;">
                            <div style="display:flex; flex-direction:row">
                                <div>
                                    <div style="font-size:12px; color:#9eb3b3; font-weight:bold; margin:0px;">Site name</div>
                                    <div class="mc_prod_title"style="min-width: 174px; max-width: 174px; min-height: 40px; max-height:40px; overflow:hidden; line-height: 19px; color:#2e3437; "></div>
                                    <div style="color:#f73f52; font-weight:bold; font-size:18px;">${deets.price}</div>
                                </div>
                                <div>
                                    <div class="image" style="width:130px; height:98px;">
                                        <img style="max-width:100px; max-height:98px; width:auto; height:auto;" src="">    
                                    </div>
                                </div>
                            </div>  
                        </a>
                    </div>
                </div>
            </div>
        `
    ).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "yes": function () {
                $("#ditto_dialog").dialog('close');
                get_user_feed_back_to_finalize_selectors_for_image(deets)
            },
            "no": function () {
                something_went_wrong_inform_user_that_we_will_add_the_site();
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_user_feed_back_to_finalize_selectors_for_title(deets) {
    $(
        `
            <div id="ditto_dialog" style="overflow:hidden;">
                <div style="max-width:270px;">
                    <span style="font-weight:bold;">Check if the title is displayed</span>
                    <div title="${deets.title}" style="padding:5px; border: 1px solid gray; border-right:none;">
                        <a href="${deets.link}" style="text-decoration:none;" target="_blank;">
                            <div style="display:flex; flex-direction:row">
                                <div>
                                    <div style="font-size:12px; color:#9eb3b3; font-weight:bold; margin:0px;">Site name</div>
                                    <div class="mc_prod_title"style="min-width: 174px; max-width: 174px; min-height: 40px; max-height:40px; overflow:hidden; line-height: 19px; color:#2e3437; ">${deets.title}</div>
                                    <div style="color:#f73f52; font-weight:bold; font-size:18px;"></div>
                                </div>
                                <div>
                                    <div class="image" style="width:130px; height:98px;">
                                        <img style="max-width:100px; max-height:98px; width:auto; height:auto;" src="">    
                                    </div>
                                </div>
                            </div>  
                        </a>
                    </div>
                </div>
            </div>
        `
    ).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "yes": function () {
                $("#ditto_dialog").dialog('close');
                get_user_feed_back_to_finalize_selectors_for_price(deets);
            },
            "no": function () {
                something_went_wrong_inform_user_that_we_will_add_the_site();
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function save_selectors_and_inform_user(deets) {
    chrome.storage.local.get({
        "user_added_sites": "",
        "add_site_deets": ""
    }, function (response) {
        var user_added_sites = [];
        if (response.user_added_sites && response.add_site_deets) {
            user_added_sites = response.user_added_sites;
            var current_add_site_deets = response.add_site_deets;
            var current_site_deets = {
                "title": "",
                "price": "",
                "link": "",
                "img_src": "",
                "host_name": "",
                "search_url_pattern": "",
                "url_space_delimiter": "",
            };
            try {
                current_site_deets.first_elem_selector = first_elem_selector;
                current_site_deets.title = title_selector;
                current_site_deets.price = price_selector;
                current_site_deets.link = link_selector;
                current_site_deets.img_src = image_selector;
                current_site_deets.host_name = current_add_site_deets.hostname;
                current_site_deets.search_url_pattern = current_add_site_deets.search_url;
                current_site_deets.url_space_delimiter = current_add_site_deets.space_delimiter;
                user_added_sites.push(current_site_deets);
                chrome.storage.local.set({
                    "user_added_sites": user_added_sites
                }, function () {
                    inform_and_go_to_product_page(deets);
                });
            } catch (err) {
                something_went_wrong_inform_user_that_we_will_add_the_site();
            }
        } else if (response.add_site_deets) {
            var current_add_site_deets = response.add_site_deets;
            var current_site_deets = {
                "title": "",
                "price": "",
                "link": "",
                "img_src": "",
                "host_name": "",
                "search_url_pattern": "",
                "url_space_delimiter": "",
            };
            try {
                current_site_deets.first_elem_selector = first_elem_selector;
                current_site_deets.title = title_selector;
                current_site_deets.price = price_selector;
                current_site_deets.link = link_selector;
                current_site_deets.img_src = image_selector;
                current_site_deets.host_name = current_add_site_deets.hostname;
                current_site_deets.search_url_pattern = current_add_site_deets.search_url;
                current_site_deets.url_space_delimiter = current_add_site_deets.space_delimiter;
                user_added_sites.push(current_site_deets);
                chrome.storage.local.set({
                    "user_added_sites": user_added_sites
                }, function () {
                    inform_and_go_to_product_page(deets);
                });
            } catch (err) {
                something_went_wrong_inform_user_that_we_will_add_the_site();
            }
        }
    });
}

function get_selector_for_element(element, container_div_selector = first_elem_selector) {
    function search_and_find_slector(element) {
        var element_class_list = get_class_selector(element.get()[0]);
        if (element.get()[0].tagName.toLowerCase() == "body") {
            return element.get()[0].tagName.toLowerCase();
        }
        if (element_class_list === container_div_selector) {
            return container_div_selector;
        }
        if (element_class_list) {
            return element.get()[0].tagName.toLowerCase() + element_class_list;
        } else {
            return search_and_find_slector($(element).parent()) + " " + element.get()[0].tagName.toLowerCase();
        }
    }
    return search_and_find_slector(element);
}

function get_selector_for_image_element(element) {
    var element_class_list = get_class_selector(element.get()[0]);
    if (element_class_list && element.get()[0].tagName.toLowerCase() == "img") {
        return "img" + element_class_list;
    } else {
        return get_selector_for_element($(element).parent()) + " " + "img";
    }
}

function get_selector_for_link_element(element) {
    var element_class_list = get_class_selector(element.get()[0]);
    if (element_class_list && element.get()[0].tagName.toLowerCase() == "a") {
        return "a" + element_class_list;
    } else {
        return get_selector_for_element($(element).parent()) + " " + "a";
    }
}

function find_parent_a_tag_for_first_element() {
    function find_parent_a_tag(element) {
        if (element.get()[0].tagName.toLowerCase() == "body") {
            return "";
        } else if (element.get()[0].tagName.toLowerCase() == "a") {
            return element;
        } else {
            return find_parent_a_tag($(element).parent());
        }
    }
    var parent_a_tag = find_parent_a_tag($(first_elem_selector + ":eq(0)"));
    return parent_a_tag;
}

function success_added_site_message() {
    $("#ditto_dialog").dialog('close');
    $("<div id='ditto_dialog'>You have successfully added this site, You will see results from this site</div>").dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Ok": function () {
                $(".gs_hover").removeClass("gs_hover");
                $("#ditto_dialog").dialog('close');
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function something_went_wrong_inform_user_that_we_will_add_the_site() {
    $("#ditto_dialog").dialog('close');
    $("<div id='ditto_dialog'>Something is not working as expected, OPSOPI will add the site for you in some time</div>").dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Ok": function () {
                $(".gs_hover").removeClass("gs_hover");
                $("#ditto_dialog").dialog('close');
                chrome.storage.local.remove(["add_site_deets"]);
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function stop_walk_through() {
    $("#ditto_dialog").dialog('close');
    close_reminder_div();
    chrome.storage.local.remove(["add_site_deets"], function (response) {
        $("<div id='ditto_dialog'>Walkthrough stopped</div>").dialog({
            title: "OPSOPI Dialog",
            modal: true,
            draggable: false,
            open: add_dialog_title,
            position: {
                my: "center",
                at: "center",
                of: window
            },
            close: destroy_dialog_on_close,
            buttons: {
                "Ok": function () {
                    $(".gs_hover").removeClass("gs_hover");
                    $("#ditto_dialog").dialog('close');
                    chrome.storage.local.remove(["add_site_deets"]);
                },
            }
        });
    });
}

function inform_and_go_to_product_page(deets) {
    $("#ditto_dialog").dialog('close');
    $("<div id='ditto_dialog'>You will be taken to a product page please follow the walkthrough there</div>").dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Ok": function () {
                chrome.storage.local.get({
                    "add_site_deets": ""
                }, function (response) {
                    if (response.add_site_deets) {
                        var add_site_deets = response.add_site_deets;
                        add_site_deets.state = "waiting_for_product_page_selectors";
                        chrome.storage.local.set({
                            "add_site_deets": add_site_deets
                        }, function (response) {
                            window.location.href = deets.link;
                        });
                    } else {
                        something_went_wrong_inform_user_that_we_will_add_the_site();
                    }
                })
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_selectors_for_product_page() {
    $("<div id='ditto_dialog'>Is this product page?</div>").dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                $("#ditto_dialog").dialog('close');
                get_product_page_title_selector_dialog();
            },
            "No": function () {
                $("#ditto_dialog").dialog('close');
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    })
}

function get_product_page_title_selector_dialog() {
    $(".gs_hover").removeClass("gs_hover");
    $(`
        <div class="get_result_dialog">
            Highlight the title and press 'A' in the keyboard
        <div>
    `).dialog({
        modal: true,
        close: destroy_dialog_on_close,
        buttons: {
            "ok": get_product_page_title_selector,
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_product_page_title_selector() {
    display_reminder_div("Highlight the title and press 'A' in the keyboard");
    $(".get_result_dialog").dialog('close');
    highlight_on_hover = true;
    document.addEventListener("keydown", product_page_title_select_key_down_listener);
}

function product_page_title_select_key_down_listener(e) {
    if (e.key == "a" || e.key == "A") {
        var selected_element = $(".gs_hover");
        if (selected_element.length <= 0) {
            $.toast("highlight Title and press A")
            return;
        }
        highlight_on_hover = false;
        document.removeEventListener("keydown", product_page_title_select_key_down_listener);
        if (selected_element) {
            close_reminder_div();
            extract_product_page_title_selector(selected_element);
        }
    }
}
var product_page_title_selector = "";

function extract_product_page_title_selector(element) {
    product_page_title_selector = get_selector_for_element(element);
    if (product_page_title_selector) {
        get_product_page_title_feed_back();
    }
    $(".gs_hover").removeClass("gs_hover");
}

function get_product_page_title_feed_back() {
    close_reminder_div();
    var title = $("body").find(product_page_title_selector + ":eq(0)").text();
    if (title) {
        title = $.trim(title);
    }
    $(`<div class='title_feed_back_dialog'>You have selected "${title}" as Title</div>`).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                $(".title_feed_back_dialog").dialog('close');
                get_product_page_price_selector_dialog();
            },
            "No": function () {
                $(".title_feed_back_dialog").dialog('close');
                $(`<div class='title_re_select_dialog'>Do you want to reselect Title</div>`).dialog({
                    title: "OPSOPI Dialog",
                    modal: true,
                    draggable: false,
                    open: add_dialog_title,
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    close: destroy_dialog_on_close,
                    buttons: {
                        "Yes": function () {
                            $(".title_re_select_dialog").dialog('close');
                            get_product_page_title_selector();
                        },
                        "No": function () {
                            $(".title_re_select_dialog").dialog('close');
                            something_went_wrong_inform_user_that_we_will_add_the_site();
                        },
                        "Stop Walkthrough": function () {
                            stop_walk_through();
                        }
                    }
                });
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_product_page_price_selector_dialog() {
    $(".gs_hover").removeClass("gs_hover");
    $(`
        <div class="get_result_dialog">
            Highlight the price and press 'A' in the keyboard
        <div>
    `).dialog({
        modal: true,
        close: destroy_dialog_on_close,
        buttons: {
            "ok": get_product_page_price_selector,
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_product_page_price_selector() {
    display_reminder_div("Highlight the price and press 'A' in the keyboard");
    $(".get_result_dialog").dialog('close');
    highlight_on_hover = true;
    document.addEventListener("keydown", product_page_price_select_key_down_listener);
}

function product_page_price_select_key_down_listener(e) {
    if (e.key == "a" || e.key == "A") {
        var selected_element = $(".gs_hover");
        if (selected_element.length <= 0) {
            $.toast("highlight Title and press A")
            return;
        }
        highlight_on_hover = false;
        document.removeEventListener("keydown", product_page_price_select_key_down_listener);
        if (selected_element) {
            close_reminder_div();
            product_page_extract_price_selector(selected_element);
        }
    }
}
var product_page_price_selector = "";

function product_page_extract_price_selector(element) {
    product_page_price_selector = get_selector_for_element(element);
    if (product_page_price_selector) {
        get_product_page_price_feed_back();
    }
    $(".gs_hover").removeClass("gs_hover");
}

function get_product_page_price_feed_back() {
    close_reminder_div();
    var price = $("body").find(product_page_price_selector + ":eq(0)").text();
    if (price) {
        price = $.trim(price);
        price = process_price_for_user_added_site(price);
    }
    $(`<div class='price_feed_back_dialog'>
        You have selected "${price}" as Price
        </div>
    `).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                $(".price_feed_back_dialog").dialog('close');
                get_product_page_image_selector_dialog();
            },
            "No": function () {
                $(".price_feed_back_dialog").dialog('close');
                $(`<div class='price_re_select_dialog'>Do you want to reselect Price</div>`).dialog({
                    title: "OPSOPI Dialog",
                    modal: true,
                    draggable: false,
                    open: add_dialog_title,
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    close: destroy_dialog_on_close,
                    buttons: {
                        "Yes": function () {
                            $(".price_re_select_dialog").dialog('close');
                            get_product_page_price_selector_dialog();
                        },
                        "No": function () {
                            $(".price_re_select_dialog").dialog('close');
                            something_went_wrong_inform_user_that_we_will_add_the_site();
                        },
                        "Stop Walkthrough": function () {
                            stop_walk_through();
                        }
                    }
                });
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_product_page_image_selector_dialog() {
    $(".gs_hover").removeClass("gs_hover");
    $(`
        <div class="get_result_dialog">
            Highlight the image and press 'A' in the keyboard
        <div>
    `).dialog({
        modal: true,
        close: destroy_dialog_on_close,
        buttons: {
            "ok": get_product_page_image_selector,
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function get_product_page_image_selector() {
    display_reminder_div("Highlight the image and press 'A' in the keyboard");
    $(".get_result_dialog").dialog('close');
    highlight_on_hover = true;
    document.addEventListener("keydown", product_page_image_select_key_down_listener);
}

function product_page_image_select_key_down_listener(e) {
    if (e.key == "a" || e.key == "A") {
        var selected_element = $(".gs_hover");
        if (selected_element.length <= 0) {
            $.toast("highlight Title and press A")
            return;
        }
        highlight_on_hover = false;
        document.removeEventListener("keydown", product_page_image_select_key_down_listener);
        if (selected_element.length > 0) {
            close_reminder_div();
            extract_product_page_image_selector(selected_element);
        }
    }
}
var product_page_image_selector = "";

function extract_product_page_image_selector(element) {
    var img_element = "";
    if ($(element).length > 0 && $(element).find("img[src]:eq(0)").length > 0) {
        img_element = $(element).find("img[src]:eq(0)");
    } else if ($(element).length > 0 && $(element).get()[0].tagName.toLowerCase() == "img") {
        img_element = $(element);
    }
    product_page_image_selector = get_selector_for_image_element(img_element);
    if (product_page_image_selector) {
        get_product_page_image_feed_back();
    }
    $(".gs_hover").removeClass("gs_hover");
}

function get_product_page_image_feed_back() {
    close_reminder_div();
    var img_src = "";
    var image_select = $("body").find(product_page_image_selector + ":eq(0)");
    if (image_select.length > 0) {
        img_src = $(image_select).attr("src");
    } else {
        var img_from_first_slector = get_img_src_from_result_selector("body", first_result_element_selector);
        if (img_from_first_slector) {
            img_src = img_from_first_slector;
        }
    }
    $(`<div class='image_feed_back_dialog'>
            You have selected the following image :
            <div style="max-width:200px; max-height:200px;">
                <img src ="${img_src}">
            </div>
        </div>
    `).dialog({
        title: "OPSOPI Dialog",
        modal: true,
        draggable: false,
        open: add_dialog_title,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        close: destroy_dialog_on_close,
        buttons: {
            "Yes": function () {
                $(".image_feed_back_dialog").dialog('close');
                check_product_page_selectors_and_save();
            },
            "No": function () {
                $(".image_feed_back_dialog").dialog('close');
                $(`<div class='image_re_select_dialog'>Do you want to reselect Image</div>`).dialog({
                    title: "OPSOPI Dialog",
                    modal: true,
                    draggable: false,
                    open: add_dialog_title,
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    close: destroy_dialog_on_close,
                    buttons: {
                        "Yes": function () {
                            $(".image_re_select_dialog").dialog('close');
                            get_product_page_image_selector_dialog();
                        },
                        "No": function () {
                            $(".image_re_select_dialog").dialog('close');
                            something_went_wrong_inform_user_that_we_will_add_the_site();
                        }
                    }
                });
            },
            "Stop Walkthrough": function () {
                stop_walk_through();
            }
        }
    });
}

function check_product_page_selectors_and_save() {
    var title = $.trim($(product_page_title_selector + ":eq(0)").text());
    var price = $.trim($(product_page_price_selector + ":eq(0)").text());
    var image = $(product_page_image_selector + ":eq(0)").attr("src");
    if (title && price && image) {
        chrome.storage.local.get({
            "user_added_sites_pp": {}
        }, function (response) {
            if (response.user_added_sites_pp) {
                var user_added_sites_pp = response.user_added_sites_pp;
                var deets_obj = {};
                deets_obj["title_selector"] = product_page_title_selector;
                deets_obj["price_selector"] = product_page_price_selector;
                deets_obj["image_selector"] = product_page_image_selector;
                user_added_sites_pp[window.location.hostname] = deets_obj;
                chrome.storage.local.set({
                    "user_added_sites_pp": user_added_sites_pp
                }, function (response) {
                    chrome.storage.local.remove("add_site_deets");
                    success_added_site_message();
                });
            }
        });
    } else {
        something_went_wrong_inform_user_that_we_will_add_the_site();
    }
}
chrome.storage.local.get({
    "user_added_sites_pp": {}
}, function (response) {
    if (response.user_added_sites_pp[window.location.hostname]) {
        var selectors = response.user_added_sites_pp[window.location.hostname];
        var title = $.trim($(selectors['title_selector'] + ":eq(0)").text());
        var price = $.trim($(selectors['price_selector'] + ":eq(0)").text());
        var image = $(selectors['image_selector'] + ":eq(0)").attr("src");
        if (title && price && image) {
            var pageDeets = {
                prod_title: title,
                prod_categ: "",
                prod_price: price,
                prod_link: window.location.href,
                prod_srch: title,
                product_id: "",
                prod_img: image,
                prod_site: window.location.hostname
            }
            update_data_for_spa(pageDeets);
        }
    }
});
chrome.storage.local.get({
    "user_added_scripts": []
}, function (response) {
    if (response.user_added_scripts.indexOf(window.location.hostname) > -1) {
        chrome.runtime.sendMessage({
            "method": "get_page_detais_from_js",
            "hostname": window.location.hostname,
            "page_html": $("html").html()
        }, function (response) {
            if (response.result_found && response.title && response.prod_price && response.img_src) {
                var pageDeets = {
                    prod_title: response.title,
                    prod_categ: "",
                    prod_price: response.prod_price,
                    prod_link: window.location.href,
                    prod_srch: response.title,
                    product_id: "",
                    prod_img: response.img_src,
                    prod_site: window.location.hostname
                }
                update_data_for_spa(pageDeets);
            }
        });
    }
});
var display_reminder_effect_timer = "";

function display_reminder_div(msg) {
    if (display_reminder_effect_timer) {
        window.clearInterval(display_reminder_effect_timer);
    }
    var font_color = "white";
    var body_color = "#82ceee"
    var elem =
        `
    <div id="ditto_info_ribbon" style="position:fixed; bottom:0px; height:100px; width:100%; text-align:center; z-index:2147483647;">
        

        <div style="width:99%; background-color:${body_color}; display:inline-block;height:90px; padding:5px; color:${font_color}; border-radius:5px; font-weight:bold;">

            <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:55px;">
                <div style="text-aligncenter; font-size:20px;">
                    ${msg}
                </div>
            </div>

            <div style="display:flex; flex-direction:row-reverse; margin-right:5px;">
                ${dialog_title}
            </div>

        </div>
    </div>
    `
    $("#ditto_info_ribbon").remove();
    $("body").append(elem);
    display_reminder_effect_timer = setInterval(function () {
        if ($("#ditto_info_ribbon").length > 0) {
            $("#ditto_info_ribbon").effect("shake", {
                "direction": "up",
                "times": 2
            });
        }
    }, 3000);
}

function close_reminder_div() {
    $("#ditto_info_ribbon").remove();
    if (display_reminder_effect_timer) {
        window.clearInterval(display_reminder_effect_timer);
    }
}
window.addEventListener('beforeunload', function (e) {
    chrome.storage.local.get({
        "switch_tab_msg_url": ""
    }, function (response) {
        if (response.switch_tab_msg_url && response.switch_tab_msg_url == window.location.href) {
            chrome.storage.local.remove(["switch_tab_msg_url"]);
        }
    });
});