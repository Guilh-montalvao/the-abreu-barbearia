'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown, Camera, Menu, X, MapPin, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import ExperienceScroller from '@/components/ExperienceScroller';
import IntroAnimation from '@/components/IntroAnimation';
const booking='https://wa.me/message/R5JJ2CSI6QZVH1';
const mapsUrl='https://www.google.com/maps/place/The+Abreu+Barbearia/@-15.8324693,-48.0405892,17z/data=!3m1!4b1!4m6!3m5!1s0x935a33badf0d48af:0x7461a4107104895a!8m2!3d-15.8324693!4d-48.0405892!16s%2Fg%2F11w7f0s4_4';
const team=[
  {
    name: 'Arthur Ribeiro',
    role: 'Barbeiro',
    image: '/team/barber-1.png',
    pos: '50% 12%',
    desc: 'Especialista em cortes contemporâneos, precisão de contornos e acabamento sofisticado feito à mão.'
  },
  {
    name: 'Eduardo Helder',
    role: 'Barbeiro',
    image: '/team/barber-2.png',
    pos: '50% 15%',
    desc: 'Cuidado minucioso com a simetria da barba, desenho refinado e um atendimento com máxima calma e técnica.'
  },
  {
    name: 'Eduardo Abreu',
    role: 'Fundador & Barbeiro',
    image: '/team/barber-3.png',
    pos: '50% 15%',
    desc: 'Idealizador da The Abreu. Assinatura autoral que une a tradição clássica da barbearia à elegância moderna.'
  }
];
const photos=[0,1,2,3,4,5,7,11,12,13,14];
const labels=['Precisão em cada movimento','Estilo com personalidade','Cuidado do início ao fim','Acabamento feito à mão','O ritual da barba','Técnica e atenção','Um tempo para você','Detalhes que fazem diferença','Sua melhor versão','O nosso espaço','Um corte, sua identidade'];
function Brand(){return <span className="brand"><img src="/logo-oficial.png" alt="The Abreu Barbearia" className="brand-logo-img"/></span>}
export default function Home(){const [menu,setMenu]=useState(false);const [active,setActive]=useState(0);const [introComplete,setIntroComplete]=useState(false);
useEffect(()=>{const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible')}else{entry.target.classList.remove('visible')}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect()},[]);
return <>{!introComplete && <IntroAnimation onComplete={()=>setIntroComplete(true)}/>}<header><a href="#inicio" aria-label="The Abreu — início"><Brand/></a><nav aria-label="Navegação principal"><a href="#experiencia">A experiência</a><a href="#servicos">Corte & barba</a><a href="#equipe">A equipe</a><a href="#galeria">Nosso trabalho</a><a href="#contato">Localização</a></nav><a className="header-cta" href={booking} target="_blank" rel="noreferrer">Agendar horário <ArrowUpRight size={14}/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-label={menu?'Fechar menu':'Abrir menu'} aria-expanded={menu}>{menu?<X size={20}/>:<Menu size={20}/>}</button></header>{menu&&<nav className="mobile-nav">{[['A experiência','experiencia'],['Corte & barba','servicos'],['A equipe','equipe'],['Nosso trabalho','galeria'],['Localização & Horários','contato']].map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}>{label}<ArrowUpRight size={16}/></a>)}</nav>}
<main><section id="inicio" className="hero"><img className="hero-image" src="/media/photo-7.webp" alt="Barbeiro cuidando da barba de um cliente na The Abreu" fetchPriority="high"/><div className="hero-shade"/><div className="hero-content"><p className="eyebrow">THE ABREU · ÁGUAS CLARAS, BRASÍLIA</p><h1>Seu estilo.<br/>Nossa <em>assinatura.</em></h1><p className="hero-description">Corte, barba e um tempo só seu.<br/>Cuidado que você percebe em cada detalhe.</p><a className="button" href={booking} target="_blank" rel="noreferrer">Reserve seu momento <ArrowUpRight size={19}/></a></div><div className="hero-bottom"><span>UM NOVO ÍCONE DE BARBEARIA EM BRASÍLIA</span><a href="#experiencia">Explore a experiência <ArrowDown size={16}/></a></div><span className="hero-index">01 — THE ABREU</span></section>
<ExperienceScroller />
<section id="servicos" className="services section"><div className="section-heading reveal"><p className="eyebrow">02 / CORTE & BARBA</p><h2>Precisão no gesto.<br/>Personalidade no <em>resultado.</em></h2></div><div className="service-grid">{[{n:'01',title:'Corte',image:0,desc:'Forma, textura e acabamento. Um corte pensado para acompanhar o seu estilo.'},{n:'02',title:'Barba',image:4,desc:'Contornos bem definidos e atenção aos detalhes, em um ritual de cuidado.'},{n:'03',title:'Corte & barba',image:12,desc:'O cuidado completo. Cabelo e barba em harmonia para uma imagem que é sua.'}].map((s,idx)=><article className={`service-card reveal stagger-${idx+1}`} key={s.n}><a href={booking} target="_blank" rel="noreferrer" aria-label={'Agendar '+s.title}><div className="service-image"><img src={'/media/photo-'+s.image+'.webp'} alt={s.title+' na The Abreu Barbearia'} loading="lazy"/><span>{s.n}</span><i><ArrowUpRight/></i></div><h3>{s.title}</h3></a><p>{s.desc}</p></article>)}</div><p className="service-note reveal">Consulte valores e disponibilidade diretamente pelo WhatsApp.</p></section>
<section className="statement"><img src="/media/photo-3.webp" alt="Finalização de corte na barbearia" loading="lazy"/><div/><p className="reveal">O detalhe muda<br/><em>tudo.</em></p><span>THE ABREU BARBEARIA</span></section>
<section id="equipe" className="team section">
  <div className="section-heading reveal">
    <p className="eyebrow">03 / EQUIPE THE ABREU</p>
    <h2>Mestres no gesto.<br/>Especialistas no seu <em>estilo.</em></h2>
  </div>
  <div className="team-grid">
    {team.map((member, idx) => (
      <article className={`team-card reveal stagger-${idx + 1}`} key={member.name}>
        <div className="team-image-box">
          <img
            src={member.image}
            alt={`${member.name} — ${member.role} na The Abreu Barbearia`}
            loading="lazy"
            style={{ objectPosition: member.pos }}
          />
          <div className="team-overlay" />
          <span className="team-role-tag">{member.role}</span>
        </div>
        <div className="team-info">
          <h3>{member.name}</h3>
          <p>{member.desc}</p>
          <a
            href={`${booking}&text=${encodeURIComponent('Olá! Gostaria de agendar um atendimento com o barbeiro ' + member.name + ' na The Abreu.')}`}
            target="_blank"
            rel="noreferrer"
            className="text-link team-book-link"
          >
            Agendar com {member.name.split(' ')[0]} <ArrowUpRight size={15} />
          </a>
        </div>
      </article>
    ))}
  </div>
</section>
<section id="galeria" className="gallery section"><div className="gallery-heading reveal"><div><p className="eyebrow">04 / NOSSO TRABALHO</p><h2>Estilo que se <em>vê.</em></h2></div><a href="https://www.instagram.com/theabreubarbearia/" target="_blank" rel="noreferrer" className="text-link"><Camera size={17}/> @theabreubarbearia <ArrowUpRight size={17}/></a></div><div className="gallery-feature reveal"><img src={'/media/photo-'+photos[active]+'.webp'} alt={labels[active]} loading="lazy"/><div className="gallery-caption"><span>{labels[active]}</span><div><button aria-label="Foto anterior" onClick={()=>setActive((active+photos.length-1)%photos.length)}><ArrowLeft/></button><span>{String(active+1).padStart(2,'0')} / {photos.length}</span><button aria-label="Próxima foto" onClick={()=>setActive((active+1)%photos.length)}><ArrowRight/></button></div></div></div><div className="thumbnails reveal">{photos.map((photo,index)=><button key={photo} className={active===index?'selected':''} onClick={()=>setActive(index)} aria-label={'Ver foto: '+labels[index]} aria-pressed={active===index}><img src={'/media/photo-'+photo+'.webp'} alt="" loading="lazy"/></button>)}</div></section>
<section id="contato" className="contact section">
  <div className="contact-main-grid">
    <div className="contact-info reveal">
      <p className="eyebrow">05 / ATENDIMENTO & LOCALIZAÇÃO</p>
      <h2>O próximo detalhe<br/>é <em>com você.</em></h2>
      <p className="contact-lead">Escolha seu momento. Fale com a nossa equipe pelo WhatsApp e reserve seu atendimento exclusivo.</p>
      <div className="contact-actions">
        <a className="button" href={booking} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowUpRight size={19}/></a>
      </div>
      <div className="contact-details-grid">
        <div className="contact-detail-card">
          <div className="contact-detail-header">
            <span className="contact-icon-wrapper"><MapPin size={18}/></span>
            <h3>Endereço</h3>
          </div>
          <p className="contact-address-title">DF Plaza Shopping · Torre A</p>
          <p className="contact-address-sub">18º Andar, Sala 1804</p>
          <p className="contact-address-city">Águas Claras, Brasília — DF</p>
          <p className="contact-address-zip">CEP 71919-540</p>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="contact-route-link">Como chegar <ArrowUpRight size={14}/></a>
        </div>
        <div className="contact-detail-card">
          <div className="contact-detail-header">
            <span className="contact-icon-wrapper"><Clock size={18}/></span>
            <h3>Funcionamento</h3>
          </div>
          <ul className="contact-hours-list">
            <li><span>Terça a Sexta</span><strong>09:00 – 21:00</strong></li>
            <li><span>Sábado</span><strong>09:00 – 18:00</strong></li>
            <li className="closed"><span>Domingo e Segunda</span><em>Fechado</em></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="contact-visual-column reveal stagger-2">
      <div className="contact-video-wrapper">
        <video
          src="/media/the-abreu-video.mp4"
          poster="/media/the-abreu-video-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Vídeo The Abreu Barbearia DF Plaza Shopping"
        />
        <div className="contact-video-overlay" />
        <span className="contact-badge">DF PLAZA SHOPPING · TORRE A · SALA 1804</span>
      </div>
      <div className="contact-map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.45873265055!2d-48.0405892!3d-15.8324693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a33badf0d48af%3A0x7461a4107104895a!2sThe%20Abreu%20Barbearia!5e0!3m2!1spt-BR!2sbr!4v1789058218571!5m2!1spt-BR!2sbr"
          width="100%"
          height="280"
          style={{border: 0}}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Localização The Abreu Barbearia no DF Plaza Shopping"
        />
      </div>
    </div>
  </div>
</section>
</main><footer><a href="#inicio" aria-label="Voltar ao início"><Brand/></a><span>© {new Date().getFullYear()} The Abreu Barbearia · DF Plaza Shopping, Torre A, Sala 1804.</span><a href="https://www.instagram.com/theabreubarbearia/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15}/></a><a href="#inicio">Voltar ao topo ↑</a></footer></>}

