var creat_list_hideflag =0;//创建歌单的收放flag
var collect_list_hideflag =0;//收藏歌单的收放flag
// var searchend = "";
var searchkeywords;//存储搜索框中的文本
var HotlistData;
$(document).ready(function(){
        var HotlistName = "http://localhost:3000/top/playlist?limit=10&order=new";
        var IndexlistRequest = new XMLHttpRequest();//第一步：建立所需的对象
        IndexlistRequest.open('GET',HotlistName,true);//第二步：打开连接
        IndexlistRequest.send();//第三步：发送请求  将请求参数写在URL中
                        /**
                         * 获取数据后的处理程序
                         */
                        IndexlistRequest.onreadystatechange = function (){
                            if (IndexlistRequest.readyState == 4 && IndexlistRequest.status == 200) {
                                 HotlistData = JSON.parse(IndexlistRequest.responseText);
                            }

                            for(var Hotlist_num=0;Hotlist_num<4;Hotlist_num++){
                            var Hotlist_body = document.getElementById("Hotlist_body").innerHTML;
                            document.getElementById("Hotlist_body").innerHTML = Hotlist_body + "<div class='col-lg-3'><div class='card' style='margin-top: 10px;'><img class='card-img-top' src="+HotlistData.playlists[Hotlist_num].coverImgUrl+" alt='Card image' style='width:100%'><div class='card-body'><h4 class='card-title'>"+HotlistData.playlists[Hotlist_num].name+"</h4><p class='card-text'>"+HotlistData.playlists[Hotlist_num].description+"</p></div></div></div>"
                            }
                        }



                        $("#topbutton").click(function(){
                                window.location.href = 'http://www.sparrowoo.top:3000/html/playlist.html';
                        });

        $("#hideblock_creat").click(function(){
            if(creat_list_hideflag==0){
                $("#block3").slideUp(500);
                creat_list_hideflag=1;
        }
        else{
                $("#block3").slideDown(500);
                creat_list_hideflag=0;    
        }
            });
            $("#hideblock_collect").click(function(){
                if(collect_list_hideflag==0){
                    $("#block4").slideUp(500);
                    collect_list_hideflag=1;
            }
            else{
                    $("#block4").slideDown(500);
                    collect_list_hideflag=0;    
            }
                });

        $("#searchbutton").click(function(){
                 searchkeywords =$("#search").val();//输入框中的值，即是keywords
                // var searchName ='http://127.0.0.1:3000/search?keywords='+searchkeywords;
                //------------------跳转----------------------
                window.location.href='http://localhost:3000/html/search.html?'+'keywords='+searchkeywords;
                        
                        });






                        //--------------POST-------------------

                        // var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
                        // httpRequest.open('POST', searchName, true); //第二步：打开连接
                        // httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
                        // httpRequest.send('keywords=我');//发送请求 将情头体写在send中
                        // /**
                        //  * 获取数据后的处理程序
                        //  */
                        // httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
                        // if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
                        //         var json = httpRequest.responseText;//获取到服务端返回的数据
                        //         console.log(json);
                        // }



                        $("#jk_songslist").click(function(){
                                window.location.href="http://localhost:3000/html/playlist.html";
                        });
});

                    


        