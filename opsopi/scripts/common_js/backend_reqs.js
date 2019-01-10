isdevuse = true;
var back_search_sites = ['ub', 'wm', 'au', 'ta', 'ne', 'os', "bb", "co", "je", "be", "sb", "ab", "tk", "po", "ak", "ae"];

function back_search(prod_deets, website) {
    if (website == "ub") {
        back_search_eb(prod_deets);
    } else if (website == "wm") {
        back_search_wm(prod_deets);
    } else if (website == "au") {
        back_search_au(prod_deets);
    } else if (website == "ta") {
        back_search_ta(prod_deets);
    } else if (website == "ne") {
        back_search_ne(prod_deets);
    } else if (website == "os") {
        back_search_os(prod_deets);
    } else if (website == "bb") {
        back_search_bb(prod_deets);
    } else if (website == "co") {
        back_search_co(prod_deets);
    } else if (website == "je") {
        back_search_je(prod_deets);
    } else if (website == "je") {
        back_search_je(prod_deets);
    } else if (website == "be") {
        back_search_be(prod_deets);
    } else if (website == "sb") {
        back_search_sb(prod_deets);
    } else if (website == "ab") {
        back_search_ab(prod_deets);
    } else if (website == "tk") {
        back_search_tk(prod_deets);
    } else if (website == "po") {
        back_search_po(prod_deets);
    } else if (website == "ak") {
        back_search_ak(prod_deets);
    }
}

function do_backsearch_and_get_results(prod_deets) {
    for (var i = 0; i < back_search_sites.length; i++) {
        if (prod_deets.prod_site != back_search_sites[i]) {
            back_search(prod_deets, back_search_sites[i]);
        }
    }
    do_back_search_for_user_added_sites(prod_deets);
}

function do_back_search_for_user_added_sites(prod_deets) {
    chrome.storage.local.get({
        "user_added_sites": ""
    }, function (response) {
        if (response.user_added_sites) {
            if (response.user_added_sites.length > 0) {
                var user_added_sites = response.user_added_sites;
                for (var i = 0; i < user_added_sites.length; i++) {
                    if (user_added_sites[i]) {
                        if (user_added_sites[i].host_name != window.location.hostname) {
                            fetch_site_for_user_site(user_added_sites[i], prod_deets.prod_title);
                        }
                    } else {}
                }
            } else {}
        }
    });
    chrome.storage.local.get({
        "user_added_scripts": ""
    }, function (response) {
        if (response.user_added_scripts) {
            var user_added_scripts = response.user_added_scripts;
            for (var i = 0; i < user_added_scripts.length; i++) {
                if (window.location.hostname != user_added_scripts[i]) {
                    do_bs_for_user_added_script(user_added_scripts[i], prod_deets.prod_title);
                }
            }
        }
    })
}

function do_bs_for_user_added_script(site, title) {
    var key_to_check = "ua_src" + "_" + site;
    var search_obj = {};
    search_obj[key_to_check] = "";
    chrome.storage.local.get(search_obj, function (response) {
        if (response[key_to_check]) {
            search_obj['method'] = "do_bs_with_js";
            search_obj['src_key'] = key_to_check;
            search_obj['site'] = site;
            search_obj['prod_title'] = title;
            chrome.runtime.sendMessage(search_obj, function (bs_response) {
                bs_response['is_found'] = true;
                if (bs_response["result_found"]) {
                    insert_price_result_box(make_results_box(bs_response, 'searchid', false));
                }
            })
        } else {}
    });
}

function fetch_site_for_user_site(deets, title_to_search) {
    var request_url = make_search_url_from_pattern(deets.search_url_pattern, deets.url_space_delimiter, title_to_search);
    var user_site_fetch_req = backPostGet({
        "type": "GET",
        "url": request_url,
    });
    user_site_fetch_req.done(function (response, b, c) {
        div = document.createElement("div");
        div.innerHTML = response;
        var first_result_element;
        var result_deets = {};
        if (div.querySelector(deets.first_elem_selector)) {
            first_result_element = $(div).find(deets.first_elem_selector + ":eq(0)");
            var title_select = $(first_result_element).find(deets.title + ":eq(0)");
            if (title_select.length > 0) {
                result_deets["title"] = $(title_select).text();
            }
            var image_select = $(first_result_element).find(deets.img_src + ":eq(0)");
            if (image_select.length > 0) {
                result_deets["image"] = $(image_select).attr("src");
            } else {
                var img_from_first_slector = get_img_src_from_result_selector(div, deets.first_elem_selector);
                if (img_from_first_slector) {
                    result_deets['image'] = img_from_first_slector;
                }
            }
            var price_select = $(first_result_element).find(deets.price + ":eq(0)");
            if (price_select.length > 0) {
                result_deets["price"] = $(price_select).text();
            }
            var link_select = $(first_result_element).find(deets.link + ":eq(0)");
            if (link_select.length > 0) {
                result_deets["link"] = $(link_select).attr("href");
            } else {
                var link_from_first_slector = get_link_from_first_result_selector(div, deets.first_elem_selector);
                if (link_from_first_slector) {
                    result_deets['link'] = link_from_first_slector;
                }
            }
            if (result_deets["title"] && result_deets["image"] && result_deets["price"] && result_deets["link"]) {
                var deets_to_display = {};
                deets_to_display['prod_link'] = make_valid_link_for_user_added_sites(result_deets["link"], deets.host_name);
                deets_to_display['title'] = result_deets["title"];
                deets_to_display['prod_price'] = process_price_for_user_added_site(result_deets["price"]);
                deets_to_display['website'] = deets.host_name;
                deets_to_display['prod_site'] = deets.host_name;
                deets_to_display['img_src'] = make_valid_link_for_user_added_sites(result_deets["image"], deets.host_name);
                deets_to_display['is_found'] = true;
                insert_price_result_box(make_results_box(deets_to_display, 'searchid', false));
            } else {}
        }
    });
}

function get_link_from_first_result_selector(div, selector) {
    var first_result = $(div).find(selector);
    if ($(first_result).length > 0) {
        var link_element = $(first_result).find("a");
        if (link_element) {
            var link = $(link_element).attr("href");
            if (link) {
                return link;
            }
        }
    }
    return "";
}

function get_img_src_from_result_selector(div, selector) {
    var first_result = $(div).find(selector);
    if ($(first_result).length > 0) {
        var img_element = $(first_result).find("img");
        if (img_element) {
            var link = $(img_element).attr("src");
            if (link) {
                return link;
            }
        }
    }
    return "";
}

function make_valid_link_for_user_added_sites(link, host_name, settings) {
    if (link.startsWith("//")) {
        link = "http:" + link;
    } else if (!link.startsWith("http")) {
        link = "http://" + host_name + "/" + link;
    }
    return link;
}

function process_price_for_user_added_site(price, settings) {
    var price_modified = price.replace(/[^\d^.^,]/g, "");
    return price_modified;
}

function title_filter(product_page_title, search_result_title) {
    var ppt_words_array = product_page_title.split(" ");
    var ppt_split_pos = ppt_words_array.length / 2;
    var ppt_1st_half = ppt_words_array.slice(0, ppt_split_pos);
    var ppt_2nd_half = ppt_words_array.slice(ppt_split_pos);
    var srt_words_array = search_result_title.split(" ");
    var srt_split_pos = srt_words_array.length / 2;
    var srt_1st_half = srt_words_array.slice(0, srt_split_pos);
    var srt_2nd_half = srt_words_array.slice(srt_split_pos);
    var first_half_ok = false;
    var second_half_ok = false;
    if (ppt_words_array.length == 1 && srt_words_array.length == 1) {
        if (product_page_title.toLowerCase() == search_result_title.toLowerCase()) {
            return true;
        }
    }
    for (var i = 0; i < ppt_1st_half.length; i++) {
        if (srt_1st_half.indexOf(ppt_1st_half[i]) > -1) {
            first_half_ok = true;
            break;
        }
    }
    for (var i = 0; i < ppt_2nd_half.length; i++) {
        if (srt_2nd_half.indexOf(ppt_2nd_half[i]) > -1) {
            second_half_ok = true;
            break;
        }
    }
    return first_half_ok && second_half_ok;
}