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

const B_NAME = [
    "チケット %1",                                     // 0: FT
    "チケット2 %1",                                    // 1: FT2
    "フィールド大量 %1 %2 %3 %4 %5 %6",               // 2: F
    "設定 %1 %2",                                      // 3: HSE
    "出すもの %1 %2",                                  // 4: HDA
    "文字 %1",                                         // 5: M
    "サイトを作り始める",                              // 6: S
    "HTML %1 %2 CSS %3 %4 JavaScript %5 %6",         // 7: HCJ
    "HTML %1 %2",                                      // 8: c_html
    "CSS %1 %2",                                       // 9: c_css
    "JavaScript %1 %2",                                // 10: c_js
    "タイトルを %1 にする",                            // 11: T
    "JSを読み込む %1",                                 // 12: JY
    "CSSを読み込む %1",                                // 13: CY
    "%1",                                              // 14: MD
    "%1",                                              // 15: KD
    "%1",                                              // 16: CID
    "改行",                                            // 17: K
    "タイトル",                                        // 18: TD
    "%1 と %2",                                        // 19: GD
    "INPUT ボタン 詳細設定 %1 文字 %2",                // 20: Ibtn
    "BUTTON ボタン 詳細設定 %1 %2 %3",                 // 21: Bbtn
    "P  詳細設定 %1 %2",                               // 22: p
    "DIV  詳細設定 %1 %2",                             // 23: div
    "SPAN  詳細設定 %1 %2",                            // 24: span
    "Classを %1 にする",                               // 25: CD
    "Idを %1 にする",                                  // 26: ID
    "%1 & %2",                                         // 27: SGD
    "HTML コメント // %1",                             // 28: HC
    "CSS コメント // %1",                              // 29: CC
    "%1 を %2 %3",                                     // 30: CN
    "Class %1",                                        // 31: CNCD
    "Id %1",                                           // 32: CNID
    "要素 %1",                                         // 33: CNYD
    "ボディー",                                        // 34: CNB
    "%1 を %2 にする",                                 // 35: CIS
    "%1 を %2 にする",                                 // 36: WS
    "角の %1 を %2 で丸くする",                        // 37: KMS
    "要素内側を %1 にそろえる",                        // 38: DSS
    "%1 の %2 の余白を %3 にする",                     // 39: PDS
    "滑らかする。速さ  %1",                            // 40: NS
    "文字の太さを %1 にする",                          // 41: FW
    "フォントを %1 にする",                            // 42: FF
    "透明",                                            // 43: TMD
    "%1",                                              // 44: PDD
    "%1 %2",                                           // 45: ND
    "%1",                                              // 46: KMID
    "%1",                                              // 47: DSD
    "クリックされたとき",                              // 48: CKLD
    "重なったとき",                                    // 49: CHOD
    "%1 で %2",                                        // 50: KTD
    "パス %1 で画像を表示 詳細設定 %2",                // 51: img_block
    "JS コメント // %1",                               // 52: JC
    "%1",                                              // 53: JMD
    "%1",                                              // 54: JKD
    "文字 %1",                                         // 55: JMAD
    "数 %1",                                           // 56: JKAD
    "%1 を %2",                                        // 57: NNSD
    "配列 [ %1 %2 ]",                                  // 58: HAD[
    "JSON { %1 %2 }",                                  // 59: HAD{
    "%1 %2と",                                         // 60: HAD
    "%1 を %2 にする",                                 // 61: NW
    "%1 で %2 を作り %3 にする",                       // 62: NTW
    "変数 %1",                                         // 63: HD
    "関数 %1",                                         // 64: KB
    "関数 %1",                                         // 65: KA
    "引数の設定 %1 %2",                                // 66: ks_mutator_container
    "引数名 %1",                                       // 67: ks_mutator_arg
    "関数 %1",                                         // 68: KS
    "無名関数 %1 %2",                                  // 69: MKS
    "%1 %2 %3",                                        // 70: p_logic_compare
    "%1 %2 %3",                                        // 71: p_logic_operation
    "%1 ではない",                                     // 72: p_logic_negate
    "もし %1 なら %2 %3",                              // 73: p_control_if
    "%1 回繰り返す %2 %3",                             // 74: p_control_repeat
    "もし %1 なら %2 でなければ %3"                    // 75: p_if_mozi_reporter
];

// ブロック定義（配列 B_NAME を参照）

Blockly.defineBlocksWithJsonArray([
	{
        "type": "FT",
        "message0": B_NAME[0],
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
        "message0": B_NAME[1],
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
        "message0": B_NAME[2],
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
    {
        "type": "HSE",
        "message0": B_NAME[3],
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
        "message0": B_NAME[4],
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
        "message0": B_NAME[5],
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
        "message0": B_NAME[6],
        "colour": '#ffbf00',
        "style": { "hat": "cap" },
        "nextStatement": "Sai",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "HCJ",
        "message0": B_NAME[7],
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
        "message0": B_NAME[8],
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
        "message0": B_NAME[9],
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
        "message0": B_NAME[10],
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
        "message0": B_NAME[11],
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
        "message0": B_NAME[12],
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
        "message0": B_NAME[13],
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
        "message0": B_NAME[14],
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
        "message0": B_NAME[15],
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
        "message0": B_NAME[16],
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
        "message0": B_NAME[17],
        "previousStatement": "body",
        "nextStatement": "body",
        "colour": '#0170a7',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "TD",
        "message0": B_NAME[18],
        "output": "mozi",
        "colour": '#20a002',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "GD",
        "message0": B_NAME[19],
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
        "message0": B_NAME[20],
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
        "message0": B_NAME[21],
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
        "message0": B_NAME[22],
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
        "message0": B_NAME[23],
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
        "message0": B_NAME[24],
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
        "message0": B_NAME[25],
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
        "message0": B_NAME[26],
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
        "message0": B_NAME[27],
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
        "message0": B_NAME[28],
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
        "message0": B_NAME[29],
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
        "message0": B_NAME[30],
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
        "message0": B_NAME[31],
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
        "message0": B_NAME[32],
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
        "message0": B_NAME[33],
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
        "message0": B_NAME[34],
        "output": "id",
        "colour": '#298a8f',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CIS",
        "message0": B_NAME[35],
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
        "message0": B_NAME[36],
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
        "message0": B_NAME[37],
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
        "message0": B_NAME[38],
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
        "message0": B_NAME[39],
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
        "message0": B_NAME[40],
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
        "message0": B_NAME[41],
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
        "message0": B_NAME[42],
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
        "message0": B_NAME[43],
        "output": "color",
        "colour": '#ed5179',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "PDD",
        "message0": B_NAME[44],
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
        "message0": B_NAME[45],
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
        "message0": B_NAME[46],
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
        "message0": B_NAME[47],
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
        "message0": B_NAME[48],
        "output": "kaku",
        "colour": '#f289af',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "CHOD",
        "message0": B_NAME[49],
        "output": "kaku",
        "colour": '#f289af',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "KTD",
        "message0": B_NAME[50],
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
        "message0": B_NAME[51],
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
        "message0": B_NAME[52],
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
        "message0": B_NAME[53],
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
        "message0": B_NAME[54],
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
        "message0": B_NAME[55],
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
        "message0": B_NAME[56],
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
        "message0": B_NAME[57],
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
        "message0": B_NAME[58],
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
        "message0": B_NAME[59],
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
        "message0": B_NAME[60],
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
        "message0": B_NAME[61],
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
        "message0": B_NAME[62],
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
        "message0": B_NAME[63],
        "args0": [
            { "type": "input_value", "name": "HEN", "check": "text" }
        ],
        "output": [ "text", "jkazu", "HEN"],
        "colour": '#fe9f3d',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "KB",
        "message0": B_NAME[64],
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
        "message0": B_NAME[65],
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
        "message0": B_NAME[66],
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "STACK" }
        ],
        "colour": "#8a88bb"
    },
    {
        "type": "ks_mutator_arg",
        "message0": B_NAME[67],
        "args0": [
            { "type": "field_input", "name": "NAME", "text": "x" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#8a88bb"
    },
    {
        "type": "KS",
        "message0": B_NAME[68],
        "args0": [
          { "type": "field_input", "name": "mozi" }
        ],
        "mutator": "ks_mutator",
        "inputsInline": false,
        "previousStatement": "js",
        "nextStatement": "js",
        "colour": "#8a88bb",
        "tooltip": "歯車マークで引数を追加できます",
        "helpUrl": ""
    },
	
    {
        "type": "MKS",
        "message0": B_NAME[69],
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
        "message0": B_NAME[70],
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
        "message0": B_NAME[71],
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
        "message0": B_NAME[72],
        "args0": [
            { "type": "input_value", "name": "BOOL", "check": "Boolean" }
        ],
        "output": "Boolean",
        "colour": "#59c059"
    },
	{
        "type": "p_control_if",
        "message0": B_NAME[73],
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
        "message0": B_NAME[74],
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
        "message0": B_NAME[75],
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
    this.setOutput(true, "HEN");
    this.setColour('#ff6b5c'); 
  }
};
