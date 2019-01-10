var template_results_template = 
`
<template id="makkhi_results">
    <div class="item" style="margin:0px; text-align: left;">
        <a class="result_link" href="" target="_blank" >
            <div class="row" style="padding: 5px 16px;">
                <div class="content">
                    <h5 class= "site_name">SnapDeal </h5>
                    <p class="prod_title" style="min-width: 174px; max-width: 174px; min-height: 40px; max-height:40px; overflow:hidden; line-height: 19px; ">lr142e3437 ASUS ZenBoo </p>
                    <h1 class="main-price mc_price">
                        $24,900 
                    </h1>
                </div>
                <div class="image" style="width:130px; height:98px;">
                    <img style="max-width:100px; max-height:98px; width:auto; height:auto;" src="resources/images/laptop.jpg">    
                </div>
            </div>
        </a>
    </div>
</template>


<template id="dittory_results_left">

    <div class="content ditto_meta price_result"  data-pid="" data-score="" data-cluster-string="" data-disp-order="" title="" style="border-bottom: 1px solid #eeeeee; border-right: 1px solid #eeeeee; display: inline-block; max-width:150px; width:150px; margin:5px 1px 5px 1px; padding: 0px; ">
        <a href="" target="_blank" class="result_link">
            <div style=" width:150px;height:125; max-height:125px; max-width:150px;">
                <img  class="ditto_img" style="max-width:150px; max-height:125px; width:auto; height:auto; "src="resources/images/laptop.jpg">
            </div>
            <div style="display:flex;justify-content:space-between; max-width:145px; padding-right:2px;" >
                <span class="ditto_website" style="font-family:'mc_lato','sans-serif';font-size: 12px;font-weight: bold; color: #9eb3b3;"></span> <span class="ditto_price mc_price" style=" line-height: 22px;font-size: 18px;font-family: baloo;font-weight: bold;"></span>
            </div>
        </a>
    </div>
    
</template>



<template id="dittory_results_top">

    <div class="content ditto_meta price_result"  data-pid="" data-score="" data-cluster-string="" data-disp-order="" title="" style="border-right: 1px solid #eeeeee; height:250px;">
        <a href="" target="_blank" class="result_link">
            <div style=" width:177px;height:210px; max-height:210px; max-width:177px;">
                <img  class="ditto_img" style="max-width:177px; max-height:210px; width:auto; height:auto; "src="resources/images/laptop.jpg">
            </div>
            <div style="display:flex;justify-content:space-between; max-width:150px; margin-bottom:5px; margin-top: 5px;" >
                <span class="ditto_website" style="font-family:'mc_lato','sans-serif';font-size: 12px;font-weight: bold; color: #9eb3b3;"></span> <span class="ditto_price mc_price" style=" line-height: 22px;font-size: 18px;font-family: baloo;font-weight: bold;"></span>
            </div> 
        </a>
    </div>
    
</template>



<template id="flights_results">
    <a href="" class="link" target="_blank">
        <div class="set-border">
            <div class="one-quarter">
                <h5 class="site_name">Airline</h5>
                <h4 class="airline_name" >
                    Jet Airways
                </h4>
            </div>
            <div class="one-quarter" style="font-family: 'mc_lato','sans-serif';">
                <h5 style="font-family: 'mc_lato','sans-serif';">Onward: <span class="j_date">15 nov</span> <span class="j_start_time"> 20:45</span> &nbsp; <span class="j_edate">15 nov</span> <span class="j_end_time"> 20:45</span></h5>
                <h5 style="font-family: 'mc_lato','sans-serif';"><span class = "j_dur">23</span> hr <span class="j_stops">4</span> stops</h5>
            </div>
            <div class="one-quarter return_deets" style="font-family: 'mc_lato','sans-serif';">
                <h5 style="font-family: 'mc_lato','sans-serif';">Return: <span class="r_date">15 nov</span> <span class="r_start_time"> 20:45</span> <span class="r_edate">15 nov</span> <span class="r_end_time"> 20:45</span> </h5>
                <h5 style="font-family: 'mc_lato','sans-serif';"><span class = "r_dur">23</span> hr <span class="r_stops">4</span> stops</h5>
            </div>
            <div class="one-quarter">
                <h1 class="main-price">$ 24,900 </h1>
            </div>
        </div>
    </a>
</template>


<template id="flights_results_left">
    <a href="" class="link" target="_blank">
        <div class="row full-size  row-inline" style="padding-top:10px; padding-bottom:10px;">
            <div style="display: flex; justify-content: space-between; color:black;">
                <span  style="font-family: 'mc_lato','sans-serif';;" class="airline_name" style="align-self: flex-start;"></span>
                <span style="font-family: 'mc_lato','sans-serif';;" class="site_name" style="align-self: flex-end;"> Clear Trip</span>
            </div>
            <table class="content">
                <tbody style="width:100%;">
                <tr style="width:100%;">
                    <td style="padding-right:0px; min-width:97px; max-width:33%;">
                       <div style="font-family: 'mc_lato','sans-serif';; font-size: 12px; font-weight: bold; color: #9eb3b3; margin-bottom:5px;">Onward:</div>

                        <h5><span class="j_date">15 nov</span> <span class="j_start_time">20:45</span></h5>
                    </td>
                    <td style="text-align: right; max-width:33%; padding-right:0px; width:90px;" >
                        <br>
                        <h5><span class="j_dur">23 </span>hr</h5>
                    </td>
                    <td style="text-align: right; max-width:33%; padding-right:0px; width:97px;">
                        <br>
                        <h5><span class="j_stops">4 </span>stops</h5>
                    </td>
                </tr>
                <tr style="width:100%;" class="return_deets">
                    <td style="padding-right:0px; min-width:97px; max-width:33%;">
                        <div style="font-family: 'mc_lato','sans-serif';; font-size: 12px; font-weight: bold; color: #9eb3b3; margin-bottom:5px;">Return:</div>
                        <h5>  <span class="r_date">15 nov</span> <span class="r_start_time">20:45</span></h5>
                    </td>
                    <td style="text-align: right; max-width:33%; padding-right:0px; width:90px;">
                        <br>
                        <h5><span class="r_dur">23 </span>hr</h5>
                    </td>
                    <td style="text-align: right; max-width:33%; padding-right:0px; width:97px;">
                        <br>
                        <h5><span class="r_stops">4 </span>stops</h5>
                    </td>
                </tr>
            </tbody></table>
            <h1 class="main-price">$ 24,900</h1>
        </div>
    </a>    
</template>

<template id="makkhi_results_dock_top">
       <div class="item">
            <div class="row">
                <div class="content">
                    <h5 class= "site_name">Snap Deal lb12</h5>
                    <p class="prod_title" style="min-width: 174px; max-width: 174px; min-height: 40px; max-height:40px; overflow:hidden; ">lr142e3437 ASUS ZenBook F...
                    </p>
                    <h1 class="main-price">
                        $ 24,900 <span class="green-title"> 20% off </span>
                    </h1>
                </div>
                <div class="image">
                    <img src="resources/images/laptop.jpg">
                </div>
            </div>
        </div> 
    
</template>
`