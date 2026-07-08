const state = {
  view: "card",
  detailIndex: 0,
  detailProjectsExpanded: false,
  keyword: "",
  filters: { level: "", security: "", feature: "", employment: "" }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m]);

function sideGroups() {
  return [
    ["首页"], ["需求管理"], ["项目管理", "项目列表", "自建评估", "资源推荐"],
    ["商务管理", "资源分发", "投标管理", "项目订单", "资源缺口"],
    ["财务管理", "报价结算", "对账管理", "计提管理"],
    ["资源管理", "资源首页", "供应商管理", "团队管理", "S项目团队"],
    ["任务管理", "任务列表", "我的任务", "任务统计", "题目查询", "模拟投放"],
    ["合规安全", "IP地址策略配置", "风险明细", "审批管理"]
  ];
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
  $("#sideMenu").innerHTML = sideGroups().map(([title, ...items]) => `
    <section class="menu-group">
      <button class="menu-parent" type="button"><i></i>${esc(title)}</button>
      ${items.length ? `<div class="menu-children">${items.map((item) => `<button type="button" class="${item === "任务列表" ? "active" : ""}">${esc(item)}</button>`).join("")}</div>` : ""}
    </section>
  `).join("");
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
