var React = require('react'),
    FluxibleMixin = require('fluxible').FluxibleMixin;

var Html = React.createClass({

    render: function() {
        return (
            <html>
                <head>
                    <title>Webpack React Boilerplate</title>
                </head>
                {this.props.css.map(function(style) {
                    return <link rel="stylesheet" href={'/' +style}></link>;
                })}
                <body>
                    <div id="main" dangerouslySetInnerHTML={{__html: this.props.markup}}>
                    </div>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                    {this.props.js.map(function(script) {
                        return <script src={'/' + script}></script>;
                    })}
                </body>
            </html>
        );
    }
});

module.exports = Html;
