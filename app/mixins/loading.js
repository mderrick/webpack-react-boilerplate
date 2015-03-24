var CodeSplitLoadingMixin = {
	getLoadingView: function() {
		return (<p>Loading...</p>);
	},

	renderUnavailable: function() {
        return this.getLoadingView();
    }
};

module.exports = CodeSplitLoadingMixin;