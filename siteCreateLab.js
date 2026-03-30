var title = "";
var text = "";
var csstext = "";
var jstext = "";
var cssd = "";
var YOMI = "";
var classd = "";
var cssk = ""; // 追加

function callbackFn ( event ) {
	event.returnValue = "入力内容が残ってますが、このページを離れても大丈夫ですか？" ;
}
window.onbeforeunload = callbackFn;


Blockly.BlockSvg.prototype.initSvg = function() {
  // 元の初期化処理を保存して実行
  var origInitSvg = Blockly.BlockSvg.prototype.initSvg;
  return function() {
    origInitSvg.call(this);
    
    // もしこのブロックが「上につながらない（previousConnectionがない）」場合、
    // 強制的に帽子（hat）の属性を追加する！
    if (!this.previousConnection && this.type === "S") {
      this.hat = "cap";
    }
  };
}();

Blockly.defineBlocksWithJsonArray([
	{
        "type": "FT",
        "message0": "チケット",
        "output": "TICKET",
        "colour": "#ff6b5c",
        "tooltip": "オリジナルレンダリング^-^",
        "helpUrl": ""
    },
    {
        "type": "F",
        "message0": "フィールド大量 %1 %2 %3 %4 %5 %6",
        "colour": '#aa8800',
        "args0": [
            {
                "type": 'field_input',
                "name": 'FIELDNAME',
                "date": '1/11/2022',
                "token": 'L/d/yyyy',
                "textEdit": true
            },
            {
                "type": 'field_date',
                "name": 'FIELDNAME',
                "date": '1/11/2022',
                "token": 'L/d/yyyy',
                "textEdit": true
            },
            {
                "type": 'field_angle',
                "offset": 90,
                "clockwise": true,
                "name": 'FIELDNAME',
                "value": 50,
            },
            {
                "type": "input_value",
                "name": "color"
            },
            {
                "type": 'field_grid_dropdown',
                "name": 'FIELDNAME',
                "options": [
                    ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'],
                    ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['0', '0'],
                ],
            },
            {
                "type": 'field_slider',
                "name": 'FIELDNAME',
                "value": 50,
                "min": 0,
                "max": 100,
                "precision": 1
            },
        ],
        "tooltip": "こんなにたくさんのフィールド　使い道あったら言って",
        "helpUrl": ""
    },
    //フィールドわいわい↑
    {
        "type": "HSE",
        "message0": "設定 %1 %2",
        "colour": '#ff9800',
        "previousStatement": "html",
        "nextStatement": "html",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "head", "check": "head" }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "HDA",
        "message0": "出すもの %1 %2",
        "colour": '#ff9800',
        "previousStatement": "html",
        "nextStatement": "html",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "body", "check": "body" }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "M",
        "message0": "文字 %1",
        "previousStatement": "body",
        "nextStatement": "body",
        "args0": [
            { "type": "input_value", "name": "MOZI", "check": [ "mozi", "kazu" ] }
        ],
        "colour": '#0580ed',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "S",
        "message0": "サイトを作り始める",
        "colour": '#ffbf00',
        "style": { "hat": "cap" },
        "nextStatement": "Sai",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "HCJ",
        "message0": "HTML %1 %2 CSS %3 %4 JavaScript %5 %6",
        "colour": '#ffbf00',
        "previousStatement": "Sai",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "html", "check": "html" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "css", "check": "css" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "js", "check": "js" }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "c_html",
        "message0": "HTML %1 %2",
        "colour": '#ffbf00',
        "previousStatement": "Sai",
        "nextStatement": "Sai",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "html", "check": "html" }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "c_css",
        "message0": "CSS %1 %2",
        "colour": '#ffbf00',
        "previousStatement": "Sai",
        "nextStatement": "Sai",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "css", "check": "css" }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "c_js",
        "message0": "JavaScript %1 %2",
        "colour": '#ffbf00',
        "previousStatement": "Sai",
        "nextStatement": "Sai",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "js", "check": "js" }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "T",
        "message0": "タイトルを %1 にする",
        "previousStatement": "head",
        "nextStatement": "head",
        "args0": [
            { "type": "input_value", "name": "websiteName", "check": [ "mozi", "kazu" ] }
        ],
        "colour": '#ff9800',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "JY",
        "message0": "JSを読み込む %1",
        "previousStatement": "head",
        "nextStatement": "head",
        "args0": [
            { "type": "input_value", "name": "JS", "check": [ "mozi", "kazu" ] }
        ],
        "colour": '#ff9800',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CY",
        "message0": "CSSを読み込む %1",
        "previousStatement": "head",
        "nextStatement": "head",
        "args0": [
            { "type": "input_value", "name": "CSS", "check": [ "mozi", "kazu" ] }
        ],
        "colour": '#ff9800',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "MD",
        "message0": "%1",
        "output": [ "mozi", "text" ],
        "args0": [
            { "type": "field_input", "name": "mozi" }
        ],
        "colour": '#000000',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "KD",
        "message0": "%1",
        "output": "kazu",
        "args0": [
            { "type": "field_number", "name": "kazu", "value": 0 }
        ],
        "colour": '#000000',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CID",
        "message0": "%1",
        "output": "color",
        "args0": [
            { "type": "field_colour_hsv_sliders", "name": "color", "colour": "#ff0000" }
        ],
        "colour": '#000000',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "K",
        "message0": "改行",
        "previousStatement": "body",
        "nextStatement": "body",
        "colour": '#0170a7',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "TD",
        "message0": "タイトル",
        "output": "mozi",
        "colour": '#20a002',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "GD",
        "message0": "%1 と %2",
        "output": "mozi",
        "args0": [
            { "type": "input_value", "name": "M1", "check": "mozi" },
            { "type": "input_value", "name": "M2", "check": "mozi" }
        ],
        "inputsInline": true,
        "colour": '#20a002',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "Ibtn",
        "message0": "INPUT ボタン 詳細設定 %1 文字 %2",
        "args0": [
            { "type": "input_value", "name": "syo", "check": "syo" },
            { "type": "input_value", "name": "value", "check": "mozi" }
        ],
        "inputsInline": true,
        "previousStatement": "body",
        "nextStatement": "body",
        "colour": '#0580ed',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "Bbtn",
        "message0": "BUTTON ボタン 詳細設定 %1 %2 %3",
        "args0": [
            { "type": "input_value", "name": "syo", "check": "syo" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "body", "check": "body" }
        ],
        "inputsInline": true,
        "previousStatement": "body",
        "nextStatement": "body",
        "colour": '#0580ed',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "p",
        "message0": "P  詳細設定 %1 %2",
        "args0": [
            { "type": "input_value", "name": "syo", "check": "syo" },
            { "type": "input_statement", "name": "p", "check": "body" }
        ],
        "inputsInline": true,
        "previousStatement": "body",
        "nextStatement": "body",
        "colour": '#0580ed',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "div",
        "message0": "DIV  詳細設定 %1 %2",
        "args0": [
            { "type": "input_value", "name": "syo", "check": "syo" },
            { "type": "input_statement", "name": "div", "check": "body" }
        ],
        "inputsInline": true,
        "previousStatement": "body",
        "nextStatement": "body",
        "colour": '#0580ed',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "span",
        "message0": "SPAN  詳細設定 %1 %2",
        "args0": [
            { "type": "input_value", "name": "syo", "check": "syo" },
            { "type": "input_statement", "name": "span", "check": "body" }
        ],
        "inputsInline": true,
        "previousStatement": "body",
        "nextStatement": "body",
        "colour": '#0580ed',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CD",
        "message0": "Classを %1 にする",
        "output": "syo",
        "args0": [
            { "type": "input_value", "name": "CM", "check": "mozi" }
        ],
        "colour": '#893273',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "ID",
        "message0": "Idを %1 にする",
        "output": "syo",
        "args0": [
            { "type": "input_value", "name": "IM", "check": "mozi" }
        ],
        "colour": '#893273',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "SGD",
        "message0": "%1 & %2",
        "output": "syo",
        "args0": [
            { "type": "input_value", "name": "S1", "check": "syo" },
            { "type": "input_value", "name": "S2", "check": "syo" }
        ],
        "inputsInline": true,
        "colour": '#893273',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "HC",
        "message0": "HTML コメント // %1",
        "previousStatement": "body",
        "nextStatement": "body",
        "args0": [
            { "type": "input_value", "name": "MOZI" }
        ],
        "colour": '#f0a080',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CC",
        "message0": "CSS コメント // %1",
        "previousStatement": "css",
        "nextStatement": "css",
        "args0": [
            { "type": "input_value", "name": "MOZI" }
        ],
        "colour": '#f0a080',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CN",
        "message0": "%1 を %2 %3",
        "args0": [
          { "type": "input_value", "name": "nani", "check": [ "kakutyo", "youso", "class", "id", "kanma", "puras" ] },
          { "type": "input_dummy" },
          { "type": "input_statement", "name": "dou", "check": "dou" }
        ],
        "inputsInline": true,
        "previousStatement": "css",
        "nextStatement": "css",
        "colour": "#298a8f",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CNCD",
        "message0": "Class %1",
        "args0": [
          { "type": "input_value", "name": "class", "check": "mozi" }
        ],
        "output": "class",
        "colour": '#298a8f',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CNID",
        "message0": "Id %1",
        "args0": [
          { "type": "input_value", "name": "id", "check": "mozi" }
        ],
        "output": "id",
        "colour": '#298a8f',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CNYD",
        "message0": "要素 %1",
        "args0": [
          { "type": "input_value", "name": "you", "check": "mozi" }
        ],
        "output": "id",
        "colour": '#298a8f',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CNB",
        "message0": "ボディー",
        "output": "id",
        "colour": '#298a8f',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CIS",
        "message0": "%1 を %2 にする",
        "args0": [
		    {"type": "field_dropdown", "name": "name", "options": [
    			  ["色", "color"],
      			  ["背景色", "background-color"]
    		]},
          { "type": "input_value", "name": "color", "check": "color" }
        ],
        "inputsInline": true,
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ed5179",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "WS",
        "message0": "%1 を %2 にする",
        "args0": [
		    {"type": "field_dropdown", "name": "name", "options": [
    			  ["横幅", "width"],
      			  ["縦幅", "height"],
                  ["最大横幅", "max-width"],
                  ["最小横幅", "min-width"],
                  ["最大縦幅", "max-height"],
                  ["最小縦幅", "min-height"],
                  ["文字の大きさ", "font-size"]
    		]},
            { "type": "input_value", "name": "naga", "check": "naga" }
        ],
        "inputsInline": true,
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ed5179",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "KMS",
        "message0": "角の %1 を %2 で丸くする",
        "args0": [
          { "type": "input_value", "name": "doko", "check": "doko" },
          { "type": "input_value", "name": "naga", "check": "naga" }
        ],
        "inputsInline": true,
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ed5179",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "DSS",
        "message0": "要素内側を %1 にそろえる",
        "args0": [
          { "type": "input_value", "name": "soroe", "check": "soroe" }
        ],
        "inputsInline": true,
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ed5179",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "PDS",
        "message0": "%1 の %2 の余白を %3 にする",
        "args0": [
		    {"type": "field_dropdown", "name": "name", "options": [
    			  ["要素内側", "padding"],
      			  ["要素外側", "margin"]
    		]},
          { "type": "input_value", "name": "doko", "check": "doko" },
          { "type": "input_value", "name": "naga", "check": "naga" }
        ],
        "inputsInline": true,
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ed5179",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "NS",
        "message0": "滑らかする。速さ  %1",
        "args0": [
          { "type": "input_value", "name": "kazu", "check": "kazu" }
        ],
        "inputsInline": true,
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ed5179",
        "tooltip": "",
        "helpUrl": ""
    },
	{
        "type": "FW",
        "message0": "文字の太さを %1 にする",
        "args0": [
            {
                "type": "field_slider",
                "name": "WEIGHT",
                "value": 4,
                "min": 1,
                "max": 9,
                "precision": 1
            }
        ],
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ed5179",
        "tooltip": "1:細い ～ 9:太い",
        "helpUrl": ""
    },
	{
        "type": "FF",
        "message0": "フォントを %1 にする",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "FONT",
                "options": [
                    ["ゴシック体 (標準)", "sans-serif"],
                    ["明朝体 (標準)", "serif"],
                    ["Noto Sans (すごく綺麗・スマホ最適)", "'Noto Sans JP', sans-serif"],
                    ["Noto Serif (美しい明朝・高級感)", "'Noto Serif JP', serif"],
                    ["M PLUS Rounded (かわいい丸字)", "'M PLUS Rounded 1c', sans-serif"],
                    ["Yusei Magic (油性ペンの手書き)", "'Yusei Magic', sans-serif"],
                    ["Dela Gothic One (極太インパクト)", "'Dela Gothic One', cursive"],
                    ["DotGothic16 (レトロ・ドット絵風)", "'DotGothic16', sans-serif"],
                    ["Hachi Maru Pop (昭和レトロポップ)", "'Hachi Maru Pop', cursive"],
                    ["等幅 (プログラミング用)", "monospace"]
                ]
            }
        ],
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ed5179",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "TMD",
        "message0": "透明",
        "output": "color",
        "colour": '#ed5179',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "PDD",
        "message0": "%1",
        "output": "doko",
        "args0": [
            {
              "type": "field_dropdown",
              "name": "PDD",
              "options": [
                [ "全部", "" ], [ "上", "-top" ], [ "下", "-bottom" ],
                [ "右", "-right" ], [ "左", "-left" ]
              ]
            }
        ],
        "colour": '#ed5179',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "ND",
        "message0": "%1 %2",
        "output": "naga",
        "args0": [
            { "type": "input_value", "name": "kazu", "check": "kazu" },
            {
              "type": "field_dropdown",
              "name": "ND",
              "options": [ [ "PX", "px" ], [ "%", "%" ] ]
            }
        ],
        "colour": '#ed5179',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "KMID",
        "message0": "%1",
        "output": "doko",
        "args0": [
            {
              "type": "field_dropdown",
              "name": "KMID",
              "options": [
                [ "全部", "" ], [ "右上", "-top-right" ], [ "左上", "-top-left" ],
                [ "右下", "-bottom-right" ], [ "左下", "-bottom-left" ]
              ]
            }
        ],
        "colour": '#ed5179',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "DSD",
        "message0": "%1",
        "output": "soroe",
        "args0": [
            {
              "type": "field_dropdown",
              "name": "DSD",
              "options": [
                [ "左端", "left" ], [ "右端", "right" ], [ "中央", "center" ],
                [ "開始側", "start" ], [ "終了側", "end" ]
              ]
            }
        ],
        "colour": '#ed5179',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CKLD",
        "message0": "クリックされたとき",
        "output": "kaku",
        "colour": '#f289af',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CHOD",
        "message0": "重なったとき",
        "output": "kaku",
        "colour": '#f289af',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "KTD",
        "message0": "%1 で %2",
        "output": "kakutyo",
        "args0": [
            { "type": "input_value", "name": "M1", "check": [ "YOU", "class", "id" ] },
            { "type": "input_value", "name": "M2", "check": "kaku" }
        ],
        "inputsInline": true,
        "colour": '#298a8f',
        "tooltip": "",
        "helpUrl": ""
    },

	{
        "type": "img_block",
        "message0": "パス %1 で画像を表示 詳細設定 %2",
        "args0": [
            {
                "type": "field_input",
                "name": "SRC",
                "text": "画像名.png"
            },
            {
                "type": "input_value",
                "name": "syo",
                "check": "syo"
            }
        ],
        "inputsInline": true,
        "previousStatement": "body",
        "nextStatement": "body",
        "colour": "#0580ed",
        "tooltip": "",
        "helpUrl": ""
    },
	
    {
        "type": "JC",
        "message0": "JS コメント // %1",
        "previousStatement": "js",
        "nextStatement": "js",
        "args0": [
            { "type": "input_value", "name": "MOZI", "check": "text" }
        ],
        "colour": '#f0a080',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "JMD",
        "message0": "%1",
        "output": "text",
        "args0": [
            { "type": "field_input", "name": "DKTM" }
        ],
        "colour": '#000000',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "JKD",
        "message0": "%1",
        "output": "jkazu",
        "args0": [
            { "type": "field_number", "name": "jkazu", "value": 0 }
        ],
        "colour": '#000000',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "JMAD",
        "message0": "文字 %1",
        "output": "text",
        "args0": [
            { "type": "input_value", "name": "DKTM", "check": "text" }
        ],
        "colour": '#aabbcc',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "JKAD",
        "message0": "数 %1",
        "output": "jkazu",
        "args0": [
            { "type": "input_value", "name": "DKTK", "check": "jkazu" }
        ],
        "colour": '#aabbcc',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "NNSD",
        "message0": "%1 を %2",
        "previousStatement": "haiN",
        "nextStatement": "haiN",
        "args0": [
            { "type": "input_value", "name": "DKTM1", "check": "text" },
            { "type": "input_value", "name": "DKTM2", "check": "text" }
        ],
        "inputsInline": true,
        "colour": '#abcabc',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "HAD[",
        "message0": "配列 [ %1 %2 ]",
        "output": "hai[",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "j[]", "check": [ "hai[", "hai{", "hai", "haiN" ] }
        ],
        "colour": '#bbaacc',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "HAD{",
        "message0": "JSON { %1 %2 }",
        "output": "hai{",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "j{}", "check": [ "hai[", "hai{", "hai", "haiN" ] }
        ],
        "colour": '#aaccbb',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "HAD",
        "message0": "%1 %2と",
        "previousStatement": "hai",
        "nextStatement": "hai",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "j{}", "check": [ "hai[", "hai{", "hai", "haiN" ] }
        ],
        "inputsInline": true,
        "colour": '#ccbbaa',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "NW",
        "message0": "%1 を %2 にする",
        "previousStatement": "js",
        "nextStatement": "js",
        "args0": [
            { "type": "input_value", "name": "NANI", "check": "HEN" },
            { "type": "input_value", "name": "DOU", "check": [ "text", "jkazu", "HEN", "hai{", "hai[" ] }
        ],
        "colour": '#fe9f3d',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "HD",
        "message0": "変数 %1",
        "args0": [
            { "type": "input_value", "name": "HEN", "check": "text" }
        ],
        "output": "HEN",
        "colour": '#fe9f3d',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "KB",
        "message0": "関数 %1",
        "previousStatement": "js",
        "nextStatement": "js",
        "args0": [
            { "type": "field_input", "name": "mozi" }
        ],
        "colour": '#8a88bb',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "KA",
        "message0": "関数 %1",
        "args0": [
            { "type": "field_input", "name": "mozi" }
        ],
        "output": "text",
        "colour": '#8a88bb',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "ks_mutator_container",
        "message0": "引数の設定 %1 %2",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "STACK" }
        ],
        "colour": "#8a88bb"
    },
    {
        "type": "ks_mutator_arg",
        "message0": "引数名 %1",
        "args0": [
            { "type": "field_input", "name": "NAME", "text": "x" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#8a88bb"
    },
    {
        "type": "KS",
        "message0": "⚙️ 関数 %1",
        "args0": [
          { "type": "field_input", "name": "mozi" }
        ],
        "mutator": "ks_mutator", // ★これが歯車を出す魔法の設定
        "inputsInline": false,
        "previousStatement": "js",
        "nextStatement": "js",
        "colour": "#8a88bb",
        "tooltip": "歯車マークで引数を追加できます",
        "helpUrl": ""
    },
	
    {
        "type": "MKS",
        "message0": "無名関数 %1 %2",
        "args0": [
          { "type": "input_dummy" },
          { "type": "input_statement", "name": "js", "check": "js" }
        ],
        "inputsInline": true,
        "output": "text",
        "colour": "#8a88bb",
        "tooltip": "",
        "helpUrl": ""
    },
    // --- 制御 (オレンジ) ---
    {
        "type": "p_logic_compare",
        "message0": "%1 %2 %3",
        "args0": [
            { "type": "input_value", "name": "A", "check": ["text", "jkazu"] },
            { "type": "field_dropdown", "name": "OP", "options": [
				["=", "=="],
				["≠","!="],
				[">", ">"],
				["<", "<"],
				["≦", "<="],
				["≧", ">="],
			]},
            { "type": "input_value", "name": "B", "check": ["text", "jkazu"] }
        ],
        "output": "Boolean",
        "colour": "#59c059",
        "inputsInline": true
    },
    {
        "type": "p_logic_operation",
        "message0": "%1 %2 %3",
        "args0": [
            { "type": "input_value", "name": "A", "check": "Boolean" },
            { "type": "field_dropdown", "name": "OP", "options": [["かつ", "AND"], ["または", "OR"]] },
            { "type": "input_value", "name": "B", "check": "Boolean" }
        ],
        "output": "Boolean",
        "colour": "#59c059",
        "inputsInline": true
    },
    {
        "type": "p_logic_negate",
        "message0": "%1 ではない",
        "args0": [
            { "type": "input_value", "name": "BOOL", "check": "Boolean" }
        ],
        "output": "Boolean",
        "colour": "#59c059"
    },    
    {
        "type": "p_control_if",
        "message0": "もし %1 なら %2 %3",
        "args0": [
            { "type": "input_value", "name": "IF", "check": "Boolean" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO", "check": "js" }
        ],
        "previousStatement": "js",
        "nextStatement": "js",
        "colour": "#124d99"
    },
    {
        "type": "p_control_if_else",
        "message0": "もし %1 なら %2 %3 でなければ %4 %5",
        "args0": [
            { "type": "input_value", "name": "IF", "check": "Boolean" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO", "check": "js" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "ELSE", "check": "js" }
        ],
        "previousStatement": "js",
        "nextStatement": "js",
        "colour": "#124d99"
    },
    {
        "type": "p_control_repeat",
        "message0": "%1 回繰り返す %2 %3",
        "args0": [
            { "type": "input_value", "name": "TIMES", "check": "jkazu" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO", "check": "js" }
        ],
        "previousStatement": "js",
        "nextStatement": "js",
        "colour": "#124d99"
    },
    {
        "type": "p_if_mozi_reporter",
        "message0": "もし %1 なら %2 でなければ %3",
        "args0": [
            { "type": "input_value", "name": "IF", "check": "Boolean" },
            { "type": "input_value", "name": "A", "check": ["mozi", "text"] },
            { "type": "input_value", "name": "B", "check": ["mozi", "text"] }
        ],
        "output": ["mozi", "text"],
        "colour": "#124d99",
        "inputsInline": true
    }
]);

// ==========================================
// 共有しない（固定文字の）引数レポーターブロック
// ==========================================
Blockly.Blocks['KS_ARG_REPORTER'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabel(""), "ARG_NAME");
    this.setOutput(true, null);
    this.setColour('#ff6b5c'); 
  }
};

javascript.javascriptGenerator.forBlock['KS_ARG_REPORTER'] = function(block) {
    var argName = block.getFieldValue('ARG_NAME');
    return [argName, javascript.Order.ATOMIC];
};

// ==========================================
// 関数の歯車（ミューテーター）
// ==========================================
Blockly.Extensions.registerMutator(
  'ks_mutator',
  {
    arguments_: [], 

    saveExtraState: function() { return { 'arguments': this.arguments_ }; },
    loadExtraState: function(state) { this.arguments_ = state['arguments'] || []; this.updateShape_(); },
    decompose: function(workspace) {
      const containerBlock = workspace.newBlock('ks_mutator_container');
      containerBlock.initSvg();
      let connection = containerBlock.getInput('STACK').connection;
      for (let i = 0; i < this.arguments_.length; i++) {
        const argBlock = workspace.newBlock('ks_mutator_arg');
        argBlock.initSvg();
        argBlock.setFieldValue(this.arguments_[i], 'NAME');
        connection.connect(argBlock.previousConnection);
        connection = argBlock.nextConnection;
      }
      return containerBlock;
    },
    compose: function(containerBlock) {
      this.arguments_ = [];
      let clauseBlock = containerBlock.getInputTargetBlock('STACK');
      while (clauseBlock) {
        if (clauseBlock.type === 'ks_mutator_arg') {
          this.arguments_.push(clauseBlock.getFieldValue('NAME'));
        }
        clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
      }
      this.updateShape_();
    },
    
    updateShape_: function() {
      let existingArgs = 0;
      while (this.getInput('ARG' + existingArgs)) {
        this.removeInput('ARG' + existingArgs);
        existingArgs++;
      }

      for (let i = 0; i < this.arguments_.length; i++) {
        let argName = this.arguments_[i];
        
        // 穴を作る
        let input = this.appendValueInput('ARG' + i)
                        .setAlign(Blockly.inputs.Align.RIGHT);
                        
        if (i === 0) {
            input.appendField("引数");
        }

        if (this.getInput('js')) {
          this.moveInputBefore('ARG' + i, 'js');
        }

        // 穴にシャドウブロックをはめ込む（安全な標準機能）
        Blockly.Events.disable();
        try {
            let shadow = this.workspace.newBlock('KS_ARG_REPORTER');
            shadow.setShadow(true);
            shadow.setFieldValue(argName, 'ARG_NAME');
            shadow.initSvg();
            shadow.render();
            input.connection.connect(shadow.outputConnection);
        } finally {
            Blockly.Events.enable();
        }
      }

      if (!this.getInput('js')) {
        this.appendStatementInput('js')
            .setCheck('js')
            .appendField('で処理');
      }
    }
  },
  function() { this.updateShape_(); },
  ['ks_mutator_arg']
);

// ==========================================
// ★ ExtForge方式：シャドウブロックのクリック判定を横取りする
// ==========================================
// ※ここがドラッグやエラーを発生させない安全な書き方です！

// 元のマウスダウン処理を保存
const origOnMouseDown = Blockly.BlockSvg.prototype.onMouseDown_;

Blockly.BlockSvg.prototype.onMouseDown_ = function(e) {
    // 今クリックしたのが「引数のシャドウブロック」なら
    if (this.isShadow() && this.type === 'KS_ARG_REPORTER') {
        const workspace = this.workspace;
        const gesture = workspace.getGesture(e);

        // 左クリックで、ドラッグシステムの準備ができていれば
        if (e.button === 0 && gesture) {
            Blockly.Events.disable();
            let clone;
            try {
                // 1. 全く同じ文字のクローンを作る
                clone = workspace.newBlock('KS_ARG_REPORTER');
                clone.setFieldValue(this.getFieldValue('ARG_NAME'), 'ARG_NAME');

                // 2. 連動のために親の情報を保存
                const targetConn = this.outputConnection.targetConnection;
                if (targetConn) {
                    const parentInputName = targetConn.getParentInput().name;
                    const parentFunctionBlock = this.getParent();
                    clone.data = JSON.stringify({
                        parentId: parentFunctionBlock.id,
                        inputName: parentInputName,
                        originalName: this.getFieldValue('ARG_NAME')
                    });
                }

                clone.initSvg();
                clone.render();

                // 3. マウスの現在位置に移動
                const xy = this.getRelativeToSurfaceXY();
                clone.moveBy(xy.x, xy.y);
            } finally {
                Blockly.Events.enable();
            }

            // 4. 【重要】元のシャドウブロックではなく、クローンのドラッグを開始させる
            gesture.setTargetBlock(clone);
            gesture.handleWsStart(e, workspace);
            // そのまま処理を終了する（シャドウブロックのクリックイベントをここで打ち切る）
            return; 
        }
    }

    // 引数ブロック以外をクリックした場合は、いつも通りの処理を行う
    origOnMouseDown.call(this, e);
};

// ----------------------------------------------------
// ジェネレータ定義 (valueToCode と Tuple に修正済み)
// ----------------------------------------------------

javascript.javascriptGenerator.forBlock['M'] = function(block, generator) {
    var value_mozi = generator.valueToCode(block, 'MOZI', javascript.Order.NONE) || '';
    text = text + value_mozi; 
    return '\n';
};

javascript.javascriptGenerator.forBlock['K'] = function() {
    text = text + "\n<br>"; 
    return '\n';
};

javascript.javascriptGenerator.forBlock['HC'] = function(block, generator) {
    var value_mozi = generator.valueToCode(block, 'MOZI', javascript.Order.NONE) || '';
    text = text + "<!-- " + value_mozi + " -->\n"; 
    return '\n';
};

javascript.javascriptGenerator.forBlock['CC'] = function(block, generator) {
    var value_mozi = generator.valueToCode(block, 'MOZI', javascript.Order.NONE) || '';
    csstext = csstext + "/* " + value_mozi + " */\n"; 
    return '\n';
};

javascript.javascriptGenerator.forBlock['JC'] = function(block, generator) {
    var value_mozi = generator.valueToCode(block, 'MOZI', javascript.Order.NONE) || '';
    jstext = jstext + "// " + value_mozi + "\n"; 
    return '\n';
};

javascript.javascriptGenerator.forBlock['S'] = function() {
    return '\n';
};

javascript.javascriptGenerator.forBlock['T'] = function(block, generator) {
    var value_mozi = generator.valueToCode(block, 'websiteName', javascript.Order.NONE) || '';
    title = value_mozi;
    return '\n';
};

javascript.javascriptGenerator.forBlock['JY'] = function(block, generator) {
    var value_mozi = generator.valueToCode(block, 'JS', javascript.Order.NONE) || '';
    YOMI = YOMI + '\n<script src="' + value_mozi + '"></script>';
    return '\n';
};

javascript.javascriptGenerator.forBlock['CY'] = function(block, generator) {
    var value_mozi = generator.valueToCode(block, 'CSS', javascript.Order.NONE) || '';
    YOMI = YOMI + '\n<link rel="stylesheet" href="' + value_mozi + '">';
    return '\n';
};

javascript.javascriptGenerator.forBlock['MD'] = function(block) {
    var value_mozi = block.getFieldValue('mozi');
    return [value_mozi, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['JMD'] = function(block) {
    var value_mozi = block.getFieldValue('DKTM');
    return [value_mozi, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['JMAD'] = function(block, generator) {
    var value_mozi = generator.valueToCode(block, 'DKTM', javascript.Order.NONE) || '';
    return ['"' + value_mozi + '"', javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['JKAD'] = function(block, generator) {
    var value_kazu = generator.valueToCode(block, 'DKTK', javascript.Order.NONE) || '0';
    return [value_kazu, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['KMID'] = function(block) {
    var dropdown_KMID = block.getFieldValue('KMID');
    return [dropdown_KMID, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['PDD'] = function(block) {
    var dropdown_PDD = block.getFieldValue('PDD');
    return [dropdown_PDD, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['DSD'] = function(block) {
    var dropdown_DSD = block.getFieldValue('DSD');
    return [dropdown_DSD, javascript.Order.ATOMIC];
};

// 【修正】 引数に generator を追加しました
javascript.javascriptGenerator.forBlock['ND'] = function(block, generator) {
    var value_kazu = generator.valueToCode(block, 'kazu', javascript.Order.NONE) || '0';
    var dropdown_ND = block.getFieldValue('ND');
    return [value_kazu + dropdown_ND, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['JKD'] = function(block) {
    var number = block.getFieldValue('jkazu');
    return [String(number), javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['KD'] = function(block) {
    var number = block.getFieldValue('kazu');
    return ["  " + String(number), javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['CID'] = function(block) {
    var value_color = block.getFieldValue('color');
    return [value_color, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['TD'] = function() {
    return [title, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['GD'] = function(block, generator) {
    var value_m1 = generator.valueToCode(block, 'M1', javascript.Order.NONE) || '';
    var value_m2 = generator.valueToCode(block, 'M2', javascript.Order.NONE) || '';
    return [value_m1 + value_m2, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['Ibtn'] = function(block, generator) {
    var value_syo = generator.valueToCode(block, 'syo', javascript.Order.NONE) || '';
    var value_value = generator.valueToCode(block, 'value', javascript.Order.NONE) || '';
    text = text + '\n<input type="button"' + value_syo + ' value="' + value_value + '">';
    return '\n';
};

javascript.javascriptGenerator.forBlock['Bbtn'] = function(block, generator) {
    var value_syo = generator.valueToCode(block, 'syo', javascript.Order.NONE) || '';
    var M = text;
    text = "";
    generator.statementToCode(block, 'body');
    text = M + '\n<button' + value_syo + '>\n    ' + text + '\n</button>';
    return '\n';
};

javascript.javascriptGenerator.forBlock['p'] = function(block, generator) {
    var value_syo = generator.valueToCode(block, 'syo', javascript.Order.NONE) || '';
    var M = text;
    text = "";
    generator.statementToCode(block, 'p');
    text = M + '\n<p' + value_syo + '>\n    ' + text + '\n</p>';
    return '\n';
};

javascript.javascriptGenerator.forBlock['div'] = function(block, generator) {
    var value_syo = generator.valueToCode(block, 'syo', javascript.Order.NONE) || '';
    var M = text;
    text = "";
    generator.statementToCode(block, 'div');
    text = M + '\n<div' + value_syo + '>\n    ' + text + '\n</div>';
    return '\n';
};

javascript.javascriptGenerator.forBlock['span'] = function(block, generator) {
    var value_syo = generator.valueToCode(block, 'syo', javascript.Order.NONE) || '';
    var M = text;
    text = "";
    generator.statementToCode(block, 'span');
    text = M + '\n<span' + value_syo + '>\n    ' + text + '\n</span>';
    return '\n';
};

javascript.javascriptGenerator.forBlock['HCJ'] = function(block, generator) {
    generator.statementToCode(block, 'html');
    generator.statementToCode(block, 'css');
    generator.statementToCode(block, 'js');
    return '\n';
};

javascript.javascriptGenerator.forBlock['c_html'] = function(block, generator) {
    generator.statementToCode(block, 'html');
    return '\n';
}

javascript.javascriptGenerator.forBlock['c_css'] = function(block, generator) {
    generator.statementToCode(block, 'css');
    return '\n';
}

javascript.javascriptGenerator.forBlock['c_js'] = function(block, generator) {
    generator.statementToCode(block, 'js');
    return '\n';
}

javascript.javascriptGenerator.forBlock['HSE'] = function(block, generator) {
    generator.statementToCode(block, 'head');
    return '\n';
};

javascript.javascriptGenerator.forBlock['HDA'] = function(block, generator) {
    generator.statementToCode(block, 'body');
    return '\n';
};

javascript.javascriptGenerator.forBlock['CD'] = function(block, generator) {
    var value_cm = generator.valueToCode(block, 'CM', javascript.Order.NONE) || '';
    return [' class="' + value_cm + '_site"', javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['ID'] = function(block, generator) {
    var value_im = generator.valueToCode(block, 'IM', javascript.Order.NONE) || '';
    return [' id="' + value_im + '_site"', javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['SGD'] = function(block, generator) {
    var value_s1 = generator.valueToCode(block, 'S1', javascript.Order.NONE) || '';
    var value_s2 = generator.valueToCode(block, 'S2', javascript.Order.NONE) || '';
    return [value_s1 + value_s2, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['CN'] = function(block, generator) {
    var value_nani = generator.valueToCode(block, 'nani', javascript.Order.NONE) || '';
    cssk = cssd;
    cssd = "";
    generator.statementToCode(block, 'dou');
    csstext = csstext + value_nani + " {"  + cssd + cssk + "}\n";
    cssd = "";
    cssk = "";
    return "\n";
};

javascript.javascriptGenerator.forBlock['CIS'] = function(block, generator) {
    var name = block.getFieldValue('name');
    var value_color = generator.valueToCode(block, 'color', javascript.Order.NONE) || '';
    cssd = cssd + "\n    " + name + ": " + value_color + ";";
    return "\n";
};

javascript.javascriptGenerator.forBlock['NS'] = function(block, generator) {
    var value_kazu = generator.valueToCode(block, 'kazu', javascript.Order.NONE) || '0';
    cssd = cssd + "\n    transition: " + (parseFloat(value_kazu) / 10) + 's' + ";";
    return "\n";
};

// 【修正】 value_kazu を削除 (naga に数字も単位も含まれているため)
javascript.javascriptGenerator.forBlock['WS'] = function(block, generator) {
    var name = block.getFieldValue('name');
    var value_naga = generator.valueToCode(block, 'naga', javascript.Order.NONE) || '';
    cssd = cssd + "\n    " + name + ": " + value_naga + ";";
    return "\n";
};

javascript.javascriptGenerator.forBlock['DSS'] = function(block, generator) {
    var value_soroe = generator.valueToCode(block, 'soroe', javascript.Order.NONE) || '';
    cssd = cssd + "\n    text-align: " + value_soroe + ";";
    return "\n";
};

// 【修正】 value_kazu を削除
javascript.javascriptGenerator.forBlock['PDS'] = function(block, generator) {
    var name = block.getFieldValue('name');
    var value_kado = generator.valueToCode(block, 'doko', javascript.Order.NONE) || '';
    var value_naga = generator.valueToCode(block, 'naga', javascript.Order.NONE) || '';
    cssd = cssd + "\n    " + name + value_kado + ":" + value_naga + ";";
    return "\n";
};

// 【修正】 value_kazu を削除
javascript.javascriptGenerator.forBlock['KMS'] = function(block, generator) {
    var value_kado = generator.valueToCode(block, 'doko', javascript.Order.NONE) || '';
    var value_naga = generator.valueToCode(block, 'naga', javascript.Order.NONE) || '';
    cssd = cssd + "\n    border" + value_kado + "-radius:" + value_naga + ";";
    return "\n";
};

// 文字の太さ（スライダーの数値を100倍にして CSS に変換）
javascript.javascriptGenerator.forBlock['FW'] = function(block, generator) {
    var weight = block.getFieldValue('WEIGHT');
    var finalWeight = weight * 100; // 4なら400になる
    cssd = cssd + "\n    font-weight: " + finalWeight + ";";
    return "\n";
};

// フォントの種類
javascript.javascriptGenerator.forBlock['FF'] = function(block, generator) {
    var font = block.getFieldValue('FONT');
    
    // Google Fontsから読み込むためのURL設定
    var fontLink = "";
    if (font.indexOf("Noto Sans JP") !== -1) fontLink = "family=Noto+Sans+JP:wght@100..900";
    else if (font.indexOf("Noto Serif JP") !== -1) fontLink = "family=Noto+Serif+JP:wght@200..900";
    else if (font.indexOf("M PLUS Rounded 1c") !== -1) fontLink = "family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900";
    else if (font.indexOf("Yusei Magic") !== -1) fontLink = "family=Yusei+Magic";
    else if (font.indexOf("Dela Gothic One") !== -1) fontLink = "family=Dela+Gothic+One";
    else if (font.indexOf("DotGothic16") !== -1) fontLink = "family=DotGothic16";
    else if (font.indexOf("Hachi Maru Pop") !== -1) fontLink = "family=Hachi+Maru+Pop";

    // 選ばれたフォントがGoogle Fontsで、かつまだHTMLに読み込んでいなければ追加する
    if (fontLink !== "" && YOMI.indexOf(fontLink) === -1) {
        // Google Fontsの基本サーバー接続（1回だけ追加）
        if (YOMI.indexOf("fonts.googleapis.com") === -1) {
            YOMI += '\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
        }
        // 実際のフォントのダウンロードURLを追加
        YOMI += '\n<link href="https://fonts.googleapis.com/css2?' + fontLink + '&display=swap" rel="stylesheet">';
    }

    cssd = cssd + "\n    font-family: " + font + ";";
    return "\n";
};

javascript.javascriptGenerator.forBlock['TMD'] = function(r) {
    return ["transparent", javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['CKLD'] = function() {
    return [":active", javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['CHOD'] = function() {
    return [":hover", javascript.Order.ATOMIC];
};


javascript.javascriptGenerator.forBlock['img_block'] = function(block, generator) {
    var src = block.getFieldValue('SRC') || '';
    
    // もし入力された文字が「http」や「./」で始まっていなければ ./media/ を付ける
    if (!src.startsWith('./') && !src.startsWith('http')) {
        src = './media/' + src;
    }
    
    var value_syo = generator.valueToCode(block, 'syo', javascript.Order.NONE) || '';
    text = text + '\n<img src="' + src + '"' + value_syo + '>';
    return '\n';
};


javascript.javascriptGenerator.forBlock['CNCD'] = function(block, generator) {
    var value_class = generator.valueToCode(block, 'class', javascript.Order.NONE) || '';
    return ["." + value_class + "_site", javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['CNID'] = function(block, generator) {
    var value_id = generator.valueToCode(block, 'id', javascript.Order.NONE) || '';
    return ["#" + value_id + "_site", javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['CNYD'] = function(block, generator) {
    var value_you = generator.valueToCode(block, 'you', javascript.Order.NONE) || '';
    return ["#kekka " + value_you, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['CNB'] = function(block, generator) {
     return ["#kekka", javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['NW'] = function(block, generator) {
    var value_NANI = generator.valueToCode(block, 'NANI', javascript.Order.NONE) || '""';
    var value_DOU = generator.valueToCode(block, 'DOU', javascript.Order.NONE) || '""';
    jstext = jstext + value_NANI + ' = ' + value_DOU + ';\n';
    return '\n';
};

javascript.javascriptGenerator.forBlock['HD'] = function(block, generator) {
    var value_HEN = generator.valueToCode(block, 'HEN', javascript.Order.NONE) || '';
    return [value_HEN + "_site", javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['KTD'] = function(block, generator) {
    var value_m1 = generator.valueToCode(block, 'M1', javascript.Order.NONE) || '';
    var value_m2 = generator.valueToCode(block, 'M2', javascript.Order.NONE) || '';
    return [value_m1 + value_m2, javascript.Order.ATOMIC];
};

// 【修正】 field_input に対応するように getFieldValue に変更
javascript.javascriptGenerator.forBlock['KB'] = function(block, generator) {
    var txt = block.getFieldValue('mozi') || '';
    jstext = jstext + txt + "();\n";
    return '\n';
};

// 関数定義ブロック（中身が漏れない完全版）
javascript.javascriptGenerator.forBlock['KS'] = function(block, generator) {
    var nani = block.getFieldValue('mozi') || '';
    
    // 歯車で設定された引数名を集める
    var args = [];
    if (block.arguments_) {
        args = block.arguments_;
    }
    
    // ▼ ifブロックなどと同じ仕組み：今のjstextを保存して中身だけを抽出する
    var currentJS = jstext;
    jstext = ""; 
    generator.statementToCode(block, 'js');
    var branch = jstext;
    
    // 保存しておいたものと合体させて、関数の外枠で包み込む
    jstext = currentJS + "function " + nani + "(" + args.join(", ") + ") {\n" + branch + "}\n";
    return '\n';
};

// 無名関数ブロック（こちらも中身が漏れないように修正）
javascript.javascriptGenerator.forBlock['MKS'] = function(block, generator) {
    // 中身だけを抽出する
    var currentJS = jstext;
    jstext = "";
    generator.statementToCode(block, 'js');
    var branch = jstext;
    jstext = currentJS; // グローバル変数を元の状態に戻す
    
    // 無名関数は穴にはめ込むブロック（output）なので、文字として返す
    return ["function() {\n" + branch + "}", javascript.Order.ATOMIC];
};

// 【修正】 field_input に対応するように getFieldValue に変更
javascript.javascriptGenerator.forBlock['KA'] = function(block, generator) {
    var txt = block.getFieldValue('mozi') || '';
    return [txt + "()", javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['HAD['] = function(block, generator) {
    var elements = generator.statementToCode(block, 'j[]');
    var code = '[\n' + elements + ']';
    return [code, javascript.Order.NONE]; 
};

javascript.javascriptGenerator.forBlock['HAD{'] = function(block, generator) {
    var elements = generator.statementToCode(block, 'j{}');
    var code = '{\n' + elements + '}';
    return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['HAD'] = function(block, generator) {
    var elements = generator.statementToCode(block, 'j{}');
    if (!elements.trim()) {
        return 'null,\n';
    } else {
        return elements.trim() + ',\n';
    }
};

javascript.javascriptGenerator.forBlock['NNSD'] = function(block, generator) {
    var key = generator.valueToCode(block, 'DKTM1', javascript.Order.NONE) || '""';
    var value = generator.valueToCode(block, 'DKTM2', javascript.Order.NONE) || 'null';
    return key + ': ' + value + ',\n';
};

javascript.javascriptGenerator.forBlock['p_logic_operation'] = function(block, generator) {
    var op = block.getFieldValue('OP');
    var operator = (op == 'AND') ? '&&' : '||';
    var order = (operator == '&&') ? javascript.Order.LOGICAL_AND : javascript.Order.LOGICAL_OR;
    var argument0 = generator.valueToCode(block, 'A', order);
    var argument1 = generator.valueToCode(block, 'B', order);
    var code = (argument0 || 'false') + ' ' + operator + ' ' + (argument1 || 'false');
    return [code, order];
};

javascript.javascriptGenerator.forBlock['p_logic_negate'] = function(block, generator) {
    var order = javascript.Order.LOGICAL_NOT;
    var argument0 = generator.valueToCode(block, 'BOOL', order) || 'true';
    return ['!' + argument0, order];
};

javascript.javascriptGenerator.forBlock['p_if_mozi_select'] = function(block, generator) {
    var condition = generator.valueToCode(block, 'IF', javascript.Order.NONE) || 'false';
    var valA = generator.valueToCode(block, 'A', javascript.Order.NONE) || '""';
    var valB = generator.valueToCode(block, 'B', javascript.Order.NONE) || '""';
    // 三項演算子を使ってHTMLテキストに結合する
    text += '" + (' + condition + ' ? ' + valA + ' : ' + valB + ') + "';
    return '';
};

// 比較演算子（=, >, <）のコード生成
javascript.javascriptGenerator.forBlock['p_logic_compare'] = function(block, generator) {
    var operator = block.getFieldValue('OP');    
    var argument0 = generator.valueToCode(block, 'A', javascript.Order.NONE) || '0';
    var argument1 = generator.valueToCode(block, 'B', javascript.Order.NONE) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['p_control_if'] = function(block, generator) {
    var condition = generator.valueToCode(block, 'IF', javascript.Order.NONE) || 'false';
    // Bbtnと同じ仕組み：今のjstextを保存して中身だけを抽出する
    var currentJS = jstext;
    jstext = ""; 
    generator.statementToCode(block, 'DO');
    var branch = jstext;
    // 保存しておいたものと合体させる
    jstext = currentJS + 'if (' + condition + ') {\n' + branch + '}\n';
    return '';
};

javascript.javascriptGenerator.forBlock['p_control_if_else'] = function(block, generator) {
    var condition = generator.valueToCode(block, 'IF', javascript.Order.NONE) || 'false';
    var currentJS = jstext;
    
    // DO部分
    jstext = "";
    generator.statementToCode(block, 'DO');
    var branchDo = jstext;
    
    // ELSE部分
    jstext = "";
    generator.statementToCode(block, 'ELSE');
    var branchElse = jstext;
    
    jstext = currentJS + 'if (' + condition + ') {\n' + branchDo + '} else {\n' + branchElse + '}\n';
    return '';
};

javascript.javascriptGenerator.forBlock['p_control_repeat'] = function(block, generator) {
    var times = generator.valueToCode(block, 'TIMES', javascript.Order.NONE) || '0';
    var currentJS = jstext;
    jstext = "";
    generator.statementToCode(block, 'DO');
    var branch = jstext;
    jstext = currentJS + 'for (let i = 0; i < ' + times + '; i++) {\n' + branch + '}\n';
    return '';
};

javascript.javascriptGenerator.forBlock['p_if_mozi_reporter'] = function(block, generator) {
    var condition = generator.valueToCode(block, 'IF', javascript.Order.NONE) || 'false';
    var valueA = generator.valueToCode(block, 'A', javascript.Order.NONE) || '""';
    var valueB = generator.valueToCode(block, 'B', javascript.Order.NONE) || '""';
    // 文字として連結できる形式で返す
    var code = '(' + condition + ' ? ' + valueA + ' : ' + valueB + ')';
    return [code, javascript.Order.NONE];
};

// ============================================

Blockly.Themes.dark = Blockly.Theme.defineTheme('dark', {
    'base': Blockly.Themes.Classic,
    'componentStyles': {
        'toolboxBackgroundColour': '#ddd',
        'toolboxForegroundColour': '#fff',
        'flyoutBackgroundColour': '#8aa',
        'flyoutForegroundColour': '#ccc',
        'insertionMarkerColour': '#fff',
        'scrollbarOpacity': 0.7,
    }
});

var workspace = Blockly.inject(`blocklyDiv`, {
    toolbox: document.getElementById(`toolbox`),
    theme: Blockly.Themes.dark,
    renderer: 'SCL_renderer',
    sounds : false, 
    media: './media/',
    move: {
        wheel: true,
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true
    },
    grid: {
        spacing: 23,
        length: 3,
        colour: '#ccc',
    },
    trashcan: true,
    scrollbars: true,
    plugins : { 
        blockDragger : ScrollBlockDragger, 
        metricsManager : ScrollMetricsManager,
    }, 
});

Blockly.ContextMenuRegistry.registry.unregister('blockCollapseExpand');
Blockly.ContextMenuRegistry.registry.unregister('blockInline');
Blockly.ContextMenuRegistry.registry.unregister('blockDisable');
Blockly.ContextMenuRegistry.registry.unregister('blockComment');

Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),workspace);

// ==========================================
// ★ 完全版：名前連動システム（歯車で名前が変わったらクローンも更新）
// ==========================================
workspace.addChangeListener(function(e) {
    // もしイベントが「ブロックの変更（BLOCK_CHANGE）」だったら
    if (e.type === Blockly.Events.BLOCK_CHANGE) {
        
        // 変更されたブロックを取得
        const changedBlock = workspace.getBlockById(e.blockId);
        if (!changedBlock) return;

        // 1. 【本体が更新された場合】関数ブロック（KS）の歯車が閉じられて、引数が再生成された時
        if (changedBlock.type === 'KS' && changedBlock.arguments_) {
            
            // ワークスペース上の「すべての引数クローン」を探す
            const allBlocks = workspace.getAllBlocks(false);
            for (let i = 0; i < allBlocks.length; i++) {
                let clone = allBlocks[i];
                
                // もしそれがクローン（KS_ARG_REPORTER で、親情報 data がある）なら
                if (clone.type === 'KS_ARG_REPORTER' && clone.data) {
                    try {
                        let cloneData = JSON.parse(clone.data);
                        
                        // 「自分を生み出した関数ブロック」が、今回変更されたブロックだったら
                        if (cloneData.parentId === changedBlock.id) {
                            
                            // 自分のいた穴（例：ARG0）が、新しい引数リストの何番目か調べる
                            let argIndex = parseInt(cloneData.inputName.replace('ARG', ''));
                            
                            // もしその番号の引数がまだ存在していれば、新しい名前に更新する！
                            if (argIndex >= 0 && argIndex < changedBlock.arguments_.length) {
                                let newName = changedBlock.arguments_[argIndex];
                                
                                // 名前が変わっていたら更新し、記憶データも書き換える
                                if (clone.getFieldValue('ARG_NAME') !== newName) {
                                    clone.setFieldValue(newName, 'ARG_NAME');
                                    cloneData.originalName = newName;
                                    clone.data = JSON.stringify(cloneData);
                                }
                            }
                        }
                    } catch (err) {
                        // dataがJSONじゃなかった場合は無視
                    }
                }
            }
        }
    }
});








var kekka = document.getElementById("kekka");
var run = document.getElementById('run');
var lastGeneratedHtml = "";

run.addEventListener("click", updateBlocks);

function updateBlocks() {
    text = "";
    csstext = "";
    jstext = "";
    cssd = "";
    cssk = "";
    YOMI = "";
    title = "";
    const code = Blockly.JavaScript.workspaceToCode(workspace);

    // ▼ ダウンロード用の本番HTML
    lastGeneratedHtml = '<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="utf-8"/>' + YOMI + '\n    <style>\n' + csstext + '\n    </style>\n    <title>' + title + '</title>\n</head>\n<body id="kekka">' + text + '\n    <script>\n' + jstext + '\n    </script>\n</body>';
    
    // ▼ エディタのプレビュー用（右下に追加した画像を見れるようにする魔法の処理）
    var previewText = text;

    // フォルダの中身を奥までたどってパスを作る関数
    function replaceFilePaths(ulElement, currentPath) {
        var items = ulElement.children;
        for (var i = 0; i < items.length; i++) {
            var li = items[i];
            var name = li.querySelector('.itemName').textContent;
            
            if (li.dataset.type === 'folder') {
                // フォルダなら、パスを繋げてさらに中身を探す（例: img/）
                var nextPath = currentPath ? currentPath + "/" + name : name;
                var childUl = li.querySelector('ul');
                if (childUl) {
                    replaceFilePaths(childUl, nextPath);
                }
            } else if (li.dataset.type === 'file' && li.fileData) {
                // ファイルなら、最終的なパスを作って画像をすり替える（例: img/test.png）
                var filePath = currentPath ? currentPath + "/" + name : name;
                var targetPath = "./media/" + filePath; // HTMLに書かれているパス
                
                // ブロックで作ったテキストの中にそのパスがあったら、仮の画像URLにすり替える
                if (previewText.indexOf(targetPath) !== -1) {
                    var blobUrl = URL.createObjectURL(li.fileData);
                    previewText = previewText.split(targetPath).join(blobUrl);
                }
            }
        }
    }

    // fileList（一番外側）から画像探しをスタート！
    var fileList = document.getElementById('fileList');
    if (fileList) {
        replaceFilePaths(fileList, "");
    }
	alert(lastGeneratedHtml)
    kekka.innerHTML = YOMI + previewText + '<style>\n' + csstext + '\n    </style>\n<script>\n' + jstext + '\n    </script>';
}

// ==========================================
// ファイル・フォルダ管理 ＆ ZIPダウンロード機能（スマホ対応・デザイン統一版）
// ==========================================
var dropArea = document.getElementById('dropArea');
var fileInput = document.getElementById('fileInput');
var fileList = document.getElementById('fileList');
var addFolderBtn = document.getElementById('addFolderBtn');

// リストの一番下に「外に出すためのスキマ」を広めに作る
fileList.style.paddingBottom = '60px';

var draggingItem = null;

// ① ファイル選択エリアの処理
dropArea.addEventListener('click', () => fileInput.click());
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
});
dropArea.addEventListener('dragleave', () => dropArea.style.backgroundColor = 'transparent');
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = 'transparent';
    addFilesToList(e.dataTransfer.files, fileList);
});
fileInput.addEventListener('change', (e) => {
    addFilesToList(e.target.files, fileList);
    fileInput.value = '';
});

// 一番外側のスキマにドロップしたら一番外側に出す処理
fileList.addEventListener('dragover', function(e) {
    e.preventDefault();
});
fileList.addEventListener('drop', function(e) {
    e.preventDefault();
    if (draggingItem && e.target === fileList) {
        fileList.appendChild(draggingItem);
    }
});

// ② フォルダ追加ボタンの処理
if(addFolderBtn) {
    addFolderBtn.addEventListener('click', function() {
        var folderName = prompt("フォルダ名を入力してください", "新しいフォルダ");
        if (folderName && folderName.trim() !== "") {
            var li = createListItem(folderName, 'folder', null);
            fileList.appendChild(li);
        }
    });
}

// ③ リストにファイルを追加
function addFilesToList(files, targetUl) {
    for (var i = 0; i < files.length; i++) {
        var li = createListItem(files[i].name, 'file', files[i]);
        targetUl.appendChild(li);
    }
}

// ④ リストの行（ファイル・フォルダ）を作る処理
function createListItem(name, type, fileData) {
    var li = document.createElement('li');
    li.dataset.type = type;
    li.fileData = fileData;
    
    // 見た目の設定
    li.style.boxSizing = 'border-box';
    li.style.width = '100%';
    li.style.marginBottom = '5px';
    li.style.backgroundColor = 'white';
    li.style.border = '1px solid gray';
    li.style.borderRadius = '3px';
    li.style.color = 'black';
    li.style.fontSize = '14px';
    li.style.listStyle = 'none';

    // PC用のドラッグ＆ドロップ設定
    li.setAttribute('draggable', 'true');
    li.addEventListener('dragstart', function(e) {
        draggingItem = li;
        e.stopPropagation();
    });

    // ドロップの反応エリア（ヘッダー部分）
    var header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '5px 8px';

    header.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        header.style.backgroundColor = '#eef';
    });
    header.addEventListener('dragleave', function(e) {
        header.style.backgroundColor = 'transparent';
        e.stopPropagation();
    });
    header.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        header.style.backgroundColor = 'transparent';
        if (draggingItem === li) return; 

        if (li.dataset.type === 'folder') {
            li.querySelector('ul').appendChild(draggingItem);
        } else {
            li.parentNode.insertBefore(draggingItem, li.nextSibling);
        }
    });

    // ==============================================
    // 【改善】名前が長い時は「...」で省略させる設定
    // ==============================================
    var leftDiv = document.createElement('div');
    leftDiv.style.display = 'flex';
    leftDiv.style.alignItems = 'center';
    leftDiv.style.flex = '1';       // 空きスペースを埋める
    leftDiv.style.minWidth = '0';   // これがないとはみ出る
    leftDiv.style.marginRight = '10px'; // 右のボタンとの隙間

    var iconSpan = document.createElement('span');
    iconSpan.textContent = type === 'folder' ? '📁 ' : '📄 ';
    iconSpan.style.flexShrink = '0'; // アイコンは縮ませない
    
    // 名前の変更機能
    var nameSpan = document.createElement('span');
    nameSpan.className = 'itemName';
    nameSpan.textContent = name;
    nameSpan.style.cursor = 'pointer';
    nameSpan.title = 'ダブルクリックで名前を変更';
    // はみ出た分を「...」にする魔法のCSS
    nameSpan.style.overflow = 'hidden';
    nameSpan.style.textOverflow = 'ellipsis';
    nameSpan.style.whiteSpace = 'nowrap';

    nameSpan.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        var newName = prompt("名前を変更", nameSpan.textContent);
        if (newName && newName.trim() !== "") {
            nameSpan.textContent = newName.trim();
        }
    });

    leftDiv.appendChild(iconSpan);
    leftDiv.appendChild(nameSpan);


    // ==============================================
    // 【改善】操作ボタンの見た目を統一
    // ==============================================
    var rightDiv = document.createElement('div');
    rightDiv.style.display = 'flex';
    rightDiv.style.alignItems = 'center';
    rightDiv.style.flexShrink = '0'; // ボタン群は縮ませない

    // 統一デザインのボタンを作る関数
    function createNavBtn(text, title, onClick) {
        var btn = document.createElement('button');
        btn.textContent = text;
        btn.title = title;
        btn.style.cursor = 'pointer';
        // ご要望のデザイン（白背景・黒枠・黒文字・角丸）
        btn.style.backgroundColor = '#ffffff';
        btn.style.border = '1px solid #000000';
        btn.style.color = '#000000';
        btn.style.borderRadius = '3px';
        btn.style.marginRight = '4px';
        btn.style.padding = '3px 6px';
        btn.style.fontSize = '12px';
        
        btn.onclick = function(e) {
            e.stopPropagation();
            onClick();
        };
        return btn;
    }

    // 各種ボタンの作成
    var outBtn = createNavBtn('◀', 'いまのフォルダの外に出す', function() {
        var parentUl = li.parentNode;
        if (parentUl && parentUl.id !== 'fileList') {
            var parentFolder = parentUl.parentNode;
            parentFolder.parentNode.insertBefore(li, parentFolder.nextSibling);
        }
    });
    var upBtn = createNavBtn('▲', '一つ上に移動', function() {
        var prev = li.previousElementSibling;
        if (prev) li.parentNode.insertBefore(li, prev);
    });
    var downBtn = createNavBtn('▼', '一つ下に移動', function() {
        var next = li.nextElementSibling;
        if (next) li.parentNode.insertBefore(next, li);
    });
    var inBtn = createNavBtn('▶', 'すぐ上のフォルダの中に入れる', function() {
        var prev = li.previousElementSibling;
        if (prev && prev.dataset.type === 'folder') {
            prev.querySelector('ul').appendChild(li);
        } else {
            alert('すぐ上にフォルダがある時だけ、中に入れることができます！');
        }
    });
    var delBtn = createNavBtn('✖', '削除', function() {
        li.remove();
    });

    // 一番右の削除ボタンの右余白を消す
    delBtn.style.marginRight = '0';

    // ボタンを並べる
    rightDiv.appendChild(outBtn);
    rightDiv.appendChild(upBtn);
    rightDiv.appendChild(downBtn);
    rightDiv.appendChild(inBtn);
    rightDiv.appendChild(delBtn);

    header.appendChild(leftDiv);
    header.appendChild(rightDiv);
    li.appendChild(header);

    // フォルダの場合は中身を入れるための透明な箱(ul)をつける
    if (type === 'folder') {
        var childUl = document.createElement('ul');
        childUl.style.paddingLeft = '20px';
        childUl.style.marginTop = '0px';
        childUl.style.minHeight = '10px'; 
        li.appendChild(childUl);
    }
    return li;
}

// ⑤ フォルダの中身を再帰的にZIPにまとめる関数
function buildZipTree(zipFolder, ulElement) {
    var items = ulElement.children;
    for (var i = 0; i < items.length; i++) {
        var li = items[i];
        var name = li.querySelector('.itemName').textContent;
        if (li.dataset.type === 'folder') {
            var newFolder = zipFolder.folder(name);
            buildZipTree(newFolder, li.querySelector('ul')); 
        } else {
            zipFolder.file(name, li.fileData); 
        }
    }
}

// ⑥ ダウンロードボタンを押した時の処理（ZIP化して保存）
var downloadBtn = document.getElementById('download');
if (downloadBtn) {
    downloadBtn.addEventListener("click", function() {
        if (typeof JSZip === 'undefined') {
            alert("JSZipが読み込まれていません。<head>を確認してください。");
            return;
        }

        updateBlocks();
        
        var titleInput = document.getElementById("title").value.trim();
        if (!titleInput) titleInput = "index";
        titleInput = titleInput.replace(/\.html?$/i, ""); 

        var zip = new JSZip();
        zip.file(titleInput + ".html", lastGeneratedHtml);

        var mediaFolder = zip.folder("media");
        buildZipTree(mediaFolder, document.getElementById('fileList'));

        zip.generateAsync({type:"blob"}).then(function(content) {
            var url = URL.createObjectURL(content);
            var a = document.createElement("a");
            a.href = url;
            a.download = titleInput + "_site.zip"; 
            a.click();
            URL.revokeObjectURL(url);
        });
    });
}

// ==========================================
// プロジェクト全体の保存（セーブ）と読み込み（ロード）機能 (.scl1)
// ==========================================
var saveBtn = document.getElementById('saveBlocksBtn');
var loadBtn = document.getElementById('loadBlocksBtn');
var loadInput = document.getElementById('loadBlocksInput');

// ① 【保存機能】ブロックと右下のファイルをZIPにまとめて「.scl1」で保存する
if (saveBtn) {
    saveBtn.addEventListener('click', function() {
        if (typeof JSZip === 'undefined') {
            alert("JSZipが読み込まれていません。<head>を確認してください。");
            return;
        }

        var zip = new JSZip();

        // 1. ブロックの形をデータにして「blocks.json」としてZIPに入れる
        var state = Blockly.serialization.workspaces.save(workspace);
        var jsonText = JSON.stringify(state, null, 2);
        zip.file("blocks.json", jsonText);

        // 2. 右下のファイルやフォルダを「media」フォルダとしてZIPに入れる
        var mediaFolder = zip.folder("media");
        buildZipTree(mediaFolder, document.getElementById('fileList'));

        // タイトルの名前を使ってファイル名を決める
        var titleInput = document.getElementById("title").value.trim() || "my_project";
        titleInput = titleInput.replace(/\.html?$/i, "").replace(/\.scl1$/i, "");

        // 3. 全てを1つに圧縮して「.scl1」という名前でダウンロードさせる
        zip.generateAsync({type:"blob"}).then(function(content) {
            var url = URL.createObjectURL(content);
            var a = document.createElement("a");
            a.href = url;
            a.download = titleInput + ".scl1"; // ★専用の拡張子
            a.click();
            URL.revokeObjectURL(url);
        });
    });
}

// ② 【読み込み機能】保存した「.scl1」を選んで、ブロックとファイルを完全復元する
if (loadBtn && loadInput) {
    loadBtn.addEventListener('click', function() {
        loadInput.click();
    });
    
    loadInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (!file) return;

        if (typeof JSZip === 'undefined') {
            alert("JSZipが読み込まれていません。");
            return;
        }

        var zip = new JSZip();
        
        // ZIP(.scl1)の中身を読み解く
        zip.loadAsync(file).then(async function(loadedZip) {
            try {
                // ================================
                // 1. ブロックの復元（フォルダごと圧縮されていても探し出す！）
                // ================================
                var blocksJsonFile = null;
                var rootPrefix = ""; // フォルダごと圧縮された場合のフォルダ名（例: "my_project/"）

                // ZIPの中を全部チェックして「blocks.json」を探す
                for (var path in loadedZip.files) {
                    if (path.endsWith("blocks.json")) {
                        blocksJsonFile = loadedZip.files[path];
                        // フォルダごと圧縮されていた場合、そのフォルダ名を記録する
                        rootPrefix = path.substring(0, path.length - "blocks.json".length);
                        break;
                    }
                }

                if (blocksJsonFile) {
                    var jsonText = await blocksJsonFile.async("string");
                    var state = JSON.parse(jsonText);
                    workspace.clear();
                    Blockly.serialization.workspaces.load(state, workspace);
					workspace.setTheme(Blockly.Themes.dark);
                } else {
                    alert("プロジェクトの中にブロックのデータ (blocks.json) が見つかりませんでした。");
                    return;
                }

                // ================================
                // 2. 右下のファイル・フォルダの復元
                // ================================
                var fileListUl = document.getElementById('fileList');
                fileListUl.innerHTML = ''; // 一旦今のリストを空にする

                var root = { type: 'folder', children: {} };
                var expectedMediaPrefix = rootPrefix + "media/"; // 探し出すmediaフォルダのパス

                // ZIP内の「media」フォルダの中身を調べて、元の階層（ツリー）を組み立てる
                for (var relativePath in loadedZip.files) {
                    // 記録したフォルダパスの中にある media/ の中身だけをターゲットにする
                    if (!relativePath.startsWith(expectedMediaPrefix)) continue;
                    if (relativePath === expectedMediaPrefix) continue; // mediaフォルダ自身は無視

                    var pathObj = loadedZip.files[relativePath];
                    var pathParts = relativePath.replace(expectedMediaPrefix, "").split('/').filter(p => p !== "");
                    
                    var currentDir = root;
                    for (var i = 0; i < pathParts.length; i++) {
                        var part = pathParts[i];
                        var isLast = (i === pathParts.length - 1);
                        
                        if (!currentDir.children[part]) {
                            currentDir.children[part] = {
                                type: (isLast && !pathObj.dir) ? 'file' : 'folder',
                                children: {},
                                fileObj: pathObj
                            };
                        }
                        currentDir = currentDir.children[part];
                    }
                }

                // 組み立てた階層データをもとに、画面上のHTMLリスト（右下のエリア）を作る
                async function buildDOM(node, targetUl) {
                    for (var name in node.children) {
                        var childNode = node.children[name];
                        if (childNode.type === 'folder') {
                            var li = createListItem(name, 'folder', null);
                            targetUl.appendChild(li);
                            var childUl = li.querySelector('ul');
                            await buildDOM(childNode, childUl); // フォルダの中身も作る
                        } else {
                            // ファイルのデータをBlobとして取り出し、Fileオブジェクトのふりをさせる
                            var blob = await childNode.fileObj.async("blob");
                            var f = new File([blob], name, { type: blob.type });
                            var li = createListItem(name, 'file', f);
                            targetUl.appendChild(li);
                        }
                    }
                }

                await buildDOM(root, fileListUl); // 復元実行！
				
                workspace.getAllBlocks(false).forEach(block => {
                    block.initSvg();
                    block.render();
                });
                
                alert("プロジェクト（.scl1）の読み込みが完了しました！");
                
                // 読み込んだ画像を使ってプレビューを即座に更新する
                updateBlocks();

            } catch (err) {
                alert("読み込み中にエラーが発生しました。");
                console.error(err);
            }
        }).catch(function(err) {
            alert("ファイルが正しい形式(.scl1)ではありません。または壊れています。");
            console.error(err);
        });
        
        loadInput.value = ''; // 連続で同じファイルを読み込めるようにリセット
    });
}

workspace.addChangeListener(Blockly.Events.disableOrphans);
