var LoadingComponent = require('components/common/loading');

var CodeSplitLoadingMixin = {
    renderUnavailable: function() {
        return (
            <div className='layout-content'>
                <LoadingComponent/>
            </div>
        );
    }
};

module.exports = CodeSplitLoadingMixin;