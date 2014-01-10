/**************************************************
 *
 * 共通
 *
 **************************************************/

/*
 * タブペイン、カラータブを生成する
 */
function MakePanesAndTabs(data) {
  var tabPanes = $('#tab-panes');
  var colorTabs = $('#color-tabs');
  
  for (var i = 0; i < data.length; i++) {
    var tabPane = $('<div>').addClass('tab-pane').attr('id', data[i].Name);
    var colorTab = $('<li>').append($('<a>').attr('href', '#' + data[i].Name).text(data[i].Name));
    
    if (i == 0) {
      tabPane.addClass('active');
      colorTab.addClass('active');
    }
    
    tabPanes.append(tabPane);
    colorTabs.append(colorTab);
  }
}

/*
 * カラーパネルを生成する
 */
function MakeColorPanel(data) {
  for (var i = 0; i < data.length; i++) {
    var colors = data[i].Colors;
    
    for (var j = 0; j < colors.length; j++) {
      var hexValue = ConvertToHexColor(GetColorFromRgba(colors[j]));
      
      var divHex = $('<div>')
                      .addClass('span6 box hex')
                      .addClass('hex' + i + '-' + j)
                      .css('background-color', hexValue)
                      .append($('<span>').text(hexValue));
      
      var divRgba = $('<div>')
                      .addClass('span6 box rgba')
                      .addClass('rgba' + i + '-' + j)
                      .css('background-color', colors[j])
                      .append($('<span>').text(colors[j]));
      
      $('#' + data[i].Name).append($('<div>').addClass('row').append(divHex).append(divRgba));
    }
  }
}

/**************************************************
 *
 * 16進数色に関する関数
 *
 **************************************************/


/**************************************************
 *
 * RGBAに関する関数
 *
 **************************************************/

/*
 * rgba形式に整形する
 */
function FormatToRgba(color) {
  return 'rgba(' + color['r'] + ', ' + color['g'] + ', ' + color['b'] + ', ' + color['a'].toFixed(1) + ')';
}

/*
 * rgba値から各色値を取得する
 */
function GetColorFromRgba(rgba) {
  var x = rgba.replace('rgba(', '').replace(')', '').split(',');
  var colors = {'r': x[0], 'g': x[1], 'b': x[2], 'a': x[3]};
  return colors;
}

/*
 * rgba値を16進数に形式変換する
 */
function ConvertToHexColor(color) {
  var decR = ConvertToHex(color['r'], color['a']);
  var decG = ConvertToHex(color['g'], color['a']);
  var decB = ConvertToHex(color['b'], color['a']);
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
