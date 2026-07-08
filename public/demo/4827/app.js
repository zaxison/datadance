const state = {
  view: "card",
  detailIndex: 0,
  detailProjectsExpanded: false,
  keyword: "",
  filters: { level: "", security: "", feature: "", employment: "" },
  sidebarExpanded: false,
  expandedMenu: "数据生产",
  activeMenu: "交互演示",
  sidebarHoverMenu: "",
  sidebarHoverTop: 0,
  userMenuOpen: false,
  userSubmenu: ""
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m]);

function sideGroups() {
  return [
    { id: "首页", icon: "menu-home.svg" },
    { id: "项目管理", icon: "menu-project-management.svg" },
    { id: "数据生产", icon: "menu-data-generation.svg", children: [
      { id: "数据生产-任务列表", label: "任务列表" },
      { id: "数据生产-我的任务", label: "我的任务" },
      { id: "数据生产-组别管理", label: "组别管理" }
    ] },
    { id: "模型评估", icon: "menu-model-evaluation.svg", children: [
      { id: "模型评估-题库管理", label: "题库管理" },
      { id: "模型评估-抓取任务", label: "抓取任务" },
      { id: "模型评估-任务列表", label: "任务列表" },
      { id: "模型评估-我的任务", label: "我的任务" },
      { id: "模型评估-评估报告", label: "评估报告" },
      { id: "模型评估-人员标签", label: "人员标签" },
      { id: "模型评估-数据可视化", label: "数据可视化" }
    ] },
    { id: "质量管理", icon: "menu-quality-management.svg", children: [{ id: "质量管理-申诉中心", label: "申诉中心" }] },
    { id: "模板管理", icon: "menu-template.svg" },
    { id: "资产管理", icon: "menu-asset-management.svg" },
    { id: "算子管理", icon: "menu-operator-management.svg" },
    { id: "用户管理", icon: "menu-user-management.svg", children: [
      { id: "用户管理-标签管理", label: "标签管理" },
      { id: "用户管理-团队管理", label: "团队管理" }
    ] },
    { id: "租户管理", icon: "menu-tenant-management.svg" },
    { id: "交互演示", icon: "menu-interaction-demo.svg" }
  ];
}

function isMenuActive(item) {
  if (state.activeMenu === item.id) return true;
  return item.children?.some((child) => child.id === state.activeMenu);
}

function sidebarWidth() {
  return state.sidebarExpanded ? 200 : 72;
}

function syncSidebarShell() {
  const width = sidebarWidth();
  $("#dataDanceSidebar").classList.toggle("is-expanded", state.sidebarExpanded);
  $("#dataDanceSidebar").classList.toggle("is-collapsed", !state.sidebarExpanded);
  document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
}

function filteredSchools() {
  const keyword = state.keyword.trim().toLowerCase();
  return window.AIDP_SCHOOLS.filter((school) => {
    if (keyword) {
      const text = [school.name, school.code, school.city, school.level, school.security, school.featureFull, school.projectTags.join(","), school.majors.join(",")].join(" ").toLowerCase();
      if (!text.includes(keyword)) return false;
    }
    if (state.filters.level && state.filters.level !== "全部" && !school.level.includes(state.filters.level)) return false;
    if (state.filters.security && state.filters.security !== "全部" && state.filters.security !== school.security) return false;
    if (state.filters.feature && state.filters.feature !== "全部" && state.filters.feature !== school.feature) return false;
    if (state.filters.employment && state.filters.employment !== "全部" && !school.employment.includes(state.filters.employment)) return false;
    return true;
  });
}

function renderSideMenu() {
  syncSidebarShell();
  $("#sideMenu").innerHTML = sideGroups().map((item) => `
    <section class="menu-group ${isMenuActive(item) ? "active" : ""}" data-menu="${esc(item.id)}">
      <button class="menu-parent ${isMenuActive(item) ? "active" : ""}" type="button" data-menu-action="${item.children ? "toggle" : "select"}" data-menu-id="${esc(item.id)}">
        <span class="menu-icon" style="--icon-url: url('./assets/${esc(item.icon)}')"></span>
        <span>${esc(item.id)}</span>
        ${item.children ? `<em class="${state.expandedMenu === item.id ? "" : "is-closed"}"></em>` : ""}
      </button>
      ${item.children ? `<div class="menu-children ${state.sidebarExpanded && state.expandedMenu === item.id ? "open" : ""}">
        ${item.children.map((child) => `<button class="${state.activeMenu === child.id ? "active" : ""}" type="button" data-menu-action="child" data-menu-id="${esc(child.id)}">${esc(child.label)}</button>`).join("")}
      </div>` : ""}
    </section>
  `).join("");
  renderSidebarPortal();
}

function menuFlyout(item) {
  if (!state.sidebarHoverMenu || state.sidebarExpanded) return "";
  const hovered = sideGroups().find((entry) => entry.id === state.sidebarHoverMenu);
  if (!hovered || hovered.id !== item.id) return "";
  const active = isMenuActive(hovered);
  if (!hovered.children) {
    return `
      <div class="sidebar-tooltip" style="top:${state.sidebarHoverTop}px" data-sidebar-flyout>
        ${esc(hovered.id)}
        <i></i>
      </div>
    `;
  }
  return `
    <div class="sidebar-flyout" style="top:${state.sidebarHoverTop}px" data-sidebar-flyout>
      ${hovered.children.map((child) => `<button class="${state.activeMenu === child.id ? "active" : ""}" type="button" data-menu-action="child" data-menu-id="${esc(child.id)}">${esc(child.label)}</button>`).join("")}
    </div>
  `;
}

function userMenuItems() {
  return [
    [{ label: "个人信息", icon: "user-setting-profile.svg" }, { label: "权限申请", icon: "user-setting-permission.svg" }],
    [
      { label: "切换租户", icon: "user-setting-switch-tenant.svg", submenu: ["Medical", "DMC", "Xpert", "AIDP coding", "S", "通用", "体验用户"] },
      { label: "切换语言", icon: "user-setting-language.svg", submenu: ["中文", "English"] },
      { label: "更换时区", icon: "user-setting-timezone.svg", submenu: Array.from({ length: 25 }, (_, index) => `UTC${index - 12 >= 0 ? "+" : "-"}${String(Math.abs(index - 12)).padStart(2, "0")}:00`) }
    ],
    [{ label: "清除缓存", icon: "user-setting-clear-cache.svg" }, { label: "退出登录", icon: "user-setting-logout.svg", danger: true }]
  ];
}

function renderSidebarPortal() {
  $("#sidebarPortal")?.remove();
  const portal = document.createElement("div");
  portal.id = "sidebarPortal";
  portal.className = `sidebar-portal ${state.sidebarExpanded ? "expanded" : "collapsed"}`;
  const hoveredItem = sideGroups().find((item) => item.id === state.sidebarHoverMenu);
  const flyout = hoveredItem ? menuFlyout(hoveredItem) : "";
  const user = state.userMenuOpen ? `
    <div class="user-menu" data-user-menu>
      ${userMenuItems().map((group) => `
        <div class="user-menu-group">
          ${group.map((item) => `
            <button class="user-menu-item ${item.danger ? "danger" : ""} ${state.userSubmenu === item.label ? "hovered" : ""}" type="button" data-user-submenu="${item.submenu ? esc(item.label) : ""}">
              <span class="user-icon" style="--icon-url: url('./assets/${esc(item.icon)}')"></span>
              <b>${esc(item.label)}</b>
              ${item.submenu ? "<em></em>" : ""}
            </button>
          `).join("")}
        </div>
      `).join("<hr>")}
    </div>
    ${userSubmenuPortal()}
  ` : "";
  portal.innerHTML = flyout + user;
  document.body.appendChild(portal);
}

function userSubmenuPortal() {
  if (!state.userSubmenu) return "";
  const item = userMenuItems().flat().find((entry) => entry.label === state.userSubmenu);
  if (!item?.submenu) return "";
  const activeValue = item.label === "切换语言" ? "中文" : item.label === "切换租户" ? "Medical" : "UTC+08:00";
  return `
    <div class="user-submenu ${item.label === "更换时区" ? "timezone" : ""}" data-user-submenu-panel>
      ${item.submenu.map((value) => `<button class="${value === activeValue ? "active" : ""}" type="button">${esc(value)}</button>`).join("")}
    </div>
  `;
}

function updateSidebar(menuId, action) {
  const menu = sideGroups().find((item) => item.id === menuId);
  if (!menu) return;
  if (!state.sidebarExpanded && action === "toggle") {
    state.sidebarExpanded = true;
    state.expandedMenu = menuId;
  } else if (action === "toggle") {
    state.expandedMenu = state.expandedMenu === menuId ? "" : menuId;
  } else {
    state.activeMenu = menuId;
  }
  renderSideMenu();
}

function renderFilters() {
  $("#filterList").innerHTML = window.AIDP_FILTERS.map((group) => `
    <section class="filter-group">
      <h2>${esc(group.title)}</h2>
      <div class="filter-options" data-key="${esc(group.key)}">
        ${group.options.map((option) => {
          const selected = state.filters[group.key] === option || (!state.filters[group.key] && option === "全部");
          return `<button class="filter-chip ${selected ? "selected" : ""}" type="button" data-value="${esc(option)}">${esc(option)}</button>`;
        }).join("")}
      </div>
    </section>
  `).join("");
}

function renderMetrics() {
  const all = window.AIDP_SCHOOLS;
  const seats = all.reduce((sum, item) => sum + item.seats, 0);
  const speed = all.reduce((sum, item) => sum + item.recruitSpeed, 0);
  $("#metrics").innerHTML = `
    <div><span>合作院校</span><p><b>${all.length}</b><em>家</em></p></div>
    <i></i>
    <div><span>总可用工位</span><p><b>${seats.toLocaleString()}</b><em>个</em></p></div>
    <i></i>
    <div><span>总招募能力</span><p><b>${speed.toLocaleString()}</b><em>/周</em></p></div>
  `;
}

function logo(school) {
  return `<img class="school-logo" src="./assets/${esc(school.logo)}" alt="">`;
}

function icon(name, className = "") {
  const iconFiles = {
    "地点": "location.svg",
    "安全": "security.svg"
  };
  return `<img class="meta-icon ${className}" src="./assets/card-assets/${esc(iconFiles[name] || name)}" alt="">`;
}

function badgeType(text) {
  if (["985", "211", "QS100", "QS200", "双一流"].includes(text)) return "purple";
  if (["本科", "专科"].includes(text)) return "blue";
  return "gray";
}

function assetBadge(text, className = "") {
  const badgeFiles = {
    "985": "badge-985.svg",
    "211": "badge-211.svg",
    "QS100": "badge-qs100.svg",
    "QS200": "badge-qs200.svg",
    "本科": "badge-undergrad.svg",
    "专科": "badge-junior.svg",
    "双一流": "badge-double-first.svg",
    "合作中": "status-active.svg",
    "到期未续签": "status-expired.svg",
    "合规冻结中": "status-frozen.svg",
    "全职": "employment-fulltime.svg",
    "兼职": "employment-parttime.svg"
  };
  return `<img class="asset-badge ${className}" src="./assets/card-assets/${esc(badgeFiles[text] || text)}" alt="${esc(text)}">`;
}

function levelBadge(school) {
  return assetBadge(school.level, "level");
}

function statusBadge(school) {
  return assetBadge(school.status, "status");
}

function tag(text, extra = "") {
  return `<span class="tag ${extra}">${esc(text)}</span>`;
}

function moreProjectTag(count, hiddenTags) {
  return `
    <span class="tag more project-more">
      +${count}
      <span class="project-more-popover">
        ${hiddenTags.map((item) => `<span>${esc(item)}</span>`).join("")}
      </span>
    </span>
  `;
}

function employmentTag(text) {
  return assetBadge(text, "employment");
}

function contactAvatar(name) {
  const avatars = {
    "周鸿翔": "周鸿翔.png",
    "王孟玉": "王孟玉.png"
  };
  return avatars[name]
    ? `<img src="./assets/card-assets/${esc(avatars[name])}" alt="">`
    : `<b>${esc(name.slice(0, 1))}</b>`;
}

function renderCard(school) {
  const projectLimit = 3;
  const visibleProjects = school.projectTags.slice(0, projectLimit);
  const hiddenProjects = school.projectTags.slice(projectLimit);
  const hiddenProjectCount = hiddenProjects.length;

  return `
    <article class="school-card" data-open="${school.id}" tabindex="0">
      <div class="card-main">
        <header class="card-head">
          ${logo(school)}
          <div class="school-name-wrap">
            <h3>${esc(school.name)}${levelBadge(school)}</h3>
            <p class="school-meta">
              <span>${icon("地点")}${esc(school.city)}</span>
              <span>${icon("安全")}${esc(school.security)}</span>
            </p>
          </div>
        </header>

        <section class="capacity">
          <div><span>招募能力</span><p><b>${school.recruitSpeed}</b><em>人/周</em></p></div>
          <div><span>可用工位</span><p><b>${school.seats}</b><em>个</em></p></div>
        </section>

        <section class="card-block">
          <h4>可招层级</h4>
          <div class="tag-row">${school.talent.map((item) => tag(item.label.replace("生", ""))).join("")}</div>
        </section>

        <section class="card-block project">
          <h4>项目标签</h4>
          <div class="tag-row">
            ${visibleProjects.map((item) => tag(item)).join("")}
            ${hiddenProjectCount ? moreProjectTag(hiddenProjectCount, hiddenProjects) : ""}
          </div>
        </section>

        <section class="card-block chips">
          ${statusBadge(school)}
          ${school.employment.map(employmentTag).join("")}
          ${school.featureFull ? tag(school.featureFull, "feature") : ""}
        </section>
      </div>

      <footer class="card-foot">
        <div class="contacts"><span>对接人</span>${school.contacts.map((name) => `<strong class="contact-pill"><i>${contactAvatar(name)}</i><em>${esc(name)}</em></strong>`).join("")}</div>
      </footer>
    </article>
  `;
}

function renderTable(items) {
  $("#tablePanel").innerHTML = `
    <table>
      <thead><tr><th>院校名称</th><th>用工属性</th><th>院校特色</th><th>安全等级</th><th>状态</th><th>招募能力</th><th>可用工位</th><th>对接人</th><th>操作</th></tr></thead>
      <tbody>
        ${items.map((school) => `
          <tr data-open="${school.id}">
            <td><div class="table-school">${logo(school)}<div><p>${esc(school.name)}${levelBadge(school)}</p><span>${esc(school.featureFull || school.city)}</span><small>${esc(school.city)}</small></div></div></td>
            <td>${school.employment.map(employmentTag).join("")}</td>
            <td>${esc(school.feature)}</td>
            <td>${esc(school.security)}</td>
            <td>${statusBadge(school)}</td>
            <td><b>${school.recruitSpeed}</b><span>/周</span></td>
            <td><b>${school.seats}</b><span>个</span></td>
            <td>${school.contacts.map((name) => `<div class="table-person"><i>${contactAvatar(name)}</i>${esc(name)}</div>`).join("")}</td>
            <td><button class="table-action" type="button">查看</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <div class="pagination"><span>共 ${items.length} 条</span><button>‹</button><button class="current">1</button><button>›</button></div>
  `;
}

function renderResults() {
  const items = filteredSchools();
  const isCard = state.view === "card";
  const isList = state.view === "list";
  $("#resultCount").textContent = items.length;
  $("#emptyState").hidden = items.length !== 0;
  $("#cardGrid").hidden = !isCard || items.length === 0;
  $("#tablePanel").hidden = !isList || items.length === 0;
  $("#cardGrid").classList.toggle("is-hidden", !isCard || items.length === 0);
  $("#tablePanel").classList.toggle("is-hidden", !isList || items.length === 0);
  $("#cardGrid").innerHTML = items.map(renderCard).join("");
  renderTable(items);
  $$(".view-switch button").forEach((button) => {
    const active = button.dataset.view === state.view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function renderDetail() {
  const items = filteredSchools();
  const school = items[state.detailIndex] || items[0] || window.AIDP_SCHOOLS[0];
  const shownProjects = state.detailProjectsExpanded ? school.projectTags : school.projectTags.slice(0, 4);
  $("#prevSchool").disabled = state.detailIndex === 0;
  $("#nextSchool").disabled = state.detailIndex >= items.length - 1;
  $("#detailPanel").innerHTML = `
    <header class="detail-hero">
      ${logo(school)}
      <div class="detail-hero-main">
        <div class="detail-title-row">
          <h2>${esc(school.name)}</h2>
          ${statusBadge(school)}
          ${levelBadge(school)}
          ${school.featureFull ? tag(school.featureFull, "feature") : ""}
        </div>
        <p class="detail-meta-row">
          <span>${icon("地点")}${esc(school.city)}</span>
          <span>编码 ${esc(school.code)}</span>
          <span>全局</span>
          <span>${icon("安全")}${esc(school.security)}</span>
        </p>
      </div>
    </header>
    <section class="detail-section">
      <h3>招募能力</h3>
      <div class="ability">${school.talent.map((item) => `<div><span>${esc(item.label)}</span><p><b>${item.value}</b><em>/周</em></p></div>`).join("")}<div><span>可用工位</span><p><b>${school.seats}</b><em>个</em></p></div></div>
    </section>
    <section class="detail-section">
      <h3>内部对接人</h3>
      <div class="people">${school.contacts.map((name) => `<span><i>${contactAvatar(name)}</i>${esc(name)}</span>`).join("")}</div>
    </section>
    <section class="detail-section">
      <h3>可招专业</h3>
      <div class="detail-tags">${school.majors.map((item) => tag(item)).join("")}</div>
    </section>
    <section class="detail-section">
      <h3>项目经验标签</h3>
      <div class="project-grid">${shownProjects.map((item) => `<span>${esc(item)}</span>`).join("")}</div>
      <button class="more-projects ${state.detailProjectsExpanded ? "expanded" : ""}" type="button" data-toggle-projects>
        <span class="down-icon">⌄</span>${state.detailProjectsExpanded ? "收起项目" : `查看全部 ${school.projectTags.length} 个项目`}
      </button>
    </section>
    <section class="detail-section">
      <h3>历史参与项目</h3>
      <div class="history">
        <div><strong>方舟tob（6）</strong><p>${school.projectTags.map((item) => tag(item)).join("")}</p></div>
        <div><strong>Coding 与 GUI_GUI（1）</strong><p>${tag("Coding 与 GUI_GUI")}</p></div>
      </div>
    </section>
  `;
}

function openDetail(id) {
  const items = filteredSchools();
  state.detailIndex = Math.max(0, items.findIndex((item) => item.id === Number(id)));
  state.detailProjectsExpanded = false;
  $("#detailPage").hidden = false;
  document.body.classList.add("drawer-open");
  renderDetail();
}

function bindEvents() {
  let sidebarTimer = 0;
  $("#sidebarLogo").addEventListener("click", () => {
    if (!state.sidebarExpanded) {
      state.sidebarExpanded = true;
      renderSideMenu();
    }
  });
  $("#sidebarCollapse").addEventListener("click", () => {
    state.sidebarExpanded = false;
    state.sidebarHoverMenu = "";
    state.userMenuOpen = false;
    state.userSubmenu = "";
    renderSideMenu();
  });
  $("#sideMenu").addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-menu-action]");
    if (!trigger) return;
    const action = trigger.dataset.menuAction;
    const menuId = trigger.dataset.menuId;
    if (action === "child") {
      state.activeMenu = menuId;
      state.sidebarHoverMenu = "";
      renderSideMenu();
      return;
    }
    updateSidebar(menuId, action);
  });
  $("#sideMenu").addEventListener("mouseover", (event) => {
    const group = event.target.closest(".menu-group");
    if (!group || state.sidebarExpanded) return;
    if (sidebarTimer) clearTimeout(sidebarTimer);
    const rect = group.getBoundingClientRect();
    state.sidebarHoverMenu = group.dataset.menu;
    state.sidebarHoverTop = rect.top + rect.height / 2;
    renderSidebarPortal();
  });
  $("#sideMenu").addEventListener("mouseleave", () => {
    if (sidebarTimer) clearTimeout(sidebarTimer);
    sidebarTimer = setTimeout(() => {
      state.sidebarHoverMenu = "";
      renderSidebarPortal();
    }, 100);
  });
  document.addEventListener("mouseover", (event) => {
    if (event.target.closest("[data-sidebar-flyout]")) {
      if (sidebarTimer) clearTimeout(sidebarTimer);
    }
    const submenuTrigger = event.target.closest("[data-user-submenu]");
    if (submenuTrigger?.dataset.userSubmenu) {
      state.userSubmenu = submenuTrigger.dataset.userSubmenu;
      renderSidebarPortal();
    }
  });
  document.addEventListener("click", (event) => {
    const child = event.target.closest("[data-sidebar-flyout] [data-menu-action='child']");
    if (child) {
      state.activeMenu = child.dataset.menuId;
      state.sidebarHoverMenu = "";
      renderSideMenu();
    }
  });
  let userTimer = 0;
  const openUserMenu = () => {
    if (userTimer) clearTimeout(userTimer);
    state.userMenuOpen = true;
    renderSidebarPortal();
  };
  const closeUserMenuSoon = () => {
    if (userTimer) clearTimeout(userTimer);
    userTimer = setTimeout(() => {
      state.userMenuOpen = false;
      state.userSubmenu = "";
      renderSidebarPortal();
    }, 150);
  };
  $("#sidebarUser").addEventListener("mouseenter", openUserMenu);
  $("#sidebarUser").addEventListener("mouseover", openUserMenu);
  $("#sidebarUser").addEventListener("pointerenter", openUserMenu);
  $("#sidebarUser").addEventListener("mouseleave", closeUserMenuSoon);
  $("#sidebarUser").addEventListener("pointerleave", closeUserMenuSoon);
  document.addEventListener("mouseenter", (event) => {
    if (event.target.closest("[data-user-menu], [data-user-submenu-panel]")) {
      if (userTimer) clearTimeout(userTimer);
    }
  }, true);
  document.addEventListener("mouseleave", (event) => {
    if (event.target.closest("[data-user-menu], [data-user-submenu-panel]")) {
      if (userTimer) clearTimeout(userTimer);
      userTimer = setTimeout(() => {
        state.userMenuOpen = false;
        state.userSubmenu = "";
        renderSidebarPortal();
      }, 150);
    }
  }, true);
  $("#searchInput").addEventListener("input", (event) => {
    state.keyword = event.target.value;
    renderResults();
  });
  $("#filterList").addEventListener("click", (event) => {
    const chip = event.target.closest(".filter-chip");
    if (!chip) return;
    const key = chip.closest("[data-key]").dataset.key;
    const value = chip.dataset.value;
    state.filters[key] = state.filters[key] === value ? "" : value;
    renderFilters();
    renderResults();
  });
  $$(".view-switch button").forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.view = button.dataset.view;
    renderResults();
  }));
  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-open]");
    if (target) openDetail(target.dataset.open);
  });
  $("#closeDetail").addEventListener("click", () => {
    $("#detailPage").hidden = true;
    document.body.classList.remove("drawer-open");
  });
  $("#detailPage").addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-toggle-projects]");
    if (toggle) {
      event.stopPropagation();
      state.detailProjectsExpanded = !state.detailProjectsExpanded;
      renderDetail();
      return;
    }
    if (event.target !== $("#detailPage")) return;
    $("#detailPage").hidden = true;
    document.body.classList.remove("drawer-open");
  });
  $("#prevSchool").addEventListener("click", () => {
    state.detailIndex = Math.max(0, state.detailIndex - 1);
    state.detailProjectsExpanded = false;
    renderDetail();
  });
  $("#nextSchool").addEventListener("click", () => {
    state.detailIndex = Math.min(filteredSchools().length - 1, state.detailIndex + 1);
    state.detailProjectsExpanded = false;
    renderDetail();
  });
}

renderSideMenu();
renderFilters();
renderMetrics();
renderResults();
bindEvents();
