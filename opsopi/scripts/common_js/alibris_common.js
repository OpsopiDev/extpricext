function back_search_ab(prod_deets) {
    var search_term = prod_deets.prod_title;
    if (prod_deets.book_page) {
        search_term = prod_deets.prod_srch;
    }
    var searchURL = "https://www.alibris.com/booksearch?keyword=" + encodeURIComponent(search_term).replace("%20", "+");
    var dyn_req = backPostGet({
        type: "GET",
        url: searchURL
    });
    dyn_req.done(function (response, status, xhr) {
        var extracted_deets = extract_result(response, xhr);
        if (extracted_deets.is_found && title_filter(prod_deets.prod_title, extracted_deets.title)) {
            insert_price_result_box(make_results_box(extracted_deets, 'searchid', false));
        } else {
            insert_manual_search_box(make_manual_search_box({
                "prod_site": "ab",
                "prod_link": searchURL,
                "website": "strandbooks",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        var resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if (resp_elem_wm.find("#bookSearchN .main").length > 0) {
            var results = resp_elem_wm.find("#bookSearchN .main .work:eq(0)");
            var firstResult = results[0];
            try {
                deets['prod_link'] = $(firstResult).find("h2 a").attr("href");
                if (!deets['prod_link'].startsWith("https://") && deets['prod_link'].startsWith("/")) {
                    deets['prod_link'] = "https://www.alibris.com/" + deets['prod_link'];
                }
                deets['title'] = $.trim($(firstResult).find("h2").text());
                deets['prod_price'] = parseFloat($(firstResult).find(".price:eq(0)").text().replace(/[\s$,]/g, ''));
                deets['website'] = 'ab';
                deets['prod_site'] = 'alibris';
                deets['img_src'] = $(firstResult).find("img").attr("src");
                deets['is_found'] = true;
            } catch (err) {
                deets['is_found'] = false;
            }
        } else if (resp_elem_wm.find("#bookSearchRed").length > 0) {
            try {
                deets['prod_link'] = resp_elem_wm.find(".breadcrumb-genre li:eq(-2) a").attr("href");
                if (!deets['prod_link'].startsWith("https://") && deets['prod_link'].startsWith("/")) {
                    deets['prod_link'] = "https://www.alibris.com/" + deets['prod_link'];
                }
                deets['title'] = $.trim(resp_elem_wm.find(".product-title h1[itemprop='name']").text());
                deets['prod_price'] = parseFloat((resp_elem_wm.find(resp_elem_wm.find(".price:eq(0) p").contents()[0]).text()).replace(/[\s$,]/g, ''));
                deets['website'] = 'ab';
                deets['prod_site'] = 'alibris';
                deets['img_src'] = resp_elem_wm.find(".hero-wrap img").attr("src");
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