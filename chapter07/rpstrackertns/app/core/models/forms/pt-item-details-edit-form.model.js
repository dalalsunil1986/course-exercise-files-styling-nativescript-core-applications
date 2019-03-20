"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ptItemToFormModel(item) {
    return {
        title: item.title,
        description: item.description,
        typeStr: item.type,
        statusStr: item.status,
        estimate: item.estimate,
        priorityStr: item.priority,
        assigneeName: item.assignee ? item.assignee.fullName : 'unassigned'
    };
}
exports.ptItemToFormModel = ptItemToFormModel;
function applyFormModelUpdatesToItem(origPtItem, itemForm, reselectedAssignee) {
    var updatedAssignee = reselectedAssignee
        ? reselectedAssignee
        : origPtItem.assignee;
    var updatedItem = Object.assign({}, origPtItem, {
        title: itemForm.title,
        description: itemForm.description,
        type: itemForm.typeStr,
        status: itemForm.statusStr,
        priority: itemForm.priorityStr,
        estimate: itemForm.estimate,
        assignee: updatedAssignee
    });
    return updatedItem;
}
exports.applyFormModelUpdatesToItem = applyFormModelUpdatesToItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHQtaXRlbS1kZXRhaWxzLWVkaXQtZm9ybS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB0LWl0ZW0tZGV0YWlscy1lZGl0LWZvcm0ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQSxTQUFnQixpQkFBaUIsQ0FBQyxJQUFZO0lBQzVDLE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1FBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU07UUFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1FBQ3ZCLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUTtRQUMxQixZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVk7S0FDcEUsQ0FBQztBQUNKLENBQUM7QUFWRCw4Q0FVQztBQUVELFNBQWdCLDJCQUEyQixDQUN6QyxVQUFrQixFQUNsQixRQUFvQyxFQUNwQyxrQkFBMEI7SUFFMUIsSUFBTSxlQUFlLEdBQUcsa0JBQWtCO1FBQ3hDLENBQUMsQ0FBQyxrQkFBa0I7UUFDcEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7SUFFeEIsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFO1FBQ2hELEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztRQUNyQixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7UUFDakMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxPQUFPO1FBQ3RCLE1BQU0sRUFBRSxRQUFRLENBQUMsU0FBUztRQUMxQixRQUFRLEVBQUUsUUFBUSxDQUFDLFdBQVc7UUFDOUIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1FBQzNCLFFBQVEsRUFBRSxlQUFlO0tBQzFCLENBQUMsQ0FBQztJQUNILE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFuQkQsa0VBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHRJdGVtLCBQdFVzZXIgfSBmcm9tICd+L2NvcmUvbW9kZWxzL2RvbWFpbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHRJdGVtRGV0YWlsc0VkaXRGb3JtTW9kZWwge1xuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICB0eXBlU3RyOiBzdHJpbmc7XG4gIHN0YXR1c1N0cjogc3RyaW5nO1xuICBlc3RpbWF0ZTogbnVtYmVyO1xuICBwcmlvcml0eVN0cjogc3RyaW5nO1xuICBhc3NpZ25lZU5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB0SXRlbVRvRm9ybU1vZGVsKGl0ZW06IFB0SXRlbSk6IFB0SXRlbURldGFpbHNFZGl0Rm9ybU1vZGVsIHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogaXRlbS50aXRsZSxcbiAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcbiAgICB0eXBlU3RyOiBpdGVtLnR5cGUsXG4gICAgc3RhdHVzU3RyOiBpdGVtLnN0YXR1cyxcbiAgICBlc3RpbWF0ZTogaXRlbS5lc3RpbWF0ZSxcbiAgICBwcmlvcml0eVN0cjogaXRlbS5wcmlvcml0eSxcbiAgICBhc3NpZ25lZU5hbWU6IGl0ZW0uYXNzaWduZWUgPyBpdGVtLmFzc2lnbmVlLmZ1bGxOYW1lIDogJ3VuYXNzaWduZWQnXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUZvcm1Nb2RlbFVwZGF0ZXNUb0l0ZW0oXG4gIG9yaWdQdEl0ZW06IFB0SXRlbSxcbiAgaXRlbUZvcm06IFB0SXRlbURldGFpbHNFZGl0Rm9ybU1vZGVsLFxuICByZXNlbGVjdGVkQXNzaWduZWU6IFB0VXNlclxuKTogUHRJdGVtIHtcbiAgY29uc3QgdXBkYXRlZEFzc2lnbmVlID0gcmVzZWxlY3RlZEFzc2lnbmVlXG4gICAgPyByZXNlbGVjdGVkQXNzaWduZWVcbiAgICA6IG9yaWdQdEl0ZW0uYXNzaWduZWU7XG5cbiAgY29uc3QgdXBkYXRlZEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnUHRJdGVtLCB7XG4gICAgdGl0bGU6IGl0ZW1Gb3JtLnRpdGxlLFxuICAgIGRlc2NyaXB0aW9uOiBpdGVtRm9ybS5kZXNjcmlwdGlvbixcbiAgICB0eXBlOiBpdGVtRm9ybS50eXBlU3RyLFxuICAgIHN0YXR1czogaXRlbUZvcm0uc3RhdHVzU3RyLFxuICAgIHByaW9yaXR5OiBpdGVtRm9ybS5wcmlvcml0eVN0cixcbiAgICBlc3RpbWF0ZTogaXRlbUZvcm0uZXN0aW1hdGUsXG4gICAgYXNzaWduZWU6IHVwZGF0ZWRBc3NpZ25lZVxuICB9KTtcbiAgcmV0dXJuIHVwZGF0ZWRJdGVtO1xufVxuIl19