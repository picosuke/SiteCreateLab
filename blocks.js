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
        "message0": "チケット %1",
        "output": "TICKET",
        "colour": "#ff6b5c",
        "args0": [
            { "type": "input_value", "name": "IF0", "check": "TICKET" }
		],
        "tooltip": "オリジナルレンダリング^-^",
        "helpUrl": ""
    },
	{
        "type": "FT2",
        "message0": "チケット2 %1",
		"output": "TICKET2",
        "colour": "#ff6b5c",
        "args0": [
            { "type": "input_value", "name": "IF0", "check": "TICKET2" }
		],
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
        "type": "NTW",
        "message0": "%1 で %2 を作り %3 にする",
        "previousStatement": "js",
        "nextStatement": "js",
        "args0": [
            {
              "type": "field_dropdown",
              "name": "name",
              "options": [
    			[ "定数", "const" ], 
    			[ "ローカル変数", "let" ], 
    			[ "グローバル変数", "var" ]
              ]
            },
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
        "message0": "関数 %1",
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
            { "type": "input_value", "name": "IF0", "check": "Boolean" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO0", "check": "js" }
        ],
        "inputsInline": true,
        "previousStatement": "js",
        "nextStatement": "js",
        "colour": "#124d99",
        "mutator": "scl_if_mutator"
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

Blockly.Blocks['KS_ARG_REPORTER'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabel(""), "ARG_NAME");
    this.setOutput(true, null);
    this.setColour('#ff6b5c'); 
  }
};
