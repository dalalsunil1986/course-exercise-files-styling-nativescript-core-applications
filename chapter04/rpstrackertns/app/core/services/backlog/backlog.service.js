"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("~/core/models/domain/enums");
var services_1 = require("~/core/services");
// const SELECTED_PRESET = 'SELECTED_PRESET';
// const BACKLOG_ITEMS = 'BACKLOG_ITEMS';
var BacklogService = /** @class */ (function () {
    function BacklogService(loggingService, backlogRepo, appStateService) {
        this.loggingService = loggingService;
        this.backlogRepo = backlogRepo;
        this.appStateService = appStateService;
    }
    BacklogService.prototype.getCurrentPreset = function () {
        var curPre = this.appStateService.getStateItem('selectedPreset');
        if (curPre) {
            return curPre;
        }
        else {
            return 'open';
        }
    };
    BacklogService.prototype.setPreset = function (preset) {
        var curPreset = this.appStateService.getStateItem('selectedPreset');
        if (curPreset !== preset) {
            this.appStateService.setStateItem('selectedPreset', preset);
        }
        return Promise.resolve();
    };
    BacklogService.prototype.fetchItems = function (fetchItemsRequest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.backlogRepo.fetchPtItems(fetchItemsRequest.currentPreset, fetchItemsRequest.currentUserId, function (error) {
                _this.loggingService.error('Fetch items failed');
                reject(error);
            }, function (ptItems) {
                ptItems.forEach(function (i) {
                    services_1.setUserAvatar(_this.backlogRepo.apiEndpoint, i.assignee);
                    i.comments.forEach(function (c) {
                        return services_1.setUserAvatar(_this.backlogRepo.apiEndpoint, c.user);
                    });
                });
                // this.storageService.setItem(BACKLOG_ITEMS, ptItems);
                _this.appStateService.setStateItem('backlogItems', ptItems);
                var response = {
                    items: ptItems
                };
                resolve(response);
            });
        });
    };
    BacklogService.prototype.getPtItem = function (fetchSingleItemRequest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.backlogRepo.getPtItem(fetchSingleItemRequest.ptItemId, function (error) {
                _this.loggingService.error('Fetch items failed');
                reject(error);
            }, function (ptItem) {
                services_1.setUserAvatar(_this.backlogRepo.apiEndpoint, ptItem.assignee);
                ptItem.comments.forEach(function (c) {
                    return services_1.setUserAvatar(_this.backlogRepo.apiEndpoint, c.user);
                });
                _this.appStateService.setStateItem('currentSelectedItem', ptItem);
                var response = {
                    item: ptItem
                };
                resolve(response);
            });
        });
    };
    BacklogService.prototype.getItemFromCacheOrServer = function (fetchSingleItemRequest) {
        var allLocalItems = this.appStateService.getStateItem('backlogItems');
        var selectedItem = allLocalItems.find(function (i) { return i.id === fetchSingleItemRequest.ptItemId; });
        if (selectedItem) {
            this.appStateService.setStateItem('currentSelectedItem', selectedItem);
            var response = {
                item: selectedItem
            };
            return Promise.resolve(response);
        }
        else {
            return this.getPtItem(fetchSingleItemRequest);
        }
    };
    BacklogService.prototype.addNewPtItem = function (createItemRequest) {
        var _this = this;
        var item = {
            id: 0,
            title: createItemRequest.newItem.title,
            description: createItemRequest.newItem.description,
            type: createItemRequest.newItem.type,
            estimate: 0,
            priority: enums_1.PriorityEnum.Medium,
            status: enums_1.StatusEnum.Open,
            assignee: createItemRequest.assignee,
            tasks: [],
            comments: [],
            dateCreated: new Date(),
            dateModified: new Date()
        };
        return new Promise(function (resolve, reject) {
            _this.backlogRepo.insertPtItem(item, function (error) {
                _this.loggingService.error('Adding new item failed');
                reject(error);
            }, function (nextItem) {
                services_1.setUserAvatar(_this.backlogRepo.apiEndpoint, nextItem.assignee);
                /*
                this.storageService.setItem(BACKLOG_ITEMS, [
                  nextItem,
                  ...this.storageService.getItem<PtItem[]>(BACKLOG_ITEMS)
                ]);
                */
                _this.appStateService.setStateItem('backlogItems', [
                    nextItem
                ].concat(_this.appStateService.getStateItem('backlogItems')));
                var response = {
                    createdItem: nextItem
                };
                resolve(response);
            });
        });
    };
    BacklogService.prototype.updatePtItem = function (updateItemRequest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.backlogRepo.updatePtItem(updateItemRequest.itemToUpdate, function (error) {
                _this.loggingService.error('Updating item failed');
                reject(error);
            }, function (updatedItem) {
                var response = {
                    updatedItem: updatedItem
                };
                resolve(response);
            });
        });
    };
    BacklogService.prototype.deletePtItem = function (deleteItemRequest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.backlogRepo.deletePtItem(deleteItemRequest.itemToDelete.id, function (error) {
                _this.loggingService.error('Deleting item failed');
                reject(error);
            }, function () {
                /*
                const backlogItems = this.storageService.getItem<PtItem[]>(
                  BACKLOG_ITEMS
                );
                */
                var backlogItems = _this.appStateService.getStateItem('backlogItems');
                var updatedItems = backlogItems.filter(function (i) {
                    return i.id !== deleteItemRequest.itemToDelete.id;
                });
                // this.storageService.setItem(BACKLOG_ITEMS, updatedItems);
                _this.appStateService.setStateItem('backlogItems', updatedItems);
                var response = {
                    deleted: true
                };
                resolve(response);
            });
        });
    };
    return BacklogService;
}());
exports.BacklogService = BacklogService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2xvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2xvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBc0JBLG9EQUFzRTtBQUV0RSw0Q0FBZ0Q7QUFFaEQsNkNBQTZDO0FBQzdDLHlDQUF5QztBQUV6QztJQUNFLHdCQUNVLGNBQWdDLEVBQ2hDLFdBQWdDLEVBQ2hDLGVBQWtDO1FBRmxDLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7UUFDaEMsb0JBQWUsR0FBZixlQUFlLENBQW1CO0lBQ3pDLENBQUM7SUFFRyx5Q0FBZ0IsR0FBdkI7UUFDRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUM7U0FDZjthQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNILENBQUM7SUFFTSxrQ0FBUyxHQUFoQixVQUFpQixNQUFNO1FBQ3JCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdEUsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLG1DQUFVLEdBQWpCLFVBQ0UsaUJBQW9DO1FBRHRDLGlCQTRCQztRQXpCQyxPQUFPLElBQUksT0FBTyxDQUFxQixVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3JELEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUMzQixpQkFBaUIsQ0FBQyxhQUFhLEVBQy9CLGlCQUFpQixDQUFDLGFBQWEsRUFDL0IsVUFBQSxL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SyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO2dCQUNwRCxDQUFDLENBQUMsQ0FBQztnQkFDSCw0REFBNEQ7Z0JBQzVELEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFFaEUsSUFBTSxRQUFRLEdBQXVCO29CQUNuQyxPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDO2dCQUVGLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTNNRCxJQTJNQztBQTNNWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGFwcFN0b3JlIH0gZnJvbSAnfi9jb3JlL2FwcC1zdG9yZSc7XG5pbXBvcnQgeyBQdEJhY2tsb2dSZXBvc2l0b3J5IH0gZnJvbSAnfi9jb3JlL2NvbnRyYWN0cy9yZXBvc2l0b3JpZXMnO1xuaW1wb3J0IHtcbiAgQ3JlYXRlSXRlbVJlcXVlc3QsXG4gIERlbGV0ZUl0ZW1SZXF1ZXN0LFxuICBGZXRjaEl0ZW1zUmVxdWVzdCxcbiAgRmV0Y2hTaW5nbGVJdGVtUmVxdWVzdCxcbiAgVXBkYXRlSXRlbVJlcXVlc3Rcbn0gZnJvbSAnfi9jb3JlL2NvbnRyYWN0cy9yZXF1ZXN0cy9iYWNrbG9nJztcbmltcG9ydCB7XG4gIENyZWF0ZUl0ZW1SZXNwb25zZSxcbiAgRGVsZXRlSXRlbVJlc3BvbnNlLFxuICBGZXRjaEl0ZW1zUmVzcG9uc2UsXG4gIEZldGNoU2luZ2xlSXRlbVJlc3BvbnNlLFxuICBVcGRhdGVJdGVtUmVzcG9uc2Vcbn0gZnJvbSAnfi9jb3JlL2NvbnRyYWN0cy9yZXNwb25zZXMvYmFja2xvZyc7XG5pbXBvcnQge1xuICBQdEFwcFN0YXRlU2VydmljZSxcbiAgUHRCYWNrbG9nU2VydmljZSxcbiAgUHRMb2dnaW5nU2VydmljZVxufSBmcm9tICd+L2NvcmUvY29udHJhY3RzL3NlcnZpY2VzJztcbmltcG9ydCB7IFB0SXRlbSB9IGZyb20gJ34vY29yZS9tb2RlbHMvZG9tYWluJztcbmltcG9ydCB7IFByaW9yaXR5RW51bSwgU3RhdHVzRW51bSB9IGZyb20gJ34vY29yZS9tb2RlbHMvZG9tYWluL2VudW1zJztcbmltcG9ydCB7IFByZXNldFR5cGUgfSBmcm9tICd+L2NvcmUvbW9kZWxzL3R5cGVzJztcbmltcG9ydCB7IHNldFVzZXJBdmF0YXIgfSBmcm9tICd+L2NvcmUvc2VydmljZXMnO1xuXG4vLyBjb25zdCBTRUxFQ1RFRF9QUkVTRVQgPSAnU0VMRUNURURfUFJFU0VUJztcbi8vIGNvbnN0IEJBQ0tMT0dfSVRFTVMgPSAnQkFDS0xPR19JVEVNUyc7XG5cbmV4cG9ydCBjbGFzcyBCYWNrbG9nU2VydmljZSBpbXBsZW1lbnRzIFB0QmFja2xvZ1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBQdExvZ2dpbmdTZXJ2aWNlLFxuICAgIHByaXZhdGUgYmFja2xvZ1JlcG86IFB0QmFja2xvZ1JlcG9zaXRvcnksXG4gICAgcHJpdmF0ZSBhcHBTdGF0ZVNlcnZpY2U6IFB0QXBwU3RhdGVTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgZ2V0Q3VycmVudFByZXNldCgpOiBQcmVzZXRUeXBlIHtcbiAgICBjb25zdCBjdXJQcmUgPSB0aGlzLmFwcFN0YXRlU2VydmljZS5nZXRTdGF0ZUl0ZW0oJ3NlbGVjdGVkUHJlc2V0Jyk7XG4gICAgaWYgKGN1clByZSkge1xuICAgICAgcmV0dXJuIGN1clByZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdvcGVuJztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlc2V0KHByZXNldCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGN1clByZXNldCA9IHRoaXMuYXBwU3RhdGVTZXJ2aWNlLmdldFN0YXRlSXRlbSgnc2VsZWN0ZWRQcmVzZXQnKTtcbiAgICBpZiAoY3VyUHJlc2V0ICE9PSBwcmVzZXQpIHtcbiAgICAgIHRoaXMuYXBwU3RhdGVTZXJ2aWNlLnNldFN0YXRlSXRlbSgnc2VsZWN0ZWRQcmVzZXQnLCBwcmVzZXQpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICBwdWJsaWMgZmV0Y2hJdGVtcyhcbiAgICBmZXRjaEl0ZW1zUmVxdWVzdDogRmV0Y2hJdGVtc1JlcXVlc3RcbiAgKTogUHJvbWlzZTxGZXRjaEl0ZW1zUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8RmV0Y2hJdGVtc1Jlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmJhY2tsb2dSZXBvLmZldGNoUHRJdGVtcyhcbiAgICAgICAgZmV0Y2hJdGVtc1JlcXVlc3QuY3VycmVudFByZXNldCxcbiAgICAgICAgZmV0Y2hJdGVtc1JlcXVlc3QuY3VycmVudFVzZXJJZCxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZXJyb3IoJ0ZldGNoIGl0ZW1zIGZhaWxlZCcpO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0sXG4gICAgICAgIChwdEl0ZW1zOiBQdEl0ZW1bXSkgPT4ge1xuICAgICAgICAgIHB0SXRlbXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIHNldFVzZXJBdmF0YXIodGhpcy5iYWNrbG9nUmVwby5hcGlFbmRwb2ludCwgaS5hc3NpZ25lZSk7XG4gICAgICAgICAgICBpLmNvbW1lbnRzLmZvckVhY2goYyA9PlxuICAgICAgICAgICAgICBzZXRVc2VyQXZhdGFyKHRoaXMuYmFja2xvZ1JlcG8uYXBpRW5kcG9pbnQsIGMudXNlcilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnNldEl0ZW0oQkFDS0xPR19JVEVNUywgcHRJdGVtcyk7XG4gICAgICAgICAgdGhpcy5hcHBTdGF0ZVNlcnZpY2Uuc2V0U3RhdGVJdGVtKCdiYWNrbG9nSXRlbXMnLCBwdEl0ZW1zKTtcbiAgICAgICAgICBjb25zdCByZXNwb25zZTogRmV0Y2hJdGVtc1Jlc3BvbnNlID0ge1xuICAgICAgICAgICAgaXRlbXM6IHB0SXRlbXNcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFB0SXRlbShcbiAgICBmZXRjaFNpbmdsZUl0ZW1SZXF1ZXN0OiBGZXRjaFNpbmdsZUl0ZW1SZXF1ZXN0XG4gICk6IFByb21pc2U8RmV0Y2hTaW5nbGVJdGVtUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8RmV0Y2hTaW5nbGVJdGVtUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2xvZ1JlcG8uZ2V0UHRJdGVtKFxuICAgICAgICBmZXRjaFNpbmdsZUl0ZW1SZXF1ZXN0LnB0SXRlbUlkLFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcignRmV0Y2ggaXRlbXMgZmFpbGVkJyk7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgKHB0SXRlbTogUHRJdGVtKSA9PiB7XG4gICAgICAgICAgc2V0VXNlckF2YXRhcih0aGlzLmJhY2tsb2dSZXBvLmFwaUVuZHBvaW50LCBwdEl0ZW0uYXNzaWduZWUpO1xuICAgICAgICAgIHB0SXRlbS5jb21tZW50cy5mb3JFYWNoKGMgPT5cbiAgICAgICAgICAgIHNldFVzZXJBdmF0YXIodGhpcy5iYWNrbG9nUmVwby5hcGlFbmRwb2ludCwgYy51c2VyKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0aGlzLmFwcFN0YXRlU2VydmljZS5zZXRTdGF0ZUl0ZW0oJ2N1cnJlbnRTZWxlY3RlZEl0ZW0nLCBwdEl0ZW0pO1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBGZXRjaFNpbmdsZUl0ZW1SZXNwb25zZSA9IHtcbiAgICAgICAgICAgIGl0ZW06IHB0SXRlbVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbUZyb21DYWNoZU9yU2VydmVyKFxuICAgIGZldGNoU2luZ2xlSXRlbVJlcXVlc3Q6IEZldGNoU2luZ2xlSXRlbVJlcXVlc3RcbiAgKTogUHJvbWlzZTxGZXRjaFNpbmdsZUl0ZW1SZXNwb25zZT4ge1xuICAgIGNvbnN0IGFsbExvY2FsSXRlbXMgPSB0aGlzLmFwcFN0YXRlU2VydmljZS5nZXRTdGF0ZUl0ZW0oJ2JhY2tsb2dJdGVtcycpO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGFsbExvY2FsSXRlbXMuZmluZChcbiAgICAgIGkgPT4gaS5pZCA9PT0gZmV0Y2hTaW5nbGVJdGVtUmVxdWVzdC5wdEl0ZW1JZFxuICAgICk7XG5cbiAgICBpZiAoc2VsZWN0ZWRJdGVtKSB7XG4gICAgICB0aGlzLmFwcFN0YXRlU2VydmljZS5zZXRTdGF0ZUl0ZW0oJ2N1cnJlbnRTZWxlY3RlZEl0ZW0nLCBzZWxlY3RlZEl0ZW0pO1xuICAgICAgY29uc3QgcmVzcG9uc2U6IEZldGNoU2luZ2xlSXRlbVJlc3BvbnNlID0ge1xuICAgICAgICBpdGVtOiBzZWxlY3RlZEl0ZW1cbiAgICAgIH07XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UHRJdGVtKGZldGNoU2luZ2xlSXRlbVJlcXVlc3QpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGROZXdQdEl0ZW0oXG4gICAgY3JlYXRlSXRlbVJlcXVlc3Q6IENyZWF0ZUl0ZW1SZXF1ZXN0XG4gICk6IFByb21pc2U8Q3JlYXRlSXRlbVJlc3BvbnNlPiB7XG4gICAgY29uc3QgaXRlbTogUHRJdGVtID0ge1xuICAgICAgaWQ6IDAsXG4gICAgICB0aXRsZTogY3JlYXRlSXRlbVJlcXVlc3QubmV3SXRlbS50aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBjcmVhdGVJdGVtUmVxdWVzdC5uZXdJdGVtLmRlc2NyaXB0aW9uLFxuICAgICAgdHlwZTogY3JlYXRlSXRlbVJlcXVlc3QubmV3SXRlbS50eXBlLFxuICAgICAgZXN0aW1hdGU6IDAsXG4gICAgICBwcmlvcml0eTogUHJpb3JpdHlFbnVtLk1lZGl1bSxcbiAgICAgIHN0YXR1czogU3RhdHVzRW51bS5PcGVuLFxuICAgICAgYXNzaWduZWU6IGNyZWF0ZUl0ZW1SZXF1ZXN0LmFzc2lnbmVlLFxuICAgICAgdGFza3M6IFtdLFxuICAgICAgY29tbWVudHM6IFtdLFxuICAgICAgZGF0ZUNyZWF0ZWQ6IG5ldyBEYXRlKCksXG4gICAgICBkYXRlTW9kaWZpZWQ6IG5ldyBEYXRlKClcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2xvZ1JlcG8uaW5zZXJ0UHRJdGVtKFxuICAgICAgICBpdGVtLFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcignQWRkaW5nIG5ldyBpdGVtIGZhaWxlZCcpO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0sXG4gICAgICAgIChuZXh0SXRlbTogUHRJdGVtKSA9PiB7XG4gICAgICAgICAgc2V0VXNlckF2YXRhcih0aGlzLmJhY2tsb2dSZXBvLmFwaUVuZHBvaW50LCBuZXh0SXRlbS5hc3NpZ25lZSk7XG5cbiAgICAgICAgICAvKlxuICAgICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2Uuc2V0SXRlbShCQUNLTE9HX0lURU1TLCBbXG4gICAgICAgICAgICBuZXh0SXRlbSxcbiAgICAgICAgICAgIC4uLnRoaXMuc3RvcmFnZVNlcnZpY2UuZ2V0SXRlbTxQdEl0ZW1bXT4oQkFDS0xPR19JVEVNUylcbiAgICAgICAgICBdKTtcbiAgICAgICAgICAqL1xuXG4gICAgICAgICAgdGhpcy5hcHBTdGF0ZVNlcnZpY2Uuc2V0U3RhdGVJdGVtKCdiYWNrbG9nSXRlbXMnLCBbXG4gICAgICAgICAgICBuZXh0SXRlbSxcbiAgICAgICAgICAgIC4uLnRoaXMuYXBwU3RhdGVTZXJ2aWNlLmdldFN0YXRlSXRlbSgnYmFja2xvZ0l0ZW1zJylcbiAgICAgICAgICBdKTtcblxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBDcmVhdGVJdGVtUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICBjcmVhdGVkSXRlbTogbmV4dEl0ZW1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlUHRJdGVtKFxuICAgIHVwZGF0ZUl0ZW1SZXF1ZXN0OiBVcGRhdGVJdGVtUmVxdWVzdFxuICApOiBQcm9taXNlPFVwZGF0ZUl0ZW1SZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxVcGRhdGVJdGVtUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2xvZ1JlcG8udXBkYXRlUHRJdGVtKFxuICAgICAgICB1cGRhdGVJdGVtUmVxdWVzdC5pdGVtVG9VcGRhdGUsXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmVycm9yKCdVcGRhdGluZyBpdGVtIGZhaWxlZCcpO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0sXG4gICAgICAgICh1cGRhdGVkSXRlbTogUHRJdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFVwZGF0ZUl0ZW1SZXNwb25zZSA9IHtcbiAgICAgICAgICAgIHVwZGF0ZWRJdGVtOiB1cGRhdGVkSXRlbVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlUHRJdGVtKFxuICAgIGRlbGV0ZUl0ZW1SZXF1ZXN0OiBEZWxldGVJdGVtUmVxdWVzdFxuICApOiBQcm9taXNlPERlbGV0ZUl0ZW1SZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxEZWxldGVJdGVtUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2xvZ1JlcG8uZGVsZXRlUHRJdGVtKFxuICAgICAgICBkZWxldGVJdGVtUmVxdWVzdC5pdGVtVG9EZWxldGUuaWQsXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmVycm9yKCdEZWxldGluZyBpdGVtIGZhaWxlZCcpO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvKlxuICAgICAgICAgIGNvbnN0IGJhY2tsb2dJdGVtcyA9IHRoaXMuc3RvcmFnZVNlcnZpY2UuZ2V0SXRlbTxQdEl0ZW1bXT4oXG4gICAgICAgICAgICBCQUNLTE9HX0lURU1TXG4gICAgICAgICAgKTtcbiAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGJhY2tsb2dJdGVtcyA9IHRoaXMuYXBwU3RhdGVTZXJ2aWNlLmdldFN0YXRlSXRlbShcbiAgICAgICAgICAgICdiYWNrbG9nSXRlbXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkSXRlbXMgPSBiYWNrbG9nSXRlbXMuZmlsdGVyKGkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGkuaWQgIT09IGRlbGV0ZUl0ZW1SZXF1ZXN0Lml0ZW1Ub0RlbGV0ZS5pZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnNldEl0ZW0oQkFDS0xPR19JVEVNUywgdXBkYXRlZEl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmFwcFN0YXRlU2VydmljZS5zZXRTdGF0ZUl0ZW0oJ2JhY2tsb2dJdGVtcycsIHVwZGF0ZWRJdGVtcyk7XG5cbiAgICAgICAgICBjb25zdCByZXNwb25zZTogRGVsZXRlSXRlbVJlc3BvbnNlID0ge1xuICAgICAgICAgICAgZGVsZXRlZDogdHJ1ZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19