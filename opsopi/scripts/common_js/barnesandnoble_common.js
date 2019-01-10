function back_search_be(prod_deets) {
    var search_term = prod_deets.prod_title;
    if (prod_deets.book_page) {
        search_term = prod_deets.prod_srch;
    }
    var searchURL = "https://www.barnesandnoble.com/s/" + encodeURIComponent(search_term);
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
                "prod_site": "be",
                "prod_link": searchURL,
                "website": "barnesandnoble",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        var resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if (resp_elem_wm.find("#productDetail").length > 0) {
            try {
                deets['prod_link'] = (resp_elem_wm).find("link[rel='canonical']").attr("href");
                deets['title'] = $.trim((resp_elem_wm).find(".pdp-header-title").text());;
                deets['prod_price'] = parseFloat(((resp_elem_wm).find("#pdp-cur-price").text()).replace(/[\s$,]/g, ''));
                deets['website'] = 'be';
                deets['prod_site'] = 'be';
                deets['img_src'] = (resp_elem_wm).find("#pdpMainImage").attr("src");
                if (deets['img_src'].startsWith("https:")) {
                    deets['img_src'] = "https:" + deets['img_src'];
                }
                deets['is_found'] = true;
            } catch (err) {
                console.log(err);
                deets['is_found'] = false;
            }
        } else {
        }
        if (resp_elem_wm.find("#searchGrid").length > 0 && resp_elem_wm.find(".product-shelf-tile-book:eq(0)").length > 0) {
            try {
                var results = resp_elem_wm.find(".product-shelf-tile-book:eq(0)");
                var firstResult = results[0];
                var resData = {};
                var resLink = $(firstResult).find("a.pImageLink").attr("href");
                if (!resLink.startsWith('https://www.barnesandnoble.com')) {
                    resLink = 'https://www.barnesandnoble.com' + resLink;
                }
                var resImage = $(firstResult).find("img").attr("src");
                if (!resImage.startsWith("https:")) {
                    resImage = "https:" + resImage;
                }
                var resTitle = $(firstResult).find(".product-info-title a").attr("title");
                var resPrice = $(firstResult).find(".product-shelf-pricing").text()
                if (resPrice && resPrice.split("$").length > 0) {
                    resPrice = $.trim(resPrice.split("$")[1])
                }
                deets['prod_link'] = resLink;
                deets['title'] = resTitle;
                deets['prod_price'] = resPrice;
                deets['website'] = 'barnesandnoble';
                deets['prod_site'] = 'be';
                deets['img_src'] = resImage;
                deets['is_found'] = true;
            } catch (err) {
                console.log(err);
                deets['is_found'] = false;
            }
        }
        if (!(deets['prod_link'] && deets['title'] && deets['prod_price'] && deets['website'])) {
            deets['is_found'] = false;
        }
        return _.clone(deets);
    }
}