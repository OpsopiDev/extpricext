var default_sites = ["www.amazon.com", "www.bestbuy.com", "www.costco.com", "www.ebay.com", "www.jet.com", "www.newegg.com", "www.overstock.com", "www.target.com", "www.walmart.com", "www.abebooks.com", "www.alibris.com", "www.barnesandnoble.com", "www.strandbooks.com", "www.thriftbooks.com"];
var url_params = window.location.search.replace('?', '').split('&').reduce(function (s, c) {
    var t = c.split('=');
    s[t[0]] = t[1];
    return s;
}, {});
$(document).ready(function () {
    $("body").on("click", ".remove_site", function () {
        var selected_inputs = $("#site_list input:checked");
        if (selected_inputs.length > 0) {
            var sites_to_remove = [];
            for (var i = 0; i < selected_inputs.length; i++) {
                var site_host_name = $(selected_inputs[i]).parent().attr('title');
                sites_to_remove.push(site_host_name);
            }
            chrome.storage.local.get({
                "user_added_sites": "",
                "user_added_sites_pp": {}
            }, function (response) {
                var user_added_sites = [];
                if (response.user_added_sites) {
                    user_added_sites = response.user_added_sites;
                    var sites_to_write = [];
                    for (var i = 0; i < user_added_sites.length; i++) {
                        var site = user_added_sites[i].host_name;
                        if (sites_to_remove.indexOf(site) > -1) {
                        } else {
                            sites_to_write.push(user_added_sites[i]);
                        }
                    }
                    var user_added_sites_pp = response.user_added_sites_pp;
                    var user_added_sites_pp_to_write = {};
                    for (var i = 0; i < sites_to_write.length; i++) {
                        var site = sites_to_write[i].hostname;
                        user_added_sites_pp_to_write[site] = user_added_sites_pp[site];
                    }
                    chrome.storage.local.set({
                        "user_added_sites": sites_to_write,
                        "user_added_sites_pp": user_added_sites_pp_to_write
                    }, function () {
                        update_user_added_sites_view();
                        $.toast('sites removed successfully');
                    });
                }
            });
        } else {
            $.toast("please select site site to remove")
        }
    });
    $("body").on("click", ".remove_site_script", function () {
        var selected_inputs = $("#site_script_list input:checked");
        if (selected_inputs.length > 0) {
            var sites_to_remove = [];
            for (var i = 0; i < selected_inputs.length; i++) {
                var site_host_name = $(selected_inputs[i]).parent().attr('title');
                sites_to_remove.push(site_host_name);
            }
            chrome.storage.local.get({
                "user_added_scripts": ""
            }, function (response) {
                var user_added_scripts = [];
                if (response.user_added_scripts) {
                    user_added_scripts = response.user_added_scripts;
                    var sites_to_write = [];
                    for (var i = 0; i < user_added_scripts.length; i++) {
                        var site = user_added_scripts[i];
                        if (sites_to_remove.indexOf(site) > -1) {
                        } else {
                            sites_to_write.push(user_added_scripts[i]);
                        }
                    }
                    var script_keys = [];
                    for (var i = 0; i < sites_to_remove.length; i++) {
                        var key = "ua_src_" + sites_to_remove[i];
                        var key1 = "ua_src_pp_" + sites_to_remove[i];
                        script_keys.push(key);
                        script_keys.push(key1);
                    }
                    chrome.storage.local.set({
                        "user_added_scripts": sites_to_write
                    }, function () {
                        chrome.storage.local.remove(script_keys, function () {
                            update_user_added_script_sites_view();
                            $.toast('sites removed successfully');
                        });
                    });
                }
            });
        } else {
            $.toast("please select site site to remove")
        }
    });
    init();
    if (url_params["origin"]) {
        $("#get_url_input").val(url_params["origin"]);
    }
    chrome.storage.local.get({
        "add_site_deets": ""
    }, function (storage_response) {
        if (storage_response.add_site_deets) {
            show_stop_adding_site();
            $(".site_being_added").text(storage_response.add_site_deets.hostname + " ");
        } else {
            get_domain_from_user();
            if (url_params.origin) {
                $("#get_url_input").val(url_params.origin);
            }
        }
    });
});

function get_domain_from_user() {
    var template = document.querySelector("#get_domain").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function show_stop_adding_site() {
    var template = document.querySelector("#site_being_added").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function ask_user_to_search() {
    var template = document.querySelector("#ask_user_for_search").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function get_method_from_user() {
    var template = document.querySelector("#add_option_container").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function get_js_from_user() {
    var template = document.querySelector("#file_upload").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function get_confirmation_to_add_pp_file(file_name) {
    var template = document.querySelector("#pp_script_add_confirm").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
    $("#disp_div h2").text("Add " + file_name + " as pp script?");
}

function get_js_pp_from_user() {
    var template = document.querySelector("#file_upload_pp").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function get_js_test_from_user() {
    var template = document.querySelector("#user_script_test").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function display_loading() {
    var template = document.querySelector("#loading").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function display_test_results(result) {
    if (result.result_found) {
        var template = document.querySelector("#test_results").content;
        var elem = template.cloneNode(true);
        elem.querySelector(".title_text").textContent = result.title;
        elem.querySelector(".price_text").textContent = result.prod_price;
        elem.querySelector(".image_text a").textContent = result.img_src;
        elem.querySelector(".image_text a").setAttribute("href", result.img_src);
        elem.querySelector(".image_container img").setAttribute("src", result.img_src);
        elem.querySelector(".res_link a").textContent = result.prod_link;
        elem.querySelector(".res_link a").setAttribute("href", result.prod_link);
        document.querySelector("#disp_div").innerHTML = "";
        document.querySelector("#disp_div").appendChild(elem);
    } else {
        var template = document.querySelector("#no_results_found_on_test").content;
        var elem = template.cloneNode(true);
        document.querySelector("#disp_div").innerHTML = "";
        document.querySelector("#disp_div").appendChild(elem);
    }
}

function populate_user_added_sites(user_added_sites) {
    var listing_template_main = document.querySelector("template#site_listing").content;
    if (user_added_sites.length > 0) {
        $("#site_list .no_sites_msg").hide();
    }
    for (var i = 0; i < user_added_sites.length; i++) {
        var listing_template = listing_template_main.cloneNode(true);
        listing_template.querySelector("label").textContent = user_added_sites[i].host_name;
        listing_template.querySelector(".contnent_div").setAttribute("title", user_added_sites[i].host_name);
        $(".site_listing_container .list").append(listing_template.cloneNode(true));
    }
}

function populate_user_added_script_sites(user_added_sites) {
    var listing_template_main = document.querySelector("template#site_listing").content;
    if (user_added_sites.length > 0) {
        $("#site_script_list .no_sites_msg").hide();
    }
    for (var i = 0; i < user_added_sites.length; i++) {
        var listing_template = listing_template_main.cloneNode(true);
        listing_template.querySelector("label").textContent = user_added_sites[i];
        listing_template.querySelector(".contnent_div").setAttribute("title", user_added_sites[i]);
        $(".script_site_listing_container .list").append(listing_template.cloneNode(true));
    }
}

function populate_default_site() {
    var listing_template_main = document.querySelector("template#site_listing").content;
    if (default_sites.length > 0) {
        $("#default_site_list .no_sites_msg").hide();
    }
    for (var i = 0; i < default_sites.length; i++) {
        var listing_template = listing_template_main.cloneNode(true);
        listing_template.querySelector("label").textContent = default_sites[i];
        listing_template.querySelector(".contnent_div").setAttribute("title", default_sites[i]);
        $(".default_site_listing_container .list").append(listing_template.cloneNode(true));
    }
}

function update_user_added_sites_view() {
    chrome.storage.local.get({
        "user_added_sites": ""
    }, function (response) {
        if (response.user_added_sites) {
            $(".site_listing_container .list").empty();
            if (response.user_added_sites.length > 0) {
                populate_user_added_sites(response.user_added_sites);
            } else {
                $("#site_list .no_sites_msg").show();
            }
        }
    });
}

function update_user_added_script_sites_view() {
    chrome.storage.local.get({
        "user_added_scripts": ""
    }, function (response) {
        if (response.user_added_scripts) {
            $(".script_site_listing_container .list").empty();
            if (response.user_added_scripts.length > 0) {
                populate_user_added_script_sites(response.user_added_scripts);
                $("#site_script_list").show();
            } else {
                $("#site_script_list").hide();
            }
        }
    });
}

function show_script_added_msg() {
    var template = document.querySelector("#script_added_msg").content;
    var elem = template.cloneNode(true);
    document.querySelector("#disp_div").innerHTML = "";
    document.querySelector("#disp_div").appendChild(elem);
}

function init() {
    populate_default_site();
    update_user_added_sites_view();
    update_user_added_script_sites_view();
    $("body").on("click", "#get_url_button", function (e) {
        var url = $("#get_url_input").val();
        if (!(url && isUrl(url))) {
            $.toast("Enter a valid url")
            return;
        } else {
            var link = document.createElement("a");
            link.href = url;
            if (default_sites.indexOf(link.hostname) > -1) {
                $.toast("Site already present");
                return;
            }
            chrome.storage.local.get({
                "add_site_deets": "",
                "user_added_sites": "",
                "user_added_scripts": []
            }, function (response) {
                if (response) {
                    if (response.add_site_deets.hostname == link.hostname) {
                        $.toast(link.hostname + " is being added currently");
                        return;
                    } else if (response && response.user_added_sites) {
                        var user_added_sites = response.user_added_sites;
                        var host_name_exist = false;
                        for (var i = 0; i < user_added_sites.length; i++) {
                            if (user_added_sites[i].host_name == link.hostname) {
                                host_name_exist = true;
                                break;
                            } else {}
                        }
                        if (response.user_added_scripts.indexOf(link.hostname) > -1) {
                            host_name_exist = true;
                        }
                        if (host_name_exist) {
                            $.toast(link.hostname + " is already added, pls remove it in the list below to add it again");
                            return;
                        } else {
                            chrome.storage.local.set({
                                "add_site_deets": {
                                    "hostname": link.hostname,
                                    "state": "waiting_for_user_search",
                                }
                            }, function () {
                                get_method_from_user();
                            });
                        }
                    } else if (response && response.user_added_scripts && response.user_added_scripts.indexOf(link.hostname) > -1) {
                        $.toast(link.hostname + "is already added, pls remove it in the list below to add it again");
                        return;
                    } else if (response && !response.user_added_sites && !response.add_site_deets) {
                        chrome.storage.local.set({
                            "add_site_deets": {
                                "hostname": link.hostname,
                                "state": "waiting_for_user_search",
                            }
                        }, function () {
                            get_method_from_user();
                        });
                    }
                }
            });
        }
    });
    $("body").on("click", "#ask_user_for_search_ok_button", function (e) {
        chrome.storage.local.get({
            "add_site_deets": ""
        }, function (response) {
            if (response.add_site_deets) {
                var link = response.add_site_deets.hostname;
                if (!link.startsWith("http")) {
                    link = "http://" + link;
                }
                var add_site_deets = response.add_site_deets;
                add_site_deets["state"] = "waiting_for_user_search";
                chrome.storage.local.set({
                    "add_site_deets": add_site_deets
                }, function () {
                    do_not_do_cleanup_add_sites = true;
                    window.open(link);
                    window.close();
                })
            }
        })
    });
    $("body").on("change", "input#js_upload", function (e) {
        var file = this.files[0];
        js_upload_handle(file);
    });
    $("body").on("change", "input#js_upload_pp", function (e) {
        var file = this.files[0];
        js_upload_pp_handle(file);
    });
    $("body").on("click", ".js_up_button", function (e) {
        chrome.storage.local.get({
            "add_site_deets": {}
        }, function (response) {
            var add_site_deets = response.add_site_deets;
            if (add_site_deets['state']) {
                add_site_deets['state'] = "getting_js_from_user"
                chrome.storage.local.set({
                    "add_site_deets": add_site_deets
                });
            }
        });
        get_js_from_user();
    });
    $("body").on("click", ".guide_button", function (e) {
        ask_user_to_search();
    });
    $("body").on("click", "#test_script_button", function () {
        var title = "";
        title = $("#test_script_input").val();
        chrome.storage.local.get({
            "add_site_deets": ""
        }, function (response) {
            if (response.add_site_deets) {
                var add_site_deets = response.add_site_deets;
                display_loading();
                chrome.runtime.sendMessage({
                    "method": "test_js_with_title",
                    "prod_title": title,
                    "site": add_site_deets.host_name
                }, function (src_response) {
                    display_test_results(src_response);
                });
            }
        });
    });
    $("body").on("click", "#add_current_script", function () {
        get_js_pp_from_user();
    });
    $("body").on("click", "#test_with_new_phrase", function () {
        get_js_test_from_user();
    });
    $("body").on("click", "#upload_new_script", function () {
        get_js_from_user();
    });
    $("body").on("click", "#script_added_ok", function (e) {
        get_domain_from_user();
    })
    $("body").on("click", "#stop_adding_site", function (e) {
        chrome.storage.local.remove(["add_site_deets"], function () {
            get_domain_from_user();
        });
    });
    $("body").on("click", "#get_method_to_get_site_page", function () {
        chrome.storage.local.remove(["add_site_deets"], function () {
            get_domain_from_user();
        });
    });
    $("body").on("click", "#ask_user_search_to_get_method", function () {
        chrome.storage.local.remove(["add_site_deets"], function () {
            get_method_from_user();
        });
    });
    $("body").on("click", "#pp_confirm_yes", function (e) {
        store_scripts();
    });
    $("body").on("click", "#pp_confirm_no", function () {
        chrome.storage.local.remove(["curr_user_added_script_pp"], function () {
            get_js_pp_from_user();
        });
    });
    $("body").on("click", "#bs_add_to_get_method", function () {
        get_method_from_user();
    });
    $("body").on("click", "#bs_test_too_bs_add", function () {
        get_js_from_user();
    });
    $("body").on("click", "#pp_confirm_to_pp_add", function () {
        get_js_pp_from_user();
    });
}
var f = "";

function js_upload_handle(file) {
    if (file.size) {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {
            var file_bin_string = e.target.result;
            chrome.storage.local.get({
                "add_site_deets": ""
            }, function (response) {
                var add_deets = "";
                if (response.add_site_deets) {
                    add_deets = response.add_site_deets;
                    add_deets['state'] = 'user_js_upload';
                    chrome.storage.local.set({
                        "curr_user_added_script_ss": file_bin_string
                    }, function (script_read_resp) {
                        get_js_test_from_user();
                    });
                }
            });
        }
    }
}

function js_upload_pp_handle(file) {
    if (file.size) {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {
            var file_bin_string = e.target.result;
            chrome.storage.local.set({
                "curr_user_added_script_pp": file_bin_string
            }, function (script_read_resp) {
                get_confirmation_to_add_pp_file(file.name);
            });
        }
    }
}

function size_in_words_format(size_in_bytes) {
    var nBytes = size_in_bytes;
    var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    var nMultiple = 0;
    var iter_start = true;
    var nApprox = nBytes / 1024;
    var sOutput = "";
    nApprox = nBytes / 1024;
    while (1) {
        sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
        if (!(nApprox > 1)) {
            break;
        }
        nApprox /= 1024;
        nMultiple++;
    }
    var fin_data = "";
    fin_data = {
        "size_pf": nApprox.toFixed(3),
        "size_sf": aMultiples[nMultiple],
        "size_in_bytes": nBytes,
        "size_strings": nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)",
    }
    return fin_data;
}

function store_scripts() {
    chrome.storage.local.get({
        "add_site_deets": "",
        "curr_user_added_script_ss": "",
        "user_added_scripts": "",
        "curr_user_added_script_pp": ""
    }, function (src_read_resp) {
        if (src_read_resp["add_site_deets"] && src_read_resp["curr_user_added_script_ss"]) {
            var add_site_deets = src_read_resp["add_site_deets"];
            var src = src_read_resp["curr_user_added_script_ss"];
            var curr_site = add_site_deets['hostname'];
            var script_store_key = "ua_src_" + curr_site;
            var src_pp = src_read_resp["curr_user_added_script_pp"];
            var pp_key = 'ua_src_pp_' + curr_site;
            pp_obj_to_store = {}
            pp_obj_to_store[pp_key] = src_pp;
            var user_added_scripts = [];
            if (src_read_resp["user_added_scripts"]) {
                user_added_scripts = src_read_resp["user_added_scripts"];
            }
            if (!(user_added_scripts.indexOf(curr_site) > -1)) {
                user_added_scripts.push(curr_site);
            }
            var src_obj = {};
            src_obj[script_store_key] = src;
            chrome.storage.local.set({
                "user_added_scripts": user_added_scripts
            }, function (response) {
                chrome.storage.local.set(src_obj, function () {
                    chrome.storage.local.set(pp_obj_to_store, function () {
                        chrome.storage.local.remove("add_site_deets");
                        update_user_added_script_sites_view();
                        // show msg saying site has been added 
                        show_script_added_msg();
                    })
                });
            });
        }
    })
}
var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
var localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
var nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

function isUrl(string) {
    if (typeof string !== 'string') {
        return false;
    }
    var match = string.match(protocolAndDomainRE);
    if (!match) {
        return false;
    }
    var everythingAfterProtocol = match[1];
    if (!everythingAfterProtocol) {
        return false;
    }
    if (localhostDomainRE.test(everythingAfterProtocol) ||
        nonLocalhostDomainRE.test(everythingAfterProtocol)) {
        return true;
    }
    return false;
}
var background = chrome.extension.getBackgroundPage();
var do_not_do_cleanup_add_sites = false;
window.addEventListener('unload', function (e) {
    if (do_not_do_cleanup_add_sites) {
        return;
    }
    background.clean_add_Sites();
    return null;
});