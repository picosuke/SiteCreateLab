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

function HardMenus(TRUE){
	if (on_off) {
		Blockly.ContextMenuRegistry.registry.unregister('blockCollapseExpand');
		Blockly.ContextMenuRegistry.registry.unregister('blockInline');
		Blockly.ContextMenuRegistry.registry.unregister('blockDisable');
		Blockly.ContextMenuRegistry.registry.unregister('blockComment');
	} else {
    	const collapseItem = Blockly.ContextMenuItems.registerCollapseExpandBlock();
   		const inlineItem   = Blockly.ContextMenuItems.registerInline();
    	const disableItem  = Blockly.ContextMenuItems.registerDisable();
    	const commentItem  = Blockly.ContextMenuItems.registerComment();

    	const registry = Blockly.ContextMenuRegistry.registry;

	    if (!registry.getItem('blockCollapseExpand')) { registry.register(collapseItem); }
    	if (!registry.getItem('blockInline')) { registry.register(inlineItem); }
    	if (!registry.getItem('blockDisable')) { registry.register(disableItem); }
    	if (!registry.getItem('blockComment')) { registry.register(commentItem); }
	}
}
	
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),workspace);

workspace.addChangeListener(Blockly.Events.disableOrphans);
