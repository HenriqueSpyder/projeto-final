const COLORS=["#6366f1","#ec4899","#14b8a6","#f59e0b","#8b5cf6","#ef4444","#06b6d4","#84cc16","#f97316","#a855f7"];
const TEAMS=[{id:1,name:"Arte final"},{id:2,name:"Impressão"},{id:3,name:"Acabamento"},{id:4,name:"Plotagem de adesivo"},{id:5,name:"Montagem e serralheria"},{id:6,name:"Pintura"},{id:7,name:"Cortes Routers CNC"}];
const RULES=[
{id:1,name:"Presença e pontualidade",pts:10,freq:"Diária",active:true},
{id:2,name:"Entrega no prazo",pts:20,freq:"Por entrega",active:true},
{id:3,name:"Zero retrabalho",pts:20,freq:"Por entrega",active:true},
{id:4,name:"Organização da bancada",pts:15,freq:"Diária",active:true},
{id:5,name:"Uso correto de EPI",pts:15,freq:"Diária",active:true},
{id:6,name:"Ajudar colega",pts:15,freq:"Por ocorrência",active:true},
{id:7,name:"Sugestão de melhoria",pts:15,freq:"Por ocorrência",active:true},
{id:8,name:"Meta semanal cumprida",pts:25,freq:"Semanal",active:true},
{id:9,name:"Elogio de cliente",pts:20,freq:"Por ocorrência",active:true},
{id:10,name:"Treinamento técnico",pts:15,freq:"Por ocorrência",active:true},
{id:11,name:"Falta não justificada",pts:-15,freq:"Por ocorrência",active:true},
{id:12,name:"Ocorrência por descuido",pts:-25,freq:"Por ocorrência",active:true},
{id:13,name:"Procrastinação",pts:-15,freq:"Por ocorrência",active:true}];
const COLLABS=[
{id:1,name:"Estefany",teamId:1,pts:145,prevPts:120,goal:150,active:true,medals:["🏅 Pontual","⭐ Criativo","🎯 Focado"],history:[{rule:"Entrega no prazo",pts:20,date:"07/08"},{rule:"Zero retrabalho",pts:15,date:"06/08"}]},
{id:2,name:"Amanda",teamId:1,pts:130,prevPts:110,goal:150,active:true,medals:["⭐ Criativo","🎨 Artista"],history:[{rule:"Entrega no prazo",pts:20,date:"07/08"}]},
{id:3,name:"Josiel",teamId:2,pts:130,prevPts:135,goal:150,active:true,medals:["🔧 Técnico","🏅 Pontual"],history:[{rule:"Uso correto de EPI",pts:15,date:"07/08"}]},
{id:4,name:"Denis",teamId:2,pts:120,prevPts:100,goal:150,active:true,medals:["🎨 Artista"],history:[{rule:"Entrega no prazo",pts:20,date:"07/08"}]},
{id:5,name:"Felipe",teamId:2,pts:110,prevPts:115,goal:150,active:true,medals:["🔧 Técnico"],history:[{rule:"Organização da bancada",pts:10,date:"06/08"}]},
{id:6,name:"Rafael",teamId:3,pts:105,prevPts:90,goal:150,active:true,medals:["⭐ Criativo"],history:[{rule:"Ajudar colega",pts:15,date:"07/08"}]},
{id:7,name:"Levi",teamId:3,pts:95,prevPts:95,goal:150,active:true,medals:[],history:[{rule:"Presença e pontualidade",pts:10,date:"07/08"}]},
{id:8,name:"Roberto",teamId:4,pts:85,prevPts:70,goal:150,active:true,medals:["🏅 Pontual"],history:[{rule:"Treinamento técnico",pts:15,date:"06/08"}]},
{id:9,name:"Carlos",teamId:5,pts:75,prevPts:80,goal:150,active:true,medals:[],history:[{rule:"Organização da bancada",pts:10,date:"05/08"}]},
{id:10,name:"José Reis",teamId:5,pts:70,prevPts:65,goal:150,active:true,medals:[],history:[{rule:"Presença e pontualidade",pts:10,date:"07/08"}]},
{id:11,name:"Jackson",teamId:5,pts:65,prevPts:60,goal:150,active:true,medals:[],history:[]},
{id:12,name:"Francisco",teamId:6,pts:80,prevPts:70,goal:150,active:true,medals:[],history:[]},
{id:13,name:"Kayo",teamId:7,pts:90,prevPts:80,goal:150,active:true,medals:[],history:[]}
];
var currentWeek=1;
var WEEKLY_GOALS={
  1:{1:{target:300,reward:"Coffee break especial"},2:{target:350,reward:"Almoço da equipe"},3:{target:280,reward:"Saída antecipada sexta"},4:{target:250,reward:"Kit de ferramentas novo"},5:{target:200,reward:"Day off coletivo"},6:{target:150,reward:"Lanche da tarde"},7:{target:150,reward:"Brinde surpresa"}},
  2:{1:{target:320,reward:"Rodízio de pizza"},2:{target:370,reward:"Bônus de produtividade"},3:{target:300,reward:"Workshop criativo"},4:{target:270,reward:"Camisetas personalizadas"},5:{target:220,reward:"Happy hour"},6:{target:170,reward:"Voucher de lanche"},7:{target:170,reward:"Kit de snacks"}},
  3:{1:{target:340,reward:"Ingresso para cinema"},2:{target:390,reward:"Vale-compras"},3:{target:310,reward:"Churrasco da equipe"},4:{target:290,reward:"Folga extra"},5:{target:240,reward:"Coffee break premium"},6:{target:190,reward:"Café especial"},7:{target:190,reward:"Bombons"}},
  4:{1:{target:360,reward:"Dia de folga"},2:{target:410,reward:"Voucher restaurante"},3:{target:330,reward:"Kit personalizado"},4:{target:300,reward:"Almoço especial"},5:{target:260,reward:"Sorteio de brindes"},6:{target:210,reward:"Bônus extra"},7:{target:210,reward:"Troféu de equipe"}},
  5:{1:{target:380,reward:"Confraternização geral"},2:{target:430,reward:"Premiação individual"},3:{target:350,reward:"Pizza + refri"},4:{target:320,reward:"Day off sexta"},5:{target:280,reward:"Festa de encerramento"},6:{target:230,reward:"Churrasco final"},7:{target:230,reward:"Festa com pizza"}}
};
function getTeamGoal(teamId,week){return WEEKLY_GOALS[week]&&WEEKLY_GOALS[week][teamId]?WEEKLY_GOALS[week][teamId]:{target:300,reward:"Recompensa"}}
function getTeamPts(teamId){return COLLABS.filter(function(c){return c.teamId===teamId&&c.active}).reduce(function(s,c){return s+c.pts},0)}
let goalTarget=1500,goalReward="Coffee break especial da equipe 🎉";
let historyLog=[];
COLLABS.forEach(c=>{c.history.forEach(h=>{historyLog.push({collabId:c.id,rule:h.rule,pts:h.pts,date:h.date,by:"Gustavo (Líder)",obs:"",id:Math.random().toString(36)})})});
let currentUser=null,currentScreen="dashboard",selectedCollab=null,selectedRulesCount={},tvInterval=null;

// THEME TOGGLE
var isDark=localStorage.getItem("theme")==="dark";
if(isDark)document.body.classList.add("dark");
function toggleTheme(){
  isDark=!isDark;
  document.body.classList.toggle("dark",isDark);
  localStorage.setItem("theme",isDark?"dark":"light");
  updateThemeUI();
}
function updateThemeUI(){
  var icon=isDark?"🌙":"☀️";var label=isDark?"Tema Claro":"Tema Escuro";
  var si=document.getElementById("theme-icon-sidebar");if(si)si.textContent=icon;
  var sl=document.getElementById("theme-label-sidebar");if(sl)sl.textContent=label;
  var ti=document.getElementById("theme-toggle-topbar");if(ti)ti.textContent=icon;
}
updateThemeUI();

function avatar(name,size){
  const i=name.split(" ").map(w=>w[0]).join("").substring(0,2);
  const c=COLORS[name.length%COLORS.length];
  return '<div class="avatar '+size+'" style="background:'+c+'">'+i+'</div>';
}
function teamName(id){return TEAMS.find(t=>t.id===id)?.name||""}
function sorted(filter){
  let list=COLLABS.filter(c=>c.active);
  if(filter&&filter!=="all")list=list.filter(c=>c.teamId==filter);
  return list.sort((a,b)=>b.pts-a.pts);
}
function totalPts(){return COLLABS.filter(c=>c.active).reduce((s,c)=>s+c.pts,0)}
function toast(msg,type){
  type=type||"success";
  const d=document.createElement("div");d.className="toast toast-"+type;d.textContent=msg;
  document.getElementById("toast-container").appendChild(d);
  setTimeout(function(){d.remove()},3000);
}

// LOGIN

document.getElementById("demo-admin").onclick=function(){login("admin")};
document.getElementById("demo-leader").onclick=function(){login("leader")};
document.getElementById("demo-collab").onclick=function(){login("collaborator")};
document.getElementById("login-form").onsubmit=function(e){
  e.preventDefault();
  var u=document.getElementById("login-user").value;
  var p=document.getElementById("login-pass").value;
  if(u==="henrivibe" && p==="vibecodas"){
    currentUser={role:"admin",collab:COLLABS[0],name:"Henrique Vibe"};
    document.getElementById("login-screen").classList.remove("active");
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("app-shell").classList.remove("hidden");
    var sa=document.getElementById("sidebar-avatar");if(sa)sa.outerHTML=avatar(currentUser.name,"avatar-sm");
    document.getElementById("sidebar-user-name").textContent=currentUser.name;
    document.getElementById("sidebar-user-role").textContent="Administrador Supremo";
    var ta=document.getElementById("topbar-avatar");if(ta)ta.outerHTML=avatar(currentUser.name,"avatar-xs");
    buildNav();
    navTo("dashboard");
    toast("Bem-vindo de volta, Henrique!");
  } else {
    toast("Usuário ou senha incorretos. Tente os botões de demonstração abaixo.", "error");
  }
};

function login(role){
  currentUser={role:role,collab:role==="collaborator"?COLLABS[0]:COLLABS[1],name:role==="admin"?"Administrador":role==="leader"?"Gustavo (Líder)":COLLABS[0].name};
  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  var sa=document.getElementById("sidebar-avatar");
  if(sa)sa.outerHTML=avatar(currentUser.name,"avatar-sm");
  document.getElementById("sidebar-user-name").textContent=currentUser.name;
  document.getElementById("sidebar-user-role").textContent=role==="admin"?"Administrador":role==="leader"?"Lançar Pontuação":"Colaborador";
  var ta=document.getElementById("topbar-avatar");
  if(ta)ta.outerHTML=avatar(currentUser.name,"avatar-xs");
  buildNav();
  navigate(role==="admin"?"admin":role==="leader"?"launch":"dashboard");
}

function buildNav(){
  var r=currentUser.role;
  var items=[];
  if(r==="collaborator"||r==="leader")items.push({id:"dashboard",icon:"📊",label:"Meu Desempenho"});
  if(r==="leader")items.push({id:"launch",icon:"✏️",label:"Lançar Pontos"});
  items.push({id:"ranking",icon:"🏆",label:"Ranking"});
  items.push({id:"tv",icon:"📺",label:"Placar TV"});
  if(r==="admin"){items.unshift({id:"admin",icon:"⚙️",label:"Administração"});items.unshift({id:"dashboard",icon:"📊",label:"Dashboard"});}
  var nav=document.getElementById("sidebar-nav");
  nav.innerHTML=items.map(function(i){return '<li data-screen="'+i.id+'"><button onclick="navigate(\''+i.id+'\')">'+i.icon+' '+i.label+'</button></li>'}).join("");
  var bn=document.getElementById("bottom-nav");
  bn.innerHTML='<div class="bottom-nav-inner">'+items.slice(0,4).map(function(i){return '<button class="bottom-nav-item" onclick="navigate(\''+i.id+'\')"><span class="nav-icon">'+i.icon+'</span>'+i.label+'</button>'}).join("")+'</div>';
}

function navigate(screen){
  currentScreen=screen;
  document.querySelectorAll(".screen-section").forEach(function(s){s.classList.add("hidden")});
  var el=document.getElementById("screen-"+screen);if(el)el.classList.remove("hidden");
  document.querySelectorAll(".sidebar-nav li").forEach(function(li){li.classList.toggle("active",li.dataset.screen===screen)});
  document.getElementById("topbar-title").textContent=screen==="dashboard"?"Meu Desempenho":screen==="launch"?"Lançar Pontos":screen==="ranking"?"Ranking":screen==="tv"?"Placar TV":"Administração";
  if(screen==="dashboard")renderDashboard();
  if(screen==="ranking")renderRanking("all");
  if(screen==="launch")renderLaunch();
  if(screen==="tv")renderTV();
  if(screen==="admin")renderAdmin();
  if(tvInterval&&screen!=="tv"){clearInterval(tvInterval);tvInterval=null;}
  document.getElementById("sidebar").classList.remove("open");
}

function logout(){
  currentUser=null;
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("login-screen").classList.add("active");
  if(tvInterval){clearInterval(tvInterval);tvInterval=null;}
}

function renderDashboard(){
  var c=currentUser.collab||COLLABS[0];
  var s=sorted("all");var rank=s.findIndex(function(x){return x.id===c.id})+1;
  var da=document.getElementById("dash-avatar");
  if(da)da.outerHTML=avatar(c.name,"avatar-lg");
  document.getElementById("dash-hello").textContent="Olá, "+c.name.split(" ")[0]+"! 👋";
  document.getElementById("dash-points").textContent=c.pts;
  document.getElementById("dash-rank").textContent=rank+"º";
  var diff=c.pts-c.prevPts;var cmp=document.getElementById("dash-comparison");
  cmp.textContent=(diff>=0?"+":"")+diff+" pts";cmp.className="card-value "+(diff>=0?"up":"down");
  var pct=Math.min(100,Math.round(c.pts/c.goal*100));
  document.getElementById("dash-goal-fill").style.width=pct+"%";
  document.getElementById("dash-goal-text").textContent=c.pts+" / "+c.goal+" pontos ("+pct+"%)";
  document.getElementById("dash-goal-hint").textContent=c.pts>=c.goal?"🎉 Meta atingida!":"Faltam "+(c.goal-c.pts)+" pontos para a meta!";
  // Team goal
  document.getElementById("dash-team-name").textContent=teamName(c.teamId);
  var ws=document.getElementById("dash-week-select");
  ws.innerHTML="";
  for(var w=1;w<=5;w++){var opt=document.createElement("option");opt.value=w;opt.textContent="Semana "+w;if(w===currentWeek)opt.selected=true;ws.appendChild(opt);}
  ws.onchange=function(){currentWeek=+ws.value;updateTeamGoal(c.teamId)};
  updateTeamGoal(c.teamId);
  var mg=document.getElementById("dash-medals");
  var allMedals=["🏅 Pontual","⭐ Criativo","🎯 Focado","🔧 Técnico","🎨 Artista","🏆 Campeão"];
  mg.innerHTML=allMedals.map(function(m){return '<span class="medal '+(c.medals.includes(m)?"":"locked")+'"><span class="medal-icon">'+m.split(" ")[0]+'</span>'+m.split(" ")[1]+'</span>'}).join("");
  var hl=document.getElementById("dash-history");
  hl.innerHTML=c.history.map(function(h){return '<li class="history-item"><div class="info"><strong>'+h.rule+'</strong><div class="date">'+h.date+'</div></div><span class="pts">+'+h.pts+'</span></li>'}).join("");
  var nextUp=s[rank-2];
  document.getElementById("dash-next-obj-text").textContent=rank>1?"Faltam "+(nextUp.pts-c.pts+1)+" pontos para alcançar "+nextUp.name.split(" ")[0]+" e subir para "+(rank-1)+"º lugar!":"Você está em 1º lugar! Continue assim! 🏆";
  document.getElementById("btn-open-ranking").onclick=function(){navigate("ranking")};
}
function updateTeamGoal(teamId){
  var g=getTeamGoal(teamId,currentWeek);var pts=getTeamPts(teamId);
  var pct=Math.min(100,Math.round(pts/g.target*100));
  document.getElementById("dash-team-goal-fill").style.width=pct+"%";
  document.getElementById("dash-team-goal-text").textContent=pts+" / "+g.target+" pontos ("+pct+"%) — Semana "+currentWeek;
  document.getElementById("dash-team-goal-hint").textContent=pts>=g.target?"🎉 Meta do setor atingida! Recompensa: "+g.reward:"Faltam "+(g.target-pts)+" pts — Recompensa: "+g.reward;
}

function renderRanking(filter){
  var s=sorted(filter);
  document.querySelectorAll(".filter-btn").forEach(function(b){b.classList.toggle("active",b.dataset.filter===filter);b.onclick=function(){renderRanking(b.dataset.filter)}});
  if(s.length>=3){
    var top3=[s[1],s[0],s[2]];
    var sizes=["avatar-lg","avatar-xl","avatar-lg"];
    document.getElementById("podium").innerHTML=top3.map(function(c,i){
      var pos=i===0?2:i===1?1:3;
      return '<div class="podium-item">'+avatar(c.name,sizes[i])+'<div class="podium-name">'+c.name+'</div><div class="podium-team">'+teamName(c.teamId)+'</div><div class="podium-pts">'+c.pts+' pts</div><div class="podium-base">'+pos+'º</div></div>';
    }).join("");
  }
  var me=currentUser.collab?currentUser.collab.id:null;
  document.getElementById("ranking-list").innerHTML=s.map(function(c,i){
    var prevSorted=COLLABS.filter(function(x){return x.active}).sort(function(a,b){return b.prevPts-a.prevPts});
    var prevRank=prevSorted.findIndex(function(x){return x.id===c.id});
    var trend=prevRank>i?"🔼":prevRank<i?"🔽":"➖";
    var tie=i>0&&s[i-1].pts===c.pts;
    return '<div class="rank-row '+(c.id===me?"is-me":"")+" "+(tie?"is-tie":"")+'"><span class="rank-pos">'+(i+1)+'º</span>'+avatar(c.name,"avatar-sm")+'<div class="rank-info"><div class="rank-name">'+c.name+(tie?" (empate)":"")+'</div><div class="rank-team">'+teamName(c.teamId)+'</div></div><span class="rank-pts">'+c.pts+'</span><span class="rank-trend">'+trend+'</span></div>';
  }).join("");
}

function renderLaunch(){
  selectedCollab=null;selectedRulesCount={};
  document.getElementById("selected-collab").classList.add("hidden");
  document.getElementById("collab-selector").classList.remove("hidden");
  document.getElementById("points-preview-group").style.display="none";
  document.getElementById("btn-confirm-launch").disabled=true;
  document.getElementById("launch-obs").value="";
  document.getElementById("launch-success").classList.add("hidden");
  document.getElementById("launch-details").classList.add("hidden");
  document.getElementById("file-preview").classList.add("hidden");
  document.getElementById("file-upload").style.display="flex";
  var cl=document.getElementById("collab-list");
  cl.innerHTML=COLLABS.filter(function(c){return c.active}).map(function(c){return '<div class="collab-option" data-id="'+c.id+'">'+avatar(c.name,"avatar-sm")+'<div><strong>'+c.name+'</strong><br><small>'+teamName(c.teamId)+'</small></div></div>'}).join("");
  cl.querySelectorAll(".collab-option").forEach(function(el){el.onclick=function(){selectCollab(+el.dataset.id)}});
  document.getElementById("launch-search").value="";
  document.getElementById("launch-search").oninput=function(e){
    var q=e.target.value.toLowerCase();
    cl.querySelectorAll(".collab-option").forEach(function(el){el.style.display=el.textContent.toLowerCase().includes(q)?"flex":"none"});
  };
  var rl=document.getElementById("rules-list");
  var posRules=RULES.filter(function(r){return r.active&&r.pts>0});
  var negRules=RULES.filter(function(r){return r.active&&r.pts<0});
  var html='<h4 style="font-size:.95rem;margin-bottom:.5rem;color:var(--text2)">Pontos Positivos</h4>';
  html+=posRules.map(function(r){
    return '<div class="rule-option" id="rule-opt-'+r.id+'">'
      +'<div class="rule-info"><span>'+r.name+'</span><span class="rule-pts">+'+r.pts+' pts</span></div>'
      +'<div class="rule-counter">'
      +'<button type="button" class="btn-rule-minus" data-id="'+r.id+'">-</button>'
      +'<span id="rule-count-'+r.id+'">0</span>'
      +'<button type="button" class="btn-rule-plus" data-id="'+r.id+'">+</button>'
      +'</div></div>'
  }).join("");
  html+='<h4 style="font-size:.95rem;margin:1rem 0 .5rem;color:var(--text2)">Pontos Negativos</h4>';
  html+=negRules.map(function(r){
    return '<div class="rule-option" id="rule-opt-'+r.id+'">'
      +'<div class="rule-info"><span>'+r.name+'</span><span class="rule-pts" style="color:var(--danger)">'+r.pts+' pts</span></div>'
      +'<div class="rule-counter">'
      +'<button type="button" class="btn-rule-minus" data-id="'+r.id+'">-</button>'
      +'<span id="rule-count-'+r.id+'">0</span>'
      +'<button type="button" class="btn-rule-plus" data-id="'+r.id+'">+</button>'
      +'</div></div>'
  }).join("");
  rl.innerHTML=html;
  rl.querySelectorAll(".btn-rule-minus").forEach(function(el){el.onclick=function(){updateRuleCount(+el.dataset.id,-1)}});
  rl.querySelectorAll(".btn-rule-plus").forEach(function(el){el.onclick=function(){updateRuleCount(+el.dataset.id,1)}});
  document.getElementById("file-upload").onclick=function(){document.getElementById("launch-file").click()};
  document.getElementById("launch-file").onchange=function(e){
    if(e.target.files.length){document.getElementById("file-preview").classList.remove("hidden");document.getElementById("file-preview-name").textContent=e.target.files[0].name;document.getElementById("file-upload").style.display="none";}
  };
  document.getElementById("btn-clear-file").onclick=function(){document.getElementById("file-preview").classList.add("hidden");document.getElementById("file-upload").style.display="flex";document.getElementById("launch-file").value=""};
}
function selectCollab(id){
  selectedCollab=COLLABS.find(function(c){return c.id===id});
  document.getElementById("collab-selector").classList.add("hidden");
  var sc=document.getElementById("selected-collab");sc.classList.remove("hidden");
  sc.querySelector("strong").textContent=selectedCollab.name;
  sc.querySelector("small").textContent=teamName(selectedCollab.teamId);
  document.getElementById("launch-details").classList.remove("hidden");
  document.getElementById("btn-clear-collab").onclick=function(){selectedCollab=null;sc.classList.add("hidden");document.getElementById("collab-selector").classList.remove("hidden");document.getElementById("launch-details").classList.add("hidden");checkLaunch()};
  checkLaunch();
}

function updateRuleCount(id,delta){
  let current=selectedRulesCount[id]||0;
  let next=Math.max(0,current+delta);
  selectedRulesCount[id]=next;
  document.getElementById("rule-count-"+id).textContent=next;
  
  let opt = document.getElementById("rule-opt-"+id);
  if(opt) opt.classList.toggle("selected", next > 0);
  
  let totalPts=0;
  let hasSelection=false;
  Object.keys(selectedRulesCount).forEach(function(k){
    if(selectedRulesCount[k]>0){
      hasSelection=true;
      let r=RULES.find(function(x){return x.id==k});
      totalPts+=r.pts*selectedRulesCount[k];
    }
  });

  if(hasSelection){
    document.getElementById("points-preview-group").style.display="block";
    document.getElementById("points-preview-value").textContent=(totalPts>0?"+":"")+totalPts;
  }else{
    document.getElementById("points-preview-group").style.display="none";
  }
  checkLaunch();
}
function checkLaunch(){
  let hasSelection=Object.values(selectedRulesCount).some(function(v){return v>0});
  document.getElementById("btn-confirm-launch").disabled=!(selectedCollab&&hasSelection);
}
document.getElementById("btn-confirm-launch").onclick=function(){
  if(!selectedCollab)return;
  let hasSelection=Object.values(selectedRulesCount).some(function(v){return v>0});
  if(!hasSelection)return;

  let totalPts=0;
  let msgParts=[];
  let nowStr=new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});
  
  Object.keys(selectedRulesCount).forEach(function(k){
    let count=selectedRulesCount[k];
    if(count>0){
      let r=RULES.find(function(x){return x.id==k});
      for(let i=0;i<count;i++){
        selectedCollab.pts+=r.pts;
        totalPts+=r.pts;
        selectedCollab.history.unshift({rule:r.name,pts:r.pts,date:nowStr});
        historyLog.unshift({collabId:selectedCollab.id,rule:r.name,pts:r.pts,date:nowStr,by:currentUser.name,obs:document.getElementById("launch-obs").value,id:Math.random().toString(36)});
      }
      msgParts.push(count>1?count+"x "+r.name:r.name);
    }
  });

  document.getElementById("launch-success").classList.remove("hidden");
  document.getElementById("launch-success-msg").textContent=(totalPts>0?"+":"")+totalPts+" pontos para "+selectedCollab.name+" - "+msgParts.join(", ");
  toast((totalPts>0?"+":"")+totalPts+" pts para "+selectedCollab.name.split(" ")[0]+"!");
};
document.getElementById("btn-new-launch").onclick=function(){renderLaunch()};

function renderTV(){
  var s=sorted("all").slice(0,5);
  document.getElementById("tv-ranking").innerHTML=s.map(function(c,i){return '<div class="tv-rank-item"><span class="tv-rank-pos">'+(i+1)+'º</span>'+avatar(c.name,"avatar-md")+'<div class="tv-rank-info"><div class="tv-rank-name">'+c.name+'</div><div class="tv-rank-team">'+teamName(c.teamId)+'</div></div><span class="tv-rank-pts">'+c.pts+'</span></div>'}).join("");
  var teamTotals=TEAMS.map(function(t){return{name:t.name,pts:COLLABS.filter(function(c){return c.teamId===t.id&&c.active}).reduce(function(s,c){return s+c.pts},0)}}).sort(function(a,b){return b.pts-a.pts});
  document.getElementById("tv-team-ranking").innerHTML=teamTotals.map(function(t){return '<div class="tv-team-item"><span class="tv-team-name">'+t.name+'</span><span class="tv-team-pts">'+t.pts+' pts</span></div>'}).join("");
  var total=totalPts();var pct=Math.min(100,Math.round(total/goalTarget*100));
  document.getElementById("tv-goal-fill").style.width=pct+"%";
  document.getElementById("tv-goal-numbers").innerHTML='<span>'+total+' pts</span><span>'+goalTarget+' pts</span>';
  document.getElementById("tv-reward").innerHTML='🎁 Ao alcançar a meta: <strong>'+goalReward+'</strong>';
  var remaining=goalTarget-total;
  document.getElementById("tv-motivational").textContent=remaining>0?"🔥 Faltam "+remaining+" pontos para desbloquear a recompensa da semana!":"🎉 Meta atingida! Parabéns equipe!";
  document.getElementById("tv-achievements").innerHTML=["Mariana desbloqueou 🎨 Artista","Lucas conquistou 🎯 Focado","Rafael completou 🔧 Técnico","Beatriz ganhou Elogio de cliente"].map(function(a){return '<div class="tv-achievement">🌟 '+a+'</div>'}).join("");
  updateTVClock();
  if(tvInterval)clearInterval(tvInterval);
  tvInterval=setInterval(function(){updateTVClock()},60000);
}
function updateTVClock(){
  var now=new Date();
  document.getElementById("tv-clock").textContent=now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  document.getElementById("tv-update").textContent="Última atualização: "+now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
}

function renderAdmin(){renderAdminCollabs();renderAdminTeams();renderAdminRules();renderAdminGoal();renderAdminHistory();renderAdminReports();}
document.querySelectorAll(".admin-tab").forEach(function(tab){tab.onclick=function(){
  document.querySelectorAll(".admin-tab").forEach(function(t){t.classList.remove("active")});tab.classList.add("active");
  document.querySelectorAll(".admin-panel").forEach(function(p){p.classList.add("hidden")});
  document.getElementById(tab.dataset.tab).classList.remove("hidden");
}});
function renderAdminCollabs(){
  document.getElementById("admin-collabs-body").innerHTML=COLLABS.map(function(c){return '<tr><td style="display:flex;align-items:center;gap:.5rem">'+avatar(c.name,"avatar-sm")+' '+c.name+'</td><td>'+teamName(c.teamId)+'</td><td><strong>'+c.pts+'</strong></td><td><span class="status-badge '+(c.active?"status-active":"status-inactive")+'">'+(c.active?"Ativo":"Inativo")+'</span></td><td class="actions"><button class="btn btn-outline btn-sm" onclick="toast(\'Edição simulada\',\'info\')">✏️</button><button class="btn btn-outline btn-sm" onclick="toggleActive('+c.id+')">'+(c.active?"🚫":"✅")+'</button></td></tr>'}).join("");
}
function renderAdminTeams(){
  document.getElementById("admin-teams-body").innerHTML=TEAMS.map(function(t){var members=COLLABS.filter(function(c){return c.teamId===t.id});return '<tr><td><strong>'+t.name+'</strong></td><td>'+members.length+'</td><td>'+members.reduce(function(s,c){return s+c.pts},0)+'</td><td><button class="btn btn-outline btn-sm" onclick="toast(\'Edição simulada\',\'info\')">✏️</button></td></tr>'}).join("");
}
function renderAdminRules(){
  document.getElementById("admin-rules-body").innerHTML=RULES.map(function(r){return '<tr><td>'+r.name+'</td><td><strong>+'+r.pts+'</strong></td><td>'+r.freq+'</td><td><span class="status-badge '+(r.active?"status-active":"status-inactive")+'">'+(r.active?"Ativa":"Inativa")+'</span></td><td class="actions"><button class="btn btn-outline btn-sm" onclick="toast(\'Edição simulada\',\'info\')">✏️</button><button class="btn btn-outline btn-sm" onclick="toggleRule('+r.id+')">'+(r.active?"🚫":"✅")+'</button></td></tr>'}).join("");
}
function renderAdminGoal(){
  document.getElementById("admin-goal-target").value=goalTarget;
  document.getElementById("admin-goal-reward").value=goalReward;
  document.getElementById("btn-save-goal").onclick=function(){goalTarget=+document.getElementById("admin-goal-target").value;goalReward=document.getElementById("admin-goal-reward").value;toast("Meta atualizada!")};
}
function renderAdminHistory(){
  var fc=document.getElementById("filter-collab");fc.innerHTML='<option value="">Todos</option>'+COLLABS.map(function(c){return '<option value="'+c.id+'">'+c.name+'</option>'}).join("");
  var ft=document.getElementById("filter-team");ft.innerHTML='<option value="">Todas</option>'+TEAMS.map(function(t){return '<option value="'+t.id+'">'+t.name+'</option>'}).join("");
  var fr=document.getElementById("filter-rule");fr.innerHTML='<option value="">Todas</option>'+RULES.map(function(r){return '<option value="'+r.name+'">'+r.name+'</option>'}).join("");
  [fc,ft,fr,document.getElementById("filter-period")].forEach(function(f){f.onchange=function(){filterHistory()}});
  document.getElementById("btn-export-csv").onclick=exportCSV;
  filterHistory();
}
function filterHistory(){
  var logs=historyLog.slice();
  var fc=document.getElementById("filter-collab").value;if(fc)logs=logs.filter(function(l){return l.collabId==fc});
  var fr=document.getElementById("filter-rule").value;if(fr)logs=logs.filter(function(l){return l.rule===fr});
  var ft=document.getElementById("filter-team").value;if(ft)logs=logs.filter(function(l){var c=COLLABS.find(function(x){return x.id===l.collabId});return c&&c.teamId==ft});
  document.getElementById("admin-history-body").innerHTML=logs.map(function(l){var c=COLLABS.find(function(x){return x.id===l.collabId});return '<tr><td>'+l.date+'</td><td>'+(c?c.name:"-")+'</td><td>'+l.rule+'</td><td><strong>+'+l.pts+'</strong></td><td>'+l.by+'</td><td>'+(l.obs||"-")+'</td><td><button class="btn btn-outline btn-sm" onclick="reverseEntry(\''+l.id+'\')">↩️ Estornar</button></td></tr>'}).join("");
}
function toggleActive(id){var c=COLLABS.find(function(x){return x.id===id});c.active=!c.active;renderAdminCollabs();toast(c.active?"Colaborador ativado":"Colaborador desativado");}
function toggleRule(id){var r=RULES.find(function(x){return x.id===id});r.active=!r.active;renderAdminRules();toast(r.active?"Regra ativada":"Regra desativada");}
function reverseEntry(id){
  var entry=historyLog.find(function(l){return String(l.id)===String(id)});
  if(entry){var c=COLLABS.find(function(x){return x.id===entry.collabId});if(c)c.pts=Math.max(0,c.pts-entry.pts);historyLog=historyLog.filter(function(l){return String(l.id)!==String(id)});filterHistory();toast("Lançamento estornado!");}
}
function exportCSV(){
  var ov=document.getElementById("export-overlay");ov.classList.remove("hidden");
  setTimeout(function(){ov.classList.add("hidden");toast("Arquivo CSV exportado com sucesso!")},1500);
}
document.getElementById("topbar-menu-btn").onclick=function(){document.getElementById("sidebar").classList.toggle("open")};
document.getElementById("btn-logout-sidebar").onclick=logout;
document.getElementById("btn-add-collab").onclick=function(){toast("Formulário de cadastro simulado","info")};
document.getElementById("btn-add-team").onclick=function(){toast("Formulário de equipe simulado","info")};
document.getElementById("btn-add-rule").onclick=function(){toast("Formulário de regra simulado","info")};

// ADMIN REPORTS
function renderAdminReports(){
  var rt=document.getElementById("report-team");
  rt.innerHTML=TEAMS.map(function(t){return '<option value="'+t.id+'">'+t.name+'</option>'}).join("");
  var rw=document.getElementById("report-week");
  rw.innerHTML="";for(var w=1;w<=5;w++){rw.innerHTML+='<option value="'+w+'">Semana '+w+'</option>';}
  var rc=document.getElementById("report-collab");
  rc.innerHTML=COLLABS.map(function(c){return '<option value="'+c.id+'">'+c.name+' ('+teamName(c.teamId)+')</option>'}).join("");
  document.getElementById("btn-report-team").onclick=function(){var tid=+rt.value;var wk=+rw.value;generateTeamPDF(tid,wk)};
  document.getElementById("btn-report-collab").onclick=function(){var cid=+rc.value;generateCollabPDF(cid)};
  document.getElementById("btn-report-all").onclick=function(){generateAllPDF()};
}
function pdfStyles(){
  return 'body{font-family:Arial,sans-serif;padding:2rem;color:#1e293b;max-width:900px;margin:0 auto}'
  +'h1{color:#1e293b;border-bottom:3px solid #f59e0b;padding-bottom:.5rem;font-size:1.4rem}h2{color:#334155;margin-top:1.5rem;font-size:1.1rem}'
  +'table{width:100%;border-collapse:collapse;margin:.75rem 0}th,td{padding:.5rem .75rem;border:1px solid #e2e8f0;text-align:left;font-size:.85rem}'
  +'th{background:#f8fafc;font-weight:600}.highlight{background:#fffbeb;font-weight:600}'
  +'.progress-outer{background:#e2e8f0;border-radius:8px;height:18px;overflow:hidden}.progress-inner{background:linear-gradient(90deg,#f59e0b,#ea580c);height:100%;border-radius:8px}'
  +'.meta-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;margin:.75rem 0}'
  +'.footer{margin-top:2rem;padding-top:1rem;border-top:1px solid #e2e8f0;font-size:.75rem;color:#64748b;text-align:center}'
  +'@media print{body{padding:1rem}}';
}
function pdfFooter(){
  var now=new Date();
  return '<div class="footer">Prime Assembly — Relatório gerado em '+now.toLocaleDateString("pt-BR")+' às '+now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})+'</div>';
}
function generateTeamPDF(teamId,week){
  var team=teamName(teamId);var tg=getTeamGoal(teamId,week);var tPts=getTeamPts(teamId);
  var members=COLLABS.filter(function(x){return x.teamId===teamId&&x.active}).sort(function(a,b){return b.pts-a.pts});
  var now=new Date();var dateStr=now.toLocaleDateString("pt-BR");var timeStr=now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  var html='<html><head><meta charset="UTF-8"><title>Relatório - '+team+' - Semana '+week+'</title><style>'+pdfStyles()+'</style></head><body>';
  html+='<h1>📊 Relatório de Desempenho — Equipe '+team+'</h1>';
  html+='<p><strong>Equipe:</strong> '+team+' | <strong>Semana:</strong> '+week+' de 5 | <strong>Data:</strong> '+dateStr+' às '+timeStr+'</p>';
  html+='<h2>🎯 Meta do Setor — Semana '+week+'</h2>';
  var metaPct=Math.min(100,Math.round(tPts/tg.target*100));
  html+='<div class="meta-box"><strong>'+tPts+' / '+tg.target+' pontos ('+metaPct+'%)</strong>';
  html+='<div class="progress-outer"><div class="progress-inner" style="width:'+metaPct+'%"></div></div>';
  html+='<p>Recompensa: <strong>'+tg.reward+'</strong></p></div>';
  html+='<h2>👥 Membros da Equipe</h2><table><tr><th>Pos</th><th>Colaborador</th><th>Equipe</th><th>Pontos</th><th>Meta</th><th>%</th></tr>';
  members.forEach(function(m,i){var p=Math.min(100,Math.round(m.pts/m.goal*100));
    html+='<tr><td>'+(i+1)+'º</td><td>'+m.name+'</td><td>'+team+'</td><td>'+m.pts+'</td><td>'+m.goal+'</td><td>'+p+'%</td></tr>'});
  html+='</table>';
  html+='<h2>📝 Atividades Registradas</h2><table><tr><th>Data</th><th>Colaborador</th><th>Equipe</th><th>Atividade</th><th>Pontos</th><th>Registrado por</th></tr>';
  var logs=historyLog.filter(function(l){var col=COLLABS.find(function(x){return x.id===l.collabId});return col&&col.teamId===teamId});
  if(logs.length===0)html+='<tr><td colspan="6" style="text-align:center;color:#64748b">Nenhum registro</td></tr>';
  logs.forEach(function(l){var col=COLLABS.find(function(x){return x.id===l.collabId});
    html+='<tr><td>'+l.date+'</td><td>'+(col?col.name:'-')+'</td><td>'+team+'</td><td>'+l.rule+'</td><td>+'+l.pts+'</td><td>'+l.by+'</td></tr>'});
  html+='</table>'+pdfFooter()+'<script>window.onload=function(){window.print()}<\/script></body></html>';
  var w=window.open('','_blank');w.document.write(html);w.document.close();
}
function generateCollabPDF(collabId){
  var c=COLLABS.find(function(x){return x.id===collabId});
  if(!c){toast("Colaborador não encontrado","error");return;}
  var team=teamName(c.teamId);var now=new Date();var dateStr=now.toLocaleDateString("pt-BR");var timeStr=now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  var html='<html><head><meta charset="UTF-8"><title>Relatório - '+c.name+'</title><style>'+pdfStyles()+'</style></head><body>';
  html+='<h1>👤 Relatório Individual — '+c.name+'</h1>';
  html+='<p><strong>Colaborador:</strong> '+c.name+' | <strong>Equipe:</strong> '+team+' | <strong>Data:</strong> '+dateStr+' às '+timeStr+'</p>';
  var pct=Math.min(100,Math.round(c.pts/c.goal*100));
  html+='<h2>📊 Resumo de Desempenho</h2>';
  html+='<table><tr><th>Pontos Semana</th><th>Meta Individual</th><th>Progresso</th><th>Equipe</th></tr>';
  html+='<tr><td><strong>'+c.pts+'</strong></td><td>'+c.goal+'</td><td>'+pct+'%</td><td>'+team+'</td></tr></table>';
  html+='<div class="meta-box"><div class="progress-outer"><div class="progress-inner" style="width:'+pct+'%"></div></div></div>';
  html+='<h2>🏅 Conquistas</h2>';
  if(c.medals.length>0){html+='<p>'+c.medals.join(' | ')+'</p>';}else{html+='<p style="color:#64748b">Nenhuma conquista ainda</p>';}
  html+='<h2>📝 Histórico de Atividades</h2><table><tr><th>Data</th><th>Colaborador</th><th>Equipe</th><th>Atividade</th><th>Pontos</th><th>Registrado por</th></tr>';
  var logs=historyLog.filter(function(l){return l.collabId===c.id});
  if(logs.length===0)html+='<tr><td colspan="6" style="text-align:center;color:#64748b">Nenhum registro</td></tr>';
  logs.forEach(function(l){html+='<tr><td>'+l.date+'</td><td>'+c.name+'</td><td>'+team+'</td><td>'+l.rule+'</td><td>+'+l.pts+'</td><td>'+l.by+'</td></tr>'});
  html+='</table>'+pdfFooter()+'<script>window.onload=function(){window.print()}<\/script></body></html>';
  var w=window.open('','_blank');w.document.write(html);w.document.close();
}
function generateAllPDF(){
  var now=new Date();var dateStr=now.toLocaleDateString("pt-BR");var timeStr=now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  var html='<html><head><meta charset="UTF-8"><title>Relatório Geral - Prime Assembly</title><style>'+pdfStyles()+'</style></head><body>';
  html+='<h1>🏢 Relatório Geral — Prime Assembly</h1>';
  html+='<p><strong>Data:</strong> '+dateStr+' às '+timeStr+' | <strong>Total de colaboradores:</strong> '+COLLABS.filter(function(c){return c.active}).length+'</p>';
  html+='<h2>👥 Ranking por Equipe</h2><table><tr><th>Equipe</th><th>Membros</th><th>Pontos Totais</th></tr>';
  TEAMS.forEach(function(t){var m=COLLABS.filter(function(c){return c.teamId===t.id&&c.active});var pts=m.reduce(function(s,c){return s+c.pts},0);
    html+='<tr><td><strong>'+t.name+'</strong></td><td>'+m.length+'</td><td>'+pts+'</td></tr>'});
  html+='</table>';
  html+='<h2>🏆 Ranking Geral de Colaboradores</h2><table><tr><th>Pos</th><th>Colaborador</th><th>Equipe</th><th>Pontos</th><th>Meta</th><th>%</th></tr>';
  var all=COLLABS.filter(function(c){return c.active}).sort(function(a,b){return b.pts-a.pts});
  all.forEach(function(c,i){var p=Math.min(100,Math.round(c.pts/c.goal*100));
    html+='<tr><td>'+(i+1)+'º</td><td>'+c.name+'</td><td>'+teamName(c.teamId)+'</td><td>'+c.pts+'</td><td>'+c.goal+'</td><td>'+p+'%</td></tr>'});
  html+='</table>';
  html+='<h2>📝 Todos os Lançamentos</h2><table><tr><th>Data</th><th>Colaborador</th><th>Equipe</th><th>Atividade</th><th>Pontos</th><th>Registrado por</th></tr>';
  historyLog.forEach(function(l){var col=COLLABS.find(function(x){return x.id===l.collabId});
    html+='<tr><td>'+l.date+'</td><td>'+(col?col.name:'-')+'</td><td>'+(col?teamName(col.teamId):'-')+'</td><td>'+l.rule+'</td><td>+'+l.pts+'</td><td>'+l.by+'</td></tr>'});
  html+='</table>'+pdfFooter()+'<script>window.onload=function(){window.print()}<\/script></body></html>';
  var w=window.open('','_blank');w.document.write(html);w.document.close();
}
