
    //----------------------获取url传参----------------------------//

var Data;
var DetailsData;
var paValue = new Array();//创建一个用于保存具体值得数组
var loc = location.href;
var n1 = loc.length;//地址的总长
var n2 = loc.indexOf("?");//取得=号的位置
var parameter = decodeURI(loc.substr(n2+1, n1-n2));//截取从?号后面的内容,也就是参数列表，因为传过来的路径是加了码的，所以要解码
var parameters  = parameter.split("&");//从&处拆分，返回字符串数组
var MAX_num = 30;
for (var i = 0; i < parameters.length; i++) {
    console.log("参数键值对值"+i+":"+parameters[i]);
    var m1 = parameters[i].length;//获得每个键值对的长度
    var m2 = parameters[i].indexOf("=");//获得每个键值对=号的位置
    var value = parameters[i].substr(m2+1, m1-m2);//获取每个键值对=号后面具体的值
    paValue[i] = value;}//将每个参数的值存入数组
// alert(paValue[0]);//打印出搜索的第一个参数keywords的值






$(document).ready(function(){   

//------------------------------------------调用search接口
        var searchName ='http://localhost:3000/search?keywords='+paValue[0];
        var search_result_img = document.getElementById("search_result_img");
        search_result_img.src = "https://source.unsplash.com/random";
                var search_result_title = document.getElementById("search_result_title");
                search_result_title.innerHTML = "搜索结果";
                var search_result_description = document.getElementById("search_result_description");
                search_result_description.innerHTML = "这是与您搜索"+paValue[0]+"相关的结果";


//----------------------get    request----------------------------
                var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
                httpRequest.open('GET',searchName,true);//第二步：打开连接
                httpRequest.send();//第三步：发送请求  将请求参数写在URL中
                /**
                 * 获取数据后的处理程序
                 */
                httpRequest.onreadystatechange = function (){
                    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                        Data = JSON.parse(httpRequest.responseText);
                    }

                
                //-----------------------动态追加-----------------
                for(var search_num = 0;search_num<MAX_num;search_num++){
                    // var search_this_id  = Data.result.songs[search_num].id;
                    // var songs_details = 'http://localhost:3000/song/detail?ids='+search_this_id;     
                    // var search_detailRequest = new XMLHttpRequest();
                    // search_detailRequest.open('GET',songs_details,true);
                    // search_detailRequest.send();
                    // search_detailRequest.onreadystatechange = function (){
                    //     if (search_detailRequest.readyState == 4 && search_detailRequest.status == 200) {
                    //         DetailsData = JSON.parse(search_detailRequest.responseText);
                    //     }
                    var searchresult_innerhtml = document.getElementById("search_results").innerHTML;//保存上一次的html内容
                //     //---------------------注意引用变量的写法
document.getElementById("search_results").innerHTML = searchresult_innerhtml + "<tr><td class='text-center'><div class='avatar'><span class='glyphicon glyphicon-headphones'></span><span class='avatar-status badge-success'></span></div></td><td><a href='http://localhost:3000/html/play.html?type=SearchResult&id="+Data.result.songs[search_num].id+"&num="+search_num+"&length="+MAX_num+"&keywords="+paValue[0]+"'><div>"+Data.result.songs[search_num].name+"</div></a><div class='small text-muted'><span>"+Data.result.songs[search_num].artists[0].name+"</span></div></td><td class='text-center'><i class='flag-icon flag-icon-us h4 mb-0' id='us' title='us'></i></td><td><div class='clearfix'><div class='float-left'><strong>"+Data.result.songs[search_num].name+"</strong></div><div class='float-right'><small class='text-muted'>"+Data.result.songs[search_num].album.name+"</small></div></div><div class='progress progress-xs'><div class='progress-bar bg-success' role='progressbar' style='width: 100%' aria-valuenow='50' aria-valuemin='0' aria-valuemax='100'></div></div></td><td class='text-center'><i class='fa fa-cc-mastercard' style='font-size:24px'></i></td><td><div class='small text-muted'>Last login</div><strong>"+parseInt(Data.result.songs[search_num].duration/60000)+" : "+parseInt((Data.result.songs[search_num].duration%60000)/1000)+"</strong></td></tr>";
                    
                // }
                }
        
                }



});