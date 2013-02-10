$(function() {
  
  /*
   * 画面表示時イベント
   */
  $(function() {
    var rgba = new Array(
      'rgba(227, 134, 146, 1.0)'
      , 'rgba(246, 213, 128, 1.0)'
      , 'rgba(255, 242, 128, 1.0)'
      , 'rgba(207, 226, 131, 1.0)'
      , 'rgba(100, 201, 155, 1.0)'
      , 'rgba(107, 190, 213, 1.0)'
      , 'rgba(110, 183, 219, 1.0)'
      , 'rgba(164, 169, 207, 1.0)'
      , 'rgba(201, 127, 180, 1.0)'
      , 'rgba(219, 123, 177, 1.0)'
    );
    
    for (var i = 0; i < rgba.length - 1; i++) {
      var hexClass = 'hex' + (i + 1);
      var rgbaClass = 'rgba' + (i + 1);
      var divRow = "<div class='row'><div class='span6 box hex " + hexClass + "'><span></span></div><div class='span6 box rgba " + rgbaClass + "'><span></span></div>";
      
      var colors = GetColors(rgba[i]);
      var r = colors['r'];
      var g = colors['g'];
      var b = colors['b'];
      var a = colors['a'];
      var hexValue = ConvertToHexColor(r, g, b, a);
      
      $('.color-area').append(divRow);
      $('.' + hexClass).css('background-color', hexValue).find('span').text(hexValue);
      $('.' + rgbaClass).css('background-color', rgba[i]).find('span').text(rgba[i]);
    }
  });
  
  /*
   * スライダー動作設定
   */
  $('#slider-range-min').slider({
    range: 'min'
    , min: 0.0
    , max: 1.0
    , step: 0.1
    , value: 1.0
    , slide: function(event, ui) {
      var hex = $('body').find('.hex');
      var rgba = $('body').find('.rgba');
      
      for (i = 0; i < rgba.length; i++) {
        var colors = GetColors($(rgba[i]).text());
        var r = colors['r'];
        var g = colors['g'];
        var b = colors['b'];
        var a = ui.value;

        var rgbaValue = GetRGBA(r, g, b, a);
        $(rgba[i]).css('background-color', rgbaValue).text(rgbaValue);

        var hexValue = ConvertToHexColor(r, g, b, a);
        $(hex[i]).css('background-color', hexValue).text(hexValue);
      }
    }
  });
  
  /*
   * rgba形式に整形する
   */
  function GetRGBA(r, g, b, a) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a.toFixed(1) + ')';
  }
  
  /*
   * rgba値から各色値を取得する
   */
  function GetColors(rgba) {
    var x = rgba.replace('rgba(', '').replace(')', '').split(',');
    var colors = {'r': x[0], 'g': x[1], 'b': x[2], 'a': x[3]};
    return colors;
  }
  
  /*
   * rgba値を16進数に形式変換する
   */
  function ConvertToHexColor(r, g, b, a) {
    var decR = ConvertToHex(r, a);
    var decG = ConvertToHex(g, a);
    var decB = ConvertToHex(b, a);
    return '#' + decR + decG + decB;
  }
  
  /*
   * rgba値から16進数値に変換する
   */
  function ConvertToHex(dec, alpha) {
    var def = parseInt(dec);
    var i = def + (255 - def) * (1 - alpha);
    return Math.round(i).toString(16);
  }
  
  /*
   * 色ブロッククリック時イベント
   */
  $(document).on('click', '.box', function() {
    
  });

});
