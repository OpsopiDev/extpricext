function isProductPage() {
    if (window.location.href.match("Product/Product.aspx")) {
        return true;
    } else {
        return false;
    }
}

function getPageDeets() {
    function getProdTitle() {
        var title = $.trim($("#grpDescrip_h").text());
        title = title ? title : "";
        return title;
    }

    function getCategoryFromCrumbs() {
        var breadcrumb_list = $("#baBreadcrumbTop dd a");
        var crumbs = ""
        for (i = 1; i < breadcrumb_list.length; i++) {
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
        price = $("#landingpage-price > div > div > ul > li.price-current").text()
        if (price) {
            price = price.replace(/[\s$,]/g, '');
        }
        price = parseFloat(price);
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var pid = "";
        pid = url_params['Item'];
        return pid ? pid : "";
    }

    function getProductImage() {
        var imageSrc = "https:" + $(".objImages .mainSlide img").attr('src');
        return imageSrc ? imageSrc : "";
    }

    function getOOSstate() {
        return false;
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
            prod_site: "ne",
            prod_mrp: getProdPrice(),
            is_oos: getOOSstate(),
            backsearch_site: true
        }
        return pageDeets;
    }
    return getDeets();
}
if (isProductPage()) {
    update_data_for_spa(getPageDeets());
}