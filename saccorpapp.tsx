import React, { useState, useEffect, useRef } from 'react';

// --- Componentes Menores ---

// Componente para os quadrados com o sinal de "+"
const GridCard = ({ card, delay, onHover, onLeave, onClick }) => {
  return (
    <div 
      className="group relative w-full aspect-square bg-[#bbaea8]/40 border border-white/10 shadow-sm cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-xl hover:bg-[#c2b6b1] animate-in fade-in slide-in-from-bottom-4 fill-mode-both rounded-[2rem]"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => onHover(card)}
      onMouseLeave={onLeave}
      onClick={() => onClick(card.id)}
    >
      {card.saved ? (
        // Estado Salvo
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#c2b6b1]/60 transition-all duration-500">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform group-hover:scale-110">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="font-serif text-gray-900 text-2xl font-medium text-center">{card.name || 'Salvo'}</h3>
          <p className="text-sm text-gray-700 mt-2">Clique para editar</p>
        </div>
      ) : (
        // Estado Padrão (Sinal de Mais maior)
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:opacity-80">
          <span className="text-white text-[10rem] font-light select-none leading-none pb-6">+</span>
        </div>
      )}
    </div>
  );
};

// --- Telas Principais ---

const LoginScreen = ({ onLogin }) => {
  const [usernameInput, setUsernameInput] = useState('');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#600f10] via-[#852b2b] to-white flex items-center justify-center p-6 animate-in fade-in duration-1000">
      <div className="bg-[#cdbabb] rounded-[3.5rem] w-full max-w-[800px] h-[450px] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <h1 className="text-5xl font-serif text-gray-800 mb-16 tracking-wide drop-shadow-sm">
          Saccorp
        </h1>
        <div className="flex flex-row w-full items-end justify-center gap-12 px-12">
          <div className="flex flex-col gap-6 w-[300px]">
            <div className="flex flex-col group">
              <label className="text-gray-800 font-serif text-sm mb-1.5 pl-2 transition-colors group-focus-within:text-black">Usuário</label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="rounded-full bg-[#e3dadb] px-5 py-2.5 outline-none shadow-inner transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-[#852b2b]/30 text-gray-700" 
              />
            </div>
            <div className="flex flex-col group">
              <label className="text-gray-800 font-serif text-sm mb-1.5 pl-2 transition-colors group-focus-within:text-black">Senha</label>
              <input type="password" className="rounded-full bg-[#e3dadb] px-5 py-2.5 outline-none shadow-inner transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-[#852b2b]/30 text-gray-700" />
            </div>
          </div>
          <button onClick={() => onLogin(usernameInput)} className="mb-1 bg-[#e3dadb] border border-white/40 px-12 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white hover:-translate-y-1 active:scale-95 text-gray-800 font-serif text-base h-fit">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = ({ onLogout, cards, onEditCard, username }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen w-full flex bg-[#e8e8e8] animate-in fade-in duration-700 relative overflow-hidden">
      
      {/* Menu Lateral */}
      <div className="w-64 bg-[#dad3d3] flex flex-col justify-between py-10 px-8 shadow-2xl z-10 shrink-0">
        <div>
          <div className="flex flex-col items-start gap-4 mb-12">
            <div className="w-16 h-16 bg-black rounded-full shadow-lg border-2 border-[#dad3d3] hover:scale-105 transition-transform duration-300 cursor-pointer"></div>
            <p className="font-serif text-sm text-gray-800">Bem vindo, {username || 'Usuário'}</p>
          </div>

          <nav className="flex flex-col gap-3 font-serif text-[13px] text-gray-800">
            <button className="text-left hover:text-black transition-colors py-1">Home</button>
            <div className="group">
              <button className="text-left hover:text-black transition-colors py-1 flex items-center justify-between w-full">
                Criar 
                <span className="text-[9px] transition-transform duration-300 group-hover:rotate-180">▼</span>
              </button>
              <div className="pl-4 mt-3 flex flex-col gap-3 text-[11px] text-gray-600 border-l border-gray-400/30 ml-1">
                {cards.map((c, i) => (
                  <button 
                    key={i} 
                    onClick={() => onEditCard(c.id)}
                    className="text-left hover:text-black transition-colors hover:translate-x-1 duration-200"
                  >
                    {c.saved && c.name ? c.name : `Estação de trabalho ${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
        <button onClick={onLogout} className="text-left hover:text-black transition-colors font-serif text-sm text-gray-800 hover:translate-x-1 duration-200 w-fit">
          Sair
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 bg-gradient-to-b from-[#600f10] via-[#852b2b] to-white p-12 overflow-y-auto relative flex items-start justify-center">
        
        {/* Grade Centralizada e Maior - Ajustada para não sobrepor */}
        <div className="w-full max-w-[1600px] pt-4 pr-[360px]"> {/* pr- para reservar espaço pro popup sem empurrar */}
          <div className="grid grid-cols-2 gap-16 relative z-10">
            {cards.map((card, index) => (
              <GridCard 
                key={card.id} 
                card={card}
                delay={index * 100}
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
                onClick={onEditCard}
              />
            ))}
          </div>
        </div>

        {/* Pop-up Lateral Dinâmico (Aparece apenas no hover - Fade In/Out) */}
        <div className={`fixed top-1/2 -translate-y-1/2 right-12 w-[340px] bg-[#d2c5c5] rounded-[2.5rem] p-6 shadow-2xl h-[75vh] flex flex-col shrink-0 z-20 transition-all duration-500 ease-in-out pointer-events-none ${hoveredCard ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}>
          <div className="w-full h-56 bg-[#e4d4f4] rounded-[2rem] shadow-inner flex items-center justify-center text-[#b89bda] font-serif text-sm transition-all overflow-hidden">
             {hoveredCard?.saved ? (
               <div className="w-full h-full bg-green-500/20 flex flex-col items-center justify-center p-4">
                  <span className="text-green-700 text-4xl mb-2">✓</span>
                  <span className="text-green-800 font-medium">Configuração Ativa</span>
               </div>
             ) : (
                <span className="opacity-70">Área de Destaque</span>
             )}
          </div>
          
          <div className="mt-8 flex flex-col gap-4 px-4 text-center">
            {hoveredCard ? (
              <>
                <h3 className="font-serif text-gray-900 text-2xl mb-1 font-medium">
                  {hoveredCard.saved ? hoveredCard.name : `Estação ${hoveredCard.id}`}
                </h3>
                <p className="text-sm text-gray-700 leading-tight mb-4">
                  {hoveredCard.saved && hoveredCard.desc ? hoveredCard.desc : "Clique no botão '+' para conectar as câmeras e configurar os EPIs obrigatórios para esta estação."}
                </p>
                <div className="px-6 py-2 bg-white/50 text-gray-800 text-sm rounded-full transition-colors shadow-sm w-fit mx-auto border border-white/40">
                  {hoveredCard.saved ? 'Visualizar' : 'Configurar'}
                </div>
              </>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Tela de Criação de EPI (Nova) ---

const EpiCreationScreen = ({ card, onSave, onCancel }) => {
  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  
  // Estado do formulário
  const [name, setName] = useState(card?.name || "");
  const [desc, setDesc] = useState(card?.desc || "");
  const [epis, setEpis] = useState(card?.epis || {
    capacete: false, oculos: false, mascara: false, luva: false, colete: false, bota: false, protetor: false
  });

  // Lista para renderização
  const epiItems = [
    { key: 'capacete', label: 'Capacete' },
    { key: 'oculos', label: 'Ocúlos' },
    { key: 'mascara', label: 'Mascara' },
    { key: 'luva', label: 'Luva' },
    { key: 'colete', label: 'Colete' },
    { key: 'bota', label: 'Bota' },
    { key: 'protetor', label: 'Protetor auricular' }
  ];

  // Ativar Câmera
  useEffect(() => {
    let localStream = null;
    const enableCamera = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
          setStreamActive(true);
        }
      } catch (err) {
        console.warn("Acesso à câmera negado ou indisponível.", err);
      }
    };
    enableCamera();

    // Cleanup ao desmontar
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleToggleEpi = (key) => {
    setEpis(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfirm = () => {
    onSave({ name, desc, epis, saved: true });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#4d4d4d] animate-in fade-in duration-500 font-sans">
      
      {/* Topbar Cinza Escuro */}
      <div className="h-12 bg-[#4a4a4a] text-gray-300 flex items-center px-6 font-serif text-sm border-b border-gray-600 shadow-sm shrink-0">
        <button onClick={onCancel} className="hover:text-white mr-4">← Voltar</button>
        Criação de area de epi
      </div>

      {/* Conteúdo Dividido */}
      <div className="flex flex-1 h-[calc(100vh-3rem)]">
        
        {/* Lado Esquerdo (Câmera e Inputs) */}
        <div className="w-[60%] bg-[#d8cecc] p-10 flex flex-col relative overflow-y-auto">
          
          {/* Container Câmera */}
          <div className="w-full aspect-[4/3] bg-black rounded-lg shadow-xl overflow-hidden relative flex items-center justify-center mb-10">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className={`w-full h-full object-cover transition-opacity duration-700 ${streamActive ? 'opacity-100' : 'opacity-0'}`} 
            />
            {!streamActive && (
              <p className="absolute text-gray-400 font-serif text-lg tracking-wide z-10">
                Adicionar camera
              </p>
            )}
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-10 mt-4 max-w-md">
            <div className="flex flex-col">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="bg-transparent border-b border-black pb-1 outline-none text-gray-800 placeholder-gray-600 font-serif focus:border-red-900 transition-colors"
              />
            </div>
            
            <div className="flex flex-col">
              <input 
                type="text" 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Descrição"
                className="bg-transparent border-b border-black pb-1 outline-none text-gray-800 placeholder-gray-600 font-serif focus:border-red-900 transition-colors"
              />
            </div>
          </div>

          {/* Botão Confirmar */}
          <button 
            onClick={handleConfirm}
            className="absolute bottom-10 right-10 px-8 py-3 bg-[#e3dadb] text-gray-900 font-serif rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.15)] border border-white/50 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Confirmar
          </button>
        </div>

        {/* Lado Direito (Lista EPIs) */}
        <div className="w-[40%] bg-gradient-to-b from-[#600f10] to-[#852b2b] p-10 flex flex-col items-center overflow-y-auto">
          
          <div className="w-full max-w-sm bg-[#e3dadb] rounded-[1.5rem] py-6 px-8 mb-8 shadow-xl text-center">
            <h2 className="text-2xl text-gray-900 font-sans tracking-wide">Controle de EPI</h2>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-4">
            {epiItems.map((item) => (
              <div key={item.key} className="flex items-center gap-4 group cursor-pointer" onClick={() => handleToggleEpi(item.key)}>
                {/* Bola de Status (Verde/Vermelho) */}
                <div 
                  className={`w-8 h-8 rounded-full shadow-md transition-colors duration-300 flex-shrink-0 ${epis[item.key] ? 'bg-[#00ff00] shadow-[0_0_10px_#00ff0055]' : 'bg-[#ff0000]'}`}
                />
                
                {/* Pílula de Texto */}
                <div className="bg-[#e3dadb] rounded-full px-5 py-2.5 flex-1 flex justify-between items-center shadow-md transition-transform duration-200 group-hover:scale-[1.02]">
                  <span className="font-sans text-gray-800 text-sm">{item.label}</span>
                  
                  {/* Três pontinhos estéticos */}
                  <div className="flex gap-1.5 opacity-80">
                    <div className="w-2 h-2 rounded-full bg-[#fce029]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#dc2626]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};


// --- Componente Principal ---

export default function App() {
  // Controle de rotas simplificado
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'home', 'epi'
  const [editingCardId, setEditingCardId] = useState(null);
  const [username, setUsername] = useState('');

  // Estado global das Estações (Cartões)
  const [cards, setCards] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      saved: false,
      name: "",
      desc: "",
      epis: { capacete: false, oculos: false, mascara: false, luva: false, colete: false, bota: false, protetor: false }
    }))
  );

  const handleLogin = (user) => {
    setUsername(user);
    setCurrentScreen('home');
  };
  const handleLogout = () => {
    setCurrentScreen('login');
    // Opcional: resetar as configurações ao sair? (Deixei persistente por enquanto)
  };

  const handleEditCard = (id) => {
    setEditingCardId(id);
    setCurrentScreen('epi');
  };

  const handleSaveEpi = (updatedData) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === editingCardId ? { ...card, ...updatedData } : card
      )
    );
    setCurrentScreen('home');
  };

  const handleCancelEpi = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="w-full h-full font-sans antialiased overflow-hidden">
      {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
      
      {currentScreen === 'home' && (
        <HomeScreen 
          onLogout={handleLogout} 
          cards={cards} 
          onEditCard={handleEditCard}
          username={username}
        />
      )}

      {currentScreen === 'epi' && (
        <EpiCreationScreen 
          card={cards.find(c => c.id === editingCardId)}
          onSave={handleSaveEpi}
          onCancel={handleCancelEpi}
        />
      )}
    </div>
  );
}