import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
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
                <a href={itemAtual.pageUrl}>
                  <img src={itemAtual.imageUrl} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            );
          }          
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  
  const pessoasFavoritas = [
    {
      id: '000001', 
      title: 'juunegreiros',
      imageUrl: 'https://github.com/juunegreiros.png',
      pageUrl: 'https://github.com/juunegreiros'
    },
    {
      id: '000002', 
      title: 'omariosouto',
      imageUrl: 'https://github.com/omariosouto.png',
      pageUrl: 'https://github.com/omariosouto'
    },
    {
      id: '000003', 
      title: 'peas',
      imageUrl: 'https://github.com/peas.png',
      pageUrl: 'https://github.com/peas'
    },
    {
      id: '000004', 
      title: 'marcobrunodev',
      imageUrl: 'https://github.com/marcobrunodev.png',
      pageUrl: 'https://github.com/marcobrunodev'
    },
    {
      id: '000005', 
      title: 'rafaballerini',
      imageUrl: 'https://github.com/rafaballerini.png',
      pageUrl: 'https://github.com/rafaballerini'
    },
    {
      id: '000006', 
      login: 'felipefialho',
      imageUrl: 'https://github.com/felipefialho.png',
      pageUrl: 'https://github.com/felipefialho'
    }
  ]
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function() {
    // Fazendo um GET
    fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {      
      const followers = respostaCompleta.map((user) => {
        return {
          id: user.id,
          title: user.login,
          imageUrl: `https://github.com/${user.login}.png`,
          pageUrl: `https://github.com/${user.login}`
        };
      });

      setSeguidores(followers);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '90b780026a68150b4b93beec88a71e',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          pageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato)
    })
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
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

            <OrkutNostalgicIconSet p={{ name: 'Recados', slug: 'recados', icon: 'book' }}/>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  pageUrl: dadosDoForm.get('link'),
                  creatorSlug: usuarioAleatorio
                }
                
                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log('criando', dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                });
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    },
  }
}