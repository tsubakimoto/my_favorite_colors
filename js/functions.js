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
      // 16進数色をRGBA色に変換
      var rgba = FormatToRgba(ConvertToRgbaColor(colors[j]));
      if (rgba == '') {
        // 未指定の色値は無視
        continue;
      }
      
      // 16進数色エリアを作成
      var divHex = $('<div>')
                      .addClass('span6 box hex')
                      .addClass('hex' + i + '-' + j)
                      .css('background-color', '#' + colors[j])
                      .append($('<span>').text('#' + colors[j]));
      
      // RGBA色エリアを作成
      var divRgba = $('<div>')
                      .addClass('span6 box rgba')
                      .addClass('rgba' + i + '-' + j)
                      .css('background-color', rgba)
                      .append($('<span>').text(rgba));
      
      $('#' + data[i].Name).append($('<div>').addClass('row').append(divHex).append(divRgba));
    }
  }
}

/**************************************************
 *
 * 16進数色に関する関数
 *
 **************************************************/

/*
 * 16進数をrgba値に整形する
 */
function ConvertToRgbaColor(hex) {
  var color = {};
  if (hex.length == 3) {
    // #nnn の場合
    color['r'] = SubstringColor(hex, 0, 1, true);
    color['g'] = SubstringColor(hex, 1, 2, true);
    color['b'] = SubstringColor(hex, 2, 3, true);
  } else if (hex.length == 6) {
    // #nnnnnn の場合
    color['r'] = SubstringColor(hex, 0, 2, true);
    color['g'] = SubstringColor(hex, 2, 4, true);
    color['b'] = SubstringColor(hex, 4, 6, true);
  } else {
    return '';
  }
  color['a'] = 1.0;
  return color;
}

/*
 * 16進数の各色を取り出す
 */
function SubstringColor(hex, from, to, conv) {
  if (hex == '') {
    return '';
  } else {
    var s = hex.substring(from, to);
    if (s.length == 1) {
      s = s + s;
    } else if (2 < s.length) {
      return '';
    }
    return conv == true ? parseInt(s, 16) : s;
  }
}

/**************************************************
 *
 * RGBAに関する関数
 *
 **************************************************/

/*
 * rgba形式に整形する
 */
function FormatToRgba(color) {
  if (color == '') {
    return '';
  } else {
    return 'rgba(' + color['r'] + ', ' + color['g'] + ', ' + color['b'] + ', ' + color['a'].toFixed(1) + ')';
  }
}

/*
 * rgba値から各色値を取得する
 */
function GetColorFromRgba(rgba) {
  var x = rgba.replace('rgba(', '').replace(')', '').split(',');
  var color = {'r': x[0], 'g': x[1], 'b': x[2], 'a': x[3]};
  return color;
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
