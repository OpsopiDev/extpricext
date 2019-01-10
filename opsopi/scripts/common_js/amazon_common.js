function back_search_au(prod_deets) {
    var search_term = prod_deets.prod_title;
    if (prod_deets.book_page) {
        search_term = prod_deets.prod_srch;
    }
    var searchURL = "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=" + encodeURIComponent(search_term);
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
                "prod_site": "au",
                "prod_link": searchURL,
                "website": "walmart",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        var resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if (resp_elem_wm.find('ul.s-result-list li.s-result-item').length > 0) {
            try {
                var results = resp_elem_wm.find("ul.s-result-list li.s-result-item");
                var firstResult = results[0];
                var resData = {};
                var asin = $(firstResult).attr("data-asin");
                var resLink = "https://www.amazon.com/gp/product/" + asin;
                var resImage = $($(firstResult).find("img.s-access-image")).attr("src");
                var resTitle = $($(firstResult).find("h2")).text().trim();
                var dolPrice = $($(firstResult).find("span.sx-price-whole")[0]).text();
                var cenPrice = $($(firstResult).find("sup.sx-price-fractional")[0]).text();
                var resPrice = dolPrice + "." + cenPrice;
                resPrice = parseFloat(resPrice.replace(/[$,]/g, ""));
                deets['prod_link'] = resLink;
                deets['title'] = resTitle;
                deets['prod_price'] = resPrice;
                deets['website'] = 'au';
                deets['prod_site'] = 'au';
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