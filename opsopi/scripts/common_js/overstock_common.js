function back_search_os(prod_deets) {
    var searchURL = "https://www.overstock.com/search?keywords=" + encodeURIComponent(prod_deets.prod_title) + "&SearchType=Header";
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
                "prod_site": "os",
                "prod_link": searchURL,
                "website": "overstock",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if ($(resp_elem_wm).find(".product-results-wrapper .product-wrapper:eq(0)").length > 0) {
            try {
                var firstResult = $(resp_elem_wm).find(".product-results-wrapper .product-wrapper:eq(0)");
                var linkItem = $(firstResult).find("a.product-link")[0];
                var resLink = $(linkItem).attr("href");
                var resImage = $($(linkItem).find("img")).attr("src");
                var resTitle = $($(linkItem).find("img")).attr("alt");
                var priceItem = $(firstResult).find("div.product-price-wrapper div.product-price .price-dollar")
                var resPrice = $(priceItem).text().trim().replace("Today: ", "").replace(/[$,]/g, "");
                deets['prod_link'] = resLink;
                deets['title'] = resTitle;
                deets['prod_price'] = resPrice;
                deets['website'] = 'os';
                deets['prod_site'] = 'os';
                deets['img_src'] = resImage;
                deets['is_found'] = true;
            } catch (err) {
                deets['is_found'] = false;
            }
        }
        if (!(deets['prod_link'] && deets['title'] && deets['prod_price'] && deets['website'])) {
            deets['is_found'] = false;
        }
        return _.clone(deets);
    }
}