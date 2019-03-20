"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var constants_1 = require("~/core/constants");
var enums_1 = require("~/core/models/domain/enums");
var modals_1 = require("~/shared/helpers/modals");
var ui_data_form_1 = require("~/shared/helpers/ui-data-form");
var detail_page_vm_1 = require("~/shared/view-models/pages/detail/detail.page.vm");
require("~/utils/converters");
var detailsVm;
var itemDetailsDataForm;
function onNavigatingTo(args) {
    var page = args.object;
    var currentItem = page.navigationContext;
    itemDetailsDataForm = page.getViewById('itemDetailsDataForm');
    detailsVm = new detail_page_vm_1.DetailViewModel(currentItem);
    page.bindingContext = detailsVm;
}
exports.onNavigatingTo = onNavigatingTo;
function onDeleteTap() {
    var options = {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item?',
        okButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    };
    // confirm with options, with promise
    dialogs_1.confirm(options).then(function (result) {
        // result can be true/false/undefined
        if (result) {
            detailsVm.deleteRequested();
        }
    });
}
exports.onDeleteTap = onDeleteTap;
function onTaskToggleTap(args) {
    var textField = args.object;
    var taskVm = textField.bindingContext;
    taskVm.onTaskToggleRequested();
}
exports.onTaskToggleTap = onTaskToggleTap;
function onTaskFocused(args) {
    var textField = args.object;
    var taskVm = textField.bindingContext;
    taskVm.onTaskFocused(textField.text);
    textField.on('textChange', function () { return taskVm.onTextChange(textField.text); });
}
exports.onTaskFocused = onTaskFocused;
function onTaskBlurred(args) {
    var textField = args.object;
    var taskVm = textField.bindingContext;
    textField.off('textChange');
    taskVm.onTaskBlurred();
}
exports.onTaskBlurred = onTaskBlurred;
function onAssigneeRowTap(args) {
    var view = args.object;
    modals_1.showModalAssigneeList(view.page, detailsVm.getSelectedAssignee()).then(function (selectedAssignee) {
        if (selectedAssignee) {
            detailsVm.setSelectedAssignee(selectedAssignee);
        }
    });
}
exports.onAssigneeRowTap = onAssigneeRowTap;
function onPropertyCommitted(args) {
    var vm = args.object.bindingContext;
    itemDetailsDataForm
        .validateAll()
        .then(function (ok) {
        if (ok) {
            vm.notifyUpdateItem();
        }
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.onPropertyCommitted = onPropertyCommitted;
function onEditorUpdate(args) {
    switch (args.propertyName) {
        case 'description':
            editorSetupDescription(args.editor);
            break;
        case 'typeStr':
            editorSetupType(args.editor);
            break;
        case 'estimate':
            editorSetupEstimate(args.editor);
            break;
        case 'priorityStr':
            editorSetupPriority(args.editor);
            break;
    }
}
exports.onEditorUpdate = onEditorUpdate;
function editorSetupDescription(editor) {
    ui_data_form_1.setMultiLineEditorFontSize(editor, 17);
}
function editorSetupType(editor) {
    ui_data_form_1.setPickerEditorImageLocation(editor);
    var selectedTypeValue = ui_data_form_1.getPickerEditorValueText(editor);
    detailsVm.updateSelectedTypeValue(selectedTypeValue);
}
function editorSetupEstimate(editor) {
    ui_data_form_1.setStepperEditorContentOffset(editor, -25, 0);
    ui_data_form_1.setStepperEditorTextPostfix(editor, 'point', 'points');
    ui_data_form_1.setStepperEditorColors(editor, constants_1.COLOR_LIGHT, constants_1.COLOR_DARK);
}
function editorSetupPriority(editor) {
    var editorPriority = editor.value;
    var selectedPriorityValue = detailsVm.updateSelectedPriorityValue(editorPriority);
    ui_data_form_1.setSegmentedEditorColor(editor, enums_1.PriorityEnum.getColor(selectedPriorityValue));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWwtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVEQUFzRTtBQUd0RSw4Q0FBMkQ7QUFDM0Qsb0RBQTBEO0FBRTFELGtEQUFnRTtBQUNoRSw4REFRdUM7QUFDdkMsbUZBQW1GO0FBRW5GLDhCQUE0QjtBQUU1QixJQUFJLFNBQTBCLENBQUM7QUFDL0IsSUFBSSxtQkFBZ0MsQ0FBQztBQUVyQyxTQUFnQixjQUFjLENBQUMsSUFBbUI7SUFDaEQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDM0MsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlELFNBQVMsR0FBRyxJQUFJLGdDQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFDbEMsQ0FBQztBQU5ELHdDQU1DO0FBRUQsU0FBZ0IsV0FBVztJQUN6QixJQUFNLE9BQU8sR0FBbUI7UUFDOUIsS0FBSyxFQUFFLGFBQWE7UUFDcEIsT0FBTyxFQUFFLDRDQUE0QztRQUNyRCxZQUFZLEVBQUUsS0FBSztRQUNuQixnQkFBZ0IsRUFBRSxRQUFRO0tBQzNCLENBQUM7SUFDRixxQ0FBcUM7SUFDckMsaUJBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFlO1FBQ3BDLHFDQUFxQztRQUNyQyxJQUFJLE1BQU0sRUFBRTtZQUNWLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWRELGtDQWNDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLElBQWU7SUFDN0MsSUFBTSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxJ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QU07SUFDakMsNENBQTZCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLDBDQUEyQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkQscUNBQXNCLENBQUMsTUFBTSxFQUFFLHVCQUFXLEVBQUUsc0JBQVUsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLE1BQU07SUFDakMsSUFBTSxjQUFjLEdBQWlCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDbEQsSUFBTSxxQkFBcUIsR0FBRyxTQUFTLENBQUMsMkJBQTJCLENBQ2pFLGNBQWMsQ0FDZixDQUFDO0lBQ0Ysc0NBQXVCLENBQUMsTUFBTSxFQUFFLG9CQUFZLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztBQUNoRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YUZvcm1FdmVudERhdGEsIFJhZERhdGFGb3JtIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtJztcbmltcG9ydCB7IENvbmZpcm1PcHRpb25zLCBjb25maXJtIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzJztcbmltcG9ydCB7IEV2ZW50RGF0YSwgTmF2aWdhdGVkRGF0YSwgUGFnZSwgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZSc7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgQ09MT1JfREFSSywgQ09MT1JfTElHSFQgfSBmcm9tICd+L2NvcmUvY29uc3RhbnRzJztcbmltcG9ydCB7IFByaW9yaXR5RW51bSB9IGZyb20gJ34vY29yZS9tb2RlbHMvZG9tYWluL2VudW1zJztcbmltcG9ydCB7IFB0SXRlbVR5cGUgfSBmcm9tICd+L2NvcmUvbW9kZWxzL2RvbWFpbi90eXBlcyc7XG5pbXBvcnQgeyBzaG93TW9kYWxBc3NpZ25lZUxpc3QgfSBmcm9tICd+L3NoYXJlZC9oZWxwZXJzL21vZGFscyc7XG5pbXBvcnQge1xuICBnZXRQaWNrZXJFZGl0b3JWYWx1ZVRleHQsXG4gIHNldE11bHRpTGluZUVkaXRvckZvbnRTaXplLFxuICBzZXRQaWNrZXJFZGl0b3JJbWFnZUxvY2F0aW9uLFxuICBzZXRTZWdtZW50ZWRFZGl0b3JDb2xvcixcbiAgc2V0U3RlcHBlckVkaXRvckNvbG9ycyxcbiAgc2V0U3RlcHBlckVkaXRvckNvbnRlbnRPZmZzZXQsXG4gIHNldFN0ZXBwZXJFZGl0b3JUZXh0UG9zdGZpeFxufSBmcm9tICd+L3NoYXJlZC9oZWxwZXJzL3VpLWRhdGEtZm9ybSc7XG5pbXBvcnQgeyBEZXRhaWxWaWV3TW9kZWwgfSBmcm9tICd+L3NoYXJlZC92aWV3LW1vZGVscy9wYWdlcy9kZXRhaWwvZGV0YWlsLnBhZ2Uudm0nO1xuaW1wb3J0IHsgUHRUYXNrVmlld01vZGVsIH0gZnJvbSAnfi9zaGFyZWQvdmlldy1tb2RlbHMvcGFnZXMvZGV0YWlsL3B0LXRhc2sudm0nO1xuaW1wb3J0ICd+L3V0aWxzL2NvbnZlcnRlcnMnO1xuXG5sZXQgZGV0YWlsc1ZtOiBEZXRhaWxWaWV3TW9kZWw7XG5sZXQgaXRlbURldGFpbHNEYXRhRm9ybTogUmFkRGF0YUZvcm07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XG4gIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcbiAgY29uc3QgY3VycmVudEl0ZW0gPSBwYWdlLm5hdmlnYXRpb25Db250ZXh0O1xuICBpdGVtRGV0YWlsc0RhdGFGb3JtID0gcGFnZS5nZXRWaWV3QnlJZCgnaXRlbURldGFpbHNEYXRhRm9ybScpO1xuICBkZXRhaWxzVm0gPSBuZXcgRGV0YWlsVmlld01vZGVsKGN1cnJlbnRJdGVtKTtcbiAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IGRldGFpbHNWbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uRGVsZXRlVGFwKCkge1xuICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICB0aXRsZTogJ0RlbGV0ZSBJdGVtJyxcbiAgICBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/JyxcbiAgICBva0J1dHRvblRleHQ6ICdZZXMnLFxuICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnXG4gIH07XG4gIC8vIGNvbmZpcm0gd2l0aCBvcHRpb25zLCB3aXRoIHByb21pc2VcbiAgY29uZmlybShvcHRpb25zKS50aGVuKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAvLyByZXN1bHQgY2FuIGJlIHRydWUvZmFsc2UvdW5kZWZpbmVkXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgZGV0YWlsc1ZtLmRlbGV0ZVJlcXVlc3RlZCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblRhc2tUb2dnbGVUYXAoYXJnczogRXZlbnREYXRhKSB7XG4gIGNvbnN0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gIGNvbnN0IHRhc2tWbSA9IDxQdFRhc2tWaWV3TW9kZWw+dGV4dEZpZWxkLmJpbmRpbmdDb250ZXh0O1xuICB0YXNrVm0ub25UYXNrVG9nZ2xlUmVxdWVzdGVkKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblRhc2tGb2N1c2VkKGFyZ3M6IEV2ZW50RGF0YSkge1xuICBjb25zdCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICBjb25zdCB0YXNrVm0gPSA8UHRUYXNrVmlld01vZGVsPnRleHRGaWVsZC5iaW5kaW5nQ29udGV4dDtcbiAgdGFza1ZtLm9uVGFza0ZvY3VzZWQodGV4dEZpZWxkLnRleHQpO1xuXG4gIHRleHRGaWVsZC5vbigndGV4dENoYW5nZScsICgpID0+IHRhc2tWbS5vblRleHRDaGFuZ2UodGV4dEZpZWxkLnRleHQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVGFza0JsdXJyZWQoYXJnczogRXZlbnREYXRhKSB7XG4gIGNvbnN0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gIGNvbnN0IHRhc2tWbSA9IDxQdFRhc2tWaWV3TW9kZWw+dGV4dEZpZWxkLmJpbmRpbmdDb250ZXh0O1xuICB0ZXh0RmllbGQub2ZmKCd0ZXh0Q2hhbmdlJyk7XG4gIHRhc2tWbS5vblRhc2tCbHVycmVkKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkFzc2lnbmVlUm93VGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xuICBjb25zdCB2aWV3ID0gPFZpZXc+YXJncy5vYmplY3Q7XG5cbiAgc2hvd01vZGFsQXNzaWduZWVMaXN0KHZpZXcucGFnZSwgZGV0YWlsc1ZtLmdldFNlbGVjdGVkQXNzaWduZWUoKSkudGhlbihcbiAgICBzZWxlY3RlZEFzc2lnbmVlID0+IHtcbiAgICAgIGlmIChzZWxlY3RlZEFzc2lnbmVlKSB7XG4gICAgICAgIGRldGFpbHNWbS5zZXRTZWxlY3RlZEFzc2lnbmVlKHNlbGVjdGVkQXNzaWduZWUpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uUHJvcGVydHlDb21taXR0ZWQoYXJnczogRGF0YUZvcm1FdmVudERhdGEpIHtcbiAgY29uc3Qgdm0gPSA8RGV0YWlsVmlld01vZGVsPmFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0O1xuXG4gIGl0ZW1EZXRhaWxzRGF0YUZvcm1cbiAgICAudmFsaWRhdGVBbGwoKVxuICAgIC50aGVuKG9rID0+IHtcbiAgICAgIGlmIChvaykge1xuICAgICAgICB2bS5ub3RpZnlVcGRhdGVJdGVtKCk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uRWRpdG9yVXBkYXRlKGFyZ3M6IERhdGFGb3JtRXZlbnREYXRhKSB7XG4gIHN3aXRjaCAoYXJncy5wcm9wZXJ0eU5hbWUpIHtcbiAgICBjYXNlICdkZXNjcmlwdGlvbic6XG4gICAgICBlZGl0b3JTZXR1cERlc2NyaXB0aW9uKGFyZ3MuZWRpdG9yKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3R5cGVTdHInOlxuICAgICAgZWRpdG9yU2V0dXBUeXBlKGFyZ3MuZWRpdG9yKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VzdGltYXRlJzpcbiAgICAgIGVkaXRvclNldHVwRXN0aW1hdGUoYXJncy5lZGl0b3IpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHJpb3JpdHlTdHInOlxuICAgICAgZWRpdG9yU2V0dXBQcmlvcml0eShhcmdzLmVkaXRvcik7XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBlZGl0b3JTZXR1cERlc2NyaXB0aW9uKGVkaXRvcikge1xuICBzZXRNdWx0aUxpbmVFZGl0b3JGb250U2l6ZShlZGl0b3IsIDE3KTtcbn1cblxuZnVuY3Rpb24gZWRpdG9yU2V0dXBUeXBlKGVkaXRvcikge1xuICBzZXRQaWNrZXJFZGl0b3JJbWFnZUxvY2F0aW9uKGVkaXRvcik7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZVZhbHVlID0gPFB0SXRlbVR5cGU+Z2V0UGlja2VyRWRpdG9yVmFsdWVUZXh0KGVkaXRvcik7XG4gIGRldGFpbHNWbS51cGRhdGVTZWxlY3RlZFR5cGVWYWx1ZShzZWxlY3RlZFR5cGVWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGVkaXRvclNldHVwRXN0aW1hdGUoZWRpdG9yKSB7XG4gIHNldFN0ZXBwZXJFZGl0b3JDb250ZW50T2Zmc2V0KGVkaXRvciwgLTI1LCAwKTtcbiAgc2V0U3RlcHBlckVkaXRvclRleHRQb3N0Zml4KGVkaXRvciwgJ3BvaW50JywgJ3BvaW50cycpO1xuICBzZXRTdGVwcGVyRWRpdG9yQ29sb3JzKGVkaXRvciwgQ09MT1JfTElHSFQsIENPTE9SX0RBUkspO1xufVxuXG5mdW5jdGlvbiBlZGl0b3JTZXR1cFByaW9yaXR5KGVkaXRvcikge1xuICBjb25zdCBlZGl0b3JQcmlvcml0eSA9IDxQcmlvcml0eUVudW0+ZWRpdG9yLnZhbHVlO1xuICBjb25zdCBzZWxlY3RlZFByaW9yaXR5VmFsdWUgPSBkZXRhaWxzVm0udXBkYXRlU2VsZWN0ZWRQcmlvcml0eVZhbHVlKFxuICAgIGVkaXRvclByaW9yaXR5XG4gICk7XG4gIHNldFNlZ21lbnRlZEVkaXRvckNvbG9yKGVkaXRvciwgUHJpb3JpdHlFbnVtLmdldENvbG9yKHNlbGVjdGVkUHJpb3JpdHlWYWx1ZSkpO1xufVxuIl19