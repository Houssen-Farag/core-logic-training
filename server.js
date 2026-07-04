// 1. استدعاء مكتبة إكسبريس ودالة البحث الخاصة بك
const express = require('express');
const myBinarySearch = require('./binarySearch');

// 2. تهيئة تطبيق الخادم
const app = express();
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