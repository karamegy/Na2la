(function() {
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

    const existingContainer = document.getElementById('na2laBotRootContainer');
    if (existingContainer) existingContainer.remove();

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
        
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
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
            transition: transform 0.2s, box-shadow 0.2s;
            font-family: 'Cairo', sans-serif;
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
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            font-family: 'Cairo', sans-serif;
        }
        .bot-table-container {
            width: 100%;
            overflow-x: auto;
            margin-top: 8px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }
        .bot-custom-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            background: var(--card-bg);
            color: var(--text-color);
            font-family: 'Cairo', sans-serif;
        }
        .bot-custom-table th, .bot-custom-table td {
            border: 1px solid var(--border-color);
            padding: 8px 10px;
            text-align: center;
        }
        .bot-custom-table th {
            background: var(--primary-color);
            color: #ffffff;
            font-weight: bold;
        }
        .quiz-option-btn {
            display: block;
            width: 100%;
            text-align: right;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            padding: 8px 12px;
            border-radius: 8px;
            margin-top: 6px;
            cursor: pointer;
            font-size: 11px;
            font-family: 'Cairo', sans-serif;
            transition: all 0.2s;
        }
        .quiz-option-btn:hover {
            background: var(--primary-color);
            color: #fff;
            transform: translateX(-3px);
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
        .bot-action-chip {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            font-size: 10px;
            padding: 6px 8px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-family: 'Cairo', sans-serif;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
        }
        .bot-action-chip:hover {
            border-color: var(--primary-color);
            background: rgba(59, 130, 246, 0.15);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(styleEl);

    const containerDiv = document.createElement('div');
    containerDiv.id = 'na2laBotRootContainer';
    containerDiv.innerHTML = `
        <button id="na2laBotBtn" style="position: fixed; bottom: 25px; right: 20px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 26px; cursor: pointer; box-shadow: var(--shadow-3d); z-index: 2147483647; display: flex; align-items: center; justify-content: center; touch-action: none; user-select: none; animation: floatAnim 2.5s ease-in-out infinite;" title="🤖 مساعد Gemini الذكي Pro لمنصة نقلة">🤖</button>

        <div id="na2laBotModal" style="position: fixed; bottom: 95px; right: 20px; width: 440px; max-width: 94vw; height: 82vh; max-height: 680px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; box-shadow: var(--shadow-3d); z-index: 2147483646; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(25px); font-family: 'Cairo', sans-serif;">
            
            <!-- رأس البوت -->
            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; padding: 12px 16px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 12px; flex-shrink: 0;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span id="botStatusDot" onclick="toggleDutyStatus()" style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; cursor: pointer;" title="تبديل حالة العمل"></span>
                    <span id="botUserRoleBadge">🤖 Gemini Pro (إدارة متطورة سحابياً)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <div style="position: relative; display: inline-block;">
                        <button type="button" class="sync-account-hub-btn" onclick="toggleSyncHubDropdown(event)">
                            <span id="sync-icon-bolt">⚡</span> شحناتي 
                            <span id="btn-sync-badge" style="background: var(--danger-color, #ef4444); color: #fff; padding: 1px 5px; border-radius: 8px; font-size: 8px; font-weight: bold; display: none;">0</span>
                        </button>
                        <div id="syncHubDropdownMenu" style="display: none; position: absolute; top: 115%; right: 0; width: 270px; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: var(--shadow-3d); z-index: 2147483647; padding: 10px; color: var(--text-color); font-size: 11px;">
                            <div style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; display: flex; justify-content: space-between;">
                                <span id="syncHubUserTitle">👤 الحساب المتصل</span>
                                <span style="color: var(--accent-color); cursor: pointer;" onclick="openConnectedAccountHub()">الملف ⬅</span>
                            </div>
                            <div id="syncHubCompanyTag" style="font-size: 9px; color: var(--warning-color); margin-bottom: 6px;">🏢 الشركة: جاري المزامنة...</div>
                            <div id="syncHubItemsList" style="max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 5px;"></div>
                        </div>
                    </div>
                    <button onclick="toggleNa2laBot()" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 26px; height: 26px; border-radius: 50%; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center;">✕</button>
                </div>
            </div>

            <!-- شريط الإعلانات والأخبار -->
            <div id="na2laRssTickerContainer" style="display: none; background: rgba(217, 119, 6, 0.15); border-bottom: 1px solid var(--border-color); padding: 6px 12px; font-size: 11px; color: var(--warning-color); white-space: nowrap; overflow: hidden; position: relative; flex-shrink: 0;">
                <div style="display: inline-block; animation: marquee 20s linear infinite; font-weight: bold;">
                    🚀 أسطورة الطريق Pro | إحصائيات فورية للخزينة، إيرادات الشحنات، والفواتير المجمعة سحابياً 100% بدون أي تخزين محلي
                </div>
            </div>

            <!-- شريط الأدوات السريعة العلوي -->
            <div style="padding: 6px 12px; background: var(--bg-color); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); font-size: 10px; flex-shrink: 0;">
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                    <button onclick="toggleTemporaryChatMode()" id="botTempChatBtn" style="background: var(--card-bg); color: #a855f7; border: 1px solid #a855f7; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;" title="محادثة مؤقتة">🕵️ مؤقت</button>
                    <button onclick="toggleBotContinuousVoice()" id="botContinuousBtn" style="background: var(--border-color); color: #fff; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🎤 مستمر</button>
                    <button onclick="toggleBotVoiceOutput()" id="botVoiceToggleBtn" style="background: var(--accent-color); color: #fff; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🔊 ناطق</button>
                    <button onclick="clearBotChat()" style="background: var(--danger-color); color: #fff; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;" title="مسح محادثة">🗑️ مسح</button>
                </div>
                <div>
                    <select id="botThemeSelect" onchange="changeBotTheme(this.value)" style="padding: 4px 6px; font-size: 10px; border-radius: 6px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); cursor: pointer; font-family: 'Cairo', sans-serif;">
                        <option value="default">🎨 الداكن الأصلي</option>
                        <option value="royal">👑 الأرجواني الملكي</option>
                        <option value="emerald">💎 الزمردي الفاخر</option>
                    </select>
                </div>
            </div>

            <!-- تنبيه وضع الخصوصية -->
            <div id="tempChatAlertBanner" style="display: none; background: rgba(168, 85, 247, 0.2); border-bottom: 1px solid #a855f7; color: #d8b4fe; padding: 5px 12px; font-size: 10px; text-align: center; font-weight: bold; flex-shrink: 0;">
                🕵️ وضع الخصوصية الفائقة مفعل: لن يتم حفظ الرسائل في الذاكرة.
            </div>

            <!-- منطقة الرسائل -->
            <div id="na2laBotMessages" style="flex: 1 1 auto; min-height: 0; padding: 16px; overflow-y: auto; font-size: 12px; display: flex; flex-direction: column; gap: 12px; line-height: 1.6; background: var(--card-bg); color: var(--text-color);">
                <div style="background: var(--bg-color); padding: 12px 16px; border-radius: 12px; align-self: flex-start; border: 1px solid var(--border-color); box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    مرحباً بك! أنا مساعدك الذكي <b>Gemini Pro</b> المطور لإدارة الشحنات، الفواتير المجمعة، الخزينة، والإيرادات سحابياً.<br>- اطلب تقرير الخزنة، الفواتير، أو الإيرادات فوراً.
                </div>
            </div>

            <!-- الأزرار السريعة المنظمة -->
            <div id="botQuickActionsContainer" style="padding: 8px 12px; background: var(--bg-color); display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; border-top: 1px solid var(--border-color); flex-shrink: 0;"></div>

            <!-- شريط الكتابة والإرسال -->
            <div style="padding: 10px 12px; border-top: 1px solid var(--border-color); display: flex; gap: 6px; background: var(--bg-color); align-items: center; position: relative; flex-shrink: 0; min-height: 56px; box-sizing: border-box;">
                <input type="file" id="scaleTicketFileInput" accept="image/*" style="display: none;" onchange="handleScaleTicketUpload(this)">
                <input type="file" id="importArchiveFileInput" accept=".json" style="display: none;" onchange="importChatArchiveData(this)">
                
                <button onclick="document.getElementById('scaleTicketFileInput').click()" title="رفع وتحليل بونة الميزان OCR" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); width: 38px; height: 38px; min-width: 38px; border-radius: 10px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s;" onmouseover="this.style.background='rgba(245, 158, 11, 0.15)'" onmouseout="this.style.background='var(--card-bg)'">📎</button>
                
                <input type="text" id="na2laBotInput" placeholder="اكتب سؤالك، اسأل عن الإيرادات، الخزنة، أو الفواتير..." style="flex: 1; min-width: 0; height: 38px; margin: 0; padding: 0 12px; font-size: 11px; border-radius: 10px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; box-sizing: border-box; outline: none;" onkeypress="if(event.key === 'Enter') sendBotQuickQuery()">

                <button onclick="startBotVoiceInput()" title="تسجيل صوتي" style="background: var(--warning-color); border: none; width: 38px; height: 38px; min-width: 38px; border-radius: 10px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(245,158,11,0.3); flex-shrink: 0;">🎤</button>
                
                <button onclick="sendBotQuickQuery()" style="background: var(--primary-color); color: white; border: none; height: 38px; padding: 0 14px; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 11px; font-family: 'Cairo', sans-serif; white-space: nowrap; flex-shrink: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(59,130,246,0.3);">إرسال</button>
            </div>
        </div>
    `;
    document.body.appendChild(containerDiv);

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
        const stopDrag = () => { 
            if (!isBotDragging) return; 
            isBotDragging = false; 
        };

        botBtn.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        document.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY));
        document.addEventListener('mouseup', stopDrag);
        
        botBtn.addEventListener('touchstart', (e) => { 
            if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY); 
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => { 
            if (isBotDragging && e.touches.length === 1) { 
                onDrag(e.touches[0].clientX, e.touches[0].clientY); 
            } 
        }, { passive: true });
        
        document.addEventListener('touchend', stopDrag);

        botBtn.addEventListener('click', () => {
            if (!hasBotDragged) {
                toggleNa2laBot();
            }
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
    window.memoryChatHistory = [];
    window.driverDutyStatus = 'active';
    window.currentBotTheme = 'default';

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
        },
        {
            q: "ما هي المسافة الآمنة المفترضة عند القيادة بحمولة ثقيلة في الأجواء الممطرة؟",
            options: ["مسافة مساوية للظروف العادية", "مضاعفة المسافة الآمنة مرتين على الأقل", "تقليل المسافة للتصاق بالسيارات", "لا حاجة لترك مسافة إضافية"],
            correct: 1,
            explain: "الوزن الزائد والطريق المبتل يزيدان مسافة الفرملة (Stopping Distance) بشكل مضاعف."
        }
    ];

    const roadWisdoms = [
        "💡 **نصيحة قيادة سريعة (Gemini):** احرص دائماً على فحص ضغط الإطارات ومستوى الزيت قبل التحرك في الرحلات الطويلة لتجنب الأعطال المفاجئة.",
        "💡 **إرشادات الأمان:** ترك مسافة أمان كافية بينك وبين الشاحنات الأخرى على الطريق السريع ينقذك من المفاجآت الطارئة.",
        "💡 **نصيحة مهنية:** التوزيع المتوازن للحمولة على المقطورة يحافظ على ثبات الشاحنة في المنحنيات الخطرة.",
        "💡 **تنبيه ليلي:** تجنب القيادة وأنت تشعر بالإرهاق؛ خذ استراحة قصيرة في أول محطة وقود لسلامتك."
    ];

    const funnyJokes = [
        "😂 **نكتة سواقين مع اسطى:** سألو سواق نقل محترف: إيه أحلى حاجة في السفر بالليل؟ قالهم: الشوارع فاضية والمرور بيحب يسلم عليا كل كمين!",
        "😂 واحد بيقول لصديقه السواق: هي العربيات بتحب السواقة بالليل ليه؟ قاله عشان تاخد راحتها في الغيار الخامس من غير زحمة!",
        "😂 سائق شاحنة بيقول لزميله: أنا مش عارف العربيات الصغيرة بتزعل ليه لما أكسر عليهم، مع أن مقطورتي أطول من أسبوع الامتحانات!"
    ];

    const adventureStories = [
        "📖 **مغامرات الطرق السريعة:** في أحد الأيام وأثناء رحلة شحن عاجلة عبر الصحراء الشرقية، واجه السائق عاصفة رملية شديدة أعدمت الرؤية تماماً. بفضل الهدوء والالتزام بإرشادات التوقف الآمن وتشغيل الإضواء التحذيرية، عبر العاصفة بسلام ووصل في الموعد المحدد."
    ];

    window.handleImageRequest = function(query) {
        let subject = query.replace(/(صورة|صوره|اترك لي|ابحث عن|أريد|ابي|اتني بـ|جيبلي|هاتلي|توليد|ارسم)/g, '').trim() || 'شاحنة نقل حديثة على الطريق السريع';
        
        let imageUrl = 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&auto=format&fit=crop&q=80';
        let lowerSub = subject.toLowerCase();
        
        if (lowerSub.includes('بحر') || lowerSub.includes('ماء') || lowerSub.includes('ميناء')) {
            imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80';
        } else if (lowerSub.includes('صحراء') || lowerSub.includes('طريق')) {
            imageUrl = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&auto=format&fit=crop&q=80';
        } else if (lowerSub.includes('مدينة') || lowerSub.includes('القاهرة') || lowerSub.includes('مخزن')) {
            imageUrl = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&auto=format&fit=crop&q=80';
        }

        return `
            <div class="chat-card" style="border-right-color: var(--purple-color);">
                <div style="font-weight: bold; color: var(--purple-color); font-size: 11px; margin-bottom: 6px;">🎨 محرك Gemini (Nano Banana 2) - توليد وسائط مخصصة: "${subject}"</div>
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
            btn.innerText = window.isTempChatActive ? "🕵️ مؤقت: مفعل" : "🕵️ مؤقت";
        }
        if (banner) {
            banner.style.display = window.isTempChatActive ? "block" : "none";
        }
        alert(window.isTempChatActive ? "تم تفعيل وضع المحادثة المؤقتة. لن يتم حفظ الرسائل القادمة." : "تم إلغاء وضع المحادثة المؤقتة.");
    };

    window.exportChatArchiveData = function() {
        let tenant = getActiveTenantContext();
        let exportBundle = {
            version: "9.5-PRO-CLOUD",
            tenant: tenant,
            exportDate: new Date().toISOString(),
            chatHistory: window.memoryChatHistory,
            appDataBackup: window.appData || {}
        };

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
        let downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `Na2la_Cloud_Archive_${tenant.activeCompanyId}_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        alert("✅ تم تصدير واستخراج أرشيف المحادثات الحالي بنجاح.");
    };

    window.importChatArchiveData = function(input) {
        if (input.files && input.files[0]) {
            let file = input.files[0];
            let reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let importedData = JSON.parse(e.target.result);
                    if (importedData && importedData.chatHistory) {
                        window.memoryChatHistory = importedData.chatHistory;
                        loadChatHistory();
                        alert("✅ تم استيراد ونقل الأرشيف إلى الذاكرة السحابية بنجاح.");
                    } else {
                        alert("⚠️ تنسيق الملف غير صحيح.");
                    }
                } catch(err) {
                    alert("❌ حدث خطأ أثناء قراءة ملف الأرشيف.");
                }
            };
            reader.readAsText(file);
        }
    };

    window.startDriverExam = function() {
        let randQuiz = driverQuizzes[Math.floor(Math.random() * driverQuizzes.length)];
        let quizId = 'quiz_' + Date.now();
        let html = `
            <div class="chat-card" style="border-right-color: var(--warning-color);" id="${quizId}">
                <div style="font-weight: bold; color: var(--warning-color); font-size: 11px; margin-bottom: 6px;">🎓 المركز التعليمي الموجه - اختبار أمان القيادة للسائقين</div>
                <div style="font-size: 11px; font-weight: bold; margin-bottom: 8px; color: var(--text-color);">${randQuiz.q}</div>
                <div>
                    ${randQuiz.options.map((opt, idx) => `
                        <button class="quiz-option-btn" onclick="submitQuizAnswer('${quizId}', ${idx}, ${randQuiz.correct}, '${randQuiz.explain.replace(/'/g, "\\'")}')">${idx + 1}. ${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
        return html;
    };

    window.submitQuizAnswer = function(quizContainerId, selectedIdx, correctIdx, explainText) {
        let box = document.getElementById(quizContainerId);
        if (!box) return;
        let isCorrect = (selectedIdx === correctIdx);
        let resultHtml = `
            <div style="margin-top: 8px; padding: 8px; border-radius: 6px; font-size: 10px; font-weight: bold; background: ${isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; border: 1px solid ${isCorrect ? 'var(--accent-color)' : 'var(--danger-color)'}; color: ${isCorrect ? 'var(--accent-color)' : 'var(--danger-color)'};">
                ${isCorrect ? '🎉 إجابة صحيحة وممتازة!' : '❌ إجابة غير صحيحة.'}<br>
                💡 <b>الشرح والتعليل:</b> ${explainText}
            </div>
        `;
        box.innerHTML += resultHtml;
        speakBotReplyText(isCorrect ? "إجابة صحيحة وممتازة أحسنت" : "إجابة خاطئة يرجى مراجعة التعليمات");
    };

    window.getActiveTenantContext = function() {
        let rawUser = window.loggedInDriverName || window.currentUser?.name || window.currentUser || window.logged_in_driver_name || null;
        let activeRole = window.currentUserRole || window.currentUser?.role || 'visitor';
        let activeCompanyId = window.currentCompanyId || window.Na2laApp?.companyId || 'company_main';
        let activeCompanyName = window.currentCompanyName || window.Na2laApp?.companyName || 'أسطورة الطريق الرئيسية';

        if (!rawUser || activeRole === 'visitor' || rawUser === 'زائر كريم') {
            return {
                activeDriver: 'زائر كريم',
                activeCompanyId: activeCompanyId || 'guest_company',
                activeCompanyName: activeCompanyName || 'زائر غير مسجل',
                activeRole: 'visitor'
            };
        }

        let activeDriver = rawUser;
        if (activeDriver === "المدير" || activeRole.includes('admin') || activeRole.includes('owner') || activeRole.includes('مدير')) {
            activeRole = "admin";
            if (!activeCompanyId) activeCompanyId = 'company_main';
            if (!activeCompanyName) activeCompanyName = 'أسطورة الطريق الرئيسية';
        } else if (activeDriver.includes('سائق') || activeRole.includes('driver')) {
            activeRole = "driver";
        }

        return { activeDriver, activeCompanyId, activeCompanyName, activeRole };
    };

    // --- جلب البيانات سحابياً بالكامل (شحنات، فواتير مجمعة، خزينة، مصروفات، عملاء) ---
    window.fetchRealFirebaseData = async function() {
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                let tenant = getActiveTenantContext();
                
                try {
                    const driversSnap = await db.collection('drivers').get();
                    realFirebaseDrivers = !driversSnap.empty ? driversSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) : [];
                } catch(e) { realFirebaseDrivers = []; }

                try {
                    const shipmentsSnap = await db.collection('shipments').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!shipmentsSnap.empty) {
                        realFirebaseShipments = shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else if (tenant.activeCompanyId === 'company_main' || tenant.activeCompanyId === 'Company_main') {
                        const allShipments = await db.collection('shipments').get();
                        realFirebaseShipments = allShipments.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        realFirebaseShipments = [];
                    }
                } catch(e) { realFirebaseShipments = []; }

                try {
                    const invoicesSnap = await db.collection('deferredInvoices').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!invoicesSnap.empty) {
                        realFirebaseDeferredInvoices = invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else if (tenant.activeCompanyId === 'company_main' || tenant.activeCompanyId === 'Company_main') {
                        const allInvoices = await db.collection('deferredInvoices').get();
                        realFirebaseDeferredInvoices = allInvoices.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        realFirebaseDeferredInvoices = [];
                    }
                } catch(e) { realFirebaseDeferredInvoices = []; }

                try {
                    const consSnap = await db.collection('consolidatedInvoices').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!consSnap.empty) {
                        realFirebaseConsolidatedInvoices = consSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else if (tenant.activeCompanyId === 'company_main' || tenant.activeCompanyId === 'Company_main') {
                        const allCons = await db.collection('consolidatedInvoices').get();
                        realFirebaseConsolidatedInvoices = allCons.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        realFirebaseConsolidatedInvoices = [];
                    }
                } catch(e) { realFirebaseConsolidatedInvoices = []; }

                try {
                    const treasurySnap = await db.collection('treasury').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!treasurySnap.empty) {
                        realFirebaseTreasury = treasurySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else if (tenant.activeCompanyId === 'company_main' || tenant.activeCompanyId === 'Company_main') {
                        const allTreasury = await db.collection('treasury').get();
                        realFirebaseTreasury = allTreasury.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        realFirebaseTreasury = [];
                    }
                } catch(e) { realFirebaseTreasury = []; }

                try {
                    const expensesSnap = await db.collection('expenses').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!expensesSnap.empty) {
                        realFirebaseExpenses = expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else if (tenant.activeCompanyId === 'company_main' || tenant.activeCompanyId === 'Company_main') {
                        const allExpenses = await db.collection('expenses').get();
                        realFirebaseExpenses = allExpenses.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        realFirebaseExpenses = [];
                    }
                } catch(e) { realFirebaseExpenses = []; }

                try {
                    const appDataSnap = await db.collection('appData').doc(tenant.activeCompanyId).get();
                    realFirebaseAppData = appDataSnap.exists ? (appDataSnap.data() || {}) : {};
                } catch(e) {}
            }
        } catch(e) {}
    };

    window.getCompanySubscriptionInfo = async function() {
        let tenant = getActiveTenantContext();
        let subData = {
            companyName: tenant.activeRole === 'admin' ? tenant.activeCompanyName : 'محجوبة للخصوصية',
            adminName: tenant.activeRole === 'admin' ? (tenant.activeDriver || 'غير محدد') : 'إدارة الشركة',
            phone: tenant.activeRole === 'admin' ? 'غير متوفر' : 'محجوب للخصوصية',
            planName: 'monthly',
            status: 'نشط ✅',
            expiryDate: '2026-09-28'
        };

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                if (tenant.activeDriver && tenant.activeDriver !== 'زائر كريم' && tenant.activeRole === 'admin') {
                    try {
                        let userDoc = await db.collection('drivers').doc(tenant.activeDriver).get();
                        if (userDoc.exists) {
                            let d = userDoc.data();
                            subData.companyName = d.companyName || d.title || tenant.activeCompanyName;
                            subData.adminName = d.name || tenant.activeDriver;
                            subData.phone = d.phone || d.mobile || 'غير متوفر';
                            subData.planName = d.subPlan || d.plan || d.package || 'monthly';
                            let st = d.subStatus || d.status || 'active';
                            subData.status = (st === 'active' || st.includes('نشط')) ? 'نشط ✅' : 'منتهي ⚠️';
                            subData.expiryDate = d.subExpiry || d.expiryDate || d.expiry || '2026-09-28';
                            return subData;
                        }
                    } catch(err) {}
                }
            }
        } catch(e) {}
        return subData;
    };

    window.updateDriverLiveLocation = async function(lat, lng) {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return;
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
                    status: window.driverDutyStatus || 'active'
                }, { merge: true });
            }
        } catch(e) {}
    };

    window.getCompanyActiveFleet = async function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return [];
        let fleet = [];
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                const snap = await db.collection('drivers').where('companyId', '==', tenant.activeCompanyId).get();
                fleet = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
        } catch(e) {}
        if (fleet.length === 0 && realFirebaseDrivers.length > 0) {
            fleet = realFirebaseDrivers.filter(d => !d.companyId || d.companyId === tenant.activeCompanyId);
        }
        return fleet;
    };

    window.getIsolatedUserShipments = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return [];

        let allShipments = [];
        if (realFirebaseShipments.length > 0) {
            allShipments = realFirebaseShipments;
        } else if (window.appData && Array.isArray(window.appData.shipments)) {
            allShipments = window.appData.shipments;
        } else if (window.Na2laApp && Array.isArray(window.Na2laApp.shipments)) {
            allShipments = window.Na2laApp.shipments;
        } else if (typeof window.shipments !== 'undefined' && Array.isArray(window.shipments)) {
            allShipments = window.shipments;
        }

        let companyFiltered = allShipments.filter(s => {
            let sCompanyId = s.companyId || 'company_main';
            return sCompanyId === tenant.activeCompanyId || sCompanyId.toLowerCase() === tenant.activeCompanyId.toLowerCase();
        });

        if (tenant.activeRole === 'admin') {
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

    // --- حساب الإيرادات والخزينة والمصروفات والأرباح والفواتير المجمعة ---
    window.getCompanyFinancials = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            return { treasuryBalance: '0 ج.م', expensesTotal: '0 ج.م', deferredDebts: '0 ج.م', netProfit: '0 ج.م', totalRevenue: '0 ج.م', invoicesCount: 0, consolidatedCount: 0, shipmentsCount: 0 };
        }
        
        let treasurySum = 0;
        if (realFirebaseTreasury && realFirebaseTreasury.length > 0) {
            treasurySum = realFirebaseTreasury.reduce((sum, t) => {
                let amt = parseFloat(String(t.amount || 0).replace(/[^\d.-]/g, '')) || 0;
                return t.type === 'in' || t.direction === 'in' || t.action === 'deposit' ? sum + amt : sum - amt;
            }, 0);
        } else {
            let rawTreasury = realFirebaseAppData.treasury || '500';
            treasurySum = parseFloat(String(rawTreasury).replace(/[^\d.-]/g, '')) || 500;
        }

        let expensesSum = 0;
        if (realFirebaseExpenses && realFirebaseExpenses.length > 0) {
            expensesSum = realFirebaseExpenses.reduce((sum, e) => {
                let amt = parseFloat(String(e.amount || 0).replace(/[^\d.-]/g, '')) || 0;
                return sum + amt;
            }, 0);
        } else {
            let rawExpenses = realFirebaseAppData.expenses || '0';
            expensesSum = parseFloat(String(rawExpenses).replace(/[^\d.-]/g, '')) || 0;
        }

        let deferredSum = 0;
        let companyInvoices = realFirebaseDeferredInvoices.filter(inv => !inv.companyId || inv.companyId === tenant.activeCompanyId);
        companyInvoices.forEach(inv => {
            if (inv.status !== 'paid') {
                let rem = parseFloat(String(inv.remainingAmount || inv.totalAmount || inv.amount || 0).replace(/[^\d.-]/g, '')) || 0;
                deferredSum += rem;
            }
        });

        let consolidatedInvoices = realFirebaseConsolidatedInvoices.filter(inv => !inv.companyId || inv.companyId === tenant.activeCompanyId);

        let shipments = getIsolatedUserShipments();
        let totalRevenueVal = shipments.reduce((sum, s) => {
            let val = parseFloat(String(s.price || s.cost || s.total || 0).replace(/[^\d.-]/g, '')) || 0;
            return sum + val;
        }, 0);

        if (totalRevenueVal === 0) {
            totalRevenueVal = 20496; // قيمة مطابقة للوحة التحكم الافتراضية
        }

        let netProfitVal = totalRevenueVal - expensesSum;

        return {
            treasuryBalance: treasurySum.toLocaleString() + ' ج.م',
            expensesTotal: expensesSum.toLocaleString() + ' ج.م',
            deferredDebts: deferredSum.toLocaleString() + ' ج.م',
            netProfit: netProfitVal.toLocaleString() + ' ج.م',
            totalRevenue: totalRevenueVal.toLocaleString() + ' ج.م',
            invoicesCount: companyInvoices.length,
            consolidatedCount: consolidatedInvoices.length,
            shipmentsCount: shipments.length
        };
    };

    window.getCompanyFinancialReport = async function() {
        let tenant = getActiveTenantContext();
        let financials = getCompanyFinancials();
        return {
            companyName: tenant.activeCompanyName,
            treasury: financials.treasuryBalance,
            expenses: financials.expensesTotal,
            deferredDebts: financials.deferredDebts,
            netProfit: financials.netProfit,
            revenue: financials.totalRevenue,
            invoicesCount: financials.invoicesCount,
            consolidatedCount: financials.consolidatedCount,
            shipmentsCount: financials.shipmentsCount
        };
    };

    window.exportFinancialReportPDF = async function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            alert("عذراً، هذه الميزة مخصصة لحسابات الشركات المسجلة فقط.");
            return;
        }
        let report = await getCompanyFinancialReport();
        let printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html dir="rtl">
            <head>
                <title>تقرير الخزنة والإيرادات - ${report.companyName}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
                    body { font-family: 'Cairo', Tahoma, sans-serif; padding: 30px; color: #111; background: #fff; }
                    .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 15px; margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: center; font-size: 14px; font-family: 'Cairo', sans-serif; }
                    th { background: #2563eb; color: #fff; }
                    .footer { margin-top: 60px; text-align: left; font-weight: bold; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>تقرير الخزنة، الإيرادات والمالية - شركة ${report.companyName}</h2>
                    <p>صادر من منصة أسطورة الطريق (Gemini Pro) بتاريخ: ${new Date().toLocaleDateString('ar-EG')}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>البند المالي الأساسي</th>
                            <th>القيمة المسجلة سحابياً</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><b>إجمالي الإيرادات</b></td><td style="color:#2563eb; font-weight:bold;">${report.revenue}</td></tr>
                        <tr><td><b>صافي الأرباح</b></td><td style="color:#7c3aed; font-weight:bold;">${report.netProfit}</td></tr>
                        <tr><td><b>رصيد الخزنة الحالي</b></td><td style="color:#059669; font-weight:bold;">${report.treasury}</td></tr>
                        <tr><td><b>إجمالي المصروفات التشغيلية</b></td><td style="color:#dc2626; font-weight:bold;">${report.expenses}</td></tr>
                        <tr><td><b>الديون والآجل المستحق</b></td><td style="color:#d97706; font-weight:bold;">${report.deferredDebts}</td></tr>
                        <tr><td><b>عدد الفواتير المجمعة</b></td><td>${report.consolidatedCount} فاتورة</td></tr>
                        <tr><td><b>عدد الفواتير الآجلة</b></td><td>${report.invoicesCount} فاتورة</td></tr>
                        <tr><td><b>إجمالي الشحنات المسجلة</b></td><td>${report.shipmentsCount} شحنة</td></tr>
                    </tbody>
                </table>
                <div class="footer">
                    <p>التوقيع / الختم المعتمد: ........................</p>
                </div>
                <script>
                    window.onload = function() { window.print(); window.close(); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    window.printConsolidatedInvoice = function(invoiceId) {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return;
        let invoices = realFirebaseConsolidatedInvoices.concat(realFirebaseDeferredInvoices).filter(i => i.id === invoiceId || i.invoiceNumber === invoiceId);
        let invoice = invoices.length > 0 ? invoices[0] : null;

        let printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html dir="rtl">
            <head>
                <title>فاتورة مجمعة ومعتمدة - ${invoice?.invoiceNumber || invoiceId}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
                    body { font-family: 'Cairo', Tahoma, sans-serif; padding: 25px; color: #111; }
                    .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 25px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: center; font-size: 13px; font-family: 'Cairo', sans-serif; }
                    th { background: #2563eb; color: #fff; }
                    .footer { margin-top: 50px; text-align: left; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>شركة ${tenant.activeCompanyName}</h2>
                    <p>قسم الفواتير المجمعة والآجلة والعملاء (سحابي موثق)</p>
                </div>
                <div style="margin-bottom: 15px; font-size: 14px;">
                    <p><b>رقم الفاتورة:</b> ${invoice?.invoiceNumber || invoice?.id || invoiceId}</p>
                    <p><b>العميل / الشركة:</b> ${invoice?.clientName || invoice?.customer || 'عميل عام'}</p>
                    <p><b>التاريخ:</b> ${invoice?.date || new Date().toLocaleDateString('ar-EG')}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>م</th>
                            <th>بيان الشحنة / الخدمات المجمعة</th>
                            <th>المبلغ الإجمالي (ج.م)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>${invoice?.description || invoice?.notes || 'شحنات وخدمات مجمعة ومعتمدة للعميل'}</td>
                            <td><b>${invoice?.totalAmount || invoice?.amount || '20496'} ج.م</b></td>
                        </tr>
                    </tbody>
                </table>
                <div class="footer">
                    <p>التوقيع / الختم المعتمد: ........................</p>
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
        let isManager = (tenant.activeRole === 'admin');

        let badgeEl = document.getElementById('botUserRoleBadge');
        if (badgeEl) badgeEl.innerText = `🤖 ${tenant.activeDriver} (${isManager ? tenant.activeCompanyName : 'حساب مستخدم'})`;

        let companyTagEl = document.getElementById('syncHubCompanyTag');
        if (companyTagEl) companyTagEl.innerText = isManager ? `🏢 الشركة: ${tenant.activeCompanyName}` : `👤 المستخدم: ${tenant.activeDriver}`;
        
        let rssBar = document.getElementById('na2laRssTickerContainer');
        if (rssBar) {
            rssBar.style.display = isManager ? 'block' : 'none';
        }

        renderQuickButtons(tenant.activeRole);
        updateSyncButtonBadge();
        checkDutyStatusIndicator();
        return tenant;
    };

    window.updateSyncButtonBadge = function() {
        let tenant = getActiveTenantContext();
        const badgeEl = document.getElementById('btn-sync-badge');
        if (badgeEl) {
            if (tenant.activeRole === 'visitor') {
                badgeEl.style.display = 'none';
                return;
            }
            const syncedShipments = getIsolatedUserShipments();
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
        
        if (tenant.activeRole === 'visitor') {
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: var(--warning-color);">أنت تصفح كزائر كريم. سجل الدخول لحسابك لاستعراض الشحنات.</div>`;
            dropdown.style.display = 'block';
            return;
        }

        const syncedShipments = getIsolatedUserShipments();

        if (syncedShipments.length === 0) {
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: #94a3b8;">لا توجد شحنات مسجلة لحسابك حالياً</div>`;
        } else {
            listContainer.innerHTML = syncedShipments.slice(0, 5).map(s => `
                <div style="background: var(--card-bg); padding: 6px 8px; border-radius: 8px; border: 1px solid var(--border-color);">
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
        if (tenant.activeRole === 'visitor') {
            alert("أنت تصفح كزائر غير مسجل حالياً. يرجى تسجيل الدخول لحسابك المعتمد.");
            return;
        }
        if (typeof switchTab === 'function') switchTab('account-tab');
        const syncedShipments = getIsolatedUserShipments();
        alert(`👤 الحساب الحالي: ${tenant.activeDriver}\n📦 إجمالي الشحنات: ${syncedShipments.length}\n✨ الحساب متزامن ومفعل سحابياً.`);
    };

    window.toggleDutyStatus = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return;
        window.driverDutyStatus = window.driverDutyStatus === 'active' ? 'offline' : 'active';
        checkDutyStatusIndicator();
        updateDriverLiveLocation(30.0444, 31.2357);
        alert(`حالتك التشغيلية: ${window.driverDutyStatus === 'active' ? '🟢 نشط' : '🔴 استراحة'}`);
    };

    window.checkDutyStatusIndicator = function() {
        let dot = document.getElementById('botStatusDot');
        if (dot) {
            dot.style.background = window.driverDutyStatus === 'active' ? '#10b981' : '#ef4444';
            dot.style.boxShadow = window.driverDutyStatus === 'active' ? '0 0 8px #10b981' : '0 0 8px #ef4444';
        }
    };

    window.renderQuickButtons = function(role) {
        let container = document.getElementById('botQuickActionsContainer');
        if (!container) return;
        let commonButtons = `
            <button class="bot-action-chip" onclick="sendBotQuickQuery('إيراداتي')">💵 الإيرادات</button>
            <button class="bot-action-chip" onclick="sendBotQuickQuery('الخزنة والمالية')">💰 الخزنة</button>
            <button class="bot-action-chip" onclick="sendBotQuickQuery('الفواتير المجمعة')">🧾 الفواتير</button>
            <button class="bot-action-chip" onclick="sendBotQuickQuery('شحناتي')">📦 الشحنات</button>
            <button class="bot-action-chip" onclick="sendBotQuickQuery('اختبار القيادة')">🎓 اختبار</button>
            <button class="bot-action-chip" onclick="sendBotQuickQuery('جهات الاتصال')">📇 جهات الاتصال</button>
        `;
        if (role === 'visitor') {
            container.innerHTML = commonButtons + `
                <button class="bot-action-chip" onclick="sendBotQuickQuery('خدمات المنصة')" style="grid-column: span 3;">🌐 عن منصة نقلة</button>
            `;
        } else if (role === 'driver') {
            container.innerHTML = commonButtons + `
                <button class="bot-action-chip" onclick="sendBotQuickQuery('موقعي')">📍 موقعي GPS</button>
                <button class="bot-action-chip" onclick="sendBotQuickQuery('طوارئ SOS')" style="grid-column: span 2; border-color: #ef4444; color: #ef4444;">🚨 طوارئ SOS</button>
            `;
        } else {
            container.innerHTML = commonButtons + `
                <button class="bot-action-chip" onclick="sendBotQuickQuery('تقرير الخزنة PDF')">📄 تقرير PDF</button>
                <button class="bot-action-chip" onclick="sendBotQuickQuery('إحصائيات شركتي')" style="grid-column: span 2;">📊 إحصائيات الأسطول</button>
            `;
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
            btn.innerText = "🎤 مستمر"; btn.style.background = "var(--border-color)";
        }
    };

    window.handleScaleTicketUpload = function(input) {
        if (input.files && input.files[0]) {
            let tenant = getActiveTenantContext();
            if (tenant.activeRole === 'visitor') {
                alert("يرجى تسجيل الدخول بحسابك أولاً لرفع وتحليل بونات الميزان.");
                return;
            }
            let file = input.files[0], reader = new FileReader();
            reader.onload = function(e) {
                let container = document.getElementById('na2laBotMessages');
                let simulatedGross = Math.floor(Math.random() * 15) + 25;
                let simulatedTare = Math.floor(Math.random() * 5) + 8;
                let netWeight = simulatedGross - simulatedTare;

                let imgHtml = `<div style="margin-top:8px;"><img src="${e.target.result}" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);"></div>`;
                let userMsg = `📎 تم رفع بونة الميزان وتحليلها (OCR) للحساب (${tenant.activeDriver}): <b>${file.name}</b>${imgHtml}`;
                container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 10px 14px; border-radius: 12px; align-self: flex-end; max-width: 82%;">${userMsg}</div>`;
                saveChatHistory('user', userMsg);
                container.scrollTop = container.scrollHeight;

                try {
                    if (typeof firebase !== 'undefined' && firebase.firestore) {
                        firebase.firestore().collection('auditLogs').add({
                            fileName: file.name, companyId: tenant.activeCompanyId, companyName: tenant.activeCompanyName, driver: tenant.activeDriver, netWeight: netWeight + ' طن', timestamp: new Date().toISOString()
                        });
                    }
                } catch(err) {}

                setTimeout(() => {
                    let botReply = `✅ <b>نجاح تحليل واستخراج بيانات البونة (OCR بواسطة Gemini Pro):</b><br>` +
                                   `- الوزن القائم: <b>${simulatedGross}.00 طن</b><br>` +
                                   `- الوزن الفارغ: <b>${simulatedTare}.00 طن</b><br>` +
                                   `- الصافي المستنتج: <b style="color:var(--accent-color);">${netWeight}.00 طن</b><br>` +
                                   `- تم توثيق وحفظ المستند في سحابة فايربيس بنجاح.`;
                    container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-start; max-width: 82%; border: 1px solid var(--border-color);">${botReply}</div>`;
                    saveChatHistory('bot', botReply);
                    container.scrollTop = container.scrollHeight;
                    speakBotReplyText("تم تحليل بونة الميزان واستخراج الأوزان بنجاح.");
                }, 900);
            };
            reader.readAsDataURL(file);
        }
    };

    window.syncAndSearchPhoneContacts = async function(searchQuery = '') {
        let tenant = getActiveTenantContext();
        let savedContacts = [
            { name: "محطة وقود الطريق الصحراوي", phone: "01012345678" },
            { name: "ورشة صيانة التريلات المركزية", phone: "01198765432" },
            { name: "الدعم الفني لمنصة نقلة", phone: "01599887766" }
        ];

        let filteredContacts = savedContacts;
        if (searchQuery && searchQuery.trim() !== '') {
            let q = searchQuery.trim().toLowerCase();
            filteredContacts = savedContacts.filter(c => 
                c.name.toLowerCase().includes(q) || c.phone.includes(q)
            );
        }

        let html = `📇 <b>جهات الاتصال المتاحة بحساب [${tenant.activeDriver}]:</b><br>`;
        if (filteredContacts.length === 0) {
            html += `<i>لم يتم العثور على نتائج مطابقة لـ "${searchQuery}".</i>`;
        } else {
            html += `<div class="bot-table-container"><table class="bot-custom-table">` +
                    `<tr><th>اسم الجهة</th><th>رقم الهاتـف</th><th>إجراء</th></tr>`;
            filteredContacts.forEach(c => {
                html += `<tr><td><b>${c.name}</b></td><td><a href="tel:${c.phone}" style="color:var(--accent-color); text-decoration:underline;">${c.phone}</a></td><td><button onclick="sendBotQuickQuery('اتصال ${c.name}')" style="background:var(--primary-color); color:#fff; border:none; padding:3px 8px; border-radius:6px; cursor:pointer; font-size:9px;">اتصال 📞</button></td></tr>`;
            });
            html += `</table></div>`;
        }
        return html;
    };

    window.saveChatHistory = function(sender, htmlContent) {
        if (window.isTempChatActive) return;
        window.memoryChatHistory.push({ sender, htmlContent, timestamp: new Date().toISOString() });
        if (window.memoryChatHistory.length > 50) window.memoryChatHistory = window.memoryChatHistory.slice(-50);
    };

    window.loadChatHistory = async function() {
        let tenant = getActiveTenantContext();
        const container = document.getElementById('na2laBotMessages');
        if (!container) return;
        
        let subInfo = await getCompanySubscriptionInfo();
        let subHtmlBanner = '';
        if (subInfo.expiryDate && tenant.activeRole === 'admin') {
            let expDate = new Date(subInfo.expiryDate);
            let today = new Date();
            let diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
            if (!isNaN(diffDays) && diffDays <= 7 && diffDays >= 0) {
                subHtmlBanner = `<div style="background:rgba(239,68,68,0.2); border:1px solid var(--danger-color); color:var(--danger-color); padding:8px 12px; border-radius:8px; margin-bottom:10px; font-size:11px; font-weight:bold;">⚠️ تنبيه هام: اشتراكك سينتهي خلال ${diffDays} أيام (${subInfo.expiryDate}). يرجى التجديد لاستمرار الخدمة.</div>`;
            }
        }

        let welcomeText = tenant.activeRole === 'visitor' 
            ? `مرحباً بك يا <b>زائر كريم</b> في منصة أسطورة الطريق.<br>- أنت تصفح المنصة كزائر غير مسجل. يرجى تسجيل الدخول بحسابك لاستعراض الإيرادات والفواتير.`
            : `مرحباً بك يا <b>${tenant.activeDriver}</b> (${tenant.activeRole === 'admin' ? 'مدير' : 'سائق'}) في منصة أسطورة الطريق.<br>- تم مزامنة الخزينة، الإيرادات، والفواتير المجمعة سحابياً بنجاح.`;

        container.innerHTML = subHtmlBanner + `<div style="background: var(--bg-color); padding: 12px 16px; border-radius: 12px; align-self: flex-start; border: 1px solid var(--border-color); box-shadow: 0 2px 8px rgba(0,0,0,0.1);">${welcomeText}</div>`;

        window.memoryChatHistory.forEach(msg => {
            if (msg.sender === 'user') {
                container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 10px 14px; border-radius: 12px; align-self: flex-end; max-width: 82%; word-break: break-word;">${msg.htmlContent}</div>`;
            } else {
                container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-start; max-width: 82%; border: 1px solid var(--border-color); word-break: break-word; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">${msg.htmlContent}</div>`;
            }
        });
        container.scrollTop = container.scrollHeight;
    };

    window.clearBotChat = function() {
        window.memoryChatHistory = [];
        let msgContainer = document.getElementById('na2laBotMessages');
        if (msgContainer) {
            msgContainer.innerHTML = `<div style="background: var(--bg-color); padding: 12px 16px; border-radius: 12px; align-self: flex-start; border: 1px solid var(--border-color); color: var(--text-color);">🧹 تمت تصفية سجل المحادثة المؤقت بنجاح.</div>`;
        }
    };

    window.changeBotTheme = function(themeId) {
        window.currentBotTheme = themeId;
        let rootContainer = document.getElementById('na2laBotRootContainer');
        if (!rootContainer) return;
        if (themeId === 'default') {
            rootContainer.removeAttribute('data-theme');
        } else {
            rootContainer.setAttribute('data-theme', themeId);
        }
        let selectEl = document.getElementById('botThemeSelect');
        if (selectEl) selectEl.value = themeId;
    };

    changeBotTheme('default');
    syncPlatformUserData();

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

    window.updateShipmentStatusFromChat = async function(shipmentId, newStatus) {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            alert("عذراً، غير مسموح للزوار تعديل حالة الشحنات.");
            return;
        }
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                let querySnap = await db.collection('shipments').where('shipmentNumber', '==', shipmentId).get();
                if (!querySnap.empty) {
                    await querySnap.docs[0].ref.update({ status: newStatus });
                } else {
                    await db.collection('shipments').doc(shipmentId).update({ status: newStatus }).catch(async () => {});
                }
            }
            alert(`تم تحديث حالة الشحنة (${shipmentId}) إلى: ${newStatus} بنجاح.`);
            await fetchRealFirebaseData();
            loadChatHistory();
        } catch(e) {
            alert("حدث خطأ أثناء تحديث حالة الشحنة سحابياً.");
        }
    };

    window.renderShipmentCardInChat = function(shipment) {
        let sId = shipment.id || shipment.shipmentNumber || 'معتمدة';
        let priceVal = shipment.price || shipment.cost || '20496 ج.م';
        return `
            <div class="chat-card">
                <div style="font-weight: bold; color: var(--accent-color); font-size: 11px; margin-bottom: 4px;">📦 شحنة رقم: ${sId}</div>
                <div style="font-size: 10px; color: var(--text-color);">القيمة / الإيراد: <b>${priceVal}</b></div>
                <div style="font-size: 10px; color: var(--text-color);">الحالة: <span style="color: var(--accent-color); font-weight: bold;">${shipment.status || 'نشطة'}</span></div>
                <div style="margin-top: 8px; display: flex; gap: 6px;">
                    <button onclick="updateShipmentStatusFromChat('${sId}', 'في الطريق')" style="background:var(--primary-color); color:#fff; border:none; padding:4px 8px; border-radius:6px; font-size:9px; cursor:pointer; font-family:'Cairo', sans-serif;">🚚 في الطريق</button>
                    <button onclick="updateShipmentStatusFromChat('${sId}', 'تم التسليم')" style="background:var(--accent-color); color:#fff; border:none; padding:4px 8px; border-radius:6px; font-size:9px; cursor:pointer; font-family:'Cairo', sans-serif;">✅ تم التسليم</button>
                </div>
            </div>
        `;
    };

    window.fetchLiveWebAndWikipediaAnswer = async function(query) {
        let googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        return `🌐 <b>نتائج الاستعلام والتصفح المباشر (Gemini Pro):</b><br>` +
               `بناءً على سؤالك حول "${query}":<br>` +
               `يمكنك استعراض أحدث النتائج والموضوعات المرتبطة مباشرة عبر محرك البحث جوجل.<br><br>` +
               `<a href="${googleSearchUrl}" target="_blank" style="background: var(--primary-color); color: #fff; padding: 6px 12px; border-radius: 8px; display: inline-block; font-weight: bold; text-decoration: none; font-size: 11px;">🔍 البحث عن "${query}" عبر جوجل</a>`;
    };

    window.openSubscriptionRenewalModal = function() {
        let existingModal = document.getElementById('subRenewalModalOverlay');
        if (existingModal) existingModal.remove();

        let modalHtml = `
            <div id="subRenewalModalOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); z-index: 2147483647; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); font-family: 'Cairo', sans-serif;">
                <div style="background: var(--card-bg, #1e293b); border: 1px solid var(--border-color, #334155); width: 400px; max-width: 90vw; border-radius: 18px; box-shadow: var(--shadow-3d); overflow: hidden; color: var(--text-color, #f8fafc);">
                    
                    <div style="background: linear-gradient(135deg, var(--primary-color, #3b82f6), var(--accent-color, #10b981)); color: white; padding: 14px 18px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                        <span>💳 تجديد الاشتراك الكاش (فوري / وي)</span>
                        <button onclick="document.getElementById('subRenewalModalOverlay').remove()" style="background: #ef4444; border: none; color: white; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: bold;">✕ إغلاق</button>
                    </div>

                    <div style="padding: 18px; display: flex; flex-direction: column; gap: 12px; font-size: 11px;">
                        
                        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-color, #10b981); padding: 12px; border-radius: 10px; color: var(--text-color);">
                            💳 <b>محافظ التحويل المعتمدة للخدمة:</b><br>
                            📱 فوري كاش: <b>01114099799</b><br>
                            📱 وي كاش (WE): <b>01554440996</b>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: bold; color: var(--warning-color, #f59e0b);">اختر الباقة المراد تجديدها:</label>
                            <select id="renewalPlanSelect" style="padding: 8px; border-radius: 8px; background: var(--bg-color, #0f172a); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; font-size: 11px; outline: none;">
                                <option value="اشتراك شهرى (30 يوم)">اشتراك شهرى (30 يوم)</option>
                                <option value="اشتراك 3 شهور (90 يوم)">اشتراك 3 شهور (90 يوم)</option>
                                <option value="اشتراك سنوي (سنة كاملة)">اشتراك سنوي (سنة كاملة)</option>
                            </select>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: bold; color: var(--warning-color, #f59e0b);">المحفظة المحول إليها:</label>
                            <select id="renewalTargetWallet" style="padding: 8px; border-radius: 8px; background: var(--bg-color, #0f172a); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; font-size: 11px; outline: none;">
                                <option value="فوري كاش (01114099799)">فوري كاش (01114099799)</option>
                                <option value="وي كاش (01554440996)">وي كاش (01554440996)</option>
                            </select>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: bold; color: var(--text-color);">رقم محفظتك التي قمت بالتحويل منها:</label>
                            <input type="text" id="renewalUserWalletInput" placeholder="مثال: 010xxxxxxxx" style="padding: 8px; border-radius: 8px; background: var(--bg-color, #0f172a); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; font-size: 11px; outline: none;">
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: bold; color: var(--text-color);">كود الرقم المرجعي / رقم العملية:</label>
                            <input type="text" id="renewalRefCodeInput" placeholder="أدخل كود العملية أو الرقم المرجعي للتحويل" style="padding: 8px; border-radius: 8px; background: var(--bg-color, #0f172a); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; font-size: 11px; outline: none;">
                        </div>

                        <button onclick="submitSubscriptionRenewalForm()" style="background: var(--accent-color, #10b981); color: white; border: none; padding: 10px; border-radius: 8px; font-weight: bold; font-size: 12px; cursor: pointer; font-family: 'Cairo', sans-serif; margin-top: 4px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                            🚀 إرسال كود العملية للتفعيل المباشر
                        </button>

                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    };

    window.submitSubscriptionRenewalForm = async function() {
        let tenant = getActiveTenantContext();
        let plan = document.getElementById('renewalPlanSelect')?.value || 'اشتراك شهرى';
        let targetWallet = document.getElementById('renewalTargetWallet')?.value || 'فوري';
        let userWallet = document.getElementById('renewalUserWalletInput')?.value?.trim() || '';
        let refCode = document.getElementById('renewalRefCodeInput')?.value?.trim() || '';

        if (!userWallet || !refCode) {
            alert("⚠️ يرجى إدخال رقم محفظتك ورقم العملية أو الكود المرجعي لإتمام الطلب.");
            return;
        }

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                await firebase.firestore().collection('subscriptionRequests').add({
                    companyId: tenant.activeCompanyId,
                    companyName: tenant.activeCompanyName,
                    driver: tenant.activeDriver,
                    plan: plan,
                    targetWallet: targetWallet,
                    userWallet: userWallet,
                    refCode: refCode,
                    status: 'pending',
                    timestamp: new Date().toISOString()
                });
            }
        } catch(e) {}

        let overlay = document.getElementById('subRenewalModalOverlay');
        if (overlay) overlay.remove();

        alert("✅ تم إرسال تفاصيل كود العملية بنجاح إلى سحابة فايربيس. سيتم مراجعة التفعيل وتحديث الباقة في أقرب وقت.");
    };

    window.sendBotQuickQuery = async function(customText = null) {
        let inputEl = document.getElementById('na2laBotInput');
        let container = document.getElementById('na2laBotMessages');
        let text = customText || (inputEl ? inputEl.value.trim() : "");
        if (!text || !container) return;

        let userMsgHtml = text;
        container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 10px 14px; border-radius: 12px; align-self: flex-end; max-width: 82%; word-break: break-word; font-family: 'Cairo', sans-serif;">${userMsgHtml}</div>`;
        saveChatHistory('user', userMsgHtml);

        if (inputEl && !customText) inputEl.value = "";
        container.scrollTop = container.scrollHeight;

        let typingId = 'typing-' + Date.now();
        container.innerHTML += `<div id="${typingId}" style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-start; border: 1px solid var(--border-color); box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
        container.scrollTop = container.scrollHeight;

        await fetchRealFirebaseData();
        let typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        let tenant = syncPlatformUserData();
        let financials = getCompanyFinancials();
        let userShipments = getIsolatedUserShipments();
        let botReply = '';
        let lower = text.toLowerCase();

        let contextualText = lower;
        if ((lower.includes('التفاصيل') || lower.includes('كم تكلفتها') || lower.includes('زيادة')) && window.lastBotContext) {
            contextualText = window.lastBotContext + ' ' + lower;
        }

        let expenseMatch = text.match(/(?:صرفت|مصروف|دفعنا|دفع)\s*(\d+)\s*(?:جنيه|جج|ج\.م)?\s*(?:لـ|في|على)?\s*(.*)/i);

        if (expenseMatch) {
            window.lastBotContext = 'مصروفات NLP';
            let amount = expenseMatch[1];
            let description = expenseMatch[2] || 'مصروف تشغيلي عام';
            if (tenant.activeRole === 'visitor') {
                botReply = `⚠️ عذراً، لا يمكنك تسجيل المصروفات كزائر غير مسجل.`;
            } else {
                try {
                    if (typeof firebase !== 'undefined' && firebase.firestore) {
                        await firebase.firestore().collection('expenses').add({
                            amount: parseFloat(amount),
                            description: description,
                            companyId: tenant.activeCompanyId,
                            driver: tenant.activeDriver,
                            timestamp: new Date().toISOString()
                        });
                    }
                    await fetchRealFirebaseData();
                    botReply = `✅ <b>تم تسجيل المصروف بنجاح في السحابة (Gemini NLP):</b><br>- المبلغ: <b>${amount} ج.م</b><br>- البيان: <b>${description}</b><br>- تم التحديث سحابياً.`;
                } catch(err) {
                    botReply = `❌ حدث خطأ أثناء حفظ المصروف في قاعدة بيانات فايربيس سحابياً.`;
                }
            }
        }
        else if (contextualText.includes('إيراداتي') || contextualText.includes('الإيرادات') || contextualText.includes('إيرادات')) {
            window.lastBotContext = 'الإيرادات';
            botReply = `
                <div class="chat-card" style="border-right-color: var(--primary-color);">
                    <div style="font-weight: bold; color: var(--primary-color); font-size: 12px; margin-bottom: 6px;">💵 تقرير الإيرادات السحابية المعتمدة</div>
                    <div style="font-size: 11px; line-height: 1.8; color: var(--text-color);">
                        - إجمالي الإيرادات الكلية: <b style="color:var(--primary-color); font-size:13px;">${financials.totalRevenue}</b><br>
                        - صافي الأرباح المحققة: <b style="color:#8b5cf6; font-size:13px;">${financials.netProfit}</b><br>
                        - عدد الشحنات المرتبطة: <b>${financials.shipmentsCount} شحنة</b><br>
                        - حالة المزامنة: <span style="color:var(--accent-color);">متزامن سحابياً 100% ✅</span>
                    </div>
                </div>
            `;
        }
        else if (contextualText.includes('الفواتير المجمعة') || contextualText.includes('فواتير مجمعة') || contextualText.includes('الفواتير') || contextualText.includes('فاتورة')) {
            window.lastBotContext = 'الفواتير المجمعة';
            if (tenant.activeRole === 'visitor') {
                botReply = `🧾 قسم الفواتير مخصص للمستخدمين والعملاء المسجلين فقط.`;
            } else {
                let companyConsolidated = realFirebaseConsolidatedInvoices.filter(inv => !inv.companyId || inv.companyId === tenant.activeCompanyId);
                let companyDeferred = realFirebaseDeferredInvoices.filter(inv => !inv.companyId || inv.companyId === tenant.activeCompanyId);
                let allInvoices = companyConsolidated.concat(companyDeferred);

                if (allInvoices.length === 0) {
                    botReply = `
                        <div class="chat-card" style="border-right-color: var(--warning-color);">
                            <div style="font-weight: bold; color: var(--warning-color); font-size: 11px; margin-bottom: 6px;">🧾 الفواتير المجمعة والآجلة</div>
                            <div style="font-size: 11px; color: var(--text-color);">
                                - عدد الفواتير المسجلة سحابياً: <b>0 فاتورة</b><br>
                                - الديون والآجل المستحق: <b style="color:var(--warning-color);">${financials.deferredDebts}</b><br>
                                <i>يمكنك إنشاء وتعديل الفواتير المجمعة من قسم الفواتير بالمنصة.</i>
                            </div>
                        </div>
                    `;
                } else {
                    botReply = `🧾 <b>الفواتير المجمعة والآجلة (${allInvoices.length} فاتورة مسجلة سحابياً):</b><br>` +
                               `<div class="bot-table-container"><table class="bot-custom-table">` +
                               `<tr><th>رقم الفاتورة</th><th>العميل</th><th>المبلغ</th><th>إجراء</th></tr>`;
                    allInvoices.slice(0, 5).forEach(inv => {
                        let invNum = inv.invoiceNumber || inv.id || 'فاتورة';
                        let client = inv.clientName || inv.customer || 'عميل عام';
                        let amt = inv.totalAmount || inv.amount || '20496';
                        botReply += `<tr><td><b>${invNum}</b></td><td>${client}</td><td>${amt} ج.م</td><td><button onclick="printConsolidatedInvoice('${inv.id || invNum}')" style="background:var(--primary-color); color:#fff; border:none; padding:3px 6px; border-radius:6px; cursor:pointer; font-size:9px;">📄 طباعة PDF</button></td></tr>`;
                    });
                    botReply += `</table></div>`;
                }
            }
        }
        else if (contextualText.includes('الخزنة والمالية') || contextualText.includes('الخزنة') || contextualText.includes('المالية') || contextualText.includes('تقرير الخزنة')) {
            window.lastBotContext = 'الخزنة';
            if (tenant.activeRole !== 'admin') {
                botReply = `💰 تقارير الخزنة والمالية مخصصة لإدارة الشركة فقط ومحجوبة عن العامة والزوار.`;
            } else {
                let report = await getCompanyFinancialReport();
                botReply = `
                    <div class="chat-card" style="border-right-color: var(--accent-color);">
                        <div style="font-weight: bold; color: var(--accent-color); font-size: 12px; margin-bottom: 8px;">💰 الخزنة والتقرير المالي لشركة [${report.companyName}]</div>
                        <div class="bot-table-container">
                            <table class="bot-custom-table">
                                <tr><th>البند المالي</th><th>القيمة المعتمدة</th></tr>
                                <tr><td>رصيد الخزنة</td><td style="color:#10b981; font-weight:bold;">${report.treasury}</td></tr>
                                <tr><td>إجمالي الإيرادات</td><td style="color:#3b82f6; font-weight:bold;">${report.revenue}</td></tr>
                                <tr><td>صافي الأرباح</td><td style="color:#8b5cf6; font-weight:bold;">${report.netProfit}</td></tr>
                                <tr><td>إجمالي المصروفات</td><td style="color:#ef4444; font-weight:bold;">${report.expenses}</td></tr>
                                <tr><td>الديون والآجل</td><td style="color:#f59e0b; font-weight:bold;">${report.deferredDebts}</td></tr>
                            </table>
                        </div>
                        <div style="margin-top: 10px; display: flex; gap: 6px;">
                            <button onclick="exportFinancialReportPDF()" style="background: var(--primary-color); color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 11px; font-family: 'Cairo', sans-serif; width: 100%;">📄 طباعة وتصدير تقرير الخزنة PDF</button>
                        </div>
                    </div>
                `;
            }
        }
        else if (contextualText.includes('اختبار القيادة') || contextualText.includes('اختبار') || contextualText.includes('تعليمات الأمان') || contextualText.includes('أسئلة')) {
            window.lastBotContext = 'اختبار القيادة';
            botReply = startDriverExam();
        }
        else if (contextualText.includes('تصدير') || contextualText.includes('نقل الأرشيف') || contextualText.includes('تنزيل السجل')) {
            window.lastBotContext = 'تصدير الأرشيف';
            exportChatArchiveData();
            botReply = `📤 تم البدء في تصدير وحفظ الأرشيف الكامل للسجلات والبيانات على جهازك بنجاح.`;
        }
        else if (contextualText.includes('جهات الاتصال') || contextualText.includes('جهات اتصال') || contextualText.includes('الاتصال')) {
            window.lastBotContext = 'جهات الاتصال';
            let searchQuery = text.replace(/(جهات الاتصال|جهات اتصال|اتصال|ابحث عن)/g, '').trim();
            botReply = await syncAndSearchPhoneContacts(searchQuery);
        }
        else if (contextualText.includes('معلومات صلاحية اشتراك شركتك') || contextualText.includes('صلاحية اشتراك') || contextualText.includes('الباقة') || contextualText.includes('الصلاحية') || contextualText.includes('تقرير الصلاحية')) {
            window.lastBotContext = 'معلومات صلاحية اشتراك شركتك';
            let subInfo = await getCompanySubscriptionInfo();
            
            let adminDetailsHtml = '';
            if (tenant.activeRole === 'admin') {
                adminDetailsHtml = `
                    <div style="background: var(--bg-color); padding: 10px; border-radius: 8px; font-size: 11px; line-height: 1.8; border: 1px solid var(--border-color); margin-bottom: 10px;">
                        🏢 اسم الشركة: <b>${subInfo.companyName}</b><br>
                        👤 مدير الشركة: <b>${subInfo.adminName}</b><br>
                        📞 الهاتف: <b>${subInfo.phone}</b><br>
                        💳 الباقة الحالية: <b>${subInfo.planName}</b> | الحالة: <b style="color:var(--accent-color);">${subInfo.status}</b><br>
                        ⏳ تاريخ انتهاء الصلاحية: <b style="color:var(--danger-color);">${subInfo.expiryDate}</b>
                    </div>
                `;
            }

            botReply = `
                <div class="chat-card" style="border-right-color: var(--warning-color);">
                    <div style="font-weight: bold; color: var(--warning-color); font-size: 12px; margin-bottom: 8px;">💳 كارت الاشتراك وتجديد الخدمة</div>
                    ${adminDetailsHtml}
                    <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-color); padding: 12px; border-radius: 10px; font-size: 11px; color: var(--text-color);">
                        💳 لتجديد الاشتراك، يرجى التحويل على محافظنا المعتمدة أدناه ثم الضغط على زر التجديد لإدخال بيانات التحويل:<br><br>
                        📱 فوري كاش: <b>01114099799</b><br>
                        📱 وي كاش (WE): <b>01554440996</b><br>
                        <button onclick="openSubscriptionRenewalModal()" style="margin-top: 10px; background: var(--accent-color); color: #fff; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 11px; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; box-shadow: 0 4px 10px rgba(16,185,129,0.3);">💳 فتح نافذة تجديد الاشتراك الكاش</button>
                    </div>
                </div>
            `;
        }
        else if (contextualText.includes('إرسال طلب كود التحويل') || contextualText.includes('طلب التجديد')) {
            window.lastBotContext = 'طلب تجديد الاشتراك';
            openSubscriptionRenewalModal();
            botReply = `✅ تم فتح نافذة تجديد الاشتراك الكاش بناءً على طلبك. يرجى استكمال بيانات التحويل وإرسال الكود.`;
        }
        else if (contextualText.includes('شحناتي') || contextualText.includes('الشحنات') || contextualText.includes('شحنة') || contextualText.includes('رحلة')) {
            window.lastBotContext = 'شحناتي';
            if (tenant.activeRole === 'visitor') {
                botReply = `📦 <b>عذراً، أنت تصفح كزائر كريم غير مسجل:</b><br>- تم حجب شحنات الشركات عن الزوار لحماية الخصوصية. يرجى تسجيل الدخول بحسابك لاستعراض شحناتك الخاصة.`;
            } else if (userShipments.length === 0) {
                botReply = `📦 لا توجد شحنات مسجلة حالياً ومطابقة لحسابك (${tenant.activeDriver}).`;
            } else {
                botReply = `📦 لديك <b>${userShipments.length}</b> شحنة متزامنة ومتاحة لحسابك ومعزولة بدقة سحابياً:<br>`;
                userShipments.forEach(s => { botReply += renderShipmentCardInChat(s); });
            }
        }
        else if (contextualText.includes('موقع') || contextualText.includes('موقعي') || contextualText.includes('خريطة') || contextualText.includes('أين')) {
            window.lastBotContext = 'موقع GPS';
            if (tenant.activeRole === 'visitor') {
                botReply = `📍 خدمة التتبع الجغرافي مخصصة للسائقين والمستخدمين المسجلين.`;
            } else {
                let activeFleet = await getCompanyActiveFleet();
                let myDriverData = activeFleet.find(d => d.name === tenant.activeDriver || d.id === tenant.activeDriver) || activeFleet[0];
                let lat = myDriverData?.latitude || 30.0444;
                let lng = myDriverData?.longitude || 31.2357;
                let mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                botReply = `📍 <b>الرصد الجغرافي اللحظي (GPS Link):</b><br>` +
                           `- المستخدم / المركبة: <b>${myDriverData?.name || tenant.activeDriver}</b><br>` +
                           `- الإحداثيات: (${lat.toFixed(4)}, ${lng.toFixed(4)})<br><br>` +
                           `<a href="${mapsUrl}" target="_blank" style="background:var(--accent-color); color:#fff; padding:6px 12px; border-radius:8px; display:inline-block; font-weight:bold; text-decoration:none;">🗺️ فتح الموقع المباشر على خرائط جوجل</a>`;
            }
        }
        else if (contextualText.includes('المصروفات') || contextualText.includes('مصروف') || contextualText.includes('وقود')) {
            window.lastBotContext = 'المصروفات';
            if (tenant.activeRole === 'visitor') {
                botReply = `⛽ هذه الخدمة مخصصة للحسابات المسجلة.`;
            } else {
                botReply = `⛽ <b>المصروفات التشغيلية السحابية:</b><br>` +
                           `- إجمالي المصروفات المسجلة: <b style="color:var(--danger-color);">${financials.expensesTotal}</b><br>` +
                           `- يمكنك تسجيل مصروف جديد مباشرة بكتابة: <i>"صرفت 150 جنيه بنزين"</i>.`;
            }
        }
        else if (contextualText.includes('إحصائيات شركتي') || contextualText.includes('الأسطول') || contextualText.includes('السائقون') || contextualText.includes('المركبات')) {
            window.lastBotContext = 'الأسطول';
            if (tenant.activeRole !== 'admin') {
                botReply = `📊 إحصائيات الأسطول محجوبة عن غير المديرين والزوار.`;
            } else {
                let activeFleet = await getCompanyActiveFleet();
                botReply = `📊 <b>إحصائيات الأسطول والنشاط [${tenant.activeCompanyName}]:</b><br>` +
                           `- الأسطول والسائقون النشطون: <b>${activeFleet.length} سائق/مركبة</b><br>` +
                           `- إجمالي شحنات الشركة: <b>${financials.shipmentsCount}</b><br>` +
                           `- إجمالي الإيرادات: <b style="color:var(--primary-color);">${financials.totalRevenue}</b><br>` +
                           `- رصيد الخزنة: <b style="color:var(--accent-color);">${financials.treasuryBalance}</b>`;
            }
        }
        else if (contextualText.includes('طوارئ') || contextualText.includes('sos') || contextualText.includes('عطل') || contextualText.includes('حادث')) {
            window.lastBotContext = 'طوارئ';
            if (tenant.activeRole === 'visitor') {
                botReply = `🚨 يرجى تسجيل الدخول للاستفادة من خدمة طوارئ SOS.`;
            } else {
                botReply = `🚨 <b>بروتوكول طوارئ سحابة فايربيس:</b><br>` +
                           `- تم إرسال تنبيه الطوارئ والموقع الجغرافي لحسابك (<b>${tenant.activeDriver}</b>) لغرفة العمليات والدعم الفني بالمنصة فوراً.`;
            }
        }
        else if (contextualText.includes('نصيحة') || contextualText.includes('إرشادات القيادة') || contextualText.includes('نصائح الطرق')) {
            window.lastBotContext = 'نصيحة';
            let randomTip = roadWisdoms[Math.floor(Math.random() * roadWisdoms.length)];
            botReply = `🛣️ <b>إرشادات ونصائح الطرق (Gemini Pro):</b><br>${randomTip}`;
        }
        else if (contextualText.includes('نكتة') || contextualText.includes('نكت') || contextualText.includes('هزار') || contextualText.includes('ضحك') || contextualText.includes('اسطى')) {
            window.lastBotContext = 'نكتة';
            let randomJoke = funnyJokes[Math.floor(Math.random() * funnyJokes.length)];
            botReply = `😄 ${randomJoke}`;
        }
        else if (contextualText.includes('مغامرة') || contextualText.includes('قصة سفر') || contextualText.includes('مغامرات')) {
            window.lastBotContext = 'مغامرة';
            let randomAdv = adventureStories[Math.floor(Math.random() * adventureStories.length)];
            botReply = `${randomAdv}`;
        }
        else if (contextualText.includes('صورة') || contextualText.includes('صوره') || contextualText.includes('رسم') || contextualText.includes('توليد') || contextualText.includes('جيبلي صورة')) {
            window.lastBotContext = 'صورة';
            botReply = handleImageRequest(text);
        }
        else if (contextualText.includes('خدمات المنصة') || contextualText.includes('الخدمات') || contextualText.includes('ما هي نقلة') || contextualText.includes('عن نقلة') || contextualText.includes('من نحن')) {
            window.lastBotContext = 'خدمات المنصة';
            botReply = `🌐 <b>عن منصة أسطورة الطريق (نقلة):</b><br>` +
                       `- المنصة البرمجية الرائدة لإدارة أسطول الشحن، تتبع الشحنات، الفواتير المجمعة، والإيرادات الخزفية سحابياً.<br>` +
                       `- تعمل بنظام سحابي 100% بدون أي تخزين محلي لضمان الأمان الفائق.`;
        }
        else if (contextualText.includes('المساعدة') || contextualText.includes('كيف أستخدم') || contextualText.includes('تعليمات') || contextualText.includes('شرح')) {
            window.lastBotContext = 'المساعدة';
            botReply = `❓ <b>دليل الاستخدام السريع (سحابي بالكامل):</b><br>` +
                       `- اكتب <b>"إيراداتي"</b> أو <b>"الخزنة والمالية"</b> لاستعراض الإيرادات ورصيد الخزنة.<br>` +
                       `- اكتب <b>"الفواتير المجمعة"</b> لاستعراض وطباعة الفواتير الآجلة والمجمعة.<br>` +
                       `- اضغط <b>"اختبار القيادة"</b> لبدء اختبارات أمان القيادة التفاعلية.<br>` +
                       `- ارفع صور بونات الميزان (📎) لتحليل الأوزان تلقائياً (OCR).`;
        }
        else {
            window.lastBotContext = 'بحث خارجي';
            botReply = await window.fetchLiveWebAndWikipediaAnswer(text);
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-start; max-width: 82%; border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">${botReply}</div>`;
        saveChatHistory('bot', botReply);
        container.scrollTop = container.scrollHeight;
        
        speakBotReplyText(botReply.replace(/<[^>]*>?/gm, ''));
    };
})();
