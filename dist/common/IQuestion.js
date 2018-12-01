var IQuestion = (function () {
    function IQuestion() {
        this.isChecked = false;
    }
    IQuestion.prototype.close = function () { };
    IQuestion.EVENT_YES = 'EVENT_YES';
    IQuestion.EVENT_NOT = 'EVENT_NOT';
    IQuestion.EVENT_CHECK = 'EVENT_CHECK';
    IQuestion.EVENT_UNCHECK = 'EVENT_UNCHECK';
    return IQuestion;
}());
export { IQuestion };
//# sourceMappingURL=../../src/common/IQuestion.js.map