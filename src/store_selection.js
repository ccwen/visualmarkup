var Reflux=require("reflux");
var actions=require("./actions_markup");
var store_selection=Reflux.createStore({
	listenables: [actions]
	,selections:{}
	,onSetSelection:function(selections,viewid) {
		this.selections[viewid]=selections;
		this.trigger(this.selections);
	}
});

module.exports=store_selection;