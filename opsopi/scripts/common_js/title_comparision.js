
function dml_distance (prices, damerau) {
    // 'prices' customisation of the edit costs by passing an
    // object with optional 'insert', 'remove', 'substitute', and
    // 'transpose' keys, corresponding to either a constant
    // number, or a function that returns the cost. The default
    // cost for each operation is 1. The price functions take
    // relevant character(s) as arguments, should return numbers,
    // and have the following form:
    //
    // insert: function (inserted) { return NUMBER; }
    //
    // remove: function (removed) { return NUMBER; }
    //
    // substitute: function (from, to) { return NUMBER; }
    //
    // transpose: function (backward, forward) { return NUMBER; }
    //
    // The damerau flag allows us to turn off transposition and
    // only do plain Levenshtein distance.

    if (damerau !== false) damerau = true;
    if (!prices) prices = {};
    var insert, remove, substitute, transpose;

    switch (typeof prices.insert) {
    case 'function': insert = prices.insert; break;
    case 'number': insert = function (c) { return prices.insert; }; break;
    default: insert = function (c) { return 1; }; break; }

    switch (typeof prices.remove) {
    case 'function': remove = prices.remove; break;
    case 'number': remove = function (c) { return prices.remove; }; break;
    default: remove = function (c) { return 1; }; break; }

    switch (typeof prices.substitute) {
    case 'function': substitute = prices.substitute; break;
    case 'number':
        substitute = function (from, to) { return prices.substitute; };
        break;
    default: substitute = function (from, to) { return 1; }; break; }

    switch (typeof prices.transpose) {
    case 'function': transpose = prices.transpose; break;
    case 'number':
        transpose = function (backward, forward) { return prices.transpose; };
        break;
    default: transpose = function (backward, forward) { return 1; }; break; }

    function distance(down, across) {
        // http://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
        var ds = [];
        if ( down === across ) {
            return 0;
        } else {
            down = down.split(''); down.unshift(null);
            across = across.split(''); across.unshift(null);
            down.forEach(function (d, i) {
                if (!ds[i]) ds[i] = [];
                across.forEach(function (a, j) {
                    if (i === 0 && j === 0) ds[i][j] = 0;
                    // Empty down (i == 0) -> across[1..j] by inserting
                    else if (i === 0) ds[i][j] = ds[i][j-1] + insert(a);
                    // Down -> empty across (j == 0) by deleting
                    else if (j === 0) ds[i][j] = ds[i-1][j] + remove(d);
                    else {
                        // Find the least costly operation that turns
                        // the prefix down[1..i] into the prefix
                        // across[1..j] using already calculated costs
                        // for getting to shorter matches.
                        ds[i][j] = Math.min(
                            // Cost of editing down[1..i-1] to
                            // across[1..j] plus cost of deleting
                            // down[i] to get to down[1..i-1].
                            ds[i-1][j] + remove(d),
                            // Cost of editing down[1..i] to
                            // across[1..j-1] plus cost of inserting
                            // across[j] to get to across[1..j].
                            ds[i][j-1] + insert(a),
                            // Cost of editing down[1..i-1] to
                            // across[1..j-1] plus cost of
                            // substituting down[i] (d) with across[j]
                            // (a) to get to across[1..j].
                            ds[i-1][j-1] + (d === a ? 0 : substitute(d, a))
                        );
                        // Can we match the last two letters of down
                        // with across by transposing them? Cost of
                        // getting from down[i-2] to across[j-2] plus
                        // cost of moving down[i-1] forward and
                        // down[i] backward to match across[j-1..j].
                        if (damerau
                            && i > 1 && j > 1
                            && down[i-1] === a && d === across[j-1]) {
                            ds[i][j] = Math.min(
                                ds[i][j],
                                ds[i-2][j-2] + (d === a ? 0 : transpose(d, down[i-1]))
                            );
                        };
                    };
                });
            });
            return ds[down.length-1][across.length-1];
        };
    };
    return distance;
};



function make_match_score(prod_title,response_title,website){

    console.log('in start of make_match_score')

    console.log('logging prod_title');


    console.log(prod_title);

    console.log(response_title);

    console.log(website);

    var spec_match_score;
    var bnm;

    var prd_str=prod_title;
    var resp_str=response_title;

    prod_title=prod_title.replace(/[^a-zA-Z0-9 ]/g, "");
    response_title=response_title.replace(/[^a-zA-Z0-9 ]/g, "");

    prod_title=prod_title.toLowerCase();
    response_title=response_title.toLowerCase();

    console.log('prod_title');
    console.log(prod_title);

    console.log('response title');
    console.log(response_title);
    
    //brand name
    var prod_brand=prod_title.slice(0,prod_title.indexOf(" "));
    var response_brand=response_title.slice(0,response_title.indexOf(" "));

    console.log('prod_brand');
    console.log(prod_brand);

    console.log('resp_brand');
    console.log(response_brand);

    if(prod_brand===response_brand){
        bnm=true;
    }
    else{
        bnm=false;
    }
    //removing first word
    prod_title=prod_title.substr(prod_title.indexOf(" ") + 1);
    response_title=response_title.substr(response_title.indexOf(" ") + 1);

    spec_match_score=make_spec_match_score(prod_title,response_title);

    console.log('prod_title');
    console.log(prod_title);
    console.log('resp_title');
    console.log(response_title);

    var pt_words=prod_title.split(" ");
    var rt_words=response_title.split(" ");

    var pt_words=pt_words.filter(function(value){
        return !((value=="")||(value==" "));
    });

    rt_words=rt_words.filter(function(value){
        return !((value=="")||(value==" "));
        
    });

    console.log(pt_words);
    console.log(rt_words);



    common_words_length=intersect_safe(pt_words,rt_words).length

    console.log(common_words_length);




    console.log(prod_title);
    console.log(response_title);

    var distance=dml_distance()(prod_title,response_title);
    var max_len = Math.max(prod_title.length,response_title.length);

    var common_words_score=common_words_length/Math.max(pt_words.length,rt_words.length);
    var dist_score=distance/max_len;

    if(common_words_score==0){
        common_words_score=-2;
    }

    var final_match_score;
    //making final scores
    if(bnm){
        final_match_score=(1-dist_score)+common_words_score+spec_match_score+1.5;
    }
    else{
        final_match_score=(1-dist_score)+common_words_score+spec_match_score;
    }
    
    console.log(final_match_score);
    console.log(JSON.stringify({website:website,prd_title:prd_str,resp_title:resp_str,dist_score:dist_score,bnm:bnm,common_words_score:common_words_score,spec_match_score:spec_match_score}));
   
    return final_match_score
}

function is_score_ok(score,website){
    if(isBook()){
        return true;
    }
    if((fk_fail==true)&&(fk_fail_search==false)){
        return true;
    }
    if(score>2){
        return true;
    }
    else{

    }
    return false;

}


function intersect_safe(a,b){
    var cwords=a.filter(function(value){

        return b.indexOf(value)!=-1;

    });
    return cwords;
}

function find_spec_words(prod_title){

    //var regexp=/(\d+[a-zA-Z-]+\w+)|( \d+\w+-[\w-]+)|([a-zA-Z]+\w+-[\w-]+)|([a-zA-z]+\d+\w+)|([a-zA-Z]+ \d+[ $])/g;
    var regexp=/(\d+[a-zA-Z-]+\w*)|(\d+\w+-[\w-]*)|([a-zA-Z]+\w+-[\w-]*)|([a-zA-z]+\d+\w*)|([a-zA-Z]+ \d+[ $])/g;
    prod_title=prod_title+" ";
    var match_words=[];
   var match =regexp.exec(prod_title);

    
    while (match != null) {
        // matched text: match[0]
        // match start: match.index
        // capturing group n: match[n]
        //console.log(match[0]);
        match_words.push(match[0]);
        match = regexp.exec(prod_title);
    }
    return match_words;

}

function make_spec_match_score(prod_title, response_title){
    var prod_title_spec_words=find_spec_words(prod_title);
    var resp_title_spec_words=find_spec_words(response_title);

   /* var spec_matched_words= prod_title_spec_words.filter(function(value){

        return (resp_title_spec_words.indexOf(value)!=-1);
    });

    return spec_matched_words.length;
    */
    //console.log(prod_title_spec_words);
    //console.log(resp_title_spec_words);

    var spec_matched_words=prod_title_spec_words.filter(function(value){

            var dist_score;
            if(value.length>3){
                for(i=0;i<resp_title_spec_words.length;i++){
                    dist_score=dml_distance()(value,resp_title_spec_words[i]);
                    
                    if((dist_score/Math.max(value.length,resp_title_spec_words[i].length))<0.20){

                        return true;
                    } 
                }
                return false;
            }
            else{
                return false;
            }

            return false;
    });

    // console.log(spec_matched_words)
    return 2*spec_matched_words.length;

}

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  var domain= a.hostname.split('.')[1];
   return domain.charAt(0).toUpperCase() + domain.slice(1);
}
