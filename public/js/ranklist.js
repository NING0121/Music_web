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
//  alert(paValue[0]);//打印出搜索的第一个参数keywords的值
    
 $(document).ready(function(){   
 
 //------------------------------------------调用接口-------------------------------------

    var board_newsongsRequest = new XMLHttpRequest();
    var board_newsongs_link = 'http://localhost:3000/top/list?idx='+paValue[0];

    board_newsongsRequest.open('GET',board_newsongs_link,true);
    board_newsongsRequest.send();

    board_newsongsRequest.onreadystatechange = function(){
        if (board_newsongsRequest.readyState == 4 && board_newsongsRequest.status == 200) {
            Data = JSON.parse(board_newsongsRequest.responseText);
           }
           var board_image = document.getElementById("board_image");
           var board_name = document.getElementById("board_name");
           var board_intro = document.getElementById("board_intro");
           var board_intro_playcount = document.getElementById("playcount");

           board_image.src = Data.playlist.coverImgUrl;
           board_name.innerHTML = Data.playlist.name;
           board_intro.innerHTML = Data.playlist.description;
           board_intro_playcount.innerHTML = "播放次数："+Data.playlist.playCount;
           for(var board_songs_num = 0;board_songs_num<=99;board_songs_num++){
            var board_songs_innerhtml = document.getElementById("board_songs_body").innerHTML;//保存上一次的html内容
        
        document.getElementById("board_songs_body").innerHTML =board_songs_innerhtml + "<tr><td class='text-center'><div class='avatar'><img class='img-avatar' src="+Data.playlist.tracks[board_songs_num].al.picUrl+" alt=''><span class='avatar-status badge-success'></span></div></td><td><a href='http://localhost:3000/html/play.html?type=Boardsongs&id="+Data.playlist.tracks[board_songs_num].id+"&num="+board_songs_num+"&length=100&idx="+paValue[0]+"'><div>"+Data.playlist.tracks[board_songs_num].name+"</div></a><div class='small text-muted'><span>"+Data.playlist.tracks[board_songs_num].ar[0].name+"</span></div></td><td class='text-center'><i class='flag-icon flag-icon-us h4 mb-0' id='us' title='us'></i></td><td><div class='clearfix'><div class='float-left'><strong>"+Data.playlist.tracks[board_songs_num].al.name+"</strong></div><div class='float-right'></div></div><div class='progress progress-xs'><div class='progress-bar bg-success' role='progressbar' style='width: 100%' aria-valuenow='50' aria-valuemin='0' aria-valuemax='100'></div></div></td><td class='text-center'><small class='text-muted'>"+Data.playlist.tracks[board_songs_num].al.name+"</small></td><td><div class='small text-muted'></div><a href='https://music.163.com/#/mv?id="+Data.playlist.tracks[board_songs_num].mv+"'>🎞</a><strong></strong></td></tr>";
        }
    }

});
