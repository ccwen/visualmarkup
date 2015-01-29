var Reflux=require("reflux");
var stores=require("./store_text");
var viewName={"lecture":"講義","sutra":"經文"};
var actions=require("./actions_text");

var SelectionList=React.createClass({
	mixins:[Reflux.ListenerMixin]
	,propTypes:{
		viewselections:React.PropTypes.object.isRequired
		,showtext:React.PropTypes.bool
	}
	,goSelection:function(e) {
		var vpos=parseInt(e.target.dataset.vpos);
		var viewid=e.target.dataset.viewid;
		actions.getTextByVpos(vpos,viewid);		
	}
	,componentDidMount:function(){
		for (var i in stores) {
			this.listenTo(stores[i], this.onTextChange);
		}
	}
	,onTextChange:function() {
		this.forceUpdate();
	}
	,sortView:function() {//naive approach
		var keys=Object.keys(this.props.viewselections);
		keys.sort(function(a,b){ return a>b?-1:b>a?1:0});
		return keys;
	}
	,renderHelp:function() {
		var keys=Object.keys(this.props.viewselections);
		if (keys.length==1 && this.props.viewselections[keys[0]].length==1){
			return <span>Press Ctrl to append selection</span>;
		}
	}
	,render:function() {
		var out=[];
		keys=this.sortView();
		for (var j=0;j<keys.length;j++) {
			var view=keys[j];
			var selections=this.props.viewselections[view];
			if (selections.length) out.push(<div key={view+"view"}>{viewName[view]}</div>)
			for (var i=0;i<selections.length;i++) {
				var sel=selections[i], cls="", onclick=null;
				var text="";
				if (this.props.showtext) text=stores[view].getTextBySelection(sel[0],sel[1]);
				var npara=stores[view].getSegByVpos(sel[0]);
				if (text && text.length>10) text=text.substr(0,10)+"...";
				if ( !stores[view].vposInSight(sel[0])) {
					cls="btn btn-default";
					onclick=this.goSelection;
				}
				out.push(<div key={view+"s"+i}><span onClick={onclick} className={cls}
					 data-viewid={view} data-vpos={sel[0]}>{npara+"|"+sel[0]+"-"+sel[1]+" "}
					</span><span>{text}</span><br/></div>);
			}
			out.push(<hr key={view+"hr"}/>)
		}
		return <div>{out}{this.renderHelp()}</div>;
	}	
});
module.exports=SelectionList;