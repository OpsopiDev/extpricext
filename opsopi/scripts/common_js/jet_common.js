! function (e) {
    "use strict";
    var t = function () {
        this.cssImportStatements = [], this.cssKeyframeStatements = [], this.cssRegex = new RegExp("([\\s\\S]*?){([\\s\\S]*?)}", "gi"), this.cssMediaQueryRegex = "((@media [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", this.cssKeyframeRegex = "((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", this.combinedCSSRegex = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", this.cssCommentsRegex = "(\\/\\*[\\s\\S]*?\\*\\/)", this.cssImportStatementRegex = new RegExp("@import .*?;", "gi")
    };
    t.prototype.stripComments = function (e) {
        var t = new RegExp(this.cssCommentsRegex, "gi");
        return e.replace(t, "")
    }, t.prototype.parseCSS = function (e) {
        if (void 0 === e) return [];
        for (var t = [];;) {
            var s = this.cssImportStatementRegex.exec(e);
            if (null === s) break;
            this.cssImportStatements.push(s[0]), t.push({
                selector: "@imports",
                type: "imports",
                styles: s[0]
            })
        }
        e = e.replace(this.cssImportStatementRegex, "");
        for (var r, i = new RegExp(this.cssKeyframeRegex, "gi"); null !== (r = i.exec(e));) t.push({
            selector: "@keyframes",
            type: "keyframes",
            styles: r[0]
        });
        e = e.replace(i, "");
        for (var n = new RegExp(this.combinedCSSRegex, "gi"); null !== (r = n.exec(e));) {
            var o = "";
            o = void 0 === r[2] ? r[5].split("\r\n").join("\n").trim() : r[2].split("\r\n").join("\n").trim();
            var l = new RegExp(this.cssCommentsRegex, "gi"),
                p = l.exec(o);
            if (null !== p && (o = o.replace(l, "").trim()), -1 !== (o = o.replace(/\n+/, "\n")).indexOf("@media")) {
                var a = {
                    selector: o,
                    type: "media",
                    subStyles: this.parseCSS(r[3] + "\n}")
                };
                null !== p && (a.comments = p[0]), t.push(a)
            } else {
                var c = {
                    selector: o,
                    rules: this.parseRules(r[6])
                };
                "@font-face" === o && (c.type = "font-face"), null !== p && (c.comments = p[0]), t.push(c)
            }
        }
        return t
    }, t.prototype.parseRules = function (e) {
        var t = [];
        e = (e = e.split("\r\n").join("\n")).split(";");
        for (var s = 0; s < e.length; s++) {
            var r = e[s];
            if (-1 !== (r = r.trim()).indexOf(":")) {
                var i = (r = r.split(":"))[0].trim(),
                    n = r.slice(1).join(":").trim();
                if (i.length < 1 || n.length < 1) continue;
                t.push({
                    directive: i,
                    value: n
                })
            } else "base64," === r.trim().substr(0, 7) ? t[t.length - 1].value += r.trim() : r.length > 0 && t.push({
                directive: "",
                value: r,
                defective: !0
            })
        }
        return t
    }, t.prototype.findCorrespondingRule = function (e, t, s) {
        void 0 === s && (s = !1);
        for (var r = !1, i = 0; i < e.length && (e[i].directive !== t || (r = e[i], s !== e[i].value)); i++);
        return r
    }, t.prototype.findBySelector = function (e, t, s) {
        void 0 === s && (s = !1);
        for (var r = [], i = 0; i < e.length; i++) !1 === s ? e[i].selector === t && r.push(e[i]) : -1 !== e[i].selector.indexOf(t) && r.push(e[i]);
        if ("@imports" === t || r.length < 2) return r;
        var n = r[0];
        for (i = 1; i < r.length; i++) this.intelligentCSSPush([n], r[i]);
        return [n]
    }, t.prototype.deleteBySelector = function (e, t) {
        for (var s = [], r = 0; r < e.length; r++) e[r].selector !== t && s.push(e[r]);
        return s
    }, t.prototype.compressCSS = function (e) {
        for (var t = [], s = {}, r = 0; r < e.length; r++) {
            var i = e[r];
            if (!0 !== s[i.selector]) {
                var n = this.findBySelector(e, i.selector);
                0 !== n.length && (t = t.concat(n), s[i.selector] = !0)
            }
        }
        return t
    }, t.prototype.cssDiff = function (e, t) {
        if (e.selector !== t.selector) return !1;
        if ("media" === e.type || "media" === t.type) return !1;
        for (var s, r, i = {
                selector: e.selector,
                rules: []
            }, n = 0; n < e.rules.length; n++) s = e.rules[n], !1 === (r = this.findCorrespondingRule(t.rules, s.directive, s.value)) ? i.rules.push(s) : s.value !== r.value && i.rules.push(s);
        for (var o = 0; o < t.rules.length; o++) r = t.rules[o], !1 === (s = this.findCorrespondingRule(e.rules, r.directive)) && (r.type = "DELETED", i.rules.push(r));
        return 0 !== i.rules.length && i
    }, t.prototype.intelligentMerge = function (e, t, s) {
        void 0 === s && (s = !1);
        for (var r = 0; r < t.length; r++) this.intelligentCSSPush(e, t[r], s);
        for (r = 0; r < e.length; r++) {
            var i = e[r];
            "media" !== i.type && "keyframes" !== i.type && (i.rules = this.compactRules(i.rules))
        }
    }, t.prototype.intelligentCSSPush = function (e, t, s) {
        var r = t.selector,
            i = !1;
        if (void 0 === s && (s = !1), !1 === s) {
            for (var n = 0; n < e.length; n++)
                if (e[n].selector === r) {
                    i = e[n];
                    break
                }
        } else
            for (var o = e.length - 1; o > -1; o--)
                if (e[o].selector === r) {
                    i = e[o];
                    break
                } if (!1 === i) e.push(t);
        else if ("media" !== t.type)
            for (var l = 0; l < t.rules.length; l++) {
                var p = t.rules[l],
                    a = this.findCorrespondingRule(i.rules, p.directive);
                !1 === a ? i.rules.push(p) : "DELETED" === p.type ? a.type = "DELETED" : a.value = p.value
            } else i.subStyles = i.subStyles.concat(t.subStyles)
    }, t.prototype.compactRules = function (e) {
        for (var t = [], s = 0; s < e.length; s++) "DELETED" !== e[s].type && t.push(e[s]);
        return t
    }, t.prototype.getCSSForEditor = function (e, t) {
        void 0 === t && (t = 0);
        var s = "";
        void 0 === e && (e = this.css);
        for (var r = 0; r < e.length; r++) "imports" === e[r].type && (s += e[r].styles + "\n\n");
        for (r = 0; r < e.length; r++) {
            var i = e[r];
            if (void 0 !== i.selector) {
                var n = "";
                void 0 !== i.comments && (n = i.comments + "\n"), "media" === i.type ? (s += n + i.selector + "{\n", s += this.getCSSForEditor(i.subStyles, t + 1), s += "}\n\n") : "keyframes" !== i.type && "imports" !== i.type && (s += this.getSpaces(t) + n + i.selector + " {\n", s += this.getCSSOfRules(i.rules, t + 1), s += this.getSpaces(t) + "}\n\n")
            }
        }
        for (r = 0; r < e.length; r++) "keyframes" === e[r].type && (s += e[r].styles + "\n\n");
        return s
    }, t.prototype.getImports = function (e) {
        for (var t = [], s = 0; s < e.length; s++) "imports" === e[s].type && t.push(e[s].styles);
        return t
    }, t.prototype.getCSSOfRules = function (e, t) {
        for (var s = "", r = 0; r < e.length; r++) void 0 !== e[r] && (void 0 === e[r].defective ? s += this.getSpaces(t) + e[r].directive + ": " + e[r].value + ";\n" : s += this.getSpaces(t) + e[r].value + ";\n");
        return s || "\n"
    }, t.prototype.getSpaces = function (e) {
        for (var t = "", s = 0; s < 4 * e; s++) t += " ";
        return t
    }, t.prototype.applyNamespacing = function (e, t) {
        var s = e,
            r = "." + this.cssPreviewNamespace;
        void 0 !== t && (r = t), "string" == typeof e && (s = this.parseCSS(e));
        for (var i = 0; i < s.length; i++) {
            var n = s[i];
            if (!(n.selector.indexOf("@font-face") > -1 || n.selector.indexOf("keyframes") > -1 || n.selector.indexOf("@import") > -1 || n.selector.indexOf(".form-all") > -1 || n.selector.indexOf("#stage") > -1))
                if ("media" !== n.type) {
                    for (var o = n.selector.split(","), l = [], p = 0; p < o.length; p++) - 1 === o[p].indexOf(".supernova") ? l.push(r + " " + o[p]) : l.push(o[p]);
                    n.selector = l.join(",")
                } else n.subStyles = this.applyNamespacing(n.subStyles, t)
        }
        return s
    }, t.prototype.clearNamespacing = function (e, t) {
        void 0 === t && (t = !1);
        var s = e,
            r = "." + this.cssPreviewNamespace;
        "string" == typeof e && (s = this.parseCSS(e));
        for (var i = 0; i < s.length; i++) {
            var n = s[i];
            if ("media" !== n.type) {
                for (var o = n.selector.split(","), l = [], p = 0; p < o.length; p++) l.push(o[p].split(r + " ").join(""));
                n.selector = l.join(",")
            } else n.subStyles = this.clearNamespacing(n.subStyles, !0)
        }
        return !1 === t ? this.getCSSForEditor(s) : s
    }, t.prototype.createStyleElement = function (e, t, s) {
        if (void 0 === s && (s = !1), !1 === this.testMode && "nonamespace" !== s && (t = this.applyNamespacing(t)), "string" != typeof t && (t = this.getCSSForEditor(t)), !0 === s && (t = this.getCSSForEditor(this.parseCSS(t))), !1 !== this.testMode) return this.testMode("create style #" + e, t);
        var r = document.getElementById(e);
        r && r.parentNode.removeChild(r);
        var i = document.head || document.getElementsByTagName("head")[0],
            n = document.createElement("style");
        n.id = e, n.type = "text/css", i.appendChild(n), n.styleSheet && !n.sheet ? n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t))
    }, e.cssjs = t
}(this);

function back_search_je(prod_deets) {
    var search_term = prod_deets.prod_title;
    if (prod_deets.book_page) {
        search_term = prod_deets.prod_srch;
    }
    var searchURL = "https://jet.com/search?term=" + encodeURIComponent(prod_deets.prod_title);
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
                "prod_site": "je",
                "prod_link": searchURL,
                "website": "Jet",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        var resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if (resp_elem_wm.find(".iKMVVd").length > 0) {
            try {
                var results = resp_elem_wm.find(".iKMVVd:eq(0)");
                var firstResult = results[0];
                var resData = {};
                deets['prod_link'] = $(firstResult).find("a").attr("href");
                if (!deets['prod_link'].startsWith("https://")) {
                    deets['prod_link'] = "https://www.jet.com" + deets['prod_link'];
                }
                deets['title'] = $(firstResult).find(".loUDst .knAVZA").text();
                if (!deets['title']) {
                    deets['title'] = $(firstResult).find(".jjvspQ").text();
                }
                deets['prod_price'] = $(firstResult).find(".gBFPgE").text().replace(/[$,]/g, "");
                deets['website'] = 'jet';
                deets['prod_site'] = 'je';
                var all_styles = resp_elem_wm[0].querySelectorAll("style");
                var css_string = "";
                for (var i = 0; i < all_styles.length; i++) {
                    css_string = css_string + all_styles[i].innerText;
                }
                var parser = new cssjs();
                var parsed_css = parser.parseCSS(css_string);
                var img_elem = $(firstResult).find(".fIHTxs:eq(1) div:eq(0)")[0];
                var imag_class_list = [].slice.call(img_elem.classList);
                if (imag_class_list.indexOf("sc-cFlXAS") > -1) {
                    imag_class_list.splice(imag_class_list.indexOf("sc-cFlXAS"), 1);
                    if (imag_class_list.length > 0) {
                        var class_with_bg_img = imag_class_list[0];
                        class_with_bg_img = "." + class_with_bg_img;
                        var class_rule = parsed_css.filter(function (css_rule) {
                            if (css_rule.selector == class_with_bg_img && css_rule.hasOwnProperty("rules") && is_property_in_rule_list("background-image", css_rule.rules)) {
                                return true;
                            }
                        });
                        if (class_rule.length > 0) {
                            var bg_img_prop = get_property_from_rule_list("background-image", class_rule[0].rules);
                            if (bg_img_prop) {
                                deets["img_src"] = bg_img_prop.slice(5, -2);
                            }
                        }
                    }
                }
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

function is_property_in_rule_list(style_property, rules_list) {
    var rule_with_prop = rules_list.filter(function (rule) {
        if (rule.directive == style_property) {
            return true;
        }
    });
    if (rule_with_prop.length > 0) {
        return true;
    } else {
        false;
    }
}

function get_property_from_rule_list(style_property, rules_list) {
    var rule_with_prop = rules_list.filter(function (rule) {
        if (rule.directive == style_property) {
            return true;
        }
    });
    if (rule_with_prop.length > 0) {
        return rule_with_prop[0].value;
    } else {
        false;
    }
}