define("codeMirror", ["_codeMirror", "codeMirrorClang","codeMirror_showhint","codeMirror_anywordhint","codeMirror_searchcursor",
        "codeMirror_search","codeMirror_dialog","codeMirror_matchbrackets","codeMirror_closebrackets","codeMirror_comment",
        "codeMirror_hardwrap","codeMirror_foldcode","codeMirror_bracefold","codeMirror_sublime","codeMirror_vim",
        "codeMirror_emacs"], function(CodeMirror){
    function codeMirror(selector, language){
        function completeAfter(cm, pred) {
          var cur = cm.getCursor();
          if (!pred || pred()) setTimeout(function() {
            if (!cm.state.completionActive)
              cm.showHint();
          }, 100);
          return CodeMirror.Pass;
        }
        return CodeMirror.fromTextArea(selector,
            {
                mode: "text/x-csrc",
                lineNumbers: true,//是否显示行号
                lineWrapping:true, //是否强制换行
                keyMap: "sublime", //编辑器模式
                autoCloseBrackets: true, //括号自动补全
                matchBrackets: true, //自动匹配括号
                showCursorWhenSelecting: true, //选中时显示焦点
                theme: "monokai", //主题
                tabSize: 4 ,
                indentUnit: 4,
                extraKeys:{
                    "'a'" : completeAfter,
                    "'b'" : completeAfter,
                    "'c'" : completeAfter,
                    "'d'" : completeAfter,
                    "'e'" : completeAfter,
                    "'f'" : completeAfter,
                    "'g'" : completeAfter,
                    "'h'" : completeAfter,
                    "'i'" : completeAfter,
                    "'j'" : completeAfter,
                    "'k'" : completeAfter,
                    "'l'" : completeAfter,
                    "'m'" : completeAfter,
                    "'n'" : completeAfter,
                    "'o'" : completeAfter,
                    "'p'" : completeAfter,
                    "'q'" : completeAfter,
                    "'r'" : completeAfter,
                    "'s'" : completeAfter,
                    "'t'" : completeAfter,
                    "'u'" : completeAfter,
                    "'v'" : completeAfter,
                    "'w'" : completeAfter,
                    "'x'" : completeAfter,
                    "'y'" : completeAfter,
                    "'z'" : completeAfter,
                    "'A'" : completeAfter,
                    "'B'" : completeAfter,
                    "'C'" : completeAfter,
                    "'D'" : completeAfter,
                    "'E'" : completeAfter,
                    "'F'" : completeAfter,
                    "'G'" : completeAfter,
                    "'H'" : completeAfter,
                    "'I'" : completeAfter,
                    "'J'" : completeAfter,
                    "'K'" : completeAfter,
                    "'L'" : completeAfter,
                    "'M'" : completeAfter,
                    "'N'" : completeAfter,
                    "'O'" : completeAfter,
                    "'P'" : completeAfter,
                    "'Q'" : completeAfter,
                    "'R'" : completeAfter,
                    "'S'" : completeAfter,
                    "'T'" : completeAfter,
                    "'U'" : completeAfter,
                    "'V'" : completeAfter,
                    "'W'" : completeAfter,
                    "'X'" : completeAfter,
                    "'Y'" : completeAfter,
                    "'Z'" : completeAfter,
                    "'_'" : completeAfter,
                }
            });
    }
    return codeMirror;
});