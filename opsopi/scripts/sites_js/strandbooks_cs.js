function isProductPage() {
    if ($(".product-detail").length > 0) {
        return true;
    }
    return false;
}

function getPageDeets() {
    function getProdTitle() {
        var title = $.trim($(".product-detail__name").text());
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
        if ($("[itemprop='price']").length > 0) {
            price = ($("[itemprop='price']").text()).replace(/[\s$,]/g, '')
        }
        price = parseFloat(price);
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var product_id = "";
        if ($("[itemprop='isbn']").length > 0) {
            product_id = $("[itemprop='isbn']").text()
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

    function isBookPage() {
        var isbn_text = "";
        if ($("[itemprop='isbn']").length > 0) {
            isbn_text = $("[itemprop='isbn']").text();
        }
        if (isbn_text) {
            return true;
        }
    }

    function getISbn() {
        var isbn_text = "";
        if ($("[itemprop='isbn']").length > 0) {
            isbn_text = $("[itemprop='isbn']").text();
            if (isbn_text) {
                isbn_text = $.trim(isbn_text).replace("-");
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
            prod_srch: getProductId(),
            product_id: getProductId(),
            prod_img: getProductImage(),
            prod_site: "sb",
            prod_mrp: getProdPrice(),
            is_oos: getOOSstate(),
            backsearch_site: true,
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