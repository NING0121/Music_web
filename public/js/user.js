
var nickname;
var User_uid;
var User_playlist_Data;
var User_historylist_Data;
$(document).ready(function(){


        $("#searchbutton").click(function(){
            var searchkeywords =$("#search").val();//输入框中的值，即是keywords
           // var searchName ='http://127.0.0.1:3000/search?keywords='+searchkeywords;
           //------------------跳转----------------------
           window.location.href='http://localhost:3000/html/search.html?'+'keywords='+searchkeywords;
                   
                   });

var Storage_get = window.localStorage;
var username = Storage_get.getItem("username");
var password = Storage_get.getItem("password");
console.log(username);
console.log(password);

//--------------POST-------------------
// var loginhttp = 'http://localhost:3000/login/cellphone'
// var loginhttpRequest = new XMLHttpRequest();//第一步：创建需要的对象
// loginhttpRequest.open('POST',loginhttp, true); //第二步：打开连接
// loginhttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
// loginhttpRequest.send('');//发送请求 将情头体写在send中
// /**
//  * 获取数据后的处理程序
//  */
// loginhttpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
// if (loginhttpRequest.readyState == 4 && loginhttpRequest.status == 200) {//验证请求是否发送成功
//         var json = loginhttpRequest.responseText;//获取到服务端返回的数据
//         console.log(json);
// }
// }
$.post("http://localhost:3000/login/cellphone",{phone:username,password:password}, function(data) {
    console.log(data);
    document.getElementById("username").innerHTML = data.profile.nickname;
    document.getElementById("headpic").src = data.profile.avatarUrl;
    document.getElementById("follows").innerHTML = data.profile.follows;
    document.getElementById("followeds").innerHTML = data.profile.followeds;
    document.getElementById("backgrounddiv_pic").style = "background-image:url("+data.profile.backgroundUrl+");";
    User_uid = data.account.id;
    console.log(User_uid);

//--------------------------------------历史记录-------------------
var User_historylist_link = 'http://localhost:3000/user/record?uid='+User_uid;
var User_historylistRequest = new XMLHttpRequest();
User_historylistRequest.open('GET',User_historylist_link,true);
User_historylistRequest.send();

User_historylistRequest.onreadystatechange = function(){
  if (User_historylistRequest.readyState == 4 && User_historylistRequest.status == 200){
    User_historylist_Data = JSON.parse(User_historylistRequest.responseText);
    console.log(User_historylist_Data);
  }
  for(var historylist_num=0;historylist_num<20;historylist_num++){
  var historylist_body_innerHTML = document.getElementById("historylist_body").innerHTML;
  document.getElementById("historylist_body").innerHTML = historylist_body_innerHTML + "<tr><td><div class='avatar' style='text-align: center;'><span class='glyphicon glyphicon-play-circle' style='font-size: 24px;'></span></div></td><td class='text-center'><div><a href='http://localhost:3000/html/play.html?type=historysongs&id="+User_historylist_Data.weekData[historylist_num].song.id+"&num="+historylist_num+"&length=20&uid="+User_uid+"' style='color:black;'>"+User_historylist_Data.weekData[historylist_num].song.name+"</a></div></td><td class='text-center'><div>"+User_historylist_Data.weekData[historylist_num].song.ar[0].name+"</div></td><td class='text-center'><div>"+User_historylist_Data.weekData[historylist_num].song.al.name+"</div></td><td class='text-center'><strong><span class='glyphicon glyphicon-headphones'></span>45</strong></td><td></td></tr>";
}
}

//-----------------------------------用户歌单------------------------------------
    var User_playlistRequest = new XMLHttpRequest();
  var User_playlist_link = 'http://localhost:3000/user/playlist?uid='+User_uid;
  User_playlistRequest.open('GET',User_playlist_link,true);
  User_playlistRequest.send();
                   

  User_playlistRequest.onreadystatechange = function(){
    if (User_playlistRequest.readyState == 4 && User_playlistRequest.status == 200){
      User_playlist_Data = JSON.parse(User_playlistRequest.responseText);
      console.log(User_playlist_Data);
    }
    for(var User_playlist_num=0;User_playlist_num<4;User_playlist_num++){
var User_playlist_innerHTML = document.getElementById("User_playlist").innerHTML;
    
document.getElementById("User_playlist").innerHTML = User_playlist_innerHTML + "<div class='col-sm-6 col-lg-3'><div class='card text-white bg-info' style='background-image: url("+User_playlist_Data.playlist[User_playlist_num].coverImgUrl+");'><div class='card-body pb-0'><div class='btn-group float-right'><button class='btn btn-transparent dropdown-toggle p-0' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='icon-settings'></i></button><div class='dropdown-menu dropdown-menu-right'><a class='dropdown-item' href='#'>了解详情</a><a class='dropdown-item' href='#'>收藏</a></div></div><div class='text-value'><a href='https://music.163.com/#/playlist?id="+User_playlist_Data.playlist[User_playlist_num].id+"' style='color: white;'>"+User_playlist_Data.playlist[User_playlist_num].name+"</a></div><div>Members online</div></div><div class='chart-wrapper mt-3' style='height:70px;'><canvas class='chart' id='card-chart3' height='70'></canvas></div></div></div>";
    }  

}
  });

  

});