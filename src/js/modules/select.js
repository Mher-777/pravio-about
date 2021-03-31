import select2 from 'select2';

var select = {
    init: (e) => {
        $('.js-select').select2({
            minimumResultsForSearch: -1,
            dropdownAutoWidth: true,
            width: null,
            dropdownParent: $('.field__select').closest('.field')
        })
    }
}
export { select };