const firebaseConfig = {
    apiKey: "AIzaSyDn-rNJ2ak3I0DdfzTZmXKjePDdgxhfyIY",
    authDomain: "n2la-642d3.firebaseapp.com",
    projectId: "n2la-642d3",
    storageBucket: "n2la-642d3.firebasestorage.app",
    messagingSenderId: "1085749997466",
    appId: "1:1085749997466:web:13e5535dc6d2312397d423",
    measurementId: "G-KH4ZYFB8LC"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

let currentCompanyId = localStorage.getItem('current_company_id') || 'company_main';
let storedPin = '01036';
let currentUserRole = localStorage.getItem('current_user_role') || ''; 
let loggedInDriverName = localStorage.getItem('logged_in_driver_name') || '';
let viewingProfileName = null;

let visitorGPS = '';
let visitorImgBase64 = '';
let currentGPS = '';
let uploadedImgBase64 = '';

let currentChatTarget = 'general';
let communityFilesArr = [];
let profileWallFilesArr = [];

let appData = { 
    shipments: [], trucks: [], customers: [], expenses: [], treasury: [], docs: [], 
    drivers: [], chat: [], posts: [], communityPosts: [], consolidatedInvoices: [], deferredInvoices: [], subscriptionRequests: [], biometricCredentials: [],
    newsText: '🌟 نظام سحابي آمن بالكامل مع العزل التام للشركات ومصادقة البصمة البيومترية الإصدار V10 PRO 🚀'
};

// دالة الانتقال الآمن وتمرير الجلسة لجميع صفحات التطبيق الفرعية
function goToAuthenticatedPage(pageName) {
    if (window.CapacitorNative) CapacitorNative.vibrate();
    const userId = loggedInDriverName || localStorage.getItem('logged_in_driver_name') || '';
    const companyId = currentCompanyId || localStorage.getItem('current_company_id') || 'company_main';
    const role = currentUserRole || localStorage.getItem('current_user_role') || 'driver';
    
    localStorage.setItem('na2la_active_session', JSON.stringify({ userId, companyId, role, timestamp: Date.now() }));
    const separator = pageName.includes('?') ? '&' : '?';
    window.location.href = `${pageName}${separator}userId=${encodeURIComponent(userId)}&companyId=${encodeURIComponent(companyId)}&role=${encodeURIComponent(role)}`;
}

// دالة حماية النصوص ضد ثغرات XSS
function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// دالة موحدة لحفظ وتنزيل الملفات (PNG / PDF / Excel) على تطبيق الأندرويد Native والمتصفح
async function saveNativeOrWebFile(base64Data, fileName, mimeType) {
    const pureBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;

    // 1. الحفظ المباشر في مجلد التنزيلات (Downloads) عبر جسر الأندرويد AndroidBridge
    if (window.AndroidBridge && typeof window.AndroidBridge.saveBase64File === 'function') {
        window.AndroidBridge.saveBase64File(pureBase64, fileName, mimeType);
        return;
    }

    // 2. الحفظ والمشاركة عبر إضافات Capacitor الرسمية (Filesystem + Share)
    if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
        try {
            const plugins = window.Capacitor.Plugins || {};
            if (plugins.Filesystem && plugins.Share) {
                const savedFile = await plugins.Filesystem.writeFile({
                    path: fileName,
                    data: pureBase64,
                    directory: 'CACHE'
                });
                await plugins.Share.share({
                    title: fileName,
                    url: savedFile.uri,
                    dialogTitle: 'حفظ أو مشاركة الملف'
                });
                return;
            }
        } catch (err) {
            alert('تعذر حفظ الملف على الهاتف: ' + err.message);
            return;
        }
    }

    // 3. التحميل القياسي لمتصفحات الويب
    const link = document.createElement('a');
    link.download = fileName;
    link.href = base64Data.startsWith('data:') ? base64Data : `data:${mimeType};base64,${pureBase64}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function verifyBiometricAuth() {
    try {
        if (window.PublicKeyCredential && await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()) {
            const challenge = new Uint8Array(32);
            window.crypto.getRandomValues(challenge);
            const credential = await navigator.credentials.get({
                publicKey: {
                    challenge: challenge,
                    timeout: 60000,
                    userVerification: "required"
                }
            });
            return !!credential;
        } else {
            alert("⚠️ هذا الجهاز لا يدعم قارئ البصمة البيومترية بشكل مباشر أو تم إلغاؤه.");
            return false;
        }
    } catch (err) {
        console.error("Biometric Verification Failed:", err);
        return false;
    }
}

async function registerNewUserBiometricDevice() {
    try {
        if (!window.PublicKeyCredential) {
            alert('المتصفح أو الجهاز لا يدعم WebAuthn.');
            return;
        }
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);
        const userId = new TextEncoder().encode(loggedInDriverName || 'admin');

        const cred = await navigator.credentials.create({
            publicKey: {
                challenge,
                rp: { name: "Na2la Pro" },
                user: { id: userId, name: loggedInDriverName, displayName: loggedInDriverName },
                pubKeyCredParams: [{ alg: -7, type: "public-key" }],
                authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
                timeout: 60000
            }
        });

        if (cred) {
            const docId = String(Date.now());
            await db.collection('biometricCredentials').doc(docId).set({
                id: docId,
                companyId: currentCompanyId,
                driverName: loggedInDriverName,
                credentialId: cred.id.slice(0, 22) + '...',
                type: 'Platform Biometric (Fingerprint/Face)',
                createdAt: new Date().toLocaleDateString('ar-EG')
            });
            alert('تم ربط بصمة الجهاز بحسابك بنجاح! 👆✅');
            renderBiometricManagementTable();
        }
    } catch (err) {
        alert('تعذر تسجيل البصمة: ' + err.message);
    }
}

async function performUnifiedLogin() {
    const identifier = document.getElementById('login-identifier').value.trim();
    const pin = document.getElementById('login-pin-input').value.trim();

    if (!identifier || !pin) {
        alert('الرجاء إدخال (الاسم أو رقم الهاتف) مع (الرقم السري PIN) للمطابقة الصحيحة!');
        return;
    }

    try {
        let authEmail = '';
        const authPass = pin + '_Na2laSecure2026!';

        if (identifier === 'كرم عجاج' || identifier === 'كرم حمدي' || identifier === 'admin' || identifier === '01114099799') {
            authEmail = 'haretg@gmail.com';
        } else {
            const cleanPhone = identifier.replace(/[^0-9]/g, '');
            authEmail = 'user_' + (cleanPhone || 'id') + '@na2la.net';
        }

        try {
            await auth.signInWithEmailAndPassword(authEmail, authPass);
        } catch (authErr) {
            if (identifier === 'كرم عجاج' || identifier === 'كرم حمدي' || identifier === 'admin' || identifier === '01114099799') {
                await auth.createUserWithEmailAndPassword(authEmail, authPass);
            } else {
                throw new Error('بيانات الحساب أو الرقم السري (PIN) غير صحيح.');
            }
        }

        const snapshot = await db.collection('drivers').limit(100).get();
        let matchedUser = null;
        
        snapshot.forEach(doc => {
            let d = doc.data();
            if ((d.name === identifier || d.phone === identifier || d.companyId === identifier) && String(d.pin).trim() === pin) {
                matchedUser = { id: doc.id, ...d };
            }
        });

        if (!matchedUser && (identifier === 'كرم عجاج' || identifier === 'كرم حمدي' || identifier === '01114099799' || identifier === 'admin')) {
            currentUserRole = 'admin';
            loggedInDriverName = 'كرم عجاج';
            currentCompanyId = 'company_main';
            finishSuccessfulLogin();
            return;
        }

        if (!matchedUser) {
            alert('⚠️ الحساب غير موجود في قاعدة البيانات السحابية أو الرقم السري (PIN) غير صحيح!');
            return;
        }

        loggedInDriverName = matchedUser.name;
        currentCompanyId = matchedUser.companyId || 'company_main';
        
        if (matchedUser.name === 'كرم عجاج' || matchedUser.role === 'admin' || matchedUser.role === 'مدير نظام') {
            currentUserRole = 'admin';
        } else if (matchedUser.role === 'مشرف') {
            currentUserRole = 'supervisor';
        } else {
            currentUserRole = 'driver';
        }

        finishSuccessfulLogin();
    } catch (err) {
        alert('خطأ في المصادقة الأمنية أو الاتصال بالسحابة: ' + err.message);
    }
}

async function testCurrentBiometricAuth() {
    const passed = await verifyBiometricAuth();
    if (passed) {
        alert('✅ تم نجاح اختبار المصادقة البيومترية وبصمة الإصبع بامتياز!');
    } else {
        alert('❌ فشل التحقق البيومتري.');
    }
}

let biometricUnsubscribe = null;
function renderBiometricManagementTable() {
    const tbody = document.getElementById('biometric-credentials-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (biometricUnsubscribe) biometricUnsubscribe();

    let queryRef = db.collection('biometricCredentials').where('companyId', '==', currentCompanyId).limit(50);

    biometricUnsubscribe = queryRef.onSnapshot(snapshot => {
        tbody.innerHTML = '';
        let list = [];
        snapshot.forEach(doc => {
            let d = doc.data();
            if (loggedInDriverName === 'كرم عجاج' || loggedInDriverName === 'كرم حمدي' || d.driverName === loggedInDriverName) {
                list.push({ id: doc.id, ...d });
            }
        });

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; opacity:0.7; padding:12px;">لا توجد بصمات أو أجهزة بيومترية مسجلة حالياً.</td></tr>`;
            return;
        }

        list.forEach(item => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:bold;">${escapeHTML(item.driverName)}</td>
                <td><code>${escapeHTML(item.credentialId)}</code></td>
                <td>${escapeHTML(item.type)}</td>
                <td>${escapeHTML(item.createdAt)}</td>
                <td><button type="button" class="btn-danger btn-sm" onclick="deleteBiometricCredential('${item.id}')">حذف البصمة 🗑️</button></td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function deleteBiometricCredential(id) {
    if (confirm('هل أنت متأكد من حذف ربط هذه البصمة البيومترية؟')) {
        db.collection('biometricCredentials').doc(String(id)).delete().then(() => {
            alert('تم حذف البصمة بنجاح.');
            renderBiometricManagementTable();
        });
    }
}

function adjustCoverHeight(delta) {
    let drv = getCurrentDriver();
    let newH = Math.min(350, Math.max(110, (drv.coverHeight || 180) + delta));
    drv.coverHeight = newH;
    db.collection('drivers').doc(String(drv.id)).set({ coverHeight: newH }, { merge: true });
    renderMyAccount();
}

function renderCompaniesManagementTable() {
    if (loggedInDriverName !== 'كرم عجاج') return;
    const query = (document.getElementById('companies-section-search')?.value || '').toLowerCase();
    const tbody = document.getElementById('companies-management-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    let drivers = appData.drivers || [];
    let adminsOrCompanies = drivers.filter(d => d.role === 'admin' || d.companyId);

    let filtered = adminsOrCompanies.filter(d => {
        let name = (d.name || '').toLowerCase();
        let comp = (d.companyName || '').toLowerCase();
        let phone = d.phone || '';
        return name.includes(query) || comp.includes(query) || phone.includes(query);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; opacity:0.7; padding:12px;">لا توجد شركات مسجلة مطابقة للبحث.</td></tr>`;
        return;
    }

    filtered.forEach(d => {
        let status = d.subStatus || 'active';
        let statusBadge = status === 'active' ? '<span class="badge" style="background:#10b981;">نشط ✅</span>' : '<span class="badge" style="background:#ef4444;">منتهي ⚠️</span>';
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:bold;">${escapeHTML(d.companyName || 'شركة أسطورة الطريق')}</td>
            <td>${escapeHTML(d.name || '-')}</td>
            <td>${escapeHTML(d.phone || '-')}</td>
            <td><strong>${escapeHTML(d.subPlan || 'monthly')}</strong></td>
            <td style="color:var(--danger);">${escapeHTML(d.subExpiry || 'غير محدد')}</td>
            <td>${statusBadge}</td>
            <td>
                <button type="button" class="btn-success btn-sm" onclick="updateMemberSub('${escapeHTML(d.id)}')">تجديد 🚀</button>
                <select id="plan-select-${escapeHTML(d.id)}" style="font-size:9px; padding:2px; display:inline-block; width:auto; margin-bottom:0;">
                    <option value="monthly">شهري</option>
                    <option value="quarterly">ربع سنوي</option>
                    <option value="yearly">سنوي</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openCashModal() { document.getElementById('cashPayModal').style.display = 'flex'; }
function openMasterEnquiryModal() { document.getElementById('masterEnquiryModal').style.display = 'flex'; }

function openAddCompanyModal() {
    if (loggedInDriverName !== 'كرم عجاج') {
        alert('عذراً، إضافة الشركات الجديدة مقتصرة على الماستر أدمن الأساسي (كرم عجاج) فقط!');
        return;
    }
    document.getElementById('addCompanyModal').style.display = 'flex';
}

async function handleCreateCompanySubmit() {
    if (loggedInDriverName !== 'كرم عجاج') {
        alert('عذراً، غير مسموح لك بإجراء هذه العملية!');
        return;
    }

    const companyName = document.getElementById('new-comp-name').value.trim();
    const adminName = document.getElementById('new-comp-admin-name').value.trim();
    const adminPhone = document.getElementById('new-comp-admin-phone').value.trim();
    const adminPin = document.getElementById('new-comp-admin-pin').value.trim();
    const months = Number(document.getElementById('new-comp-plan').value);

    if (!companyName || !adminName || !adminPhone || !adminPin) {
        alert('الرجاء إكمال كافة البيانات المطلوبة!');
        return;
    }

    const newCompanyId = 'comp_' + Date.now();
    const newAdminId = String(Date.now());
    
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);
    const expiryStr = expiryDate.toISOString().split('T')[0];

    const authEmail = 'comp_' + adminPhone.replace(/[^0-9]/g, '') + '@na2la.net';
    const authPassword = adminPin + '_Na2laSecure2026!';

    try {
        let userCredential = await auth.createUserWithEmailAndPassword(authEmail, authPassword).catch(async () => {
            return await auth.signInWithEmailAndPassword(authEmail, authPassword);
        });
        let authUid = userCredential.user ? userCredential.user.uid : newAdminId;

        const newCompanyAdmin = {
            id: authUid,
            companyId: newCompanyId,
            companyName: companyName,
            name: adminName,
            phone: adminPhone,
            pin: adminPin,
            role: 'admin',
            title: 'مدير شركة - ' + companyName,
            status: 'متاح 🟢',
            subPlan: months === 12 ? 'yearly' : (months === 3 ? 'quarterly' : 'monthly'),
            subStatus: 'active',
            subExpiry: expiryStr,
            createdAt: new Date().toISOString()
        };

        await db.collection('drivers').doc(authUid).set(newCompanyAdmin);

        closeModal('addCompanyModal');
        document.getElementById('new-company-form').reset();
        alert(`تم إنشاء شركة (${companyName}) معزولة وموثقة بنجاح تام! 🎉\nمعرف الشركة: ${newCompanyId}\nتاريخ انتهاء الاشتراك: ${expiryStr}`);
        
        renderMemberSubscriptionsList();
        renderCompaniesManagementTable();
        renderDriversListTable();
        render();
    } catch (err) {
        alert('حدث خطأ أثناء إنشاء الشركة سحابياً: ' + err.message);
    }
}

async function submitCashSubscription() {
    const months = Number(document.getElementById('sub-plan-months')?.value || 1);
    const walletEl = document.getElementById('sub-target-wallet');
    const wallet = walletEl ? walletEl.value : 'الدعم الفني والحسابات';
    const phone = document.getElementById('sub-sender-phone')?.value.trim();
    const txRef = document.getElementById('sub-tx-ref')?.value.trim();

    if (!phone || !txRef) {
        alert('الرجاء كتابة رقم الهاتف وتفاصيل الاستفسار أولاً!');
        return;
    }

    const currentUid = auth.currentUser ? auth.currentUser.uid : null;
    let drvId = currentUid || 'guest_' + Date.now();
    let drvName = loggedInDriverName || 'زائر / زبون';
    let compId = currentCompanyId || 'company_main';

    const reqId = String(Date.now());
    const reqObj = {
        id: reqId,
        type: 'support_ticket',
        companyId: compId,
        driverId: drvId,
        driverName: drvName,
        targetWallet: wallet,
        senderPhone: phone,
        transactionRef: txRef,
        months: months,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    try {
        if (!auth.currentUser) {
            await auth.signInAnonymously().catch(() => {});
        }
        await db.collection('subscription_requests').doc(reqId).set(reqObj);
        closeModal('cashPayModal');
        if (document.getElementById('cash-sub-form')) document.getElementById('cash-sub-form').reset();
        alert('تم إرسال الشكوى/الاستفسار إلى الدعم الفني بنجاح! 🚀');
    } catch (err) {
        alert('فشل حفظ الطلب في السحابة: ' + (err.message || 'تأكد من الاتصال بالإنترنت'));
    }
}

function enquirePaymentCode() {
    const query = (document.getElementById('master-code-search-input').value || '').trim().toLowerCase();
    const container = document.getElementById('master-enquiry-results');
    if (!query) { alert('الرجاء إدخال كود العملية المرجعي أو رقم المحفظة للاستعلام!'); return; }

    container.innerHTML = '<p style="opacity:0.7;">جاري الاستعلام في Firestore...</p>';

    db.collection('subscription_requests').limit(50).get().then(snapshot => {
        container.innerHTML = '';
        let matches = [];
        snapshot.forEach(doc => {
            let d = doc.data();
            if ((d.transactionRef && d.transactionRef.toLowerCase().includes(query)) || (d.senderPhone && d.senderPhone.includes(query)) || (d.driverName && d.driverName.toLowerCase().includes(query))) {
                matches.push({ id: doc.id, ...d });
            }
        });

        if (matches.length === 0) {
            container.innerHTML = '<p style="color:var(--danger); font-weight:bold;">لم يتم العثور على أية طلبات تطابق كود أو رقم الاستعلام المدخل!</p>';
            return;
        }

        matches.forEach(m => {
            let st = m.status === 'approved' ? '<span style="color:var(--success);">مفعل ومقبول ✅</span>' : '<span style="color:var(--warning);">معلق للقبول ⏳</span>';
            let div = document.createElement('div');
            div.style.cssText = 'background:var(--bg); border:1px solid var(--border-color); padding:10px; border-radius:8px; margin-bottom:8px;';
            div.innerHTML = `
                <p><strong>المرسل:</strong> ${escapeHTML(m.driverName)} (${escapeHTML(m.senderPhone)})</p>
                <p><strong>كود العملية المرجعي:</strong> <span style="color:var(--accent); font-weight:bold;">${escapeHTML(m.transactionRef)}</span></p>
                <p><strong>القسم المستهدف:</strong> ${escapeHTML(m.targetWallet)}</p>
                <p><strong>مدة الاشتراك المطلوبة:</strong> ${m.months} شهور | <strong>الحالة:</strong> ${st}</p>
                ${m.status === 'pending' ? `<button type="button" class="btn-success btn-sm" onclick="approveSubscriptionRequest('${escapeHTML(m.id)}', '${escapeHTML(m.driverId)}', ${m.months})">تأكيد الاستلام وتفعيل الاشتراك فوراً 🚀</button>` : ''}
            `;
            container.appendChild(div);
        });
    });
}

async function approveSubscriptionRequest(reqId, driverId, months) {
    if (loggedInDriverName !== 'كرم عجاج') { 
        alert('عذراً، تفعيل الاشتراكات مخصص للماستر أدمن الأساسي (كرم عجاج) فقط!'); 
        return; 
    }

    try {
        const reqDoc = await db.collection('subscription_requests').doc(String(reqId)).get();
        const reqData = reqDoc.exists ? reqDoc.data() : null;

        let targetDriverDoc = null;
        const driversSnapshot = await db.collection('drivers').limit(100).get();
        
        driversSnapshot.forEach(doc => {
            let d = doc.data();
            if (doc.id === String(driverId) || (reqData && (d.phone === reqData.senderPhone || d.name === reqData.driverName))) {
                targetDriverDoc = { id: doc.id, ...d };
            }
        });

        if (!targetDriverDoc) {
            alert('لم يتم العثور على حساب العضو/الشركة المرتبط بهذا الطلب!');
            return;
        }

        let currentExpiry = targetDriverDoc.subExpiry ? new Date(targetDriverDoc.subExpiry) : new Date();
        if (isNaN(currentExpiry.getTime()) || currentExpiry < new Date()) currentExpiry = new Date();
        
        currentExpiry.setMonth(currentExpiry.getMonth() + Number(months));
        let newExpiryStr = currentExpiry.toISOString().split('T')[0];

        await db.collection('drivers').doc(targetDriverDoc.id).set({
            subStatus: 'active',
            subPlan: months === 12 ? 'yearly' : (months === 3 ? 'quarterly' : 'monthly'),
            subExpiry: newExpiryStr
        }, { merge: true });

        await db.collection('subscription_requests').doc(String(reqId)).set({ status: 'approved' }, { merge: true });

        alert(`تم تفعيل اشتراك العضو/الشركة (${targetDriverDoc.name || targetDriverDoc.companyName}) بنجاح حتى تاريخ: ${newExpiryStr} ✅🚀`);
        
        renderAdminPendingCashRequests();
        renderMemberSubscriptionsList();
        renderCompaniesManagementTable();
        render();
    } catch (err) {
        alert('حدث خطأ أثناء تفعيل الاشتراك: ' + err.message);
    }
}

async function deleteSupportTicket(reqId) {
    if (!reqId) return;
    if (!confirm('هل أنت متأكد من حذف هذا الطلب / الشكوى نهائياً؟')) return;
    try {
        await db.collection('subscription_requests').doc(String(reqId)).delete();
        alert('تم حذف الطلب بنجاح! 🗑️');
    } catch (err) {
        alert('حدث خطأ أثناء الحذف: ' + err.message);
    }
}
window.deleteSupportTicket = deleteSupportTicket;

let cashReqUnsubscribe = null;
function renderAdminPendingCashRequests() {
    if (currentUserRole !== 'admin' && loggedInDriverName !== 'كرم عجاج') return;
    const container = document.getElementById('admin-pending-cash-requests');
    if (!container) return;

    if (cashReqUnsubscribe) cashReqUnsubscribe();

    cashReqUnsubscribe = db.collection('subscription_requests')
        .where('status', '==', 'pending')
        .limit(50)
        .onSnapshot(snapshot => {
            container.innerHTML = '';
            if (snapshot.empty) {
                container.innerHTML = '<p style="font-size:10px; opacity:0.8; text-align:center;">لا توجد طلبات تواصل أو استفسارات معلقة حالياً.</p>';
                return;
            }

            snapshot.forEach(doc => {
                let m = doc.data();
                let docId = doc.id;

                let div = document.createElement('div');
                div.style.cssText = 'background:var(--bg); border:1px solid var(--border-color); padding:8px; border-radius:8px; margin-bottom:6px; font-size:10px;';
                div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <strong>👤 ${escapeHTML(m.driverName || 'زائر')} (${escapeHTML(m.senderPhone || '-')})</strong>
                        <span style="color:var(--accent); font-weight:bold;">البيان: ${escapeHTML(m.transactionRef || '-')}</span>
                    </div>
                    <p style="margin-top:4px;">القسم: ${escapeHTML(m.targetWallet || 'الدعم الفني')}</p>
                    <div style="display:flex; gap:6px; margin-top:6px;" class="btn-group"></div>
                `;

                const btnGroup = div.querySelector('.btn-group');
                const approveBtn = document.createElement('button');
                approveBtn.type = 'button';
                approveBtn.className = 'btn-success btn-sm';
                approveBtn.style.flex = '1';
                approveBtn.textContent = 'تأكيد التواصل والتفعيل 🚀';
                approveBtn.onclick = () => approveSubscriptionRequest(docId, m.driverId || '', m.months || 1);

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'btn-danger btn-sm';
                deleteBtn.textContent = '🗑️ حذف';
                deleteBtn.onclick = () => deleteSupportTicket(docId);

                btnGroup.appendChild(approveBtn);
                btnGroup.appendChild(deleteBtn);
                container.appendChild(div);
            });
        });
}

async function finishOAuthLogin(user, role) {
    currentUserRole = role;
    const userName = user.displayName || user.email || user.phoneNumber || 'سائق معتمد';
    const userPhone = user.phoneNumber || '';
    const userPhoto = user.photoURL || '';
    const userEmail = user.email || '';

    try {
        const snapshot = await db.collection('drivers').limit(100).get();
        let existingDrv = null;

        snapshot.forEach(doc => {
            let d = doc.data();
            if (doc.id === user.uid || (userPhone && d.phone === userPhone) || (userEmail && d.email === userEmail) || (userPhone && d.phone && d.phone.slice(-9) === userPhone.slice(-9))) {
                existingDrv = { id: doc.id, ...d };
            }
        });

        if (!existingDrv) {
            let pinInput = prompt("أهلاً بك! أدخل الرقم السري (PIN) المخصص لحسابك الجديد:") || "01036";
            let newId = user.uid;
            let newDrv = {
                id: newId,
                companyId: currentCompanyId,
                companyName: 'أسطورة الطريق الرئيسية',
                name: userName,
                phone: userPhone || prompt("أدخل رقم هاتفك الصحيح:") || '01000000000',
                email: userEmail,
                pin: pinInput,
                role: role || 'سائق',
                title: 'سائق معتمد',
                status: 'متاح 🟢',
                avatar: userPhoto,
                cover: '',
                coverHeight: 180,
                subPlan: 'monthly',
                subStatus: 'active',
                subExpiry: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]
            };
            await db.collection('drivers').doc(newId).set(newDrv);
            loggedInDriverName = newDrv.name;
        } else {
            loggedInDriverName = existingDrv.name;
            currentCompanyId = existingDrv.companyId || 'company_main';
            localStorage.setItem('current_company_id', currentCompanyId);
            
            existingDrv.avatar = userPhoto || existingDrv.avatar;
            existingDrv.email = userEmail || existingDrv.email;
            if(userPhone) existingDrv.phone = userPhone;
            await db.collection('drivers').doc(String(existingDrv.id || user.uid)).set(existingDrv, { merge: true });

            if (existingDrv.name === 'كرم عجاج' || existingDrv.role === 'admin' || existingDrv.role === 'مدير نظام' || existingDrv.role === 'مدير مساعد') {
                currentUserRole = 'admin';
            } else if (existingDrv.role === 'مشرف') {
                currentUserRole = 'supervisor';
            } else {
                currentUserRole = 'driver';
            }
        }

        localStorage.setItem('current_user_role', currentUserRole);
        localStorage.setItem('logged_in_driver_name', loggedInDriverName);
        viewingProfileName = null;
        
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('user-role-badge').innerText = `حساب: ${loggedInDriverName} (${currentUserRole})`;
        
        setupNavigation();
        if (currentUserRole === 'admin') setAdminUIMode();
        else if (currentUserRole === 'supervisor') setSupervisorUIMode();
        else setDriverUIMode();
        
        render();
        initRealtimeListeners();
        alert('تمت مزامنة بيانات الحساب والبروفايل بنجاح سحابياً وموثقاً! 📱🌐🔐');
    } catch (err) {
        alert('خطأ أثناء مزامنة بيانات الحساب: ' + err.message);
    }
}

// استقبال التوكن القادم من نافذة جوجل الأصلية في الأندرويد
window.onNativeGoogleSignInSuccess = function(idToken) {
    try {
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
        auth.signInWithCredential(credential)
            .then((result) => {
                if (result && result.user) {
                    finishOAuthLogin(result.user, 'driver');
                }
            })
            .catch((error) => {
                alert("فشل التحقق السحابي من حساب جوجل: " + error.message);
            });
    } catch (err) {
        alert("خطأ في معالجة بيانات الدخول: " + err.message);
    }
};

// ربط اسم الدالة البديلة احتياطياً كما هو معرف في MainActivity.java
window.handleGoogleIdToken = window.onNativeGoogleSignInSuccess;

// تشغيل نافذة جوجل المعتمدة للأندرويد أو المتصفح
function signInWithGoogle() {
    // 1. إذا كان التطبيق يعمل داخل أندرويد (Capacitor / WebView)
    if (window.AndroidBridge && typeof window.AndroidBridge.launchNativeGoogleSignIn === 'function') {
        window.AndroidBridge.launchNativeGoogleSignIn();
        return;
    }

    // 2. إذا كان التطبيق يعمل من متصفح الويب العادي
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    auth.signInWithPopup(provider)
        .then((result) => {
            if (result && result.user) {
                finishOAuthLogin(result.user, 'driver');
            }
        })
        .catch((error) => {
            alert("فشل تسجيل الدخول بجوجل: " + error.message);
        });
}

function promptPhoneSignIn() {
    let rawPhone = prompt("أدخل رقم هاتفك المحمول متبوعاً برمز الدولة (مثال: +201114099799):");
    if (!rawPhone) return;

    let phoneNumber = rawPhone.replace(/[\s-]/g, '').trim();
    if (!phoneNumber.startsWith('+')) {
        alert('الرجاء إدخال رقم الهاتف متبوعاً برمز الدولة الصحيح (مثال: +20...).');
        return;
    }

    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible'
        });
    }

    auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
            let verificationCode = prompt("أدخل كود التفعيل المكون من 6 أرقام المرسل إلى هاتفك:");
            if (verificationCode) return confirmationResult.confirm(verificationCode.trim());
        })
        .then((result) => {
            if (result) finishOAuthLogin(result.user, 'driver');
        })
        .catch((error) => {
            alert("فشل التحقق من رقم الهاتف: " + error.message);
        });
}

function requestPasswordOrPinReset() {
    let resetType = prompt("اختر طريقة استعادة/تعديل كلمة السر:\n1. تعديل الرقم السري (PIN) المباشر للنظام\n2. إرسال رابط إعادة تعيين كلمة المرور عبر البريد\n\nاكتب رقم الخيار (1 أو 2):");
    if (resetType === "1") {
        changeAdminPinPrompt();
    } else if (resetType === "2") {
        let email = prompt("أدخل بريدك الإلكتروني المرتبط بالحساب:");
        if (email) {
            auth.sendPasswordResetEmail(email.trim()).then(() => {
                alert("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح! 📧");
            }).catch((error) => {
                alert("فشل إرسال البريد: " + error.message);
            });
        }
    }
}

function compressImage(file, maxWidth = 1200, maxHeight = 1000, quality = 0.9, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
            } else {
                if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            callback(canvas.toDataURL('image/jpeg', quality));
        };
    };
}

function toggleSidebar() {
    document.getElementById('sidebar-menu').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('open');
}

function setAppTheme(themeName) {
    document.body.classList.remove('theme-emerald', 'theme-amber', 'theme-purple', 'theme-dark-pure', 'theme-light-pure');
    if (themeName !== 'default') document.body.classList.add(`theme-${themeName}`);
    localStorage.setItem('app_theme', themeName);
}
const savedTheme = localStorage.getItem('app_theme');
if (savedTheme) setAppTheme(savedTheme);

const driverTitlesList = [
    "سائق مستجد", "سائق مساعد", "سائق معتمد", "سائق أول", "سائق خبير",
    "وسام الأمان الأول", "درع القيادة الآمنة", "سفير السلامة", "خبير توفير الوقود", "فاحص محترف",
    "منقذ الطوارئ", "ملك المرتفعات", "السرعة والدقة", "بطل المهام الشاقة", "الالتزام التام",
    "سيد المسافات الطويلة", "الاستجابة الفورية", "رجل المهام الليلية", "دينامو العمل", "المرن المبدع",
    "ابتسامة العملاء", "سفير الأخلاق", "حلّال المشاكل", "الأمانة المطلقة", "المظهر الاحترافي",
    "واجهة الشركة", "مدرب الجدد", "المستشار الفني", "سائق العام الذهبي", "أسطورة الطريق"
];

let isListenersInitialized = false;
let _renderTimer = null;
function scheduleSmartRender() {
    if (_renderTimer) return;
    _renderTimer = setTimeout(() => {
        _renderTimer = null;
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') render();
    }, 300);
}

let activeListeners = {};
function initRealtimeListeners() {
    if (isListenersInitialized) return;
    isListenersInitialized = true;

    const allCollections = ['shipments', 'drivers', 'chat', 'deferredInvoices', 'consolidatedInvoices', 'trucks', 'expenses', 'treasury', 'docs', 'posts', 'communityPosts', 'customers'];
    
    allCollections.forEach(colName => {
        let queryRef = db.collection(colName).where('companyId', '==', currentCompanyId).limit(50);
        if (activeListeners[colName]) activeListeners[colName]();

        activeListeners[colName] = queryRef.onSnapshot(snapshot => {
            appData[colName] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            scheduleSmartRender();
            if (colName === 'chat') {
                renderChatMessages();
                updateGlobalChatNotificationBadge();
            }
        }, error => console.error(`خطأ في مزامنة ${colName}:`, error));
    });

    if (!activeListeners['systemSettings']) {
        activeListeners['systemSettings'] = db.collection('systemSettings').doc('config').onSnapshot(doc => {
            if (doc.exists && doc.data().newsText) {
                appData.newsText = doc.data().newsText;
                renderRSSTicker();
            }
        });
    }
}

function renderMemberSubscriptionsList() {
    if (loggedInDriverName !== 'كرم عجاج') return;
    const query = (document.getElementById('member-sub-search')?.value || '').toLowerCase();
    const container = document.getElementById('members-subscriptions-container');
    if (!container) return;
    container.innerHTML = '';

    let filtered = (appData.drivers || []).filter(d => {
        return (d.name || '').toLowerCase().includes(query) || (d.companyName || '').toLowerCase().includes(query) || (d.phone || '').includes(query);
    });

    if (filtered.length === 0) {
        container.innerHTML = `<p style="font-size: 10px; text-align: center; opacity: 0.8;">لا توجد حسابات مطابقة.</p>`;
        return;
    }

    filtered.forEach(d => {
        let plan = d.subPlan || 'monthly';
        let expiry = d.subExpiry || 'لم يُحدد';
        let status = d.subStatus || 'active';
        let statusBadge = status === 'active' ? '<span style="color:var(--success);">نشط ✅</span>' : '<span style="color:var(--danger);">منتهي ⚠️</span>';
        let compNameLabel = d.companyName ? `🏢 الشركة: <strong>${escapeHTML(d.companyName)}</strong>` : `🏢 الحساب الرئيسي`;

        let itemDiv = document.createElement('div');
        itemDiv.style.cssText = 'background:var(--bg); border:1px solid var(--border-color); padding:10px; border-radius:8px; margin-bottom:8px; font-size:11px;';
        itemDiv.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong>👤 ${escapeHTML(d.name || 'بدون اسم')} (${escapeHTML(d.role || 'سائق')})</strong>
                <span style="font-size:9px;">${statusBadge}</span>
            </div>
            <p style="font-size:10px; opacity:0.85; margin-bottom:4px;">${compNameLabel}</p>
            <p style="font-size:10px; opacity:0.8; margin-bottom:6px;">الهاتف: ${escapeHTML(d.phone || 'غير مسجل')} | الباقة: <strong>${escapeHTML(plan)}</strong> | الانتهاء: <span style="color:var(--danger);">${escapeHTML(expiry)}</span></p>
            <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                <select id="plan-select-${escapeHTML(d.id)}" style="flex:1; margin-bottom:0; font-size:10px; padding:4px;">
                    <option value="monthly" ${plan==='monthly'?'selected':''}>اشتراك شهري (30 يوم) 🗓️</option>
                    <option value="quarterly" ${plan==='quarterly'?'selected':''}>اشتراك ربع سنوي (90 يوم) 📊</option>
                    <option value="yearly" ${plan==='yearly'?'selected':''}>اشتراك سنوي (365 يوم) 🌟</option>
                    <option value="lifetime" ${plan==='lifetime'?'selected':''}>ترخيص دائم ♾️</option>
                    <option value="trial" ${plan==='trial'?'selected':''}>تجريبي (7 أيام) ⏳</option>
                </select>
                <button type="button" class="btn-success btn-sm" style="width:auto; margin-bottom:0;" onclick="updateMemberSub('${escapeHTML(d.id)}')">تفعيل الباقة 🚀</button>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}

function renderCompanyAdminSubscriptionView() {
    const card = document.getElementById('company-admin-sub-card');
    const infoBox = document.getElementById('company-sub-info-box');
    if (!card || !infoBox) return;

    if (loggedInDriverName !== 'كرم عجاج') {
        card.style.display = 'block';
        let currentDrv = getCurrentDriver();
        let plan = currentDrv.subPlan || 'monthly';
        let expiry = currentDrv.subExpiry || 'لم يُحدد';
        let status = currentDrv.subStatus || 'active';
        let statusBadge = status === 'active' ? '<span style="color:var(--success);">نشط ✅</span>' : '<span style="color:var(--danger);">منتهي ⚠️</span>';

        infoBox.innerHTML = `
            <p><strong>اسم الشركة:</strong> ${escapeHTML(currentDrv.companyName || currentDrv.name)}</p>
            <p><strong>مدير الشركة:</strong> ${escapeHTML(currentDrv.name)}</p>
            <p><strong>الهاتف:</strong> ${escapeHTML(currentDrv.phone || 'غير مسجل')}</p>
            <p><strong>الباقة الحالية:</strong> ${escapeHTML(plan)} | <strong>الحالة:</strong> ${statusBadge}</p>
            <p><strong>تاريخ انتهاء الصلاحية:</strong> <span style="color:var(--danger); font-weight:bold;">${escapeHTML(expiry)}</span></p>
        `;
    } else {
        card.style.display = 'none';
    }
}

function updateMemberSub(driverId) {
    if (loggedInDriverName !== 'كرم عجاج') {
        alert('عذراً، التحكم في الاشتراكات مخصص للماستر أدمن الأساسي (كرم عجاج) فقط.');
        return;
    }
    let driver = (appData.drivers || []).find(d => String(d.id) === String(driverId));
    if (!driver) return;

    let planSelect = document.getElementById(`plan-select-${driverId}`);
    let selectedPlan = planSelect ? planSelect.value : 'monthly';

    let daysToAdd = selectedPlan === 'quarterly' ? 90 : (selectedPlan === 'yearly' ? 365 : (selectedPlan === 'trial' ? 7 : (selectedPlan === 'lifetime' ? 36500 : 30)));
    let newExpiryDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    driver.subPlan = selectedPlan;
    driver.subStatus = 'active';
    driver.subExpiry = newExpiryDate;

    db.collection('drivers').doc(String(driver.id)).set(driver, { merge: true }).then(() => {
        alert(`تم تحديث وتفعيل اشتراك الحساب (${driver.name}) بنجاح حتى تاريخ: ${newExpiryDate} 🚀✨`);
        renderMemberSubscriptionsList();
        renderCompaniesManagementTable();
    });
}

async function verifyAndUpdateUserRole(driverName) {
    if (!driverName) return;
    try {
        const snapshot = await db.collection('drivers').where('companyId', '==', currentCompanyId).limit(50).get();
        let matchedUser = null;
        snapshot.forEach(doc => {
            if (doc.data().name === driverName) matchedUser = doc.data();
        });

        if (matchedUser) {
            let freshRole = matchedUser.role || 'سائق';
            if (matchedUser.name === 'كرم عجاج' || freshRole === 'admin' || freshRole === 'مدير نظام' || freshRole === 'مدير مساعد') {
                currentUserRole = 'admin';
            } else if (freshRole === 'مشرف') {
                currentUserRole = 'supervisor';
            } else {
                currentUserRole = 'driver';
            }
            localStorage.setItem('current_user_role', currentUserRole);
            const userRoleBadge = document.getElementById('user-role-badge');
            if(userRoleBadge) userRoleBadge.innerText = `حساب: ${loggedInDriverName} (${currentUserRole})`;
            setupNavigation();
            if (currentUserRole === 'admin') setAdminUIMode();
            else if (currentUserRole === 'supervisor') setSupervisorUIMode();
            else setDriverUIMode();
        }
    } catch (err) {
        console.error("خطأ في التحقق من الرتبة:", err);
    }
}

auth.onAuthStateChanged(async user => {
    const savedRole = localStorage.getItem('current_user_role');
    const savedName = localStorage.getItem('logged_in_driver_name');
    if ((user || savedName) && savedRole && savedName) {
        document.getElementById('lock-screen').style.display = 'none';
        currentUserRole = savedRole;
        loggedInDriverName = savedName;
        currentCompanyId = localStorage.getItem('current_company_id') || 'company_main';
        
        await verifyAndUpdateUserRole(loggedInDriverName);
        setupNavigation();
        if (currentUserRole === 'admin') setAdminUIMode();
        else if (currentUserRole === 'supervisor') setSupervisorUIMode();
        else setDriverUIMode();
        render();
        initRealtimeListeners();
    } else {
        document.getElementById('lock-screen').style.display = 'flex';
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    const savedRole = localStorage.getItem('current_user_role');
    const savedName = localStorage.getItem('logged_in_driver_name');
    if (savedRole && savedName) {
        currentUserRole = savedRole;
        loggedInDriverName = savedName;
        currentCompanyId = localStorage.getItem('current_company_id') || 'company_main';
        document.getElementById('lock-screen').style.display = 'none';
        
        await verifyAndUpdateUserRole(loggedInDriverName);
        const userRoleBadge = document.getElementById('user-role-badge');
        if(userRoleBadge) userRoleBadge.innerText = `حساب: ${loggedInDriverName} (${currentUserRole})`;
        setupNavigation();
        if (currentUserRole === 'admin') setAdminUIMode();
        else if (currentUserRole === 'supervisor') setSupervisorUIMode();
        else setDriverUIMode();
        render();
        initRealtimeListeners();
    }
    renderRSSTicker();
});

function updateRSSTickerText() {
    const txt = document.getElementById('rss-ticker-input').value.trim();
    if(!txt) { alert('الرجاء كتابة نص الشريط الإخباري الجديد!'); return; }
    appData.newsText = txt;
    db.collection('systemSettings').doc('config').set({ newsText: txt }, { merge: true });
    renderRSSTicker();
    document.getElementById('rss-ticker-input').value = '';
    alert('تم تحديث شريط الأخبار والإعلانات سحابياً بنجاح! 📻🚀');
}

function renderRSSTicker() {
    const marquee = document.getElementById('news-ticker-marquee');
    if(marquee) marquee.innerText = appData.newsText;
}

function updateGlobalChatNotificationBadge() {
    let messages = appData.chat || [];
    let unreadCount = messages.filter(m => m.sender !== loggedInDriverName && !m.sender.includes(loggedInDriverName)).length;
    const badgeEl = document.getElementById('global-chat-notif-badge');
    if(badgeEl) {
        badgeEl.innerText = unreadCount;
        badgeEl.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
}

function finishSuccessfulLogin() {
    if (loggedInDriverName === 'كرم عجاج') currentUserRole = 'admin';
    localStorage.setItem('current_user_role', currentUserRole);
    localStorage.setItem('logged_in_driver_name', loggedInDriverName);
    localStorage.setItem('current_company_id', currentCompanyId);
    viewingProfileName = null;
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('user-role-badge').innerText = `حساب: ${loggedInDriverName} (${currentUserRole})`;
    
    setupNavigation();
    if (currentUserRole === 'admin') setAdminUIMode();
    else if (currentUserRole === 'supervisor') setSupervisorUIMode();
    else setDriverUIMode();
    
    render();
    initRealtimeListeners();
    alert('تم الاتصال بالسحابة الموثقة والتحقق من الحساب بنجاح 🚀👆🔐');
}

function setupNavigation() {
    const nav = document.getElementById('main-nav');
    const headerCompaniesBtn = document.getElementById('header-companies-btn');
    const bottomBiometricBtn = document.getElementById('bottom-biometric-btn');

    const currentDriverName = String(loggedInDriverName || localStorage.getItem('logged_in_driver_name') || '').trim();
    const isMasterAdmin = (currentDriverName === 'كرم عجاج');

    if (headerCompaniesBtn) headerCompaniesBtn.style.display = isMasterAdmin ? 'inline-block' : 'none';
    if (bottomBiometricBtn) bottomBiometricBtn.style.display = isMasterAdmin ? 'flex' : 'none';

    if (currentUserRole === 'admin') {
        nav.innerHTML = `
            <button type="button" class="active" onclick="switchTab('crud-tab', this); toggleSidebar();" style="background:var(--danger); color:white;">⚙️ الإدارة والتحكم V10</button>
            
            ${isMasterAdmin ? `
                <button type="button" onclick="switchTab('companies-tab', this); toggleSidebar();" style="background:var(--purple); color:white;">🏢 إدارة الشركات</button>
                <button type="button" onclick="goToAuthenticatedPage('Pandan2la.html'); toggleSidebar();" style="background:#0f172a; color:#f59e0b; border:1px dashed #f59e0b;">🐼 إدارة باندا (Pandan2la)</button>
                <button type="button" onclick="goToAuthenticatedPage('Panda.html'); toggleSidebar();" style="background:#1e293b; color:#22d3ee; border:1px solid #22d3ee;">🐼 لوحة باندا الرئيسية (Panda)</button>
                <button type="button" onclick="switchTab('biometric-tab', this); toggleSidebar();" style="background:#0284c7; color:white;">👆 إدارة البصمة البيومترية</button>
            ` : ''}

            <button type="button" onclick="goToAuthenticatedPage('operations-hub.html'); toggleSidebar();" style="background:#0f172a; color:#38bdf8;">🎛️ مركز العمليات (Operations Hub)</button>
            <button type="button" onclick="goToAuthenticatedPage('cargo.html'); toggleSidebar();">🚛 إدارة الحمولات (Cargo)</button>
            <button type="button" onclick="goToAuthenticatedPage('drivers.html'); toggleSidebar();">🧑‍✈️ دليل السائقين (Drivers)</button>
            <button type="button" onclick="goToAuthenticatedPage('drivers-community.html'); toggleSidebar();">🌐 مجتمع السائقين الكامل</button>
            <button type="button" onclick="switchTab('drivers-monitor-tab', this); toggleSidebar();" style="background:var(--warning); color:#fff;">👁️ مراقبة السائقين</button>
            <button type="button" onclick="switchTab('account-tab', this); toggleSidebar();" style="background:var(--accent); color:white;">👤 بروفايلي الشخصي</button>
            <button type="button" onclick="switchTab('shipments-tab', this); toggleSidebar();">📦 الشحنات</button>
            <button type="button" onclick="switchTab('public-feed-tab', this); toggleSidebar();">📢 لوحة الرحلات العامة</button>
            <button type="button" onclick="switchTab('consolidated-invoices-tab', this); toggleSidebar();" style="background:var(--purple); color:#fff;">📑 الفواتير المجمعة</button>
            <button type="button" onclick="switchTab('deferred-invoices-tab', this); toggleSidebar();" style="background:#3b82f6; color:#fff;">⏳ قسم الأجل</button>
            <button type="button" onclick="switchTab('ai-mechanic-tab', this); toggleSidebar();" style="background:var(--purple); color:#fff;">🤖 مساعد الذكاء الاصطناعي</button>
            <button type="button" onclick="switchTab('chat-tab', this); toggleSidebar();" style="background:var(--success); color:#fff;">💬 الشات والمحادثة</button>
            <button type="button" onclick="switchTab('map-tab', this); toggleSidebar();">🗺️ الخريطة الحية</button>
            <button type="button" onclick="switchTab('treasury-tab', this); toggleSidebar();">💵 الخزينة</button>
            <button type="button" onclick="switchTab('fleet-tab', this); toggleSidebar();">🚚 الأسطول والصيانة</button>
            <button type="button" onclick="switchTab('drivers-tab', this); toggleSidebar();">👨‍✈️ السائقون</button>
            <button type="button" onclick="switchTab('expenses-tab', this); toggleSidebar();">⛽ المصروفات</button>
            <button type="button" onclick="switchTab('customers-tab', this); toggleSidebar();">👥 العملاء</button>
            <button type="button" onclick="switchTab('reports-tab', this); toggleSidebar();">📊 التقارير وشركات SaaS</button>
            <button type="button" onclick="goToAuthenticatedPage('privacy.html'); toggleSidebar();">📋 سياسة الخصوصية</button>
        `;
    } else {
        nav.innerHTML = `
            <button type="button" class="active" onclick="switchTab('account-tab', this); toggleSidebar();" style="background:var(--accent); color:white;">👤 بروفايلي الشخصي</button>
            <button type="button" onclick="switchTab('shipments-tab', this); toggleSidebar();">📦 شحناتي ومهماتي</button>
            <button type="button" onclick="switchTab('public-feed-tab', this); toggleSidebar();">📢 لوحة الرحلات العامة</button>
            <button type="button" onclick="goToAuthenticatedPage('cargo.html'); toggleSidebar();">🚛 الحمولات المتاحة</button>
            <button type="button" onclick="goToAuthenticatedPage('drivers-community.html'); toggleSidebar();">🌐 مجتمع السائقين</button>
            <button type="button" onclick="switchTab('ai-mechanic-tab', this); toggleSidebar();" style="background:var(--purple); color:#fff;">🤖 مساعد الذكاء الاصطناعي</button>
            <button type="button" onclick="switchTab('chat-tab', this); toggleSidebar();" style="background:var(--success); color:#fff;">💬 غرفة المحادثة والتواصل</button>
            <button type="button" onclick="switchTab('map-tab', this); toggleSidebar();">🗺️ الخريطة الحية</button>
            <button type="button" onclick="switchTab('treasury-tab', this); toggleSidebar();">💵 خزنتي</button>
            <button type="button" onclick="switchTab('expenses-tab', this); toggleSidebar();">⛽ مصروفاتي</button>
            <button type="button" onclick="goToAuthenticatedPage('privacy.html'); toggleSidebar();">📋 سياسة الخصوصية</button>
        `;
    }
}

function changeAdminPinPrompt() {
    const currentPass = prompt('أدخل كلمة السر (رمز PIN) الحالية للتأكيد:');
    if (currentPass === storedPin || currentUserRole === 'admin' || currentUserRole === 'supervisor') {
        const newPass = prompt('أدخل كلمة السر الجديدة (رمز PIN):');
        if (newPass && newPass.trim() !== '') {
            storedPin = newPass;
            let adminDrv = (appData.drivers || []).find(d => d.name === loggedInDriverName);
            if (adminDrv) { 
                adminDrv.pin = newPass; 
                db.collection('drivers').doc(String(adminDrv.id)).set(adminDrv, { merge: true });
            }
            alert('تم تغيير كلمة السر بنجاح!');
        }
    } else {
        alert('كلمة السر الحالية غير صحيحة!');
    }
}

function changeUserPinByAdmin(id) {
    if (currentUserRole !== 'admin' && currentUserRole !== 'supervisor') return;
    const targetUser = (appData.drivers || []).find(d => String(d.id) === String(id));
    if (!targetUser) return;
    
    const newPin = prompt(`أدخل رمز الدخول (PIN) الجديد للحساب (${targetUser.name}):`);
    if (newPin && newPin.trim() !== '') {
        targetUser.pin = newPin;
        db.collection('drivers').doc(String(targetUser.id)).set(targetUser, { merge: true });
        alert(`تم تحديث كلمة المرور للحساب (${targetUser.name}) بنجاح! 🔐`);
    }
}

function openVisitorBooking() { document.getElementById('visitor-booking-container').style.display = 'flex'; }
function closeVisitorBooking() { document.getElementById('visitor-booking-container').style.display = 'none'; }
function openDriverRegister() { document.getElementById('driver-register-container').style.display = 'flex'; }
function closeDriverRegister() { document.getElementById('driver-register-container').style.display = 'none'; }
function openAddDeferredModal() { 
    if (currentUserRole !== 'admin') return;
    document.getElementById('addDeferredModal').style.display = 'flex'; 
}
function openModal(modalId) { 
    document.getElementById(modalId).style.display = 'flex'; 
    if(modalId === 'driversCommunityModal') renderCommunityPosts();
}
function closeModal(modalId) { document.getElementById(modalId).style.display = 'none'; }

function openStatDetailModal(type) {
    const modal = document.getElementById('statDetailModal');
    const titleEl = document.getElementById('stat-modal-title');
    const bodyEl = document.getElementById('stat-modal-body');
    modal.style.display = 'flex';
    bodyEl.innerHTML = '';

    let shipments = appData.shipments || [];
    let treasury = appData.treasury || [];
    let expenses = appData.expenses || [];
    let deferredInvoices = appData.deferredInvoices || [];

    if (type === 'shipments') {
        titleEl.innerText = '📦 تفاصيل الشحنات والرحلات';
        let html = `<div class="table-responsive"><table><thead><tr><th>العميل</th><th>الحمولة</th><th>الأجرة</th><th>الحالة</th><th>الإجراء</th></tr></thead><tbody>`;
        shipments.forEach(s => {
            let defBtnModal = (currentUserRole === 'admin') ? `<button type="button" class="btn-main btn-sm" style="background:#3b82f6; padding:2px 6px; font-size:9px;" onclick="convertToDeferred('${s.id}')">⏳ أجل</button>` : '';
            html += `<tr><td>${escapeHTML(s.name || '-')}</td><td>${escapeHTML(s.item || '-')}</td><td>${escapeHTML(s.price || 0)} ج.م</td><td><span class="badge bg-${s.status === 'مكتملة' ? 'delivered' : 'pending'}">${escapeHTML(s.status)}</span></td><td>${defBtnModal}</td></tr>`;
        });
        html += `</tbody></table></div>`;
        bodyEl.innerHTML = html;
    } else if (type === 'revenue') {
        titleEl.innerText = '💰 تفاصيل الإيرادات والمقبوضات';
        let totalRev = shipments.reduce((sum, s) => sum + Number(s.price || 0), 0);
        let html = `<p style="margin-bottom:8px; font-weight:bold; color:var(--success);">إجمالي الإيرادات الكلية: ${totalRev} ج.م</p>`;
        html += `<div class="table-responsive"><table><thead><tr><th>العميل</th><th>الحمولة</th><th>المبلغ</th><th>التاريخ</th></tr></thead><tbody>`;
        shipments.forEach(s => {
            html += `<tr><td>${escapeHTML(s.name || '-')}</td><td>${escapeHTML(s.item || '-')}</td><td>${escapeHTML(s.price || 0)} ج.م</td><td>${escapeHTML(s.date || 'حالي')}</td></tr>`;
        });
        html += `</tbody></table></div>`;
        bodyEl.innerHTML = html;
    } else if (type === 'net_profit') {
        titleEl.innerText = '📈 تحليل صافي الأرباح والأداء المالي';
        let totalRev = shipments.reduce((sum, s) => sum + Number(s.price || 0), 0);
        let totalExp = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
        let netProf = totalRev - totalExp;
        bodyEl.innerHTML = `
            <div style="background:var(--bg); padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid var(--border-color);">
                <p><strong>إجمالي الإيرادات:</strong> ${totalRev} ج.م</p>
                <p><strong>إجمالي المصروفات التشغيلية:</strong> ${totalExp} ج.م</p>
                <hr style="margin:8px 0; border:0; border-top:1px solid var(--border-color);">
                <p style="font-size:13px; font-weight:bold; color:var(--purple);">صافي الأرباح: ${netProf} ج.م 🚀</p>
            </div>
        `;
    } else if (type === 'cash') {
        titleEl.innerText = '💵 حركة الخزينة النقدية التفصيلية';
        let totalCash = treasury.reduce((sum, t) => sum + (t.type === 'in' ? Number(t.amount) : -Number(t.amount)), 0);
        let html = `<p style="margin-bottom:8px; font-weight:bold;">رصيد الخزينة الحالي: <span style="color:var(--success);">${totalCash} ج.م</span></p>`;
        html += `<div class="table-responsive"><table><thead><tr><th>النوع</th><th>المبلغ</th><th>البيان</th><th>التاريخ</th></tr></thead><tbody>`;
        treasury.forEach(t => {
            html += `<tr><td>${t.type === 'in' ? 'إيداع (+)' : 'سحب (-)'}</td><td>${escapeHTML(t.amount)} ج.م</td><td>${escapeHTML(t.desc)}</td><td>${escapeHTML(t.date || '-')}</td></tr>`;
        });
        html += `</tbody></table></div>`;
        bodyEl.innerHTML = html;
    } else if (type === 'debts') {
        titleEl.innerText = '⚠️ الفواتير والديون الآجلة المستحقة';
        let totalDef = deferredInvoices.reduce((sum, inv) => inv.status !== 'paid' ? sum + Number(inv.remainingAmount || 0) : sum, 0);
        let html = `<p style="margin-bottom:8px; font-weight:bold;">إجمالي الديون والآجل المستحق: <span style="color:var(--danger);">${totalDef} ج.م</span></p>`;
        html += `<div class="table-responsive"><table><thead><tr><th>رقم الفاتورة / العميل</th><th>الهاتف</th><th>المبلغ المستحق</th><th>الحالة</th></tr></thead><tbody>`;
        deferredInvoices.forEach(inv => {
            if(inv.status !== 'paid') {
                html += `<tr><td>${escapeHTML(inv.invoiceId)} - ${escapeHTML(inv.clientName)}</td><td>${escapeHTML(inv.clientPhone || '-')}</td><td style="color:var(--danger); font-weight:bold;">${escapeHTML(inv.remainingAmount)} ج.م</td><td><span class="badge bg-pending">${escapeHTML(inv.status)}</span></td></tr>`;
            }
        });
        html += `</tbody></table></div>`;
        bodyEl.innerHTML = html;
    }
}

function lockSystem() { 
    currentUserRole = ''; 
    localStorage.removeItem('current_user_role');
    localStorage.removeItem('logged_in_driver_name');
    localStorage.removeItem('current_company_id');
    localStorage.removeItem('na2la_active_session');
    viewingProfileName = null;
    auth.signOut();
    document.getElementById('lock-screen').style.display = 'flex'; 
    document.getElementById('login-identifier').value = ''; 
    document.getElementById('login-pin-input').value = ''; 
}

function setAdminUIMode() {
    document.getElementById('new-shipment-card').style.display = 'block';
    document.getElementById('admin-stats').style.display = 'grid';
    document.getElementById('admin-post-form-card').style.display = 'block';
    document.getElementById('admin-reports-actions').style.display = 'block';
    document.getElementById('shipments-table-title').innerText = 'سجل الرحلات المباشر (كافة شحنات الأسطول)';
    switchTab('crud-tab');
}

function setSupervisorUIMode() {
    document.getElementById('new-shipment-card').style.display = 'block';
    document.getElementById('admin-stats').style.display = 'grid';
    document.getElementById('admin-post-form-card').style.display = 'block';
    document.getElementById('admin-reports-actions').style.display = 'block';
    document.getElementById('shipments-table-title').innerText = 'سجل الرحلات المباشر (لوحة تحكم المشرف)';
    switchTab('shipments-tab');
}

function setDriverUIMode() {
    document.getElementById('new-shipment-card').style.display = 'none';
    document.getElementById('admin-stats').style.display = 'none';
    document.getElementById('admin-post-form-card').style.display = 'none';
    document.getElementById('admin-reports-actions').style.display = 'none';
    document.getElementById('shipments-table-title').innerText = 'شحناتي المخصصة لي فقط';
    switchTab('account-tab');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark_mode', document.body.classList.contains('dark-mode'));
}
if (localStorage.getItem('dark_mode') === 'true') document.body.classList.add('dark-mode');

function viewMedia(src, type) {
    const modal = document.getElementById('mediaViewerModal');
    const content = document.getElementById('mediaViewerContent');
    content.innerHTML = '';
    if (type === 'video') {
        content.innerHTML = `<video controls autoplay src="${escapeHTML(src)}" style="max-width:100%; max-height:85vh; border-radius:8px;"></video>`;
    } else {
        content.innerHTML = `<img src="${escapeHTML(src)}" style="max-width:100%; max-height:85vh; border-radius:8px; object-fit:contain;"/>`;
    }
    modal.style.display = 'flex';
}
function closeMediaViewer() {
    document.getElementById('mediaViewerModal').style.display = 'none';
    document.getElementById('mediaViewerContent').innerHTML = '';
}

let leafletMap = null;
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    if (!leafletMap) {
        leafletMap = L.map('map').setView([30.0444, 31.2357], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);
    } else {
        leafletMap.invalidateSize();
    }
    leafletMap.eachLayer((layer) => { if (layer instanceof L.Marker) leafletMap.removeLayer(layer); });
    let targetList = (currentUserRole === 'driver') ? appData.shipments.filter(s => s.assignedDriver === loggedInDriverName) : appData.shipments;
    targetList.forEach(s => {
        if (s.gps) {
            const coords = s.gps.split(',');
            if(coords.length === 2) {
                L.marker([parseFloat(coords[0]), parseFloat(coords[1])]).addTo(leafletMap)
                 .bindPopup(`<b>${escapeHTML(s.name)}</b><br>${escapeHTML(s.item)} (${escapeHTML(s.status)})`);
            }
        }
    });
}

let lastValidGPS = null;
let lastTimestamp = 0;

async function captureGPS() {
    document.getElementById('gps-status').innerText = 'جاري التحديد بدقة...';
    if (window.CapacitorNative) {
        const nativePos = await CapacitorNative.getNativeGPS();
        if (nativePos) {
            currentGPS = nativePos;
            document.getElementById('gps-status').innerText = 'تم التحديد بدقة (Native GPS) ✅';
            return;
        }
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const accuracy = pos.coords.accuracy;
            const now = Date.now();

            if (accuracy > 50) {
                document.getElementById('gps-status').innerText = `إشارة ضعيفة (دقة ${Math.round(accuracy)}م)، أعد المحاولة...`;
                return;
            }
            if (lastValidGPS && lastTimestamp) {
                const distance = calculateDistance(lastValidGPS.lat, lastValidGPS.lng, lat, lng);
                const speed = distance / (((now - lastTimestamp) / 1000) || 1);
                if (speed > 50) {
                    document.getElementById('gps-status').innerText = 'تم تجاهل قفزة وهمية، أعد التحديد...';
                    return;
                }
            }
            lastValidGPS = { lat, lng };
            lastTimestamp = now;
            currentGPS = `${lat},${lng}`;
            document.getElementById('gps-status').innerText = 'تم التحديد بدقة وثبات ✅';
        }, (err) => { 
            document.getElementById('gps-status').innerText = 'فشل التحديد ❌';
        }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
    }
}

async function captureVisitorGPS() {
    document.getElementById('vis-gps-status').innerText = 'جاري تحديد موقعك بدقة...';
    if (window.CapacitorNative) {
        const nativePos = await CapacitorNative.getNativeGPS();
        if (nativePos) {
            visitorGPS = nativePos;
            document.getElementById('vis-gps-status').innerText = 'تم تحديد موقعك بدقة (Native GPS) ✅';
            return;
        }
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            visitorGPS = `${pos.coords.latitude},${pos.coords.longitude}`;
            document.getElementById('vis-gps-status').innerText = 'تم تحديد موقعك بدقة وثبات ✅';
        }, () => { 
            document.getElementById('vis-gps-status').innerText = 'فشل التحديد ❌';
        }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

const canvas = document.getElementById('signature-pad');
const ctx = canvas ? canvas.getContext('2d') : null;
let isDrawing = false;
function resizeCanvas() {
    if (canvas) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = 80 * ratio;
        if (ctx) ctx.scale(ratio, ratio);
    }
}
if (canvas) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', startDrawing); canvas.addEventListener('mousemove', draw); canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchstart', (e) => { startDrawing(e.touches[0]); e.preventDefault(); }, {passive: false});
    canvas.addEventListener('touchmove', (e) => { draw(e.touches[0]); e.preventDefault(); }, {passive: false});
    canvas.addEventListener('touchend', stopDrawing);
}
function startDrawing(e) { isDrawing = true; if(!ctx) return; ctx.beginPath(); const rect = canvas.getBoundingClientRect(); ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top); }
function draw(e) { if (!isDrawing || !ctx) return; const rect = canvas.getBoundingClientRect(); ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top); ctx.stroke(); }
function stopDrawing() { isDrawing = false; }
function clearSignature() { if(ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); }

function switchTab(tabId, btn) {
    if (tabId === 'biometric-tab' && loggedInDriverName !== 'كرم عجاج') return;
    if (tabId === 'companies-tab' && loggedInDriverName !== 'كرم عجاج') return;
    if ((tabId === 'consolidated-invoices-tab' || tabId === 'deferred-invoices-tab') && currentUserRole !== 'admin') return;

    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav-list button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
    
    const targetSection = document.getElementById(tabId);
    if (targetSection) targetSection.classList.add('active');
    if(btn) btn.classList.add('active');

    if(tabId === 'map-tab') setTimeout(initMap, 200);
    if(tabId === 'biometric-tab') renderBiometricManagementTable();
    if(tabId === 'reports-tab') {
        updateInvoiceDropdown();
        renderMemberSubscriptionsList();
        renderAdminPendingCashRequests();
        renderCompanyAdminSubscriptionView();
    }
    if(tabId === 'companies-tab') renderCompaniesManagementTable();
    if(tabId === 'consolidated-invoices-tab') renderConsolidatedInvoicesSection();
    if(tabId === 'deferred-invoices-tab') loadDeferredInvoicesTable();
    if(tabId === 'crud-tab' && (currentUserRole === 'admin' || currentUserRole === 'supervisor')) renderCRUDTable();
    if(tabId === 'drivers-monitor-tab') renderDriversMonitor();
    if(tabId === 'account-tab') renderMyAccount();
    if(tabId === 'public-feed-tab') renderPublicPosts();
    if(tabId === 'drivers-tab') renderDriversListTable();
    if(tabId === 'chat-tab') renderChatAccountsList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleShipmentImage(input) {
    if (input.files[0]) compressImage(input.files[0], 1200, 1000, 0.9, url => { uploadedImgBase64 = url; });
}
function handleVisitorImage(input) {
    if (input.files[0]) compressImage(input.files[0], 1200, 1000, 0.9, url => { visitorImgBase64 = url; });
}
function handleDocImage(input) {
    if (input.files[0]) compressImage(input.files[0], 1200, 1000, 0.9, url => { input.dataset.compressedSrc = url; });
}

function editTreasury(id) {
    let t = (appData.treasury || []).find(item => String(item.id) === String(id));
    if(!t) return;
    let newDesc = prompt('تعديل بيان الخزينة:', t.desc);
    let newAmount = prompt('تعديل المبلغ:', t.amount);
    if(newDesc !== null && newAmount !== null && !isNaN(newAmount)) {
        t.desc = newDesc; t.amount = Number(newAmount);
        db.collection('treasury').doc(String(t.id)).set(t, { merge: true });
    }
}

function deleteTreasury(id) {
    if(confirm('هل أنت متأكد من حذف هذه الحركة النقدية؟')) db.collection('treasury').doc(String(id)).delete();
}

function editExpense(id) {
    let e = (appData.expenses || []).find(item => String(item.id) === String(id));
    if(!e) return;
    let newTitle = prompt('تعديل بيان المصروف:', e.title);
    let newAmount = prompt('تعديل المبلغ:', e.amount);
    if(newTitle !== null && newAmount !== null && !isNaN(newAmount)) {
        e.title = newTitle; e.amount = Number(newAmount);
        db.collection('expenses').doc(String(e.id)).set(e, { merge: true });
    }
}

function deleteExpense(id) {
    if(confirm('هل أنت متأكد من حذف هذا المصروف؟')) db.collection('expenses').doc(String(id)).delete();
}

function saveNewDeferredInvoice() {
    if (currentUserRole !== 'admin') return;
    const invoiceId = document.getElementById('def-inv-code').value.trim();
    const clientName = document.getElementById('def-client-name').value.trim();
    const clientPhone = document.getElementById('def-client-phone').value.trim();
    const totalAmount = Number(document.getElementById('def-total-amount').value);
    const paidAmount = Number(document.getElementById('def-paid-amount').value || 0);
    const remainingAmount = totalAmount - paidAmount;
    const dueDate = document.getElementById('def-due-date').value;
    const notes = document.getElementById('def-notes').value.trim();

    if (!invoiceId || !clientName || isNaN(totalAmount) || !dueDate) return;

    const newId = String(Date.now());
    db.collection('deferredInvoices').doc(newId).set({
        id: newId, companyId: currentCompanyId, invoiceId, clientName, clientPhone,
        totalAmount, paidAmount, remainingAmount, dueDate,
        status: remainingAmount <= 0 ? 'paid' : 'pending',
        notes, issueDate: new Date().toISOString().split('T')[0]
    }).then(() => {
        document.getElementById('deferred-invoice-form').reset();
        closeModal('addDeferredModal');
        alert('تم حفظ الفاتورة الآجلة بنجاح! ⏳🚀');
    });
}

function convertToDeferred(shipmentId) {
    if (currentUserRole !== 'admin') return;
    let s = (appData.shipments || []).find(item => String(item.id) === String(shipmentId));
    if (!s) return;

    document.getElementById('def-inv-code').value = `INV-${s.id}`;
    document.getElementById('def-client-name').value = s.name;
    document.getElementById('def-client-phone').value = s.phone || '';
    document.getElementById('def-total-amount').value = s.price;
    document.getElementById('def-paid-amount').value = '0';
    let d = new Date(); d.setDate(d.getDate() + 7);
    document.getElementById('def-due-date').value = d.toISOString().split('T')[0];
    document.getElementById('def-notes').value = `مستخرجة من الشحنة رقم #${s.id} (${s.item} - ${s.address})`;

    switchTab('deferred-invoices-tab');
    openAddDeferredModal();
}

function loadDeferredInvoicesTable() {
    if (currentUserRole !== 'admin') return;
    const tableBody = document.getElementById('deferredInvoicesTableBody');
    if (!tableBody) return;

    let invoices = appData.deferredInvoices || [];
    const searchQuery = (document.getElementById('searchDeferredClient')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('filterDeferredStatus')?.value || 'all';

    let totalDef = 0, totalOvr = 0, totalCol = 0, html = '';
    const today = new Date(); today.setHours(0, 0, 0, 0);

    invoices.forEach(inv => {
        const dueDate = new Date(inv.dueDate); dueDate.setHours(0, 0, 0, 0);
        let currentStatus = inv.status;
        if (dueDate < today && currentStatus !== 'paid' && currentStatus !== 'overdue') currentStatus = 'overdue';

        if (currentStatus !== 'paid') {
            totalDef += Number(inv.remainingAmount);
            if (currentStatus === 'overdue') totalOvr += Number(inv.remainingAmount);
        }
        totalCol += Number(inv.paidAmount || 0);

        if ((inv.clientName.toLowerCase().includes(searchQuery) || inv.invoiceId.toLowerCase().includes(searchQuery)) && (statusFilter === 'all' || currentStatus === statusFilter)) {
            let statusBadge = currentStatus === 'overdue' ? `<span class="badge" style="background:#ef4444;">متأخر ⚠️</span>` : (currentStatus === 'paid' ? `<span class="badge" style="background:#10b981;">مُسدد</span>` : `<span class="badge" style="background:#f59e0b;">معلق ⏳</span>`);
            html += `
                <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="font-weight:bold;">${escapeHTML(inv.invoiceId)}</td>
                    <td>${escapeHTML(inv.clientName)}<br><span style="font-size:8px; opacity:0.7;">${escapeHTML(inv.clientPhone || '')}</span></td>
                    <td><strong style="color:var(--accent);">${Number(inv.remainingAmount).toLocaleString()} ج.م</strong><br><span style="font-size:8px; opacity:0.7;">الإجمالي: ${Number(inv.totalAmount).toLocaleString()}</span></td>
                    <td>${escapeHTML(inv.dueDate)}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button type="button" class="btn-success btn-sm" onclick="recordDeferredPayment('${escapeHTML(inv.id)}')">سداد 💵</button>
                        <button type="button" class="btn-main btn-sm" style="background:#25d366;" onclick="sendDeferredInvoiceWhatsApp('${escapeHTML(inv.id)}')">واتساب 📱</button>
                        <button type="button" class="btn-warning btn-sm" onclick="exportDeferredInvoiceImage('${escapeHTML(inv.id)}')">📷</button>
                        <button type="button" class="btn-purple btn-sm" onclick="exportDeferredInvoicePDF('${escapeHTML(inv.id)}')">📄</button>
                        <button type="button" class="btn-danger btn-sm" onclick="deleteDeferredInvoice('${escapeHTML(inv.id)}')">حذف</button>
                    </td>
                </tr>
            `;
        }
    });

    tableBody.innerHTML = html || `<tr><td colspan="6" style="text-align:center; opacity:0.7; padding:12px;">لا توجد فواتير آجلة مطابقة.</td></tr>`;
    if(document.getElementById('totalDeferred')) document.getElementById('totalDeferred').innerText = totalDef.toLocaleString() + " ج.م";
    if(document.getElementById('totalOverdue')) document.getElementById('totalOverdue').innerText = totalOvr.toLocaleString() + " ج.م";
    if(document.getElementById('totalCollected')) document.getElementById('totalCollected').innerText = totalCol.toLocaleString() + " ج.م";
}

function populateDeferredPrintArea(inv) {
    document.getElementById('hid-def-id').innerText = inv.invoiceId;
    document.getElementById('hid-def-date').innerText = `تاريخ الإصدار: ${inv.issueDate || 'حالي'} | تاريخ الاستحقاق: ${inv.dueDate}`;
    document.getElementById('hid-def-client').innerText = inv.clientName;
    document.getElementById('hid-def-phone').innerText = inv.clientPhone || 'غير مسجل';
    document.getElementById('hid-def-total').innerText = Number(inv.totalAmount).toLocaleString();
    document.getElementById('hid-def-paid').innerText = Number(inv.paidAmount || 0).toLocaleString();
    document.getElementById('hid-def-rem').innerText = Number(inv.remainingAmount).toLocaleString();
    document.getElementById('hid-def-duedate').innerText = inv.dueDate;
    document.getElementById('hid-def-status').innerText = inv.status === 'paid' ? 'مُسدد بالكامل' : 'آجل معلق ⏳';
    document.getElementById('hid-def-notes').innerText = inv.notes || 'لا توجد ملاحظات إضافية';
}

function exportDeferredInvoiceImage(id) {
    let inv = (appData.deferredInvoices || []).find(i => String(i.id) === String(id));
    if (!inv) return;
    populateDeferredPrintArea(inv);
    const area = document.getElementById('hidden-deferred-print-area');
    area.style.display = 'block';
    html2canvas(area, { useCORS: true, scale: 2 }).then(canvas => {
        area.style.display = 'none';
        saveNativeOrWebFile(canvas.toDataURL('image/png'), `deferred-invoice-${inv.invoiceId}.png`, 'image/png');
    });
}

function exportDeferredInvoicePDF(id) {
    let inv = (appData.deferredInvoices || []).find(i => String(i.id) === String(id));
    if (!inv) return;
    populateDeferredPrintArea(inv);
    const area = document.getElementById('hidden-deferred-print-area');
    area.style.display = 'block';
    html2canvas(area, { useCORS: true, scale: 2 }).then(canvas => {
        area.style.display = 'none';
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 30;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 15, 15, pdfWidth, pdfHeight);
        const pdfBase64 = pdf.output('datauristring');
        saveNativeOrWebFile(pdfBase64, `deferred-invoice-${inv.invoiceId}.pdf`, 'application/pdf');
    });
}

async function sendDeferredInvoiceWhatsApp(id) {
    let inv = (appData.deferredInvoices || []).find(i => String(i.id) === String(id));
    if (!inv) return;
    let msg = `🧾 *تفاصيل فاتورة أسطورة الطريق (قسم الأجل)*\n🔖 *رقم الفاتورة:* ${inv.invoiceId}\n👤 *العميل:* ${inv.clientName}\n📉 *المتبقي:* ${Number(inv.remainingAmount).toLocaleString()} ج.م\n📅 *الاستحقاق:* ${inv.dueDate}`;
    if (window.CapacitorNative && await CapacitorNative.shareText('فاتورة أجل - أسطورة الطريق', msg)) return;
    let phone = inv.clientPhone ? (inv.clientPhone.startsWith('0') ? '2' + inv.clientPhone : inv.clientPhone) : '';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function recordDeferredPayment(id) {
    if (currentUserRole !== 'admin') return;
    let inv = (appData.deferredInvoices || []).find(i => String(i.id) === String(id));
    if (!inv) return;
    let payAmount = prompt(`المبلغ المراد سداده للفاتورة (${inv.invoiceId}) - المتبقي: ${inv.remainingAmount} ج.م:`);
    if (payAmount !== null && !isNaN(payAmount) && Number(payAmount) > 0) {
        inv.paidAmount = Number(inv.paidAmount || 0) + Number(payAmount);
        inv.remainingAmount = Math.max(0, inv.totalAmount - inv.paidAmount);
        if (inv.remainingAmount === 0) inv.status = 'paid';
        db.collection('deferredInvoices').doc(String(inv.id)).set(inv, { merge: true });
    }
}

function deleteDeferredInvoice(id) {
    if (currentUserRole === 'admin' && confirm('هل أنت متأكد من حذف هذه الفاتورة الآجلة؟')) {
        db.collection('deferredInvoices').doc(String(id)).delete();
    }
}

function renderConsolidatedInvoicesSection() {
    if (currentUserRole !== 'admin') return;
    const container = document.getElementById('con-shipments-checkboxes');
    if(!container) return;
    container.innerHTML = '';
    (appData.shipments || []).forEach(s => {
        let div = document.createElement('div');
        div.style.cssText = 'display:flex; align-items:center; gap:8px; margin-bottom:4px; font-size:10px;';
        div.innerHTML = `<input type="checkbox" value="${escapeHTML(s.id)}" id="chk-ship-${escapeHTML(s.id)}" style="width:auto; margin:0;"><label for="chk-ship-${escapeHTML(s.id)}" style="cursor:pointer; flex:1;"><strong>${escapeHTML(s.name || 'بدون اسم')}</strong> - ${escapeHTML(s.item || '-')} (${escapeHTML(s.price || 0)} ج.م)</label>`;
        container.appendChild(div);
    });
    renderConsolidatedInvoicesTable();
}

function saveConsolidatedInvoice() {
    if (currentUserRole !== 'admin') return;
    const clientName = document.getElementById('con-client-name').value.trim();
    const notes = document.getElementById('con-notes').value.trim();
    const checkboxes = document.querySelectorAll('#con-shipments-checkboxes input[type="checkbox"]:checked');
    if(!clientName || checkboxes.length === 0) return;

    let selectedShipmentIds = [], totalAmount = 0;
    checkboxes.forEach(chk => {
        let sId = String(chk.value);
        selectedShipmentIds.push(sId);
        let found = (appData.shipments || []).find(s => String(s.id) === sId);
        if(found) totalAmount += Number(found.price || 0);
    });

    const newId = String(Date.now());
    db.collection('consolidatedInvoices').doc(newId).set({
        id: newId, invoiceNumber: newId, companyId: currentCompanyId,
        client: clientName, notes, shipmentIds: selectedShipmentIds,
        total: totalAmount, date: new Date().toLocaleDateString('ar-EG')
    }).then(() => {
        document.getElementById('consolidated-invoice-form').reset();
        alert('تم إصدار الفاتورة المجمعة بنجاح! 📑🚀');
    });
}

function renderConsolidatedInvoicesTable() {
    if (currentUserRole !== 'admin') return;
    const tbody = document.getElementById('consolidated-invoices-list');
    if(!tbody) return;
    tbody.innerHTML = '';
    (appData.consolidatedInvoices || []).forEach(inv => {
        let shortDisplay = String(inv.invoiceNumber || inv.id).slice(-6);
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:bold;">#${escapeHTML(shortDisplay)}</td>
            <td>${escapeHTML(inv.client || '-')}</td>
            <td>${(inv.shipmentIds || []).length} شحنات</td>
            <td style="color:var(--success); font-weight:bold;">${escapeHTML(inv.total || 0)} ج.م</td>
            <td>${escapeHTML(inv.date || '-')}</td>
            <td>
                <button type="button" class="btn-main btn-sm" onclick="printConsolidatedInvoice('${escapeHTML(inv.id)}')">🖨️ طباعة</button>
                <button type="button" class="btn-danger btn-sm" onclick="deleteConsolidatedInvoice('${escapeHTML(inv.id)}')">حذف</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function printConsolidatedInvoice(id) {
    let inv = (appData.consolidatedInvoices || []).find(i => String(i.id) === String(id));
    if (!inv) return;
    const win = window.open('', '_blank');
    win.document.write(`<html lang="ar" dir="rtl"><body style="font-family:Tahoma; padding:25px;"><h2>🐎 أسطورة الطريق - فاتورة مجمعة #${String(inv.id).slice(-6)}</h2><p>العميل: ${escapeHTML(inv.client)}</p><p>الإجمالي: ${inv.total} ج.م</p></body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 300);
}

function deleteConsolidatedInvoice(id) {
    if (currentUserRole === 'admin' && confirm('حذف الفاتورة المجمعة؟')) {
        db.collection('consolidatedInvoices').doc(String(id)).delete();
    }
}

function getCurrentDriver() {
    let activeTargetName = viewingProfileName ? viewingProfileName : loggedInDriverName;
    let drv = (appData.drivers || []).find(d => d.name && d.name.trim() === activeTargetName.trim());
    if (!drv) {
        drv = {
            id: 'default_driver_id', companyId: currentCompanyId, companyName: 'أسطورة الطريق الرئيسية',
            name: activeTargetName, phone: '', role: 'سائق', title: 'سائق معتمد', status: 'متاح 🟢',
            avatar: '', cover: '', coverHeight: 180
        };
    }
    if (drv.name === 'كرم عجاج') { drv.role = 'admin'; drv.title = 'مدير عام النظام'; }
    return drv;
}

function renderMyAccount() {
    let drv = getCurrentDriver();
    document.getElementById('gplus-name-display').innerText = drv.name || 'بدون اسم';
    document.getElementById('gplus-badge-display').innerText = drv.title || 'سائق';
    document.getElementById('gplus-tagline-display').innerText = `الشركة: ${drv.companyName || 'الرئيسية'} | الهاتف: ${drv.phone || 'غير محدد'} | الرتبة: ${drv.role || 'سائق'}`;
    
    const profileShipmentsContainer = document.getElementById('profile-user-shipments-container');
    if (profileShipmentsContainer) {
        profileShipmentsContainer.innerHTML = '';
        let userShipments = (appData.shipments || []).filter(s => {
            if ((loggedInDriverName === 'كرم عجاج' || currentUserRole === 'admin') && (!viewingProfileName || viewingProfileName === loggedInDriverName)) return true;
            return s.assignedDriver === drv.name || s.name === drv.name;
        });

        document.getElementById('gplus-stat-shipments').innerText = userShipments.length;
        userShipments.forEach(s => {
            let div = document.createElement('div');
            div.style.cssText = 'background: var(--bg); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: 8px; font-size:10px;';
            div.innerHTML = `<strong>📦 #${escapeHTML(s.id)}</strong> - ${escapeHTML(s.name)} | ${escapeHTML(s.item)} | <span style="color:var(--success);">${escapeHTML(s.price)} ج.م</span>`;
            profileShipmentsContainer.appendChild(div);
        });
    }

    document.getElementById('gplus-stat-role').innerText = drv.role || 'سائق';
    document.getElementById('gplus-stat-status').innerText = drv.status || 'متاح';

    const backBtn = document.getElementById('gplus-back-to-myprofile-btn');
    const editSettingsCard = document.getElementById('my-profile-edit-settings-card');
    if (viewingProfileName && viewingProfileName !== loggedInDriverName) {
        if(backBtn) backBtn.style.display = 'inline-block';
        if(editSettingsCard) editSettingsCard.style.display = 'none';
    } else {
        if(backBtn) backBtn.style.display = 'none';
        if(editSettingsCard) editSettingsCard.style.display = 'block';
        document.getElementById('my-edit-name').value = drv.name || '';
        document.getElementById('my-edit-phone').value = drv.phone || '';
        const titleSelect = document.getElementById('my-edit-title');
        if (titleSelect) {
            titleSelect.innerHTML = driverTitlesList.map(t => `<option value="${t}" ${drv.title === t ? 'selected' : ''}>${t}</option>`).join('');
        }
    }

    const coverBanner = document.getElementById('gplus-cover-banner-preview');
    if (coverBanner) {
        coverBanner.style.height = (drv.coverHeight || 180) + 'px';
        coverBanner.style.backgroundImage = drv.cover ? `url('${escapeHTML(drv.cover)}')` : 'none';
    }
    const avatarPreview = document.getElementById('gplus-avatar-img-preview');
    if (avatarPreview) {
        avatarPreview.innerHTML = drv.avatar ? `<img src="${escapeHTML(drv.avatar)}" style="width:100%; height:100%; object-fit:cover;">` : 'صورة';
    }
    if (drv.name) loadAndRenderProfileWall(drv.name);
    renderProfileDriverSearch();
}

function resetToMyProfile() { viewingProfileName = null; renderMyAccount(); }

function updateProfileAvatar(input) {
    if (input.files[0]) {
        compressImage(input.files[0], 600, 600, 0.9, url => {
            let drv = getCurrentDriver(); drv.avatar = url;
            db.collection('drivers').doc(String(drv.id)).set(drv, { merge: true }).then(() => renderMyAccount());
        });
    }
}

function updateProfileCover(input) {
    if (input.files[0]) {
        compressImage(input.files[0], 1400, 900, 0.92, url => {
            let drv = getCurrentDriver(); drv.cover = url;
            db.collection('drivers').doc(String(drv.id)).set(drv, { merge: true }).then(() => renderMyAccount());
        });
    }
}

function saveMyProfileChanges() {
    let drv = getCurrentDriver();
    drv.name = document.getElementById('my-edit-name').value.trim();
    drv.phone = document.getElementById('my-edit-phone').value.trim();
    drv.title = document.getElementById('my-edit-title').value;
    loggedInDriverName = drv.name;
    localStorage.setItem('logged_in_driver_name', loggedInDriverName);
    db.collection('drivers').doc(String(drv.id)).set(drv, { merge: true }).then(() => {
        alert('تم تحديث بروفايلك الشخصي بنجاح! 💾');
        renderMyAccount();
    });
}

function previewProfileWallFiles(input) {
    profileWallFilesArr = [];
    const info = document.getElementById('profile-wall-files-info');
    if (!input.files || input.files.length === 0) { info.innerText = ''; return; }
    let processed = 0;
    for (let file of input.files) {
        if (file.type.startsWith('video')) {
            const reader = new FileReader();
            reader.onload = e => { profileWallFilesArr.push({ type: 'video', src: e.target.result }); if (++processed === input.files.length) info.innerText = 'تم اختيار الملفات ✅'; };
            reader.readAsDataURL(file);
        } else {
            compressImage(file, 1200, 1000, 0.9, url => { profileWallFilesArr.push({ type: 'image', src: url }); if (++processed === input.files.length) info.innerText = 'تم اختيار الملفات ✅'; });
        }
    }
}

function publishProfileWallPost() {
    const text = document.getElementById('profile-wall-text').value.trim();
    if(!text && profileWallFilesArr.length === 0) return;
    let activeTargetName = viewingProfileName || loggedInDriverName;
    db.collection('profileWalls').add({
        id: String(Date.now()), companyId: currentCompanyId, profileName: activeTargetName,
        author: loggedInDriverName, text, files: [...profileWallFilesArr], date: new Date().toLocaleString('ar-EG')
    }).then(() => {
        document.getElementById('profile-wall-text').value = '';
        profileWallFilesArr = [];
        document.getElementById('profile-wall-files-info').innerText = '';
        loadAndRenderProfileWall(activeTargetName);
    });
}

function loadAndRenderProfileWall(profileName) {
    const container = document.getElementById('profile-wall-posts-container');
    if(!container) return;
    db.collection('profileWalls').where('profileName', '==', profileName).where('companyId', '==', currentCompanyId).limit(30).get().then(snap => {
        container.innerHTML = '';
        snap.forEach(doc => {
            let p = doc.data();
            let mediaHtml = (p.files || []).map(f => f.type === 'video' ? `<video src="${escapeHTML(f.src)}"></video>` : `<img src="${escapeHTML(f.src)}">`).join('');
            let div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<strong>✍️ ${escapeHTML(p.author)}</strong> <small>${escapeHTML(p.date)}</small><p style="margin:6px 0;">${escapeHTML(p.text)}</p><div class="load-post-media">${mediaHtml}</div>`;
            container.appendChild(div);
        });
    });
}

function renderProfileDriverSearch() {
    const query = (document.getElementById('profile-driver-search-input')?.value || '').toLowerCase();
    const container = document.getElementById('profile-driver-search-results');
    if(!container) return;
    container.innerHTML = '';
    (appData.drivers || []).filter(d => (d.name || '').toLowerCase().includes(query) || (d.phone || '').includes(query)).forEach(d => {
        let item = document.createElement('div');
        item.className = 'driver-card-item';
        item.onclick = () => { viewingProfileName = d.name; renderMyAccount(); };
        item.innerHTML = `<div class="driver-card-avatar">${d.avatar ? `<img src="${escapeHTML(d.avatar)}">` : escapeHTML((d.name || 'D').charAt(0))}</div><div><h4>${escapeHTML(d.name)}</h4><p style="font-size:9px;">${escapeHTML(d.title || d.role)}</p></div>`;
        container.appendChild(item);
    });
}

function saveVisitorShipment() {
    let newId = String(Date.now());
    db.collection('shipments').doc(newId).set({
        id: newId, companyId: currentCompanyId,
        name: document.getElementById('vis-name').value.trim(),
        phone: document.getElementById('vis-phone').value.trim(),
        address: document.getElementById('vis-address').value.trim(),
        item: document.getElementById('vis-item').value.trim(),
        price: Number(document.getElementById('vis-price').value),
        status: 'في الانتظار', gps: visitorGPS, img: visitorImgBase64, date: new Date().toLocaleDateString('ar-EG')
    }).then(() => {
        closeVisitorBooking();
        alert('تم تقديم طلبك بنجاح! 🚀');
        document.getElementById('visitor-shipment-form').reset();
    });
}

async function registerNewDriverPublic() {
    const name = document.getElementById('pub-drv-name').value.trim();
    const phone = document.getElementById('pub-drv-phone').value.trim();
    const pin = document.getElementById('pub-drv-pin').value.trim();

    if ((appData.drivers || []).find(d => d.phone === phone || d.name === name)) {
        alert('هذا الحساب مسجل بالفعل!'); return;
    }

    try {
        const authEmail = 'user_' + phone.replace(/[^0-9]/g, '') + '@na2la.net';
        const authPass = pin + '_Na2laSecure2026!';
        let userCred = await auth.createUserWithEmailAndPassword(authEmail, authPass).catch(() => auth.signInWithEmailAndPassword(authEmail, authPass));
        let authUid = userCred.user ? userCred.user.uid : String(Date.now());

        await db.collection('drivers').doc(authUid).set({
            id: authUid, companyId: currentCompanyId, companyName: 'أسطورة الطريق الرئيسية',
            name, phone, pin, role: 'سائق', title: 'سائق مستجد', status: 'متاح 🟢',
            subPlan: 'monthly', subStatus: 'active', subExpiry: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]
        });

        closeDriverRegister();
        alert('تم تسجيل حساب السائق بنجاح! 🚀');
        document.getElementById('public-driver-form').reset();
    } catch (err) {
        alert('فشل التسجيل: ' + err.message);
    }
}

async function saveShipmentHandler(e) {
    e.preventDefault();
    const editId = document.getElementById('edit-shipment-id').value;
    const name = document.getElementById('ship-name').value.trim();
    const phone = document.getElementById('ship-phone').value.trim();
    const address = document.getElementById('ship-address').value.trim();
    const item = document.getElementById('ship-item').value.trim();
    const price = Number(document.getElementById('ship-price').value);
    const fuelCost = Number(document.getElementById('ship-fuel-cost').value || 0);
    const extraCost = Number(document.getElementById('ship-extra-cost').value || 0);
    const assignedDriver = document.getElementById('ship-assigned-driver').value;
    const paymentStatus = document.getElementById('ship-payment-status').value;
    const sigData = (canvas && ctx) ? canvas.toDataURL() : '';

    let targetId = editId ? String(editId) : String(Date.now());
    let existingShip = editId ? (appData.shipments || []).find(s => String(s.id) === String(editId)) : null;

    await db.collection('shipments').doc(targetId).set({
        id: targetId, companyId: currentCompanyId, name, phone, address, item, price, fuelCost, extraCost,
        assignedDriver, paymentStatus, status: existingShip ? existingShip.status : 'في الانتظار',
        gps: currentGPS || (existingShip ? existingShip.gps : ''),
        img: uploadedImgBase64 || (existingShip ? existingShip.img : ''),
        sig: sigData || (existingShip ? existingShip.sig : ''),
        date: existingShip ? existingShip.date : new Date().toLocaleDateString('ar-EG')
    });

    if (!editId && paymentStatus === 'deferred') {
        let defId = String(Date.now() + 1);
        let due = new Date(); due.setDate(due.getDate() + 7);
        await db.collection('deferredInvoices').doc(defId).set({
            id: defId, companyId: currentCompanyId, invoiceId: `INV-${targetId}`, clientName: name, clientPhone: phone,
            totalAmount: price, paidAmount: 0, remainingAmount: price, dueDate: due.toISOString().split('T')[0], status: 'pending'
        });
    }

    document.getElementById('edit-shipment-id').value = '';
    document.getElementById('shipment-form').reset();
    clearSignature();
    alert('تم حفظ الرحلة بنجاح 💾');
}

function editShipment(id) {
    const s = (appData.shipments || []).find(item => String(item.id) === String(id));
    if (!s) return;
    document.getElementById('edit-shipment-id').value = s.id;
    document.getElementById('ship-name').value = s.name || '';
    document.getElementById('ship-phone').value = s.phone || '';
    document.getElementById('ship-address').value = s.address || '';
    document.getElementById('ship-item').value = s.item || '';
    document.getElementById('ship-price').value = s.price || 0;
    document.getElementById('ship-fuel-cost').value = s.fuelCost || 0;
    document.getElementById('ship-extra-cost').value = s.extraCost || 0;
    document.getElementById('ship-assigned-driver').value = s.assignedDriver || '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateShipmentStatus(id, newStatus) {
    db.collection('shipments').doc(String(id)).set({ status: newStatus }, { merge: true });
}

function deleteShipment(id) {
    if (currentUserRole === 'admin' && confirm('حذف الشحنة نهائياً؟')) {
        db.collection('shipments').doc(String(id)).delete();
    }
}

function renderDriverDropdownOptions() {
    const select = document.getElementById('ship-assigned-driver');
    if (!select) return;
    select.innerHTML = '<option value="">-- بدون تعيين (عام) --</option>' + (appData.drivers || []).map(d => `<option value="${escapeHTML(d.name)}">${escapeHTML(d.name)} (${escapeHTML(d.title || d.role)})</option>`).join('');
}

function renderDriversMonitor() {
    const tbody = document.getElementById('drivers-monitor-list');
    if(!tbody) return;
    tbody.innerHTML = '';
    (appData.drivers || []).forEach(d => {
        let optionsTitle = driverTitlesList.map(t => `<option value="${t}" ${d.title === t ? 'selected' : ''}>${t}</option>`).join('');
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHTML(d.name)}</strong></td>
            <td>${escapeHTML(d.phone || '-')}</td>
            <td>${escapeHTML(d.role || 'سائق')}</td>
            <td><select onchange="updateDriverTitle('${d.id}', this.value)">${optionsTitle}</select></td>
            <td><select onchange="updateDriverStatus('${d.id}', this.value)">
                <option value="متاح 🟢" ${d.status === 'متاح 🟢' ? 'selected' : ''}>متاح 🟢</option>
                <option value="في رحلة 🚛" ${d.status === 'في رحلة 🚛' ? 'selected' : ''}>في رحلة 🚛</option>
                <option value="مشغول 🔴" ${d.status === 'مشغول 🔴' ? 'selected' : ''}>مشغول 🔴</option>
            </select></td>
            <td><button type="button" class="btn-main btn-sm" onclick="viewingProfileName='${escapeHTML(d.name)}'; switchTab('account-tab');">👁️ البروفايل</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function updateDriverTitle(id, title) { db.collection('drivers').doc(String(id)).set({ title }, { merge: true }); }
function updateDriverStatus(id, status) { db.collection('drivers').doc(String(id)).set({ status }, { merge: true }); }

function renderDriversListTable() {
    const tbody = document.getElementById('drivers-list-table');
    if(!tbody) return;
    tbody.innerHTML = '';
    (appData.drivers || []).forEach(d => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHTML(d.name)}</strong></td>
            <td>${escapeHTML(d.phone || '-')}</td>
            <td><select onchange="updateDriverRoleByAdmin('${d.id}', this.value)">
                <option value="سائق" ${d.role === 'سائق' ? 'selected' : ''}>سائق</option>
                <option value="مشرف" ${d.role === 'مشرف' ? 'selected' : ''}>مشرف</option>
                <option value="مدير مساعد" ${d.role === 'مدير مساعد' ? 'selected' : ''}>مدير مساعد</option>
                <option value="admin" ${d.role === 'admin' ? 'selected' : ''}>مدير (admin)</option>
            </select></td>
            <td>${escapeHTML(d.title || 'سائق')}</td>
            <td><code>${escapeHTML(d.pin || '****')}</code></td>
            <td><button type="button" class="btn-warning btn-sm" onclick="changeUserPinByAdmin('${d.id}')">🔑</button> <button type="button" class="btn-danger btn-sm" onclick="deleteDriverAccount('${d.id}')">🗑️</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function updateDriverRoleByAdmin(id, role) {
    if(currentUserRole === 'admin') db.collection('drivers').doc(String(id)).set({ role }, { merge: true });
}
function deleteDriverAccount(id) {
    if(currentUserRole === 'admin' && confirm('حذف الحساب نهائياً؟')) db.collection('drivers').doc(String(id)).delete();
}

async function saveNewDriverHandler(e) {
    e.preventDefault();
    const name = document.getElementById('drv-fullname').value.trim();
    const phone = document.getElementById('drv-phone').value.trim();
    const pin = document.getElementById('drv-pin').value.trim();
    const role = document.getElementById('drv-role-select').value;

    const authEmail = 'user_' + phone.replace(/[^0-9]/g, '') + '@na2la.net';
    const authPass = pin + '_Na2laSecure2026!';
    let userCred = await auth.createUserWithEmailAndPassword(authEmail, authPass).catch(() => auth.signInWithEmailAndPassword(authEmail, authPass));
    let authUid = userCred.user ? userCred.user.uid : String(Date.now());

    await db.collection('drivers').doc(authUid).set({
        id: authUid, companyId: currentCompanyId, name, phone, pin, role,
        title: role === 'admin' ? 'مدير عام' : 'سائق معتمد', status: 'متاح 🟢'
    });
    document.getElementById('driver-profile-form').reset();
    alert('تم إضافة الحساب بنجاح! 🚀');
}

function runAIMechanicAnalysis() {
    const fault = document.getElementById('ai-fault-select').value;
    const box = document.getElementById('ai-result-box');
    box.style.display = 'block';
    const solutions = {
        alt: '<strong>🛠️ التشخيص:</strong> عطل في دينامو الشحن أو السير.<br><strong>💡 الإجراء:</strong> افحص الفولت (13.8 - 14.4 فولت).',
        clutch: '<strong>🛠️ التشخيص:</strong> تلف ديسك واسطوانة الدبرياج.<br><strong>💡 الإجراء:</strong> افحص مستوى زيت خزنة الدبرياج.',
        heat: '<strong>🛠️ التشخيص:</strong> نقص مياه التبريد أو تلف الترموستات.<br><strong>💡 الإجراء:</strong> توقف فوراً ولا تفتح الردياتير وهو ساخن.',
        diesel: '<strong>🛠️ التشخيص:</strong> شوائب أو مياه بفلتر الجاز.<br><strong>💡 الإجراء:</strong> صرّف المياه وغير الفلتر.',
        smoke: '<strong>🛠️ التشخيص:</strong> انسداد فلتر الهواء أو مشكلة بالتيربو.<br><strong>💡 الإجراء:</strong> نظف الفلتر وافحص الرشاشات.'
    };
    box.innerHTML = solutions[fault] || '';
}

function savePublicPostHandler(e) {
    e.preventDefault();
    const title = document.getElementById('post-title').value.trim();
    const desc = document.getElementById('post-desc').value.trim();
    let newId = String(Date.now());
    db.collection('posts').doc(newId).set({
        id: newId, companyId: currentCompanyId, title, desc, media: [], author: loggedInDriverName, date: new Date().toLocaleString('ar-EG')
    }).then(() => {
        document.getElementById('public-post-form').reset();
        alert('تم النشر بنجاح! 🚀');
    });
}

function renderPublicPosts() {
    const feed = document.getElementById('public-posts-feed');
    if (!feed) return;
    feed.innerHTML = '';
    (appData.posts || []).forEach(p => {
        let card = document.createElement('div');
        card.className = 'load-post-card';
        card.innerHTML = `<h4>📌 ${escapeHTML(p.title)}</h4><p>${escapeHTML(p.desc)}</p><small>${escapeHTML(p.author)} - ${escapeHTML(p.date)}</small>`;
        feed.appendChild(card);
    });
}

function deletePublicPost(id) {
    if (confirm('حذف المنشور؟')) db.collection('posts').doc(String(id)).delete();
}

function renderChatAccountsList() {
    const container = document.getElementById('chat-accounts-list-container');
    if(!container) return;
    const query = (document.getElementById('chat-search-input')?.value || '').toLowerCase();
    container.innerHTML = '';
    (appData.drivers || []).filter(d => d.name !== loggedInDriverName && (d.name || '').toLowerCase().includes(query)).forEach(acc => {
        let div = document.createElement('div');
        div.className = `chat-account-item ${currentChatTarget === acc.name ? 'active' : ''}`;
        div.onclick = () => selectChatRoom(acc.name);
        div.innerHTML = `<span>👤 ${escapeHTML(acc.name)}</span><small>${escapeHTML(acc.role || 'سائق')}</small>`;
        container.appendChild(div);
    });
}

function selectChatRoom(targetName) {
    currentChatTarget = targetName;
    document.getElementById('chat-current-room-title').innerText = targetName === 'general' ? 'المحادثة العامة للأسطول' : `محادثة خاصة مع: ${targetName}`;
    renderChatAccountsList();
    renderChatMessages();
}

function sendChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input-text');
    if(!input.value.trim()) return;
    let newId = String(Date.now());
    db.collection('chat').doc(newId).set({
        id: newId, companyId: currentCompanyId, sender: loggedInDriverName,
        target: currentChatTarget, text: input.value.trim(),
        time: new Date().toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'})
    });
    input.value = '';
}

function renderChatMessages() {
    const box = document.getElementById('chat-messages-list');
    if(!box) return;
    box.innerHTML = '';
    (appData.chat || []).filter(m => currentChatTarget === 'general' ? (!m.target || m.target === 'general') : ((m.sender === loggedInDriverName && m.target === currentChatTarget) || (m.sender === currentChatTarget && m.target === loggedInDriverName))).forEach(m => {
        let div = document.createElement('div');
        div.className = `chat-bubble ${m.sender === loggedInDriverName ? 'admin' : 'driver'}`;
        div.innerHTML = `<div style="font-weight:bold; font-size:9px;">${escapeHTML(m.sender)}</div><div>${escapeHTML(m.text)}</div><div style="font-size:7px; text-align:left;">${escapeHTML(m.time)}</div>`;
        box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
}

function renderChatNotificationsInbox() {
    const container = document.getElementById('chat-notifications-inbox');
    if(!container) return;
    container.innerHTML = '';
    (appData.chat || []).filter(m => m.sender !== loggedInDriverName).slice(-6).reverse().forEach(m => {
        let div = document.createElement('div');
        div.style.cssText = 'background:var(--bg); border:1px solid var(--border-color); padding:8px; border-radius:8px; font-size:10px;';
        div.innerHTML = `<strong>من: ${escapeHTML(m.sender)}</strong><p>${escapeHTML(m.text)}</p>`;
        container.appendChild(div);
    });
}

function sendQuickChatMessageFromModal() {
    const input = document.getElementById('quick-notif-reply-text');
    if(!input.value.trim()) return;
    let newId = String(Date.now());
    db.collection('chat').doc(newId).set({
        id: newId, companyId: currentCompanyId, sender: loggedInDriverName, target: 'general',
        text: input.value.trim(), time: new Date().toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'})
    }).then(() => { input.value = ''; closeModal('chatNotificationsModal'); });
}

function previewCommunityFiles(input) {
    communityFilesArr = [];
    const info = document.getElementById('community-files-preview-info');
    if(input.files && input.files.length > 0) info.innerText = `تم تحديد ${input.files.length} ملفات ✅`;
}

function publishCommunityPost() {
    const text = document.getElementById('community-post-text').value.trim();
    if (!text) return;
    let newId = String(Date.now());
    db.collection('communityPosts').doc(newId).set({
        id: newId, companyId: currentCompanyId, author: loggedInDriverName, text, likes: 0, date: new Date().toLocaleString('ar-EG')
    }).then(() => { document.getElementById('community-post-text').value = ''; renderCommunityPosts(); });
}

function renderCommunityPosts() {
    const container = document.getElementById('community-posts-container');
    if(!container) return;
    container.innerHTML = '';
    (appData.communityPosts || []).forEach(p => {
        let card = document.createElement('div');
        card.className = 'community-feed-card';
        card.innerHTML = `<strong>👨‍✈️ ${escapeHTML(p.author)}</strong> <small>${escapeHTML(p.date)}</small><p style="margin:6px 0;">${escapeHTML(p.text)}</p>`;
        container.appendChild(card);
    });
}

function showCommunityNotifications() { alert('لا توجد تنبيهات جديدة.'); }

function saveCashHandler() {
    let newId = String(Date.now());
    db.collection('treasury').doc(newId).set({
        id: newId, companyId: currentCompanyId, driverName: loggedInDriverName,
        type: document.getElementById('cash-type').value,
        amount: Number(document.getElementById('cash-amount').value),
        desc: document.getElementById('cash-desc').value.trim(),
        date: new Date().toLocaleString('ar-EG')
    }).then(() => { document.getElementById('cash-form').reset(); alert('تم تسجيل الحركة بالخزينة 💵'); });
}

function saveTruckHandler() {
    let newId = String(Date.now());
    db.collection('trucks').doc(newId).set({
        id: newId, companyId: currentCompanyId,
        num: document.getElementById('truck-num').value.trim(),
        driver: document.getElementById('driver-name').value.trim(),
        km: Number(document.getElementById('truck-km').value),
        nextOil: Number(document.getElementById('truck-next-oil').value),
        expiry: document.getElementById('truck-expiry').value
    }).then(() => { document.getElementById('truck-form').reset(); alert('تم حفظ المركبة 🚚'); });
}

function saveDocHandler() {
    const title = document.getElementById('doc-title').value.trim();
    const src = document.getElementById('doc-file').dataset.compressedSrc;
    if (!src) return;
    let newId = String(Date.now());
    db.collection('docs').doc(newId).set({ id: newId, companyId: currentCompanyId, title, src }).then(() => document.getElementById('doc-form').reset());
}

function renderDocsList() {
    const container = document.getElementById('docs-list');
    if(!container) return;
    container.innerHTML = '';
    (appData.docs || []).forEach(d => {
        let div = document.createElement('div');
        div.style.cssText = 'display:flex; justify-content:space-between; align-items:center; background:var(--bg); padding:6px; border-radius:6px; font-size:10px;';
        div.innerHTML = `<span>📄 ${escapeHTML(d.title)}</span><div><button type="button" class="btn-main btn-sm" onclick="viewMedia('${escapeHTML(d.src)}', 'image')">معاينة</button> <button type="button" class="btn-danger btn-sm" onclick="deleteDoc('${d.id}')">حذف</button></div>`;
        container.appendChild(div);
    });
}
function deleteDoc(id) { if(confirm('حذف المستند؟')) db.collection('docs').doc(String(id)).delete(); }

function saveExpenseHandler() {
    let newId = String(Date.now());
    db.collection('expenses').doc(newId).set({
        id: newId, companyId: currentCompanyId, driverName: loggedInDriverName,
        title: document.getElementById('exp-title').value.trim(),
        amount: Number(document.getElementById('exp-amount').value),
        date: new Date().toLocaleDateString('ar-EG')
    }).then(() => { document.getElementById('expense-form').reset(); alert('تم تسجيل المصروف ⛽'); });
}

function renderCRUDTable(forceSection) {
    const section = forceSection || document.getElementById('crud-section-select').value;
    const headersRow = document.getElementById('crud-table-headers');
    const tbody = document.getElementById('crud-table-body');
    if(!headersRow || !tbody) return;
    headersRow.innerHTML = ''; tbody.innerHTML = '';

    if (section === 'shipments') {
        headersRow.innerHTML = `<th>#</th><th>العميل</th><th>الحمولة</th><th>الأجرة</th><th>السائق</th><th>الحالة</th><th>إجراءات</th>`;
        (appData.shipments || []).forEach((s, idx) => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${idx+1}</td><td>${escapeHTML(s.name)}</td><td>${escapeHTML(s.item)}</td><td>${s.price} ج.م</td><td>${escapeHTML(s.assignedDriver || 'عام')}</td><td>${escapeHTML(s.status)}</td><td><button type="button" class="btn-warning btn-sm" onclick="editShipment('${s.id}'); switchTab('shipments-tab');">تعديل</button> <button type="button" class="btn-danger btn-sm" onclick="deleteShipment('${s.id}')">حذف</button></td>`;
            tbody.appendChild(tr);
        });
    } else if (section === 'drivers') {
        headersRow.innerHTML = `<th>#</th><th>الاسم</th><th>الهاتف</th><th>الرتبة</th><th>إجراءات</th>`;
        (appData.drivers || []).forEach((d, idx) => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${idx+1}</td><td>${escapeHTML(d.name)}</td><td>${escapeHTML(d.phone)}</td><td>${escapeHTML(d.role)}</td><td><button type="button" class="btn-danger btn-sm" onclick="deleteDriverAccount('${d.id}')">حذف</button></td>`;
            tbody.appendChild(tr);
        });
    }
}

function render() {
    try {
        renderDriverDropdownOptions();
        renderRSSTicker();
        
        const isMaster = (loggedInDriverName === 'كرم عجاج');
        if (document.getElementById('add-company-btn-main')) document.getElementById('add-company-btn-main').style.display = isMaster ? 'block' : 'none';
        if (document.getElementById('header-companies-btn')) document.getElementById('header-companies-btn').style.display = isMaster ? 'inline-block' : 'none';
        if (document.getElementById('master-cash-requests-card')) document.getElementById('master-cash-requests-card').style.display = isMaster ? 'block' : 'none';
        if (document.getElementById('master-saas-hub-card')) document.getElementById('master-saas-hub-card').style.display = isMaster ? 'block' : 'none';

        let shipments = appData.shipments || [];
        let totalRevenue = shipments.reduce((sum, s) => sum + Number(s.price || 0), 0);
        let totalExpenses = (appData.expenses || []).reduce((sum, e) => sum + Number(e.amount || 0), 0);
        let totalCash = (appData.treasury || []).reduce((sum, t) => sum + (t.type === 'in' ? Number(t.amount) : -Number(t.amount)), 0);
        let totalDebts = (appData.deferredInvoices || []).reduce((sum, inv) => inv.status !== 'paid' ? sum + Number(inv.remainingAmount || 0) : sum, 0);

        if(document.getElementById('stat-shipments')) document.getElementById('stat-shipments').innerText = shipments.length;
        if(document.getElementById('stat-revenue')) document.getElementById('stat-revenue').innerText = `${totalRevenue} ج.م`;
        if(document.getElementById('stat-net-profit')) document.getElementById('stat-net-profit').innerText = `${totalRevenue - totalExpenses} ج.م`;
        if(document.getElementById('stat-cash')) document.getElementById('stat-cash').innerText = `${totalCash} ج.م`;
        if(document.getElementById('stat-debts')) document.getElementById('stat-debts').innerText = `${totalDebts} ج.م`;

        const list = document.getElementById('shipments-list');
        if (list) {
            list.innerHTML = '';
            const query = (document.getElementById('global-search')?.value || '').toLowerCase();
            shipments.filter(s => {
                const match = (s.name || '').toLowerCase().includes(query) || (s.item || '').toLowerCase().includes(query);
                return currentUserRole === 'driver' ? (match && s.assignedDriver === loggedInDriverName) : match;
            }).forEach(s => {
                let net = Number(s.price || 0) - Number(s.fuelCost || 0) - Number(s.extraCost || 0);
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${escapeHTML(s.name)}</strong></td>
                    <td>${escapeHTML(s.item)}</td>
                    <td>${escapeHTML(s.assignedDriver || 'غير محدد')}</td>
                    <td>${s.price} ج.م</td>
                    <td style="color:var(--success);">${net} ج.م</td>
                    <td><select onchange="updateShipmentStatus('${s.id}', this.value)">
                        <option value="في الانتظار" ${s.status === 'في الانتظار' ? 'selected' : ''}>في الانتظار</option>
                        <option value="في الطريق" ${s.status === 'في الطريق' ? 'selected' : ''}>في الطريق</option>
                        <option value="مكتملة" ${s.status === 'مكتملة' ? 'selected' : ''}>مكتملة</option>
                    </select></td>
                    <td>
                        <button type="button" class="btn-main btn-sm" onclick="showQR('${s.id}')">📱 QR</button>
                        <button type="button" class="btn-warning btn-sm" onclick="editShipment('${s.id}')">✏️</button>
                        ${currentUserRole === 'admin' ? `<button type="button" class="btn-danger btn-sm" onclick="deleteShipment('${s.id}')">🗑️</button>` : ''}
                    </td>
                `;
                list.appendChild(tr);
            });
        }
        renderDocsList();
    } catch (err) { console.error(err); }
}

function showQR(id) {
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    new QRCode(qrContainer, { text: `https://karamegy.github.io/Na2la/?shipmentId=${id}`, width: 160, height: 160 });
    document.getElementById('qr-modal').style.display = 'flex';
}
function closeQRModal() { document.getElementById('qr-modal').style.display = 'none'; }

function updateInvoiceDropdown() {
    const select = document.getElementById('invoice-select');
    if (!select) return;
    select.innerHTML = (appData.shipments || []).map(s => `<option value="${s.id}">فاتورة: ${escapeHTML(s.name)} - ${escapeHTML(s.item)} (${s.price} ج.م)</option>`).join('');
    renderSelectedInvoice();
}

function renderSelectedInvoice() {
    const id = document.getElementById('invoice-select')?.value;
    const s = (appData.shipments || []).find(item => String(item.id) === String(id));
    if (!s) return;
    document.getElementById('inv-id').innerText = s.id;
    document.getElementById('inv-client').innerText = s.name || '-';
    document.getElementById('inv-phone').innerText = s.phone || '-';
    document.getElementById('inv-address').innerText = s.address || '-';
    document.getElementById('inv-item').innerText = s.item || '-';
    document.getElementById('inv-price').innerText = s.price || 0;
    document.getElementById('inv-status').innerText = s.status;
}

function openInvoiceStandalone() {
    const id = document.getElementById('invoice-select').value;
    const s = (appData.shipments || []).find(item => String(item.id) === String(id));
    if (!s) return;
    const win = window.open('', '_blank');
    win.document.write(`<html lang="ar" dir="rtl"><body style="font-family:sans-serif; padding:25px;"><h2>🐎 أسطورة الطريق - فاتورة #${s.id}</h2><p>العميل: ${escapeHTML(s.name)}</p><p>الأجرة: ${s.price} ج.م</p></body></html>`);
}

function exportInvoiceAsImage() {
    const area = document.getElementById('print-area');
    html2canvas(area, { useCORS: true, scale: 2 }).then(canvas => {
        saveNativeOrWebFile(canvas.toDataURL('image/png'), `invoice-${Date.now()}.png`, 'image/png');
    });
}

function exportInvoiceAsPDF() {
    const area = document.getElementById('print-area');
    html2canvas(area, { useCORS: true, scale: 2 }).then(canvas => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
        const pdfBase64 = pdf.output('datauristring');
        saveNativeOrWebFile(pdfBase64, `invoice-${Date.now()}.pdf`, 'application/pdf');
    });
}

async function sendInvoiceWhatsApp() {
    const id = document.getElementById('invoice-select').value;
    const s = (appData.shipments || []).find(item => String(item.id) === String(id));
    if (!s) return;
    const msg = `🧾 *فاتورة شحنة - أسطورة الطريق*\n*العميل:* ${s.name}\n*الحمولة:* ${s.item}\n*الأجرة:* ${s.price} ج.م`;
    if (window.CapacitorNative && await CapacitorNative.shareText('فاتورة شحنة', msg)) return;
    window.open(`https://wa.me/${s.phone || ''}?text=${encodeURIComponent(msg)}`, '_blank');
}

async function sendDailySummaryWhatsApp() {
    let totalRev = (appData.shipments || []).reduce((sum, s) => sum + Number(s.price || 0), 0);
    let msg = `📊 *التقرير اليومي لأسطورة الطريق*\nعدد الشحنات: ${(appData.shipments || []).length}\nالإيرادات: ${totalRev} ج.م`;
    if (window.CapacitorNative && await CapacitorNative.shareText('التقرير اليومي', msg)) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
}

function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(appData.shipments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "الشحنات");
    const excelBase64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    saveNativeOrWebFile(excelBase64, "na2la_data.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
}

function clearAll() {
    if (currentUserRole === 'admin' && confirm('تنبيه: إعادة تحميل المنصة؟')) location.reload();
}
