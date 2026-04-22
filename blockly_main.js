function callbackFn ( event ) {
	event.returnValue = "入力内容が残ってますが、このページを離れても大丈夫ですか？" ;
}
window.onbeforeunload = callbackFn;

function Menu(Hard_Easy) {
    const registry = Blockly.ContextMenuRegistry.registry;
    
    // 消したいメニューのIDリスト
    const menuIds = ['blockCollapseExpand', 'blockInline', 'blockDisable', 'blockComment'];

    if (Hard_Easy === "H") {
        // 【ハードモード】メニューを復活（表示する）
        menuIds.forEach(id => {
            const item = registry.getItem(id);
            if (item) {
                // preconditionFnを元の状態（常に有効）に戻す
                item.preconditionFn = function() { return 'enabled'; };
            }
        });
    } else if (Hard_Easy === "E") {
        // 【簡単モード】メニューを消す（隠す）
        menuIds.forEach(id => {
            const item = registry.getItem(id);
            if (item) {
                // preconditionFnを 'hidden' に上書きすると、メニューに表示されなくなる！
                item.preconditionFn = function() { return 'hidden'; };
            }
        });
    }
}

function H_E_Mode(Hard_Easy) {
    // --- 1. 簡単モード用の名前 ---
    const EasyNames = {
        "SCL_FT": "特別なチケット %1",
        "SCL_FT2": "特別なチケット2 %1",
        "SCL_F": "フィールド大量 %1 %2 %3 %4 %5 %6",
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
        "SCL_IBTN": "入力ボタンを詳細 %1 で文字 %2 で置く",
        "SCL_BBTN": "ボタンを詳細 %1 で置く %2 %3",
        "SCL_P": "見出しを作る 詳細は %1 %2",
        "SCL_DIV": "範囲を囲む 詳細は %1 %2",
        "SCL_SPAN": "文字を囲む 詳細は %1 %2",
        "SCL_IMG_BLOCK": "画像をパス %1 で表示 詳細は %2",
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
        "SCL_HAD_A": "リスト(配列) [ %1 %2 ]", // ★修正：[ が抜けていたのを直しました
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

    // --- 2. ハードモード用の名前 ---
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
    
    // --- 3. モードの判定 ---
    var BlockNames = (Hard_Easy === "H") ? HardNames : EasyNames;

    // --- 4. メッセージの上書き ---
    for (let key in BlockNames) {
        Blockly.Msg[key] = BlockNames[key];
    }

    // --- 5. 画面の更新処理 ---
    if (typeof workspace !== 'undefined') {
        
        // ① モードに合わせて読み込むツールボックスのIDを変える
        const toolboxId = (Hard_Easy === "H") ? 'Hard_toolbox' : 'Easy_toolbox';
        const newToolboxElement = document.getElementById(toolboxId);
        
        // ② ツールボックスを新しいものに差し替える！
        if (newToolboxElement) {
            workspace.updateToolbox(newToolboxElement);
        }

        // ③ ワークスペース上のブロックの文字を更新する
        const state = Blockly.serialization.workspaces.save(workspace);
        workspace.clear();
        Blockly.serialization.workspaces.load(state, workspace);
    }
}

function Hard() {
    H_E_Mode("H");
    Menu("H");
}

function Easy() {
    H_E_Mode("E");
    Menu("E");
}
