;(function(exports){
  var KeyBoard = function(input, options){
    var body = document.getElementsByTagName('body')[0];
    var DIV_ID = options && options.divId || '__w_l_h_v_c_z_e_r_o_divid';

    if(document.getElementById(DIV_ID)){
      body.removeChild(document.getElementById(DIV_ID));
    }

    this.input = input;
    this.el = document.createElement('div');

    var self = this;
    var zIndex = options && options.zIndex || 1000;
    var width = options && options.width || '100%';
    var height = options && options.height || '193px';
    var fontSize = options && options.fontSize || '15px';
    var backgroundColor = options && options.backgroundColor || '#fff';
    var TABLE_ID = options && options.table_id || 'table_0909099';
    var mobile = typeof orientation !== 'undefined';

    this.el.id = DIV_ID;
    this.el.style.position = 'absolute';
    this.el.style.left = 0;
    this.el.style.right = 0;
    this.el.style.bottom = '9px';
    this.el.style.zIndex = zIndex;
    this.el.style.width = width;
    this.el.style.height = height;
    this.el.style.backgroundColor = backgroundColor;

    //样式
    var cssStr = '<style type="text/css">';
    cssStr += '#' + TABLE_ID + '{text-align:center;width:100%;height:160px;border-top:1px solid #CECDCE;background-color:#FFF;font-size:14px;}';
    cssStr += '#' + TABLE_ID + ' td{width:33%;border:1px solid #ccc;border-right:0;border-top:0;font-size:14px;line-height:40px;}';
    if(!mobile){
      cssStr += '#' + TABLE_ID + ' td:hover{background-color:#1174e8;color:#FFF;font-size:14px;}';
    }
    cssStr += '</style>';

    //Button
    var btnStr = '<div style="width:60px;height:28px;background-color:#1174e8;font-size:14px;';
    btnStr += 'float:right;margin-right:5px;text-align:center;color:#fff;font-size:14px;';
    btnStr += 'line-height:28px;border-radius:3px;margin:5px;cursor:pointer;font-size:14px;">完成</div>';

    //table
    var tableStr = '<table id="' + TABLE_ID + '" border="0" cellspacing="0" cellpadding="0">';
      tableStr += '<tr><td style="border-left: 0;">1</td><td>2</td><td>3</td></tr>';
      tableStr += '<tr><td style="border-left: 0;">4</td><td>5</td><td>6</td></tr>';
      tableStr += '<tr><td style="border-left: 0;">7</td><td>8</td><td>9</td></tr>';
      tableStr += '<tr><td style="background-color:#D3D9DF;font-size:14px;font-weight:bolder;border-left: 0;">.</td><td>0</td>';
      tableStr += '<td style="background-color:#D3D9DF;font-size:14px;">删除</td></tr>';
      tableStr += '</table>';
    this.el.innerHTML = cssStr + btnStr + tableStr;

    function addEvent(e){
      var ev = e || window.event;
      var clickEl = ev.element || ev.target;
      var value = clickEl.textContent || clickEl.innerText;
      if(clickEl.tagName.toLocaleLowerCase() === 'td' && value !== "删除"){
        if(self.input){
          self.input.value += value;
          self.input.value = changeNum(self.input.value); //self
        }
      }else if(clickEl.tagName.toLocaleLowerCase() === 'div' && value === "完成"){
        // body.removeChild(self.el);
        closeKey()
      }else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "删除"){
        var num = self.input.value;
        if(num){
          var newNum = num.substr(0, num.length - 1);
          self.input.value = newNum;
        }
      }
    }

    function closeKey() {
      body.removeChild(self.el);
      closeNumKeyBoardCommon();
    }

    if(mobile){
      this.el.ontouchstart = addEvent;
    }else{
      this.el.onclick = addEvent;
    }
    body.appendChild(this.el);
  }

  exports.KeyBoard = KeyBoard;

})(window);
