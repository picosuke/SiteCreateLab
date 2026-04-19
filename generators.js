javascript.javascriptGenerator.forBlock['KS_ARG_REPORTER'] = function(block) {
    var argName = block.getFieldValue('ARG_NAME');
    return [argName, javascript.Order.ATOMIC];
};

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

javascript.javascriptGenerator.forBlock['NTW'] = function(block, generator) {
    var name = block.getFieldValue('name');
    var value_NANI = generator.valueToCode(block, 'NANI', javascript.Order.NONE) || '""';
    var value_DOU = generator.valueToCode(block, 'DOU', javascript.Order.NONE) || '""';
    jstext = jstext + name + " " + value_NANI + ' = ' + value_DOU + ';\n';
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

// ==========================================
// プラスマイナス対応：「もし〜なら」ジェネレータ
// ==========================================
javascript.javascriptGenerator.forBlock['p_control_if'] = function(block, generator) {
    let code = ''; 
    let branchCode, conditionCode;
  
    // 1. メインの「もし（IF0）〜 なら（DO0）」
    conditionCode = generator.valueToCode(block, 'IF0', javascript.Order.NONE) || 'false';
  
    let currentJS = jstext; 
    jstext = "";
    generator.statementToCode(block, 'DO0');
    branchCode = jstext;
    jstext = currentJS; 
  
    code += 'if (' + conditionCode + ') {\n' + branchCode + '}';

    // 2. 増やされた「でなければもし（elseIf）」の数だけ繰り返す
    for (let i = 1; i <= block.elseIfCount_; i++) {
        conditionCode = generator.valueToCode(block, 'IF' + i, javascript.Order.NONE) || 'false';
        
        currentJS = jstext;
        jstext = "";
        generator.statementToCode(block, 'DO' + i);
        branchCode = jstext;
        jstext = currentJS;
        
        code += ' else if (' + conditionCode + ') {\n' + branchCode + '}';
    }

    // 3. もし「でなければ（else）」が追加されていたら
    if (block.hasElse_) {
        currentJS = jstext;
        jstext = "";
        generator.statementToCode(block, 'ELSE');
        branchCode = jstext;
        jstext = currentJS;
        
        code += ' else {\n' + branchCode + '}';
    }

    // 最後に改行をつけて、グローバル変数に足し込む
    jstext += currentJS + code + '\n';
    
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
