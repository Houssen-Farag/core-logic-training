// 1. استدعاء مكتبة إكسبريس ودالة البحث الخاصة بك
const express = require('express');
const myBinarySearch = require('./binarySearch');
const bubbleSort = require('./bubbleSort');
// 2. تهيئة تطبيق الخادم
const app = express();
app.use(express.json());
const PORT = 3000; // المنفذ الذي سيعمل عليه الخادم محلياً

// مصفوفة افتراضية مرتبة (البيانات الموثوقة التي تحدثنا عنها في خط أنابيب البيانات)
const trustedData = [2, 5, 12, 16, 17, 23, 27, 37, 60, 91, 98];

// 3. إنشاء نقطة نهاية (API Endpoint) تستقبل الطلبات
app.get('/api/search', (req, res) => {
    // استخراج الرقم المستهدف من رابط المتصفح وتحويله إلى رقم صحيح
    const targetNumber = parseInt(req.query.target);

    // حماية النظام (البرمجة الدفاعية): ماذا لو لم يرسل المستخدم رقماً؟
    if (isNaN(targetNumber)) {
        return res.status(400).json({ error: "الرجاء إدخال رقم صحيح للبحث عنه" });
    }

    // تشغيل خوارزميتك القوية
    const resultIndex = myBinarySearch(trustedData, targetNumber);

    // إرسال النتيجة للمستخدم بصيغة JSON
    if (resultIndex !== -1) {
        res.status(200).json({ message: "تم العثور على الرقم بنجاح", index: resultIndex, target: targetNumber });
    } else {
        res.status(404).json({ message: "الرقم غير موجود في قاعدة البيانات", target: targetNumber });
    }
});

// 4. تشغيل الخادم للاستماع للطلبات
app.listen(PORT, () => {
    console.log(`الخادم يعمل بنجاح على الرابط: http://localhost:${PORT}`);
});

app.post('/api/sort-data', (req, res) => {
    // استخراج المصفوفة من "جسم الطلب"
    const rawData = req.body.items; 

    // البرمجة الدفاعية: ماذا لو أرسل لنا أحدهم طرداً فارغاً أو بيانات غير صحيحة؟
    if (!rawData || !Array.isArray(rawData)) {
        return res.status(400).json({ error: "الرجاء إرسال مصفوفة بيانات (Array) صالحة بصيغة JSON" });
    }

  // تمرير البيانات الخام للخوارزمية لتنظيفها وترتيبها
    const sortedData = bubbleSort(rawData);

    // إرسال النتيجة النهائية المرتبة للمستخدم
    res.status(200).json({ 
        message: "تم استلام البيانات وترتيبها بنجاح", 
        totalItems: sortedData.length,
        data: sortedData
    });
});