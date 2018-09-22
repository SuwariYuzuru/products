var wSock = null;
var iAmSendTrigger = false;

$('document').ready(function () {
   $('ul.tabs').tabs({'swipable': true});
   $('select').formSelect();

   wSock = new WebSocket(`ws://${window.location.hostname}:12345`)


   $("#btn-search").on("click", function() {
      var query = {
         "station_from": $("#input-station-from").val(),
         "ride_t": $("#input-ride-t").val(),
         "station_to": $("#input-station-to").val(),
         "track": $("#input-track").val(),
         "train_number": $("#input-train-number").val(),
         "position": $("#select-search").formSelect('getSelectedValues')[0]
      };

      $.post("/api/search", query, 
         function(data, textStatus, jqXHR){
            $("#search").empty().append("<h2>検索結果</h2>");
            console.log(data);
            let el = $("#search").append('<div class="col"></div>');
            data.users.forEach(function(elem, idx){
               console.log(`ゆずるくん ${idx}：${elem.number} 号車の${elem.position}`);
               el.append(
                  $(`<div class="row s1 m1"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">ゆずるくん${idx}号</span><p>乗車車両： ${elem.number}号車</p><p>座席位置： ${elem.position}</p></div><div class="card-action"><a href="javascript:void(0);" class="waves-effect waves-teal btn-flat do-match" onClick="doMatch(${elem.number}, '${elem.position}');">マッチング</a></div></div></div>`)
               );
            });
         },
         "json"
      )
   });
   
   $("#btn-register").on("click", function() {
      var query = {
         "station_from": $("#input-station-from").val(),
         "ride_t": $("#input-ride-t").val(),
         "station_to": $("#input-station-to").val(),
         "track": $("#input-track").val(),
         "train_number": $("#input-train-number").val(),
         "position": $("#select-register").formSelect('getSelectedValues')[0]
      };

      $.post("/api/register", query, 
         function(data, textStatus, jqXHR){
            console.log(data);
            $("#title h1").text("Waiting ... ");
            $("#register").empty().append(
               $('<div class="success-register"><h4>登録しました！</h4><div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div><div><p>マッチング相手が見つかるまで待っててね！</p></div></div>')
            );
         },
         "json"
      )
   });

   wSock.onmessage = function(e){
      console.log("Received Message !");
      console.log(`iAmSendTrigger = ${iAmSendTrigger}`);
      if (!iAmSendTrigger){
         $("#register").empty().append(
            $('<div class="match"><h3>すわるくんに見つけてもらうために<br>この画面を提示してね！</h3><div class="session"><img src="static/icon.jpg" alt="サムズアップ" title="マッチ成立"></div><div class="match-confirm"><a href="javascript:void(0);" id="btn-match-confirm" class="waves-effect waves-light btn-large" onClick="doMatchConfirm();">マッチング成功！</a></div></div>')
         );
      }
   }

});

function doMatch(trainNum, position){
   wSock.send("matched");
   iAmSendTrigger = true;
   $("#search").empty().append(
      $(`<div class="match"><h3>この画面を提示している<br>人を探してね！</h3><h4> 場所：${trainNum}号車の${position} </h4><div class="session"><img src="static/icon.jpg" alt="サムズアップ" title="マッチ成立"></div><div class="match-confirm"><a href="javascript:void(0);" id="btn-match-confirm" class="waves-effect waves-light btn-large" onClick="doMatchConfirm();">マッチング成功！</a></div></div>`)
   );
}

function doMatchConfirm() {
   // $("#sample").empty();
}
