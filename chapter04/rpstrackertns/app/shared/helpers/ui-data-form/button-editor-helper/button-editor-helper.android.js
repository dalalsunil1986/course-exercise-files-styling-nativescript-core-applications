"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonEditorHelper = /** @class */ (function () {
    function ButtonEditorHelper() {
    }
    ButtonEditorHelper.prototype.updateEditorValue = function (editorView, newValue) {
        this.buttonValue = newValue;
        editorView.setText(this.buttonValue);
    };
    return ButtonEditorHelper;
}());
exports.ButtonEditorHelper = ButtonEditorHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWVkaXRvci1oZWxwZXIuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1dHRvbi1lZGl0b3ItaGVscGVyLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUFBO0lBUUEsQ0FBQztJQUpVLDhDQUFpQixHQUF4QixVQUF5QixVQUFVLEVBQUUsUUFBUTtRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztRQUM1QixVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEN1c3RvbVByb3BlcnR5RWRpdG9yIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtJztcblxuZXhwb3J0IGNsYXNzIEJ1dHRvbkVkaXRvckhlbHBlciB7XG4gICAgcHVibGljIGJ1dHRvblZhbHVlOiBzdHJpbmc7XG4gICAgcHVibGljIGVkaXRvcjogQ3VzdG9tUHJvcGVydHlFZGl0b3I7XG5cbiAgICBwdWJsaWMgdXBkYXRlRWRpdG9yVmFsdWUoZWRpdG9yVmlldywgbmV3VmFsdWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idXR0b25WYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBlZGl0b3JWaWV3LnNldFRleHQodGhpcy5idXR0b25WYWx1ZSk7XG4gICAgfVxufVxuIl19