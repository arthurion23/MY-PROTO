const DATA = window.PORTFOLIO_DATA;
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

window.addEventListener("load", () => setTimeout(() => $("#loader").classList.add("hidden"), 450));
$("#year").textContent = new Date().getFullYear();

const menu = $("#nav-links");
const toggle = $(".menu-toggle");
toggle.addEventListener("click", () => { const open = menu.classList.toggle("open"); toggle.setAttribute("aria-expanded", open); document.body.classList.toggle("menu-open", open); });
$$('.nav-links a').forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); }));

const revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); } }), { threshold:.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));
const sections = $$('main section[id]');
const navLinks = $$('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`)); }), {rootMargin:'-30% 0px -60%'});
sections.forEach(s => sectionObserver.observe(s));

const terminalLines = [
  ['cmd','$ whoami'],['out','Ahmed Hamed'],['cmd','$ role'],['out','Cybersecurity Student'],['out','Founder of HexaSecure'],['out','Developer'],['cmd','$ interests'],['out','Cybersecurity | Networking'],['out','Programming | Innovation'],['cmd','$ status'],['out','Always Learning. Always Building.']
];
const term = $('#terminal-output'); let lineIndex = 0;
function typeTerminal(){ if(lineIndex >= terminalLines.length){ const c=document.createElement('span');c.className='cursor';term.append(c);return;} const [cls,text]=terminalLines[lineIndex++]; const p=document.createElement('p');p.className=cls;term.append(p);let i=0;const timer=setInterval(()=>{p.textContent=text.slice(0,++i);if(i>=text.length){clearInterval(timer);setTimeout(typeTerminal,cls==='cmd'?170:80)}},20)}
setTimeout(typeTerminal,900);

async function loadRepos(){ const state=$('#repo-state'), grid=$('#project-grid'); try { const res=await fetch(`https://api.github.com/users/${DATA.githubUser}/repos?per_page=100&sort=updated`,{headers:{Accept:'application/vnd.github+json'}}); if(!res.ok) throw new Error(`GitHub returned ${res.status}`); const all=await res.json(); const wanted=DATA.selectedRepositories.map(name=>all.find(r=>r.name.toLowerCase()===name.toLowerCase())).filter(Boolean); if(!wanted.length) throw new Error('No selected public repositories were found.'); state.textContent=`LIVE GITHUB DATA // ${wanted.length} PUBLIC REPOSITORIES`; grid.innerHTML=wanted.map((r,i)=>`<article class="project-card reveal visible"><div class="project-top"><span>0${i+1} / REPOSITORY</span><span>UPDATED ${new Date(r.updated_at).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}).toUpperCase()}</span></div><h3>${escapeHtml(r.name)}</h3><p>${escapeHtml(r.description || 'No repository description has been provided on GitHub.')}</p><div class="project-meta"><span><i></i>${escapeHtml(r.language || 'Not specified')}</span><span>★ ${r.stargazers_count}</span><span>⑂ ${r.forks_count}</span></div><a href="${escapeHtml(r.html_url)}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(r.name)} on GitHub">↗</a></article>`).join(''); } catch(err){ state.textContent='GITHUB DATA TEMPORARILY UNAVAILABLE — OPEN THE PROFILE FOR CURRENT PROJECTS'; grid.innerHTML=`<article class="project-card"><div class="project-top"><span>LIVE DATA REQUIRED</span></div><h3>GitHub connection unavailable</h3><p>${escapeHtml(err.message)} No repository details are being guessed or cached.</p><a href="${DATA.links.github}?tab=repositories" target="_blank" rel="noopener" aria-label="View repositories on GitHub">↗</a></article>`; }}
loadRepos();

if(DATA.certificate.image){ const preview=$('#certificate-preview'); preview.classList.remove('missing'); preview.innerHTML=`<img src="${escapeHtml(DATA.certificate.image)}" alt="Ahmed Hamed HCIA-Security certificate" loading="lazy"><button class="zoom-btn" id="zoom-certificate" type="button">＋</button>`; $('#certificate-modal img').src=DATA.certificate.image; $('#zoom-certificate').addEventListener('click',()=>$('#certificate-modal').showModal()); }
$('#close-modal').addEventListener('click',()=>$('#certificate-modal').close());

const form=$('#contact-form'), status=$('#form-status');
form.addEventListener('submit',e=>{e.preventDefault();let valid=true;$$('label',form).forEach(label=>{const field=$('input,textarea',label),error=$('small',label);error.textContent='';if(!field.checkValidity()){valid=false;error.textContent=field.validity.typeMismatch?'Enter a valid email address.':`Please enter at least ${field.minLength || 2} characters.`}});if(!valid){status.textContent='Please review the highlighted fields.';return}if(!DATA.contact.email){status.textContent='Message validated. Direct delivery is not configured yet—please connect through GitHub or LinkedIn.';return}const d=new FormData(form);location.href=`mailto:${DATA.contact.email}?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(`From: ${d.get('name')} <${d.get('email')}>\n\n${d.get('message')}`)}`;status.textContent='Your email application was opened. Review and send the message there.'});

const back=$('#back-top');window.addEventListener('scroll',()=>back.classList.toggle('visible',scrollY>700),{passive:true});back.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const canvas=$('#network'),ctx=canvas.getContext('2d');let points=[];function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);points=Array.from({length:Math.min(55,Math.floor(innerWidth/24))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);points.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle='rgba(87,245,138,.5)';ctx.fillRect(p.x,p.y,1.3,1.3);for(let j=i+1;j<points.length;j++){const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<125){ctx.strokeStyle=`rgba(76,183,255,${.09*(1-d/125)})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}});requestAnimationFrame(draw)}addEventListener('resize',resize);resize();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();
