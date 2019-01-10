var popup_frame = document.querySelectorAll("#mc_pop_up div")[1] && document.querySelectorAll("#mc_pop_up div")[1].shadowRoot && document.querySelectorAll("#mc_pop_up div")[1].shadowRoot.querySelector("iframe")

window.addEventListener("message", function(message) {

    if (message.origin == 'chrome-extension://' + chrome.runtime.id && message.data.origin == 'popup') {
        // got from popup
        console.log('message from popup');
        var popup_frame = document.querySelector("iframe#mc_pop_up")
        if (popup_frame) {
            if (message.data.type == "page_info") {
                // get_the_images
                // send it
                // popup_frame.contentWindow.postMessage({'origin':'ext','text':'hello'},'chrome-extension://'+chrome.runtime.id)
                var image_list = get_images_for_results();
                popup_frame.contentWindow.postMessage({
                    'origin': 'ext',
                    'type': 'page_info',
                    'data-type': 'all_images',
                    'data': image_list,
                    'prod_deets': get_prod_deets()
                }, 'chrome-extension://' + chrome.runtime.id);
            } else if (message.data.type == "popup_track") {
                console.log("popup track handler");
                handle_popup_track({
                    product_id: message.data.product_id,
                    prod_site: message.data.prod_site,
                    prod_price: message.data.prod_price,
                    prod_link: message.data.prod_link
                });
            }

        }
    }
});

function get_prod_deets() {
    if (typeof prod_deets !== 'undefined' && prod_deets !== null && (!(back_search_sites.indexOf(prod_deets.prod_site) > -1))) {
        if (prod_deets.prod_link == window.location.href) {
            return prod_deets;
        } else {
            return 'none';
        }
    } else {
        return 'none';
    }

}

var image_results = {};

function get_images_for_results() {
    var image_list = document.body.querySelectorAll('img[src]');
    image_list = filter_by_visibility(image_list);
    image_list = filter_not_loaded(image_list);
    image_list = filter_by_src_type(image_list);
    image_list = filter_by_size(image_list);

    var src_list = filter_undefined(image_list);


    console.log(src_list.length);
    src_list = filter_repeating_src(src_list);
    console.log("final", src_list.length);
    return src_list;
}

function filter_by_visibility(_imgNodeList) {
    var _filtered = [],
        i, end = _imgNodeList.length;

    for (i = 0; i < end; i++) {
        var _img = _imgNodeList[i],
            _style = window.getComputedStyle(_img);

        if (_style.getPropertyValue('display') != 'none') {
            _filtered.push(_img);
        }
    }
    console.log("visi filter", _imgNodeList.length, _filtered.length);
    return _filtered;
}


function filter_by_size(_imgNodeList) {
    var minScreenWidth = 224,
        sizeRatioH = 3,
        sizeRatioV = 0.3,
        _filtered = [],
        i, end = _imgNodeList.length;

    for (i = 0; i < end; i++) {
        var _img = _imgNodeList[i],
            _width = _img.naturalWidth,
            _height = _img.naturalHeight,
            _ratio = _width / _height;

        if (_width >= minScreenWidth && _ratio <= sizeRatioH && _ratio >= sizeRatioV) {
            _filtered.push(_img);
        }
    }


    var _filtered_1 = [];
    for (var i = 0; i < _imgNodeList.length; i++) {
        var img = _imgNodeList[i];
        if (img.naturalHeight >= 1.2 * img.naturalWidth && img.naturalWidth > 100 && img.naturalHeight > 100) {
            _filtered.push(img);
        }
    }
    console.log("size filter", _imgNodeList.length, _filtered.length);
    // return _filtered;

    if (_filtered.length > _filtered_1.length) {
        return _filtered;
    } else {
        return _filtered_1;
    }

    // return _imgNodeList;
}

function filter_not_loaded(_imgNodeList) {
    var _filtered = [];
    for (var i = 0; i < _imgNodeList.length; i++) {
        if (_imgNodeList[i].complete) {
            _filtered.push(_imgNodeList[i]);
        }
    }
    console.log("load filter", _imgNodeList.length, _filtered.length);
    return _filtered;
}

function filter_by_src_type(_imgNodeList) {
    var _filtered = [];
    for (var i = 0; i < _imgNodeList.length; i++) {
        var src = _imgNodeList[i].src
        if (!src.match("data:image/svg")) {
            _filtered.push(_imgNodeList[i]);
        }
    }
    console.log("src lilter", _imgNodeList.length, _filtered.length);
    return _filtered;
}

function filter_undefined(image_list) {
    var src_list = [];
    for (var i = 0; i < image_list.length; i++) {
        var src = $(image_list[i]).attr('src');
        if (src) {
            if (src.startsWith("http")) {
                src_list.push(src);
            }
        } else {
            console.log(image_list[i]);
        }
    }
    console.log("undefined filter", image_list.length, src_list.length);
    return src_list;
}

function filter_repeating_src(src_list) {
    console.log(src_list.length);
    var _filtered = $.unique(src_list);
    console.log("rep filter", src_list.length, _filtered.length);
    return _filtered;
}


function filter_relative_src(_imgNodeList) {
    var _filtered = [];
    for (var i = 0; i < _imgNodeList.length; i++) {
        var src = $(image_list[i]).attr('src');
        if (src && src.startsWith("http")) {
            src_list.push(src);
        } else {
            console.log(image_list[i]);
        }
    }
    console.log("load filter", _imgNodeList.length, _filtered.length);
    return _filtered;
}

function handle_popup_track(prod_deets) {
    chrome.storage.local.get({
        "emmy": "",
        "uuid": "",
        "gcm_id": ""
    }, function(emmy_response) {
        var parcel_obj_beaten = {
            'pid': prod_deets.product_id,
            'website': prod_deets.prod_site,
            'email_id': emmy_response.emmy,
            'start_price': prod_deets.prod_price,
            'gcm_id': emmy_response.gcm_id,
            'url': prod_deets.prod_link,
            'client_type': 5,
            'tt': 1
        }
        var req_send = backPostGet({
            type: "POST",
            // url: "http://shades.makkhichoose.com/pricealert/trackpid",
            // url: "https://data1.makkhichoose.com/requestdrop",
            url: "https://smartmakkhi.appspot.com/ibqd/trackrequest",
            // data: JSON.stringify(parcel_obj),
            data: JSON.stringify(parcel_obj_beaten),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            timeout: 3500,
        });
        req_send.done(function(response) {
            var add_datesecs = new Date().getTime();
            // var pid = pid_obj.pid.slice(-2) + pid_obj.pid.slice(0,-2)
            var pid = prod_deets.prod_site + prod_deets.product_id;
            var piddle_pair = {};
            piddle_pair[pid] = add_datesecs;
            chrome.runtime.sendMessage({
                method: "setTrackPiddle",
                key: JSON.stringify(piddle_pair)
            }, function(response) {});

            $(mc_root).find("#preview_min_root #pv_track_button #track_icon").removeClass('track')
            $(mc_root).find("#preview_min_root #pv_track_button #track_icon").css("color", "#82ceee");
            $(mc_root).find("#preview_min_root #pv_track_button").attr("title", "You can see all the product you have been following by clicking here");

            var popup_frame = document.querySelector("iframe#mc_pop_up");
            if (popup_frame) {
                popup_frame.contentWindow.postMessage({
                    'origin': 'ext',
                    'type': 'prod_track_update',
                    pid: prod_deets.product_id
                }, 'chrome-extension://' + chrome.runtime.id);
            }

        });

    });
}