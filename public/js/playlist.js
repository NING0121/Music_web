
    //----------------------获取url传参----------------------------//

    var Data;
    var paValue = new Array();//创建一个用于保存具体值得数组
    var loc = location.href;
    var n1 = loc.length;//地址的总长
    var n2 = loc.indexOf("?");//取得=号的位置
    var parameter = decodeURI(loc.substr(n2+1, n1-n2));//截取从?号后面的内容,也就是参数列表，因为传过来的路径是加了码的，所以要解码
    var parameters  = parameter.split("&");//从&处拆分，返回字符串数组
    var MAX_num = 30;
    var searchkeywords;
    for (var i = 0; i < parameters.length; i++) {
        console.log("参数键值对值"+i+":"+parameters[i]);
        var m1 = parameters[i].length;//获得每个键值对的长度
        var m2 = parameters[i].indexOf("=");//获得每个键值对=号的位置
        var value = parameters[i].substr(m2+1, m1-m2);//获取每个键值对=号后面具体的值
        paValue[i] = value;}//将每个参数的值存入数组
    // alert(paValue[0]);//打印出搜索的第一个参数keywords的值
       
    $(document).ready(function(){   
        $("#searchbutton").click(function(){
            searchkeywords =$("#search").val();//输入框中的值，即是keywords
           // var searchName ='http://127.0.0.1:3000/search?keywords='+searchkeywords;
           //------------------跳转----------------------
           window.location.href='http://localhost:3000/html/search.html?'+'keywords='+searchkeywords;
                   
                   });
    //------------------------------------------调用接口
            // var songslistName ='http://127.0.0.1:3000/top/list';
            var RecommendlistName = 'http://localhost:3000/personalized/newsong';
    
    //----------------------get    request----------------------------

                    var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
                    httpRequest.open('GET',RecommendlistName,true);//第二步：打开连接
                    httpRequest.send();//第三步：发送请求  将请求参数写在URL中
                    /**
                     * 获取数据后的处理程序
                     */
                    httpRequest.onreadystatechange = function (){
                        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                            Data = JSON.parse(httpRequest.responseText);
            
                        }
                    //-----------------------动态追加-----------------

                    for(var Newsongs_num = 0;Newsongs_num<=99;Newsongs_num++){
                        var Newsongs_innerhtml = document.getElementById("Newsongs_body").innerHTML;//保存上一次的html内容
                    
                    document.getElementById("Newsongs_body").innerHTML =Newsongs_innerhtml + "<tr><td class='text-center'><div class='avatar'><img class='img-avatar' src="+Data.result[Newsongs_num].picUrl+" alt=''><span class='avatar-status badge-success'></span></div></td><td><a class='playnum' id="+Newsongs_num+" href='http://localhost:3000/html/play.html?type=Newsongs&id="+Data.result[Newsongs_num].id+"&num="+Newsongs_num+"&length=10'><div>"+Data.result[Newsongs_num].name+"</div></a><div class='small text-muted'><span>"+Data.result[Newsongs_num].song.artists[0].name+"</span></div></td><td class='text-center'><i class='flag-icon flag-icon-us h4 mb-0' id='us' title='us'></i></td><td><div class='clearfix'><div class='float-left'><strong>"+Data.result[Newsongs_num].song.album.name+"</strong></div><div class='float-right'><small class='text-muted'>"+Data.result[Newsongs_num].song.album.name+"</small></div></div><div class='progress progress-xs'><div class='progress-bar bg-success' role='progressbar' style='width: 100%' aria-valuenow='50' aria-valuemin='0' aria-valuemax='100'></div></div></td><td class='text-center'><i class='fa fa-cc-mastercard' style='font-size:24px'></i></td><td><div class='small text-muted'>Song's Duration</div><strong>"+parseInt(Data.result[Newsongs_num].song.duration/60000)+" : "+parseInt((Data.result[Newsongs_num].song.duration%60000)/1000)+"</strong></td></tr>";
                    }
                }
    
    
    
    
    $("#board_newsongs").click(function(){
        window.location.href = 'http://localhost:3000/html/ranklist.html?idx=0';
    });
    $("#board_Billboard").click(function(){
        window.location.href = 'http://localhost:3000/html/ranklist.html?idx=6';
    });
    $("#board_hotsongs").click(function(){
        window.location.href = 'http://localhost:3000/html/ranklist.html?idx=1';
    });
    $("#board_iTunes").click(function(){
        window.location.href = 'http://localhost:3000/html/ranklist.html?idx=8';
    });
    $("#login-button-submit").click(function(){
        location.href = 'user.html';
        var username = $("#username").val();
        var password = $("#password").val();

        console.log(username);
        var Storage_Info = window.localStorage;
        
        Storage_Info.setItem("username",username);
        Storage_Info.setItem("password",password);
        // var LoginInfo = JSON.stringify(login_info);
        // var usernamem = JSON.stringify(username);
        // Storage_Info.setItem("login_info",LoginInfo);
        // window.location.href = "http://localhost:3000/html/user.html";
        //--------------POST-------------------

//         var LoginRequest = new XMLHttpRequest();//第一步：创建需要的对象
//         var login_info = {'username':username,'password':password};
//         LoginRequest.open('POST',"/AddDataToSever", true); //第二步：调用AddDataToSever
//         LoginRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        
//         /**
//          * 获取数据后的处理程序
//          */
//         LoginRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
//         if (LoginRequest.readyState == 4 && LoginRequest.status == 200) {//验证请求是否发送成功
//                 // var json = LoginRequest.responseText;//获取到服务端返回的数据
//                 console.log("发送登录数据成功！");
//         }
//         LoginRequest.send(JSON.stringify(login_info));//发送请求 将情头体写在send中

// var Loginhttp = "http://localhost:3000/login/cellphone?phone="+username+"&password="+password;
// window.location.href = Loginhttp;
    // }
    
    });

})