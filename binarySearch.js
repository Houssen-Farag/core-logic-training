function myBinarySearch(arr, target, options = {}) {
    // 1) التحقق من صحة المدخلات (Input Validation)
    if (!Array.isArray(arr)) {
        throw new TypeError("arr يجب أن يكون Array صالح");
    }
    if (arr.length === 0) {
        return -1; // لا داعي للبحث في مصفوفة فارغة
    }
    if (typeof target !== 'number' || Number.isNaN(target)) {
        throw new TypeError("target يجب أن يكون رقم صالح");
    }

    // 2) (اختياري) التحقق من أن المصفوفة مرتبة - مكلف O(n) لكنه أمان إضافي
    if (options.validateSorted) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                throw new Error("المصفوفة غير مرتبة! Binary Search يتطلب مصفوفة مرتبة تصاعدياً");
            }
        }
    }

    let low = 0;
    let high = arr.length - 1;
    let result = -1;

    while (low <= high) {
        // 3) صيغة آمنة من Overflow (Best Practice معياري)
        let mid = low + Math.floor((high - low) / 2);

        if (arr[mid] === target) {
            result = mid;

            // 4) معالجة التكرارات: إيجاد أول ظهور أو آخر ظهور حسب الطلب
            if (options.findFirst) {
                high = mid - 1; // استمر بالبحث يساراً عن ظهور أبكر
            } else if (options.findLast) {
                low = mid + 1; // استمر بالبحث يميناً عن ظهور لاحق
            } else {
                return mid; // السلوك الافتراضي: أرجع أي تطابق فوراً
            }
        } else if (arr[mid] > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return result;
}

module.exports = myBinarySearch;