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
