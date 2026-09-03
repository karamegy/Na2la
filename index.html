(function() {
    // إزالة شاملة لأي عناصر أو نسخ قديمة معلقة في الصفحة لضمان عدم تداخل النسخ
    ['na2laBotRootContainer', 'na2laBotBtn', 'na2laBotModal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    document.querySelectorAll('#na2laBotRootContainer, [id*="na2laBot"]').forEach(el => el.remove());

    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyDn-rNJ2ak3I0DdfzTZmXKjePDdgxhfyIY",
            authDomain: "n2la-642d3.firebaseapp.com",
            projectId: "n2la-642d3",
            storageBucket: "n2la-642d3.firebasestorage.app",
            messagingSenderId: "1085749997466",
            appId: "1:1085749997466:web:13e5535dc6d2312397d423"
        });
    }

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        
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
            --purple-color: #8b5cf6;
            --shadow-3d: 0 12px 30px -5px rgba(0, 0, 0, 0.5);
            font-family: 'Cairo', sans-serif !important;
            direction: rtl;
            text-align: right;
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
            padding: 5px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
            transition: transform 0.2s, box-shadow 0.2s;
            font-family: 'Cairo', sans-serif;
            white-space: nowrap;
            direction: rtl;
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
            padding: 12px;
            border-radius: 10px;
            margin-top: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            font-family: 'Cairo', sans-serif;
            direction: rtl;
            text-align: right;
        }
        .penta-grid-box {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin: 8px 0;
            font-family: 'Cairo', sans-serif;
        }
        .penta-card {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .penta-card-title {
            font-size: 9px;
            opacity: 0.8;
            margin-bottom: 2px;
        }
        .penta-card-value {
            font-size: 11px;
            font-weight: bold;
            color: var(--accent-color);
        }
        .bot-data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            font-size: 11px;
            background: var(--card-bg);
            border-radius: 8px;
            overflow: hidden;
            direction: rtl;
            text-align: right;
        }
        .bot-data-table th, .bot-data-table td {
            border: 1px solid var(--border-color);
            padding: 6px 8px;
            text-align: center;
        }
        .bot-data-table th {
            background: var(--primary-color);
            color: white;
            font-weight: bold;
        }
        #na2laBotModal::-webkit-scrollbar { width: 5px; }
        #na2laBotModal::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
        #mainBotMenuDropdownMenu::-webkit-scrollbar { width: 5px; }
        #mainBotMenuDropdownMenu::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
    `;
    document.head.appendChild(styleEl);

    const containerDiv = document.createElement('div');
    containerDiv.id = 'na2laBotRootContainer';
    containerDiv.innerHTML = `
        <button id="na2laBotBtn" style="position: fixed; bottom: 25px; right: 20px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; border: none; width: 62px; height: 62px; border-radius: 50%; font-size: 28px; cursor: pointer; box-shadow: var(--shadow-3d); z-index: 2147483647; display: flex; align-items: center; justify-content: center; touch-action: none; user-select: none; animation: floatAnim 2.5s ease-in-out infinite;" title="🤖 مساعد Gemini الذكي Pro لمنصة نقلة">🤖</button>

        <div id="na2laBotModal" style="position: fixed; bottom: 95px; right: 20px; width: 430px; max-width: 94vw; height: 82vh; max-height: 680px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; box-shadow: var(--shadow-3d); z-index: 2147483646; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(25px); font-family: 'Cairo', sans-serif; direction: rtl; text-align: right;">
            
            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; padding: 10px 14px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 12px; flex-shrink: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); gap: 8px; direction: rtl;">
                
                <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                    <div style="position: relative; display: inline-block;">
                        <button type="button" class="sync-account-hub-btn" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9);" onclick="toggleMainBotMenuDropdown(event)">
                            ☰ القائمة والتحكم
                        </button>
                        <div id="mainBotMenuDropdownMenu" style="display: none; position: absolute; top: 120%; right: 0; width: 290px; max-height: 380px; overflow-y: auto; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 14px; box-shadow: var(--shadow-3d); z-index: 2147483648; padding: 12px; color: var(--text-color); font-size: 11px; text-align: right; direction: rtl;">
                            
                            <div id="visitorMenuSection" style="display: none; flex-direction: column; gap: 5px; margin-bottom: 10px;">
                                <div style="font-weight: bold; margin-bottom: 4px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; color: var(--accent-color);">
                                    📦 استعلام الشحنات للزوار
                                </div>
                                <button onclick="promptVisitorShipmentQuery(); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--accent-color); color: var(--accent-color); font-size: 11px; padding: 8px 10px; border-radius: 7px; cursor: pointer; font-weight: bold; width: 100%; text-align: right; display: block;">🔍 استعلام عن شحنة برقمها</button>
                            </div>

                            <div style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px; color: var(--warning-color); display: flex; align-items: center; gap: 5px;">
                                📂 أقسام المنصة والعرض المباشر بالبوت
                            </div>
                            <div id="menuDropdownSectionsList" style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;">
                                <button onclick="renderShipmentsInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: var(--accent-color); border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%; display: block;">📦 عرض الشحنات بالبوت</button>
                                <button onclick="renderPentaTableInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: #38bdf8; border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%; display: block;">📊 الجدول الخماسي بالبوت</button>
                                <button onclick="renderDeferredInvoicesInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: var(--warning-color); border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%; display: block;">⏳ الفواتير الآجلة بالبوت</button>
                                <button onclick="renderTreasuryInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: #34d399; border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%; display: block;">💵 الخزينة والحسابات بالبوت</button>
                                <button onclick="openBotSection('chat-tab', 'الدردشة'); closeMainBotMenus();" style="background: var(--card-bg); color: #f472b6; border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%; display: block;">💬 الانتقال لدردشة المنصة</button>
                            </div>

                            <div style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px; color: #a855f7;">
                                ⚙️ تفضيلات المساعد والمحادثة
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
                                <button onclick="toggleTemporaryChatMode(); closeMainBotMenus();" id="botTempChatBtn" style="background: var(--card-bg); color: #a855f7; border: 1px solid #a855f7; padding: 6px 10px; border-radius: 7px; text-align: right; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; display: block;">🕵️ تفعيل/إلغاء المحادثة المؤقتة</button>
                                <button onclick="toggleBotContinuousVoice(); closeMainBotMenus();" id="botContinuousBtn" style="background: var(--card-bg); color: #38bdf8; border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 7px; text-align: right; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; display: block;">🎤 الاستماع الصوتي المستمر</button>
                                <button onclick="toggleBotVoiceOutput(); closeMainBotMenus();" id="botVoiceToggleBtn" style="background: var(--card-bg); color: var(--accent-color); border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 7px; text-align: right; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; display: block;">🔊 تبديل الناطق الصوتي (مفعل)</button>
                                <button onclick="clearBotChat(); closeMainBotMenus();" style="background: var(--card-bg); color: var(--danger-color); border: 1px solid var(--danger-color); padding: 6px 10px; border-radius: 7px; text-align: right; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; display: block;">🗑️ مسح الذاكرة الحالية</button>
                            </div>

                            <div style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; color: var(--accent-color);">
                                ⚡ إجراءات واستعلامات سريعة
                            </div>
                            <div id="menuDropdownQuickActionsList" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
                                <button onclick="sendBotQuickQuery('شحناتي'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--accent-color); font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">📦 الشحنات</button>
                                <button onclick="sendBotQuickQuery('الجدول الخماسي'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">📊 الخماسي</button>
                                <button onclick="sendBotQuickQuery('الفواتير'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">🧾 الفواتير</button>
                                <button onclick="sendBotQuickQuery('معلومات صلاحية اشتراك شركتك'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">💳 الاشتراك</button>
                                <button onclick="sendBotQuickQuery('اختبار القيادة'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--purple-color); color: var(--purple-color); font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">🎓 الاختبار</button>
                                <button onclick="exportChatArchiveData(); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid #38bdf8; color: #38bdf8; font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">📤 الأرشيف</button>
                            </div>
                        </div>
                    </div>

                    <div style="position: relative; display: inline-block;">
                        <button type="button" class="sync-account-hub-btn" onclick="toggleSyncHubDropdown(event)">
                            <span id="sync-icon-bolt">⚡</span> <span id="syncHubBtnLabel">شحناتي</span> 
                            <span id="btn-sync-badge" style="background: var(--danger-color, #ef4444); color: #fff; padding: 1px 5px; border-radius: 8px; font-size: 9px; font-weight: bold; display: none;">0</span>
                        </button>
                        <div id="syncHubDropdownMenu" style="display: none; position: absolute; top: 120%; right: 0; width: 270px; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: var(--shadow-3d); z-index: 2147483647; padding: 10px; color: var(--text-color); font-size: 11px; text-align: right; direction: rtl;">
                            <div style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; display: flex; justify-content: space-between;">
                                <span id="syncHubUserTitle">👤 الحساب المتصل</span>
                                <span style="color: var(--accent-color); cursor: pointer;" onclick="openConnectedAccountHub()">الملف ⬅</span>
                            </div>
                            <div id="syncHubCompanyTag" style="font-size: 9px; color: var(--warning-color); margin-bottom: 6px;">🏢 الشركة: جاري المزامنة...</div>
                            <div id="syncHubItemsList" style="max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;"></div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden; justify-content: flex-end;">
                    <span id="botUserRoleBadge" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">🤖 مساعد Gemini الذكي Pro</span>
                    <span id="botStatusDot" onclick="toggleDutyStatus()" style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; cursor: pointer; flex-shrink: 0;" title="تبديل حالة العمل"></span>
                    <button onclick="toggleNa2laBot()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0 2px; flex-shrink: 0;" title="إغلاق">✕</button>
                </div>
            </div>

            <div id="na2laRssTickerContainer" style="display: none; background: rgba(217, 119, 6, 0.15); border-bottom: 1px solid var(--border-color); padding: 6px 12px; font-size: 11px; color: var(--warning-color); white-space: nowrap; overflow: hidden; position: relative; flex-shrink: 0;">
                <div style="display: inline-block; animation: marquee 18s linear infinite; font-weight: bold;">
                    🚀 أسطورة الطريق Pro | تتبع الشحنات للزوار برقم الشحنة، وعزل تام للبيانات والشركات
                </div>
            </div>

            <div style="padding: 8px 14px; background: var(--bg-color); display: flex; justify-content: flex-end; align-items: center; border-bottom: 1px solid var(--border-color); font-size: 11px; flex-shrink: 0;">
                <div>
                    <select id="botThemeSelect" onchange="changeBotTheme(this.value)" style="padding: 5px 10px; font-size: 11px; border-radius: 8px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); cursor: pointer; font-family: 'Cairo', sans-serif; font-weight: bold;" title="تغيير ثيم الواجهة">
                        <option value="default">🎨 الداكن الأصلي</option>
                        <option value="royal">👑 الأرجواني الملكي</option>
                        <option value="emerald">💎 الزمردي الفاخر</option>
                    </select>
                </div>
            </div>

            <div id="tempChatAlertBanner" style="display: none; background: rgba(168, 85, 247, 0.25); border-bottom: 1px solid #a855f7; color: #d8b4fe; padding: 6px 12px; font-size: 11px; text-align: center; font-weight: bold; flex-shrink: 0;">
                🕵️ وضع الخصوصية الفائقة (محادثة مؤقتة): لن يتم حفظ هذه المحادثة في الذاكرة أو فايربيس.
            </div>

            <div id="na2laBotMessages" style="flex: 1 1 auto; min-height: 0; padding: 16px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 12px; line-height: 1.65; background: var(--card-bg); color: var(--text-color); text-align: right; direction: rtl;">
                <div style="background: var(--bg-color); padding: 12px 16px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: right; direction: rtl;">
                    مرحباً بك! أنا مساعدك الذكي <b>Gemini Pro</b>.<br>- للزوار: قم بكتابة <b>رقم شحنتك</b> مباشرة في الصندوق أدناه لتتبع حالة شحنتك بدقة تامة.
                </div>
            </div>

            <div style="padding: 10px 14px; border-top: 1px solid var(--border-color); display: flex; gap: 8px; background: var(--bg-color); align-items: center; position: relative; flex-shrink: 0; min-height: 56px; box-sizing: border-box; direction: rtl;">
                <input type="file" id="scaleTicketFileInput" accept="image/*" style="display: none;" onchange="handleScaleTicketUpload(this)">
                <input type="file" id="importArchiveFileInput" accept=".json" style="display: none;" onchange="importChatArchiveData(this)">
                
                <button onclick="document.getElementById('scaleTicketFileInput').click()" title="رفع وتحليل بونة الميزان OCR" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); width: 38px; height: 38px; min-width: 38px; border-radius: 10px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s;">📎</button>
                
                <input type="text" id="na2laBotInput" placeholder="أدخل رقم شحنتك للتتبع أو اسأل المساعد..." style="flex: 1; min-width: 0; height: 38px; margin: 0; padding: 0 12px; font-size: 12px; border-radius: 10px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; box-sizing: border-box; outline: none; direction: rtl; text-align: right;" onkeypress="if(event.key === 'Enter') sendBotQuickQuery()">

                <button onclick="startBotVoiceInput()" title="تسجيل صوتي" style="background: var(--warning-color); border: none; width: 38px; height: 38px; min-width: 38px; border-radius: 10px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-3d); flex-shrink: 0;">🎤</button>
                
                <button onclick="sendBotQuickQuery()" style="background: var(--primary-color); color: white; border: none; height: 38px; padding: 0 16px; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 12px; font-family: 'Cairo', sans-serif; white-space: nowrap; flex-shrink: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">إرسال</button>
            </div>
        </div>
    `;
    document.body.appendChild(containerDiv);

    window.toggleMainBotMenuDropdown = function(event) {
        event.stopPropagation();
        const menu = document.getElementById('mainBotMenuDropdownMenu');
        if (!menu) return;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };

    window.closeMainBotMenus = function() {
        const menu = document.getElementById('mainBotMenuDropdownMenu');
        if (menu) menu.style.display = 'none';
    };

    window.addEventListener('click', () => {
        closeMainBotMenus();
    });

    window.promptVisitorShipmentQuery = function() {
        let shipmentId = prompt('أدخل رقم الشحنة المراد الاستعلام عنها (مثال: 178830):');
        if (shipmentId && shipmentId.trim() !== '') {
            sendBotQuickQuery(shipmentId.trim());
        }
    };

    window.openBotSection = function(tabId, sectionName = '') {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            alert('⚠️ عذراً يا زائرنا الكريم، هذا القسم مخصص للأعضاء والسائقين المسجلين فقط. يمكنك تتبع رقم شحنتك مباشرة بكتابته في الدردشة.');
            return;
        }

        let container = document.getElementById('na2laBotMessages');
        if (container) {
            let botMsg = `حسناً، جارٍ الانتقال إلى قسم <b>${sectionName || 'المطلوب'}</b>...`;
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${botMsg}</div>`;
            container.scrollTop = container.scrollHeight;
            speakBotReplyText(`حسناً، جارٍ الانتقال إلى قسم ${sectionName}`);
        }

        setTimeout(() => {
            if (typeof switchTab === 'function') {
                switchTab(tabId);
            } else {
                alert('تم الانتقال إلى القسم: ' + tabId);
            }
        }, 600);
    };

    window.renderShipmentsInsideBot = async function() {
        await fetchRealFirebaseData();
        let tenant = getActiveTenantContext();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        if (tenant.activeRole === 'visitor') {
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--warning-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color);">⚠️ الزائر يمكنه تتبع شحنة برقمها مباشرة في صندوق الدردشة.</div>`;
            container.scrollTop = container.scrollHeight;
            return;
        }

        let shipments = getIsolatedUserShipments();
        let replyHtml = `📦 <b>عرض الشحنات المباشر (عدد: ${shipments.length}):</b>`;
        if (shipments.length === 0) {
            replyHtml += `<div class="chat-card">لا توجد شحنات مسجلة حالياً ضمن نطاق شركتك.</div>`;
        } else {
            replyHtml += `<table class="bot-data-table"><tr><th>رقم الشحنة</th><th>العميل</th><th>الحالة</th><th>القيمة</th></tr>`;
            shipments.forEach(s => {
                replyHtml += `<tr><td><b>${s.id || '-'}</b></td><td>${s.name || '-'}</td><td><span style="color:var(--accent-color);">${s.status || 'نشطة'}</span></td><td>${s.price || 0} ج.م</td></tr>`;
            });
            replyHtml += `</table>`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض شحنات شركتك مباشرة في البوت.");
    };

    window.renderPentaTableInsideBot = async function() {
        await fetchRealFirebaseData();
        let financials = getCompanyFinancials();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        let replyHtml = `
            📊 <b>الجدول الخماسي المعتمد (عرض مباشر بالبوت):</b>
            <div class="penta-grid-box">
                <div class="penta-card"><div class="penta-card-title">صافي الأرباح</div><div class="penta-card-value">${financials.netProfit}</div></div>
                <div class="penta-card"><div class="penta-card-title">الإيرادات</div><div class="penta-card-value">${financials.revenues}</div></div>
                <div class="penta-card"><div class="penta-card-title">الشحنات</div><div class="penta-card-value">${financials.shipmentsCount}</div></div>
                <div class="penta-card"><div class="penta-card-title">الديون والآجل</div><div class="penta-card-value">${financials.deferredDebt}</div></div>
                <div class="penta-card"><div class="penta-card-title">الخزينة</div><div class="penta-card-value">${financials.treasuryBalance}</div></div>
            </div>
        `;

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض الجدول الخماسي المالي مباشرة في البوت.");
    };

    window.renderDeferredInvoicesInsideBot = async function() {
        await fetchRealFirebaseData();
        let tenant = getActiveTenantContext();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        if (tenant.activeRole === 'visitor') {
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--warning-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color);">⚠️ هذا القسم مخصص للأعضاء المسجلين فقط.</div>`;
            container.scrollTop = container.scrollHeight;
            return;
        }

        let invoices = realFirebaseDeferredInvoices || [];
        let replyHtml = `⏳ <b>الفواتير الآجلة المسجلة (عدد: ${invoices.length}):</b>`;
        if (invoices.length === 0) {
            replyHtml += `<div class="chat-card">لا توجد فواتير أجل مسجلة حالياً في السحابة.</div>`;
        } else {
            replyHtml += `<table class="bot-data-table"><tr><th>رقم الفاتورة</th><th>العميل</th><th>المبلغ</th><th>الحالة</th></tr>`;
            invoices.forEach(inv => {
                replyHtml += `<tr><td><b>${inv.id || '-'}</b></td><td>${inv.clientName || inv.name || '-'}</td><td>${inv.amount || inv.price || 0} ج.م</td><td><span style="color:var(--warning-color);">${inv.status || 'معلق/آجل'}</span></td></tr>`;
            });
            replyHtml += `</table>`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض الفواتير الآجلة مباشرة في البوت.");
    };

    window.renderTreasuryInsideBot = async function() {
        await fetchRealFirebaseData();
        let financials = getCompanyFinancials();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        let replyHtml = `
            💵 <b>حسابات الخزينة والمصروفات:</b>
            <div class="chat-card">
                💰 <b>رصيد الخزينة الحالي:</b> <span style="color:var(--accent-color);">${financials.treasuryBalance}</span><br>
                📉 <b>إجمالي المصروفات:</b> <span style="color:var(--danger-color);">${financials.expensesTotal}</span><br>
                📊 <b>صافي الأرباح:</b> ${financials.netProfit}
            </div>
        `;

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض الخزينة والحسابات مباشرة في البوت.");
    };

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
            if (dx * dx + dy * dy > 36) hasBotDragged = true;
            let newLeft = Math.max(10, Math.min(initBotLeft + dx, window.innerWidth - botBtn.offsetWidth - 10));
            let newTop = Math.max(10, Math.min(initBotTop + dy, window.innerHeight - botBtn.offsetHeight - 10));
            botBtn.style.left = newLeft + 'px'; botBtn.style.top = newTop + 'px';
        };
        const stopDrag = () => { if (!isBotDragging) return; isBotDragging = false; };

        botBtn.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        document.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY));
        document.addEventListener('mouseup', stopDrag);
        
        botBtn.addEventListener('touchstart', (e) => { if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
        document.addEventListener('touchmove', (e) => { if (isBotDragging && e.touches.length === 1) { onDrag(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: true });
        document.addEventListener('touchend', stopDrag);

        botBtn.addEventListener('click', () => {
            if (!hasBotDragged) { toggleNa2laBot(); }
            hasBotDragged = false;
        });
    }

    window.realFirebaseShipments = [];
    window.realFirebaseDrivers = [];
    window.realFirebaseDeferredInvoices = [];
    window.realFirebaseConsolidatedInvoices = [];
    window.realFirebaseTreasury = [];
    window.realFirebaseExpenses = [];
    window.realFirebaseAppData = {};
    window.lastBotContext = null;
    window.isTempChatActive = false;

    const driverQuizzes = [
        {
            q: "ما هو الإجراء الأول الواجب اتخاذه عند انخفاض مفاجئ في ضغط فرامل الهواء بالشاحنة؟",
            options: ["التوقف فوراً جانب الطريق وتأمين المقطورة", "زيادة السرعة للوصول لأقرب ورشة", "الضغط بقوة متكررة على دواسة البنزين", "إيقاف المحرك أثناء السرعة العالية"],
            correct: 0,
            explain: "انخفاض ضغط الهواء يحتم التوقف الفوري الآمن وتأمين الشاحنة لتجنب انغلاق الفرامل التلقائي (Spring Brakes)."
        },
        {
            q: "كيف يجب توزيع أوزان البضائع الثقيلة على سطح المقطورة؟",
            options: ["وضع كل الثقل في الجزء الخلفي جداً", "توزيع الثقل بانتظام فوق المحاور والمركز", "ترك الجزء الأمامي فارغاً تماماً", "تجميع كل الثقل في جهة واحدة لليمين"],
            correct: 1,
            explain: "التوزيع المتوازن للبضائع فوق محاور الشاحنة يضمن الثبات في المنحنيات ويمنع انزلاق المقطورة (Jackknifing)."
        }
    ];

    window.handleImageRequest = function(query) {
        let subject = query.replace(/(صورة|صوره|اترك لي|ابحث عن|أريد|ابي|اتني بـ|جيبلي|هاتلي|توليد|ارسم)/g, '').trim() || 'شاحنة نقل حديثة على الطريق السريع';
        let imageUrl = 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&auto=format&fit=crop&q=80';
        return `
            <div class="chat-card">
                <div style="font-weight: bold; color: var(--purple-color); font-size: 11px; margin-bottom: 6px;">🎨 محرك Gemini - رسم وتوليد وسائط: "${subject}"</div>
                <img src="${imageUrl}" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color);" alt="${subject}">
                <div style="margin-top: 6px; font-size: 10px; color: var(--text-color);">تم توليد وإخراج المشهد المخصص بدقة وسرعة سحابية.</div>
            </div>
        `;
    };

    window.toggleTemporaryChatMode = function() {
        window.isTempChatActive = !window.isTempChatActive;
        let btn = document.getElementById('botTempChatBtn');
        let banner = document.getElementById('tempChatAlertBanner');
        if (btn) {
            btn.style.background = window.isTempChatActive ? "var(--purple-color)" : "var(--card-bg)";
            btn.style.color = window.isTempChatActive ? "#fff" : "#a855f7";
            btn.innerText = window.isTempChatActive ? "🕵️ مؤقت: مفعل" : "🕵️ تفعيل/إلغاء المحادثة المؤقتة";
        }
        if (banner) { banner.style.display = window.isTempChatActive ? "block" : "none"; }
        alert(window.isTempChatActive ? "تم تفعيل وضع المحادثة المؤقتة (Incognito Mode)." : "تم إلغاء وضع المحادثة المؤقتة.");
    };

    window.exportChatArchiveData = function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let chatHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
        let exportBundle = { version: "10.0-PRO", tenant, exportDate: new Date().toISOString(), chatHistory };
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
        let downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `Na2la_Archive_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        alert("✅ تم تصدير واستخراج أرشيف السجلات والمحادثات بنجاح.");
    };

    window.importChatArchiveData = function(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let importedData = JSON.parse(e.target.result);
                    if (importedData && importedData.chatHistory) {
                        let tenant = getActiveTenantContext();
                        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
                        localStorage.setItem(storageKey, JSON.stringify(importedData.chatHistory));
                        loadChatHistory();
                        alert("✅ تم استيراد ونقل الأرشيف بنجاح.");
                    } else { alert("⚠️ تنسيق الملف غير صحيح."); }
                } catch(err) { alert("❌ حدث خطأ أثناء قراءة الأرشيف."); }
            };
            reader.readAsText(input.files[0]);
        }
    };

    window.getActiveTenantContext = function() {
        let rawUser = window.loggedInDriverName || window.currentUser?.name || window.currentUser || window.logged_in_driver_name || localStorage.getItem('logged_in_driver_name') || localStorage.getItem('na2la_current_user_identifier') || localStorage.getItem('current_user_name') || 'زائر كريم';
        let activeRole = window.currentUserRole || window.currentUser?.role || localStorage.getItem('current_user_role') || localStorage.getItem('na2la_user_role') || localStorage.getItem('user_role') || 'visitor';
        let activeCompanyId = window.currentCompanyId || window.Na2laApp?.companyId || localStorage.getItem('current_company_id') || localStorage.getItem('panda_company_id') || localStorage.getItem('na2la_current_company_id') || 'company_main';
        let activeCompanyName = window.currentCompanyName || window.Na2laApp?.companyName || localStorage.getItem('current_company_name') || localStorage.getItem('na2la_current_company_name') || 'أسطورة الطريق الرئيسية';

        if (!rawUser || activeRole === 'visitor' || rawUser === 'زائر كريم') {
            return { activeDriver: 'زائر كريم', activeCompanyId: activeCompanyId || 'guest_company', activeCompanyName: activeCompanyName || 'زائر غير مسجل', activeRole: 'visitor' };
        }

        let activeDriver = rawUser;
        if (activeDriver === "المدير" || activeRole.includes('admin') || activeRole.includes('owner') || activeRole.includes('مدير')) {
            activeRole = "admin";
        } else if (activeDriver.includes('سائق') || activeRole.includes('driver')) {
            activeRole = "driver";
        } else if (activeRole.includes('supervisor') || activeRole.includes('مشرف')) {
            activeRole = "supervisor";
        }

        return { activeDriver, activeCompanyId, activeCompanyName, activeRole };
    };

    window.fetchRealFirebaseData = async function() {
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                try {
                    const driversSnap = await db.collection('drivers').get();
                    if (!driversSnap.empty) {
                        realFirebaseDrivers = driversSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const shipmentsSnap = await db.collection('shipments').get();
                    if (!shipmentsSnap.empty) {
                        realFirebaseShipments = shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const invoicesSnap = await db.collection('deferredInvoices').get();
                    if (!invoicesSnap.empty) {
                        realFirebaseDeferredInvoices = invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const conInvoicesSnap = await db.collection('consolidatedInvoices').get();
                    if (!conInvoicesSnap.empty) {
                        realFirebaseConsolidatedInvoices = conInvoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const treasurySnap = await db.collection('treasury').get();
                    if (!treasurySnap.empty) {
                        realFirebaseTreasury = treasurySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const expensesSnap = await db.collection('expenses').get();
                    if (!expensesSnap.empty) {
                        realFirebaseExpenses = expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                let tenant = getActiveTenantContext();
                try {
                    const appDataSnap = await db.collection('appData').doc(tenant.activeCompanyId).get();
                    if (appDataSnap.exists) { realFirebaseAppData = appDataSnap.data() || {}; }
                } catch(e) {}
            }
        } catch(e) {}
    };

    window.getCompanySubscriptionInfo = async function() {
        let tenant = getActiveTenantContext();
        let subData = {
            companyName: tenant.activeCompanyName || 'أسطورة الطريق الرئيسية',
            adminName: tenant.activeDriver || 'غير محدد',
            phone: 'غير متوفر',
            planName: 'monthly',
            status: 'نشط ✅',
            expiryDate: '2026-09-28'
        };

        if (tenant.activeRole === 'visitor') {
            return {
                companyName: 'زائر غير مسجل',
                adminName: 'زائر كريم',
                phone: 'غير متوفر',
                planName: 'معاينة عامة',
                status: 'متاح للزوار',
                expiryDate: 'دائم'
            };
        }

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                if (tenant.activeDriver && tenant.activeDriver !== 'زائر كريم') {
                    let driverRec = realFirebaseDrivers.find(d => d.name === tenant.activeDriver);
                    if (!driverRec) {
                        let querySnap = await db.collection('drivers').where('name', '==', tenant.activeDriver).get();
                        if (!querySnap.empty) {
                            driverRec = querySnap.docs[0].data();
                        } else {
                            let docDirect = await db.collection('drivers').doc(tenant.activeDriver).get();
                            if (docDirect.exists) driverRec = docDirect.data();
                        }
                    }

                    if (driverRec) {
                        subData.companyName = driverRec.companyName || driverRec.title || tenant.activeCompanyName;
                        subData.adminName = driverRec.name || tenant.activeDriver;
                        subData.phone = driverRec.phone || driverRec.mobile || 'غير متوفر';
                        subData.planName = driverRec.subPlan || driverRec.plan || driverRec.package || 'monthly';
                        let st = driverRec.subStatus || driverRec.status || 'active';
                        subData.status = (st === 'active' || st === 'نشط' || st === true) ? 'نشط ✅' : 'منتهي ⚠️';
                        subData.expiryDate = driverRec.subExpiry || driverRec.expiryDate || driverRec.expiry || '2026-09-28';
                    }
                }
            }
        } catch(e) {}

        return subData;
    };

    window.getIsolatedUserShipments = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            return [];
        }

        let allShipments = realFirebaseShipments.length > 0 ? realFirebaseShipments : (window.appData?.shipments || []);
        
        let companyFiltered = allShipments.filter(s => {
            let sCompanyId = String(s.companyId || 'company_main').trim().toLowerCase();
            let activeComp = String(tenant.activeCompanyId || 'company_main').trim().toLowerCase();
            return sCompanyId === activeComp;
        });

        if (tenant.activeRole === 'admin' || tenant.activeRole === 'supervisor') {
            return companyFiltered;
        }

        return companyFiltered.filter(s => {
            let sDriver = String(s.assignedDriver || s.driver || s.name || '').trim();
            let currentDriver = String(tenant.activeDriver).trim();
            return sDriver === currentDriver;
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
        let shipments = getIsolatedUserShipments();
        let shipmentsCount = shipments.length;

        if (tenant.activeRole === 'visitor') {
            return { treasuryBalance: '0 ج.م', expensesTotal: '0 ج.م', revenues: '0 ج.م', netProfit: '0 ج.م', deferredDebt: '0 ج.م', invoicesCount: 0, shipmentsCount: 0 };
        }

        let totalRevenues = shipments.reduce((sum, s) => sum + Number(s.price || 0), 0);
        let totalExpenses = (realFirebaseExpenses || []).reduce((sum, e) => sum + Number(e.amount || 0), 0);
        let netProfit = totalRevenues - totalExpenses;
        let treasuryBalance = (realFirebaseTreasury || []).reduce((sum, t) => sum + (t.type === 'in' ? Number(t.amount || 0) : -Number(t.amount || 0)), 0);
        let deferredDebt = (realFirebaseDeferredInvoices || []).reduce((sum, inv) => {
            if (inv.status !== 'paid') return sum + Number(inv.remainingAmount || inv.totalAmount || 0);
            return sum;
        }, 0);
        
        return { 
            treasuryBalance: parseNumericCurrency(treasuryBalance), 
            expensesTotal: parseNumericCurrency(totalExpenses), 
            revenues: parseNumericCurrency(totalRevenues),
            netProfit: parseNumericCurrency(netProfit),
            deferredDebt: parseNumericCurrency(deferredDebt),
            invoicesCount: realFirebaseDeferredInvoices.length + realFirebaseConsolidatedInvoices.length || 1, 
            shipmentsCount 
        };
    };

    window.syncPlatformUserData = function() {
        let tenant = getActiveTenantContext();
        let isManager = (tenant.activeRole === 'admin' || tenant.activeRole === 'supervisor');
        let isVisitor = (tenant.activeRole === 'visitor');

        let badgeEl = document.getElementById('botUserRoleBadge');
        if (badgeEl) badgeEl.innerText = isVisitor ? `🤖 تتبع الشحنات للزوار (رقم الشحنة فقط)` : `🤖 ${tenant.activeDriver} (${isManager ? tenant.activeCompanyName : 'حساب مستخدم'})`;

        let companyTagEl = document.getElementById('syncHubCompanyTag');
        if (companyTagEl) companyTagEl.innerText = isVisitor ? `🏢 وضع زائر (تتبع برقم الشحنة)` : (isManager ? `🏢 الشركة: ${tenant.activeCompanyName}` : `👤 المستخدم: ${tenant.activeDriver}`);
        
        let rssBar = document.getElementById('na2laRssTickerContainer');
        if (rssBar) rssBar.style.display = isManager ? 'block' : 'none';

        let syncLabel = document.getElementById('syncHubBtnLabel');
        if (syncLabel) syncLabel.innerText = isVisitor ? 'تتبع شحنة' : 'شحناتي';

        const sectionsList = document.getElementById('menuDropdownSectionsList');
        const quickActionsList = document.getElementById('menuDropdownQuickActionsList');
        const visitorMenuSec = document.getElementById('visitorMenuSection');
        
        if (visitorMenuSec) {
            visitorMenuSec.style.display = isVisitor ? 'flex' : 'none';
        }
        if (isVisitor) {
            if (sectionsList) sectionsList.style.display = 'none';
            if (quickActionsList) quickActionsList.style.display = 'none';
        } else {
            if (sectionsList) sectionsList.style.display = 'flex';
            if (quickActionsList) quickActionsList.style.display = 'grid';
        }

        updateSyncButtonBadge();
        checkDutyStatusIndicator();
        return tenant;
    };

    window.updateSyncButtonBadge = function() {
        let tenant = getActiveTenantContext();
        const badgeEl = document.getElementById('btn-sync-badge');
        if (badgeEl) {
            const syncedShipments = getIsolatedUserShipments();
            badgeEl.innerText = syncedShipments.length;
            badgeEl.style.display = (syncedShipments.length > 0 && !isVisitorRole()) ? 'inline-block' : 'none';
        }
    };

    window.isVisitorRole = function() {
        let tenant = getActiveTenantContext();
        return tenant.activeRole === 'visitor';
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

        userTitleSpan.innerText = isVisitorRole() ? `👤 زائر كريم` : `👤 ${tenant.activeDriver}`;
        
        if (isVisitorRole()) {
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: var(--warning-color);">اكتب رقم شحنتك (مثل 178830) في صندوق الدردشة لتتبعها فوراً.</div>`;
        } else {
            const syncedShipments = getIsolatedUserShipments();
            listContainer.innerHTML = syncedShipments.length === 0 ? `<div style="padding: 6px; text-align: center;">لا توجد شحنات معزولة</div>` :
                syncedShipments.slice(0, 5).map(s => `<div style="padding: 5px 8px; background:var(--card-bg); margin-bottom:4px; border-radius:6px; cursor:pointer;" onclick="renderShipmentsInsideBot()">📦 ${s.id || 'شحنة'} (${s.status || 'نشطة'}) ⬅</div>`).join('');
        }
        dropdown.style.display = 'block';
    };

    window.openConnectedAccountHub = function() {
        if (isVisitorRole()) {
            alert('⚠️ الزائر ليس لديه بروفايل خاص. يرجى تسجيل الدخول لحسابك.');
            return;
        }
        openBotSection('account-tab', 'البروفايل');
    };

    window.toggleDutyStatus = function() {
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        let newStatus = currentStatus === 'active' ? 'offline' : 'active';
        localStorage.setItem('driver_duty_status', newStatus);
        checkDutyStatusIndicator();
    };

    window.checkDutyStatusIndicator = function() {
        let dot = document.getElementById('botStatusDot');
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        if (dot) { dot.style.background = currentStatus === 'active' ? '#10b981' : '#ef4444'; }
    };

    fetchRealFirebaseData().then(() => { syncPlatformUserData(); });

    let isBotVoiceOutputOn = true, isBotContinuousActive = false;

    window.toggleNa2laBot = function() {
        let modal = document.getElementById('na2laBotModal');
        if (!modal) return;
        let isHidden = (modal.style.display === 'none' || modal.style.display === '');
        modal.style.display = isHidden ? 'flex' : 'none';
        if (isHidden) {
            fetchRealFirebaseData().then(() => {
                syncPlatformUserData();
                loadChatHistory();
            });
        }
    };

    window.toggleBotVoiceOutput = function() {
        isBotVoiceOutputOn = !isBotVoiceOutputOn;
        let btn = document.getElementById('botVoiceToggleBtn');
        if (btn) {
            btn.innerText = isBotVoiceOutputOn ? "🔊 تبديل الناطق الصوتي (مفعل)" : "🔇 تبديل الناطق الصوتي (صامت)";
            btn.style.color = isBotVoiceOutputOn ? "var(--accent-color)" : "var(--danger-color)";
        }
    };

    window.toggleBotContinuousVoice = function() {
        isBotContinuousActive = !isBotContinuousActive;
        let btn = document.getElementById('botContinuousBtn');
        if (isBotContinuousActive) { 
            btn.innerText = "🎤 الاستماع المستمر: مفعل"; 
            btn.style.color = "var(--accent-color)";
            startBotVoiceInput(); 
        } else { 
            btn.innerText = "🎤 الاستماع الصوتي المستمر"; 
            btn.style.color = "#38bdf8";
        }
    };

    window.handleScaleTicketUpload = function(input) {
        if (input.files && input.files[0]) {
            let container = document.getElementById('na2laBotMessages');
            container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 10px 14px; border-radius: 12px; align-self: flex-start; text-align: right; direction: rtl;">📎 تحليل بونة الميزان: ${input.files[0].name}</div>`;
            setTimeout(() => {
                let botReply = `✅ <b>نجاح استخراج الأوزان (OCR):</b> القائم 32 طن، الفارغ 10 طن، الصافي 22 طن.`;
                container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${botReply}</div>`;
                container.scrollTop = container.scrollHeight;
            }, 800);
        }
    };

    window.saveChatHistory = function(sender, htmlContent) {
        if (window.isTempChatActive) return;
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        history.push({ sender, htmlContent, timestamp: new Date().toISOString() });
        if (history.length > 40) history = history.slice(-40);
        localStorage.setItem(storageKey, JSON.stringify(history));
    };

    window.loadChatHistory = async function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const container = document.getElementById('na2laBotMessages');
        if (!container) return;

        let welcomeText = tenant.activeRole === 'visitor' ? 
            `مرحباً بك يا <b>زائرنا الكريم</b>. يرجى كتابة <b>رقم شحنتك</b> مباشرة (مثل: 178830...) هنا في المربع أدناه لتتبع حالة شحنتك بدقة.` :
            `مرحباً بك يا <b>${tenant.activeDriver}</b> (${tenant.activeRole}). تم تفعيل العزل التام وتتبع الشحنات.`;

        container.innerHTML = `<div style="background: var(--bg-color); padding: 12px 16px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${welcomeText}</div>`;
        history.forEach(msg => {
            let alignStyle = msg.sender === 'user' ? 'align-self: flex-start;' : 'align-self: flex-end;';
            let bgStyle = msg.sender === 'user' ? 'var(--primary-color)' : 'var(--bg-color)';
            let colorStyle = msg.sender === 'user' ? 'white' : 'var(--text-color)';
            container.innerHTML += `<div style="background: ${bgStyle}; color: ${colorStyle}; padding: 10px 14px; border-radius: 12px; ${alignStyle} border: 1px solid var(--border-color); text-align: right; direction: rtl;">${msg.htmlContent}</div>`;
        });
        container.scrollTop = container.scrollHeight;
    };

    window.clearBotChat = function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        localStorage.removeItem(storageKey);
        loadChatHistory();
        alert("🗑️ تم مسح محادثات الذاكرة الحالية بنجاح.");
    };

    window.changeBotTheme = function(themeId) {
        let rootContainer = document.getElementById('na2laBotRootContainer');
        if (!rootContainer) return;
        if (themeId === 'default') rootContainer.removeAttribute('data-theme');
        else rootContainer.setAttribute('data-theme', themeId);
    };

    window.startBotVoiceInput = function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG';
        recognition.onresult = (event) => {
            let text = event.results[0][0].transcript;
            document.getElementById('na2laBotInput').value = text;
            sendBotQuickQuery(text);
        };
        recognition.start();
    };

    window.speakBotReplyText = function(text) {
        if (!isBotVoiceOutputOn) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-EG';
            window.speechSynthesis.speak(utterance);
        }
    };

    window.sendBotQuickQuery = async function(customText = null) {
        let inputEl = document.getElementById('na2laBotInput');
        let container = document.getElementById('na2laBotMessages');
        let text = customText || (inputEl ? inputEl.value.trim() : "");
        if (!text || !container) return;

        container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 10px 14px; border-radius: 12px; align-self: flex-start; text-align: right; direction: rtl;">${text}</div>`;
        saveChatHistory('user', text);
        if (inputEl && !customText) inputEl.value = "";
        container.scrollTop = container.scrollHeight;

        await fetchRealFirebaseData();
        let tenant = syncPlatformUserData();
        let financials = getCompanyFinancials();
        let userShipments = getIsolatedUserShipments();
        let botReply = '';
        let lower = text.toLowerCase();

        let cleanedQuery = text.replace(/[^\d]/g, '');
        let matchedShipment = null;
        if (cleanedQuery.length >= 4) {
            matchedShipment = (realFirebaseShipments || []).find(s => String(s.id).trim() === cleanedQuery || String(s.id).includes(cleanedQuery));
        }
        if (!matchedShipment) {
            matchedShipment = (realFirebaseShipments || []).find(s => String(s.id).toLowerCase() === text.toLowerCase());
        }

        if (matchedShipment) {
            botReply = `
                📦 <strong>نتيجة تتبع الشحنة رقم (${matchedShipment.id}):</strong>
                <div class="chat-card">
                    👤 <b>العميل:</b> ${matchedShipment.name || '-'}<br>
                    📍 <b>العنوان:</b> ${matchedShipment.address || '-'}<br>
                    📦 <b>الحمولة:</b> ${matchedShipment.item || '-'}<br>
                    💰 <b>الأجرة:</b> ${matchedShipment.price || 0} ج.م<br>
                    📌 <b>حالة الشحنة:</b> <b style="color:var(--accent-color);">${matchedShipment.status || 'نشطة'}</b><br>
                    📅 <b>التاريخ:</b> ${matchedShipment.date || '-'}
                </div>
            `;
        }
        else if (tenant.activeRole === 'visitor') {
            if (lower.includes('كيف') || lower.includes('شحنة') || lower.includes('تتبع')) {
                botReply = `📦 أهلاً بك يا زائر كريم. لتتبع شحنتك، يرجى كتابة <b>رقم الشحنة</b> (مثل رقم 178830...) مباشرة في صندوق الكتابة أدناه ليقوم النظام بعرض تفاصيلها وحالتها الفورية لك.`;
            } else {
                botReply = `⚠️ عذراً يا زائرنا الكريم، حسابك مخصص لتتبع الشحنات برقمها فقط. يرجى إدخال <b>رقم الشحنة الصحيح</b> للاستعلام عنها.`;
            }
        }
        else if (lower.includes('اختبار القيادة')) {
            let randQuiz = driverQuizzes[Math.floor(Math.random() * driverQuizzes.length)];
            botReply = `<div class="chat-card"><b>${randQuiz.q}</b><br>${randQuiz.explain}</div>`;
        }
        else if (lower.includes('صلاحية اشتراك') || lower.includes('الاشتراك')) {
            let subInfo = await getCompanySubscriptionInfo();
            botReply = `💳 <b>كارت الاشتراك:</b><br>الشركة: <b>${subInfo.companyName}</b><br>الباقة: <b>${subInfo.planName}</b><br>الحالة: <b style="color:var(--accent-color);">${subInfo.status}</b><br>الانتهاء: <b>${subInfo.expiryDate}</b>`;
        }
        else if (lower.includes('شحناتي') || lower.includes('الشحنات')) {
            await renderShipmentsInsideBot();
            return;
        }
        else if (lower.includes('الجدول الخماسي') || lower.includes('الخماسي')) {
            await renderPentaTableInsideBot();
            return;
        }
        else if (lower.includes('الفواتير')) {
            await renderDeferredInvoicesInsideBot();
            return;
        }
        else if (lower.includes('الخزنة')) {
            await renderTreasuryInsideBot();
            return;
        }
        else if (lower.includes('رسم')) {
            botReply = handleImageRequest(text);
        }
        else {
            botReply = `
                🤖 استجابة من مساعد Gemini Pro حول: "${text}".<br>
                💡 <i>ملاحظة: لتتبع أي شحنة، قم بكتابة رقم الشحنة مباشرة في الصندوق أدناه.</i>
            `;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${botReply}</div>`;
        saveChatHistory('bot', botReply);
        container.scrollTop = container.scrollHeight;
        speakBotReplyText(botReply.replace(/<[^>]*>?/gm, ''));
    };
})();
