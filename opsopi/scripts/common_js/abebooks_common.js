function back_search_ak(prod_deets) {
    var search_term = prod_deets.prod_title;
    if (prod_deets.book_page) {
        search_term = prod_deets.prod_srch;
    }
    var searchURL = "https://www.abebooks.com/servlet/SearchResults?tn=" + encodeURIComponent(search_term).replace("%20", "+");
    if (prod_deets.book_page) {
        searchURL = "https://www.abebooks.com/servlet/SearchResults?isbn=" + encodeURIComponent(search_term).replace("%20", "+");
    }
    var dyn_req = backPostGet({
        type: "GET",
        url: searchURL
    });
    dyn_req.done(function (response) {
        var extracted_deets = extract_result(response);
        if (extracted_deets.is_found && title_filter(prod_deets.prod_title, extracted_deets.title)) {
            insert_price_result_box(make_results_box(extracted_deets, 'searchid', false));
        } else {
            insert_manual_search_box(make_manual_search_box({
                "prod_site": "ak",
                "prod_link": searchURL,
                "website": "abebooks",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        var resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if (resp_elem_wm.find(".result-set").length > 0) {
            var results = resp_elem_wm.find(".result-set .result:eq(0)");
            var firstResult = results[0];
            try {
                deets['prod_link'] = $(firstResult).find("a[itemprop='url']").attr("href");
                if (!deets['prod_link'].startsWith("https://")) {
                    deets['prod_link'] = "https://www.abebooks.com" + deets['prod_link'];
                }
                deets['title'] = $.trim($(firstResult).find("a[itemprop='url'] span").text());
                deets['prod_price'] = parseFloat($(firstResult).find(".srp-item-price").text().replace("US$", "").replace(/[\s$,]/g, ''));
                deets['website'] = 'ak';
                deets['prod_site'] = 'abebooks';
                deets['img_src'] = $(firstResult).find(".srp-item-image").attr("src");
                deets['is_found'] = true;
            } catch (err) {
                deets['is_found'] = false;
            }
        }
        if (!(deets['prod_link'] && deets['title'] && deets['prod_price'] && deets['website'])) {
            deets['is_found'] = false;
        } else {
        }
        return _.clone(deets);
    }
}