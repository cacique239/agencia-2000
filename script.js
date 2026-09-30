const STORAGE_KEY = 'agencia2000HojeState';

const phaseData = [
  {
    id: 'login',
    title: 'Fase 1 — Login',
    tag: 'Sistemas digitais',
    icon: '🔐',
    description:
      'Você chegou para trabalhar. O computador está ligado, mas a empresa usa um sistema interno que exige autenticação.',
  },
  {
    id: 'communication',
    title: 'Fase 2 — Comunicação',
    tag: 'Relacionamento',
    icon: '💬',
    description:
      'Seu colega precisa falar com você sobre uma campanha que será publicada hoje, o quê você faz para se comunicar com ele de forma rápida e eficiente?',
  },
  {
    id: 'site',
    title: 'Fase 3 — Site da Agência',
    tag: 'Presença digital',
    icon: '🌐',
    description:
      'Um cliente ouviu falar da agência e quer conhecer o trabalho de vocês. Por onde vocês estão presentes na internet?',
  },
  {
    id: 'advertising',
    title: 'Fase 4 — Publicidade',
    tag: 'Marketing',
    icon: '📣',
    description:
      'Um cliente possui R$ 5.000 para anunciar um novo produto e você precisa avaliar os canais. Qual é a melhor estratégia para atingir o público-alvo e gerar resultados?',
  },
  {
    id: 'cloud',
    title: 'Fase 5 — Arquivos e Nuvem',
    tag: 'Colaboração',
    icon: '☁️',
    description:
      'Você precisa enviar uma arte para outro funcionário que está trabalhando em outra cidade.',
  },
  {
    id: 'remote',
    title: 'Fase 6 — Trabalho Remoto',
    tag: 'Trabalho em equipe',
    icon: '🖥️',
    description:
      'O designer está trabalhando de casa e precisa participar de uma reunião.',
  },
  {
    id: 'social',
    title: 'Fase 7 — Redes Sociais',
    tag: 'Campanhas digitais',
    icon: '📱',
    description:
      'Você precisa planejar a campanha para um novo produto e escolher o melhor público e canal.',
  },
  {
    id: 'analytics',
    title: 'Fase 8 — Dados e Analytics',
    tag: 'Mensuração',
    icon: '📊',
    description:
      'Você precisa interpretar os dados de desempenho das campanhas e responder às métricas.',
  },
  {
    id: 'ai',
    title: 'Fase 9 — Inteligência Artificial',
    tag: 'Novas ferramentas',
    icon: '🤖',
    description:
      'Você precisa criar cinco ideias de slogans para uma campanha e usar uma IA de apoio.',
  },
  {
    id: 'final',
    title: 'Fase Final — Desafio',
    tag: 'Integração',
    icon: '🏁',
    description:
      'Você recebeu um novo cliente e precisa unir tudo que aprendeu para criar uma campanha digital completa.',
  },
];

const defaultState = {
  screen: 'intro',
  currentPhase: 0,
  score: 0,
  completed: [],
};

const state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return { ...defaultState };
    return {
      ...defaultState,
      ...saved,
      completed: Array.isArray(saved.completed) ? saved.completed : [],
    };
  } catch (error) {
    return { ...defaultState };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Não foi possível salvar no localStorage:', error);
  }
}

function getProgressPercent() {
  if (state.completed.length === 0) return 0;
  return Math.min(100, Math.round((state.completed.length / phaseData.length) * 100));
}

function buildHeader() {
  const percent = getProgressPercent();
  return `
    <header class="game-header">
      <div class="game-header-top">
        <div class="logo">Agência 2000 → Hoje</div>
        <div class="period">Era: 2000 → Era Digital</div>
      </div>
      <div class="progress-block">
        <div class="progress-text">
          <span>Progresso</span>
          <strong>${percent}%</strong>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percent}%"></div>
        </div>
      </div>
    </header>
  `;
}

function markPhaseCompleted() {
  if (!state.completed.includes(state.currentPhase)) {
    state.completed.push(state.currentPhase);
    state.score += 10;
  }
  saveState();
}

function startGame() {
  state.screen = 'game';
  saveState();
  renderApp();
}

function showHowToPlay() {
  const popup = document.createElement('div');
  popup.className = 'screen';
  popup.innerHTML = `
    <div class="intro-shell" style="max-width: 760px;">
      <div class="intro-copy">
        <div>
          <div class="title-badge">Como jogar</div>
          <h2>Uma jornada por transformação digital</h2>
        </div>
        <p>
          Você vai percorrer várias fases que representam situações reais de uma agência de publicidade.
          Em cada etapa, você aprenderá a adaptar ferramentas antigas e modernas, entender a importância
          da comunicação online e reconhecer como a tecnologia muda a rotina profissional.
        </p>
        <div class="retro-panel">
          <div class="inline-tag">📠 Antes: fax, papel, telefone fixo</div>
          <div class="inline-tag">💬 Agora: WhatsApp, nuvem, analytics, IA</div>
        </div>
        <p>
          O jogo é educativo. As respostas não precisam ser absolutas: a ideia é mostrar que cada ferramenta
          tem contexto, objetivo e momento certo de uso.
        </p>
        <div class="intro-actions">
          <button class="primary-btn" data-action="close-guide">Entendi</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('app').appendChild(popup);
}

function closeHowToPlay() {
  const popup = document.querySelector('.screen .intro-shell')?.closest('.screen');
  if (popup) popup.remove();
}

function renderIntro() {
  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="intro-shell">
        <div class="intro-layout">
          <div class="intro-copy">
            <div class="title-badge">Jogo educativo</div>
            <h1>Agência 2000 → Hoje</h1>
            <p>Uma jornada pela transformação digital</p>
            <p>
              Você é um profissional que trabalhou em uma agência de publicidade nos anos 2000 e agora precisa
              aprender a operar no ambiente digital atual. Ao longo do jogo, você vai perceber como a comunicação,
              os arquivos, a publicidade e a análise de dados mudaram de forma prática e estratégica.
            </p>
            <div class="intro-actions">
              <button class="primary-btn" data-action="start-game">Começar</button>
              <button class="secondary-btn" data-action="show-guide">Como jogar</button>
            </div>
          </div>

          <div class="era-board">
            <h3>Antes e agora</h3>
            <div class="era-row">
              <span class="era-icon">📠</span>
              <span>Fax</span>
            </div>
            <div class="era-row">
              <span class="era-icon">📄</span>
              <span>Papel</span>
            </div>
            <div class="era-row">
              <span class="era-icon">☎️</span>
              <span>Telefone</span>
            </div>
            <div class="era-row">
              <span class="era-icon">💿</span>
              <span>CD</span>
            </div>
            <div class="era-row">
              <span class="era-icon">🗄️</span>
              <span>Arquivo físico</span>
            </div>
            <div class="retro-panel">
              <div class="inline-tag">➡️</div>
              <div class="inline-tag">💬 WhatsApp</div>
              <div class="inline-tag">☁️ Nuvem</div>
              <div class="inline-tag">📱 Redes sociais</div>
              <div class="inline-tag">📊 Analytics</div>
              <div class="inline-tag">🤖 IA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFinal() {
  const completedSet = new Set(state.completed);
  const topics = [
    'Sistemas digitais',
    'Comunicação online',
    'Presença digital',
    'Redes sociais',
    'Nuvem',
    'Trabalho remoto',
    'Dados',
    'Inteligência artificial',
  ];

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="game-shell">
        ${buildHeader()}
        <div class="phase-card">
          <div class="final-summary">
            <div>
              <div class="title-badge">Conclusão</div>
              <h2>Transformação concluída!</h2>
            </div>

            <div class="summary-grid">
              <div class="card">
                <h4>Resumo do progresso</h4>
                <div class="check-list">
                  <div class="check-item"><span class="icon">✓</span><span>Progresso: ${getProgressPercent()}%</span></div>
                  <div class="check-item"><span class="icon">✓</span><span>Fases concluídas: ${state.completed.length}/${phaseData.length}</span></div>
                  <div class="check-item"><span class="icon">✓</span><span>Pontuação: ${state.score} pontos</span></div>
                </div>
              </div>

              <div class="card">
                <h4>Conhecimentos adquiridos</h4>
                <div class="check-list">
                  ${topics
                    .map(
                      (topic) => `
                        <div class="check-item">
                          <span class="icon">✓</span>
                          <span>${topic}</span>
                        </div>
                      `
                    )
                    .join('')}
                </div>
              </div>
            </div>

            <div class="compare-box">
              <h3>Antes vs. Depois</h3>
              <div class="compare-columns">
                <div class="compare-list">
                  <strong>ANTES</strong>
                  <ul>
                    <li>📠 Fax</li>
                    <li>📄 Papel</li>
                    <li>☎️ Telefone</li>
                    <li>💿 CD</li>
                    <li>🗄️ Arquivo físico</li>
                  </ul>
                </div>
                <div class="compare-list">
                  <strong>DEPOIS</strong>
                  <ul>
                    <li>💬 Mensagens</li>
                    <li>☁️ Nuvem</li>
                    <li>🌐 Web</li>
                    <li>📱 Redes sociais</li>
                    <li>📊 Dados</li>
                    <li>🤖 IA</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="info-box">
              <p>
                A tecnologia mudou a forma de trabalhar. Agora você faz parte dessa transformação, entendendo que
                as ferramentas digitais ampliam velocidade, colaboração, alcance e análise, mas ainda exigem
                pensamento crítico, estratégia e responsabilidade profissional.
              </p>
            </div>

            <div class="footer-actions">
              <button class="primary-btn" data-action="restart-game">Reiniciar jornada</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPhase() {
  const phase = phaseData[state.currentPhase];
  const isFinal = phase.id === 'final';

  const phaseContent = (() => {
    switch (phase.id) {
      case 'login':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>

            <div class="grid-2">
              <div class="card">
                <h4>Simulação de login</h4>
                <form id="login-form" class="form-grid">
                  <div class="field">
                    <label for="username">Usuário</label>
                    <input id="username" name="username" type="text" placeholder="Digite seu usuário" />
                  </div>
                  <div class="field">
                    <label for="password">Senha</label>
                    <input id="password" name="password" type="password" placeholder="Digite sua senha" />
                  </div>
                  <button class="primary-btn" type="submit">Entrar</button>
                </form>
                <div id="login-result" class="feedback"></div>
              </div>

              <div class="card">
                <h4>Conceitos importantes</h4>
                <ul>
                  <li><strong>Usuário:</strong> identificador do profissional ou do sistema.</li>
                  <li><strong>Senha:</strong> credencial que confirma a identidade.</li>
                  <li><strong>Autenticação:</strong> processo de confirmar quem é você.</li>
                  <li><strong>Segurança:</strong> proteção de dados e acesso.</li>
                  <li><strong>Recuperação de senha:</strong> processo para recuperar acesso caso a senha seja esquecida.</li>
                </ul>
              </div>
            </div>
          </div>
        `;

      case 'communication':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="choice-grid">
              <button class="option-btn" data-action="choice-communication" data-value="A" type="button">A) Escrever um bilhete e deixar na mesa</button>
              <button class="option-btn" data-action="choice-communication" data-value="B" type="button">B) Telefonar para o escritório</button>
              <button class="option-btn" data-action="choice-communication" data-value="C" type="button">C) Enviar uma mensagem pelo WhatsApp</button>
              <button class="option-btn" data-action="choice-communication" data-value="D" type="button">D) Esperar encontrar o colega pessoalmente</button>
            </div>
            <div id="communication-result" class="feedback"></div>
          </div>
        `;

      case 'site':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="site-list">
              <button class="site-card active" data-action="site-card" data-value="Site" type="button">🌐<br>Site</button>
              <button class="site-card" data-action="site-card" data-value="Portfólio" type="button">📁<br>Portfólio</button>
              <button class="site-card" data-action="site-card" data-value="Redes sociais" type="button">📱<br>Redes</button>
              <button class="site-card" data-action="site-card" data-value="Contato" type="button">✉️<br>Contato</button>
              <button class="site-card" data-action="site-card" data-value="Informações" type="button">ℹ️<br>Empresa</button>
            </div>
            <div class="detail-panel">
              <h4 id="site-title">Site</h4>
              <p id="site-text">
                O site da agência apresenta a marca, serviços, cases e formas de contato. Hoje, ele funciona como a
                vitrine digital da empresa e orienta clientes, vagas e oportunidades de negócio.
              </p>
            </div>
          </div>
        `;

      case 'advertising':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="budget-grid">
              <button class="budget-card" data-action="budget-choice" data-value="TV" type="button">
                <h4>📺 TV</h4>
                <p>Grande alcance, alto custo e ampla audiência.</p>
              </button>
              <button class="budget-card" data-action="budget-choice" data-value="Instagram" type="button">
                <h4>📸 Instagram</h4>
                <p>Visual forte, segmentação por público e interesse.</p>
              </button>
              <button class="budget-card" data-action="budget-choice" data-value="TikTok" type="button">
                <h4>🎵 TikTok</h4>
                <p>Conteúdo viral, bom para geração e engajamento.</p>
              </button>
            </div>
            <div id="advertising-result" class="feedback"></div>
          </div>
        `;

      case 'cloud':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="cloud-flow">
              <div class="flow-box">
                <h4>1. Escolher arquivo</h4>
                <p>📁 Arte-final-v2.ai</p>
              </div>
              <div class="flow-box">
                <h4>2. Compartilhar</h4>
                <button class="primary-btn" data-action="share-file" type="button">Compartilhar</button>
              </div>
              <div class="flow-box">
                <h4>3. Gerar link</h4>
                <p id="cloud-link">Link em espera...</p>
              </div>
            </div>
            <div class="info-box">
              <h4>Permissões</h4>
              <div class="permission-list">
                <button class="small-btn" data-action="permission-choice" data-value="visualizar" type="button">Visualizar</button>
                <button class="small-btn" data-action="permission-choice" data-value="comentar" type="button">Comentar</button>
                <button class="small-btn" data-action="permission-choice" data-value="editar" type="button">Editar</button>
              </div>
            </div>
            <div id="cloud-result" class="feedback"></div>
          </div>
        `;

      case 'remote':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="meeting-shell">
              <div class="meeting-header">
                <strong>Reunião de campanha</strong>
                <div>
                  <button class="small-btn" data-action="toggle-camera" type="button">📷 Câmera</button>
                  <button class="small-btn" data-action="toggle-mic" type="button">🎙️ Microfone</button>
                </div>
              </div>
              <div class="video-grid">
                <div class="participant">🎨 Designer</div>
                <div class="participant">🧑‍💼 Cliente</div>
                <div class="participant">📈 Marketing</div>
              </div>
              <div class="chat-box">
                <div class="chat-line">🟢 Participantes online: 3</div>
                <div class="chat-line">💬 Chat ativo</div>
                <div class="chat-line">📝 Discussão sobre cronograma da campanha</div>
              </div>
              <div class="footer-actions" style="margin-top: 16px;">
                <button class="primary-btn" data-action="join-meeting" type="button">Entrar na reunião</button>
                <button class="secondary-btn" data-action="leave-meeting" type="button">Sair da reunião</button>
              </div>
            </div>
            <div id="remote-result" class="feedback"></div>
          </div>
        `;

      case 'social':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="campaign-form">
              <div class="select-row">
                <div class="field">
                  <label>Produto</label>
                  <select disabled>
                    <option>Novo tênis esportivo</option>
                  </select>
                </div>
                <div class="field">
                  <label>Objetivo</label>
                  <select id="social-goal">
                    <option value="reconhecimento">Reconhecimento</option>
                    <option value="vendas">Vendas</option>
                    <option value="engajamento">Engajamento</option>
                  </select>
                </div>
              </div>
              <div class="select-row">
                <div class="field">
                  <label>Público-alvo</label>
                  <select id="social-audience">
                    <option value="adolescentes">Adolescentes</option>
                    <option value="adultos">Adultos</option>
                    <option value="idosos">Idosos</option>
                  </select>
                </div>
                <div class="field">
                  <label>Plataforma</label>
                  <select id="social-platform">
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
              </div>
              <div class="select-row">
                <div class="field">
                  <label>Tipo de conteúdo</label>
                  <select id="social-content">
                    <option value="video">Vídeo curto</option>
                    <option value="imagem">Imagem + legenda</option>
                    <option value="carrossel">Carrossel</option>
                  </select>
                </div>
                <div class="field">
                  <label>Horário ideal</label>
                  <select id="social-time">
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                  </select>
                </div>
              </div>
              <button class="primary-btn" data-action="social-submit" type="button">Gerar campanha</button>
            </div>
            <div id="social-result" class="feedback"></div>
          </div>
        `;

      case 'analytics':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="metric-board">
              <div class="metric-card"><strong>Visualizações</strong><div>42.3k</div></div>
              <div class="metric-card"><strong>Cliques</strong><div>3.4k</div></div>
              <div class="metric-card"><strong>Alcance</strong><div>89k</div></div>
              <div class="metric-card"><strong>Conversões</strong><div>412</div></div>
              <div class="metric-card"><strong>Engajamento</strong><div>8,1%</div></div>
            </div>
            <div class="card">
              <h4>Campanhas</h4>
              <div class="chart">
                <div class="bar-wrap"><div class="bar" style="height: 60%"></div>Campanha A</div>
                <div class="bar-wrap"><div class="bar" style="height: 80%"></div>Campanha B</div>
                <div class="bar-wrap"><div class="bar" style="height: 95%"></div>Campanha C</div>
              </div>
            </div>
            <div class="choice-grid">
              <button class="option-btn" data-action="analytics-answer" data-value="C" type="button">Qual campanha recebeu mais cliques?</button>
              <button class="option-btn" data-action="analytics-answer" data-value="B" type="button">Qual campanha teve maior conversão?</button>
            </div>
            <div id="analytics-result" class="feedback"></div>
          </div>
        `;

      case 'ai':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="chat-window">
              <div class="chat-messages">
                <div class="message bot">Olá! Posso gerar ideias de slogan com base no seu brief. Qual é o posicionamento da campanha?</div>
                <div class="message user">Quero cinco slogans para um produto de energia e estilo de vida.</div>
              </div>
              <div class="chat-input-row">
                <input id="ai-input" type="text" placeholder="Digite seu pedido para a IA" />
                <button class="primary-btn" data-action="ai-submit" type="button">Enviar</button>
              </div>
              <div id="ai-result" class="feedback"></div>
            </div>
          </div>
        `;

      case 'final':
        return `
          <div class="phase-body">
            <div class="info-box">
              <p>${phase.description}</p>
            </div>
            <div class="grid-2">
              <div class="card">
                <h4>Checklist do desafio</h4>
                <ul>
                  <li>✅ Fazer login no sistema</li>
                  <li>✅ Conversar com a equipe</li>
                  <li>✅ Acessar o briefing</li>
                  <li>✅ Armazenar arquivos na nuvem</li>
                  <li>✅ Escolher canais de divulgação</li>
                </ul>
              </div>
              <div class="card">
                <h4>Decisões estratégicas</h4>
                <ul>
                  <li>🎯 Definir público-alvo</li>
                  <li>📈 Analisar resultados</li>
                  <li>🧠 Usar IA como apoio</li>
                  <li>📣 Apresentar a campanha ao cliente</li>
                </ul>
              </div>
            </div>
            <div class="progress-block">
              <div class="progress-text">
                <span>Barra de progresso do desafio</span>
                <strong>${state.completed.length * 10}%</strong>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(100, state.completed.length * 10)}%"></div>
              </div>
            </div>
            <div class="footer-actions">
              <button class="primary-btn" data-action="complete-final" type="button">Concluir desafio</button>
            </div>
          </div>
        `;

      default:
        return ``;
    }
  })();

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="game-shell">
        ${buildHeader()}
        <div class="phase-card">
          <div class="phase-top">
            <div class="phase-title"><span>${phase.icon}</span><span>${phase.title}</span></div>
            <div class="phase-tag">${phase.tag}</div>
          </div>
          ${phaseContent}
          <div class="footer-actions">
            <button class="secondary-btn" data-action="go-back" type="button">Anterior</button>
            <button class="primary-btn" data-action="next-phase" type="button">${isFinal ? 'Ver resultado final' : 'Próxima fase'}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderApp() {
  if (state.screen === 'intro') {
    renderIntro();
    return;
  }

  if (state.screen === 'finish') {
    renderFinal();
    return;
  }

  renderPhase();
}

function handlePhaseAction(action, value) {
  const currentPhase = phaseData[state.currentPhase];

  if (action === 'start-game') {
    startGame();
    return;
  }

  if (action === 'show-guide') {
    showHowToPlay();
    return;
  }

  if (action === 'close-guide') {
    closeHowToPlay();
    return;
  }

  if (action === 'go-back') {
    if (state.currentPhase > 0) {
      state.currentPhase -= 1;
      saveState();
      renderApp();
    }
    return;
  }

  if (action === 'next-phase') {
    if (state.currentPhase < phaseData.length - 1) {
      markPhaseCompleted();
      state.currentPhase += 1;
      saveState();
      renderApp();
      return;
    }

    state.screen = 'finish';
    markPhaseCompleted();
    saveState();
    renderApp();
    return;
  }

  if (action === 'restart-game') {
    Object.assign(state, { ...defaultState, screen: 'intro' });
    saveState();
    renderApp();
    return;
  }

  if (action === 'choice-communication') {
    const result = document.getElementById('communication-result');
    if (value === 'C') {
      result.textContent = 'Correto! O WhatsApp é rápido, permite registro da conversa e facilita a comunicação em tempo real.';
      result.className = 'feedback success';
    } else {
      result.textContent = 'Nem sempre é a melhor opção. Ferramentas antigas podem funcionar, mas hoje mensagens rápidas e registradas ajudam a manter o fluxo do trabalho.';
      result.className = 'feedback warning';
    }
    return;
  }

  if (action === 'site-card') {
    const details = {
      Site: 'O site da agência apresenta serviços, cases e informações da empresa. Ele funciona como cartão de visitas digital e ajuda a gerar confiança.',
      Portfólio: 'O portfólio mostra exemplos de campanhas, projetos e soluções, ajudando o cliente a entender a qualidade do trabalho realizado.',
      'Redes sociais': 'As redes sociais ajudam a manter a marca ativa, divulgar conteúdos e interagir com clientes e público em tempo real.',
      Contato: 'O formulário de contato facilita a troca de mensagens, agendamento e geração de oportunidades de negócios.',
      Informações: 'Dados como endereço, horários, redes e diferenciais reforçam credibilidade e ajudam a fortalecer a presença da marca.',
    };

    document.getElementById('site-title').textContent = value;
    document.getElementById('site-text').textContent = details[value] || 'Informação complementar disponível.';

    const cards = document.querySelectorAll('.site-card');
    cards.forEach((card) => {
      card.classList.toggle('active', card.dataset.value === value);
    });
    return;
  }

  if (action === 'budget-choice') {
    const result = document.getElementById('advertising-result');
    const guidance = {
      TV: 'TV oferece grande alcance, mas é menos segmentada e mais cara. Ela pode funcionar para campanhas amplas e presença de marca.',
      Instagram: 'Instagram é excelente para segmentação, visual e engajamento. Ele funciona bem quando o público é digital e o produto tem apelo visual.',
      TikTok: 'TikTok é forte para viralização e alcance orgânico, mas exige criatividade e bom entendimento do comportamento do público.',
    };

    result.textContent = guidance[value] || 'Escolha uma opção para entender o impacto do canal.';
    result.className = 'feedback success';
    return;
  }

  if (action === 'share-file') {
    const link = document.getElementById('cloud-link');
    const linkValue = 'https://cloud.agencia/arte-final-v2';
    link.textContent = linkValue;
    const result = document.getElementById('cloud-result');
    result.textContent = 'Link gerado. Agora você pode compartilhar o arquivo com o time de forma rápida e segura.';
    result.className = 'feedback success';
    return;
  }

  if (action === 'permission-choice') {
    const result = document.getElementById('cloud-result');
    const map = {
      visualizar: 'Permissão de visualizar permite apenas consultar o material sem alterar o conteúdo.',
      comentar: 'Permissão de comentar permite feedback e sugestões sem mudar o arquivo original.',
      editar: 'Permissão de editar permite alterar o arquivo, sendo útil quando a pessoa atua diretamente no conteúdo.',
    };
    result.textContent = map[value] || 'Permissão definida.';
    result.className = 'feedback success';
    return;
  }

  if (action === 'toggle-camera') {
    const result = document.getElementById('remote-result');
    result.textContent = 'Câmera ligada. Em reuniões remotas, o vídeo ajuda na comunicação e no alinhamento pessoal.';
    result.className = 'feedback success';
    return;
  }

  if (action === 'toggle-mic') {
    const result = document.getElementById('remote-result');
    result.textContent = 'Microfone ativado. O bom uso do áudio reduz ruídos e melhora a clareza da comunicação.';
    result.className = 'feedback success';
    return;
  }

  if (action === 'join-meeting') {
    const result = document.getElementById('remote-result');
    result.textContent = 'Você entrou na reunião remota. O trabalho colaborativo digital exige clareza, agenda e uso adequado de ferramentas.';
    result.className = 'feedback success';
    return;
  }

  if (action === 'leave-meeting') {
    const result = document.getElementById('remote-result');
    result.textContent = 'Você saiu da reunião. Isso mostra que o ambiente digital também exige organização e protocolos de trabalho.';
    result.className = 'feedback warning';
    return;
  }

  if (action === 'social-submit') {
    const goal = document.getElementById('social-goal')?.value || 'reconhecimento';
    const audience = document.getElementById('social-audience')?.value || 'adolescentes';
    const platform = document.getElementById('social-platform')?.value || 'instagram';

    const result = document.getElementById('social-result');
    result.textContent = `Campanha planejada para ${audience} na plataforma ${platform}. O objetivo principal é ${goal}. A segmentação correta ajuda a alcançar pessoas com maior interesse no produto.`;
    result.className = 'feedback success';
    return;
  }

  if (action === 'analytics-answer') {
    const result = document.getElementById('analytics-result');
    const answer = value;
    if (answer === 'C') {
      result.textContent = 'Correto! A campanha C recebeu mais cliques, mostrando que a estratégia de conteúdo ou segmentação foi mais eficaz.';
      result.className = 'feedback success';
    } else {
      result.textContent = 'A conversão depende do número de ações realizadas em relação ao público alcançado. Em campanhas digitais, métricas ajudam a ajustar a estratégia.';
      result.className = 'feedback warning';
    }
    return;
  }

  if (action === 'ai-submit') {
    const input = document.getElementById('ai-input');
    const result = document.getElementById('ai-result');
    const prompt = (input && input.value) ? input.value.toLowerCase() : '';

    if (!prompt) {
      result.textContent = 'Digite um pedido para receber uma resposta da IA.';
      result.className = 'feedback error';
      return;
    }

    const examples = [
      'Slogan 1: Energia que move sua rotina.',
      'Slogan 2: Viver com mais direção e força.',
      'Slogan 3: Sua potência começa aqui.',
      'Slogan 4: Movimento real. Energia para ir além.',
      'Slogan 5: A força do hoje, no próximo passo.',
    ];

    result.textContent = `Resposta gerada pela IA: ${examples.join(' | ')}`;
    result.className = 'feedback success';
    return;
  }

  if (action === 'complete-final') {
    state.screen = 'finish';
    markPhaseCompleted();
    saveState();
    renderApp();
    return;
  }

  if (action === 'login-submit') {
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    const result = document.getElementById('login-result');

    if (!username || !password) {
      result.textContent = 'Preencha usuário e senha para continuar. Em sistemas digitais, a autenticação depende de credenciais válidas.';
      result.className = 'feedback warning';
      return;
    }

    if (username === 'admin' && password === 'agencia2025') {
      result.textContent = 'Acesso liberado. Autenticação concluída com sucesso. O sistema confirmou sua identidade e protegeu o ambiente.';
      result.className = 'feedback success';
    } else {
      result.textContent = 'Credenciais inválidas. Em ambientes digitais, a autenticação exige dados certos para garantir segurança; use recuperação de senha se necessário.';
      result.className = 'feedback error';
    }
    return;
  }
}

renderApp();

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const action = button.dataset.action;
  const value = button.dataset.value || '';
  handlePhaseAction(action, value);
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'login-form') {
    event.preventDefault();
    handlePhaseAction('login-submit');
  }
});
