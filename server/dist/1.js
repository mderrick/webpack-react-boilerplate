exports.ids = [1];
exports.modules = {

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(4),
		css = __webpack_require__(14);
	
	var View = React.createClass({displayName: "View",
	
		classes: React.addons.classSet({
			'index': true
		}),
	
		render: function () {
			return (
				React.createElement("div", {className: this.classes}, 
					React.createElement("h2", null, "Index")
				)
			);
		}
	
	});
	
	module.exports = View;

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	exports.push([module.id, ".index h2{font-size:20px;color:blue}", ""]);

/***/ }

};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9sYXlvdXQvaW5kZXgvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9sYXlvdXQvaW5kZXgvc3R5bGUuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNCQUFxQixJQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQU8sQ0FBQztBQUNqRCxFQUFDLEdBQUcsR0FBRyxtQkFBTyxDQUFDLEVBQWEsQ0FBQyxDQUFDOztBQUU5QixLQUFJLDBCQUEwQjs7RUFFN0IsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0dBQzlCLE9BQU8sRUFBRSxJQUFJO0FBQ2YsR0FBRSxDQUFDOztFQUVGLE1BQU0sRUFBRSxZQUFZO0dBQ25CO0lBQ0MseUJBQUksSUFBQyxXQUFTLENBQUUsSUFBSSxDQUFDLE9BQVM7S0FDN0Isd0JBQUcsTUFBQyxTQUFVO0lBQ1Q7S0FDTDtBQUNKLEdBQUU7O0FBRUYsRUFBQyxDQUFDLENBQUM7O0FBRUgsT0FBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEM7Ozs7Ozs7QUNuQnJCO0FBQ0EscUNBQW9DLGVBQWUsV0FBVyxRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggUmVhY3QuRE9NICovdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0Y3NzID0gcmVxdWlyZSgnLi9zdHlsZS5jc3MnKTtcblxudmFyIFZpZXcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0Y2xhc3NlczogUmVhY3QuYWRkb25zLmNsYXNzU2V0KHtcblx0XHQnaW5kZXgnOiB0cnVlXG5cdH0pLFxuXG5cdHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17dGhpcy5jbGFzc2VzfT5cblx0XHRcdFx0PGgyPkluZGV4PC9oMj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlldztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9jb21wb25lbnRzL2xheW91dC9pbmRleC92aWV3LmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9Vc2Vycy9tYXR0aGV3ZGVycmljay9Eb2N1bWVudHMvV29yay93ZWJwYWNrLXJlYWN0LWJvaWxlcnBsYXRlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuaW5kZXggaDJ7Zm9udC1zaXplOjIwcHg7Y29sb3I6Ymx1ZX1cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9sYXlvdXQvaW5kZXgvc3R5bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6IjEuanMifQ==