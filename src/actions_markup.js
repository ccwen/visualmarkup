var action_markups=require("reflux").createActions([
		"loadTagsets",
		"setTagsetName",
		"setSelection",
		"tokenPositionUpdated",
		"createMarkup",
		"editMarkup",
		"editMarkupAtPos",
		"saveMarkup",
		"deleteMarkup",
		"cancelEdit",
		"markupUpdated",
		"setVisibleTags",
		"clearAllMarkups",
		"saveMarkups",
		"registerViewid",
		"setVirtualMarkup",
		"addHiddenView",
		"removeHiddenView"
]);
module.exports=action_markups;