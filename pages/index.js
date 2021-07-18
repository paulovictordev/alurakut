import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.map((itemAtual, indice) => {
          if (indice <= 5) {
            return (
              <li key={itemAtual.id}> 
                <a href={itemAtual.html_url}>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            );
          }          
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuarioAleatorio = 'paulovictordev';
  const [comunidades, setComunidades] = React.useState([
    {
    id: '000123', 
    login: 'Eu odeio acordar cedo',
    avatar_url: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    html_url: 'https://www.orkut.br.com/MainCommunity?cmm=10000'
    },
    {
      id: '000124', 
      login: 'Stack Overflow em Português',
      avatar_url: 'https://mundohacker.net.br/wp-content/uploads/2019/05/stackoverflow-1.png',
      html_url: 'https://pt.stackoverflow.com/'
    },
    {
      id: '000125', 
      login: 'Alura Cursos Online',
      avatar_url: 'https://www.alura.com.br/assets/img/alura-share.1617727198.png',
      html_url: 'https://www.alura.com.br/'
    }
  ]);
  
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    {
      id: '000001', 
      login: 'juunegreiros',
      avatar_url: 'https://github.com/juunegreiros.png',
      html_url: 'https://github.com/juunegreiros'
    },
    {
      id: '000002', 
      login: 'omariosouto',
      avatar_url: 'https://github.com/omariosouto.png',
      html_url: 'https://github.com/omariosouto'
    },
    {
      id: '000003', 
      login: 'peas',
      avatar_url: 'https://github.com/peas.png',
      html_url: 'https://github.com/peas'
    },
    {
      id: '000004', 
      login: 'marcobrunodev',
      avatar_url: 'https://github.com/marcobrunodev.png',
      html_url: 'https://github.com/marcobrunodev'
    },
    {
      id: '000005', 
      login: 'rafaballerini',
      avatar_url: 'https://github.com/rafaballerini.png',
      html_url: 'https://github.com/rafaballerini'
    },
    {
      id: '000006', 
      login: 'rafaballerini',
      avatar_url: 'https://github.com/felipefialho.png',
      html_url: 'https://github.com/felipefialho'
    }
  ]
  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o array de dados do github 
  React.useEffect(function() {
    fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
  }, []);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                }
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <div>
                <input
                  placeholder="Qual é o link de acesso pra comunidade"
                  name="link"
                  aria-label="Qual é o link de acesso pra comunidade"
                />
              </div>
              
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBox title="Comunidades" items={comunidades}/>
          <ProfileRelationsBox title="Pessoas da comunidade" items={pessoasFavoritas}/>
        </div>
      </MainGrid>
    </>
  )
}