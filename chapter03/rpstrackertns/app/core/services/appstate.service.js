"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = require("~/core/contracts/services");
exports.INITIAL_STATE = {
    backlogItems: [],
    users: [],
    currentUser: undefined,
    currentSelectedItem: undefined,
    selectedPreset: 'open'
};
var AppStateService = /** @class */ (function () {
    function AppStateService(storageService) {
        this.storageService = storageService;
        storageService.setItem(services_1.APP_STATE_KEY, exports.INITIAL_STATE);
    }
    AppStateService.prototype.getStateItem = function (name) {
        var appState = this.storageService.getItem(services_1.APP_STATE_KEY);
        return appState[name];
    };
    AppStateService.prototype.setStateItem = function (name, state) {
        var _a;
        this.storageService.setItem(services_1.APP_STATE_KEY, __assign({}, this.storageService.getItem(services_1.APP_STATE_KEY), (_a = {}, _a[name] = state, _a)));
    };
    return AppStateService;
}());
exports.AppStateService = AppStateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwc3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcHN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBNEU7QUFNL0QsUUFBQSxhQUFhLEdBQWU7SUFDdkMsWUFBWSxFQUFFLEVBQUU7SUFDaEIsS0FBSyxFQUFFLEVBQUU7SUFDVCxXQUFXLEVBQUUsU0FBUztJQUN0QixtQkFBbUIsRUFBRSxTQUFTO0lBQzlCLGNBQWMsRUFBRSxNQUFNO0NBQ3ZCLENBQUM7QUFFRjtJQUNFLHlCQUFvQixjQUFnQztRQUFoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFDbEQsY0FBYyxDQUFDLE9BQU8sQ0FBYSx3QkFBYSxFQUFFLHFCQUFhLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sc0NBQVksR0FBbkIsVUFBZ0QsSUFBTztRQUNyRCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBYSx3QkFBYSxDQUFDLENBQUM7UUFDeEUsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLHNDQUFZLEdBQW5CLFVBQ0UsSUFBTyxFQUNQLEtBQW9COztRQUVwQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyx3QkFBYSxlQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyx3QkFBYSxDQUFDLGVBQzVDLElBQUksSUFBRyxLQUFLLE9BQ2IsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUFBfU1RBVEVfS0VZLCBQdFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnfi9jb3JlL2NvbnRyYWN0cy9zZXJ2aWNlcyc7XG5pbXBvcnQge1xuICBQdEFwcFN0YXRlLFxuICBQdEFwcFN0YXRlU2VydmljZVxufSBmcm9tICd+L2NvcmUvY29udHJhY3RzL3NlcnZpY2VzL3B0LXN0YXRlLXNlcnZpY2UuY29udHJhY3QnO1xuXG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFURTogUHRBcHBTdGF0ZSA9IHtcbiAgYmFja2xvZ0l0ZW1zOiBbXSxcbiAgdXNlcnM6IFtdLFxuICBjdXJyZW50VXNlcjogdW5kZWZpbmVkLFxuICBjdXJyZW50U2VsZWN0ZWRJdGVtOiB1bmRlZmluZWQsXG4gIHNlbGVjdGVkUHJlc2V0OiAnb3Blbidcbn07XG5cbmV4cG9ydCBjbGFzcyBBcHBTdGF0ZVNlcnZpY2UgaW1wbGVtZW50cyBQdEFwcFN0YXRlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IFB0U3RvcmFnZVNlcnZpY2UpIHtcbiAgICBzdG9yYWdlU2VydmljZS5zZXRJdGVtPFB0QXBwU3RhdGU+KEFQUF9TVEFURV9LRVksIElOSVRJQUxfU1RBVEUpO1xuICB9XG5cbiAgcHVibGljIGdldFN0YXRlSXRlbTxLIGV4dGVuZHMga2V5b2YgUHRBcHBTdGF0ZT4obmFtZTogSyk6IFB0QXBwU3RhdGVbS10ge1xuICAgIGNvbnN0IGFwcFN0YXRlID0gdGhpcy5zdG9yYWdlU2VydmljZS5nZXRJdGVtPFB0QXBwU3RhdGU+KEFQUF9TVEFURV9LRVkpO1xuICAgIHJldHVybiBhcHBTdGF0ZVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdGF0ZUl0ZW08SyBleHRlbmRzIGtleW9mIFB0QXBwU3RhdGU+KFxuICAgIG5hbWU6IEssXG4gICAgc3RhdGU6IFB0QXBwU3RhdGVbS11cbiAgKSB7XG4gICAgdGhpcy5zdG9yYWdlU2VydmljZS5zZXRJdGVtKEFQUF9TVEFURV9LRVksIHtcbiAgICAgIC4uLnRoaXMuc3RvcmFnZVNlcnZpY2UuZ2V0SXRlbShBUFBfU1RBVEVfS0VZKSxcbiAgICAgIFtuYW1lXTogc3RhdGVcbiAgICB9KTtcbiAgfVxufVxuIl19