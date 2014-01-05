$(function() {
  
  /*
   * 画面表示時イベント
   */
  $.getJSON("/js/data.json", function(data) {
    MakeTabPanes(data.Items);
    MakeColorTabs(data.Items);
    MakeColorPanel(data.Items);
  });
  
  /*
   * タブペインを生成する
   */
  function MakeTabPanes(data) {
    var tabPanes = $('#tab-panes');
    for (var i = 0; i < data.length; i++) {
      var tabPane = $('<div>').addClass('tab-pane').attr('id', data[i].Name);
      if (i == 0) {
        tabPane.addClass('active');
      }
      tabPanes.append(tabPane);
    }
  }
  
  /*
   * カラータブを生成する
   */
  function MakeColorTabs(data) {
    var colorTabs = $('#color-tabs');
    for (var i = 0; i < data.length; i++) {
      var href = '#' + data[i].Name;
      var colorTab = $('<li>').append($('<a>').attr('href', href).text(data[i].Name));
      if (i == 0) {
        colorTab.addClass('active');
      }
      colorTabs.append(colorTab);
    }
  }
  
  /*
   * カラーパネルを生成する
   */
  function MakeColorPanel(rgbaArray) {
    for (var i = 0; i < rgbaArray.length; i++) {
      var rgba = rgbaArray[i].Colors;
      
      for (var j = 0; j < rgba.length; j++) {
        var colors = GetColors(rgba[j]);
        var hexValue = ConvertToHexColor(colors['r'], colors['g'], colors['b'], colors['a']);
        
        var hexSpan = $('<span>').text(hexValue);
        var rgbaSpan = $('<span>').text(rgba[j]);
        
        var divHex = $('<div>')
                        .addClass('span6')
                        .addClass('box')
                        .addClass('hex')
                        .addClass('hex' + i + '-' + j)
                        .css('background-color', hexValue)
                        .append(hexSpan);
        
        var divRgba = $('<div>')
                        .addClass('span6')
                        .addClass('box')
                        .addClass('rgba')
                        .addClass('rgba' + i + '-' + j)
                        .css('background-color', rgba[j])
                        .append(rgbaSpan);
        
        $('#' + rgbaArray[i].Name).append($('<div>')
                                  .addClass('row')
                                  .append(divHex)
                                  .append(divRgba)
                                );
      }
    }
  }
  
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
    var hex = Math.round(i).toString(16);
    return ('0' + hex).slice(-2);
  }
  
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
      
      for (var i = 0; i < rgba.length; i++) {
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
   * 色ブロッククリック時イベント
   */
  $(document).on('click', '.box', function() {
    $('.ui-widget-header')
      .css('background', 'none')
      .css('background-color', $(this).css('background-color'));
  });
  
  /*
   * タブクリック時イベント
   */
  $(document).on('click', '#color-tabs a', function(e) {
    e.preventDefault();
    $(this).tab('show');
  });
  
});
