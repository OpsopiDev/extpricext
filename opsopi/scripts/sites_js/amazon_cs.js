function isProductPage() {
    if (window.location.href.match("/dp/") || window.location.href.match("/gp/product/")) {
        return true;
    } else {
        return false;
    }
}

function getPageDeets() {
    function getProdTitle() {
        var title = $.trim($("#productTitle").text());
        if (!title) {
            title = $("#ebooksProductTitle").text();
        }
        title = title ? title : "";
        return title;
    }

    function getCategoryFromCrumbs() {
        var breadcrumb_list = $(".a-breadcrumb li a");
        var crumbs = ""
        for (i = 0; i < breadcrumb_list.length; i++) {
            crumbs += $.trim($(breadcrumb_list[i]).text());
            crumbs += "_";
        }
        if (crumbs) {
            crumbs = crumbs.slice(0, -1);
        }
        crumbs = crumbs ? crumbs : "";
        return crumbs;
    }

    function getProdPrice() {
        var price = "";
        price = ($("#dp-container #centerCol #priceblock_ourprice_row .a-color-price").text()).replace(/[\s$,]/g, '')
        if (!price) {
            price = ($("#dp-container #centerCol .swatchElement.selected .a-color-price").text()).replace(/[\s$,]/g, '');
        }
        if (!price) {
            price = ($(".header-price.a-color-price").text()).replace(/[\s$,]/g, '');
        }
        if (!price) {
            price = $("#priceblock_saleprice").text().replace(/[\s$,]/g, '');
        }
        if (!price) {
            if ($(".kindle-price .a-color-price").length > 0) {
                price = $(".kindle-price .a-color-price").text().replace(/[\s$,]/g, '');
            }
        }
        if (price.match('-')) {
            price = price.split('-')[0]
        }
        price = parseFloat(price);
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var az_link = $('link[rel="canonical"]').attr('href');
        var id_val;
        var prod_link = window.location.href
        var product_id = "";
        var az_pid_match_group = "";
        if (az_link.indexOf('/dp/') > -1) {
            id_val = az_link.split('/dp/')[1].split('/')[0];
        } else if (prod_link.match(/\?asin=|\&asin=/i) != null) {
            id_val = prod_link.split(/\?asin=|\&asin=/i)[1].split(/\/+/)[0].split('&')[0];
        } else if (prod_link.indexOf('/dp/') > -1) {
            id_val = prod_link.split('/dp/')[1].split('/')[0].split('?')[0];
        } else if (prod_link.indexOf('/product/') > -1) {
            id_val = prod_link.split(/\/product\/+/)[1].split(/\/+/)[0].split('?')[0];
        } else {
            id_val = '';
        }
        product_id = id_val;
        if (window.location.href.match(/dp\/(.+)\/ref/)) {
            az_pid_match_group = window.location.href.match(/dp\/(.+)\/ref/);
        } else if (window.location.href.match(/dp\/(.+)\/\?/)) {
            az_pid_match_group = window.location.href.match(/dp\/(.+)\/\?/);
        } else if (window.location.href.match(/dp\/(.+)\?/)) {
            az_pid_match_group = window.location.href.match(/dp\/(.+)\?/);
        } else if (window.location.href.match(/dp\/(.+)$/)) {
            az_pid_match_group = window.location.href.match(/dp\/(.+)$/);
        } else if (window.location.href.match(/\/gp\/product\/(.+?)\b/)) {
            az_pid_match_group = window.location.href.match(/\/gp\/product\/(.+?)\b/);
        }
        if (az_pid_match_group[1]) {
            product_id = az_pid_match_group[1];
        }
        if ($('#variation_size_name select[name="dropdown_selected_size_name"]').val() != undefined) {
            if ($('#variation_size_name select[name="dropdown_selected_size_name"]').val() != -1) {
                product_id = $('#variation_size_name select[name="dropdown_selected_size_name"]').val().split(",")[1];
            } else {
                product_id = $('#variation_size_name select[name="dropdown_selected_size_name"] option:eq(1)').val().split(",")[1];
            }
        }
        var pid = "";
        if (product_id) {
            pid = product_id;
        }
        return pid ? pid : "";
    }

    function getProductImage() {
        var imageSrc = $("#imageBlock img#landingImage").attr('src');
        return imageSrc ? imageSrc : "";
    }

    function getOOSstate() {
        return false;
    }

    function isBookPage() {
        var isbn_text = "";
        if ($("li:contains('ISBN-13')").length > 0) {
            if ($("li:contains('ISBN-13')").text().split("ISBN-13:").length > 0) {
                isbn_text = $.trim($("li:contains('ISBN-13')").text().split("ISBN-13:")[1]).replace("-", "");
            }
        }
        if (isbn_text) {
            return true;
        }
    }

    function getISbn() {
        var isbn_text = "";
        if ($("li:contains('ISBN-13')").length > 0) {
            if ($("li:contains('ISBN-13')").text().split("ISBN-13:").length > 0) {
                isbn_text = $.trim($("li:contains('ISBN-13')").text().split("ISBN-13:")[1]).replace("-", "");
                return isbn_text;
            }
        }
        return "";
    }

    function getDeets() {
        var pageDeets = {
            prod_title: getProdTitle(),
            prod_categ: getCategoryFromCrumbs(),
            prod_price: getProdPrice(),
            prod_link: window.location.href,
            prod_srch: getProdTitle(),
            product_id: getProductId(),
            prod_img: getProductImage(),
            prod_site: "au",
            prod_mrp: getProdPrice(),
            is_oos: getOOSstate(),
            backsearch_site: true
        }
        if (isBookPage()) {
            pageDeets['book_page'] = true;
            pageDeets['prod_srch'] = getISbn();
        }
        return pageDeets;
    }
    return getDeets();
}
if (isProductPage()) {
    update_data_for_spa(getPageDeets());
}