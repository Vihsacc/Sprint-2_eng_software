# 🏭 SafeGuard Industrial — Saccorp EPI

> **Challenge 2026 | FIAP × SPI Integração | Metaindústria**

Sistema de gestão proativa de EPIs e segurança em campo. Monitora o uso de Equipamentos de Proteção Individual em tempo real, emite alertas de não-conformidade e gera relatórios de conformidade para ambientes industriais.

---

## 👥 Integrantes

| Nome | RM |
|---|---|
| [Integrante 1] | RM-XXXXX |
| [Integrante 2] | RM-XXXXX |
| [Integrante 3] | RM-XXXXX |
| [Integrante 4] | RM-XXXXX |
| [Integrante 5] | RM-XXXXX |

---

## 🔍 Problema Abordado

A gestão de EPIs em ambientes industriais ainda é majoritariamente **reativa e manual**: registros em papel, fiscalizações pontuais e ausência de dados confiáveis para tomada de decisão. O resultado são acidentes evitáveis, multas regulatórias e dificuldade de compliance com NR-6, NR-9 e ISO 45001.

O **SafeGuard Industrial** propõe a transição do modelo punitivo para o modelo **proativo**: monitoramento contínuo por visão computacional, alertas em tempo real e cultura de prevenção antes da infração.

---

## 💡 Solução

Plataforma operacional de campo com três pilares:

- **Monitoramento contínuo** — câmeras IP com YOLOv8 detectam ausência de EPIs em tempo real
- **Alertas inteligentes** — notificação imediata para operador (wearable) e supervisor (push), com escalonamento automático em 5 minutos
- **Gestão integrada** — dashboard de conformidade, relatórios auditáveis e controle de ciclo de vida de EPIs

---

## 🖥️ Protótipo — Sprint 2

### 🔗 Links

| Artefato | Link |
|---|---|
| **Protótipo navegável** | [Inserir link do Figma / Claude Artifact] |
| **Vídeo de walkthrough** | [Inserir link do YouTube (não listado)] |

### Instruções de navegação

1. **Login** — Digite qualquer nome no campo Usuário e clique em "Entrar"
2. **Home** — Passe o mouse sobre os cards para ver o popup de detalhes; clique em "+" para configurar
3. **Configurar EPI** — Permita o acesso à câmera, preencha Nome e Descrição, ative os EPIs da zona clicando nas bolinhas e clique em "Confirmar"
4. **Card salvo** — O card exibe checkmark verde; clique novamente para editar
5. **Sair** — Botão "Sair" no menu lateral retorna para a tela de login

### Telas cobertas

| Tela | Descrição | Casos de Uso |
|---|---|---|
| LoginScreen | Autenticação com usuário e senha | UC-01 |
| HomeScreen | Grade de estações + popup de hover + menu lateral | UC-04, UC-11 |
| EpiCreationScreen | Câmera ao vivo + formulário + toggle de EPIs | UC-02, UC-03, RF-01, RF-02 |

---

## 🛠️ Tecnologias

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Frontend | React 18 + Hooks | Componentização e estado reativo; ciclo de vida para câmera |
| Estilização | Tailwind CSS | Utility-first; responsividade nativa; animações via classes |
| Câmera | Web API MediaDevices | Feed ao vivo para monitoramento de zona sem dependência externa |
| Backend (Sprint 3+) | Java 21 + Spring Boot 3 | Maturidade empresarial; WebSocket para alertas em tempo real |
| Visão Computacional | Python + YOLOv8 + OpenCV | >90% acurácia na detecção de EPIs; processamento de feed RTSP |
| Banco de Dados | PostgreSQL 16 + TimescaleDB | ACID para auditoria; TimescaleDB para séries temporais de sensores |
| Mensageria | Apache Kafka | Eventos de sensores em alta volumetria; desacoplamento de serviços |

---

## 📁 Estrutura do Repositório
