var title = "";
var text = "";
var csstext = "";
var jstext = "";
var cssd = "";
var YOMI = "";
var classd = "";
var cssk = ""; // 追加

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
    toolbox: document.getElementById(`Hard_toolbox`),
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
	
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),workspace);

workspace.addChangeListener(Blockly.Events.disableOrphans);
