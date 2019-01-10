window.addEventListener("message", function (event) {
    var message = event.data
    if (message.msg_type == "do_bs_from_script") {
        if (message.deets) {
            execute_script_to_do_search(message.deets);
        }
    } else if (message.msg_type == "SandboxBackPostGetBgResponse") {
        SandboxBackPostGetResponseHandler(message);
    } else if (message.msg_type == "get_page_details_from_html") {
        execute_script_to_extract_details_from_product_page(message.deets);
    }
});

function send_back_response(send_response_id, object_to_send) {
    var fin_obj_to_send = {};
    fin_obj_to_send['type'] = 'backpost_parse_response';
    fin_obj_to_send['res_data'] = object_to_send;
    fin_obj_to_send['send_back_id'] = send_response_id;
    window.parent.postMessage(fin_obj_to_send, "*");
}

function success_handle_maker(send_response_id) {
    return function (prod_link, title, prod_price, website, img_src) {
        var fin_obj = {};
        fin_obj['result_found'] = true;
        if (prod_link && title && prod_price && website && img_src) {
            fin_obj['prod_link'] = prod_link;
            fin_obj['title'] = title;
            fin_obj['prod_price'] = prod_price;
            fin_obj['prod_site'] = website;
            fin_obj['img_src'] = img_src;
        } else {
            fin_obj['result_found'] = false;
        }
        send_back_response(send_response_id, fin_obj);
    }
}

function fail_handle_maker(send_response_id) {
    return function (deets_to_handle_failure) {
        var fin_obj = {};
        fin_obj['result_found'] = false;
        send_back_response(send_response_id, fin_obj);
    }
}

function success_handle_maker_product_page(send_response_id) {
    return function (title, prod_price, img_src, website) {
        var fin_obj = {};
        fin_obj['result_found'] = true;
        if (title && prod_price && img_src && website) {
            fin_obj['title'] = title;
            fin_obj['prod_price'] = prod_price;
            fin_obj['prod_site'] = website;
            fin_obj['img_src'] = img_src;
        } else {
            fin_obj['result_found'] = false;
        }
        send_back_response(send_response_id, fin_obj);
    }
}

function fail_handle_maker_product_page(send_response_id) {
    return function (deets_to_handle_failure) {
        var fin_obj = {};
        fin_obj['result_found'] = false;
        send_back_response(send_response_id, fin_obj);
    }
}

function execute_script_to_do_search(deets) {
    var site = deets.site;
    var title = deets.prod_title;
    var script = deets.script;
    var user_script_executor = new Function("prod_title", "website", "success_call_back", "fail_call_back", script);
    try {
        user_script_executor(title, site, success_handle_maker(deets.send_back_id), fail_handle_maker(deets.send_back_id));
    } catch (e) {
        fail_handle_maker(deets.send_back_id)();
    }
}

function execute_script_to_extract_details_from_product_page(deets) {
    var script = deets.script;
    var user_script_executor = new Function("page_html", "website", "success_call_back", "fail_call_back", script);
    user_script_executor(deets.page_html, deets.hostname, success_handle_maker_product_page(deets.send_back_id), fail_handle_maker_product_page(deets.send_back_id));
}
var bg_response_handlers = {};

function SandboxBackPostGet(json_obj) {
    var deferredObject = $.Deferred();
    var request_id = 'id-' + Math.random().toString(36).substr(2, 16) + (new Date()).getTime();
    var req_obj = {};
    req_obj['type'] = "SandboxBackPostGet";
    req_obj['req_id'] = request_id;
    req_obj['req_obj'] = json_obj;
    bg_response_handlers[request_id] = function (response) {
        if (response.status) {
            if (response.req == 'succ') {
                deferredObject.resolve(response.data, response.text_status, response.jq_xhr);
            } else {
                deferredObject.reject(response.jq_xhr, response.text_status, response.error);
            }
        }
    }
    window.parent.postMessage(req_obj, "*");
    return deferredObject.promise();
}

function SandboxBackPostGetResponseHandler(bg_response_msg) {
    if (bg_response_msg['req_id']) {
        var req_id = bg_response_msg['req_id'];
        var handler = bg_response_handlers[req_id];
        var response = bg_response_msg['response'];
        handler(JSON.parse(response));
        delete bg_response_handlers[req_id];
    }
}
$.ajax = SandboxBackPostGet;