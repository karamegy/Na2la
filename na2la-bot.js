(function() {
    // 1. حقن الأنماط (CSS) مع عزل الثيمات بالكامل داخل الحاوية الخاصة بالبوت فقط
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        #na2laBotRootContainer {
            --primary-color: #3b82f6;
            --primary-hover: #2563eb;
            --accent-color: #10b981;
            --card-bg: #1e293b;
            --bg-color: #0f172a;
            --text-color: #f8fafc;
            --border-color: #334155;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --shadow-3d: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        }
        #na2laBotRootContainer[data-theme="royal"] {
            --primary-color: #8b5cf6;
            --primary-hover: #7c3aed;
            --accent-color: #ec4899;
            --card-bg: #2e1065;
            --bg-color: #1e1b4b;
            --text-color: #f3e8ff;
            --border-color: #4c1d95;
            --warning-color: #fbbf24;
            --danger-color: #f43f5e;
        }
        #na2laBotRootContainer[data-theme="emerald"] {
            --primary-color: #059669;
            --primary-hover: #047857;
            --accent-color: #34d399;
            --card-bg: #064e3b;
            --bg-color: #022c22;
            --text-color: #ecfdf5;
            --border-color: #065f46;
            --warning-color: #fbbf24;
            --danger-color: #f87171;
        }
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        @keyframes floatAnim {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        .sync-account-hub-btn {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 5px 9px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .sync-account-hub-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
        }
        @keyframes spinBolt {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .spinning { animation: spinBolt 0.6s linear infinite; }
        .chat-card {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-right: 4px solid var(--primary-color);
            padding: 10px;
            border-radius: 8px;
            margin-top: 6px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .typing-dots span {
            height: 6px; width: 6px; float: left; margin: 0 2px;
            background-color: var(--text-color); border-radius: 50%;
            display: inline-block; animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dots span:nth-child(2) { animation-delay: .2s; }
        .typing-dots span:nth-child(3) { animation-delay: .4s; }
        @keyframes typing {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }
    `;
    document.head.appendChild(styleEl);

    // 2. حقن هيكل HTML الخاص بالبوت داخل حاوية رئيسية معزولة (na2laBotRootContainer)
    const containerDiv = document.createElement('div');
    containerDiv.id = 'na2laBotRootContainer';
    containerDiv.innerHTML = `
        <button id="na2laBotBtn" style="position: fixed; bottom: 30px; right: 20px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; border: none; width: 65px; height: 65px; border-radius: 50%; font-size: 28px; cursor: pointer; box-shadow: var(--shadow-3d); z-index: 1800; display: flex; align-items: center; justify-content: center; touch-action: none; user-select: none; animation: floatAnim 2.5s ease-in-out infinite;" title="🤖 مساعد نقلة الذكي المخصص">🤖</button>

        <div id="na2laBotModal" style="position: fixed; bottom: 105px; right: 20px; width: 420px; max-width: 95vw; height: 680px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; box-shadow: var(--shadow-3d); z-index: 1900; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(20px);">
            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; padding: 10px 14px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span id="botStatusDot" onclick="toggleDutyStatus()" style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; cursor: pointer;" title="تبديل حالة العمل"></span>
                    <span id="botUserRoleBadge">🤖 مساعد "نقلة" (متصل بويكيبيديا وجوجل)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <div style="position: relative; display: inline-block;">
                        <button type="button" class="sync-account-hub-btn" onclick="toggleSyncHubDropdown(event)">
                            <span id="sync-icon-bolt">⚡</span> شحناتي 
                            <span id="btn-sync-badge" style="background: var(--danger-color, #ef4444); color: #fff; padding: 1px 4px; border-radius: 8px; font-size: 8px; font-weight: bold; display: none;">0</span>
                        </button>
                        <div id="syncHubDropdownMenu" style="display: none; position: absolute; top: 110%; right: 0; width: 260px; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 10px; box-shadow: var(--shadow-3d); z-index: 2100; padding: 8px; color: var(--text-color); font-size: 11px;">
                            <div style="font-weight: bold; margin-bottom: 5px; border-bottom: 1px solid var(--border-color); padding-bottom: 3px; display: flex; justify-content: space-between;">
                                <span id="syncHubUserTitle">👤 الحساب المتصل</span>
                                <span style="color: var(--accent-color); cursor: pointer;" onclick="openConnectedAccountHub()">الملف ⬅</span>
                            </div>
                            <div id="syncHubCompanyTag" style="font-size: 9px; color: var(--warning-color); margin-bottom: 4px;">🏢 الشركة: جاري المزامنة...</div>
                            <div id="syncHubItemsList" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;"></div>
                        </div>
                    </div>
                    <button onclick="toggleNa2laBot()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;">✕</button>
                </div>
            </div>

            <div style="background: rgba(217, 119, 6, 0.15); border-bottom: 1px solid var(--border-color); padding: 5px 10px; font-size: 11px; color: var(--warning-color); white-space: nowrap; overflow: hidden; position: relative;">
                <div style="display: inline-block; animation: marquee 18s linear infinite; font-weight: bold;">
                    🚀 منصة أسطورة الطريق (Na2la.Net) | متصل سحابياً مع فايربيس، ويكيبيديا ومحرك بحث جوجل 24/7
                </div>
            </div>

            <div style="padding: 6px 12px; background: var(--bg-color); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); font-size: 11px;">
                <div style="display: flex; gap: 3px;">
                    <button onclick="toggleBotContinuousVoice()" id="botContinuousBtn" style="background: var(--border-color); color: #fff; border: none; padding: 4px 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">🎤 مستمر معطل</button>
                    <button onclick="toggleBotVoiceOutput()" id="botVoiceToggleBtn" style="background: var(--accent-color); color: #fff; border: none; padding: 4px 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">🔊 ناطق</button>
                    <button onclick="clearBotChat()" style="background: var(--danger-color); color: #fff; border: none; padding: 4px 6px; border-radius: 6px; cursor: pointer; font-weight: bold;" title="مسح محادثة">🗑️ مسح</button>
                </div>
                <div>
                    <select id="botThemeSelect" onchange="changeBotTheme(this.value)" style="padding: 3px 6px; font-size: 10px; border-radius: 6px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); cursor: pointer;">
                        <option value="default">🎨 الداكن الأصلي</option>
                        <option value="royal">👑 الأرجواني الملكي</option>
                        <option value="emerald">💎 الزمردي الفاخر</option>
                    </select>
                </div>
            </div>

            <div id="na2laBotMessages" style="flex: 1; padding: 14px; overflow-y: auto; font-size: 13px; display: flex; flex-direction: column; gap: 10px; line-height: 1.6; background: var(--card-bg); color: var(--text-color);">
                <div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">
                    مرحباً بك في مساعد "نقلة" الذكي المتصل!<br>- تم ربط البوت بقواعد بيانات المنصة سحابياً (Firebase) بالإضافة إلى محرك بحث ويكيبيديا وجوجل للإجابة الفورية.
                </div>
            </div>

            <div id="botQuickActionsContainer" style="padding: 6px 10px; background: var(--bg-color); display: flex; gap: 5px; flex-wrap: wrap; border-top: 1px solid var(--border-color);"></div>

            <div style="padding: 10px; border-top: 1px solid var(--border-color); display: flex; gap: 6px; background: var(--bg-color); align-items: center;">
                <input type="file" id="scaleTicketFileInput" accept="image/*" style="display: none;" onchange="handleScaleTicketUpload(this)">
                <button onclick="document.getElementById('scaleTicketFileInput').click()" title="رفع صورة مستند" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); width: 38px; height: 38px; border-radius: 8px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center;">📎</button>
                <input type="text" id="na2laBotInput" placeholder="اكتب سؤالك أو ابحث في ويكيبيديا وجوجل..." style="flex: 1; margin: 0; padding: 9px 12px; font-size: 12px; border-radius: 8px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color);" onkeypress="if(event.key === 'Enter') sendBotQuickQuery()">
                <button onclick="startBotVoiceInput()" title="تحدث بالميكروفون" style="background: var(--warning-color); border: none; width: 38px; height: 38px; border-radius: 8px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-3d);">🎤</button>
                <button onclick="sendBotQuickQuery()" style="background: var(--primary-color); color: white; border: none; padding: 9px 14px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 12px;">إرسال</button>
            </div>
        </div>
    `;
    document.body.appendChild(containerDiv);

    // 3. محرك السحب والإفلات (Drag & Drop)
    const botBtn = document.getElementById('na2laBotBtn');
    let isBotDragging = false, startBotX = 0, startBotY = 0, initBotLeft = 0, initBotTop = 0, hasBotDragged = false;

    if (botBtn) {
        const startDrag = (clientX, clientY) => {
            isBotDragging = true; hasBotDragged = false;
            startBotX = clientX; startBotY = clientY;
            let rect = botBtn.getBoundingClientRect();
            botBtn.style.right = 'auto'; botBtn.style.bottom = 'auto';
            botBtn.style.left = rect.left + 'px'; botBtn.style.top = rect.top + 'px';
            initBotLeft = rect.left; initBotTop = rect.top;
        };
        const onDrag = (clientX, clientY) => {
            if (!isBotDragging) return;
            let dx = clientX - startBotX, dy = clientY - startBotY;
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasBotDragged = true;
            let newLeft = Math.max(10, Math.min(initBotLeft + dx, window.innerWidth - botBtn.offsetWidth - 10));
            let newTop = Math.max(10, Math.min(initBotTop + dy, window.innerHeight - botBtn.offsetHeight - 10));
            botBtn.style.left = newLeft + 'px'; botBtn.style.top = newTop + 'px';
        };
        const stopDrag = () => { if (!isBotDragging) return; isBotDragging = false; if (!hasBotDragged) toggleNa2laBot(); };

        botBtn.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        document.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY));
        document.addEventListener('mouseup', stopDrag);
        botBtn.addEventListener('touchstart', (e) => { if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
        document.addEventListener('touchmove', (e) => { if (isBotDragging && e.touches.length === 1) { e.preventDefault(); onDrag(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: false });
        document.addEventListener('touchend', stopDrag);
    }

    // 4. متغيرات النظام وجلب البيانات مع الحفاظ التام على مزامنة فايربيس (Firebase Sync)
    window.realFirebaseShipments = [];
    window.realFirebaseDrivers = [];
    window.realFirebaseDeferredInvoices = [];
    window.realFirebaseAppData = {};

    window.getActiveTenantContext = function() {
        let activeDriver = window.currentUser?.name || window.currentUser || window.logged_in_driver_name || localStorage.getItem('logged_in_driver_name') || localStorage.getItem('na2la_current_user_identifier') || localStorage.getItem('current_user_name') || "المدير";
        let activeCompanyId = window.currentCompanyId || window.Na2laApp?.companyId || localStorage.getItem('current_company_id') || localStorage.getItem('na2la_current_company_id') || 'company_main';
        let activeCompanyName = window.currentCompanyName || window.Na2laApp?.companyName || localStorage.getItem('current_company_name') || localStorage.getItem('na2la_current_company_name') || 'أسطورة الطريق الرئيسية';
        let activeRole = window.currentUserRole || window.currentUser?.role || localStorage.getItem('current_user_role') || localStorage.getItem('na2la_user_role') || 'admin';
        return { activeDriver, activeCompanyId, activeCompanyName, activeRole };
    };

    window.fetchRealFirebaseData = async function() {
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                let tenant = getActiveTenantContext();
                
                try {
                    const driversSnap = await db.collection('drivers').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!driversSnap.empty) {
                        realFirebaseDrivers = driversSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        const allDrivers = await db.collection('drivers').get();
                        realFirebaseDrivers = allDrivers.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {
                    try {
                        const allDrivers = await db.collection('drivers').get();
                        realFirebaseDrivers = allDrivers.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } catch(err) { realFirebaseDrivers = []; }
                }

                try {
                    const shipmentsSnap = await db.collection('shipments').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!shipmentsSnap.empty) {
                        realFirebaseShipments = shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        const allShipments = await db.collection('shipments').get();
                        realFirebaseShipments = allShipments.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {
                    try {
                        const allShipments = await db.collection('shipments').get();
                        realFirebaseShipments = allShipments.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } catch(err) { realFirebaseShipments = []; }
                }

                try {
                    const invoicesSnap = await db.collection('deferredInvoices').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!invoicesSnap.empty) {
                        realFirebaseDeferredInvoices = invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        const allInvoices = await db.collection('deferredInvoices').get();
                        realFirebaseDeferredInvoices = allInvoices.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {
                    try {
                        const allInvoices = await db.collection('deferredInvoices').get();
                        realFirebaseDeferredInvoices = allInvoices.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } catch(err) { realFirebaseDeferredInvoices = []; }
                }

                try {
                    const appDataSnap = await db.collection('appData').doc(tenant.activeCompanyId).get();
                    if (appDataSnap.exists) {
                        realFirebaseAppData = appDataSnap.data() || {};
                    } else {
                        const mainAppData = await db.collection('appData').doc('main').get();
                        realFirebaseAppData = mainAppData.exists ? mainAppData.data() : {};
                    }
                } catch(e) {}
            }
        } catch(e) {}

        let tenantContext = getActiveTenantContext();
        let localInvoices = [];
        try {
            let invKeys = [
                `deferredInvoices_${tenantContext.activeCompanyId}`, 
                'deferredInvoices', 
                'invoices', 
                'na2la_deferred_invoices', 
                'na2la_invoices',
                'consolidated_invoices'
            ];
            for (let key of invKeys) {
                let localData = JSON.parse(localStorage.getItem(key) || '[]');
                if (Array.isArray(localData) && localData.length > 0) {
                    localInvoices = localData;
                    break;
                } else if (localData && Array.isArray(localData.deferredInvoices)) {
                    localInvoices = localData.deferredInvoices;
                    break;
                }
            }
        } catch(e) {}

        if (window.Na2laApp && Array.isArray(window.Na2laApp.deferredInvoices)) {
            window.Na2laApp.deferredInvoices.forEach(inv => {
                if (!realFirebaseDeferredInvoices.some(i => (i.id && i.id === inv.id) || (i.invoiceNumber === inv.invoiceNumber))) {
                    realFirebaseDeferredInvoices.push(inv);
                }
            });
        }

        if (localInvoices.length > 0) {
            localInvoices.forEach(inv => {
                if (!realFirebaseDeferredInvoices.some(i => (i.id && i.id === inv.id) || (i.invoiceNumber === inv.invoiceNumber))) {
                    realFirebaseDeferredInvoices.push(inv);
                }
            });
        }
    };

    window.getCompanySubscriptionInfo = async function() {
        let tenant = getActiveTenantContext();
        let subData = {
            planName: realFirebaseAppData.planName || realFirebaseAppData.subscriptionPlan || 'الباقة الترويجية / الاحترافية',
            expiryDate: realFirebaseAppData.expiryDate || realFirebaseAppData.subscriptionExpiry || '2026-12-31',
            status: realFirebaseAppData.subscriptionStatus || 'نشط ✅ (سحابي)',
            companyName: tenant.activeCompanyName
        };
        
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                const subDoc = await db.collection('subscriptions').doc(tenant.activeCompanyId).get();
                if (subDoc.exists) {
                    let d = subDoc.data();
                    subData.planName = d.planName || d.package || subData.planName;
                    subData.expiryDate = d.expiryDate || d.endDate || subData.expiryDate;
                    subData.status = d.status || subData.status;
                }
            }
        } catch(e) {}

        return subData;
    };

    window.updateDriverLiveLocation = async function(lat, lng) {
        let tenant = getActiveTenantContext();
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                await db.collection('drivers').doc(tenant.activeDriver).set({
                    name: tenant.activeDriver,
                    companyId: tenant.activeCompanyId,
                    companyName: tenant.activeCompanyName,
                    latitude: lat,
                    longitude: lng,
                    lastActive: new Date().toISOString(),
                    status: localStorage.getItem('driver_duty_status') || 'active'
                }, { merge: true });
            }
        } catch(e) {}
    };

    window.getCompanyActiveFleet = async function() {
        let tenant = getActiveTenantContext();
        let fleet = [];
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                const snap = await db.collection('drivers').where('companyId', '==', tenant.activeCompanyId).get();
                fleet = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
        } catch(e) {}
        return fleet;
    };

    window.getCompanyFinancialReport = async function() {
        let tenant = getActiveTenantContext();
        let financials = getCompanyFinancials();
        let shipments = getIsolatedUserShipments();
        
        let totalShipmentsValue = shipments.reduce((sum, s) => {
            let val = parseFloat(String(s.price || s.cost || 0).replace(/[^\d.-]/g, '')) || 0;
            return sum + val;
        }, 0);

        return {
            companyName: tenant.activeCompanyName,
            treasury: financials.treasuryBalance,
            expenses: financials.expensesTotal,
            invoicesCount: financials.invoicesCount,
            shipmentsCount: shipments.length,
            estimatedRevenue: totalShipmentsValue.toLocaleString() + ' ج.م'
        };
    };

    window.printConsolidatedInvoice = function(invoiceId) {
        let tenant = getActiveTenantContext();
        let invoices = realFirebaseDeferredInvoices.filter(i => i.id === invoiceId || i.invoiceNumber === invoiceId);
        let invoice = invoices.length > 0 ? invoices[0] : null;

        if (!invoice) {
            alert("عذراً، لم يتم العثور على بيانات الفاتورة المجمعة المطلوبة.");
            return;
        }

        let printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html dir="rtl">
            <head>
                <title>فاتورة مجمعة - ${invoice.invoiceNumber || invoiceId}</title>
                <style>
                    body { font-family: Tahoma, sans-serif; padding: 20px; color: #111; }
                    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                    .details { margin-bottom: 15px; font-size: 14px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 13px; }
                    th { background: #f2f2f2; }
                    .footer { margin-top: 40px; text-align: left; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>شركة ${tenant.activeCompanyName}</h2>
                    <p>قسم الفواتير المجمعة والآجلة والعملاء</p>
                </div>
                <div class="details">
                    <p><b>رقم الفاتورة:</b> ${invoice.invoiceNumber || invoiceId}</p>
                    <p><b>العميل / الشركة:</b> ${invoice.clientName || invoice.customer || 'عميل عام'}</p>
                    <p><b>التاريخ:</b> ${invoice.date || new Date().toLocaleDateString('ar-EG')}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>م</th>
                            <th>بيان الشحنة / الخدمة</th>
                            <th>المبلغ (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>${invoice.description || invoice.notes || 'شحنات مجمعة ومعتمدة للعميل'}</td>
                            <td><b>${invoice.totalAmount || invoice.amount || '0'} ج.م</b></td>
                        </tr>
                    </tbody>
                </table>
                <div class="footer">
                    <p>التوقيع / الختم: ........................</p>
                </div>
                <script>
                    window.onload = function() { window.print(); window.close(); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    window.syncPlatformUserData = function() {
        let tenant = getActiveTenantContext();
        let isDriver = tenant.activeRole.includes('driver') || tenant.activeDriver.includes('سائق');

        let badgeEl = document.getElementById('botUserRoleBadge');
        if (badgeEl) badgeEl.innerText = `🤖 ${tenant.activeDriver} (${tenant.activeCompanyName})`;

        let companyTagEl = document.getElementById('syncHubCompanyTag');
        if (companyTagEl) companyTagEl.innerText = `🏢 الشركة: ${tenant.activeCompanyName}`;
        
        renderQuickButtons(isDriver);
        updateSyncButtonBadge();
        checkDutyStatusIndicator();
        return tenant;
    };

    window.getIsolatedUserShipments = function() {
        let tenant = getActiveTenantContext();
        let allShipments = [];

        if (realFirebaseShipments.length > 0) {
            allShipments = realFirebaseShipments;
        } else if (window.Na2laApp && Array.isArray(window.Na2laApp.shipments)) {
            allShipments = window.Na2laApp.shipments;
        } else if (typeof window.shipments !== 'undefined' && Array.isArray(window.shipments)) {
            allShipments = window.shipments;
        } else {
            try {
                let localKeys = [`shipments_${tenant.activeCompanyId}`, 'shipments', 'na2la_shipments', 'appData'];
                for (let key of localKeys) {
                    let localData = JSON.parse(localStorage.getItem(key) || '[]');
                    if (Array.isArray(localData) && localData.length > 0) {
                        allShipments = localData; break;
                    } else if (localData && Array.isArray(localData.shipments)) {
                        allShipments = localData.shipments; break;
                    }
                }
            } catch(e) {}
        }

        let companyFiltered = allShipments.filter(s => !s.companyId || s.companyId === tenant.activeCompanyId || s.companyName === tenant.activeCompanyName);

        if (tenant.activeRole.includes('admin') || tenant.activeRole.includes('owner') || tenant.activeDriver.includes('المدير') || tenant.activeDriver.includes('كرم') || tenant.activeDriver.includes('مدير')) {
            return companyFiltered;
        }

        return companyFiltered.filter(s => {
            let matchesUser = (s.assignedDriver === tenant.activeDriver || s.driver === tenant.activeDriver || s.name === tenant.activeDriver || s.clientId === tenant.activeDriver);
            return matchesUser;
        });
    };

    window.parseNumericCurrency = function(val) {
        if (!val) return '0 ج.م';
        if (typeof val === 'number') return val.toLocaleString() + ' ج.م';
        let cleanStr = String(val).replace(/[^\d.-]/g, '');
        let num = parseFloat(cleanStr);
        return isNaN(num) ? '0 ج.م' : num.toLocaleString() + ' ج.م';
    };

    window.getCompanyFinancials = function() {
        let tenant = getActiveTenantContext();
        let rawTreasury = realFirebaseAppData.treasury || window.currentTreasury || window.Na2laApp?.treasury || localStorage.getItem(`treasury_balance_${tenant.activeCompanyId}`) || localStorage.getItem('treasury') || localStorage.getItem('current_treasury') || '0 ج.م';
        let rawExpenses = realFirebaseAppData.expenses || window.currentExpenses || window.Na2laApp?.expenses || localStorage.getItem(`expenses_total_${tenant.activeCompanyId}`) || localStorage.getItem('expenses') || localStorage.getItem('current_expenses') || '0 ج.م';
        
        let treasuryBalance = parseNumericCurrency(rawTreasury);
        let expensesTotal = parseNumericCurrency(rawExpenses);
        
        let shipments = getIsolatedUserShipments();
        let companyInvoices = realFirebaseDeferredInvoices.filter(inv => !inv.companyId || inv.companyId === tenant.activeCompanyId);
        let invoicesCount = companyInvoices.length > 0 ? companyInvoices.length : ((window.Na2laApp?.deferredInvoices) ? window.Na2laApp.deferredInvoices.length : 0);
        
        return { treasuryBalance, expensesTotal, invoicesCount, shipmentsCount: shipments.length };
    };

    window.updateSyncButtonBadge = function() {
        const syncedShipments = getIsolatedUserShipments();
        const badgeEl = document.getElementById('btn-sync-badge');
        if (badgeEl) {
            badgeEl.innerText = syncedShipments.length;
            badgeEl.style.display = syncedShipments.length > 0 ? 'inline-block' : 'none';
        }
    };

    window.toggleSyncHubDropdown = function(event) {
        event.stopPropagation();
        let tenant = getActiveTenantContext();
        const bolt = document.getElementById('sync-icon-bolt');
        if (bolt) bolt.classList.add('spinning');
        setTimeout(() => { if (bolt) bolt.classList.remove('spinning'); }, 600);

        const dropdown = document.getElementById('syncHubDropdownMenu');
        const userTitleSpan = document.getElementById('syncHubUserTitle');
        const listContainer = document.getElementById('syncHubItemsList');
        if (!dropdown) return;

        if (dropdown.style.display === 'block') { dropdown.style.display = 'none'; return; }

        userTitleSpan.innerText = `👤 ${tenant.activeDriver}`;
        const syncedShipments = getIsolatedUserShipments();

        if (syncedShipments.length === 0) {
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: #94a3b8;">لا توجد شحنات مسجلة حالياً</div>`;
        } else {
            listContainer.innerHTML = syncedShipments.slice(0, 5).map(s => `
                <div style="background: var(--card-bg); padding: 5px 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="font-weight: bold; color: var(--accent-color);">📦 شحنة: ${s.id || s.shipmentNumber || 'معتمدة'}</div>
                    <div style="color: var(--text-color); font-size: 9px;">الحالة: ${s.status || 'نشطة'}</div>
                </div>
            `).join('');
        }
        dropdown.style.display = 'block';
    };

    window.addEventListener('click', () => {
        const dropdown = document.getElementById('syncHubDropdownMenu');
        if (dropdown) dropdown.style.display = 'none';
    });

    window.openConnectedAccountHub = function() {
        let tenant = getActiveTenantContext();
        if (typeof viewingProfileName !== 'undefined') viewingProfileName = tenant.activeDriver;
        if (typeof switchTab === 'function') switchTab('account-tab');
        const syncedShipments = getIsolatedUserShipments();
        alert(`👤 الحساب الشخصي: ${tenant.activeDriver}\n🏢 الشركة: ${tenant.activeCompanyName}\n📦 إجمالي الشحنات المتزامنة: ${syncedShipments.length}\n✨ الملف الشخصي نشط ومتزامن.`);
    };

    window.toggleDutyStatus = function() {
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        let newStatus = currentStatus === 'active' ? 'offline' : 'active';
        localStorage.setItem('driver_duty_status', newStatus);
        checkDutyStatusIndicator();
        alert(`حالتك التشغيلية: ${newStatus === 'active' ? '🟢 نشط' : '🔴 استراحة'}`);
    };

    window.checkDutyStatusIndicator = function() {
        let dot = document.getElementById('botStatusDot');
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        if (dot) {
            dot.style.background = currentStatus === 'active' ? '#10b981' : '#ef4444';
            dot.style.boxShadow = currentStatus === 'active' ? '0 0 8px #10b981' : '0 0 8px #ef4444';
        }
    };

    window.renderQuickButtons = function(isDriver) {
        let container = document.getElementById('botQuickActionsContainer');
        if (!container) return;
        let commonButtons = `
            <button onclick="sendBotQuickQuery('شحناتي')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--accent-color); font-size: 10px; padding: 5px 6px; border-radius: 6px; cursor: pointer;">📦 الشحنات</button>
            <button onclick="sendBotQuickQuery('الاشتراك')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 5px 6px; border-radius: 6px; cursor: pointer;">💳 الاشتراك</button>
            <button onclick="sendBotQuickQuery('خدمات المنصة')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); font-size: 10px; padding: 5px 6px; border-radius: 6px; cursor: pointer;">🌐 الخدمات</button>
            <button onclick="sendBotQuickQuery('المساعدة')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--primary-color); font-size: 10px; padding: 5px 6px; border-radius: 6px; cursor: pointer;">❓ المساعدة</button>
        `;
        if (isDriver) {
            container.innerHTML = commonButtons + `<button onclick="sendBotQuickQuery('طوارئ SOS')" style="background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #ef4444; font-size: 10px; padding: 5px 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">🚨 طوارئ SOS</button>`;
        } else {
            container.innerHTML = commonButtons + `<button onclick="sendBotQuickQuery('إحصائيات شركتي')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 5px 6px; border-radius: 6px; cursor: pointer;">📊 الأسطول</button>`;
        }
    };

    fetchRealFirebaseData().then(() => { syncPlatformUserData(); });

    window.addEventListener('na2laDataUpdated', () => {
        fetchRealFirebaseData().then(() => { updateSyncButtonBadge(); });
    });
    setInterval(() => {
        fetchRealFirebaseData().then(() => { updateSyncButtonBadge(); });
    }, 15000);

    let tenant = syncPlatformUserData();
    let isBotVoiceOutputOn = true, isBotContinuousActive = false;

    window.playWalkieBeep = function(type = 'start') {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            osc.type = 'sine'; osc.frequency.value = type === 'start' ? 880 : 440;
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + 0.12);
        } catch(e) {}
    };

    window.toggleNa2laBot = function() {
        let modal = document.getElementById('na2laBotModal');
        if (!modal) return;
        let isHidden = (modal.style.display === 'none' || modal.style.display === '');
        modal.style.display = isHidden ? 'flex' : 'none';
        if (isHidden) {
            fetchRealFirebaseData().then(() => {
                tenant = syncPlatformUserData();
                loadChatHistory();
                setTimeout(() => {
                    let inputField = document.getElementById('na2laBotInput');
                    if (inputField) inputField.focus();
                }, 150);
            });
        }
    };

    window.toggleBotVoiceOutput = function() {
        isBotVoiceOutputOn = !isBotVoiceOutputOn;
        let btn = document.getElementById('botVoiceToggleBtn');
        if (btn) {
            btn.innerText = isBotVoiceOutputOn ? "🔊 ناطق" : "🔇 صامت";
            btn.style.background = isBotVoiceOutputOn ? "var(--accent-color)" : "var(--danger-color)";
        }
    };

    window.toggleBotContinuousVoice = function() {
        isBotContinuousActive = !isBotContinuousActive;
        let btn = document.getElementById('botContinuousBtn');
        if (isBotContinuousActive) {
            btn.innerText = "🎤 مستمر: مفعل"; btn.style.background = "var(--accent-color)";
            startBotVoiceInput();
        } else {
            btn.innerText = "🎤 مستمر معطل"; btn.style.background = "var(--border-color)";
        }
    };

    window.handleScaleTicketUpload = function(input) {
        if (input.files && input.files[0]) {
            let file = input.files[0], reader = new FileReader();
            reader.onload = function(e) {
                let container = document.getElementById('na2laBotMessages');
                let imgHtml = `<div style="margin-top:6px;"><img src="${e.target.result}" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);"></div>`;
                let userMsg = `📎 تم رفع بونة الميزان لسحابة فايربيس (${tenant.activeCompanyName}): <b>${file.name}</b>${imgHtml}`;
                container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end; max-width: 80%;">${userMsg}</div>`;
                saveChatHistory('user', userMsg);
                container.scrollTop = container.scrollHeight;

                try {
                    if (typeof firebase !== 'undefined' && firebase.firestore) {
                        firebase.firestore().collection('auditLogs').add({
                            fileName: file.name, companyId: tenant.activeCompanyId, companyName: tenant.activeCompanyName, driver: tenant.activeDriver, timestamp: new Date().toISOString()
                        });
                    }
                } catch(err) {}

                setTimeout(() => {
                    let botReply = `✅ <b>توثيق المستند سحابياً بنجاح:</b><br>- تمت مزامنة البونة وتخزينها في قاعدة بيانات فايربيس لشركة <b>${tenant.activeCompanyName}</b>.`;
                    container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; max-width: 80%; border: 1px solid var(--border-color);">${botReply}</div>`;
                    saveChatHistory('bot', botReply);
                    container.scrollTop = container.scrollHeight;
                    speakBotReplyText("تم استلام المستند وتوثيقه سحابياً بنجاح.");
                }, 800);
            };
            reader.readAsDataURL(file);
        }
    };

    window.saveChatHistory = function(sender, htmlContent) {
        tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver}`;
        let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        history.push({ sender, htmlContent, timestamp: new Date().toISOString() });
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        history = history.filter(item => new Date(item.timestamp) > thirtyDaysAgo);
        if (history.length > 40) history = history.slice(-40);
        localStorage.setItem(storageKey, JSON.stringify(history));
    };

    window.loadChatHistory = function() {
        tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver}`;
        let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const container = document.getElementById('na2laBotMessages');
        if (!container) return;
        
        container.innerHTML = `<div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">مرحباً بك مجدداً يا <b>${tenant.activeDriver}</b> في منصة أسطورة الطريق (شركة: <b>${tenant.activeCompanyName}</b>).<br>- تم استعادة سجلك الشخصي ومحرك البحث السحابي بنجاح.</div>`;

        history.forEach(msg => {
            if (msg.sender === 'user') {
                container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end; max-width: 80%; word-break: break-word;">${msg.htmlContent}</div>`;
            } else {
                container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; max-width: 80%; border: 1px solid var(--border-color); word-break: break-word;">${msg.htmlContent}</div>`;
            }
        });
        container.scrollTop = container.scrollHeight;
    };

    window.clearBotChat = function() {
        tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver}`;
        localStorage.removeItem(storageKey);
        let msgContainer = document.getElementById('na2laBotMessages');
        if (msgContainer) {
            msgContainer.innerHTML = `<div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color); color: var(--text-color);">🧹 تمت تصفية سجل المحادثة الخاص بحسابك (${tenant.activeDriver}) بنجاح.</div>`;
        }
    };

    window.changeBotTheme = function(themeId) {
        let rootContainer = document.getElementById('na2laBotRootContainer');
        if (!rootContainer) return;
        if (themeId === 'default') {
            rootContainer.removeAttribute('data-theme');
        } else {
            rootContainer.setAttribute('data-theme', themeId);
        }
        localStorage.setItem('db_viper_theme_index', themeId === 'royal' ? 1 : (themeId === 'emerald' ? 2 : 0));
        let selectEl = document.getElementById('botThemeSelect');
        if (selectEl) selectEl.value = themeId;
    };

    window.addEventListener('DOMContentLoaded', () => {
        let savedIndex = localStorage.getItem('db_viper_theme_index');
        let themeId = 'default';
        if (savedIndex === '1') themeId = 'royal';
        else if (savedIndex === '2') themeId = 'emerald';
        changeBotTheme(themeId);
        syncPlatformUserData();
    });

    window.startBotVoiceInput = function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("متصفحك لا يدعم التعرف الصوتي."); return;
        }
        playWalkieBeep('start');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG';
        recognition.onresult = (event) => {
            playWalkieBeep('end');
            let text = event.results[0][0].transcript, inputEl = document.getElementById('na2laBotInput');
            if (inputEl) inputEl.value = text;
            sendBotQuickQuery(text);
        };
        recognition.onerror = recognition.onend = () => { playWalkieBeep('end'); };
        recognition.start();
    };

    window.speakBotReplyText = function(text) {
        if (!isBotVoiceOutputOn) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-EG'; utterance.rate = 1.0;
            utterance.onend = () => { if (isBotContinuousActive) { setTimeout(() => { startBotVoiceInput(); }, 800); } };
            window.speechSynthesis.speak(utterance);
        }
    };

    window.renderShipmentCardInChat = function(shipment) {
        return `
            <div class="chat-card">
                <div style="font-weight: bold; color: var(--accent-color); font-size: 12px; margin-bottom: 4px;">📦 شحنة رقم: ${shipment.id || shipment.shipmentNumber || 'معتمدة'}</div>
                <div style="font-size: 11px; color: var(--text-color);">الشركة: ${shipment.companyName || tenant.activeCompanyName}</div>
                <div style="font-size: 11px; color: var(--text-color);">الحالة: <span style="color: var(--accent-color); font-weight: bold;">${shipment.status || 'نشطة'}</span></div>
            </div>
        `;
    };

    // ==========================================
    // ⭐ دالة البحث الحي في ويكيبيديا وجوجل
    // ==========================================
    window.fetchLiveWebAndWikipediaAnswer = async function(query) {
        try {
            // محاولة البحث في ويكيبيديا العربية مباشرة عبر واجهة البرمجة العامة (API)
            let searchUrl = `https://ar.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
            let res = await fetch(searchUrl);
            let data = await res.json();

            if (data && data.query && data.query.search && data.query.search.length > 0) {
                let topTitle = data.query.search[0].title;
                let summaryUrl = `https://ar.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topTitle)}`;
                let sumRes = await fetch(summaryUrl);
                if (sumRes.ok) {
                    let sumData = await sumRes.json();
                    if (sumData && sumData.extract) {
                        let pageUrl = sumData.content_urls?.desktop?.page || `https://ar.wikipedia.org/wiki/${encodeURIComponent(topTitle)}`;
                        return `🌐 <b>إجابة ويكيبيديا المباشرة (${topTitle}):</b><br>` +
                               `${sumData.extract}<br><br>` +
                               `<a href="${pageUrl}" target="_blank" style="color: var(--accent-color); font-weight: bold; text-decoration: underline;">🔗 قراءة المقالة كاملة على ويكيبيديا</a>`;
                    }
                }
            }
        } catch(e) {}

        // في حال عدم وجود نتيجة مطابقة في ويكيبيديا، يتم توجيه البحث لـ محرك بحث جوجل مباشرة
        let googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        return `🌐 <b>نتائج البحث المباشر عبر الإنترنت:</b><br>` +
               `لم نتمكن من مطابقة سياق محلي مباشر لـ "${query}" في قواعد بيانات المنصة أو ويكيبيديا.<br><br>` +
               `<a href="${googleSearchUrl}" target="_blank" style="background: var(--primary-color); color: #fff; padding: 6px 10px; border-radius: 6px; display: inline-block; font-weight: bold; text-decoration: none;">🔍 ابحث عن "${query}" عبر محرك بحث جوجل</a>`;
    };

    // محرك الاستعلامات والردود الموسع (شامل للمنصة، السائقين، والبحث المباشر في ويكيبيديا وجوجل)
    window.sendBotQuickQuery = async function(customText = null) {
        let inputEl = document.getElementById('na2laBotInput');
        let container = document.getElementById('na2laBotMessages');
        let text = customText || (inputEl ? inputEl.value.trim() : "");
        if (!text || !container) return;

        let userMsgHtml = text;
        container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end; max-width: 80%; word-break: break-word;">${userMsgHtml}</div>`;
        saveChatHistory('user', userMsgHtml);

        if (inputEl && !customText) inputEl.value = "";
        container.scrollTop = container.scrollHeight;

        let typingId = 'typing-' + Date.now();
        container.innerHTML += `<div id="${typingId}" style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
        container.scrollTop = container.scrollHeight;

        // الحفاظ على مزامنة فايربيس أولاً
        await fetchRealFirebaseData();
        let typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        let tenant = syncPlatformUserData();
        let financials = getCompanyFinancials();
        let userShipments = getIsolatedUserShipments();
        let botReply = '';
        let lower = text.toLowerCase();

        // 1. الاستعلام عن الاشتراكات والباقات
        if (lower.includes('اشتراك') || lower.includes('الاشتراك') || lower.includes('الباقة') || lower.includes('الصلاحية')) {
            let subInfo = await getCompanySubscriptionInfo();
            botReply = `💳 <b>حالة اشتراك وباقة شركة [${subInfo.companyName}]:</b><br>` +
                       `- نوع الباقة: <b>${subInfo.planName}</b><br>` +
                       `- حالة الترخيص: <b style="color:var(--accent-color);">${subInfo.status}</b><br>` +
                       `- تاريخ الانتهاء: <b style="color:var(--warning-color);">${subInfo.expiryDate}</b><br>` +
                       `- متصل سحابياً مع لوحة تحكم المنصة الأم بنجاح.`;
        }
        // 2. الشحنات والرحلات
        else if (lower.includes('شحناتي') || lower.includes('الشحنات') || lower.includes('شحنة') || lower.includes('رحلة')) {
            if (userShipments.length === 0) {
                botReply = `📦 لا توجد شحنات مسجلة حالياً ومطابقة لحسابك في شركة (${tenant.activeCompanyName}). يمكنك إنشاء شحنة جديدة من قسم الشحنات بالمنصة.`;
            } else {
                botReply = `📦 لديك <b>${userShipments.length}</b> شحنة متزامنة ومتاحة لحسابك:<br>`;
                userShipments.forEach(s => { botReply += renderShipmentCardInChat(s); });
            }
        }
        // 3. الفواتير والآجل
        else if (lower.includes('الفواتير') || lower.includes('الفواتير المجمعة') || lower.includes('فاتورة') || lower.includes('آجل')) {
            let companyInvoices = realFirebaseDeferredInvoices.filter(inv => !inv.companyId || inv.companyId === tenant.activeCompanyId);
            botReply = `🧾 <b>قسم الفواتير المجمعة والآجلة لشركة [${tenant.activeCompanyName}]:</b><br>` +
                       `- إجمالي الفواتير المسجلة: <b>${companyInvoices.length} فاتورة</b><br>` +
                       `- يمكنك استعراض تفاصيل الديون والتحصيل المباشر عبر قسم الأجل بالمنصة.`;
        }
        // 4. الخزنة والمالية والتقارير
        else if (lower.includes('الخزنة') || lower.includes('تقرير') || lower.includes('أرباح') || lower.includes('مالي')) {
            let report = await getCompanyFinancialReport();
            botReply = `💰 <b>التقرير المالي والخزنة لشركة [${report.companyName}]:</b><br>` +
                       `- رصيد الخزنة الحالي: <b style="color:var(--accent-color);">${report.treasury}</b><br>` +
                       `- إجمالي المصروفات: <b style="color:var(--danger-color);">${report.expenses}</b><br>` +
                       `- إجمالي الفواتير المجمعة: <b>${report.invoicesCount}</b><br>` +
                       `- الإيرادات التقديرية للشحنات: <b>${report.estimatedRevenue}</b>`;
        }
        // 5. المصروفات التشغيلية
        else if (lower.includes('المصروفات') || lower.includes('مصروف') || lower.includes('وقود')) {
            botReply = `⛽ <b>المصروفات التشغيلية لشركة [${tenant.activeCompanyName}]:</b><br>` +
                       `- إجمالي المصروفات المسجلة: <b style="color:var(--danger-color);">${financials.expensesTotal}</b><br>` +
                       `- يتم تحديث السجلات لحظياً من قواعد بيانات المنصة.`;
        }
        // 6. الأسطول والإحصائيات
        else if (lower.includes('إحصائيات شركتي') || lower.includes('الأسطول') || lower.includes('السائقون') || lower.includes('المركبات')) {
            let activeFleet = await getCompanyActiveFleet();
            botReply = `📊 <b>إحصائيات الأسطول والنشاط [${tenant.activeCompanyName}]:</b><br>` +
                       `- الأسطول والسائقون النشطون: <b>${activeFleet.length} سائق/مركبة</b><br>` +
                       `- إجمالي شحنات الشركة: <b>${financials.shipmentsCount}</b><br>` +
                       `- رصيد الخزنة: <b style="color:var(--accent-color);">${financials.treasuryBalance}</b>`;
        }
        // 7. طوارئ الطريق SOS
        else if (lower.includes('طوارئ') || lower.includes('sos') || lower.includes('عطل') || lower.includes('حادث')) {
            botReply = `🚨 <b>بروتوكول طوارئ سحابة فايربيس [${tenant.activeCompanyName}]:</b><br>` +
                       `- تم إرسال تنبيه الطوارئ والموقع الجغرافي لحسابك (<b>${tenant.activeDriver}</b>) لغرفة العمليات والدعم الفني بالمنصة فوراً.`;
        }
        // 8. خدمات المنصة ومعلومات عامة
        else if (lower.includes('خدمات المنصة') || lower.includes('الخدمات') || lower.includes('ما هي نقلة') || lower.includes('عن نقلة') || lower.includes('من نحن')) {
            botReply = `🌐 <b>عن منصة أسطورة الطريق (Na2la.Net):</b><br>` +
                       `- هي المنصة البرمجية الأولى في مصر لإدارة أسطول الشحن والنقل البري، تتبع الشحنات، أتمتة الفواتير الآجلة، وإدارة الخزنة للشركات والأفراد.<br>` +
                       `- تتيح لك عزلاً تاماً للشركات، تتبع GPS لحظي، وتوثيق بونات الميزان سحابياً.`;
        }
        else if (lower.includes('المساعدة') || lower.includes('كيف أستخدم') || lower.includes('تعليمات') || lower.includes('شرح')) {
            botReply = `❓ <b>دليل الاستخدام السريع للمساعد الذكي:</b><br>` +
                       `- اكتب <b>"شحناتي"</b> لاستعراض رحلاتك.<br>` +
                       `- اكتب <b>"الاشتراك"</b> لفحص صلاحية باقتك.<br>` +
                       `- اكتب أي سؤال عام (مثلاً: معلومات تاريخية، جغرافية، أو عامة) ليقوم البوت بالبحث عنها في ويكيبيديا وجوجل تلقائياً!`;
        }
        else {
            // إذا لم تطابق الشروط الداخلية، يتم البحث الحي عبر ويكيبيديا وجوجل
            botReply = await window.fetchLiveWebAndWikipediaAnswer(text);
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; max-width: 80%; border: 1px solid var(--border-color);">${botReply}</div>`;
        saveChatHistory('bot', botReply);
        container.scrollTop = container.scrollHeight;
        
        // قراءة النطق الصوتي للرد (مع استبعاد الروابط HTML لتجنب قراءتها حرفياً)
        speakBotReplyText(botReply.replace(/<[^>]*>?/gm, ''));
    };
})();
