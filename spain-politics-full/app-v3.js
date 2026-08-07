(()=>{
'use strict';
const $=id=>document.getElementById(id);
const $$=sel=>Array.from(document.querySelectorAll(sel));

// Prevent any browser default action for UI buttons. All navigation is handled explicitly.
document.addEventListener('click',e=>{
  const btn=e.target.closest('button');
  if(btn) e.preventDefault();
},true);

const detail=$('detail');
const simpleBtn=$('simple');
const deepBtn=$('deep');
const powerText=$('powerText');
const competencies=$('competencies');
const owner=$('owner');
const partyButtons=$('partyButtons');
const partyDetail=$('partyDetail');
const coalitionList=$('coalitionList');
const total=$('total');
const ring=$('ring');
const statusEl=$('status');
const missing=$('missing');
const reset=$('reset');
const timeline=$('timeline');
const quizGrid=$('quizGrid');
const search=$('search');
const results=$('results');
const progress=$('progress');
const topButton=$('top');

const D={
people:['Источник власти','Граждане','Выбирают парламент, но не председателя правительства напрямую.',['Конгресс','Часть Сената','Муниципальные и региональные органы']],
congress:['Главная палата','Конгресс депутатов','Центр политической системы. Именно он утверждает председателя правительства.',['350 депутатов','Принимает законы','Утверждает бюджет','Может отправить правительство в отставку']],
senate:['Верхняя палата','Сенат','Территориальная палата, обычно слабее Конгресса.',['Может задержать закон','Предлагает поправки','Участвует в статье 155']],
pm:['Исполнительная власть','Председатель правительства','Фактический политический глава страны.',['Формирует кабинет','Определяет курс','Отвечает перед Конгрессом']],
cabinet:['Администрация','Совет министров','Исполняет законы и руководит государственным аппаратом.',['Финансы','Оборона','МВД','Внешняя политика']],
king:['Глава государства','Король','Символ и представитель государства, но не глава правительства.',['Не управляет кабинетом','Не формирует бюджет','Формально подписывает законы']],
courts:['Отдельная ветвь','Суды','Судьи формально независимы от правительства.',['Верховный суд','Конституционный суд','Контроль законности решений власти']]
};

$$('[data-node]').forEach(b=>b.addEventListener('click',()=>{
  $$('[data-node]').forEach(x=>x.classList.remove('selected'));
  b.classList.add('selected');
  const d=D[b.dataset.node];
  detail.innerHTML=`<label>${d[0]}</label><h3>${d[1]}</h3><p>${d[2]}</p><ul>${d[3].map(x=>`<li>${x}</li>`).join('')}</ul>`;
}));

simpleBtn.addEventListener('click',()=>{
  document.body.classList.add('simple');
  simpleBtn.classList.add('active');
  deepBtn.classList.remove('active');
});
deepBtn.addEventListener('click',()=>{
  document.body.classList.remove('simple');
  deepBtn.classList.add('active');
  simpleBtn.classList.remove('active');
});

$$('[data-go]').forEach(b=>b.addEventListener('click',()=>{
  const target=$(b.dataset.go);
  if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
}));

const P={
cat:'<p><b>Каталония:</b> школы, медицина, Mossos, соцслужбы, культура, часть транспорта и жилья.</p>',
state:'<p><b>Испания:</b> армия, внешняя политика, гражданство, границы, основные пенсии и ключевые налоги.</p>',
shared:'<p><b>Совместно:</b> налоги, железные дороги, образование, миграция, инфраструктура и экология.</p>'
};
$$('[data-power]').forEach(b=>b.addEventListener('click',()=>{
  $$('[data-power]').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  powerText.innerHTML=P[b.dataset.power];
}));
powerText.innerHTML=P.cat;

const C=[
['Армия','Испания','Центральная компетенция. Король — формальный главнокомандующий, но решения принимает правительство.'],
['Школы','Каталония','Generalitat управляет школами в рамках общих законов.'],
['Здравоохранение','Каталония','Больницы и первичная помощь организуются автономией.'],
['Налоги','Совместно','Главные налоги встроены в общую систему, часть доходов принадлежит автономии.'],
['Mossos','Каталония','Региональная полиция подчиняется Generalitat.'],
['Guardia Civil','Испания','Государственная силовая структура.'],
['Железные дороги','Совместно','Инфраструктура и операционное управление разделены.'],
['Пенсии','Испания','Основная система социального страхования централизована.'],
['Жильё','Совместно','Региональная и центральная политика пересекаются.']
];
C.forEach(c=>{
  const b=document.createElement('button');
  b.type='button';
  b.innerHTML=`<b>${c[0]}</b><small>${c[1]}</small>`;
  b.addEventListener('click',()=>{
    $$('#competencies button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    owner.innerHTML=`<label>${c[1]}</label><h3>${c[0]}</h3><p>${c[2]}</p>`;
  });
  competencies.appendChild(b);
});

const parties={
PSOE:['Левоцентр · автономии','Социал-демократия, социальное государство, трудовые права, европейская интеграция и переговоры с регионами.'],
PP:['Правоцентр · единая Испания','Снижение налогов, поддержка бизнеса и жёсткая позиция против независимости Каталонии.'],
Vox:['Правая · централизация','Жёсткая миграционная политика, критика автономий и национал-консервативная повестка.'],
Sumar:['Левая · федерализм','Трудовые права, жильё, экологическая и социальная политика.'],
ERC:['Левая · независимость','Каталонская независимость через переговоры и постепенное расширение полномочий.'],
Junts:['Центр/право · независимость','Каталонский национализм, фискальная автономия и жёсткий торг с Мадридом.'],
CUP:['Радикальная левая · независимость','Антикапитализм и немедленный суверенитет Каталонии.'],
Comuns:['Левая · федерализм','Жильё, экология и федерализация Испании.']
};
Object.entries(parties).forEach(([k,v],i)=>{
  const b=document.createElement('button');
  b.type='button';
  b.textContent=k;
  if(!i)b.classList.add('active');
  b.addEventListener('click',()=>{
    $$('#partyButtons button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    partyDetail.innerHTML=`<label>${v[0]}</label><h3>${k}</h3><p>${v[1]}</p>`;
  });
  partyButtons.appendChild(b);
});
partyDetail.innerHTML=`<label>${parties.PSOE[0]}</label><h3>PSOE</h3><p>${parties.PSOE[1]}</p>`;

const seats={PP:137,PSOE:121,Vox:32,Sumar:26,ERC:7,Junts:7,'EH Bildu':6,PNV:5,BNG:1,CC:1,UPN:1};
const selected=new Set();
function draw(){
  const n=[...selected].reduce((s,x)=>s+seats[x],0);
  total.textContent=n;
  ring.style.background=`conic-gradient(var(--blue) ${Math.min(n/350*360,360)}deg,#e5e5e8 0)`;
  statusEl.textContent=n>=176?'Большинство есть':'Нет большинства';
  missing.textContent=n>=176?`Запас: ${n-176} мест.`:`Не хватает ${176-n} мест.`;
}
Object.entries(seats).forEach(([k,v])=>{
  const b=document.createElement('button');
  b.type='button';
  b.innerHTML=`<b><span>${k}</span><span>${v}</span></b>`;
  b.addEventListener('click',()=>{
    selected.has(k)?selected.delete(k):selected.add(k);
    b.classList.toggle('active');
    draw();
  });
  coalitionList.appendChild(b);
});
reset.addEventListener('click',()=>{
  selected.clear();
  $$('#coalitionList button').forEach(x=>x.classList.remove('active'));
  draw();
});

timeline.innerHTML='';
[
['1978','Конституция','Парламентская монархия и система автономий.'],
['1986','Европейская интеграция','Испания вступает в ЕЭС.'],
['2010','Статут Каталонии','Решение Конституционного суда усиливает конфликт.'],
['2017','Референдум и статья 155','Острый кризис между Каталонией и Мадридом.'],
['2023','Инвеститура Санчеса','Региональные партии снова становятся ключом к центральной власти.'],
['2024','Илья в Generalitat','PSC возвращается к руководству Каталонией.']
].forEach(x=>timeline.insertAdjacentHTML('beforeend',`<article><b>${x[0]}</b><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`));

const Q=[
['Кто выбирает председателя правительства?',['Граждане напрямую','Конгресс','Король'],1],
['Кто реально управляет армией?',['Король лично','Правительство','Сенат'],1],
['Президент Каталонии — министр Испании?',['Да','Нет, это отдельная автономная власть','Только по бюджету'],1],
['Почему региональные партии влиятельны?',['Назначают короля','Контролируют суды','Без них часто нет 176 голосов'],2]
];
Q.forEach(q=>{
  const c=document.createElement('div');
  c.className='card quizcard';
  c.innerHTML=`<h3>${q[0]}</h3><div class="answers">${q[1].map(x=>`<button type="button">${x}</button>`).join('')}</div><p></p>`;
  $$call(c,'button').forEach((b,i)=>b.addEventListener('click',()=>{
    $$call(c,'button').forEach(x=>x.disabled=true);
    b.classList.add(i===q[2]?'correct':'wrong');
    $$call(c,'button')[q[2]].classList.add('correct');
    c.lastElementChild.textContent=i===q[2]?'Верно.':'Правильный ответ выделен.';
  }));
  quizGrid.appendChild(c);
});
function $$call(root,sel){return Array.from(root.querySelectorAll(sel));}

const S=[['король','map','Глава государства'],['премьер','map','Председатель правительства'],['законы','laws','Как принимаются законы'],['каталония','cat','Автономная власть'],['налоги','money','Бюджетные потоки'],['армия','powers','Компетенции'],['партии','parties','Политические силы'],['коалиция','coalition','Большинство 176'],['история','history','Политический таймлайн']];
search.addEventListener('input',()=>{
  const q=search.value.toLowerCase();
  results.innerHTML='';
  if(!q)return;
  S.filter(x=>x.join(' ').toLowerCase().includes(q)).forEach(x=>{
    const d=document.createElement('div');
    d.className='hit';
    d.innerHTML=`<b>${x[0]}</b><div>${x[2]}</div>`;
    d.addEventListener('click',()=>$(x[1]).scrollIntoView({behavior:'smooth',block:'start'}));
    results.appendChild(d);
  });
});

// Only this exact button may scroll to the top.
topButton.addEventListener('click',e=>{
  e.stopPropagation();
  window.scrollTo({top:0,left:0,behavior:'smooth'});
});

const secs=$$('main section[id]');
const nav=$$('nav button');
window.addEventListener('scroll',()=>{
  const max=Math.max(document.documentElement.scrollHeight-window.innerHeight,1);
  progress.style.width=(window.scrollY/max*100)+'%';
  let id='map';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-130)id=s.id;});
  nav.forEach(b=>b.classList.toggle('active',b.dataset.go===id));
},{passive:true});

draw();
})();
