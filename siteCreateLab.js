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

Blockly.defineBlocksWithJsonArray([
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
        "tooltip": "",
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
        "colour": "#ff0d4b",
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
        "colour": "#ff0d4b",
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
        "colour": "#ff0d4b",
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
        "colour": "#ff0d4b",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "PDS",
        "message0": "要素内側の %1 の余白を %2 にする",
        "args0": [
          { "type": "input_value", "name": "doko", "check": "doko" },
          { "type": "input_value", "name": "naga", "check": "naga" }
        ],
        "inputsInline": true,
        "previousStatement": "dou",
        "nextStatement": "dou",
        "colour": "#ff0d4b",
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
        "colour": "#ff0d4b",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "TMD",
        "message0": "透明",
        "output": "color",
        "colour": '#ff0d4b',
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
        "colour": '#ff0d4b',
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
        "colour": '#ff0d4b',
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
        "colour": '#ff0d4b',
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
        "colour": '#ff0d4b',
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
        "type": "KS",
        "message0": "関数 %1 を %2 %3",
        "args0": [
          { "type": "field_input", "name": "mozi" },
          { "type": "input_dummy" },
          { "type": "input_statement", "name": "js", "check": "js" }
        ],
        "inputsInline": true,
        "previousStatement": "js",
        "nextStatement": "js",
        "colour": "#8a88bb",
        "tooltip": "",
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
            { "type": "field_dropdown", "name": "OP", "options": [["=", "EQ"], [">", "GT"], ["<", "LT"]] },
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
    var value_kado = generator.valueToCode(block, 'doko', javascript.Order.NONE) || '';
    var value_naga = generator.valueToCode(block, 'naga', javascript.Order.NONE) || '';
    cssd = cssd + "\n    padding" + value_kado + ":" + value_naga + ";";
    return "\n";
};

// 【修正】 value_kazu を削除
javascript.javascriptGenerator.forBlock['KMS'] = function(block, generator) {
    var value_kado = generator.valueToCode(block, 'doko', javascript.Order.NONE) || '';
    var value_naga = generator.valueToCode(block, 'naga', javascript.Order.NONE) || '';
    cssd = cssd + "\n    border" + value_kado + "-radius:" + value_naga + ";";
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

// 【修正】 field_input に対応するように getFieldValue に変更
javascript.javascriptGenerator.forBlock['KS'] = function(block, generator) {
    var nani = block.getFieldValue('mozi') || '';
    var js = generator.statementToCode(block, 'js');
    jstext = jstext + "function " + nani + "() {\n" + js + "}\n";
    return '\n';
};

// 【修正】 field_input に対応するように getFieldValue に変更
javascript.javascriptGenerator.forBlock['KA'] = function(block, generator) {
    var txt = block.getFieldValue('mozi') || '';
    return [txt + "()", javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['MKS'] = function(block, generator) {
    var js = generator.statementToCode(block, 'js');
    return ["function() {\n" + js + "}", javascript.Order.ATOMIC];
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
    renderer: `zelos`,
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

    lastGeneratedHtml = '<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="utf-8"/>' + YOMI + '\n    <style>\n' + csstext + '\n    </style>\n    <title>' + title + '</title>\n</head>\n<body id="kekka">' + text + '\n    <script>\n' + jstext + '\n    </script>\n</body>';
    kekka.innerHTML = YOMI + text + '<style>\n' + csstext + '\n    </style>\n<script>\n' + jstext + '\n    </script>';
    window.alert(lastGeneratedHtml);
}

var downloadBtn = document.getElementById('download');
if (downloadBtn) {
    downloadBtn.addEventListener("click", function() {
        updateBlocks();
        var blob = new Blob([lastGeneratedHtml], { type: "text/html" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        var title = document.getElementById("title").value;
        a.href = url;
        a.download = title + ".html";
        a.click();
        URL.revokeObjectURL(url);
    });
}


workspace.addChangeListener(Blockly.Events.disableOrphans);





// ==========================================
// ファイル追加（ドラッグ＆ドロップ）機能
// ==========================================
var dropArea = document.getElementById('dropArea');
var fileInput = document.getElementById('fileInput');
var fileList = document.getElementById('fileList');

// ① エリアをクリックしたらファイル選択の画面を開く
dropArea.addEventListener('click', function() {
    fileInput.click();
});

// ② ファイルがエリアに乗った時の見た目（色が少し変わる）
dropArea.addEventListener('dragover', function(e) {
    e.preventDefault(); // これがないとブラウザでファイルが開いちゃう
    dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    dropArea.style.borderColor = '#fff';
});

// ③ ファイルがエリアから出た時の見た目（元に戻す）
dropArea.addEventListener('dragleave', function() {
    dropArea.style.backgroundColor = 'transparent';
    dropArea.style.borderColor = '#aaa';
});

// ④ ファイルがドロップ（離された）された時の処理
dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    dropArea.style.backgroundColor = 'transparent';
    dropArea.style.borderColor = '#aaa';
    
    var files = e.dataTransfer.files;
    addFilesToList(files);
});

// ⑤ クリックでファイルを選んだ時の処理
fileInput.addEventListener('change', function(e) {
    var files = e.target.files;
    addFilesToList(files);
    fileInput.value = ''; // 同じファイルを連続で選べるようにリセット
});

// ⑥ ファイルを下のリストに追加して並べる関数
function addFilesToList(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // リストの行(li)を作る
        var li = document.createElement('li');
        li.style.padding = '5px 8px';
        li.style.marginBottom = '5px';
        li.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        li.style.borderRadius = '3px';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.color = '#fff'; // 文字色（背景が暗い場合）

        // ファイル名のテキスト
        var nameSpan = document.createElement('span');
        nameSpan.textContent = file.name;
        nameSpan.style.overflow = 'hidden';
        nameSpan.style.textOverflow = 'ellipsis';
        nameSpan.style.whiteSpace = 'nowrap';
        nameSpan.style.maxWidth = '80%';

        // 削除ボタンを作る
        var delBtn = document.createElement('button');
        delBtn.textContent = '✖';
        delBtn.style.cursor = 'pointer';
        delBtn.style.background = 'transparent';
        delBtn.style.border = 'none';
        delBtn.style.color = '#ff4d4d';
        
        // ✖ボタンを押したらそのファイルをリストから消す
        delBtn.onclick = function() {
            li.remove();
        };

        // 行の中に名前とボタンを入れる
        li.appendChild(nameSpan);
        li.appendChild(delBtn);

        // リスト(ul)に行を追加する
        fileList.appendChild(li);
    }
}
