
    //----------------------获取url传参----------------------------//

var Data;
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
// alert(paValue[1]);//打印出搜索的第二个参数keywords的值
// alert(paValue[2]);//打印出搜索的第三个参数keywords的值
var audio;

var player_id = paValue[1];//正在播放的歌曲的id
var player_num= paValue[2];//正在播放的歌曲的数组下标
var player_len = paValue[3];//正在播放的歌单的长度
var player_JS_style = paValue[4];//正在播放的榜单歌曲所在歌单的idx参数




$(document).ready(function(){


var loading_theme = document.getElementById("hide_bg");
loading_theme.style.display = 'block';//使覆盖层显示
document.getElementById("loading_css").display = 'block';//使css动画层显示
document.getElementById("container").style.display = 'none';//使主代码隐藏，，，，，，使用display
setTimeout(function(){
    loading_theme.style.display = 'none';//使覆盖层隐藏
    document.getElementById("container").style.display = 'block';//使主代码显示
    document.getElementById("loading_css").style.display = 'none';//使css动画层隐藏
    document.getElementsByClassName("loading_title").style.display='none';//使动画标题隐藏
},5000);




$("#searchbutton").click(function(){
    var searchkeywords =$("#search").val();//输入框中的值，即是keywords
   // var searchName ='http://127.0.0.1:3000/search?keywords='+searchkeywords;
   //------------------跳转----------------------
   window.location.href='http://localhost:3000/html/search.html?'+'keywords='+searchkeywords;
           
           });



$("#Player_goback").click(function(){
    window.location.href = "http://localhost:3000/html/playlist.html";
});

var playerRequest = new XMLHttpRequest();



//            推荐新歌
if(paValue[0] == 'Newsongs'){

playerRequest.open('GET','http://localhost:3000/personalized/newsong',true);
playerRequest.send();

playerRequest.onreadystatechange = function (){
    if (playerRequest.readyState == 4 && playerRequest.status == 200) {
                Data = JSON.parse(playerRequest.responseText);
            }
            document.getElementById("Player_Name").innerHTML = Data.result[player_num].name;
            document.getElementById("Player_Img").src = Data.result[player_num].picUrl;
            var Player_Audio_src = "https://music.163.com/song/media/outer/url?id=" + player_id + ".mp3";
            document.getElementById("Player_Audio").src = Player_Audio_src;


}


//            榜单歌曲
}
else if (paValue[0] == 'Boardsongs'){
    var GET_http = 'http://localhost:3000/top/list?idx='+paValue[4];
    playerRequest.open('GET',GET_http,true);
playerRequest.send();

playerRequest.onreadystatechange = function (){
    if (playerRequest.readyState == 4 && playerRequest.status == 200) {
                Data = JSON.parse(playerRequest.responseText);

            }
            document.getElementById("Player_Name").innerHTML = Data.playlist.tracks[player_num].name;
            document.getElementById("Player_Singer").innerHTML = Data.playlist.tracks[player_num].ar[0].name;
            document.getElementById("Player_Img").src = Data.playlist.tracks[player_num].al.picUrl;
            var Player_Audio_src = "https://music.163.com/song/media/outer/url?id=" + player_id + ".mp3";
            document.getElementById("Player_Audio").src = Player_Audio_src;


}
}
//搜索结果
else if (paValue[0] == 'SearchResult'){

    var GET_http = 'http://localhost:3000/search?keywords='+paValue[4];
    playerRequest.open('GET',GET_http,true);
playerRequest.send();

playerRequest.onreadystatechange = function (){
    if (playerRequest.readyState == 4 && playerRequest.status == 200) {
                Data = JSON.parse(playerRequest.responseText);

            }
            document.getElementById("Player_Name").innerHTML = Data.result.songs[player_num].name;
            document.getElementById("Player_Singer").innerHTML = Data.result.songs[player_num].artists[0].name;
            document.getElementById("Player_Img").src = Data.result.songs[player_num].artists[0].img1v1Url;
            var Player_Audio_src = "https://music.163.com/song/media/outer/url?id=" + player_id + ".mp3";
            document.getElementById("Player_Audio").src = Player_Audio_src;


}

}
else if (paValue[0] == 'historysongs'){

    var GET_http = 'http://localhost:3000/user/record?uid='+paValue[4];
    playerRequest.open('GET',GET_http,true);
playerRequest.send();

playerRequest.onreadystatechange = function (){
    if (playerRequest.readyState == 4 && playerRequest.status == 200) {
                Data = JSON.parse(playerRequest.responseText);

            }
            document.getElementById("Player_Name").innerHTML = Data.weekData[player_num].song.name;
            document.getElementById("Player_Singer").innerHTML = Data.weekData[player_num].song.ar[0].name;
            document.getElementById("Player_Img").src = Data.weekData[player_num].song.al.picUrl;
            var Player_Audio_src = "https://music.163.com/song/media/outer/url?id=" + player_id + ".mp3";
            document.getElementById("Player_Audio").src = Player_Audio_src;


}

}













audio = document.getElementById('Player_Audio');
// 播放
$("#Player_play").click(function(){
	if(audio.paused){
		audio.play();
    }
    audio.onended = function() {
        var change_song_num = (parseInt(paValue[2])+parseInt(paValue[3])+1)%parseInt(paValue[3]);

        if (paValue[0] == 'Newsongs'){
            var player_link_change = "http://localhost:3000/html/play.html?type=Newsongs&id="+Data.result[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3];
    
        window.location.href= player_link_change;
    
        }
        else if (paValue[0] == 'Boardsongs'){
            var player_link_change = "http://localhost:3000/html/play.html?type=Boardsongs&id="+Data.playlist.tracks[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3]+"&idx="+paValue[4];
    
        window.location.href= player_link_change;
        }
        else if (paValue[0] == 'SearchResult'){
            var player_link_change = "http://localhost:3000/html/play.html?type=SearchResult&id="+Data.result.songs[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3]+"&keywords="+paValue[4];
    
        window.location.href= player_link_change;
        }
        else if (paValue[0] == 'historysongs'){
            var player_link_change = "http://localhost:3000/html/play.html?type=historysongs&id="+Data.weekData[change_song_num].song.id+"&num="+change_song_num+"&length="+paValue[3]+"&uid="+paValue[4];
    
        window.location.href= player_link_change;
        }
    };
});
 
// 暂停
$("#Player_pause").click(function(){
	if(audio.played){
		audio.pause();
	}
});
// 上一首
$("#Player_prev").click(function(){
    
    var change_song_num = (parseInt(paValue[2])+parseInt(paValue[3])-1)%parseInt(paValue[3]);

    if (paValue[0] == 'Newsongs'){
        var player_link_change = "http://localhost:3000/html/play.html?type=Newsongs&id="+Data.result[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3];

    window.location.href= player_link_change;

    }
    
    else if (paValue[0] == 'Boardsongs'){
        var player_link_change = "http://localhost:3000/html/play.html?type=Boardsongs&id="+Data.playlist.tracks[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3]+"&idx="+paValue[4];

    window.location.href= player_link_change;

    }
    else if (paValue[0] == 'SearchResult'){
        var player_link_change = "http://localhost:3000/html/play.html?type=SearchResult&id="+Data.result.songs[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3]+"&keywords="+paValue[4];

    window.location.href= player_link_change;
    }
    else if (paValue[0] == 'historysongs'){
        var player_link_change = "http://localhost:3000/html/play.html?type=historysongs&id="+Data.weekData[change_song_num].song.id+"&num="+change_song_num+"&length="+paValue[3]+"&uid="+paValue[4];

    window.location.href= player_link_change;
    }
});
 
// 下一首
$("#Player_next").click(function(){

    var change_song_num = (parseInt(paValue[2])+parseInt(paValue[3])+1)%parseInt(paValue[3]);

    if (paValue[0] == 'Newsongs'){
        var player_link_change = "http://localhost:3000/html/play.html?type=Newsongs&id="+Data.result[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3];

    window.location.href= player_link_change;

    }
    else if (paValue[0] == 'Boardsongs'){
        var player_link_change = "http://localhost:3000/html/play.html?type=Boardsongs&id="+Data.playlist.tracks[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3]+"&idx="+paValue[4];

    window.location.href= player_link_change;

    }
    else if (paValue[0] == 'SearchResult'){
        var player_link_change = "http://localhost:3000/html/play.html?type=SearchResult&id="+Data.result.songs[change_song_num].id+"&num="+change_song_num+"&length="+paValue[3]+"&keywords="+paValue[4];

    window.location.href= player_link_change;
    }
    else if (paValue[0] == 'historysongs'){
        var player_link_change = "http://localhost:3000/html/play.html?type=historysongs&id="+Data.weekData[change_song_num].song.id+"&num="+change_song_num+"&length="+paValue[3]+"&uid="+paValue[4];

    window.location.href= player_link_change;
    }
});














//-----------------------------------页面函数------------------------
});