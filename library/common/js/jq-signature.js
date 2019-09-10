
var WritingPad = function () {

    var current = null;

    $(function () {

//      initHtml();
//
//      initTable();
//
//      initSignature();
        //if ($(".modal")) {
        //    $(".modal").modal("toggle");
        //} else {
        //    alert("没用手写面板");
        //}

        $(document).on("click", "#myClose,.close", null, function () {
            $('#mymodal').modal('hide');
            $("#mymodal").remove();

        });

        $(document).on("click", "#mySave", null, function () {
            console.log("12345")
//          var myImg = $('#myImg').empty();
//          var dataUrl = $('.js-signature').jqSignature('getDataURL');
//          var img = $('<img>').attr('src', dataUrl);
//          $(myImg).append($('<p>').text("图片保存在这里"));
//          $(myImg).append(img);

        });

        $(document).on("click", "#myEmpty", null, function () {
            $('.js-signature').jqSignature('clearCanvas');

        });

        $(document).on("click", "#myBackColor", null, function () {
            $('#colorpanel').css('left', '95px').css('top', '45px').css("display", "block").fadeIn();
            //$("canvas").css("background", "#EEEEEE");
            $("#btnSave").data("sender", "#myBackColor");
        });

        $(document).on("click", "#myColor", null, function () {
            $('#colorpanel').css('left', '205px').css('top', '45px').css("display", "block").fadeIn();
            $("#btnSave").data("sender", "#myColor");
        });

        $(document).on("mouseover", "#myTable", null, function () {
            if ((event.srcElement.tagName == "TD") && (current != event.srcElement)) {
                if (current != null) { current.style.backgroundColor = current._background }
                event.srcElement._background = event.srcElement.style.backgroundColor;
                //$("input[name=DisColor]").css("background-color", event.srcElement.style.backgroundColor);
                //var color = event.srcElement.style.backgroundColor;
                //var strArr = color.substring(4, color.length - 1).split(',');
                //var num = showRGB(strArr);
                //$("input[name=HexColor]").val(num);
                current = event.srcElement;
            }

        });

        $(document).on("mouseout", "#myTable", null, function () {
            if (current != null) current.style.backgroundColor = current._background

        });

        $(document).on("click", "#myTable", null, function () {
            if (event.srcElement.tagName == "TD") {
                var color = event.srcElement._background;
                if (color) {
                    $("input[name=DisColor]").css("background-color", color);
                    var strArr = color.substring(4, color.length - 1).split(',');
                    var num = showRGB(strArr);
                    $("input[name=HexColor]").val(num);
                }
            }

        });

        $(document).on("click", "#btnSave", null, function () {

            $('#colorpanel').css("display", "none");
            var typeData = $("#btnSave").data("sender");
            var HexColor = $("input[name=HexColor]").val();
            var data = $(".js-signature").data();
            if (typeData == "#myColor") {
                data["plugin_jqSignature"]["settings"]["lineColor"] = HexColor;
                $('.js-signature').jqSignature('reLoadData');
            }
            if (typeData == "#myBackColor") {

                data["plugin_jqSignature"]["settings"]["background"] = HexColor;
                $('.js-signature').jqSignature('reLoadData');
            }
        });

        $("#mymodal").on('hide.bs.modal', function () {
            $("#colorpanel").remove();
            $("#mymodal").remove();
            $("#myTable").remove();
        });

    });

//  function initHtml() {
//
//      var html = '<div class="modal" id="mymodal">' +
//          '<div class="modal-dialog">' +
//              '<div class="modal-content">' +
//                  '<div class="modal-header">' +
//                      '' +
//                      '<h4 class="modal-title">手写面板</h4>' +
//                  '</div>' +
//                  '<div class="modal-body">' +
//                      '<div class="js-signature" id="mySignature">' +
//                       '</div>' +
//                       '<div>' +
//                       '<button type="button" class="btn btn-default" id="myEmpty">清空面板</button>' +
//                       '<button type="button" class="btn btn-default" id="myBackColor">设置背景颜色</button>' +
//                       //'<div style="position:absolute;relative">' +
//                       '<button type="button" class="btn btn-default" id="myColor">设置字体颜色</button>' +
//                       '<div id="colorpanel" style="position:absolute;z-index:99;display:none"></div>' +
//                       //'</div>'+
//                       '</div>' +
//                  '</div>' +
//                  '<div class="modal-footer">' +
//
//                      '<button type="button" class="btn btn-default" id="myClose">关闭</button>' +
//                      '<button type="button" class="btn btn-primary" id="mySave" onclick="savaimg();" >保存</button>' +
//                      '<div id="myImg">' +
//                      '<div>' +
//
//                  '</div>' +
//              '</div>' +
//          '</div>' +
//      '</div>';
//
//      $('body').append(html);
//  }

//  function initTable() {
//      var colorTable = "";
//      var ColorHex = new Array('00', '33', '66', '99', 'CC', 'FF');
//      var SpColorHex = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF');
//      for (var i = 0; i < 2; i++) {
//          for (var j = 0; j < 6; j++) {
//              colorTable = colorTable + '<tr height=12>';
//              colorTable = colorTable + '<td width=11 style="background-color:#000000"></td>';
//
//              if (i == 0) {
//                  colorTable = colorTable + '<td width=11 style="background-color:#' + ColorHex[j] + ColorHex[j] + ColorHex[j] + '"></td>';
//              }
//              else {
//                  colorTable = colorTable + '<td width=11 style="background-color:#' + SpColorHex[j] + '"></td>';
//              }
//
//              //colorTable = colorTable + '<td width=11 style="background-color:#000000"></td>';
//
//              for (var k = 0; k < 3; k++) {
//                  for (l = 0; l < 6; l++) {
//                      colorTable = colorTable + '<td width=11 style="background-color:#' + ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j] + '"></td>';
//                  }
//              }
//              colorTable = colorTable + '</tr>';
//
//
//          }
//      }
//      colorTable =
//      '<table border="1" id="myTable" cellspacing="0" cellpadding="0" style="border-collapse: collapse;cursor:pointer;" bordercolor="000000">'
//      + colorTable + '</table>' +
//      '<table width=225 border="0" cellspacing="0" cellpadding="0" style="border:1px #000000 solid;border-collapse: collapse;background-color:#000000">' +
//      '<tr style="height:30px">' +
//      '<td colspan=21 bgcolor=#cccccc>' +
//
//      '<table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse">' +
//      '<tr>' +
//      '<td width="3"><input type="text" name="DisColor" size="6" disabled style="border:solid 1px #000000;background-color:#ffff00"></td>' +
//      '<td width="3"><input type="text" name="HexColor" size="7" style="border:inset 1px;font-family:Arial;" value="#000000"></td>' +
//       '<td width="3"><button type="button" class="btn btn-primary btn-sm" id="btnSave">确认</button></td>' +
//      '</tr>' +
//      '</table>' +
//
//      '</td>' +
//      '</tr>' +
//      '</table>';
//      $("#colorpanel").append(colorTable);
//  }

//  function initSignature() {
//      if (window.requestAnimFrame) {
//          var signature = $("#mySignature");
//          signature.jqSignature({ width: 500, height: 200, border: '1px solid red', background: '#16A085', lineColor: '#ABCDEF', lineWidth: 2, autoFit: false });
//          //{ width: 600, height: 200, border: '1px solid red', background: '#16A085', lineColor: '#ABCDEF', lineWidth: 2, autoFit: true }
//      } else {
//
//          alert("请加载jq-signature.js");
//          return;
//      }
//  }

    function showRGB(arr) {
        hexcode = "#";
        for (x = 0; x < 3; x++) {
            var n = arr[x];
            if (n == "") n = "0";
            if (parseInt(n) != n)
                return alert("RGB颜色值不是数字！");
            if (n > 255)
                return alert("RGB颜色数字必须在0-255之间！");
            var c = "0123456789ABCDEF", b = "", a = n % 16;
            b = c.substr(a, 1); a = (n - a) / 16;
            hexcode += c.substr(a, 1) + b
        }
        return hexcode;
    }

    function init() {


    }

    return {
        init: function () {
            init();
        }
    };
}
