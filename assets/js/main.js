function createToolCard(tool){
  const col=document.createElement('div');
  col.className='col';
  col.innerHTML=`
    <div class="card tool-card h-100" data-category="${tool.category}" data-title="${tool.title.toLowerCase()}" data-keywords="${tool.keywords.join(' ')}">
      <div class="card-body">
        <h5 class="card-title">${tool.title}</h5>
        <p class="card-text text-muted">${tool.desc}</p>
        <a href="${tool.href}" class="btn btn-primary">Open</a>
      </div>
    </div>`;
  return col;
}

function renderTools(tools){
  const grid=document.getElementById('toolsGrid');
  if(!grid) return;
  grid.innerHTML='';
  tools.forEach(t=>grid.appendChild(createToolCard(t)));
}

function filterTools(){
  const query=(document.getElementById('toolSearch')?.value||'').trim().toLowerCase();
  const activeBtn=document.querySelector('.category-btn.active');
  const activeCat=activeBtn?activeBtn.getAttribute('data-category'):'all';
  const tools=window.TOOLS_MANIFEST.filter(t=>{
    const matchesCat = activeCat==='all' || t.category===activeCat;
    if(!matchesCat) return false;
    if(!query) return true;
    const text=(t.title+' '+t.desc+' '+(t.keywords||[]).join(' ')).toLowerCase();
    return text.includes(query);
  });
  renderTools(tools);
}

document.addEventListener('DOMContentLoaded',()=>{
  // Initial state
  const firstCat=document.querySelector('.category-btn[data-category="all"]');
  if(firstCat){ firstCat.classList.add('active'); }
  renderTools(window.TOOLS_MANIFEST||[]);

  // Search
  const search=document.getElementById('toolSearch');
  if(search){ search.addEventListener('input', filterTools); }

  // Category buttons
  document.querySelectorAll('.category-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      filterTools();
    });
  });
});

