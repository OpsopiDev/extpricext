function isProductPage() {
    if (window.location.href.indexOf("/book/") > -1) {
        return true;
    }
    return false;
}

function getPageDeets() {
    function getProdTitle() {
        var title = $.trim($(".book-title").text());
        title = title ? title : "";
        return title;
    }

    function getCategoryFromCrumbs() {
        var breadcrumb_list = $(".a-breadcrumb li a");
        var crumbs = ""
        return crumbs;
    }

    function getProdPrice() {
        var price = "";
        price = "";
        if ($(".price").length > 0) {
            price = ($(".price").text()).replace(/[\s$,]/g, '')
        }
        price = parseFloat(price);
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var product_id = "";
        if ($("dd.isbn").length > 0) {
            product_id = $("dd.isbn").text();
            product_id = product_id.replace("-", "");
        }
        var pid = "";
        if (product_id) {
            pid = product_id;
        }
        return pid ? pid : "";
    }

    function getProductImage() {
        var imageSrc = "";
        if ($("[itemprop='image']").length > 0) {
            imageSrc = $("[itemprop='image']").attr("src");
        }
        return imageSrc ? imageSrc : "";
    }

    function getOOSstate() {
        return false;
    }

    function getISbn() {
        var product_id = "";
        if ($("dd.isbn").length > 0) {
            product_id = $("dd.isbn").text();
            product_id = product_id.replace("-", "");
        }
        var pid = "";
        if (product_id) {
            pid = product_id;
        }
        return pid ? pid : "";
    }

    function getDeets() {
        var pageDeets = {
            prod_title: getProdTitle(),
            prod_categ: getCategoryFromCrumbs(),
            prod_price: getProdPrice(),
            prod_link: window.location.href,
            prod_srch: getProductId(),
            product_id: getProductId(),
            prod_img: getProductImage(),
            prod_site: "po",
            prod_mrp: getProdPrice(),
            is_oos: getOOSstate(),
            backsearch_site: true,
        }
        if (getISbn()) {
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