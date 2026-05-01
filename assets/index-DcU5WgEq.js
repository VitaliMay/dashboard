(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={MENU_OPEN:`open`,BUTTON_ROTATE:`rotade`,BODY_LOCK:`lock`,MENU_LINK:`menu__list-link`},t={MOBILE_BREAKPOINT:768.9,ANIMATION_DELAY:400},n=document.querySelector(`.burger-button`),r=document.body,i=document.querySelector(`.menu`),a=()=>{!i||!n||(n&&n.addEventListener(`click`,s),i&&i.addEventListener(`click`,c),window.addEventListener(`resize`,l))};function o(){i.classList.remove(e.MENU_OPEN),n.classList.remove(e.BUTTON_ROTATE),r.classList.remove(e.BODY_LOCK)}function s(){i.classList.toggle(e.MENU_OPEN),n.classList.toggle(e.BUTTON_ROTATE),r.classList.toggle(e.BODY_LOCK),window.scrollTo({top:0,behavior:`smooth`})}function c(t){t.target.classList.contains(e.MENU_LINK)&&o()}function l(){window.innerWidth>=t.MOBILE_BREAKPOINT&&i.classList.contains(e.MENU_OPEN)&&o()}var u={PROJECT:17044672,EMPLOYEE:17044673,MULTIPLIER:1e5},d={ERRORS:{PROJECT_EXISTS:`Проект с таким именем уже существует`,EMPLOYEE_EXISTS:`Сотрудник с таким именем уже существует`,PROJECT_NOT_FOUND:`Проект не найден`,EMPLOYEE_NOT_FOUND:`Сотрудник не найден`,CAPACITY_EXCEEDED:`Превышение capacity проекта`,INVALID_DATA:`Некорректные данные`},SUCCESS:{PROJECT_ADDED:`Проект успешно добавлен`,EMPLOYEE_ADDED:`Сотрудник успешно добавлен`,ASSIGNMENT_ADDED:`Назначение успешно создано`,DATA_SAVED:`Данные сохранены`,BACKUP_CREATED:`Бэкап создан`}},f={APP:`VitaliMay-app`,BACKUP:`VitaliMay-backup_`,EXPORT_FILE:`VitaliMay-data`},p={MONTHLY_DATA:`monthlyData`,USER_PREFERENCES:`userPreferences`,APP_SETTINGS:`appSettings`,LAST_BACKUP:`lastBackup`,SAVE_COUNT:`VitaliMay_saveCount`},m={AUTO_SAVE:!0,SAVE_DELAY_MS:500,COMPRESSION:!1,MAX_BACKUPS:5,BACKUP_PREFIX:`VitaliMay-backup_`,AUTO_BACKUP_INTERVAL:10},h=p.MONTHLY_DATA,g=new class{constructor(e=``,t=m.AUTO_SAVE){this.prefix=e,this.autoSave=t,this.saveTimeout=null,this.eventListeners=new Map}getKey(e){return this.prefix&&e!==h?`${this.prefix}_${e}`:e}set(e,t){try{localStorage.setItem(this.getKey(e),JSON.stringify(t,null,2)),this.emitStorageEvent(`save`,e)}catch(e){throw e.name===`QuotaExceededError`?(console.error(`Превышен лимит localStorage`),this.handleQuotaExceeded()):console.error(`Ошибка сохранения: ${e}`),e}}get(e){try{let t=localStorage.getItem(this.getKey(e));return t?JSON.parse(t):null}catch(e){return console.error(`Ошибка загрузки: ${e}`),null}}remove(e){localStorage.removeItem(this.getKey(e)),this.emitStorageEvent(`remove`,e)}has(e){return localStorage.getItem(this.getKey(e))!==null}clear(){this.prefix?Object.keys(localStorage).filter(e=>e.startsWith(this.prefix)&&!e.includes(h)).forEach(e=>localStorage.removeItem(e)):localStorage.clear(),this.emitStorageEvent(`clear`,`all`)}backup(e){let t=localStorage.getItem(this.getKey(e));if(!t)return null;let n=new Date().toISOString().replace(/[:.]/g,`-`),r=`${m.BACKUP_PREFIX}${n}_${e}`;return localStorage.setItem(r,t),this.cleanupBackups(e),r}cleanupBackups(e){let t=Object.keys(localStorage).filter(t=>t.startsWith(m.BACKUP_PREFIX)&&t.includes(e)).sort().reverse();t.length>m.MAX_BACKUPS&&t.slice(m.MAX_BACKUPS).forEach(e=>{localStorage.removeItem(e)})}restore(e,t=null){let n=t;if(!n){let t=Object.keys(localStorage).filter(t=>t.startsWith(m.BACKUP_PREFIX)&&t.includes(e)).sort().reverse();if(t.length===0)return!1;n=t[0]}let r=localStorage.getItem(n);return r?(localStorage.setItem(this.getKey(e),r),this.emitStorageEvent(`restore`,e),!0):!1}exportToJson(e){let t=this.get(e);return t?JSON.stringify(t,null,2):null}importFromJson(e,t){try{let n=JSON.parse(t);return this.set(e,n),!0}catch(e){return console.error(`Ошибка импорта JSON:`,e),!1}}getStats(){let e=0,t=[];for(let n=0;n<localStorage.length;n++){let r=localStorage.key(n);if(r&&(!this.prefix||r.startsWith(this.prefix)||r===h)){t.push(r);let n=localStorage.getItem(r);n&&(e+=n.length)}}return{totalSize:Math.round(e/1024),keysCount:t.length,keys:t}}autoSaveSet(e,t,n=m.SAVE_DELAY_MS){if(!this.autoSave){this.set(e,t);return}this.saveTimeout&&clearTimeout(this.saveTimeout),this.saveTimeout=setTimeout(()=>{this.set(e,t),this.saveTimeout=null},n)}on(e,t){return this.eventListeners.has(e)||this.eventListeners.set(e,new Set),this.eventListeners.get(e).add(t),()=>{this.eventListeners.get(e)?.delete(t)}}emitStorageEvent(e,t){this.eventListeners.get(e)?.forEach(e=>e(t))}handleQuotaExceeded(){let e=Object.keys(localStorage).filter(e=>e.startsWith(f.BACKUP)).sort();e.length>0&&(localStorage.removeItem(e[0]),console.warn(`Удален старый бэкап для освобождения места`))}}(f.APP),_={"2026-0":{projects:[{id:1704467200001,projectName:`E-Commerce Platform`,companyName:`TechCorp`,budget:12500,employeeCapacity:3},{id:1704467200002,projectName:`Mobile Banking App`,companyName:`TechCorp`,budget:16650,employeeCapacity:2},{id:1704467200003,projectName:`Healthcare Portal`,companyName:`MediCare Solutions`,budget:15e3,employeeCapacity:3},{id:1704467200004,projectName:`Analytics Dashboard`,companyName:`DataViz Inc`,budget:7900,employeeCapacity:1},{id:1704467200005,projectName:`CRM System`,companyName:`SalesPro`,budget:1e4,employeeCapacity:2}],employees:[{id:1704467300001,name:`John`,surname:`Smith`,dob:`1997-03-15`,position:`Junior`,salary:3750,assignments:[{projectId:1704467200001,capacity:1,fit:.95}]},{id:1704467300002,name:`Sarah`,surname:`Johnson`,dob:`1993-07-22`,position:`Middle`,salary:5400,assignments:[{projectId:1704467200001,capacity:1,fit:1}]},{id:1704467300003,name:`Michael`,surname:`Williams`,dob:`1990-11-08`,position:`Senior`,salary:7100,assignments:[{projectId:1704467200001,capacity:1,fit:1}]},{id:1704467300004,name:`Emily`,surname:`Brown`,dob:`1996-05-30`,position:`Middle`,salary:5150,assignments:[{projectId:1704467200002,capacity:1,fit:.9}]},{id:1704467300005,name:`David`,surname:`Jones`,dob:`1984-09-12`,position:`Lead`,salary:7900,assignments:[{projectId:1704467200002,capacity:1,fit:1}]},{id:1704467300006,name:`Jessica`,surname:`Garcia`,dob:`1998-01-25`,position:`Junior`,salary:4e3,assignments:[{projectId:1704467200003,capacity:.5,fit:.85}]},{id:1704467300007,name:`Robert`,surname:`Martinez`,dob:`1987-04-17`,position:`Senior`,salary:7350,assignments:[{projectId:1704467200003,capacity:1,fit:1}]},{id:1704467300008,name:`Lisa`,surname:`Anderson`,dob:`1994-12-03`,position:`Middle`,salary:5600,assignments:[{projectId:1704467200003,capacity:1,fit:.95}]},{id:1704467300009,name:`James`,surname:`Taylor`,dob:`1980-06-20`,position:`Architect`,salary:9150,assignments:[{projectId:1704467200004,capacity:1,fit:1}]},{id:1704467300010,name:`Maria`,surname:`Thomas`,dob:`1999-08-14`,position:`Junior`,salary:3850,assignments:[{projectId:1704467200005,capacity:.5,fit:.8}]},{id:1704467300011,name:`Daniel`,surname:`Moore`,dob:`1992-02-28`,position:`Middle`,salary:5850,assignments:[{projectId:1704467200005,capacity:1,fit:1}]},{id:1704467300012,name:`Jennifer`,surname:`Jackson`,dob:`1989-10-05`,position:`Senior`,salary:7500,assignments:[{projectId:1704467200003,capacity:.5,fit:1}]},{id:1704467300013,name:`Christopher`,surname:`White`,dob:`1995-03-19`,position:`Middle`,salary:5350,assignments:[]},{id:1704467300014,name:`Amanda`,surname:`Harris`,dob:`1997-11-27`,position:`Junior`,salary:3900,assignments:[]},{id:1704467300015,name:`Matthew`,surname:`Martin`,dob:`1983-07-09`,position:`Lead`,salary:8150,assignments:[]}]},"2026-1":{projects:[{id:1704467200001,projectName:`E-Commerce Platform`,companyName:`TechCorp`,budget:12500,employeeCapacity:3},{id:1704467200002,projectName:`Mobile Banking App`,companyName:`TechCorp`,budget:16650,employeeCapacity:2},{id:1704467200003,projectName:`Healthcare Portal`,companyName:`MediCare Solutions`,budget:15e3,employeeCapacity:3},{id:1704467200004,projectName:`Analytics Dashboard`,companyName:`DataViz Inc`,budget:7900,employeeCapacity:1},{id:1704467200005,projectName:`CRM System`,companyName:`SalesPro`,budget:1e4,employeeCapacity:2}],employees:[{id:1704467300001,name:`John`,surname:`Smith`,dob:`1997-03-15`,position:`Junior`,salary:3750,assignments:[{projectId:1704467200001,capacity:1,fit:.95}]},{id:1704467300002,name:`Sarah`,surname:`Johnson`,dob:`1993-07-22`,position:`Middle`,salary:5400,assignments:[{projectId:1704467200001,capacity:1,fit:1}]},{id:1704467300003,name:`Michael`,surname:`Williams`,dob:`1990-11-08`,position:`Senior`,salary:7100,assignments:[{projectId:1704467200001,capacity:1,fit:1}]},{id:1704467300004,name:`Emily`,surname:`Brown`,dob:`1996-05-30`,position:`Middle`,salary:5150,assignments:[{projectId:1704467200002,capacity:1,fit:.9}]},{id:1704467300005,name:`David`,surname:`Jones`,dob:`1984-09-12`,position:`Lead`,salary:7900,assignments:[{projectId:1704467200002,capacity:1,fit:1}]},{id:1704467300006,name:`Jessica`,surname:`Garcia`,dob:`1998-01-25`,position:`Junior`,salary:4e3,assignments:[{projectId:1704467200003,capacity:.5,fit:.85}]},{id:1704467300007,name:`Robert`,surname:`Martinez`,dob:`1987-04-17`,position:`Senior`,salary:7350,assignments:[{projectId:1704467200003,capacity:1,fit:1}]},{id:1704467300008,name:`Lisa`,surname:`Anderson`,dob:`1994-12-03`,position:`Middle`,salary:5600,assignments:[{projectId:1704467200003,capacity:1,fit:.95}]},{id:1704467300009,name:`James`,surname:`Taylor`,dob:`1980-06-20`,position:`Architect`,salary:9150,assignments:[{projectId:1704467200004,capacity:1,fit:1}]},{id:1704467300010,name:`Maria`,surname:`Thomas`,dob:`1999-08-14`,position:`Junior`,salary:3850,assignments:[{projectId:1704467200005,capacity:.5,fit:.8}]},{id:1704467300011,name:`Daniel`,surname:`Moore`,dob:`1992-02-28`,position:`Middle`,salary:5850,assignments:[{projectId:1704467200005,capacity:1,fit:1}]},{id:1704467300012,name:`Jennifer`,surname:`Jackson`,dob:`1989-10-05`,position:`Senior`,salary:7500,assignments:[{projectId:1704467200003,capacity:.5,fit:1}]},{id:1704467300013,name:`Christopher`,surname:`White`,dob:`1995-03-19`,position:`Middle`,salary:5350,assignments:[]},{id:1704467300014,name:`Amanda`,surname:`Harris`,dob:`1997-11-27`,position:`Junior`,salary:3900,assignments:[]},{id:1704467300015,name:`Matthew`,surname:`Martin`,dob:`1983-07-09`,position:`Lead`,salary:8150,assignments:[]}]}},v=()=>g.get(h)||{},y=e=>{g.set(h,e)},b=()=>g.has(h),x=()=>b()?(console.log(`💾 Данные найдены в localStorage`),!0):(console.log(`📂 Данных в localStorage нет, инициализируем из dataDemo.json`),_&&Object.keys(_).length>0?(y(_),console.log(`✅ Данные из dataDemo.json скопированы в localStorage`),!0):(console.log(`⚠️ dataDemo.json пуст, создаем пустое хранилище`),y({}),!1)),S=()=>_&&Object.keys(_).length>0?(y(_),console.log(`🔄 Данные сброшены к состоянию из dataDemo.json`),!0):!1,C=()=>g.backup(h),w=()=>g.restore(h),T=()=>g.getStats(),E=e=>g.on(`save`,e),{PROJECT:D,EMPLOYEE:O,MULTIPLIER:k}=u,A=e=>{let t=[],n=[];return Object.values(e).forEach(e=>{e.projects?.forEach(e=>t.push(e.id)),e.employees?.forEach(e=>n.push(e.id))}),{projectIds:t,employeeIds:n}},j=(e,t)=>{let n=e.filter(e=>Math.floor(e/k)===t).map(e=>e-t*k);return n.length>0?Math.max(...n):0},M=e=>{let{projectIds:t,employeeIds:n}=A(e),r=j(t,D),i=j(n,O);return{generateProjectId:()=>(r++,D*k+r),generateEmployeeId:()=>(i++,O*k+i),getCounters:()=>({nextProject:r,nextEmployee:i})}},N=(()=>{x();let e=v();console.log(`📦 Данные загружены`),E(t=>{t===h&&(console.log(`🔄 Данные обновлены в другой вкладке`),e=v(),n())});let t=M(e),n=()=>{t=M(e)},r=parseInt(localStorage.getItem(p.SAVE_COUNT)||`0`),i=()=>{y(e),r+=1,r%10==0&&(C(),console.log(`💾 Автоматический бэкап создан`)),localStorage.setItem(p.SAVE_COUNT,String(r))},a=(t,n)=>{let r=`${t}-${n}`;return e[r]||(e[r]={projects:[],employees:[]}),e[r]};return{getMonthData:a,getMonths:()=>Object.keys(e),copyProjectToMonth:(e,t,n,r,o)=>{let s=a(t,n).projects.find(t=>t.id===e);if(!s)return null;let c=a(r,o);return c.projects.find(t=>t.id===e)||(c.projects.push({...s}),i()),s},copyEmployeeToMonth:(e,t,n,r,o)=>{let s=a(t,n).employees.find(t=>t.id===e);if(!s)return null;let c=a(r,o);return c.employees.find(t=>t.id===e)||(c.employees.push({...s}),i()),s},addProject:(e,r,o)=>{let s=a(e,r);if(s.projects.find(e=>e.projectName===o.projectName))throw Error(`${d.ERRORS.PROJECT_EXISTS} в ${e}-${r}`);let c={id:t.generateProjectId(),...o};return s.projects.push(c),i(),n(),console.log(`✅ ${d.SUCCESS.PROJECT_ADDED}: ${c.projectName}`),c},addEmployee:(e,r,o)=>{let s=a(e,r);if(s.employees.find(e=>e.name===o.name&&e.surname===o.surname))throw Error(`${d.ERRORS.EMPLOYEE_EXISTS}: ${o.name} ${o.surname}`);let c={id:t.generateEmployeeId(),...o,assignments:o.assignments||[]};return s.employees.push(c),i(),n(),console.log(`✅ ${d.SUCCESS.EMPLOYEE_ADDED}: ${c.name} ${c.surname}`),c},assignEmployeeToProject:(e,t,n,r,o,s)=>{let c=a(e,t),l=c.employees.find(e=>e.id===n),u=c.projects.find(e=>e.id===r);if(!l)throw Error(d.ERRORS.EMPLOYEE_NOT_FOUND);if(!u)throw Error(d.ERRORS.PROJECT_NOT_FOUND);if(c.employees.filter(e=>e.assignments.some(e=>e.projectId===r)).reduce((e,t)=>e+(t.assignments.find(e=>e.projectId===r)?.capacity||0),0)+o>u.employeeCapacity)throw Error(`${d.ERRORS.CAPACITY_EXCEEDED} "${u.projectName}"`);let f=l.assignments.find(e=>e.projectId===r);f?(f.capacity=o,f.fit=s):l.assignments.push({projectId:r,capacity:o,fit:s}),i(),console.log(`✅ ${d.SUCCESS.ASSIGNMENT_ADDED}: ${l.name} -> ${u.projectName}`)},getAllProjects:()=>Object.values(e).flatMap(e=>e.projects),getAllEmployees:()=>Object.values(e).flatMap(e=>e.employees),getStats:()=>{let e=v(),t=Object.values(e).flatMap(e=>e.projects),n=Object.values(e).flatMap(e=>e.employees),r=new Set(t.map(e=>e.id)).size,i=new Set(n.map(e=>e.id)).size;return{totalMonths:Object.keys(e).length,totalProjectAssignments:t.length,totalEmployeeAssignments:n.length,uniqueProjects:r,uniqueEmployees:i}},hasData:()=>Object.keys(e).length>0,getStorageInfo:()=>({stats:T(),dataSize:JSON.stringify(e).length}),setData:t=>{e=t,i(),n()},resetToDemo:()=>S()?(e=v(),n(),console.log(`🔄 Данные сброшены к демо-версии`),!0):!1,clearAll:()=>(y({}),e={},n(),localStorage.setItem(p.SAVE_COUNT,`0`),console.log(`🗑️ Все данные очищены`),e),createBackup:()=>C(),restoreBackup:()=>{let t=w();return t&&(e=v(),n()),t},exportAllData:()=>{let e=v();return!e||Object.keys(e).length===0?null:JSON.stringify(e,null,2)},getCounters:()=>t.getCounters()}})(),P=()=>{let e=N.exportAllData();if(!e){console.warn(`Нет данных для экспорта`);return}let t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`${f.EXPORT_FILE}-${new Date().toISOString().split(`T`)[0]}.json`,r.click(),URL.revokeObjectURL(n)},F=()=>{if(document.getElementById(`test-panel`)){console.log(`Тестовая панель уже существует`);return}let e=document.createElement(`style`);e.textContent=`
    .test-panel {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      z-index: 10000;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      transition: all 0.3s;
    }
    
    .test-panel.minimized {
      width: auto;
      background: transparent;
      box-shadow: none;
    }
    
    .test-panel-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 15px;
      border-radius: 12px 12px 0 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .test-panel-header h3 {
      margin: 0;
      font-size: 14px;
    }
    
    .test-panel-toggle {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
    }
    
    .test-panel-content {
      padding: 15px;
      max-height: 500px;
      overflow-y: auto;
      display: block;
    }
    
    .test-panel.minimized .test-panel-content {
      display: none;
    }
    
    .test-panel-stats {
      background: #f7fafc;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      font-size: 12px;
    }
    
    .test-panel-stats p {
      margin: 5px 0;
    }
    
    .test-panel-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
    }
    
    .test-panel-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 11px;
      transition: all 0.2s;
    }
    
    .test-panel-btn:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
    
    .test-panel-btn.danger {
      background: #e53e3e;
    }
    
    .test-panel-btn.danger:hover {
      background: #c53030;
    }
    
    .test-panel-btn.success {
      background: #48bb78;
    }
    
    .test-panel-log {
      background: #1a202c;
      color: #68d391;
      padding: 8px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 10px;
      max-height: 150px;
      overflow-y: auto;
      margin-top: 10px;
    }
    
    .test-panel-log-entry {
      margin-bottom: 4px;
      border-bottom: 1px solid #2d3748;
      padding-bottom: 4px;
      word-break: break-all;
    }
  `,document.head.appendChild(e);let t=document.createElement(`div`);t.id=`test-panel`,t.className=`test-panel`,t.innerHTML=`
    <div class="test-panel-header">
      <h3>📊 Управление проектами (Dev Panel)</h3>
      <button class="test-panel-toggle">−</button>
    </div>
    <div class="test-panel-content">
      <div class="test-panel-stats" id="test-panel-stats">
        <p>📅 Месяцев: <span id="stat-months">-</span></p>
        <p>📁 Проектов: <span id="stat-projects">-</span></p>
        <p>👥 Сотрудников: <span id="stat-employees">-</span></p>
        <p>🔢 Следующий ID проекта: <span id="stat-next-project">-</span></p>
        <p>🔢 Следующий ID сотрудника: <span id="stat-next-employee">-</span></p>
      </div>
      <div class="test-panel-buttons">
        <button class="test-panel-btn" data-action="refresh">🔄 Обновить</button>
        <button class="test-panel-btn" data-action="add-project">➕ Проект</button>
        <button class="test-panel-btn" data-action="add-employee">👤 Сотрудник</button>
        <button class="test-panel-btn" data-action="show-data">📋 Данные</button>
        <button class="test-panel-btn" data-action="export">💾 Экспорт</button>
        <button class="test-panel-btn success" data-action="backup">💿 Бэкап</button>
        <button class="test-panel-btn danger" data-action="reset">🔄 Сброс</button>
        <button class="test-panel-btn danger" data-action="clear">🗑️ Очистить</button>
      </div>
      <div class="test-panel-log" id="test-panel-log">
        <div class="test-panel-log-entry">✨ Панель готова к работе</div>
      </div>
    </div>
  `,document.body.appendChild(t);let n=!1,r=t.querySelector(`.test-panel-header`),i=t.querySelector(`.test-panel-toggle`),a=t.querySelector(`#test-panel-log`),o=(e,t=`info`)=>{let n=new Date().toLocaleTimeString(),r={info:`#68d391`,error:`#fc8181`,success:`#68d391`,warning:`#f6ad55`},i=document.createElement(`div`);for(i.className=`test-panel-log-entry`,i.style.color=r[t]||r.info,i.innerHTML=`[${n}] ${e}`,a.appendChild(i),a.scrollTop=a.scrollHeight;a.children.length>30;)a.removeChild(a.firstChild)},s=()=>{try{let e=N.getStats(),t=N.getCounters();document.getElementById(`stat-months`).textContent=e.totalMonths,document.getElementById(`stat-projects`).textContent=e.uniqueProjects,document.getElementById(`stat-employees`).textContent=e.uniqueEmployees,document.getElementById(`stat-next-project`).textContent=t.nextProject,document.getElementById(`stat-next-employee`).textContent=t.nextEmployee,o(`📊 Статистика: ${e.totalMonths} месяцев, ${e.uniqueProjects} проектов`,`success`)}catch(e){o(`❌ Ошибка: ${e.message}`,`error`)}},c=()=>{try{let e=N.getMonths();if(e.length===0){o(`📭 Нет данных`,`warning`);return}let t=`📋 Данные: `;for(let n of e){let e=N.getMonthData(...n.split(`-`).map(Number));t+=`${n} (${e.projects.length}п/${e.employees.length}с) `}o(t,`info`)}catch(e){o(`❌ Ошибка: ${e.message}`,`error`)}},l=()=>{try{let e=new Date().getFullYear(),t=new Date().getMonth(),n=N.addProject(e,t,{projectName:`Тест-проект ${Date.now().toString().slice(-6)}`,companyName:`Тестовая компания`,budget:Math.floor(Math.random()*9e4)+1e4,employeeCapacity:Math.floor(Math.random()*5)+1});o(`✅ Добавлен проект: ${n.projectName} (ID: ${n.id})`,`success`),s()}catch(e){o(`❌ Ошибка: ${e.message}`,`error`)}},u=()=>{try{let e=new Date().getFullYear(),t=new Date().getMonth(),n=[`Junior`,`Middle`,`Senior`,`Lead`,`Architect`,`BO`],r=n[Math.floor(Math.random()*n.length)],i=N.addEmployee(e,t,{name:`Тест`,surname:`Сотрудник ${Date.now().toString().slice(-6)}`,dob:`199${Math.floor(Math.random()*9)}-0${Math.floor(Math.random()*9)+1}-${Math.floor(Math.random()*28)+1}`,position:r,salary:Math.floor(Math.random()*15e3)+3e3,assignments:[]});o(`✅ Добавлен сотрудник: ${i.name} ${i.surname} (${r})`,`success`),s()}catch(e){o(`❌ Ошибка: ${e.message}`,`error`)}},d=()=>{try{P(),o(`💾 Данные экспортированы`,`success`)}catch(e){o(`❌ Ошибка экспорта: ${e.message}`,`error`)}},f=()=>{if(confirm(`Внимание! Все текущие данные будут потеряны. Продолжить?`))try{N.resetToDemo(),o(`🔄 Данные сброшены к демо-версии`,`warning`),setTimeout(()=>{s(),c()},100)}catch(e){o(`❌ Ошибка сброса: ${e.message}`,`error`)}},p=()=>{if(confirm(`Внимание! Все данные будут удалены. Продолжить?`))try{N.clearAll(),o(`🗑️ Все данные очищены`,`warning`),setTimeout(()=>{s(),c()},100)}catch(e){o(`❌ Ошибка очистки: ${e.message}`,`error`)}},m=()=>{try{o(`💿 Создан бэкап: ${N.createBackup()}`,`success`)}catch(e){o(`❌ Ошибка: ${e.message}`,`error`)}};t.querySelectorAll(`[data-action]`).forEach(e=>{e.addEventListener(`click`,()=>{switch(e.dataset.action){case`refresh`:s();break;case`add-project`:l();break;case`add-employee`:u();break;case`show-data`:c();break;case`export`:d();break;case`backup`:m();break;case`reset`:f();break;case`clear`:p();break}})});let h=()=>{n=!n,n?(t.classList.add(`minimized`),i.textContent=`+`):(t.classList.remove(`minimized`),i.textContent=`−`)};return r.addEventListener(`click`,h),i.addEventListener(`click`,e=>{e.stopPropagation(),h()}),setTimeout(()=>{s(),o(`🚀 Панель инициализирована`,`success`)},500),t};a(),console.log(`🚀 Запуск приложения`),console.log(`📊 Статистика:`,N.getStats()),console.log(`📅 Доступные месяцы:`,N.getMonths()),window.store=N,window.exportData=()=>{let e=N.exportAllData();if(!e){console.warn(`⚠️ Нет данных для экспорта`);return}let t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`${f.EXPORT_FILE}-${new Date().toISOString().split(`T`)[0]}.json`,r.click(),URL.revokeObjectURL(n)},(window.location.hostname===`localhost`||window.location.hostname===`127.0.0.1`)&&setTimeout(()=>{F(),console.log(`🛠️ Режим разработки: window.store, window.exportData()`)},1e3);