$(function() {
  
  /*
   * 画面表示時イベント
   */
  $.getJSON('./js/data.json', function(data) {
    MakePanesAndTabs(data.Items);
    MakeColorPanel(data.Items);
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
      
      for (var i = 0; i < rgba.length; i++) {
        var color = GetColorFromRgba($(rgba[i]).text());
        color['a'] = ui.value;

        var rgbaValue = FormatToRgba(color);
        $(rgba[i]).css('background-color', rgbaValue).text(rgbaValue);

        var hexValue = ConvertToHexColor(color);
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
    
    // タブ追加ボタンか否か
    if ($(this).parent().attr('id') == 'addtab') {
      AddTab();
    } else {
      $(this).tab('show');
    }
  });
  
  $(document).on('click', '.close-tab', function(e) {
    RemoveTab($(this).parent().parent().attr('id'));
  });
  
});
