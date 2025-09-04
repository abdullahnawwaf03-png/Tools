async function includeFragment(targetId, url){
  const target=document.getElementById(targetId);
  if(!target) return;
  try{
    const res=await fetch(url,{cache:"no-store"});
    const html=await res.text();
    target.innerHTML=html;
  }catch(e){
    console.error("Include failed", url, e);
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  includeFragment("site-header","components/header.html");
  includeFragment("site-footer","components/footer.html");
});

