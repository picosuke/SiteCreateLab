Blockly.BlockSvg.prototype.initSvg = function() {
  var origInitSvg = Blockly.BlockSvg.prototype.initSvg;
  return function() {
    origInitSvg.call(this);
    if (!this.previousConnection && this.type === "S") {
      this.hat = "cap";
    }
  };
}();

Blockly.Blocks['KS_ARG_REPORTER'] = {
  init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldLabel(""), "ARG_NAME");
    this.setOutput(true, "HEN");
    this.setColour('#ff6b5c'); 
  }
};

Blockly.Msg["SCL_FT"] = "チケット %1";
Blockly.Msg["SCL_FT2"] = "チケット2 %1";
Blockly.Msg["SCL_F"] = "フィールド大量 %1 %2 %3 %4 %5 %6";
Blockly.Msg["SCL_HSE"] = "設定 %1 %2";
Blockly.Msg["SCL_HDA"] = "出すもの %1 %2";
Blockly.Msg["SCL_M"] = "文字 %1";
Blockly.Msg["SCL_S"] = "サイトを作り始める";
Blockly.Msg["SCL_HCJ"] = "HTML %1 %2 CSS %3 %4 JavaScript %5 %6";
Blockly.Msg["SCL_C_HTML"] = "HTML %1 %2";
Blockly.Msg["SCL_C_CSS"] = "CSS %1 %2"; 
Blockly.Msg["SCL_C_JS"] = "JavaScript %1 %2";
Blockly.Msg["SCL_T"] = "タイトルを %1 にする";
Blockly.Msg["SCL_JY"] = "JSを読み込む %1";
Blockly.Msg["SCL_CY"] = "CSSを読み込む %1";
Blockly.Msg["SCL_MD"] = "%1";
Blockly.Msg["SCL_KD"] = "%1";
Blockly.Msg["SCL_CID"] = "%1";
Blockly.Msg["SCL_K"] = "改行";
Blockly.Msg["SCL_TD"] = "タイトル";
Blockly.Msg["SCL_GD"] = "%1 と %2";
Blockly.Msg["SCL_IBTN"] = "INPUT ボタン 詳細設定 %1 文字 %2";
Blockly.Msg["SCL_BBTN"] = "BUTTON ボタン 詳細設定 %1 %2 %3";
Blockly.Msg["SCL_P"] = "P  詳細設定 %1 %2";
Blockly.Msg["SCL_DIV"] = "DIV  詳細設定 %1 %2";
Blockly.Msg["SCL_SPAN"] = "SPAN  詳細設定 %1 %2";
Blockly.Msg["SCL_CD"] = "Classを %1 にする";
Blockly.Msg["SCL_ID"] = "Idを %1 にする";
Blockly.Msg["SCL_SGD"] = "%1 & %2";
Blockly.Msg["SCL_HC"] = "HTML コメント // %1";
Blockly.Msg["SCL_CC"] = "CSS コメント // %1";
Blockly.Msg["SCL_CN"] = "%1 を %2 %3";
Blockly.Msg["SCL_CNCD"] = "Class %1";
Blockly.Msg["SCL_CNID"] = "Id %1";
Blockly.Msg["SCL_CNYD"] = "要素 %1";
Blockly.Msg["SCL_CNB"] = "ボディー";
Blockly.Msg["SCL_CIS"] = "%1 を %2 にする";
Blockly.Msg["SCL_WS"] = "%1 を %2 にする";
Blockly.Msg["SCL_KMS"] = "角の %1 を %2 で丸くする";
Blockly.Msg["SCL_DSS"] = "要素内側を %1 にそろえる";
Blockly.Msg["SCL_PDS"] = "%1 の %2 の余白を %3 にする";
Blockly.Msg["SCL_NS"] = "滑らかする。速さ  %1";
Blockly.Msg["SCL_FW"] = "文字の太さを %1 にする";
Blockly.Msg["SCL_FF"] = "フォントを %1 にする";
Blockly.Msg["SCL_TMD"] = "透明";
Blockly.Msg["SCL_PDD"] = "%1";
Blockly.Msg["SCL_ND"] = "%1 %2";
Blockly.Msg["SCL_KMID"] = "%1";
Blockly.Msg["SCL_DSD"] = "%1";
Blockly.Msg["SCL_CKLD"] = "クリックされたとき";
Blockly.Msg["SCL_CHOD"] = "重なったとき";
Blockly.Msg["SCL_KTD"] = "%1 で %2";
Blockly.Msg["SCL_IMG_BLOCK"] = "パス %1 で画像を表示 詳細設定 %2";
Blockly.Msg["SCL_JC"] = "JS コメント // %1";
Blockly.Msg["SCL_JMD"] = "%1";
Blockly.Msg["SCL_JKD"] = "%1";
Blockly.Msg["SCL_JMAD"] = "文字 %1";
Blockly.Msg["SCL_JKAD"] = "数 %1";
Blockly.Msg["SCL_NNSD"] = "%1 を %2";
Blockly.Msg["SCL_HAD_A"] = "配列 [ %1 %2 ]"; 
Blockly.Msg["SCL_HAD_O"] = "JSON { %1 %2 }";  
Blockly.Msg["SCL_HAD"] = "%1 %2と";
Blockly.Msg["SCL_NW"] = "%1 を %2 にする";
Blockly.Msg["SCL_NTW"] = "%1 で %2 を作り %3 にする";
Blockly.Msg["SCL_HD"] = "変数 %1";
Blockly.Msg["SCL_KB"] = "関数 %1";
Blockly.Msg["SCL_KA"] = "関数 %1";
Blockly.Msg["SCL_KS_MUTATOR_CONTAINER"] = "引数の設定 %1 %2";
Blockly.Msg["SCL_KS_MUTATOR_ARG"] = "引数名 %1";
Blockly.Msg["SCL_KS"] = "関数 %1";
Blockly.Msg["SCL_MKS"] = "無名関数 %1 %2";
Blockly.Msg["SCL_P_LOGIC_COMPARE"] = "%1 %2 %3";
Blockly.Msg["SCL_P_LOGIC_OPERATION"] = "%1 %2 %3";
Blockly.Msg["SCL_P_LOGIC_NEGATE"] = "%1 ではない";
Blockly.Msg["SCL_P_CONTROL_IF"] = "もし %1 なら %2 %3";
Blockly.Msg["SCL_P_CONTROL_REPEAT"] = "%1 回繰り返す %2 %3";
Blockly.Msg["SCL_P_IF_MOZI_REPORTER"] = "もし %1 なら %2 でなければ %3";

const sclBlockDefinitions = [
{
	"type": "FT",
	"message0": "%{BKY_SCL_FT}",
	"output": "TICKET",
	"colour": "#ff6b5c",
	"args0": [
	{
		"type": "input_value",
		"name": "IF0",
		"check": "TICKET"
	}],
	"tooltip": "オリジナルレンダリング^-^",
	"helpUrl": ""
},
{
	"type": "FT2",
	"message0": "%{BKY_SCL_FT2}",
	"output": "TICKET2",
	"colour": "#ff6b5c",
	"args0": [
	{
		"type": "input_value",
		"name": "IF0",
		"check": "TICKET2"
	}],
	"tooltip": "オリジナルレンダリング^-^",
	"helpUrl": ""
},
{
	"type": "F",
	"message0": "%{BKY_SCL_F}",
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
		"value": 50
	},
	{
		"type": "input_value",
		"name": "color"
	},
	{
		"type": 'field_grid_dropdown',
		"name": 'FIELDNAME',
		"options": [
			['1', '1'],
			['2', '2'],
			['3', '3'],
			['4', '4'],
			['5', '5'],
			['6', '6'],
			['7', '7'],
			['8', '8'],
			['9', '9'],
			['0', '0']
		]
	},
	{
		"type": 'field_slider',
		"name": 'FIELDNAME',
		"value": 50,
		"min": 0,
		"max": 100,
		"precision": 1
	}],
	"tooltip": "こんなにたくさんのフィールド",
	"helpUrl": ""
},
{
	"type": "HSE",
	"message0": "%{BKY_SCL_HSE}",
	"colour": '#ff9800',
	"previousStatement": "html",
	"nextStatement": "html",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "head",
		"check": "head"
	}]
},
{
	"type": "HDA",
	"message0": "%{BKY_SCL_HDA}",
	"colour": '#ff9800',
	"previousStatement": "html",
	"nextStatement": "html",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "body",
		"check": "body"
	}]
},
{
	"type": "M",
	"message0": "%{BKY_SCL_M}",
	"previousStatement": "body",
	"nextStatement": "body",
	"args0": [
	{
		"type": "input_value",
		"name": "MOZI",
		"check": ["mozi", "kazu"]
	}],
	"colour": '#0580ed'
},
{
	"type": "S",
	"message0": "%{BKY_SCL_S}",
	"colour": '#ffbf00',
	"style":
	{
		"hat": "cap"
	},
	"nextStatement": "Sai"
},
{
	"type": "HCJ",
	"message0": "%{BKY_SCL_HCJ}",
	"colour": '#ffbf00',
	"previousStatement": "Sai",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "html",
		"check": "html"
	},
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "css",
		"check": "css"
	},
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "js",
		"check": "js"
	}]
},
{
	"type": "c_html",
	"message0": "%{BKY_SCL_C_HTML}",
	"colour": '#ffbf00',
	"previousStatement": "Sai",
	"nextStatement": "Sai",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "html",
		"check": "html"
	}]
},
{
	"type": "c_css",
	"message0": "%{BKY_SCL_C_CSS}",
	"colour": '#ffbf00',
	"previousStatement": "Sai",
	"nextStatement": "Sai",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "css",
		"check": "css"
	}]
},
{
	"type": "c_js",
	"message0": "%{BKY_SCL_C_JS}",
	"colour": '#ffbf00',
	"previousStatement": "Sai",
	"nextStatement": "Sai",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "js",
		"check": "js"
	}]
},
{
	"type": "T",
	"message0": "%{BKY_SCL_T}",
	"previousStatement": "head",
	"nextStatement": "head",
	"args0": [
	{
		"type": "input_value",
		"name": "websiteName",
		"check": ["mozi", "kazu"]
	}],
	"colour": '#ff9800'
},
{
	"type": "JY",
	"message0": "%{BKY_SCL_JY}",
	"previousStatement": "head",
	"nextStatement": "head",
	"args0": [
	{
		"type": "input_value",
		"name": "JS",
		"check": ["mozi", "kazu"]
	}],
	"colour": '#ff9800'
},
{
	"type": "CY",
	"message0": "%{BKY_SCL_CY}",
	"previousStatement": "head",
	"nextStatement": "head",
	"args0": [
	{
		"type": "input_value",
		"name": "CSS",
		"check": ["mozi", "kazu"]
	}],
	"colour": '#ff9800'
},
{
	"type": "MD",
	"message0": "%{BKY_SCL_MD}",
	"output": ["mozi", "text"],
	"args0": [
	{
		"type": "field_input",
		"name": "mozi"
	}],
	"colour": '#000000'
},
{
	"type": "KD",
	"message0": "%{BKY_SCL_KD}",
	"output": "kazu",
	"args0": [
	{
		"type": "field_number",
		"name": "kazu",
		"value": 0
	}],
	"colour": '#000000'
},
{
	"type": "CID",
	"message0": "%{BKY_SCL_CID}",
	"output": "color",
	"args0": [
	{
		"type": "field_colour_hsv_sliders",
		"name": "color",
		"colour": "#ff0000"
	}],
	"colour": '#000000'
},
{
	"type": "K",
	"message0": "%{BKY_SCL_K}",
	"previousStatement": "body",
	"nextStatement": "body",
	"colour": '#0170a7'
},
{
	"type": "TD",
	"message0": "%{BKY_SCL_TD}",
	"output": "mozi",
	"colour": '#20a002'
},
{
	"type": "GD",
	"message0": "%{BKY_SCL_GD}",
	"output": "mozi",
	"args0": [
	{
		"type": "input_value",
		"name": "M1",
		"check": "mozi"
	},
	{
		"type": "input_value",
		"name": "M2",
		"check": "mozi"
	}],
	"inputsInline": true,
	"colour": '#20a002'
},
{
	"type": "Ibtn",
	"message0": "%{BKY_SCL_IBTN}",
	"args0": [
	{
		"type": "input_value",
		"name": "syo",
		"check": "syo"
	},
	{
		"type": "input_value",
		"name": "value",
		"check": "mozi"
	}],
	"inputsInline": true,
	"previousStatement": "body",
	"nextStatement": "body",
	"colour": '#0580ed'
},
{
	"type": "Bbtn",
	"message0": "%{BKY_SCL_BBTN}",
	"args0": [
	{
		"type": "input_value",
		"name": "syo",
		"check": "syo"
	},
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "body",
		"check": "body"
	}],
	"inputsInline": true,
	"previousStatement": "body",
	"nextStatement": "body",
	"colour": '#0580ed'
},
{
	"type": "p",
	"message0": "%{BKY_SCL_P}",
	"args0": [
	{
		"type": "input_value",
		"name": "syo",
		"check": "syo"
	},
	{
		"type": "input_statement",
		"name": "p",
		"check": "body"
	}],
	"inputsInline": true,
	"previousStatement": "body",
	"nextStatement": "body",
	"colour": '#0580ed'
},
{
	"type": "div",
	"message0": "%{BKY_SCL_DIV}",
	"args0": [
	{
		"type": "input_value",
		"name": "syo",
		"check": "syo"
	},
	{
		"type": "input_statement",
		"name": "div",
		"check": "body"
	}],
	"inputsInline": true,
	"previousStatement": "body",
	"nextStatement": "body",
	"colour": '#0580ed'
},
{
	"type": "span",
	"message0": "%{BKY_SCL_SPAN}",
	"args0": [
	{
		"type": "input_value",
		"name": "syo",
		"check": "syo"
	},
	{
		"type": "input_statement",
		"name": "span",
		"check": "body"
	}],
	"inputsInline": true,
	"previousStatement": "body",
	"nextStatement": "body",
	"colour": '#0580ed'
},
{
	"type": "CD",
	"message0": "%{BKY_SCL_CD}",
	"output": "syo",
	"args0": [
	{
		"type": "input_value",
		"name": "CM",
		"check": "mozi"
	}],
	"colour": '#893273'
},
{
	"type": "ID",
	"message0": "%{BKY_SCL_ID}",
	"output": "syo",
	"args0": [
	{
		"type": "input_value",
		"name": "IM",
		"check": "mozi"
	}],
	"colour": '#893273'
},
{
	"type": "SGD",
	"message0": "%{BKY_SCL_SGD}",
	"output": "syo",
	"args0": [
	{
		"type": "input_value",
		"name": "S1",
		"check": "syo"
	},
	{
		"type": "input_value",
		"name": "S2",
		"check": "syo"
	}],
	"inputsInline": true,
	"colour": '#893273'
},
{
	"type": "HC",
	"message0": "%{BKY_SCL_HC}",
	"previousStatement": "body",
	"nextStatement": "body",
	"args0": [
	{
		"type": "input_value",
		"name": "MOZI"
	}],
	"colour": '#f0a080'
},
{
	"type": "CC",
	"message0": "%{BKY_SCL_CC}",
	"previousStatement": "css",
	"nextStatement": "css",
	"args0": [
	{
		"type": "input_value",
		"name": "MOZI"
	}],
	"colour": '#f0a080'
},
{
	"type": "CN",
	"message0": "%{BKY_SCL_CN}",
	"args0": [
	{
		"type": "input_value",
		"name": "nani",
		"check": ["kakutyo", "youso", "class", "id", "kanma", "puras"]
	},
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "dou",
		"check": "dou"
	}],
	"inputsInline": true,
	"previousStatement": "css",
	"nextStatement": "css",
	"colour": "#298a8f"
},
{
	"type": "CNCD",
	"message0": "%{BKY_SCL_CNCD}",
	"args0": [
	{
		"type": "input_value",
		"name": "class",
		"check": "mozi"
	}],
	"output": "class",
	"colour": '#298a8f'
},
{
	"type": "CNID",
	"message0": "%{BKY_SCL_CNID}",
	"args0": [
	{
		"type": "input_value",
		"name": "id",
		"check": "mozi"
	}],
	"output": "id",
	"colour": '#298a8f'
},
{
	"type": "CNYD",
	"message0": "%{BKY_SCL_CNYD}",
	"args0": [
	{
		"type": "input_value",
		"name": "you",
		"check": "mozi"
	}],
	"output": "id",
	"colour": '#298a8f'
},
{
	"type": "CNB",
	"message0": "%{BKY_SCL_CNB}",
	"output": "id",
	"colour": '#298a8f'
},
{
	"type": "CIS",
	"message0": "%{BKY_SCL_CIS}",
	"args0": [
	{
		"type": "field_dropdown",
		"name": "name",
		"options": [
			["色", "color"],
			["背景色", "background-color"]
		]
	},
	{
		"type": "input_value",
		"name": "color",
		"check": "color"
	}],
	"inputsInline": true,
	"previousStatement": "dou",
	"nextStatement": "dou",
	"colour": "#ed5179"
},
{
	"type": "WS",
	"message0": "%{BKY_SCL_WS}",
	"args0": [
	{
		"type": "field_dropdown",
		"name": "name",
		"options": [
			["横幅", "width"],
			["縦幅", "height"],
			["最大横幅", "max-width"],
			["最小横幅", "min-width"],
			["最大縦幅", "max-height"],
			["最小縦幅", "min-height"],
			["文字の大きさ", "font-size"]
		]
	},
	{
		"type": "input_value",
		"name": "naga",
		"check": "naga"
	}],
	"inputsInline": true,
	"previousStatement": "dou",
	"nextStatement": "dou",
	"colour": "#ed5179"
},
{
	"type": "KMS",
	"message0": "%{BKY_SCL_KMS}",
	"args0": [
	{
		"type": "input_value",
		"name": "doko",
		"check": "doko"
	},
	{
		"type": "input_value",
		"name": "naga",
		"check": "naga"
	}],
	"inputsInline": true,
	"previousStatement": "dou",
	"nextStatement": "dou",
	"colour": "#ed5179"
},
{
	"type": "DSS",
	"message0": "%{BKY_SCL_DSS}",
	"args0": [
	{
		"type": "input_value",
		"name": "soroe",
		"check": "soroe"
	}],
	"inputsInline": true,
	"previousStatement": "dou",
	"nextStatement": "dou",
	"colour": "#ed5179"
},
{
	"type": "PDS",
	"message0": "%{BKY_SCL_PDS}",
	"args0": [
	{
		"type": "field_dropdown",
		"name": "name",
		"options": [
			["要素内側", "padding"],
			["要素外側", "margin"]
		]
	},
	{
		"type": "input_value",
		"name": "doko",
		"check": "doko"
	},
	{
		"type": "input_value",
		"name": "naga",
		"check": "naga"
	}],
	"inputsInline": true,
	"previousStatement": "dou",
	"nextStatement": "dou",
	"colour": "#ed5179"
},
{
	"type": "NS",
	"message0": "%{BKY_SCL_NS}",
	"args0": [
	{
		"type": "input_value",
		"name": "kazu",
		"check": "kazu"
	}],
	"inputsInline": true,
	"previousStatement": "dou",
	"nextStatement": "dou",
	"colour": "#ed5179"
},
{
	"type": "FW",
	"message0": "%{BKY_SCL_FW}",
	"args0": [
	{
		"type": "field_slider",
		"name": "WEIGHT",
		"value": 4,
		"min": 1,
		"max": 9,
		"precision": 1
	}],
	"previousStatement": "dou",
	"nextStatement": "dou",
	"colour": "#ed5179"
},
{
	"type": "FF",
	"message0": "%{BKY_SCL_FF}",
	"args0": [
	{
		"type": "field_dropdown",
		"name": "FONT",
		"options": [
			["ゴシック体 (標準)", "sans-serif"],
			["明朝体 (標準)", "serif"],
			["Noto Sans", "'Noto Sans JP', sans-serif"],
			["Noto Serif", "'Noto Serif JP', serif"],
			["M PLUS Rounded", "'M PLUS Rounded 1c', sans-serif"],
			["Yusei Magic", "'Yusei Magic', sans-serif"],
			["Dela Gothic One", "'Dela Gothic One', cursive"],
			["DotGothic16", "'DotGothic16', sans-serif"],
			["Hachi Maru Pop", "'Hachi Maru Pop', cursive"],
			["等幅", "monospace"]
		]
	}],
	"previousStatement": "dou",
	"nextStatement": "dou",
	"colour": "#ed5179"
},
{
	"type": "TMD",
	"message0": "%{BKY_SCL_TMD}",
	"output": "color",
	"colour": '#ed5179'
},
{
	"type": "PDD",
	"message0": "%{BKY_SCL_PDD}",
	"output": "doko",
	"args0": [
	{
		"type": "field_dropdown",
		"name": "PDD",
		"options": [
			["全部", ""],
			["上", "-top"],
			["下", "-bottom"],
			["右", "-right"],
			["左", "-left"]
		]
	}],
	"colour": '#ed5179'
},
{
	"type": "ND",
	"message0": "%{BKY_SCL_ND}",
	"output": "naga",
	"args0": [
	{
		"type": "input_value",
		"name": "kazu",
		"check": "kazu"
	},
	{
		"type": "field_dropdown",
		"name": "ND",
		"options": [
			["PX", "px"],
			["%", "%"]
		]
	}],
	"colour": '#ed5179'
},
{
	"type": "KMID",
	"message0": "%{BKY_SCL_KMID}",
	"output": "doko",
	"args0": [
	{
		"type": "field_dropdown",
		"name": "KMID",
		"options": [
			["全部", ""],
			["右上", "-top-right"],
			["左上", "-top-left"],
			["右下", "-bottom-right"],
			["左下", "-bottom-left"]
		]
	}],
	"colour": '#ed5179'
},
{
	"type": "DSD",
	"message0": "%{BKY_SCL_DSD}",
	"output": "soroe",
	"args0": [
	{
		"type": "field_dropdown",
		"name": "DSD",
		"options": [
			["左端", "left"],
			["右端", "right"],
			["中央", "center"],
			["開始側", "start"],
			["終了側", "end"]
		]
	}],
	"colour": '#ed5179'
},
{
	"type": "CKLD",
	"message0": "%{BKY_SCL_CKLD}",
	"output": "kaku",
	"colour": '#f289af'
},
{
	"type": "CHOD",
	"message0": "%{BKY_SCL_CHOD}",
	"output": "kaku",
	"colour": '#f289af'
},
{
	"type": "KTD",
	"message0": "%{BKY_SCL_KTD}",
	"output": "kakutyo",
	"args0": [
	{
		"type": "input_value",
		"name": "M1",
		"check": ["YOU", "class", "id"]
	},
	{
		"type": "input_value",
		"name": "M2",
		"check": "kaku"
	}],
	"inputsInline": true,
	"colour": '#298a8f'
},
{
	"type": "img_block",
	"message0": "%{BKY_SCL_IMG_BLOCK}",
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
	}],
	"inputsInline": true,
	"previousStatement": "body",
	"nextStatement": "body",
	"colour": "#0580ed"
},
{
	"type": "JC",
	"message0": "%{BKY_SCL_JC}",
	"previousStatement": "js",
	"nextStatement": "js",
	"args0": [
	{
		"type": "input_value",
		"name": "MOZI",
		"check": "text"
	}],
	"colour": '#f0a080'
},
{
	"type": "JMD",
	"message0": "%{BKY_SCL_JMD}",
	"output": "text",
	"args0": [
	{
		"type": "field_input",
		"name": "DKTM"
	}],
	"colour": '#000000'
},
{
	"type": "JKD",
	"message0": "%{BKY_SCL_JKD}",
	"output": "jkazu",
	"args0": [
	{
		"type": "field_number",
		"name": "jkazu",
		"value": 0
	}],
	"colour": '#000000'
},
{
	"type": "JMAD",
	"message0": "%{BKY_SCL_JMAD}",
	"output": "text",
	"args0": [
	{
		"type": "input_value",
		"name": "DKTM",
		"check": "text"
	}],
	"colour": '#aabbcc'
},
{
	"type": "JKAD",
	"message0": "%{BKY_SCL_JKAD}",
	"output": "jkazu",
	"args0": [
	{
		"type": "input_value",
		"name": "DKTK",
		"check": "jkazu"
	}],
	"colour": '#aabbcc'
},
{
	"type": "NNSD",
	"message0": "%{BKY_SCL_NNSD}",
	"previousStatement": "haiN",
	"nextStatement": "haiN",
	"args0": [
	{
		"type": "input_value",
		"name": "DKTM1",
		"check": "text"
	},
	{
		"type": "input_value",
		"name": "DKTM2",
		"check": "text"
	}],
	"inputsInline": true,
	"colour": '#abcabc'
},
{
	"type": "HAD[",
	"message0": "%{BKY_SCL_HAD_A}",
	"output": "hai[",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "j[]",
		"check": ["hai[", "hai{", "hai", "haiN"]
	}],
	"colour": '#bbaacc'
},
{
	"type": "HAD{",
	"message0": "%{BKY_SCL_HAD_O}",
	"output": "hai{",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "j{}",
		"check": ["hai[", "hai{", "hai", "haiN"]
	}],
	"colour": '#aaccbb'
},
{
	"type": "HAD",
	"message0": "%{BKY_SCL_HAD}",
	"previousStatement": "hai",
	"nextStatement": "hai",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "j{}",
		"check": ["hai[", "hai{", "hai", "haiN"]
	}],
	"inputsInline": true,
	"colour": '#ccbbaa'
},
{
	"type": "NW",
	"message0": "%{BKY_SCL_NW}",
	"previousStatement": "js",
	"nextStatement": "js",
	"args0": [
	{
		"type": "input_value",
		"name": "NANI",
		"check": "HEN"
	},
	{
		"type": "input_value",
		"name": "DOU",
		"check": ["text", "jkazu", "HEN", "hai{", "hai["]
	}],
	"colour": '#fe9f3d'
},
{
	"type": "NTW",
	"message0": "%{BKY_SCL_NTW}",
	"previousStatement": "js",
	"nextStatement": "js",
	"args0": [
	{
		"type": "field_dropdown",
		"name": "name",
		"options": [
			["定数", "const"],
			["ローカル変数", "let"],
			["グローバル変数", "var"]
		]
	},
	{
		"type": "input_value",
		"name": "NANI",
		"check": "HEN"
	},
	{
		"type": "input_value",
		"name": "DOU",
		"check": ["text", "jkazu", "HEN", "hai{", "hai["]
	}],
	"colour": '#fe9f3d'
},
{
	"type": "HD",
	"message0": "%{BKY_SCL_HD}",
	"args0": [
	{
		"type": "input_value",
		"name": "HEN",
		"check": "text"
	}],
	"output": ["text", "jkazu", "HEN"],
	"colour": '#fe9f3d'
},
{
	"type": "KB",
	"message0": "%{BKY_SCL_KB}",
	"previousStatement": "js",
	"nextStatement": "js",
	"args0": [
	{
		"type": "field_input",
		"name": "mozi"
	}],
	"colour": '#8a88bb'
},
{
	"type": "KA",
	"message0": "%{BKY_SCL_KA}",
	"args0": [
	{
		"type": "field_input",
		"name": "mozi"
	}],
	"output": "text",
	"colour": '#8a88bb'
},
{
	"type": "ks_mutator_container",
	"message0": "%{BKY_SCL_KS_MUTATOR_CONTAINER}",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "STACK"
	}],
	"colour": "#8a88bb"
},
{
	"type": "ks_mutator_arg",
	"message0": "%{BKY_SCL_KS_MUTATOR_ARG}",
	"args0": [
	{
		"type": "field_input",
		"name": "NAME",
		"text": "x"
	}],
	"previousStatement": null,
	"nextStatement": null,
	"colour": "#8a88bb"
},
{
	"type": "KS",
	"message0": "%{BKY_SCL_KS}",
	"args0": [
	{
		"type": "field_input",
		"name": "mozi"
	}],
	"mutator": "ks_mutator",
	"inputsInline": false,
	"previousStatement": "js",
	"nextStatement": "js",
	"colour": "#8a88bb",
	"tooltip": "歯車マークで引数を追加できます"
},
{
	"type": "MKS",
	"message0": "%{BKY_SCL_MKS}",
	"args0": [
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "js",
		"check": "js"
	}],
	"inputsInline": true,
	"output": "text",
	"colour": "#8a88bb"
},
{
	"type": "p_logic_compare",
	"message0": "%{BKY_SCL_P_LOGIC_COMPARE}",
	"args0": [
	{
		"type": "input_value",
		"name": "A",
		"check": ["text", "jkazu"]
	},
	{
		"type": "field_dropdown",
		"name": "OP",
		"options": [
			["=", "=="],
			["≠", "!="],
			[">", ">"],
			["<", "<"],
			["≦", "<="],
			["≧", ">="]
		]
	},
	{
		"type": "input_value",
		"name": "B",
		"check": ["text", "jkazu"]
	}],
	"output": "Boolean",
	"colour": "#59c059",
	"inputsInline": true
},
{
	"type": "p_logic_operation",
	"message0": "%{BKY_SCL_P_LOGIC_OPERATION}",
	"args0": [
	{
		"type": "input_value",
		"name": "A",
		"check": "Boolean"
	},
	{
		"type": "field_dropdown",
		"name": "OP",
		"options": [
			["かつ", "AND"],
			["または", "OR"]
		]
	},
	{
		"type": "input_value",
		"name": "B",
		"check": "Boolean"
	}],
	"output": "Boolean",
	"colour": "#59c059",
	"inputsInline": true
},
{
	"type": "p_logic_negate",
	"message0": "%{BKY_SCL_P_LOGIC_NEGATE}",
	"args0": [
	{
		"type": "input_value",
		"name": "BOOL",
		"check": "Boolean"
	}],
	"output": "Boolean",
	"colour": "#59c059"
},
{
	"type": "p_control_if",
	"message0": "%{BKY_SCL_P_CONTROL_IF}",
	"args0": [
	{
		"type": "input_value",
		"name": "IF0",
		"check": "Boolean"
	},
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "DO0",
		"check": "js"
	}],
	"inputsInline": true,
	"previousStatement": "js",
	"nextStatement": "js",
	"colour": "#124d99",
	"mutator": "scl_if_mutator"
},
{
	"type": "p_control_repeat",
	"message0": "%{BKY_SCL_P_CONTROL_REPEAT}",
	"args0": [
	{
		"type": "input_value",
		"name": "TIMES",
		"check": "jkazu"
	},
	{
		"type": "input_dummy"
	},
	{
		"type": "input_statement",
		"name": "DO",
		"check": "js"
	}],
	"previousStatement": "js",
	"nextStatement": "js",
	"colour": "#124d99"
},
{
	"type": "p_if_mozi_reporter",
	"message0": "%{BKY_SCL_P_IF_MOZI_REPORTER}",
	"args0": [
	{
		"type": "input_value",
		"name": "IF",
		"check": "Boolean"
	},
	{
		"type": "input_value",
		"name": "A",
		"check": ["mozi", "text"]
	},
	{
		"type": "input_value",
		"name": "B",
		"check": ["mozi", "text"]
	}],
	"output": ["mozi", "text"],
	"colour": "#124d99",
	"inputsInline": true
}];

Blockly.defineBlocksWithJsonArray(sclBlockDefinitions);

EasyMode function () {
    
    const EasyNames = {
        "SCL_HCJ": "【枠組み】 %1 %2 【見た目】 %3 %4 【動き】 %5 %6",
        "SCL_C_HTML": "【枠組み】 %1 %2",
        "SCL_C_CSS": "【見た目】 %1 %2",
        "SCL_C_JS": "【動き】 %1 %2",
        "SCL_HSE": "裏側の設定 %1 %2",
        "SCL_HDA": "画面に出すもの %1 %2",
        "SCL_T": "ページのタイトルを %1 にする",
        "SCL_JY": "動きのファイル(JS)を読み込む %1",
        "SCL_CY": "見た目のファイル(CSS)を読み込む %1",
        "SCL_M": "文字を書く %1",
        "SCL_K": "改行する",
        "SCL_TD": "ページのタイトル",
        "SCL_GD": "%1 と %2 をくっつける",
        "SCL_IBTN": "入力ボタンを置く ｜ 詳細: %1 文字: %2",
        "SCL_BBTN": "ボタンを置く ｜ 詳細: %1 %2 中身: %3",
        "SCL_P": "文章を作る(P) ｜ 詳細: %1 %2 中身: %3",
        "SCL_DIV": "範囲を囲む 詳細は %1 で %2",
        "SCL_SPAN": "文字を囲む 詳細: %1 %2 中身: %3",
        "SCL_IMG_BLOCK": "画像を表示 パス: %1 詳細: %2",
        "SCL_CD": "グループ名を %1 にする",
        "SCL_ID": "個別の名前を %1 にする",
        "SCL_SGD": "%1 と %2",
        "SCL_CN": "%1 のデザインを変更 %2 %3",
        "SCL_CNCD": "グループ名が %1 のもの",
        "SCL_CNID": "個別の名前が %1 のもの",
        "SCL_CNYD": "種類が %1 のもの",
        "SCL_CNB": "ページ全体",
        "SCL_CIS": "%1 を %2 にする",
        "SCL_WS": "%1 を %2 にする",
        "SCL_KMS": "角の【 %1 】を %2 丸くする",
        "SCL_DSS": "要素内側を %1 にそろえる",
        "SCL_PDS": "【 %1 】の【 %2 】の余白を %3 にする",
        "SCL_NS": "変化をなめらかにする 速さ: %1",
        "SCL_FW": "文字の太さを %1 にする",
        "SCL_FF": "フォントを %1 にする",
        "SCL_TMD": "透明",
        "SCL_CKLD": "クリックされたとき",
        "SCL_CHOD": "重なったとき",
        "SCL_KTD": "%1 が %2",
        "SCL_JMD": "%1",
        "SCL_JKD": "%1",
        "SCL_JMAD": "文字 %1",
        "SCL_JKAD": "数 %1",
        "SCL_NW": "変数 %1 を %2 にする",
        "SCL_NTW": "%1 で変数 %2 を作り、中身を %3 にする",
        "SCL_HD": "変数 %1",
        "SCL_KB": "命令 %1 を実行する",
        "SCL_KA": "命令 %1 の結果",
        "SCL_KS_MUTATOR_CONTAINER": "受け取る情報の設定 %1 %2",
        "SCL_KS_MUTATOR_ARG": "情報の名前 %1",
        "SCL_KS": "命令 %1 を作る",
        "SCL_MKS": "直で命令を作る %1 %2",
        "SCL_NNSD": "%1 を %2",
        "SCL_HAD_A": "リスト(配列) %1 %2 ]",
        "SCL_HAD_O": "辞書(JSON) { %1 %2 }",
        "SCL_HAD": "%1 %2 と",
        "SCL_HC": "枠組みのメモ // %1",
        "SCL_CC": "見た目のメモ // %1",
        "SCL_JC": "動きのメモ // %1",
        "SCL_P_LOGIC_COMPARE": "%1 %2 %3",
        "SCL_P_LOGIC_OPERATION": "%1 %2 %3",
        "SCL_P_LOGIC_NEGATE": "%1 ではない",
        "SCL_P_CONTROL_IF": "もし %1 なら %2 %3",
        "SCL_P_CONTROL_REPEAT": "%1 回繰り返す %2 %3",
        "SCL_P_IF_MOZI_REPORTER": "もし %1 なら %2 でなければ %3"
    };

	const HardNames = {
    	"SCL_FT": "チケット %1",
    	"SCL_FT2": "チケット2 %1",
    	"SCL_F": "フィールド大量 %1 %2 %3 %4 %5 %6",
    	"SCL_HSE": "設定 %1 %2",
    	"SCL_HDA": "出すもの %1 %2",
    	"SCL_M": "文字 %1",
    	"SCL_S": "サイトを作り始める",
    	"SCL_HCJ": "HTML %1 %2 CSS %3 %4 JavaScript %5 %6",
    	"SCL_C_HTML": "HTML %1 %2",
    	"SCL_C_CSS": "CSS %1 %2",
    	"SCL_C_JS": "JavaScript %1 %2",
    	"SCL_T": "タイトルを %1 にする",
    	"SCL_JY": "JSを読み込む %1",
    	"SCL_CY": "CSSを読み込む %1",
    	"SCL_MD": "%1",
    	"SCL_KD": "%1",
    	"SCL_CID": "%1",
    	"SCL_K": "改行",
    	"SCL_TD": "タイトル",
    	"SCL_GD": "%1 と %2",
    	"SCL_IBTN": "INPUT ボタン 詳細設定 %1 文字 %2",
    	"SCL_BBTN": "BUTTON ボタン 詳細設定 %1 %2 %3",
    	"SCL_P": "P  詳細設定 %1 %2",
    	"SCL_DIV": "DIV  詳細設定 %1 %2",
    	"SCL_SPAN": "SPAN  詳細設定 %1 %2",
    	"SCL_CD": "Classを %1 にする",
    	"SCL_ID": "Idを %1 にする",
    	"SCL_SGD": "%1 & %2",
    	"SCL_HC": "HTML コメント // %1",
    	"SCL_CC": "CSS コメント // %1",
    	"SCL_CN": "%1 を %2 %3",
    	"SCL_CNCD": "Class %1",
    	"SCL_CNID": "Id %1",
    	"SCL_CNYD": "要素 %1",
    	"SCL_CNB": "ボディー",
    	"SCL_CIS": "%1 を %2 にする",
    	"SCL_WS": "%1 を %2 にする",
    	"SCL_KMS": "角の %1 を %2 で丸くする",
    	"SCL_DSS": "要素内側を %1 にそろえる",
    	"SCL_PDS": "%1 の %2 の余白を %3 にする",
    	"SCL_NS": "滑らかする。速さ  %1",
	    "SCL_FW": "文字の太さを %1 にする",
	    "SCL_FF": "フォントを %1 にする",
	    "SCL_TMD": "透明",
	    "SCL_PDD": "%1",
	    "SCL_ND": "%1 %2",
	    "SCL_KMID": "%1",
	    "SCL_DSD": "%1",
	    "SCL_CKLD": "クリックされたとき",
	    "SCL_CHOD": "重なったとき",
	    "SCL_KTD": "%1 で %2",
	    "SCL_IMG_BLOCK": "パス %1 で画像を表示 詳細設定 %2",
	    "SCL_JC": "JS コメント // %1",
	    "SCL_JMD": "%1",
	    "SCL_JKD": "%1",
	    "SCL_JMAD": "文字 %1",
	    "SCL_JKAD": "数 %1",
	    "SCL_NNSD": "%1 を %2",
	    "SCL_HAD_A": "配列 [ %1 %2 ]", 
	    "SCL_HAD_O": "JSON { %1 %2 }",  
	    "SCL_HAD": "%1 %2と",
	    "SCL_NW": "%1 を %2 にする",
	    "SCL_NTW": "%1 で %2 を作り %3 にする",
	    "SCL_HD": "変数 %1",
	    "SCL_KB": "関数 %1",
	    "SCL_KA": "関数 %1",
	    "SCL_KS_MUTATOR_CONTAINER": "引数の設定 %1 %2",
	    "SCL_KS_MUTATOR_ARG": "引数名 %1",
	    "SCL_KS": "関数 %1",
	    "SCL_MKS": "無名関数 %1 %2",
	    "SCL_P_LOGIC_COMPARE": "%1 %2 %3",
	    "SCL_P_LOGIC_OPERATION": "%1 %2 %3",
	    "SCL_P_LOGIC_NEGATE": "%1 ではない",
	    "SCL_P_CONTROL_IF": "もし %1 なら %2 %3",
	    "SCL_P_CONTROL_REPEAT": "%1 回繰り返す %2 %3",
	    "SCL_P_IF_MOZI_REPORTER": "もし %1 なら %2 でなければ %3"
	};

    // Blockly.Msg を新しい言葉で上書き
    for (let key in easyNames) {
        Blockly.Msg[key] = easyNames[key];
    }

    // ====================================================
    // ② 【更新処理】画面のブロックとメニューを一瞬でリフレッシュする
    // ====================================================
    
    // 左側のメニュー（ツールボックス）を更新
    const toolboxElement = document.getElementById('toolbox');
    if (toolboxElement) {
        workspace.updateToolbox(toolboxElement);
    }

    // ワークスペース上のブロックを再描画（状態を保存 → 全消去 → 復元）
    // これにより、新しく書き換わった辞書（Blockly.Msg）が即座に反映されます！
    const state = Blockly.serialization.workspaces.save(workspace);
    workspace.clear();
    Blockly.serialization.workspaces.load(state, workspace);
}
