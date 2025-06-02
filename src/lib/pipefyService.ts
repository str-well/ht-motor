// Serviço para buscar cards do Pipefy
const PIPEFY_API_URL = 'https://api.pipefy.com/graphql'
const PIPEFY_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3NDg4OTE0MjgsImp0aSI6ImM2MWRlOWMyLTU2OGEtNDkzNy1hZmIzLWFjZmI4YmU1YzI1NCIsInN1YiI6MzA2Njc1Mzk4LCJ1c2VyIjp7ImlkIjozMDY2NzUzOTgsImVtYWlsIjoid2ZiQGh0ZWNvc29sdXRpb25zLmNvbSJ9fQ.siQcenvAgtJyCXFegevj1LqtTy2-HNci0Vpf4sRMfbW3QltdNEQ1X4CbZNYVchFQljFwKce_t-GEBXYfIlyTEg'

export interface PipefyPhase {
  id: string
  name: string
  color?: string
}

export interface PipefyCard {
  id: string
  title: string
  created_at: string
  current_phase: {
    id: string
    name: string
  }
  due_date?: string
  assignees?: { id: string; name: string }[]
  labels?: { id: string; name: string; color: string }[]
  fields?: { name: string; value: string }[]
}

export interface PipefyCardActivity {
  action: string
  created_at: string
  user?: { id: string; name: string }
  from?: { name: string }
  to?: { name: string }
}

export interface PipefyCardComment {
  id: string
  text: string
  created_at: string
  author?: { id: string; name: string }
}

export interface PipefyCardDetails extends PipefyCard {
  age?: number
  summary?: string
  summary_fields?: { title: string }[]
  summary_attributes?: { title: string }[]
  pipe?: {
    name: string
    members: { user: { displayName: string; email: string } }[]
  }
  phases_history?: any[]
  parent_relations?: any[]
  attachments?: any[]
  assignees?: {
    id: string
    name: string
    displayName?: string
    email?: string
    phone?: string
    createdAt?: string
  }[]
}

export async function getAllPipefyCards(pipeId: number): Promise<PipefyCard[]> {
  let hasNextPage = true
  let endCursor = null
  let allCards: PipefyCard[] = []
  while (hasNextPage) {
    const query = `
      query {
        cards(pipe_id: ${pipeId}, first: 100${
          endCursor ? `, after: \"${endCursor}\"` : ''
        }) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              created_at
              due_date
              current_phase { id name }
              assignees { id name }
              labels { id name color }
              fields { name value }
            }
          }
        }
      }
    `

    const response = await fetch(PIPEFY_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    const cards: PipefyCard[] = data.data.cards.edges.map(
      (edge: { node: PipefyCard }) => edge.node
    )
    allCards = allCards.concat(cards)
    hasNextPage = data.data.cards.pageInfo.hasNextPage
    endCursor = data.data.cards.pageInfo.endCursor
  }
  return allCards
}

export async function getPipefyPhasesAndAllCards(
  pipeId: number
): Promise<{ phases: PipefyPhase[]; cards: PipefyCard[] }> {
  const query = `
    query {
      pipe(id: ${pipeId}) {
        phases {
          id
          name
          color
        }
      }
    }
  `
  const response = await fetch(PIPEFY_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PIPEFY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const data = await response.json()
  const phases: PipefyPhase[] = data.data.pipe.phases
  const cards = await getAllPipefyCards(pipeId)
  return { phases, cards }
}

export async function getPipefyCardDetails(
  cardId: string
): Promise<PipefyCardDetails> {
  const query = `
    query {
      card(id: ${cardId}) {
        id
        title
        created_at
        age
        summary { title } 
        summary_fields { title }
        summary_attributes { title }
        pipe {
          name
          members { user { displayName email } }
        }
        phases_history { phase { id name } lastTimeOut }
        parent_relations { id name }
        attachments {
          field { description label }
          phase { id name }
        }
        assignees {
          id
          name
          displayName
          email
          phone
          createdAt
        }
        labels { id name color }
        fields { name value }
        comments {
          id
          text
          created_at
          author { id name }
        }
      }
    }
  `
  const response = await fetch(PIPEFY_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PIPEFY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const data = await response.json()
  return data.data.card
}
